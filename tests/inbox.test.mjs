import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {getPendingInbox} from '../scripts/inbox.mjs';

const rid='INBOX-ROUND',role='DIR-A',id=rid+'-DIR-A-01';
function setup(fn){
 const root=mkdtempSync(join(tmpdir(),'org-inbox-'));
 try{
   mkdirSync(join(root,'messages'),{recursive:true});
   writeFileSync(join(root,'round.json'),JSON.stringify({round_id:rid,state:'ACTIVE'}));
   writeFileSync(join(root,'roster.json'),JSON.stringify({roles:[{role_id:role,appointment_id:id,status:'ACTIVE'}]}));
   for(let n=1;n<=3;n++)writeFileSync(join(root,'messages',String(n).padStart(6,'0')+'.json'),
     JSON.stringify({round_id:rid,message_id:rid+'-M'+String(n).padStart(6,'0'),to_role:role,to_appointment_id:id,
       from_role:'CEO',kind:'TASK',summary:'task '+n}));
   return fn(root);
 }finally{rmSync(root,{recursive:true,force:true});}
}
test('MN returns every pending M in increasing order, not just newest',()=>{
 setup(root=>{
   const found=getPendingInbox(root,role,id);
   assert.equal(found.pending_count,3);
   assert.deepEqual(found.pending.map(x=>x.message_id),[rid+'-M000001',rid+'-M000002',rid+'-M000003']);
 });
});
test('MN repeated skips exact individually receipted M and retains other two',()=>{
 setup(root=>{
   const p=join(root,'receipts','M000002');mkdirSync(p,{recursive:true});
   writeFileSync(join(p,id+'.json'),JSON.stringify({round_id:rid,message_id:rid+'-M000002',
     recipient_role:role,recipient_appointment_id:id,trigger:'MN',disposition:'NO_ACTION',
     reason:'Read and no action required',read_at:'2026-10-15T01:00:00Z'}));
   const r=getPendingInbox(root,role,id);
   assert.deepEqual(r.pending.map(x=>x.message_id),[rid+'-M000001',rid+'-M000003']);
   assert.equal(r.already_receipted_count,1);
 });
});
test('wrong or retired appointment cannot consume another chat inbox',()=>{
 setup(root=>assert.throws(()=>getPendingInbox(root,role,rid+'-DIR-A-02'),/ID mismatch/));
});
test('malformed receipt never turns an unread message into processed',()=>{
 setup(root=>{
   const p=join(root,'receipts','M000002');mkdirSync(p,{recursive:true});
   writeFileSync(join(p,id+'.json'),JSON.stringify({message_id:rid+'-M000003',recipient_role:role,
     recipient_appointment_id:id,disposition:'HANDLED'}));
   const queue=getPendingInbox(root,role,id);
   assert.equal(queue.pending_count,3);
   assert.deepEqual(queue.invalid_markers,[join(p,id+'.json')]);
 });
});

test('MN only reads new M after saving minimal bookmarks, no re-read',()=>{
 setup(root=>{
  const dir=join(root,'receipts');
  for(const n of [1,2]){
    const file=join(dir,'M'+String(n).padStart(6,'0'),id+'.json');
    mkdirSync(join(dir,'M'+String(n).padStart(6,'0')),{recursive:true});
    writeFileSync(file,JSON.stringify({
      round_id:rid,message_id:rid+'-M'+String(n).padStart(6,'0'),
      recipient_appointment_id:id,read_at:'2026-10-15T05:00:00Z'}));
  }
  const q=getPendingInbox(root,role,id);
  assert.deepEqual(q.pending.map(x=>x.message_id),[rid+'-M000003']);
  assert.equal(q.already_receipted_count,2);
 });
});
test('Wrong recipient marker cannot hide unread message',()=>{
 setup(root=>{
  const dir=join(root,'receipts','M000001');mkdirSync(dir,{recursive:true});
  writeFileSync(join(dir,id+'.json'),JSON.stringify({
    round_id:rid,message_id:rid+'-M000001',
    recipient_appointment_id:rid+'-CEO-01',read_at:'2026-10-15T05:00:00Z'}));
  const q=getPendingInbox(root,role,id);
  assert.equal(q.pending_count,3);
  assert.equal(q.invalid_markers.length,1);
 });
});
