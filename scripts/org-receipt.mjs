#!/usr/bin/env node
// Read-only template. Only the actual AI recipient can create READ after real reading.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {isMessageRead,receiptShapeErrors} from './receipt-contract.mjs';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
export function prepareReceiptDraft({workspace='workspace',messageId,appointmentId,
  now=new Date().toISOString()}){
  const round=read(path.join(workspace,'round.json'));
  const roster=read(path.join(workspace,'roster.json'));
  const prefix=round.round_id+'-M';
  if(typeof messageId!=='string'||!messageId.startsWith(prefix)||
     !/^\d{6}$/.test(messageId.slice(prefix.length)))
    throw Error('Invalid message ID for round');
  if(roster.round_id!==round.round_id||round.state!=='ACTIVE')
    throw Error('Round not ACTIVE or roster mismatch');
  const who=roster.roles.find(x=>x.appointment_id===appointmentId);
  if(!who||who.status==='CLOSED')throw Error('Invalid or closed recipient appointment');
  const seq=messageId.slice(prefix.length),message=read(path.join(workspace,'messages',seq+'.json'));
  if(message.message_id!==messageId||message.round_id!==round.round_id||
     message.to_role!==who.role_id||message.to_appointment_id!==appointmentId)
    throw Error('Wrong recipient/message identity');
  const target='workspace/receipts/M'+seq+'/'+appointmentId+'.json';
  const local=path.join(workspace,'receipts','M'+seq,appointmentId+'.json');
  if(fs.existsSync(local)){
    try{if(isMessageRead(read(local),message,appointmentId))
      return {already_read:true,target_path:target,record:null,dry_run:true};}
    catch{}
    throw Error('Existing invalid marker: message remains unread; do not overwrite');
  }
  const record={round_id:round.round_id,message_id:messageId,
    recipient_appointment_id:appointmentId,read_at:now};
  const errors=receiptShapeErrors(record,round.round_id);
  if(errors.length)throw Error(errors.join('; '));
  return {already_read:false,target_path:target,record,dry_run:true,
    reminder:'Only actual recipient saves after reading; no task/approval status implied'};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{
  if(process.argv.length!==5)throw Error('Usage: node scripts/org-receipt.mjs <workspace> <message-id> <recipient-appointment-id>');
  console.log(JSON.stringify(prepareReceiptDraft({workspace:process.argv[2],
    messageId:process.argv[3],appointmentId:process.argv[4]}),null,2));
 }catch(e){console.error('ER: '+e.message);process.exitCode=1;}
}
