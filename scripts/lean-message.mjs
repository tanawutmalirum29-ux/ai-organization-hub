// Minimal, audit-friendly message envelopes. Pure construction: never writes to GitHub.
// Always verify the real plan blob, peer actions, next sequence, and current policy first.
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const idPattern=/^[A-Z0-9][A-Z0-9-]{2,39}$/;
const rolePattern=/^[A-Z][A-Z0-9-]*$/;
const shaPattern=/^[a-f0-9]{40}$/;
const messageKinds=new Set([
  'APPOINTMENT','TASK','RESULT','BLOCKED','REJECTED','FEEDBACK',
  'PROPOSAL','DECISION','CONSULTATION_REQUEST','MISSION_CHARTER',
  'ADVISOR_PRESENTATION','ADVISOR_HANDOFF','PLAN_REVIEW','PLAN_SIGNOFF',
  'PLAN_APPROVAL','ROUND_CLOSED','RELEASE'
]);
function safeLine(value,name,max=500){
  if(typeof value!=='string'||!value.trim()||value.length>max||/[\r\n\x00-\x1f]/.test(value))
    throw new Error(name+' must be nonempty, single-line and <= '+max+' chars');
  return value.trim();
}
function appointment(round,role,value){
  if(role==='OWNER'){if(value!=='OWNER')throw new Error('OWNER appointment must be OWNER');return value;}
  if(!rolePattern.test(role)||typeof value!=='string'||!value.startsWith(round+'-'+role+'-')||!/^[A-Z0-9-]+$/.test(value))
    throw new Error('Invalid '+role+' appointment ID');
  return value;
}
function planRef(data,name) {
  if(!data||typeof data!=='object'||Array.isArray(data))throw new Error(name+' is required');
  const p=safeLine(data.plan_path,name+'.plan_path',300);
  if(!/^workspace\/plans\/[A-Z0-9-]+\/r[1-9][0-9]*\.json$/.test(p))
    throw new Error(name+' requires an immutable workspace/plans/.../rN.json path');
  if(!shaPattern.test(data.plan_sha))throw new Error(name+' requires 40-char lowercase real Git blob SHA');
  return {plan_path:p,plan_sha:data.plan_sha};
}
export function buildLeanMessage(input){
  if(!input||typeof input!=='object'||Array.isArray(input))throw new Error('Message input required');
  const round=safeLine(input.round_id,'round_id',40);
  if(!idPattern.test(round))throw new Error('Invalid round_id');
  const n=input.sequence;
  if(!Number.isSafeInteger(n)||n<1||n>999999)throw new Error('Invalid message sequence');
  const serial=String(n).padStart(6,'0');
  const id=round+'-M'+serial;
  const from_role=safeLine(input.from_role,'from_role',80);
  const to_role=safeLine(input.to_role,'to_role',80);
  if(from_role===to_role&&input.from_appointment_id===input.to_appointment_id)
    throw new Error('Cross-chat message cannot target the same appointment');
  const from_appointment_id=appointment(round,from_role,input.from_appointment_id);
  const to_appointment_id=appointment(round,to_role,input.to_appointment_id);
  const kind=safeLine(input.kind,'kind',60);
  if(!messageKinds.has(kind))throw new Error('Unknown or routine/non-actionable message kind');
  const task_ref=safeLine(input.task_ref,'task_ref',180);
  const summary=safeLine(input.summary,'summary',280);
  const parent=input.in_reply_to??null;
  if(parent!==null) {
    if(typeof parent!=='string'||!new RegExp('^'+round+'-M[0-9]{6}$').test(parent)||
       Number(parent.slice(-6))>=n)
      throw new Error('in_reply_to must reference an earlier real message in this round');
  }
  const msg={sequence:n,message_id:id,round_id:round,from_role,from_appointment_id,
    to_role,to_appointment_id,kind,event_key:round+':'+kind+':'+n,task_ref,
    in_reply_to:parent,summary};
  const relay=[
    'ROUND_ID: '+round,'MESSAGE_ID: '+id,
    'FROM_ROLE: '+from_role,'FROM_APPOINTMENT_ID: '+from_appointment_id,
    'TO_ROLE: '+to_role,'TO_APPOINTMENT_ID: '+to_appointment_id,
    'TASK_REF: '+task_ref,'IN_REPLY_TO: '+(parent??'NONE')
  ];
  if(kind==='PLAN_REVIEW'){
    if(!['DCEO-A','DCEO-B'].includes(from_role)||
       !['DCEO-A','DCEO-B'].includes(to_role)||from_role===to_role)
      throw new Error('PLAN_REVIEW must exchange independently between DCEO-A/B');
    const r=input.review;const ref=planRef(r,'review');
    const verdict=safeLine(r.verdict,'review.verdict',25);
    if(!['AGREE','DISCUSS','NEEDS_REVISION'].includes(verdict))throw new Error('Invalid peer verdict');
    msg.review={...ref,verdict,assessment:safeLine(r.assessment,'review.assessment',5000),
      references:safeLine(r.references,'review.references',1500)};
    relay.push('PLAN_PATH: '+ref.plan_path,'PLAN_SHA: '+ref.plan_sha,'VERDICT: '+verdict);
  }else if(kind==='PLAN_SIGNOFF'){
    if(!['DCEO-A','DCEO-B'].includes(from_role)||to_role!=='CEO')
      throw new Error('PLAN_SIGNOFF requires DCEO author addressed to CEO');
    const s=input.signoff;const ref=planRef(s,'signoff');
    if(s.decision!=='APPROVED'||s.signature_role!==from_role||
       s.signature_appointment_id!==from_appointment_id)
      throw new Error('Cannot sign as another appointment or without APPROVED');
    msg.signoff={...ref,decision:'APPROVED',signature_role:from_role,
      signature_appointment_id:from_appointment_id,
      rationale:safeLine(s.rationale,'signoff.rationale',5000)};
    relay.push('PLAN_PATH: '+ref.plan_path,'PLAN_SHA: '+ref.plan_sha,
      'DECISION: APPROVED (planning signoff only)');
  }else{
    // Preserve mandatory kind-specific schema fields without allowing envelope overrides.
    const extra=input.extra??{};
    if(!extra||typeof extra!=='object'||Array.isArray(extra))throw new Error('extra must be object');
    const reserved=new Set([...Object.keys(msg),'relay_text','recorded_at']);
    for(const [key,value] of Object.entries(extra)){
      if(reserved.has(key)||!/^[_a-zA-Z][_a-zA-Z0-9]*$/.test(key))
        throw new Error('Extra field would override a protected envelope property');
      msg[key]=value;
    }
  }
  if(input.next_action!==undefined)relay.push('NEXT: '+safeLine(input.next_action,'next_action',250));
  msg.relay_text=relay.join('\n');
  return msg;
}
export function checkMessageForWrite(message,{existingIds=[],planSha=null}={}){
  if(existingIds.includes(message.message_id))throw new Error('Message already exists: never overwrite');
  const next=existingIds.map(id=>Number(id.slice(-6))).filter(Number.isSafeInteger);
  if(next.length && Math.max(...next)+1!==message.sequence)
    throw new Error('Message sequence stale: refetch GitHub directory');
  const ref=message.review||message.signoff;
  if(ref&&planSha!==ref.plan_sha)throw new Error('Real plan Git blob SHA not confirmed');
  return true;
}
// CLI accepts a local JSON payload for a dry run, outputs JSON only, and never writes.
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  try{
    if(process.argv.length!==3)throw new Error('Usage: node scripts/lean-message.mjs <local-payload.json>');
    const msg=buildLeanMessage(JSON.parse(fs.readFileSync(process.argv[2],'utf8')));
    process.stdout.write(JSON.stringify(msg,null,2)+'\n');
  }catch(e){console.error('ER: '+e.message);process.exitCode=1;}
}
