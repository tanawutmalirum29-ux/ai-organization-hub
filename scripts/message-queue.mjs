#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {nextCourierPlan} from './courier.mjs';

// Actionable-message queue, not a read receipt ledger.
export function messageQueueCounts(workspace){
 const roster=JSON.parse(fs.readFileSync(path.join(workspace,'roster.json'),'utf8'));
 const round=JSON.parse(fs.readFileSync(path.join(workspace,'round.json'),'utf8'));
 if(round.state!=='ACTIVE')throw Error('MQ requires an active organization');
 const plan=nextCourierPlan(workspace);
 const byRole=new Map(plan.actionable_roles.map(x=>[x.role_id,x.total]));
 const items=roster.roles.filter(x=>x.status!=='CLOSED').map(x=>({
   role_id:x.role_id,appointment_id:x.appointment_id,
   actionable_pending:byRole.get(x.role_id)??0,
   needs_first_appointment:plan.first_appointments.some(p=>p.appointment_id===x.appointment_id)
 }));
 return {round_id:round.round_id,items,
   deferred_dceo_signoffs:plan.deferred_partial_signoffs,
   mn_codes:plan.mn_codes,appointment_codes:plan.first_appointment_codes,
   text:items.map(x=>x.role_id+':'+x.actionable_pending).join(' '),
   note:'Actionable messages without a recorded direct reply, not verified unread state. No receipts required.'};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{
  if(process.argv.length!==3)throw Error('Usage: node scripts/message-queue.mjs <workspace>');
  process.stdout.write(JSON.stringify(messageQueueCounts(process.argv[2]),null,2)+'\n');
 }catch(e){console.error('ER: '+e.message);process.exitCode=1;}
}
