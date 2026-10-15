import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {getPendingInbox} from '../scripts/v8-inbox.mjs';

const rid='INBOX-ROUND',role='DIR-A',id=rid+'-DIR-A-01';
function setup(fn){
 const root=mkdtempSync(join(tmpdir(),'v8-inbox-'));
 try{
   mkdirSync(join(root,'messages'),{recursive:true});
   writeFileSync(join(root,'round.json'),JSON.stringify({round_id:rid,protocol_version:'V8',state:'ACTIVE'}));
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
   assert.throws(()=>getPendingInbox(root,role,id),/Invalid stored receipt/);
 });
});
