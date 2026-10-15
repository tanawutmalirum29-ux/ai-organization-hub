import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {nextCourierPlan,codeForRole} from '../scripts/v8-next.mjs';
const rid='NX-ROUND-01';
const id=role=>rid+'-'+role+'-01';
const role=(role_id,appointmentStatus='ACTIVE')=>({role_id,appointment_id:id(role_id),status:appointmentStatus,parent_role:role_id==='CEO'?'OWNER':'CEO'});
function setup(fn,config={}){
 const root=mkdtempSync(join(tmpdir(),'nx-routing-'));
 try {
  mkdirSync(join(root,'messages'),{recursive:true});
  writeFileSync(join(root,'round.json'),JSON.stringify({round_id:rid,state:config.state??'ACTIVE',protocol_version:'V8'}));
  const roles=[role('CEO'),role('DIR-A'),role('TL-A1'),role('E-A1-1'),role('GAME-ADVISOR')];
  writeFileSync(join(root,'roster.json'),JSON.stringify({round_id:rid,roles}));
  const msg=(n,to,kind='TASK')=>({sequence:n,message_id:rid+'-M'+String(n).padStart(6,'0'),
    round_id:rid,to_role:to,to_appointment_id:id(to),from_role:'CEO',kind,summary:kind+' '+n});
  const items=config.messages||[msg(1,'CEO','APPOINTMENT'),msg(2,'DIR-A'),msg(3,'DIR-A'),msg(4,'TL-A1'),msg(5,'GAME-ADVISOR')];
  items.forEach((m,i)=>writeFileSync(join(root,'messages',String(i+1).padStart(6,'0')+'.json'),JSON.stringify(m)));
  const acknowledge=(n,to)=>{
   const dir=join(root,'receipts','M'+String(n).padStart(6,'0'));mkdirSync(dir,{recursive:true});
   writeFileSync(join(dir,id(to)+'.json'),JSON.stringify({message_id:rid+'-M'+String(n).padStart(6,'0'),
     recipient_role:to,recipient_appointment_id:id(to),disposition:'HANDLED'}));
  };
  return fn(root,acknowledge);
 }finally{rmSync(root,{recursive:true,force:true});}
}
test('NX returns every recipient once and all missing M IDs for same DIR',()=>{
 setup((root,ack)=>{
  ack(1,'CEO');
  const x=nextCourierPlan(root);
  assert.deepEqual(x.mn_codes,['MN-A-DIR','MN-A1-TL','MN-GAME-ADVISOR']);
  assert.equal(x.routing[0].message_ids.length,2);
  assert.equal(x.first_appointment_codes.length,0);
 });
});
test('NX returns AP-CEO for missing original first appointment not MN',()=>{
 setup(root=>{
  const x=nextCourierPlan(root);
  assert.deepEqual(x.first_appointment_codes,['AP-CEO']);
  assert.ok(!x.mn_codes.includes('MN-CEO'));
 });
});
test('NX removes individually acknowledged M without hiding newer pending ones',()=>{
 setup((root,ack)=>{
  ack(1,'CEO');ack(2,'DIR-A');ack(4,'TL-A1');ack(5,'GAME-ADVISOR');
  const x=nextCourierPlan(root);
  assert.deepEqual(x.mn_codes,['MN-A-DIR']);
  assert.deepEqual(x.routing[0].message_ids,[rid+'-M000003']);
 });
});
test('NX returns no courier codes after all messages independently receipted',()=>{
 setup((root,ack)=>{
  ack(1,'CEO');ack(2,'DIR-A');ack(3,'DIR-A');ack(4,'TL-A1');ack(5,'GAME-ADVISOR');
  const x=nextCourierPlan(root);
  assert.equal(x.owner_code_line,'');
  assert.match(x.next_step,/does not prove completion/);
 });
});
test('NX rejects closed round and never calls it finished',()=>{
 setup(root=>assert.throws(()=>nextCourierPlan(root),/Not an ACTIVE V8 round/),{state:'CLOSED'});
});
test('NX supports arbitrary existing role labels without guessing recipient',()=>{
 assert.equal(codeForRole('DIR-Z'),'MN-Z-DIR');
 assert.equal(codeForRole('TL-B2'),'MN-B2-TL');
 assert.equal(codeForRole('E-AB1-3'),'MN-AB1-3-E');
 assert.equal(codeForRole('ORG-ADVISOR','AP'),'AP-ORG-ADVISOR');
 assert.throws(()=>codeForRole('TL-XYZ3'),/Unrecognized/);
});
