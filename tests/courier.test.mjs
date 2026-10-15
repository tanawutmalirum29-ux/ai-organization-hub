import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {nextCourierPlan,codeForRole} from '../scripts/courier.mjs';
const rid='NX-ROUND-01',id=role=>rid+'-'+role+'-01';
const role=role_id=>({role_id,appointment_id:id(role_id),status:'ACTIVE',parent_role:'CEO'});
function fixture(fn,items=null){
 const root=mkdtempSync(join(tmpdir(),'courier-actions-'));
 try{
  mkdirSync(join(root,'messages'),{recursive:true});
  writeFileSync(join(root,'round.json'),JSON.stringify({round_id:rid,state:'ACTIVE'}));
  writeFileSync(join(root,'roster.json'),JSON.stringify({round_id:rid,roles:[
   {...role('CEO'),parent_role:'OWNER'},role('DIR-A'),role('TL-A1'),role('GAME-ADVISOR')]}));
  const msg=(n,to,kind='TASK',from='CEO',reply=null)=>({
   round_id:rid,sequence:n,message_id:rid+'-M'+String(n).padStart(6,'0'),
   from_role:from,from_appointment_id:from==='OWNER'?'OWNER':id(from),
   to_role:to,to_appointment_id:to==='OWNER'?'OWNER':id(to),kind,in_reply_to:reply,
   summary:'Action '+n});
  const entries=items?items(msg):[msg(1,'CEO','APPOINTMENT','OWNER'),
   msg(2,'DIR-A'),msg(3,'DIR-A'),msg(4,'TL-A1'),msg(5,'GAME-ADVISOR')];
  entries.forEach((m,i)=>writeFileSync(join(root,'messages',String(i+1).padStart(6,'0')+'.json'),JSON.stringify(m)));
  return fn(root);
 }finally{rmSync(root,{recursive:true,force:true});}
}
test('NX routes each actionable recipient only once',()=>fixture(root=>{
 const q=nextCourierPlan(root);
 assert.deepEqual(q.mn_codes,['MN-A-DIR','MN-A1-TL','MN-GAME-ADVISOR']);
 assert.equal(q.routing[0].message_ids.length,2);
 assert.equal(q.first_appointment_codes.length,0);
}));
test('NX requests one full CEO appointment when CEO has not yet authored any record',()=>fixture(root=>{
 const q=nextCourierPlan(root);
 assert.deepEqual(q.first_appointment_codes,['AP-CEO']);
 assert.deepEqual(q.mn_codes,[]);
},msg=>[msg(1,'CEO','APPOINTMENT','OWNER')]));
test('Replying to one M does not hide another M',()=>fixture(root=>{
 const q=nextCourierPlan(root);
 assert.deepEqual(q.routing.find(x=>x.role_id==='DIR-A').message_ids,[rid+'-M000003']);
},msg=>[msg(1,'CEO','APPOINTMENT','OWNER'),msg(2,'DIR-A'),msg(3,'DIR-A'),
 msg(4,'OWNER','RESULT','DIR-A',rid+'-M000002')]));
test('NX does not require receipts and filters completed direct requests',()=>fixture(root=>{
 const q=nextCourierPlan(root);
 assert.deepEqual(q.mn_codes,[]);
 assert.deepEqual(q.first_appointment_codes,[]);
},msg=>[msg(1,'CEO','APPOINTMENT','OWNER'),msg(2,'DIR-A'),
 msg(3,'OWNER','RESULT','DIR-A',rid+'-M000002')]));
test('Courier code names remain stable',()=>{
 assert.equal(codeForRole('DIR-Z'),'MN-Z-DIR');
 assert.equal(codeForRole('TL-B2'),'MN-B2-TL');
 assert.equal(codeForRole('E-AB1-3'),'MN-AB1-3-E');
 assert.equal(codeForRole('DCEO-A'),'MN-DCEO-A');
 assert.throws(()=>codeForRole('TL-XYZ3'),/Unrecognized/);
});
