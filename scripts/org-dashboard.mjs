import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {nextCourierPlan} from './courier.mjs';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const safe=x=>String(x??'unknown').replace(/[\r\n|]/g,' ').slice(0,160);
export function renderOrgDashboard(workspace,generatedAt=new Date().toISOString()){
 const round=read(path.join(workspace,'round.json'));
 const roster=read(path.join(workspace,'roster.json'));
 const pending=nextCourierPlan(workspace);
 const messages=fs.readdirSync(path.join(workspace,'messages'))
   .filter(x=>/^[0-9]{6}[.]json$/.test(x)).sort()
   .map(n=>read(path.join(workspace,'messages',n)));
 const notes=[`# Ant Kingdom — Current organization snapshot`,
 `> Generated ${generatedAt} from GitHub round workspace. **Not a live automatic feed.** Check GitHub source, CI and Issues for fresh status.`,
 `**Round:** ${safe(round.round_id)} · **phase:** ${safe(round.startup_phase)} · **state:** ${safe(round.state)}`,
 `**Last M:** ${safe(messages.at(-1)?.message_id??'none')} · **Pending actionable notifications:** ${safe(pending.owner_code_line||'none')}`,
 `**Deferred first DCEO signoffs:** ${pending.deferred_partial_signoffs||0}`,
 '', '## Current appointments and outstanding reply work','',
 '| Role | Appointment | State | M without recorded reply |','|---|---|---|---:|'];
 for(const role of roster.roles){
  const work=pending.actionable_roles.find(r=>r.role_id===role.role_id);
  notes.push(`| ${safe(role.role_id)} | ${safe(role.appointment_id)} | ${safe(role.status)} | ${work?.total??0} |`);
 }
 notes.push('','## Current gate / next action','',
   'Use **NX** to check the actionable message queue before relaying MN. The queue cannot confirm private-chat delivery.',
   pending.next_owner_hint||pending.next_step,
   '','## Source of truth','',
   '- Organization policy: [single canonical RULES.md](https://github.com/tanawutmalirum29-ux/appointment-CEO/blob/main/RULES.md)',
   '- Game Issues and CI: [ant-project](https://github.com/tanawutmalirum29-ux/ant-project)',
   '- Snapshot cannot prove owner delivered a code, check private ChatGPT messages, or make CI green.');
 return notes.join('\n')+'\n';
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{
  if(process.argv.length<3||process.argv.length>4)throw Error('Usage: node scripts/org-dashboard.mjs <workspace> [--write]');
  const output=renderOrgDashboard(process.argv[2]);
  if(process.argv[3]==='--write'){
   const dest=path.join(process.argv[2],'DASHBOARD.md');fs.writeFileSync(dest,output);
   console.log(dest);
  }else process.stdout.write(output);
 }catch(e){console.error('ER: '+e.message);process.exitCode=1;}
}
