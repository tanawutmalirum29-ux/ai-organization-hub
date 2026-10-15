import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,dirname} from 'node:path';
import {getPendingInbox} from '../scripts/inbox.mjs';
const rid='INBOX-ROUND',role='DIR-A',id=rid+'-DIR-A-01';
const save=(root,p,x)=>{const q=join(root,p);mkdirSync(dirname(q),{recursive:true});writeFileSync(q,JSON.stringify(x));};
function fixture(fn){
 const root=mkdtempSync(join(tmpdir(),'inbox-actions-'));
 try{
  save(root,'round.json',{round_id:rid,state:'ACTIVE'});
  save(root,'roster.json',{round_id:rid,roles:[{role_id:role,appointment_id:id,status:'ACTIVE'}]});
  for(let n=1;n<=3;n++)save(root,'messages/'+String(n).padStart(6,'0')+'.json',{
   round_id:rid,sequence:n,message_id:rid+'-M'+String(n).padStart(6,'0'),
   to_role:role,to_appointment_id:id,from_role:'CEO',from_appointment_id:rid+'-CEO-01',
   kind:'TASK',summary:'task '+n});
  return fn(root);
 }finally{rmSync(root,{recursive:true,force:true});}
}
test('MN lists all addressed tasks when no responses exist',()=>fixture(root=>{
 const q=getPendingInbox(root,role,id);
 assert.equal(q.pending_count,3);
 assert.equal(q.answered_count,0);
 assert.equal(q.delivery_unverified,true);
}));
test('A real direct result suppresses only its referenced task',()=>fixture(root=>{
 save(root,'messages/000004.json',{round_id:rid,sequence:4,message_id:rid+'-M000004',
  from_role:role,from_appointment_id:id,to_role:'CEO',to_appointment_id:rid+'-CEO-01',
  kind:'RESULT',in_reply_to:rid+'-M000002'});
 const q=getPendingInbox(root,role,id);
 assert.deepEqual(q.pending.map(m=>m.message_id),[rid+'-M000001',rid+'-M000003']);
 assert.equal(q.answered_count,1);
}));
test('Historic receipts do not control the inbox or need repair',()=>fixture(root=>{
 save(root,'receipts/M000002/'+id+'.json',{message_id:'inconsistent'});
 const q=getPendingInbox(root,role,id);
 assert.equal(q.pending_count,3);
 assert.equal(q.answered_count,0);
}));
test('A different appointment cannot send a result on recipient behalf',()=>fixture(root=>{
 save(root,'messages/000004.json',{round_id:rid,sequence:4,message_id:rid+'-M000004',
  from_role:role,from_appointment_id:rid+'-DIR-A-02',to_role:'CEO',
  kind:'RESULT',in_reply_to:rid+'-M000002'});
 const q=getPendingInbox(root,role,id);
 assert.equal(q.pending_count,3);
 assert.throws(()=>getPendingInbox(root,role,rid+'-DIR-A-02'),/ID mismatch/);
}));
test('A full first appointment is no longer pending after recipient has authored real work',()=>fixture(root=>{
 const first={round_id:rid,sequence:1,message_id:rid+'-M000001',
  from_role:'CEO',to_role:role,to_appointment_id:id,kind:'APPOINTMENT'};
 const authored={round_id:rid,sequence:4,message_id:rid+'-M000004',
  from_role:role,from_appointment_id:id,to_role:'CEO',kind:'PROPOSAL'};
 save(root,'messages/000001.json',first);
 save(root,'messages/000004.json',authored);
 const q=getPendingInbox(root,role,id);
 assert.equal(q.answered.some(x=>x.message_id===first.message_id),true);
}));
