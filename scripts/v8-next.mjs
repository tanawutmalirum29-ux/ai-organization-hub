#!/usr/bin/env node
// Local V8 NX courier planner. Read-only: it NEVER ACKs another AI's messages.
// A real CEO must additionally verify game Issues/PR/CI for status/blockers.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {getPendingInbox} from './v8-inbox.mjs';

const load = file => JSON.parse(fs.readFileSync(file,'utf8'));
export function codeForRole(role,prefix='MN') {
  if (!['MN','AP'].includes(prefix))throw Error('Bad prefix');
  if (['CEO','GAME-ADVISOR','ORG-ADVISOR'].includes(role))return prefix+'-'+role;
  const d=/^DIR-([A-Z]+)$/.exec(role);if(d)return prefix+'-'+d[1]+'-DIR';
  const tl=/^TL-([A-Z]+)([12])$/.exec(role);if(tl)return prefix+'-'+tl[1]+tl[2]+'-TL';
  const en=/^E-([A-Z]+)([12])-([123])$/.exec(role);if(en)return prefix+'-'+en[1]+en[2]+'-'+en[3]+'-E';
  throw Error('Unrecognized live role '+role);
}

export function nextCourierPlan(workspace) {
  const round=load(path.join(workspace,'round.json'));
  const roster=load(path.join(workspace,'roster.json'));
  if(round.state!=='ACTIVE'||!['V8','V9'].includes(round.protocol_version))throw Error('Not an ACTIVE V8 round (V9 also supported)');
  if(round.round_id!==roster.round_id||!Array.isArray(roster.roles))throw Error('Round/roster mismatch');
  const routing=[], firstAppointments=[], unread=[];
  const seen=new Set();
  for(const r of roster.roles) {
    if(r.status==='CLOSED')continue;
    if(seen.has(r.role_id))throw Error('Duplicate role in active roster');
    seen.add(r.role_id);
    const box=getPendingInbox(workspace,r.role_id,r.appointment_id);
    const first=box.pending.filter(x=>x.kind==='APPOINTMENT');
    const ordinary=box.pending.filter(x=>x.kind!=='APPOINTMENT');
    if(!box.pending.length)continue;
    if(first.length)firstAppointments.push({code:codeForRole(r.role_id,'AP'),
      role_id:r.role_id,appointment_id:r.appointment_id,message_ids:first.map(x=>x.message_id)});
    // For a newly appointed chat, deliver its one-time full APPOINTMENT first,
    // then MN is appropriate for any other pending M after appointment ACK.
    if(ordinary.length && !first.length)routing.push({code:codeForRole(r.role_id),
      role_id:r.role_id,appointment_id:r.appointment_id,message_ids:ordinary.map(x=>x.message_id)});
    unread.push({role_id:r.role_id,total:box.pending_count});
  }
  return {round_id:round.round_id,source:'verified GitHub round workspace, not proof of physical chat delivery',
    first_appointment_codes:firstAppointments.map(x=>x.code),
    mn_codes:routing.map(x=>x.code),
    unread_roles:unread,first_appointments:firstAppointments,routing,
    owner_code_line:[...firstAppointments.map(x=>x.code),...routing.map(x=>x.code)].join(' '),
    next_step:'CEO must still independently check active task/Issue/PR/CI status; zero unread does not prove completion'};
}
if (process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  try {
    if(process.argv.length!==3)throw Error('Usage: node scripts/v8-next.mjs <workspace-path>');
    process.stdout.write(JSON.stringify(nextCourierPlan(process.argv[2]),null,2)+'\n');
  }catch(e){console.error('ER: '+e.message);process.exitCode=1;}
}
