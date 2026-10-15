#!/usr/bin/env node
// V8 offline inbox enumerator (read-only). Live ChatGPT roles can perform the
// equivalent GitHub directory scan through the connected GitHub integration.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const read = file => JSON.parse(fs.readFileSync(file,'utf8'));
const isSafe = value => typeof value==='string' && /^[A-Z0-9][A-Z0-9-]*$/.test(value);

export function getPendingInbox(workspace,roleId,appointmentId) {
  if (!isSafe(roleId)||!isSafe(appointmentId)) throw Error('Invalid role/appointment ID');
  const round=read(path.join(workspace,'round.json'));
  const roster=read(path.join(workspace,'roster.json'));
  const role=roster.roles?.find(x=>x.role_id===roleId);
  if (!['V8','V9','V10'].includes(round.protocol_version)) throw Error('V8/V9 short-code protocol not active');
  if (round.state!=='ACTIVE') throw Error('Round not ACTIVE');
  if (!role||role.appointment_id!==appointmentId||role.status==='CLOSED')
    throw Error('Fresh appointed role not active or ID mismatch');
  const dir=path.join(workspace,'messages');
  const files=fs.readdirSync(dir).sort().filter(n=>/^\d{6}\.json$/.test(n));
  const pending=[],receipted=[];
  for(let i=0;i<files.length;i++){
    if(files[i]!==String(i+1).padStart(6,'0')+'.json') throw Error('Gap in numbered ledger');
    const m=read(path.join(dir,files[i]));
    if(m.round_id!==round.round_id||m.message_id!==round.round_id+'-M'+String(i+1).padStart(6,'0'))
      throw Error('Message identity mismatch');
    if(m.to_role!==roleId||m.to_appointment_id!==appointmentId)continue;
    const receiptPath=path.join(workspace,'receipts','M'+files[i].slice(0,6),appointmentId+'.json');
    if(fs.existsSync(receiptPath)){
      const rec=read(receiptPath);
      if(rec.message_id!==m.message_id||rec.recipient_role!==roleId||
         rec.recipient_appointment_id!==appointmentId||
         !['HANDLED','ACTION_STARTED','SUPERSEDED','NO_ACTION','BLOCKED','REJECTED'].includes(rec.disposition))
         throw Error('Invalid stored receipt: '+receiptPath);
      receipted.push({message_id:m.message_id,disposition:rec.disposition});
    }else pending.push({message_id:m.message_id,from_role:m.from_role,kind:m.kind,summary:m.summary,source_path:'workspace/messages/'+files[i]});
  }
  return {round_id:round.round_id,role_id:roleId,appointment_id:appointmentId,
    pending_count:pending.length,pending,already_receipted_count:receipted.length,already_receipted:receipted};
}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  try {
    if(process.argv.length!==5)throw Error('Usage: node scripts/v8-inbox.mjs <workspace-path> <role-id> <appointment-id>');
    process.stdout.write(JSON.stringify(getPendingInbox(process.argv[2],process.argv[3],process.argv[4]),null,2)+'\n');
  }catch(e){console.error('ER: '+e.message);process.exitCode=1;}
}
