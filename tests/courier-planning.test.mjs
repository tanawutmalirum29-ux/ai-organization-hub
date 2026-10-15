import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {dirname,join} from 'node:path';
import {createHash} from 'node:crypto';
import {nextCourierPlan} from '../scripts/courier.mjs';
import {messageQueueCounts} from '../scripts/message-queue.mjs';
const rid='ORG-QUEUE',app=r=>rid+'-'+r+'-01';
const save=(root,p,obj)=>{const dest=join(root,p);mkdirSync(dirname(dest),{recursive:true});
 writeFileSync(dest,typeof obj==='string'?obj:JSON.stringify(obj));};
function fixture({both=false,mismatch=false,withHistoricReceipt=false}={}){
 const root=mkdtempSync(join(tmpdir(),'signoff-'));
 save(root,'workspace/round.json',{round_id:rid,state:'ACTIVE',startup_phase:'DCEO_CONSENSUS'});
 save(root,'workspace/roster.json',{round_id:rid,roles:['CEO','DCEO-A','DCEO-B'].map(role_id=>({
  role_id,appointment_id:app(role_id),parent_role:role_id==='CEO'?'OWNER':'CEO',status:'ACTIVE'}))});
 const body=JSON.stringify({plan_id:'PLAN',revision:1})+'\n';
 const sha=createHash('sha1').update('blob '+Buffer.byteLength(body)+'\0').update(body).digest('hex');
 save(root,'workspace/plans/PLAN/r1.json',body);
 const messages=[
  {kind:'APPOINTMENT',from_role:'OWNER',to_role:'CEO',to_appointment_id:app('CEO')},
  {kind:'CONSULTATION_REQUEST',from_role:'CEO',from_appointment_id:app('CEO'),to_role:'OWNER'}
 ];
 for(const role of both?['DCEO-A','DCEO-B']:['DCEO-A']){
  messages.push({kind:'PLAN_SIGNOFF',from_role:role,from_appointment_id:app(role),
   to_role:'CEO',to_appointment_id:app('CEO'),signoff:{
   signature_role:role,signature_appointment_id:app(role),decision:'APPROVED',
   plan_path:'workspace/plans/PLAN/r1.json',plan_sha:role==='DCEO-B'&&mismatch?'f'.repeat(40):sha}});
 }
 messages.forEach((m,i)=>save(root,'workspace/messages/'+String(i+1).padStart(6,'0')+'.json',{
  ...m,sequence:i+1,round_id:rid,message_id:rid+'-M'+String(i+1).padStart(6,'0')}));
 if(withHistoricReceipt)save(root,'workspace/receipts/M000003/'+app('CEO')+'.json',{
   round_id:rid,message_id:rid+'-M000003',recipient_appointment_id:app('CEO'),
   read_at:'2026-10-15T01:00:00Z'});
 return root;
}
function run(opts,fn){const root=fixture(opts);try{return fn(join(root,'workspace'))}
 finally{rmSync(root,{recursive:true,force:true});}}
test('First DCEO signoff is deferred until independent matching second exists',()=>run({},ws=>{
 const q=nextCourierPlan(ws);
 assert.deepEqual(q.mn_codes,[]);
 assert.equal(q.deferred_partial_signoffs,1);
}));
test('Matching real plan SHA produces a single CEO courier code',()=>run({both:true},ws=>{
 const q=nextCourierPlan(ws);
 assert.deepEqual(q.mn_codes,['MN-CEO']);
 assert.deepEqual(q.routing[0].message_ids,[rid+'-M000003',rid+'-M000004']);
}));
test('Mismatched signed SHA is not routed as consensus',()=>run({both:true,mismatch:true},ws=>{
 const q=nextCourierPlan(ws);
 assert.deepEqual(q.mn_codes,[]);
 assert.equal(q.deferred_partial_signoffs,2);
}));
test('Existing read marker has no bearing on valid signoff courier routing',()=>run({both:true,withHistoricReceipt:true},ws=>{
 const q=nextCourierPlan(ws);
 assert.deepEqual(q.routing[0].message_ids,[rid+'-M000003',rid+'-M000004']);
}));
test('MQ reports only actionable messages and never requires READ writes',()=>run({both:true},ws=>{
 const q=messageQueueCounts(ws);
 assert.match(q.text,/CEO:2/);
 assert.deepEqual(q.mn_codes,['MN-CEO']);
}));
