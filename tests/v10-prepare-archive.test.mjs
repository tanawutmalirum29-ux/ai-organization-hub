import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {join,dirname} from 'node:path';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {createHash} from 'node:crypto';
import {prepareCloseoutArchive} from '../scripts/v10-prepare-archive.mjs';
const rid='ANT-ARCHIVE-ROUND-1',game='b'.repeat(40),sha='a'.repeat(40);
function run(cb,options={}){
 const base=mkdtempSync(join(tmpdir(),'archive-prep-'));
 try{
  const source=join(base,'round','workspace'),gov=join(base,'governance');
  const save=(rel,obj)=>{
   const full=join(source,rel);mkdirSync(dirname(full),{recursive:true});
   writeFileSync(full,JSON.stringify(obj)+'\n');
  };
  save('round.json',{round_id:rid,state:options.state||'CLOSED',
    closure_reason:'MISSION_COMPLETED',final_game_main_sha:game});
  save('roster.json',{round_id:rid,roles:[{role_id:'CEO',appointment_id:rid+'-CEO-01',status:'CLOSED'}]});
  save('messages/000001.json',{round_id:rid,message_id:rid+'-M000001',
    kind:'ROUND_CLOSED',from_role:'CEO',to_role:'OWNER'});
  save('chats/'+rid+'-CEO-01/events/000001.json',{speaker:'OWNER',text:'MN',
    appointment_id:rid+'-CEO-01'});
  mkdirSync(gov,{recursive:true});
  const opts={sourceWorkspace:source,governanceRoot:gov,sourceRoundSha:sha,
    gameMainSha:game,releaseEvidenceUrl:'https://github.com/tanawutmalirum29-ux/ant-project/issues/5',
    qaCiUrls:['https://github.com/tanawutmalirum29-ux/ant-project/actions/runs/10'],
    reviewedPublicContent:options.reviewed!==false};
  return cb({source,gov,opts});
 }finally{rmSync(base,{recursive:true,force:true});}
}
test('V10 pre-DB archival preserves entire chat journal and hashes same bytes',()=>run(({source,gov,opts})=>{
 const manifest=prepareCloseoutArchive(opts);
 assert.equal(manifest.workspace_file_count,4);
 assert.equal(manifest.message_count,1);
 for(const [archived,h] of Object.entries(manifest.sha256_by_path)){
  const actual=createHash('sha256').update(fs.readFileSync(join(gov,archived))).digest('hex');
  assert.equal(actual,h);
  const src=archived.replace('archives/'+rid+'/workspace/','');
  assert.deepEqual(fs.readFileSync(join(gov,archived)),fs.readFileSync(join(source,src)));
 }
 assert.ok(fs.existsSync(join(gov,'archives',rid,'MANIFEST.json')));
}));
test('V10 refuses accidental overwrite of immutable past archive',()=>run(({opts})=>{
 prepareCloseoutArchive(opts);
 assert.throws(()=>prepareCloseoutArchive(opts),/already exists/);
}));
test('V10 refuses to export unreviewed chat logs into public canonical main',()=>run(({opts})=>{
 assert.throws(()=>prepareCloseoutArchive({...opts,reviewedPublicContent:false}),/reviewed/);
},{reviewed:false}));
test('V10 refuses branch deletion archive before round actually CLOSED',()=>run(({opts})=>{
 assert.throws(()=>prepareCloseoutArchive(opts),/not fully CLOSED/);
},{state:'ACTIVE'}));
test('V10 archive requires real QA and release evidence URL before DB',()=>run(({opts})=>{
 assert.throws(()=>prepareCloseoutArchive({...opts,qaCiUrls:[]}),/evidence/);
}));
