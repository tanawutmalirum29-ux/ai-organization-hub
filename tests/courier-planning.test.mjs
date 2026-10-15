import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {dirname,join} from 'node:path';
import {createHash} from 'node:crypto';
import {nextCourierPlan} from '../scripts/courier.mjs';
import {messageQueueCounts} from '../scripts/message-queue.mjs';

const round='ORG-QUEUE', app=role=>round+'-'+role+'-01';
const names=['CEO','GAME-ADVISOR','GAME-ADVISOR-DEPUTY','DCEO-A','DCEO-B'];
const save=(root,path,value)=>{
 const target=join(root,path);mkdirSync(dirname(target),{recursive:true});
 writeFileSync(target,typeof value==='string'?value:JSON.stringify(value));
};
function fixture({both=false,mismatch=false,receiptFirst=false}={}){
 const cwd=mkdtempSync(join(tmpdir(),'org-signoff-'));
 const roles=names.map(role_id=>({role_id,appointment_id:app(role_id),status:'ACTIVE',
 parent_role:role_id==='CEO'?'OWNER':'CEO'}));
 save(cwd,'workspace/round.json',{round_id:round,state:'ACTIVE',startup_phase:'DCEO_CONSENSUS'});
 save(cwd,'workspace/roster.json',{round_id:round,roles});
 const plan={plan_id:'PLAN',revision:1,scope:'design'};
 const bytes=JSON.stringify(plan)+'\n';
 const sha=createHash('sha1').update('blob '+Buffer.byteLength(bytes)+'\0').update(bytes).digest('hex');
 save(cwd,'workspace/plans/PLAN/r1.json',bytes);
 const messages=[
 {kind:'APPOINTMENT',to_role:'CEO',to_appointment_id:app('CEO'),from_role:'OWNER',message_id:round+'-M000001'}];
 for(let i=0;i<messages.length;i++)messages[i].round_id=round;
 const add=role=>{
  const n=messages.length+1;
  messages.push({round_id:round,message_id:round+'-M'+String(n).padStart(6,'0'),
  kind:'PLAN_SIGNOFF',to_role:'CEO',to_appointment_id:app('CEO'),from_role:role,
  from_appointment_id:app(role),signoff:{plan_path:'workspace/plans/PLAN/r1.json',
   plan_sha:role==='DCEO-B'&&mismatch?'f'.repeat(40):sha,
   signature_role:role,signature_appointment_id:app(role),decision:'APPROVED'}});
 };
 add('DCEO-A');if(both)add('DCEO-B');
 messages.forEach((m,i)=>save(cwd,'workspace/messages/'+String(i+1).padStart(6,'0')+'.json',m));
 save(cwd,'workspace/receipts/M000001/'+app('CEO')+'.json',{
   round_id:round,message_id:messages[0].message_id,recipient_role:'CEO',
   recipient_appointment_id:app('CEO'),trigger:'APPOINTMENT',disposition:'HANDLED',
   reason:'CEO received original appointment',read_at:'2026-10-15T01:00:00Z'});
 if(receiptFirst)save(cwd,'workspace/receipts/M000002/'+app('CEO')+'.json',{
  round_id:round,message_id:messages[1].message_id,recipient_role:'CEO',
  recipient_appointment_id:app('CEO'),trigger:'MN',disposition:'HANDLED',
  reason:'Received first DCEO signoff',read_at:'2026-10-15T01:01:00Z'});
 return cwd;
}
test('Organization NX suppresses first DCEO signature and reports deferred count, not an MN to CEO',()=>{
 const root=fixture();try{
 const r=nextCourierPlan(join(root,'workspace'));
 assert.deepEqual(r.mn_codes,[]);
 assert.equal(r.deferred_partial_signoffs,1);
 assert.equal(r.owner_code_line,'');
 }finally{rmSync(root,{recursive:true,force:true});}
});
test('Organization NX emits one MN-CEO when same real plan SHA signed by both',()=>{
 const root=fixture({both:true});try{
 const r=nextCourierPlan(join(root,'workspace'));
 assert.deepEqual(r.mn_codes,['MN-CEO']);
 assert.deepEqual(r.routing[0].message_ids,[round+'-M000002',round+'-M000003']);
 assert.equal(r.deferred_partial_signoffs,0);
 }finally{rmSync(root,{recursive:true,force:true});}
});
test('Organization no CEO notification for different signed SHA',()=>{
 const root=fixture({both:true,mismatch:true});try{
 const r=nextCourierPlan(join(root,'workspace'));
 assert.deepEqual(r.mn_codes,[]);
 assert.equal(r.deferred_partial_signoffs,2);
 }finally{rmSync(root,{recursive:true,force:true});}
});
test('Organization with first signoff already receipted still routes second once pair is valid',()=>{
 const root=fixture({both:true,receiptFirst:true});try{
 const r=nextCourierPlan(join(root,'workspace'));
 assert.deepEqual(r.mn_codes,['MN-CEO']);
 assert.deepEqual(r.routing[0].message_ids,[round+'-M000003']);
 }finally{rmSync(root,{recursive:true,force:true});}
});

test('Organization MQ reports zero actionable CEO messages and one deferred signature',()=>{
 const root=fixture();try{
 const r=messageQueueCounts(join(root,'workspace'));
 assert.match(r.text,/CEO:0/);
 assert.equal(r.deferred_dceo_signoffs,1);
 assert.deepEqual(r.mn_codes,[]);
 }finally{rmSync(root,{recursive:true,force:true});}
});
test('Organization MQ counts both valid signoffs as actionable and then excludes closed staff',()=>{
 const root=fixture({both:true});try{
 const r=messageQueueCounts(join(root,'workspace'));
 assert.match(r.text,/CEO:2/);
 assert.deepEqual(r.mn_codes,['MN-CEO']);
 }finally{rmSync(root,{recursive:true,force:true});}
});
