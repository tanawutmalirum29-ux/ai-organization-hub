import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve,dirname} from 'node:path';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';

const v=resolve('scripts/validate-governance.mjs'),rid='V10-ROUND-01',id=n=>rid+'-M'+String(n).padStart(6,'0');
const app=role=>rid+'-'+role+'-01',role=(name,parent,status='ACTIVE')=>({role_id:name,parent_role:parent,status,appointment_id:app(name)});
const CEO=role('CEO','OWNER'),AD=role('GAME-ADVISOR','CEO'),DEP=role('GAME-ADVISOR-DEPUTY','GAME-ADVISOR');
const A=role('DCEO-A','CEO'),B=role('DCEO-B','CEO'),E=role('E-A1-1','CEO');
const proposals={subject:'Colony gameplay',observed_problem:'Repetition',suggested_change:'Make strategic choices',
 expected_effect:'Improved strategy',risks:'Pacing issues',evidence:'Game files and repeatable test'};
function m(n,from,to,kind,fields={}){
 const fromID=from==='OWNER'?'OWNER':app(from),toID=to==='OWNER'?'OWNER':app(to);
 return {sequence:n,message_id:id(n),round_id:rid,from_role:from,from_appointment_id:fromID,
   to_role:to,to_appointment_id:toID,kind,event_key:rid+':'+kind+':'+n,task_ref:'COLONY_V9',
   in_reply_to:null,summary:'V9 '+kind+' '+n,
   relay_text:['ROUND_ID: '+rid,'MESSAGE_ID: '+id(n),'FROM_ROLE: '+from,
     'FROM_APPOINTMENT_ID: '+fromID,'TO_ROLE: '+to,'TO_APPOINTMENT_ID: '+toID,
     'TASK_REF: COLONY_V9','IN_REPLY_TO: NONE'].join('\n'),...fields};
}
const bootstrap=m(1,'OWNER','CEO','APPOINTMENT'),app1=m(2,'CEO','GAME-ADVISOR','APPOINTMENT'),
 app2=m(3,'CEO','GAME-ADVISOR-DEPUTY','APPOINTMENT');
const present=m(4,'GAME-ADVISOR','OWNER','ADVISOR_PRESENTATION',
 {presentation:{source:'NP',proposal_text:'Explore colonies, deepen strategic gameplay with measurable resource and combat decisions.',
 observed_game_evidence:'Actual source in ant-project and manual play test'}});
const handoff=m(5,'GAME-ADVISOR','GAME-ADVISOR-DEPUTY','ADVISOR_HANDOFF',
 {handoff:{presentation_message_id:id(4),
 owner_c_journal_path:'workspace/chats/'+app('GAME-ADVISOR')+'/events/000003.json'}});
const deputy=m(6,'GAME-ADVISOR-DEPUTY','CEO','PROPOSAL',
 {proposal:proposals,advisor_handoff_message_id:id(5),independent_findings:'Adds QA, economy balance and technical risks'});
const aApp=m(7,'CEO','DCEO-A','APPOINTMENT'),bApp=m(8,'CEO','DCEO-B','APPOINTMENT');
const plan={plan_id:'COLONY-V9-PLAN',revision:1,scope:'Actual mechanic and UI improvements',non_goals:'No save/load',
 acceptance_criteria:'Deterministic stage and gameplay tests',qa_plan:'Independent reviewer and browser suite',
 balance_analysis:'Avoid excessive free rewards',risk_analysis:'UI and simulation integration risks',
 consensus_resolution:'Both DCEOs independently examined and resolved scope disagreements',
 staffing_proposal:[{role:'E-A1-1',parent:'CEO',scope:'One independent small scoped game feature; separate QA by CEO'}]};
const planBytes=JSON.stringify(plan,null,2)+'\n';
const planPath='workspace/plans/COLONY-V9-PLAN/r1.json';
const planSha=createHash('sha1').update('blob '+Buffer.byteLength(planBytes)+'\0').update(planBytes).digest('hex');
const refs={plan_path:planPath,plan_sha:planSha};
const reviewA=m(9,'DCEO-A','DCEO-B','PLAN_REVIEW',
 {review:{...refs,verdict:'AGREE',assessment:'Game design aligns with plan',references:'Deputy proposal M000006'}});
const reviewB=m(10,'DCEO-B','DCEO-A','PLAN_REVIEW',
 {review:{...refs,verdict:'AGREE',assessment:'QA and architecture feasible',references:'A assessment M000009'}});
