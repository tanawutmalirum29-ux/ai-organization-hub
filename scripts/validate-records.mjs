#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

/**
 * Records round-scoped audit checks. Not a ChatGPT transcript capture service:
 * content exists only if the appointed AI actually wrote immutable files.
 */
export function validateRecords({root='workspace',round,roster,msgs,fail}) {
  if (!round?.round_id) return;
  const issue = (s) => fail('Records: ' + s);
  const rid = round.round_id;
  const roles = new Map((roster?.roles ?? []).map(x => [x.appointment_id,x.role_id]));
  const byId = new Map(msgs.map(m => [m.message_id,m]));
  const six = /^M\d{6}$/;
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
  const chats = path.join(root,'chats');

  // Historic receipt files may remain in archived workspaces, but read
  // acknowledgment is not required or interpreted as a work gate.
  {
    const activityDir=path.join(root,'activity');
    for (const appointment of list(activityDir)) {
      const dir=path.join(activityDir,appointment);
      if(!safeAppointment.test(appointment)||!fs.statSync(dir).isDirectory()||
         !validHistoric(appointment,(roster.roles||[]).find(r=>r.appointment_id===appointment)?.role_id
           ||(Array.isArray(historic)?historic.find(h=>h.appointment_id===appointment)?.role_id:null)))
        {issue('invalid silent activity appointment '+appointment);continue;}
      let n=0;
      for(const name of list(dir)){
        n++;
        if(name!==String(n).padStart(6,'0')+'.json'){
          issue('silent activity sequence gap '+appointment+'/'+name);continue;
        }
        const a=read(path.join(dir,name));if(!a)continue;
        if(a.sequence!==n||a.round_id!==rid||a.appointment_id!==appointment||
           !validHistoric(appointment,a.role_id)||!date(a.logged_at)||
           !isNonempty(a.summary)||
           !['STATUS','PROGRESS','QA','BLOCKER','RECOVERY','FAST','BR','BL','MQ','WHY','SW'].includes(a.kind))
          issue('invalid silent activity event '+appointment+'/'+name);
        if(a.evidence_url!=null && (!isNonempty(a.evidence_url) ||
           !a.evidence_url.startsWith('https://github.com/')))
          issue('silent activity evidence_url must be verified Github HTTPS');
      }
    }
  }

  {
    const recoveryDir=path.join(root,'recovery');
    for(const name of list(recoveryDir)){
      if(!name.endsWith('.json')||!safeAppointment.test(name.slice(0,-5))){
        issue('invalid recovery packet filename '+name);continue;
      }
      const appointment=name.slice(0,-5),packet=read(path.join(recoveryDir,name));
      if(!packet)continue;
      if(packet.round_id!==rid||packet.appointment_id!==appointment||
         !validHistoric(appointment,packet.role_id)||
         !date(packet.generated_at)||
         packet.source_round_branch!=='round/'+rid.toLowerCase()||
         !isNonempty(packet.blocker_summary)||
         !/^[0-9a-f]{40}$/.test(packet.latest_game_sha||'')||
         !Array.isArray(packet.open_game_issue_urls)||
         !Array.isArray(packet.open_game_pr_urls)||
         [...(packet.open_game_issue_urls||[]),...(packet.open_game_pr_urls||[])]
           .some(url=>!isNonempty(url)||!url.startsWith('https://github.com/')))
        issue('invalid SW recovery packet metadata '+name);
      if(!Array.isArray(packet.pending_message_ids) ||
         packet.pending_message_ids.some(x=>typeof x!=='string' || !byId.has(x)))
        issue('recovery refers to missing ledger M '+name);
      else{
        const addressed=msgs.filter(m=>m.to_appointment_id===appointment &&
          m.to_role===packet.role_id);
        const unresponded=addressed.filter(m=>!msgs.some(out=>
          out.from_appointment_id===appointment&&out.from_role===packet.role_id&&
          out.sequence>m.sequence&&
          (out.in_reply_to===m.message_id || m.kind==='APPOINTMENT')))
          .map(m=>m.message_id).sort();
        const saved=packet.pending_message_ids.slice().sort();
        if(JSON.stringify(unresponded)!==JSON.stringify(saved))
          issue('SW recovery actionable M snapshot disagrees with recorded replies '+name);
      }
      const last=packet.last_chat_event_path;
      const pref='workspace/chats/'+appointment+'/events/';
      if(typeof last!=='string'||!last.startsWith(pref)||
        !/^[0-9]{6}[.]json$/.test(last.slice(pref.length))||
        !fs.existsSync(path.join(root,'..',last)))
        issue('SW recovery requires real last journal event '+name);
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
          !(['OWNER','AI'].includes(e.speaker) || e.speaker===e.role_id) || !isNonempty(e.text) || !date(e.logged_at))
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
