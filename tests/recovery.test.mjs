import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,dirname} from 'node:path';
import {validateRecords} from '../scripts/validate-records.mjs';
const rid='ORG-SW-CHECK',role='CEO',app=rid+'-CEO-01',id=rid+'-M000001';
const mk=(root,p,x)=>{const name=join(root,p);mkdirSync(dirname(name),{recursive:true});writeFileSync(name,JSON.stringify(x));};
function verify(mode='valid'){
 const root=mkdtempSync(join(tmpdir(),'org-recovery-'));
 try{
  const roster={round_id:rid,roles:[{role_id:'CEO',appointment_id:app,status:'ACTIVE',parent_role:'OWNER'}]};
  const round={round_id:rid,};
  const msgs=[{sequence:1,round_id:rid,message_id:id,to_role:role,to_appointment_id:app}];
  const last='workspace/chats/'+app+'/events/000001.json';
  mk(root,last,{sequence:1,round_id:rid,appointment_id:app,role_id:role,
   speaker:'OWNER',text:'SW',redacted:false,logged_at:'2026-10-15T02:00:00Z'});
  mk(root,'workspace/recovery/'+app+'.json',{
    round_id:rid,role_id:role,appointment_id:app,source_round_branch:'round/'+rid.toLowerCase(),
    generated_at:'2026-10-15T02:01:00Z',last_chat_event_path:last,
    pending_message_ids:mode==='wrong'?[]:[id],
    open_game_issue_urls:[],open_game_pr_urls:[],
    blocker_summary:'None known from accessible GitHub evidence',
    latest_game_sha:'a'.repeat(40)
  });
  const errors=[];
  validateRecords({root:join(root,'workspace'),round,roster,msgs,fail:e=>errors.push(e)});
  return errors;
 }finally{rmSync(root,{recursive:true,force:true});}
}
test('Organization SW packet with actual last chat event and exact M inbox passes',()=>assert.deepEqual(verify(),[]));
test('Organization SW refuses to omit actionable M without recorded response',()=>assert.match(verify('wrong').join(' '),/actionable M snapshot disagrees/));