const sigA=m(11,'DCEO-A','CEO','PLAN_SIGNOFF',
 {signoff:{...refs,decision:'APPROVED',signature_role:'DCEO-A',signature_appointment_id:app('DCEO-A'),rationale:'Agreed design'}});
const sigB=m(12,'DCEO-B','CEO','PLAN_SIGNOFF',
 {signoff:{...refs,decision:'APPROVED',signature_role:'DCEO-B',signature_appointment_id:app('DCEO-B'),rationale:'Agreed implementation and tests'}});
const approve=m(13,'CEO','OWNER','PLAN_APPROVAL',
 {approval:{...refs,signoff_message_ids:[id(11),id(12)],rationale:'Exact signed plan is safe to staff'}});
const engineer=m(14,'CEO','E-A1-1','APPOINTMENT');
const charter=m(15,'CEO','E-A1-1','MISSION_CHARTER',
 {mission:{approved_plan_sha:planSha,scope:'Small game mechanic',non_goals:'No save load',
 source_proposals:'M000006 and jointly signed plan',acceptance_criteria:'Tracked tests',
 qa_plan:'Independent QA and CI'}});
const task=m(16,'CEO','E-A1-1','TASK');
const initial=[bootstrap,app1,app2],toPresentation=[...initial,present],
 toHandoff=[...toPresentation,handoff],toDeputy=[...toHandoff,deputy],
 toDceo=[...toDeputy,aApp,bApp],toReviews=[...toDceo,reviewA,reviewB],
 toApproval=[...toReviews,sigA,sigB,approve],
 toRetire=[...toApproval],
 toExec=[...toRetire,engineer,charter,task];
