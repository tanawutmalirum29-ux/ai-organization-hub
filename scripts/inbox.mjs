#!/usr/bin/env node
// GitHub evidence of actionable messages, without per-read writes.
// Response records are not proof of delivery or private-chat reading.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const load = p => JSON.parse(fs.readFileSync(p,'utf8'));
const safe = s => typeof s==='string' && /^[A-Z0-9][A-Z0-9-]*$/.test(s);

export function getPendingInbox(workspace,roleId,appointmentId) {
  if(!safe(roleId)||!safe(appointmentId)) throw Error('Invalid role/appointment ID');
  const round=load(path.join(workspace,'round.json'));
  const roster=load(path.join(workspace,'roster.json'));
  if(!round.round_id||!Array.isArray(roster.roles)) throw Error('Invalid organization workspace');
  if(round.state!=='ACTIVE') throw Error('Round not ACTIVE');
  const recipient=roster.roles.find(r=>r.role_id===roleId);
  if(!recipient||recipient.appointment_id!==appointmentId||recipient.status==='CLOSED')
    throw Error('Appointed role not active or ID mismatch');
  const folder=path.join(workspace,'messages');
  const names=fs.readdirSync(folder).filter(n=>/^\d{6}\.json$/.test(n)).sort();
  const messages=names.map((name,i)=>{
    if(name!==String(i+1).padStart(6,'0')+'.json') throw Error('Gap in numbered ledger');
    const m=load(path.join(folder,name));
    if(m.round_id!==round.round_id||
       m.message_id!==round.round_id+'-M'+String(i+1).padStart(6,'0'))
      throw Error('Message identity mismatch');
    return m;
  });
  const incoming=messages.filter(m=>m.to_role===roleId&&m.to_appointment_id===appointmentId);
  const authored=messages.filter(m=>m.from_role===roleId&&m.from_appointment_id===appointmentId);
  const hasRecordedResponse=m=>authored.some(out=>{
    if((out.sequence??Number(out.message_id.slice(-6))) <=
        (m.sequence??Number(m.message_id.slice(-6))))return false;
    // A real outgoing record establishes that this appointment was taken up.
    if(m.kind==='APPOINTMENT')return true;
    // Only an explicit reply to this message demonstrates an answer.
    return out.in_reply_to===m.message_id;
  });
  const pending=[],answered=[];
  for(const m of incoming){
    const item={message_id:m.message_id,from_role:m.from_role,kind:m.kind,
      summary:m.summary,source_path:'workspace/messages/'+m.message_id.slice(-6)+'.json'};
    if(hasRecordedResponse(m))answered.push(item);
    else pending.push(item);
  }
  return {round_id:round.round_id,role_id:roleId,appointment_id:appointmentId,
    pending_count:pending.length,pending,answered_count:answered.length,answered,
    delivery_unverified:true,
    note:'Pending means no recorded direct response. It does not prove unread. Check this same chat and GitHub results before acting; do not write receipt files.'};
}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  try{
    if(process.argv.length!==5)throw Error('Usage: node scripts/inbox.mjs <workspace> <role> <appointment>');
    process.stdout.write(JSON.stringify(getPendingInbox(process.argv[2],process.argv[3],process.argv[4]),null,2)+'\n');
  }catch(e){console.error('ER: '+e.message);process.exitCode=1;}
}
