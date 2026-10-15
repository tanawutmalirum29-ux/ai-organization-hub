import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,dirname} from 'node:path';
import {renderOrgDashboard} from '../scripts/org-dashboard.mjs';
test('Round dashboard derives actionable M from real ledger and labels as a snapshot',()=>{
 const root=mkdtempSync(join(tmpdir(),'round-dash-'));
 try{
  const rid='DASH-ROUND-01',app=rid+'-CEO-01';
  const write=(p,obj)=>{const dest=join(root,p);mkdirSync(dirname(dest),{recursive:true});
   writeFileSync(dest,JSON.stringify(obj));};
  write('round.json',{round_id:rid,startup_phase:'CEO_SETUP',state:'ACTIVE'});
  write('roster.json',{round_id:rid,roles:[{role_id:'CEO',appointment_id:app,parent_role:'OWNER',status:'ACTIVE'}]});
  write('messages/000001.json',{message_id:rid+'-M000001',sequence:1,round_id:rid,
   from_role:'OWNER',to_role:'CEO',to_appointment_id:app,kind:'APPOINTMENT'});
  const md=renderOrgDashboard(root,'2026-10-15T09:00:00Z');
  assert.match(md,/Current organization snapshot/);
  assert.match(md,/AP-CEO/);
  assert.match(md,/Generated 2026-10-15/);
  assert.match(md,/Not a live automatic feed/);
  assert.match(md,/RULES[.]md/);
 }finally{rmSync(root,{recursive:true,force:true});}
});
