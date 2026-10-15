#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

/**
 * V8 round-scoped audit checks. Not a ChatGPT transcript capture service:
 * content exists only if the appointed AI actually wrote immutable files.
 */
export function validateV8Artifacts({root='workspace',round,roster,msgs,fail}) {
  if (!['V8','V9','V10'].includes(round?.protocol_version)) return;
  const issue = (s) => fail('V8: ' + s);
  const rid = round.round_id;
  const roles = new Map((roster?.roles ?? []).map(x => [x.appointment_id,x.role_id]));
  const byId = new Map(msgs.map(m => [m.message_id,m]));
  const six = /^M\d{6}$/;
  const fileName = /^M\d{6}$/;
  const safeAppointment = /^([A-Z0-9]+(?:-[A-Z0-9]+)*)$/;
  const date = s => typeof s === 'string' && !Number.isNaN(Date.parse(s)) && /^\d{4}-\d{2}-\d{2}T/.test(s);
  const read = p => { try { return JSON.parse(fs.readFileSync(p,'utf8')); } catch(e){ issue('Unreadable JSON '+p+': '+e.message); return null; } };
  const list = p => fs.existsSync(p) ? fs.readdirSync(p).sort() : [];
  const isNonempty = x => typeof x === 'string' && x.trim().length > 0;
  const historic = round.appointment_history ?? [];
  if (!Array.isArray(historic)) issue('appointment_history must be an array when present');
  else for (const h of historic) {
    if (!isNonempty(h.role_id) || !isNonempty(h.appointment_id) ||
        !Number.isSafeInteger(h.retired_after_sequence) || h.retired_after_sequence < 1)
      issue('malformed historic appointment');
    else if (roles.has(h.appointment_id) || historic.filter(x=>x.appointment_id===h.appointment_id).length !== 1)
      issue('historical appointment duplicate or still active');
  }
  const appointed = (app,role,seq=Infinity) =>
    (roles.get(app)===role) ||
    (Array.isArray(historic) && historic.some(h=>h.appointment_id===app && h.role_id===role &&
      Number.isSafeInteger(h.retired_after_sequence) && seq<=h.retired_after_sequence));
  const validHistoric = (app,role) =>
    roles.get(app)===role ||
    (Array.isArray(historic) && historic.some(h=>h.appointment_id===app && h.role_id===role));
  const receipts = path.join(root,'receipts');
  const chats = path.join(root,'chats');

  for (const folder of list(receipts)) {
    const dir = path.join(receipts,folder);
    if (!fileName.test(folder) || !fs.statSync(dir).isDirectory()) {issue('receipt folder not M000000: '+folder);continue;}
    const number = Number(folder.slice(1));
    const msg=msgs[number-1];
    if (!msg || msg.message_id !== rid+'-'+folder) {issue('receipt refers to missing or foreign message '+folder);continue;}
    for (const name of list(dir)) {
      if (!name.endsWith('.json') || !safeAppointment.test(name.slice(0,-5))) {issue('invalid receipt filename '+name);continue;}
      const appointment=name.slice(0,-5),r=read(path.join(dir,name));
      if (!r) continue;
      if (r.round_id!==rid || r.message_id!==msg.message_id ||
          r.recipient_role!==msg.to_role || r.recipient_appointment_id!==msg.to_appointment_id ||
          appointment!==msg.to_appointment_id || !validHistoric(appointment,msg.to_role))
        issue('receipt recipient or message identity mismatch '+folder+'/'+name);
      if (!['MN','APPOINTMENT','RC','SYNC'].includes(r.trigger) ||
          !['HANDLED','ACTION_STARTED','SUPERSEDED','NO_ACTION','BLOCKED','REJECTED'].includes(r.disposition) ||
          !isNonempty(r.reason) || !date(r.read_at))
        issue('receipt missing required trigger/disposition/reason/time '+folder+'/'+name);
      if (r.evidence_ref!=null && (!isNonempty(r.evidence_ref) ||
          (!r.evidence_ref.startsWith('https://github.com/') && !r.evidence_ref.startsWith(rid+'-M'))))
        issue('receipt evidence_ref must be GitHub link or local message ID');
      if ((r.disposition==='SUPERSEDED'||r.disposition==='ACTION_STARTED') && !isNonempty(r.evidence_ref))
        issue('superseded or ongoing receipt needs explicit evidence_ref '+folder+'/'+name);
    }
  }

  for (const appointment of list(chats)) {
    const dir=path.join(chats,appointment);
    if (!safeAppointment.test(appointment)||!fs.statSync(dir).isDirectory()) {issue('bad journal appointment directory '+appointment);continue;}
    const eventDir=path.join(dir,'events');
    const events=list(eventDir);
    if (!events.length){issue('empty chat journal '+appointment);continue;}
    let lastNum=0;
    for (const name of events) {
      lastNum++;
      const correct=String(lastNum).padStart(6,'0')+'.json';
      if (name!==correct) {issue('chat journal gap '+appointment+'/'+name+' expected '+correct);continue;}
      const e=read(path.join(eventDir,name));
      if (!e) continue;
      if (e.round_id!==rid || e.appointment_id!==appointment ||
          !validHistoric(appointment,e.role_id) || e.sequence!==lastNum ||
          !['OWNER','AI'].includes(e.speaker) || !isNonempty(e.text) || !date(e.logged_at))
        issue('invalid journal envelope '+appointment+'/'+name);
      if (e.redacted!==true && e.redacted!==false) issue('journal redacted must be boolean '+name);
      if (e.redacted===true && !isNonempty(e.reason)) issue('redacted journal requires reason');
      if (e.text==='[UNAVAILABLE]' && e.redacted!==true) issue('unavailable chat text must be flagged');
      if (e.code!=null && !isNonempty(e.code)) issue('journal code must be nonempty when supplied');
      if (e.message_refs!=null && (!Array.isArray(e.message_refs) ||
          e.message_refs.some(ref=>!byId.has(ref))))
        issue('journal references missing ledger message '+appointment+'/'+name);
    }
  }
}
