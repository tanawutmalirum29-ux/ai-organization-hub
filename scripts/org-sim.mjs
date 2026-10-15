import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

// Offline comprehensive regression simulation: not actual separate ChatGPT chats.
const subjects=fs.readdirSync('tests').filter(x=>x.endsWith('.test.mjs')).sort()
 .map(x=>'tests/'+x);
export function runOrgSimulation(){
 const started=new Date().toISOString();
 const run=spawnSync(process.execPath,['--test',...subjects],{encoding:'utf8',maxBuffer:15*1024*1024});
 const out=(run.stdout||'')+'\n'+(run.stderr||'');
 const n=k=>Number(new RegExp('(?:^|\\n)# '+k+' (\\d+)').exec(out)?.[1]??-1);
 return {
  type:'OFFLINE_ORGANIZATION_CONTRACT_SIMULATION',
  started_at:started,finished_at:new Date().toISOString(),
  file_count:subjects.length,subjects,
  tests:n('tests'),passed:n('pass'),failed:n('fail'),
  ok:run.status===0&&n('tests')>0&&n('fail')===0&&n('pass')===n('tests'),
  caveat:'Fixture-based regression simulation only; it does NOT run external ChatGPT chats or game browser QA.',
  tail:out.split('\n').slice(-20).join('\n')
 };
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const result=runOrgSimulation();console.log(JSON.stringify(result,null,2));
 if(!result.ok)process.exitCode=1;
}