const journal=[
 {sequence:1,role_id:'GAME-ADVISOR',appointment_id:app('GAME-ADVISOR'),round_id:rid,
 speaker:'OWNER',text:'NP',logged_at:'2026-10-15T01:00:00Z',redacted:false},
 {sequence:2,role_id:'GAME-ADVISOR',appointment_id:app('GAME-ADVISOR'),round_id:rid,
 speaker:'AI',text:present.presentation.proposal_text,logged_at:'2026-10-15T01:01:00Z',redacted:false,message_refs:[id(4)]},
 {sequence:3,role_id:'GAME-ADVISOR',appointment_id:app('GAME-ADVISOR'),round_id:rid,
 speaker:'OWNER',text:'C',logged_at:'2026-10-15T01:02:00Z',redacted:false}
];
const allRoles=[CEO,AD,DEP,A,B],retired=[CEO,...[AD,DEP,A,B].map(r=>({...r,status:'CLOSED'}))];
function validate({phase='EXECUTION',messages=toExec,roles=[...retired,E],ownerEvents=journal,
 deputyReceipt=true,peerReceipts=true,signatureReceipts=true,planContent=planBytes,extraPlan=null,legacy=false,batchRetired=true,activity=true}={}){
 const cwd=mkdtempSync(join(tmpdir(),'v9-planning-'));
 try{
   mkdirSync(join(cwd,'workspace','messages'),{recursive:true});
   writeFileSync(join(cwd,'workspace','round.json'),JSON.stringify({
     round_id:rid,game_repository:'tanawutmalirum29-ux/ant-project',state:'ACTIVE',
     ...(legacy?{}:{protocol_version:'V10',startup_phase:phase}),owner_relay_only_from_sequence:2}));
   writeFileSync(join(cwd,'workspace','roster.json'),JSON.stringify({round_id:rid,roles}));
   messages.forEach((x,i)=>writeFileSync(join(cwd,'workspace','messages',String(i+1).padStart(6,'0')+'.json'),JSON.stringify(x)));
   if(ownerEvents.length){
     const dir=join(cwd,'workspace','chats',app('GAME-ADVISOR'),'events');
     mkdirSync(dir,{recursive:true});
     ownerEvents.forEach((x,i)=>writeFileSync(join(dir,String(i+1).padStart(6,'0')+'.json'),JSON.stringify(x)));
   }
   if(deputyReceipt){
     const d=join(cwd,'workspace','receipts','M000006');
     mkdirSync(d,{recursive:true});
     writeFileSync(join(d,app('CEO')+'.json'),JSON.stringify({round_id:rid,message_id:id(6),
       recipient_role:'CEO',recipient_appointment_id:app('CEO'),trigger:'MN',
       disposition:'HANDLED',reason:'Read and checked deputy proposal',read_at:'2026-10-15T01:03:00Z'}));
   }
   for(const message of messages){
     if(![9,10,11,12].includes(message.sequence))continue;
     if(message.kind==='PLAN_REVIEW' && !peerReceipts)continue;
     if(message.kind==='PLAN_SIGNOFF' && !signatureReceipts)continue;
     if(!['PLAN_REVIEW','PLAN_SIGNOFF'].includes(message.kind))continue;
     const recipient=message.to_appointment_id;
     const d=join(cwd,'workspace','receipts','M'+String(message.sequence).padStart(6,'0'));
     mkdirSync(d,{recursive:true});
     writeFileSync(join(d,recipient+'.json'),JSON.stringify({round_id:rid,
       message_id:message.message_id,recipient_role:message.to_role,
       recipient_appointment_id:recipient,trigger:'MN',disposition:'HANDLED',
       reason:'Independent peer/CEO acknowledged the saved message',
       read_at:'2026-10-15T01:04:00Z'}));
   }
   if(batchRetired && messages.some(m=>m.kind==='PLAN_APPROVAL')){
      const dir=join(cwd,'workspace','retirements');mkdirSync(dir,{recursive:true});
      const members=['GAME-ADVISOR','GAME-ADVISOR-DEPUTY','DCEO-A','DCEO-B'].map(role_id=>({
        role_id,appointment_id:app(role_id)}));
      writeFileSync(join(dir,'planning-council.json'),JSON.stringify({
        kind:'PLANNING_COUNCIL_RETIRED',round_id:rid,ceo_appointment_id:app('CEO'),
        approval_message_id:id(13),approved_plan_sha:planSha,
        recorded_at:'2026-10-15T02:00:00Z',reason:'Council finished agreed planning',
        members
      }));
   }
   if(activity){
     const dir=join(cwd,'workspace','activity',app('CEO'));mkdirSync(dir,{recursive:true});
     writeFileSync(join(dir,'000001.json'),JSON.stringify({
       sequence:1,round_id:rid,appointment_id:app('CEO'),role_id:'CEO',
       kind:'STATUS',summary:'All planning evidence is on GitHub; no courtesy M',
       logged_at:'2026-10-15T02:01:00Z'
     }));
   }
   if(planContent!==null){
     const p=join(cwd,planPath);mkdirSync(dirname(p),{recursive:true});writeFileSync(p,planContent);
   }
   if(extraPlan){
     const p=join(cwd,'workspace/plans/COLONY-V9-PLAN/r2.json');
     mkdirSync(dirname(p),{recursive:true});writeFileSync(p,JSON.stringify(extraPlan));
   }
   return spawnSync(process.execPath,[v,'round/'+rid.toLowerCase()],{
     cwd,encoding:'utf8',env:{...process.env,GITHUB_HEAD_REF:'',GITHUB_REF_NAME:'',
       GITHUB_EVENT_NAME:'test',BEFORE_SHA:''}
   });
 }finally{rmSync(cwd,{recursive:true,force:true});}
}
function pass(x){assert.equal(x.status,0,x.stderr);}
function blocked(x,re){assert.notEqual(x.status,0,'Expected gate refusal');assert.match(x.stderr,re);}

test('V10 CEO bootstrap without premature staff is valid',()=>pass(validate({
 phase:'CEO_SETUP',messages:[bootstrap],roles:[CEO],ownerEvents:[],deputyReceipt:false,batchRetired:false,planContent:null})));
test('V10 CEO only appoints 2 temporary advisers in WAIT_NP',()=>pass(validate({
 phase:'WAIT_NP',messages:initial,roles:[CEO,AD,DEP],ownerEvents:[],deputyReceipt:false,batchRetired:false,planContent:null})));
test('V10 rejects premature direct Engineer appointment before plan',()=>blocked(validate({
 phase:'WAIT_NP',messages:[...initial,m(4,'CEO','E-A1-1','APPOINTMENT')],
 roles:[CEO,AD,DEP,E],ownerEvents:[],deputyReceipt:false,batchRetired:false,planContent:null}),
 /execution role appointed before|only CEO and two advisors/));
test('V10 advisor full NP proposal works without Owner C',()=>pass(validate({
 phase:'WAIT_OWNER_C',messages:toPresentation,roles:[CEO,AD,DEP],
 ownerEvents:journal.slice(0,2),deputyReceipt:false,batchRetired:false,planContent:null})));
