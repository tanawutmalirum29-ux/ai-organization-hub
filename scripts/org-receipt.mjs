#!/usr/bin/env node
// Preflight only: does not write, acknowledge, or deliver anything.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {receiptShapeErrors} from './receipt-contract.mjs';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
export function prepareReceiptDraft({
  workspace='workspace',messageId,appointmentId,disposition,reason,
  trigger='MN',evidenceRef,now=new Date().toISOString()
}) {
  const round=read(path.join(workspace,'round.json'));
  const roster=read(path.join(workspace,'roster.json'));
  const prefix=round.round_id+'-M';
  if(typeof messageId!=='string'||!messageId.startsWith(prefix)||
     !/^\d{6}$/.test(messageId.slice(prefix.length)))
    throw Error('Invalid message ID for round');
  if(roster.round_id!==round.round_id||round.state!=='ACTIVE')
    throw Error('Round not ACTIVE or roster mismatch');
  if(!/^[A-Z0-9]+(?:-[A-Z0-9]+)*$/.test(appointmentId||''))
    throw Error('Invalid recipient appointment ID');
  const who=roster.roles.find(r=>r.appointment_id===appointmentId);
  if(!who||who.status!=='ACTIVE')
    throw Error('Only an active recipient may draft a receipt');
  const seq=messageId.slice(prefix.length);
  const message=read(path.join(workspace,'messages',seq+'.json'));
  if(message.message_id!==messageId||message.round_id!==round.round_id||
     message.to_role!==who.role_id||message.to_appointment_id!==appointmentId)
    throw Error('Receipt recipient/message identity mismatch');
  const out=path.join(workspace,'receipts','M'+seq,appointmentId+'.json');
  if(fs.existsSync(out))throw Error('Immutable receipt already exists');
  const record={round_id:round.round_id,message_id:messageId,
    recipient_role:who.role_id,recipient_appointment_id:appointmentId,
    trigger,disposition,reason,read_at:now};
  if(evidenceRef!==undefined&&evidenceRef!=='')record.evidence_ref=evidenceRef;
  const errors=receiptShapeErrors(record,round.round_id);
  if(errors.length)throw Error(errors.join('; '));
  if(typeof record.evidence_ref==='string'&&record.evidence_ref.startsWith(prefix)){
    const refSeq=record.evidence_ref.slice(prefix.length);
    if(!/^\d{6}$/.test(refSeq)||
       !fs.existsSync(path.join(workspace,'messages',refSeq+'.json'))||
       read(path.join(workspace,'messages',refSeq+'.json')).message_id!==record.evidence_ref)
      throw Error('Evidence references missing local M');
    if(disposition==='SUPERSEDED'&&Number(refSeq)<=Number(seq))
      throw Error('SUPERSEDED requires a later M');
  }
  return {target_path:'workspace/receipts/M'+seq+'/'+appointmentId+'.json',
    record,dry_run:true,
    reminder:'Only the real recipient after OWNER relay may save this draft. Preview is not receipt or delivery.'};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  try {
    const args=process.argv.slice(2);
    if(args.length<6||args.length>7)throw Error(
      'Usage: node scripts/org-receipt.mjs <workspace> <message-id> <appointment-id> <disposition> <reason> <trigger> [evidence-ref]');
    const [workspace,messageId,appointmentId,disposition,reason,trigger,evidenceRef]=args;
    console.log(JSON.stringify(prepareReceiptDraft({
      workspace,messageId,appointmentId,disposition,reason,trigger,evidenceRef
    }),null,2));
  }catch(e){console.error('ER: '+e.message);process.exitCode=1;}
}
