import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {validateV8Artifacts} from '../scripts/validate-v8-artifacts.mjs';

const rid='JOURNAL-MINIMAL-01',app=rid+'-CEO-01';
function fixture(fn){
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'journal-economy-'));
 const workspace=path.join(temp,'workspace');
 fs.mkdirSync(workspace,{recursive:true});
 const msgs=[{round_id:rid,sequence:1,message_id:rid+'-M000001',from_role:'OWNER',
   from_appointment_id:'OWNER',to_role:'CEO',to_appointment_id:app,kind:'APPOINTMENT'}];
 const round={protocol_version:'V10',round_id:rid,appointment_history:[]};
 const roster={roles:[{role_id:'CEO',appointment_id:app,status:'ACTIVE'}]};
 const errors=[];
 const validate=()=>validateV8Artifacts({root:workspace,round,roster,msgs,fail:x=>errors.push(x)});
 try{return fn({workspace,round,roster,msgs,errors,validate})}
 finally{fs.rmSync(temp,{recursive:true,force:true})}
}
test('Routine OWNER/AI turns need NO Chat Event file under canonical event-minimal policy',()=>fixture(({validate,errors})=>{
 validate();
 assert.deepEqual(errors,[]);
}));
test('Real actionable M still accepts a separately persisted individual recipient receipt',()=>fixture(({workspace,validate,errors})=>{
 const dir=path.join(workspace,'receipts','M000001');fs.mkdirSync(dir,{recursive:true});
 fs.writeFileSync(path.join(dir,app+'.json'),JSON.stringify({round_id:rid,message_id:rid+'-M000001',
   recipient_role:'CEO',recipient_appointment_id:app,trigger:'APPOINTMENT',
   disposition:'HANDLED',reason:'Genuine appointment read',read_at:'2026-10-15T06:00:00Z'}));
 validate();assert.deepEqual(errors,[]);
}));
test('Cannot manufacture Chat Event to falsely claim a missing M was read',()=>fixture(({workspace,validate,errors})=>{
 const dir=path.join(workspace,'chats',app,'events');fs.mkdirSync(dir,{recursive:true});
 fs.writeFileSync(path.join(dir,'000001.json'),JSON.stringify({sequence:1,round_id:rid,
   role_id:'CEO',appointment_id:app,speaker:'OWNER',text:'MN',
   logged_at:'2026-10-15T06:00:00Z',redacted:false,
   message_refs:[rid+'-M000999']}));
 validate();assert.match(errors.join(' '),/journal references missing ledger message/);
}));
test('One canonical RULES document permits event-minimal journals without waiving M receipts',()=>{
 const s=fs.readFileSync('RULES.md','utf8');
 assert.match(s,/Do not archive every OWNER↔AI turn/);
 assert.match(s,/journal event is never a substitute for another role's individual M read receipt/);
 assert.match(s,/platform safety check rejects a receipt/);
});