test('V10 advisor handoff must wait for literal OWNER C after presentation',()=>blocked(validate({
 phase:'DEPUTY_REVIEW',messages:toHandoff,roles:[CEO,AD,DEP],
 ownerEvents:journal.slice(0,2),deputyReceipt:false,batchRetired:false,planContent:null}),
 /handoff lacks actual Owner C/));
test('V10 deputy advice proceeds to DCEO planning after CEO receipt',()=>pass(validate({
 phase:'DCEO_CONSENSUS',messages:toReviews,roles:allRoles,batchRetired:false})));
test('V10 two signatures + one recorded batch retirement + shallow Engineer pass',()=>pass(validate()));
test('V10 rejects execution with no retirement batch despite CLOSED roster',()=>blocked(validate({
 batchRetired:false}),/execution role appointed before|EXECUTION requires|MISSION_CHARTER requires/));
test('V10 rejects any role remaining ACTIVE when batch written',()=>blocked(validate({
 roles:[CEO,AD,...[DEP,A,B].map(r=>({...r,status:'CLOSED'})),E]}),
 /execution role appointed before|EXECUTION requires/));
test('V10 rejects per-role ROLE_RETIRED M as notification spam',()=>{
 const bad=[...toApproval,m(14,'CEO','OWNER','ROLE_RETIRED',{retirement:{
 role_id:'DCEO-A',appointment_id:app('DCEO-A'),approved_plan_sha:planSha,reason:'Unneeded message'}})];
 blocked(validate({phase:'DCEO_CONSENSUS',messages:bad,roles:allRoles,batchRetired:false}),
 /V10 routine report or ACK not allowed|forbids per-role/);
});
test('V10 rejects routine ACK and REPORT M (use immutable receipts or activity)',()=>{
 const ack=m(4,'GAME-ADVISOR','CEO','ACK',{in_reply_to:id(2)});
 blocked(validate({phase:'WAIT_NP',messages:[...initial,ack],
 roles:[CEO,AD,DEP],ownerEvents:[],deputyReceipt:false,batchRetired:false,planContent:null}),
 /V10 routine report or ACK not allowed/);
 const report=m(4,'GAME-ADVISOR','CEO','REPORT');
 blocked(validate({phase:'WAIT_NP',messages:[...initial,report],
 roles:[CEO,AD,DEP],ownerEvents:[],deputyReceipt:false,batchRetired:false,planContent:null}),
 /V10 routine report or ACK not allowed/);
});
test('V10 rejects first signoff impersonating DCEO-B',()=>{
 const forged=[...toReviews,sigA,{...sigB,signoff:{...sigB.signoff,signature_appointment_id:app('DCEO-A')}},approve];
 blocked(validate({phase:'DCEO_CONSENSUS',messages:forged,roles:allRoles,batchRetired:false}),
 /separate genuine role signature/);
});
test('V10 rejects mismatched second SHA, changed blob and later revision',()=>{
 const mismatched=[...toReviews,sigA,{...sigB,signoff:{...sigB.signoff,plan_sha:'f'.repeat(40)}},approve];
 blocked(validate({phase:'DCEO_CONSENSUS',messages:mismatched,roles:allRoles,batchRetired:false}),
 /separate genuine role signature|PLAN_APPROVAL signatures missing/);
 blocked(validate({planContent:planBytes+'x'}),/actual plan blob|invalid plan/);
 blocked(validate({extraPlan:{...plan,revision:2}}),/superseded by later plan revision/);
});
test('V10 must actually receipt peer PLAN_REVIEW and both CEO signatures',()=>{
 blocked(validate({peerReceipts:false}),/read and receipt peer plan review/);
 blocked(validate({signatureReceipts:false}),/CEO must individually read\/receipt both/);
});
test('V10 receipt of deputy PROPOSAL is required before DCEO appointment',()=>blocked(validate({
 phase:'DCEO_CONSENSUS',messages:toDceo,roles:allRoles,deputyReceipt:false,batchRetired:false}),
 /CEO must read receipt deputy proposal/));
test('V10 preserves V9 validators: old protocol not changed by Lean variant',()=>pass(validate({
 legacy:true,phase:'CEO_SETUP',messages:[bootstrap],roles:[CEO],
 ownerEvents:[],deputyReceipt:false,batchRetired:false,planContent:null,activity:false})));
