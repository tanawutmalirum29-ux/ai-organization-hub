import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve,dirname} from 'node:path';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';

const v=resolve('scripts/validate-governance.mjs'),rid='V9-ROUND-01',id=n=>rid+'-M'+String(n).padStart(6,'0');
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
const retirees=['GAME-ADVISOR','GAME-ADVISOR-DEPUTY','DCEO-A','DCEO-B'].map((role,i)=>
 m(14+i,'CEO','OWNER','ROLE_RETIRED',{retirement:{role_id:role,appointment_id:app(role),
 approved_plan_sha:planSha,reason:'Temporary planning completed and signed'}}));
const engineer=m(18,'CEO','E-A1-1','APPOINTMENT');
const charter=m(19,'CEO','E-A1-1','MISSION_CHARTER',
 {mission:{approved_plan_sha:planSha,scope:'Small game mechanic',non_goals:'No save load',
 source_proposals:'M000006 and jointly signed plan',acceptance_criteria:'Tracked tests',
 qa_plan:'Independent QA and CI'}});
const task=m(20,'CEO','E-A1-1','TASK');
const initial=[bootstrap,app1,app2],toPresentation=[...initial,present],
 toHandoff=[...toPresentation,handoff],toDeputy=[...toHandoff,deputy],
 toDceo=[...toDeputy,aApp,bApp],toReviews=[...toDceo,reviewA,reviewB],
 toApproval=[...toReviews,sigA,sigB,approve],
 toRetire=[...toApproval,...retirees],
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
 deputyReceipt=true,peerReceipts=true,signatureReceipts=true,planContent=planBytes,extraPlan=null,legacy=false}={}){
 const cwd=mkdtempSync(join(tmpdir(),'v9-planning-'));
 try{
   mkdirSync(join(cwd,'workspace','messages'),{recursive:true});
   writeFileSync(join(cwd,'workspace','round.json'),JSON.stringify({
     round_id:rid,game_repository:'tanawutmalirum29-ux/ant-project',state:'ACTIVE',
     ...(legacy?{}:{protocol_version:'V9',startup_phase:phase}),owner_relay_only_from_sequence:2}));
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
test('V9 new CEO bootstrap with no staff is valid',()=>pass(validate({
 phase:'CEO_SETUP',messages:[bootstrap],roles:[CEO],ownerEvents:[],deputyReceipt:false,planContent:null})));
test('V9 CEO initial adviser-and-deputy appointments, no DCEOs, pass WAIT_NP',()=>pass(validate({
 phase:'WAIT_NP',messages:initial,roles:[CEO,AD,DEP],ownerEvents:[],deputyReceipt:false,planContent:null})));
test('V9 prevents early execution department in WAIT_NP',()=>blocked(validate({
 phase:'WAIT_NP',messages:[...initial,m(4,'CEO','DIR-A','APPOINTMENT')],
 roles:[CEO,AD,DEP,role('DIR-A','CEO')],ownerEvents:[],deputyReceipt:false,planContent:null}),
 /execution role appointed before|only CEO and two advisors/));
test('V9 advisor may show full proposal but must wait C',()=>pass(validate({
 phase:'WAIT_OWNER_C',messages:toPresentation,roles:[CEO,AD,DEP],ownerEvents:journal.slice(0,2),deputyReceipt:false,planContent:null})));
test('V9 missing C rejects handoff to deputy',()=>blocked(validate({
 phase:'DEPUTY_REVIEW',messages:toHandoff,roles:[CEO,AD,DEP],ownerEvents:journal.slice(0,2),
 deputyReceipt:false,planContent:null}),/handoff lacks actual Owner C/));
test('V9 C must occur after advisor visibly showed the proposal',()=>blocked(validate({
 phase:'DEPUTY_REVIEW',messages:toHandoff,roles:[CEO,AD,DEP],
 ownerEvents:[journal[0],{...journal[1],message_refs:[]},journal[2]],
 deputyReceipt:false,planContent:null}),/owner C before full visible proposal/));
test('V9 deputy handoff after C is accepted without staffing yet',()=>pass(validate({
 phase:'DEPUTY_REVIEW',messages:toHandoff,roles:[CEO,AD,DEP],deputyReceipt:false,planContent:null})));
test('V9 refuses DCEO staffing before CEO read receipt of deputy proposal',()=>blocked(validate({
 phase:'DCEO_CONSENSUS',messages:toDceo,roles:allRoles,deputyReceipt:false,planContent:null}),
 /CEO must read receipt deputy proposal/));
test('V9 accepts both DCEOs discussing same plan in both directions',()=>pass(validate({
 phase:'DCEO_CONSENSUS',messages:toReviews,roles:allRoles})));
test('V9 rejects fake copied DCEO-B signature',()=>{
 const bad=[...toReviews,sigA,{...sigB,signoff:{...sigB.signoff,signature_appointment_id:app('DCEO-A')}},approve];
 blocked(validate({phase:'DCEO_CONSENSUS',messages:bad,roles:allRoles}),/separate genuine role signature/);
});
test('V9 rejects mismatched signatures and changed final plan blob',()=>{
 const altered=[...toReviews,sigA,{...sigB,signoff:{...sigB.signoff,plan_sha:'f'.repeat(40)}},approve];
 blocked(validate({phase:'DCEO_CONSENSUS',messages:altered,roles:allRoles}),/genuine role signature|PLAN_APPROVAL signatures missing/);
 blocked(validate({phase:'DCEO_CONSENSUS',messages:toApproval,roles:allRoles,planContent:planBytes+' '}),/actual plan blob|invalid plan/);
});
test('V9 full signed consensus with four retirements and direct CEO engineer is valid',()=>pass(validate()));
test('V9 does not permit execution team without four retired roles',()=>blocked(validate({
 messages:toExec.slice(0,15).concat(toExec.slice(17).map(x=>({...x,sequence:x.sequence-2,message_id:id(x.sequence-2),
 event_key:rid+':SHIFT:'+x.sequence,relay_text:x.relay_text.replace(x.message_id,id(x.sequence-2))}))),
 roles:[CEO,AD,DEP,A,B,E]}),/four retirements|execution role appointed before/));
test('V9 revised plan invalidates old signoffs before execution',()=>blocked(validate({
 extraPlan:{...plan,revision:2}}),/superseded by later plan revision/));
test('V8 legacy tests remain outside V9 phase requirements',()=>pass(validate({
 legacy:true,messages:[bootstrap],roles:[CEO],ownerEvents:[],deputyReceipt:false,planContent:null})));

test('V9 refuses invented NP: proposal shown without actual Owner request',()=>blocked(validate({
 phase:'WAIT_OWNER_C',messages:toPresentation,roles:[CEO,AD,DEP],
 ownerEvents:[{...journal[0],text:'I'},journal[1]],deputyReceipt:false,planContent:null}),
 /NP or Owner game idea did not precede proposal/));
test('V9 rejects incomplete two-person CEO approval when one signature is absent',()=>{
 const truncated=[...toReviews,sigA,m(12,'CEO','DCEO-A','PLAN_APPROVAL',{
   approval:{...refs,signoff_message_ids:[id(11)],rationale:'Too early'}})];
 blocked(validate({phase:'DCEO_CONSENSUS',messages:truncated,roles:allRoles}),
   /exactly two separate signatures/);
});
test('V9 refuses deputy CEOs debating before their recorded appointments',()=>{
 const outOfOrder=[...toDeputy,m(7,'DCEO-A','DCEO-B','PLAN_REVIEW',{
 review:{...refs,verdict:'AGREE',assessment:'Too early',references:'No appointment'}}),
 m(8,'CEO','DCEO-A','APPOINTMENT'),
 m(9,'CEO','DCEO-B','APPOINTMENT')];
 blocked(validate({phase:'DCEO_CONSENSUS',messages:outOfOrder,roles:allRoles}),/before actual appointment/);
});

test('V9 two DCEO signatures are insufficient if CEO never read/receipted them',()=>blocked(validate({
 signatureReceipts:false}),/CEO must individually read\/receipt both DCEO signatures/));
test('V9 signoff is refused when neither deputy read counterpart PLAN_REVIEW',()=>blocked(validate({
 peerReceipts:false}),/read and receipt peer plan review/));
