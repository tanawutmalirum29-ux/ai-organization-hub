import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';

const modulePath=path.resolve('scripts/validate-closeout-archive.mjs');
const rid='ORG-ARCHIVE-CHECK',gitsha='a'.repeat(40),game='b'.repeat(40);
function verify({badHash=false,badState=false,missingChat=false}={}){
 const cwd=mkdtempSync(path.join(tmpdir(),'governance-archive-'));
 try {
  const files={
   'workspace/round.json':{round_id:rid,state:badState?'ACTIVE':'CLOSED',closure_reason:'MISSION_COMPLETED',final_game_main_sha:game},
   'workspace/roster.json':{round_id:rid,roles:[{role_id:'CEO',appointment_id:rid+'-CEO-01',status:'CLOSED'}]},
   'workspace/messages/000001.json':{round_id:rid,message_id:rid+'-M000001',kind:'ROUND_CLOSED',from_role:'CEO',to_role:'OWNER'},
   ['workspace/chats/'+rid+'-CEO-01/events/000001.json']:{round_id:rid,speaker:'OWNER',text:'MN',sequence:1}
  };
  const hashes={},full=[];
  for(const [name,value] of Object.entries(files)){
   const dest='archives/'+rid+'/'+name,absolute=path.join(cwd,dest);
   mkdirSync(path.dirname(absolute),{recursive:true});
   const content=JSON.stringify(value)+'\n';writeFileSync(absolute,content);
   full.push(dest);
   hashes[dest]=createHash('sha256').update(content).digest('hex');
  }
  if(badHash)hashes[full[0]]='0'.repeat(64);
  if(missingChat)full.pop();
  const manifest={
   artifact_type:'CLOSEOUT_ARCHIVE',round_id:rid,
   source_round_branch:'round/'+rid.toLowerCase(),
   source_round_commit_sha:gitsha,game_main_sha:game,round_state:'CLOSED',
   closure_message_id:rid+'-M000001',governance_archive_paths:full,
   message_count:1,workspace_file_count:full.length,sha256_by_path:hashes,
   redacted_paths:[],private_archive_reference:null,
   game_release_evidence_url:'https://github.com/tanawutmalirum29-ux/ant-project/issues/100',
   qa_ci_urls:['https://github.com/tanawutmalirum29-ux/ant-project/actions/runs/100'],
   future_issues:[],prepared_by_ceo_appointment_id:rid+'-CEO-01'
  };
  writeFileSync(path.join(cwd,'archives',rid,'MANIFEST.json'),JSON.stringify(manifest));
  const expr=`import {validateMainArchives} from ${JSON.stringify(modulePath)}; const e=[];validateMainArchives({fail:x=>e.push(x),beforeSha:''}); if(e.length){console.error(e.join('\\n'));process.exitCode=1}`;
  return spawnSync(process.execPath,['--input-type=module','-e',expr],{cwd,encoding:'utf8'});
 }finally {rmSync(cwd,{recursive:true,force:true});}
}
test('Organization archived round remains readable and all original files checksum verified',()=>{
 const r=verify();assert.equal(r.status,0,r.stderr);
});
test('Organization prevents deleting branches based on tampered historical archive hash',()=>{
 const r=verify({badHash:true});assert.notEqual(r.status,0);assert.match(r.stderr,/hash mismatch/);
});
test('Organization must not archive an ACTIVE round as if mission were completed',()=>{
 const r=verify({badState:true});assert.notEqual(r.status,0);assert.match(r.stderr,/final verified CLOSED/);
});
test('Organization requires every chat journal file named in manifest (no silent loss)',()=>{
 const r=verify({missingChat:true});assert.notEqual(r.status,0);assert.match(r.stderr,/unaccounted archived workspace files|file count\/path\/hash mismatch/);
});
