#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';

// V9 gate is intentionally independent of legacy V6–V8 validation.
export function validateV9Startup({root='workspace',round,roster,msgs,fail}) {
  if(round?.protocol_version!=='V9')return;
  const err=x=>fail('V9: '+x), rid=round.round_id;
  const phase=round.startup_phase;
  const phases=['CEO_SETUP','WAIT_NP','WAIT_OWNER_C','DEPUTY_REVIEW','DCEO_CONSENSUS','EXECUTION'];
  if(!phases.includes(phase))err('invalid startup_phase');
  const stage=phases.indexOf(phase), at=(kind)=>msgs.filter(m=>m.kind===kind);
  const roles=new Map((roster.roles||[]).map(r=>[r.role_id,r]));
  const byID=new Map(msgs.map(m=>[m.message_id,m]));
  const planners=['GAME-ADVISOR','GAME-ADVISOR-DEPUTY','DCEO-A','DCEO-B'];
  const named=(m,from,to)=>m?.from_role===from&&m?.to_role===to;
  const nonblank=s=>typeof s==='string'&&s.trim().length>0;
  const actualPlan=(rec)=>{
    if(!rec||!rec.plan_path||!rec.plan_sha)return false;
    const p=rec.plan_path;
    if(!/^workspace\/plans\/[A-Z0-9-]{3,48}\/r[1-9][0-9]*\.json$/.test(p) ||
       !/^[0-9a-f]{40}$/.test(rec.plan_sha))return false;
    try{
      const bytes=fs.readFileSync(path.join(p));
      const sha=createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex');
      if(sha!==rec.plan_sha)return false;
      const d=JSON.parse(bytes.toString('utf8'));
      return !!(d.plan_id && d.revision>=1 &&
        p===`workspace/plans/${d.plan_id}/r${d.revision}.json` &&
        ['scope','non_goals','acceptance_criteria','qa_plan','balance_analysis','risk_analysis','consensus_resolution']
          .every(k=>nonblank(d[k])) &&
        Array.isArray(d.staffing_proposal) && d.staffing_proposal.length>0 &&
        d.staffing_proposal.every(x=>nonblank(x.role) && nonblank(x.parent) && nonblank(x.scope)));
    }catch{return false;}
  };
  const bootstrap=msgs[0];
  if(!named(bootstrap,'OWNER','CEO')||bootstrap.kind!=='APPOINTMENT')
    err('one-time new CEO appointment is required');
  const app=at('APPOINTMENT');
  for(const m of app){
    if(['GAME-ADVISOR','GAME-ADVISOR-DEPUTY'].includes(m.to_role)){
      if(m.from_role!=='CEO')err('both initial advisors must be appointed by CEO');
    }else if(['DCEO-A','DCEO-B'].includes(m.to_role)){
      if(m.from_role!=='CEO')err('two deputy CEOs must be appointed by CEO');
    }else if(m.to_role!=='CEO' && !/^(DIR-[A-Z]+|TL-[A-Z]+[12]|E-[A-Z]+[12]-[123])$/.test(m.to_role)){
      err('unrecognized V9 starter appointment '+m.to_role);
    }
  }
  const advApps=app.filter(m=>['GAME-ADVISOR','GAME-ADVISOR-DEPUTY'].includes(m.to_role));
  if(advApps.some(m=>app.filter(x=>x.to_role===m.to_role).length!==1))
    err('exactly one appointment each for the two advisors');
  if(stage>=1 && (!roles.has('GAME-ADVISOR')||!roles.has('GAME-ADVISOR-DEPUTY') ||
    !['GAME-ADVISOR','GAME-ADVISOR-DEPUTY'].every(r=>advApps.some(m=>m.to_role===r))))
    err('new CEO must appoint ONLY both advisors before proceeding');
  const presentations=at('ADVISOR_PRESENTATION');
  if(presentations.some(m=>!named(m,'GAME-ADVISOR','OWNER') ||
    !['NP','OWNER_IDEA'].includes(m.presentation?.source) ||
    !nonblank(m.presentation?.proposal_text) || !nonblank(m.presentation?.observed_game_evidence)))
    err('presentation must be advisor full proposal to Owner from NP or idea');
  // The advisor must actually receive NP or an Owner idea and display the
  // complete saved proposal to Owner before advancing to wait-for-C.
  for(const p of presentations){
    const dir=path.join(root,'chats',p.from_appointment_id,'events');
    try{
      const events=fs.readdirSync(dir).sort()
        .filter(name=>/^\\d{6}\\.json$/.test(name))
        .map(name=>JSON.parse(fs.readFileSync(path.join(dir,name),'utf8')));
      const shown=events.findIndex(x=>x.speaker==='AI'&&x.appointment_id===p.from_appointment_id &&
        Array.isArray(x.message_refs)&&x.message_refs.includes(p.message_id) &&
        (x.text.trim()===p.presentation.proposal_text.trim() ||
          (x.redacted===true && nonblank(x.reason))));
      if(shown<1)throw Error('missing complete Owner-visible proposal journal');
      const ownerRequests=events.slice(0,shown).filter(x=>x.speaker==='OWNER');
      const hasOwnerRequest=ownerRequests.some(x=>
        p.presentation.source==='NP' ? x.text.trim().toUpperCase()==='NP' :
          nonblank(x.text) && !['NP','C','I','NX','MN','ST','SYNC'].includes(x.text.trim().toUpperCase()));
      if(!hasOwnerRequest)throw Error('NP or Owner game idea did not precede proposal');
    }catch(e){err('advisor must wait for real NP/idea and visibly present full proposal: '+e.message);}
  }
  const handoffs=at('ADVISOR_HANDOFF');
  for(const m of handoffs) {
    if(!named(m,'GAME-ADVISOR','GAME-ADVISOR-DEPUTY'))err('advisor handoff recipient invalid');
    const p=byID.get(m.handoff?.presentation_message_id);
    if(!p||p.kind!=='ADVISOR_PRESENTATION'||p.sequence>=m.sequence) {
      err('handoff must reference earlier advisor presentation');continue;
    }
    const journal=m.handoff?.owner_c_journal_path||'';
    const prefix='workspace/chats/'+m.from_appointment_id+'/events/';
    if(!journal.startsWith(prefix)||!/^\d{6}\.json$/.test(journal.slice(prefix.length))){
      err('handoff missing safe advisor Owner C journal path');continue;
    }
    try{
      const e=JSON.parse(fs.readFileSync(path.join(journal),'utf8'));
      if(e.role_id!=='GAME-ADVISOR'||e.appointment_id!==m.from_appointment_id||
         e.speaker!=='OWNER'||e.text.trim()!=='C'||e.round_id!==rid)
        throw Error('journal C mismatch');
      const idx=e.sequence;
      if(!Number.isSafeInteger(idx)||idx<2)throw Error('journal C ordering');
      const eventsDir=path.dirname(journal);
      let presentationShown=false;
      for(let n=1;n<idx;n++){
        const item=JSON.parse(fs.readFileSync(path.join(eventsDir,String(n).padStart(6,'0')+'.json'),'utf8'));
        if(item.speaker==='AI' && Array.isArray(item.message_refs) &&
           item.message_refs.includes(p.message_id) && nonblank(item.text) &&
           item.text!=='C' && item.text!=='[UNAVAILABLE]')presentationShown=true;
      }
      if(!presentationShown)throw Error('owner C before full visible proposal');
    }catch(e){err('handoff lacks actual Owner C after full proposal in advisor chat: '+e.message);}
  }
  const deputyProposals=at('PROPOSAL').filter(m=>m.from_role==='GAME-ADVISOR-DEPUTY');
  for(const m of deputyProposals){
    const h=byID.get(m.advisor_handoff_message_id);
    if(m.to_role!=='CEO'||!nonblank(m.independent_findings)||
       !h||h.kind!=='ADVISOR_HANDOFF'||h.sequence>=m.sequence)
      err('deputy proposal must independently extend a verified advisor handoff and go directly to CEO');
  }
  for(const m of msgs.filter(x=>['GAME-ADVISOR','GAME-ADVISOR-DEPUTY'].includes(x.from_role))){
    const appointed=advApps.find(x=>x.to_role===m.from_role);
    if(!appointed || m.sequence<=appointed.sequence)
      err('advisor cannot send planning messages before appointment: '+m.from_role);
  }
  const latestPresentation=presentations.at(-1);
  const handoff=handoffs.at(-1);
  const deputy=deputyProposals.at(-1);
  const dApps=app.filter(m=>['DCEO-A','DCEO-B'].includes(m.to_role));
  for(const m of msgs.filter(x=>['DCEO-A','DCEO-B'].includes(x.from_role))){
    const appointment=dApps.find(x=>x.to_role===m.from_role);
    if(!appointment || m.sequence<=appointment.sequence)
      err('DCEO cannot send reviews/signatures before actual appointment: '+m.from_role);
  }
  if(dApps.some(m=>app.filter(x=>x.to_role===m.to_role).length!==1))
    err('each deputy CEO may be appointed only once');
  for(const m of dApps){
    if(!deputy||m.sequence<=deputy.sequence)err('DCEO appointment before deputy proposal');
    const receiptPath=deputy && `workspace/receipts/M${String(deputy.sequence).padStart(6,'0')}/${deputy.to_appointment_id}.json`;
    try{
      const receipt=JSON.parse(fs.readFileSync(path.join(receiptPath),'utf8'));
      if(receipt.message_id!==deputy.message_id ||
         receipt.recipient_appointment_id!==deputy.to_appointment_id)
        throw Error('wrong deputy receipt');
    }catch{err('CEO must read receipt deputy proposal before creating either DCEO');}
  }
  if(stage>=4&&(!roles.has('DCEO-A')||!roles.has('DCEO-B')||
    !['DCEO-A','DCEO-B'].every(r=>dApps.some(m=>m.to_role===r))))
    err('DCEO_CONSENSUS stage requires two separately appointed deputy CEOs');
  const reviews=at('PLAN_REVIEW');
  for(const m of reviews){
    if(!((named(m,'DCEO-A','DCEO-B'))||(named(m,'DCEO-B','DCEO-A'))) ||
      !nonblank(m.review?.assessment) || !nonblank(m.review?.references) ||
      !['DISCUSS','AGREE','NEEDS_REVISION'].includes(m.review?.verdict) ||
      !actualPlan(m.review))err('PLAN_REVIEW must exchange actual versioned plan between both deputies');
  }
  const signs=at('PLAN_SIGNOFF');
  for(const m of signs){
    if(!['DCEO-A','DCEO-B'].includes(m.from_role)||m.to_role!=='CEO'||
      m.signoff?.decision!=='APPROVED'||
      m.signoff?.signature_role!==m.from_role ||
      m.signoff?.signature_appointment_id!==m.from_appointment_id ||
      !nonblank(m.signoff?.rationale)||!actualPlan(m.signoff))
      err('PLAN_SIGNOFF must be separate genuine role signature on actual plan blob');
    const relevant=reviews.filter(v=>v.from_role===m.from_role&&v.to_role!==m.from_role&&v.sequence<m.sequence);
    const last=relevant.at(-1);
    if(!last||last.review?.verdict!=='AGREE'||
       last.review?.plan_path!==m.signoff?.plan_path||
       last.review?.plan_sha!==m.signoff?.plan_sha)
      err('PLAN_SIGNOFF requires prior latest AGREE by each DCEO on identical final plan');
  }
  const approvals=at('PLAN_APPROVAL');
  for(const m of approvals){
    if(!named(m,'CEO','DCEO-A')||!nonblank(m.approval?.rationale)||
      !actualPlan(m.approval))err('PLAN_APPROVAL invalid plan or CEO path');
    const ids=m.approval?.signoff_message_ids;
    if(!Array.isArray(ids)||ids.length!==2||new Set(ids).size!==2){err('PLAN_APPROVAL needs exactly two separate signatures');continue;}
    const both=ids.map(x=>byID.get(x));
    if(both.some(x=>!x||x.kind!=='PLAN_SIGNOFF'||x.sequence>=m.sequence) ||
       new Set(both.map(x=>x?.from_role)).size!==2 ||
       !['DCEO-A','DCEO-B'].every(x=>both.some(m=>m?.from_role===x))||
       both.some(x=>x.signoff?.plan_sha!==m.approval.plan_sha ||
         x.signoff?.plan_path!==m.approval.plan_path))
       err('PLAN_APPROVAL signatures missing/mismatched plan or roles');
    const folder=path.dirname(m.approval.plan_path);
    const revision=Number(/\/r(\d+)\.json$/.exec(m.approval.plan_path)?.[1]);
    try{
      if(fs.readdirSync(folder).some(x=>/^r\d+\.json$/.test(x) && Number(x.slice(1,-5))>revision))
        err('approval superseded by later plan revision; new signatures required');
    }catch{err('approval plan directory unavailable');}
  }
  const approved=approvals.at(-1);
  const retirement=at('ROLE_RETIRED');
  for(const m of retirement){
    if(!named(m,'CEO','OWNER')||!planners.includes(m.retirement?.role_id)||
       !nonblank(m.retirement?.appointment_id)||!nonblank(m.retirement?.reason)||
       !approved||m.sequence<=approved.sequence||
       m.retirement.approved_plan_sha!==approved.approval?.plan_sha||
       roles.get(m.retirement.role_id)?.appointment_id!==m.retirement.appointment_id)
      err('invalid or premature temporary planner retirement');
  }
  const retired=planners.every(role=>retirement.filter(m=>m.retirement?.role_id===role).length===1 &&
    roles.get(role)?.status==='CLOSED');
  const lastRetirement=retirement.at(-1);
  const executionRoles=[...roles.values()].filter(r=>r.role_id!=='CEO'&&!planners.includes(r.role_id));
  for(const r of executionRoles){
    if(r.role_id==='ORG-ADVISOR')err('do not autoappoint governance advisor in V9 mission');
    const appointment=app.find(m=>m.to_role===r.role_id);
    if(!appointment || !approved || !retired || !lastRetirement ||
       appointment.sequence<=lastRetirement.sequence)
      err('execution role appointed before signed-plan approval and four retirements: '+r.role_id);
  }
  const charters=at('MISSION_CHARTER');
  for(const m of charters){
    if(!approved || !retired || !lastRetirement || m.sequence<=lastRetirement.sequence||
       m.mission?.approved_plan_sha!==approved.approval.plan_sha ||
       !executionRoles.some(x=>x.role_id===m.to_role))
      err('MISSION_CHARTER requires signed final plan and retired planning council');
  }
  const forbidden=msgs.filter(m=>m.kind==='TASK' || m.kind==='TASK_ACCEPTANCE' || m.kind==='RELEASE');
  for(const m of forbidden){
    if(!charters.some(c=>c.sequence<m.sequence))err('implementation/release attempted before valid mission charter');
  }
  if(stage<4 && (dApps.length||reviews.length||signs.length||approvals.length||retirement.length))
    err('DCEO activity forbidden before DCEO_CONSENSUS');
  if(stage<5 && (executionRoles.length||charters.length||forbidden.length))
    err('execution roles, charter and work forbidden until EXECUTION stage');
  if(stage<3 && (handoffs.length||deputyProposals.length))
    err('deputy review cannot precede advisor C/handoff');
  if(stage<2 && presentations.length)err('cannot present before WAIT_OWNER_C');
  if(stage===1 && latestPresentation)err('WAIT_NP must not contain an unacknowledged presentation');
  if(stage===2 && !latestPresentation)err('WAIT_OWNER_C requires a full advisor presentation');
  if(stage>=3 && !handoff)err('DEPUTY_REVIEW requires C-gated advisor handoff');
  if(stage>=4 && !deputy)err('DCEO_CONSENSUS requires independent deputy proposal');
  if(stage>=5 && (!approved||!retired))err('EXECUTION requires two matching signatures, CEO approval and four closed planning roles');
  if(stage<5 && executionRoles.length)err('only CEO and two advisors/two DCEOs may be rostered before execution');
}
