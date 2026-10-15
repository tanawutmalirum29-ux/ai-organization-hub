#!/usr/bin/env node
// Read-only courier plan. Read-only: it NEVER ACKs another AI's messages.
// A real CEO must additionally verify game Issues/PR/CI for status/blockers.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {getPendingInbox} from './inbox.mjs';

const load = file => JSON.parse(fs.readFileSync(file,'utf8'));
export function codeForRole(role,prefix='MN') {
  if (!['MN','AP'].includes(prefix))throw Error('Bad prefix');
  if (['CEO','GAME-ADVISOR','GAME-ADVISOR-DEPUTY','ORG-ADVISOR','DCEO-A','DCEO-B'].includes(role))return prefix+'-'+role;
  const d=/^DIR-([A-Z]+)$/.exec(role);if(d)return prefix+'-'+d[1]+'-DIR';
  const tl=/^TL-([A-Z]+)([12])$/.exec(role);if(tl)return prefix+'-'+tl[1]+tl[2]+'-TL';
  const en=/^E-([A-Z]+)([12])-([123])$/.exec(role);if(en)return prefix+'-'+en[1]+en[2]+'-'+en[3]+'-E';
  throw Error('Unrecognized live role '+role);
}

export function nextCourierPlan(workspace) {
  const round=load(path.join(workspace,'round.json'));
  const roster=load(path.join(workspace,'roster.json'));
  if(round.state!=='ACTIVE')throw Error('Organization is not ACTIVE');
  if(round.round_id!==roster.round_id||!Array.isArray(roster.roles))throw Error('Round/roster mismatch');
  //  suppresses notifying CEO for an unmatched first DCEO PLAN_SIGNOFF.
  // Both independently authored messages, the exact plan blob, and fresh IDs
  // must match before the ONE Owner courier notification is appropriate.
  let pendingApprovalReady = true, deferredSignoffs = 0;
  {
    const entries=fs.readdirSync(path.join(workspace,'messages'))
      .filter(n=>/^[0-9]{6}[.]json$/.test(n)).sort()
      .map(n=>load(path.join(workspace,'messages',n)));
    const ceo=roster.roles.find(x=>x.role_id==='CEO');
    const sig=entries.filter(x=>x.kind==='PLAN_SIGNOFF' && x.to_role==='CEO'
      && x.to_appointment_id===ceo?.appointment_id);
    const roleOk=role=>roster.roles.some(r=>r.role_id===role
      && sig.some(x=>x.from_role===role && x.from_appointment_id===r.appointment_id &&
        x.signoff?.signature_role===role &&
        x.signoff?.signature_appointment_id===r.appointment_id &&
        x.signoff?.decision==='APPROVED'));
    pendingApprovalReady=false;
    if(roleOk('DCEO-A') && roleOk('DCEO-B')){
      const a=sig.filter(x=>x.from_role==='DCEO-A');
      const b=sig.filter(x=>x.from_role==='DCEO-B');
      pendingApprovalReady=a.some(x=>b.some(y=>{
        if(!x.signoff?.plan_sha || !/^[0-9a-f]{40}$/.test(x.signoff.plan_sha) ||
           !x.signoff.plan_path || x.signoff.plan_sha!==y.signoff?.plan_sha ||
           x.signoff.plan_path!==y.signoff?.plan_path ||
           !/^workspace\/plans\/[A-Z0-9-]+\/r[1-9][0-9]*[.]json$/.test(x.signoff.plan_path))return false;
        try{
          const bytes=fs.readFileSync(path.join(workspace,'..',x.signoff.plan_path));
          return createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex')===x.signoff.plan_sha;
        }catch{return false;}
      }));
    }
    deferredSignoffs=pendingApprovalReady?0:sig.length;
  }
  const routing=[], firstAppointments=[], unread=[];
  const seen=new Set();
  for(const r of roster.roles) {
    if(r.status==='CLOSED')continue;
    if(seen.has(r.role_id))throw Error('Duplicate role in active roster');
    seen.add(r.role_id);
    const box=getPendingInbox(workspace,r.role_id,r.appointment_id);
    const first=box.pending.filter(x=>x.kind==='APPOINTMENT');
    const ordinary=box.pending.filter(x=>x.kind!=='APPOINTMENT'
      && !(r.role_id==='CEO' &&
        x.kind==='PLAN_SIGNOFF' && !pendingApprovalReady));
    if(!first.length && !ordinary.length)continue;
    if(first.length)firstAppointments.push({code:codeForRole(r.role_id,'AP'),
      role_id:r.role_id,appointment_id:r.appointment_id,message_ids:first.map(x=>x.message_id)});
    // For a newly appointed chat, deliver its one-time full APPOINTMENT first,
    // then MN is appropriate for any other pending M after appointment ACK.
    if(ordinary.length && !first.length)routing.push({code:codeForRole(r.role_id),
      role_id:r.role_id,appointment_id:r.appointment_id,message_ids:ordinary.map(x=>x.message_id)});
    unread.push({role_id:r.role_id,total:first.length+ordinary.length});
  }
  return {round_id:round.round_id,source:'verified GitHub round workspace, not proof of physical chat delivery',
    first_appointment_codes:firstAppointments.map(x=>x.code),
    mn_codes:routing.map(x=>x.code),
    unread_roles:unread,first_appointments:firstAppointments,routing,
    deferred_partial_signoffs:deferredSignoffs,
    owner_code_line:[...firstAppointments.map(x=>x.code),...routing.map(x=>x.code)].join(' '),
    startup_phase:round.startup_phase??null,
    next_owner_hint:round.startup_phase==='WAIT_NP'
      ? 'P — advisor awaits OWNER NP or Owner game idea; CEO must not hire execution team'
      : round.startup_phase==='WAIT_OWNER_C'
        ? 'P — GAME-ADVISOR awaits OWNER C after full visible proposal'
        : 'Check active Issues/PR/CI; absence of unread messages does not mean delivery is complete',
    next_step:'CEO must still independently check active task/Issue/PR/CI status; zero unread does not prove completion'};
}
if (process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  try {
    if(process.argv.length!==3)throw Error('Usage: node scripts/courier.mjs <workspace-path>');
    process.stdout.write(JSON.stringify(nextCourierPlan(process.argv[2]),null,2)+'\n');
  }catch(e){console.error('ER: '+e.message);process.exitCode=1;}
}
