import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';

const hex=(s,n=40)=>typeof s==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(s);
const goodPath=s=>typeof s==='string'&&s.split('/').every(x=>x&&x!=='.'&&x!=='..');
function recurse(dir,out=[]){
 for(const name of fs.readdirSync(dir)){
  const full=path.join(dir,name);
  const stat=fs.lstatSync(full);
  if(stat.isSymbolicLink())throw Error('Archive symlinks forbidden: '+full);
  if(stat.isDirectory())recurse(full,out);
  else if(stat.isFile())out.push(full.replace(/\\/g,'/'));
  else throw Error('Unsupported archived file type '+full);
 }return out;
}
export function validateMainArchives({root='archives',beforeSha=process.env.BEFORE_SHA||'',fail=()=>{}}={}){
 if(!fs.existsSync(root))return;
 if(!fs.statSync(root).isDirectory()){fail('archives must be a directory');return;}
 for(const rid of fs.readdirSync(root)){
  const dir=path.join(root,rid);
  if(!/^[A-Z0-9][A-Z0-9-]{2,39}$/.test(rid) ||
     !fs.statSync(dir).isDirectory()){fail('Invalid archive round '+rid);continue;}
  const manifestPath=path.join(dir,'MANIFEST.json');
  let manifest=null;
  try{manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'))}
  catch(e){fail('Missing or invalid archive manifest '+rid+': '+e.message);continue;}
  const err=s=>fail('Archive '+rid+': '+s);
  if(manifest.schema_version!=='V10-CLEANUP-1'||manifest.round_id!==rid||
     manifest.source_round_branch!=='round/'+rid.toLowerCase()||
     !hex(manifest.source_round_commit_sha)||!hex(manifest.game_main_sha)||
     manifest.round_state!=='CLOSED' ||
     !String(manifest.closure_message_id||'').match(new RegExp('^'+rid+'-M[0-9]{6}$'))||
     !hex(manifest.sha256_by_path?.[manifest.governance_archive_paths?.[0]],64)||
     !Array.isArray(manifest.qa_ci_urls)||!manifest.qa_ci_urls.length||
     !manifest.qa_ci_urls.every(x=>typeof x==='string'&&x.startsWith('https://github.com/'))||
     typeof manifest.game_release_evidence_url!=='string'||
     !manifest.game_release_evidence_url.startsWith('https://github.com/'))
    err('invalid metadata: round, refs, SHA256 or release evidence');
  const paths=manifest.governance_archive_paths,hashes=manifest.sha256_by_path;
  if(!Array.isArray(paths)||!paths.length||!Number.isSafeInteger(manifest.workspace_file_count)||
     manifest.workspace_file_count!==paths.length||
     !hashes||typeof hashes!=='object'||
     Object.keys(hashes).length!==paths.length||
     new Set(paths).size!==paths.length){err('file count/path/hash mismatch');continue;}
  let actual=[];
  try{actual=recurse(path.join(dir,'workspace')).sort()}
  catch(e){err(e.message);continue;}
  if(JSON.stringify(actual)!==JSON.stringify(paths.slice().sort()))err('unaccounted archived workspace files');
  for(const name of paths){
   if(!goodPath(name)||!name.startsWith('archives/'+rid+'/workspace/')||
      !hex(hashes[name],64)){err('invalid path or SHA256 '+name);continue;}
   try{
    const buf=fs.readFileSync(name),sum=createHash('sha256').update(buf).digest('hex');
    if(sum!==hashes[name])err('archive file hash mismatch '+name);
   }catch(e){err('missing/unreadable archived file '+name+': '+e.message)}
  }
  if(manifest.message_count!==actual.filter(p=>p.startsWith('archives/'+rid+'/workspace/messages/')&&/[0-9]{6}[.]json$/.test(p)).length)
    err('message_count mismatch');
  try{
   const round=JSON.parse(fs.readFileSync(path.join(dir,'workspace','round.json'),'utf8'));
   const roster=JSON.parse(fs.readFileSync(path.join(dir,'workspace','roster.json'),'utf8'));
   if(round.round_id!==rid||round.state!=='CLOSED'||round.closure_reason!=='MISSION_COMPLETED'||
      round.final_game_main_sha!==manifest.game_main_sha||
      !Array.isArray(roster.roles)||!roster.roles.every(x=>x.status==='CLOSED'))
      err('archive lacks final verified CLOSED round, SHA and closed roster');
   const messages=actual.filter(p=>p.includes('/workspace/messages/')&&/[0-9]{6}[.]json$/.test(p)).sort();
   if(!messages.length)err('archive has no numbered ledger');
   else{
    const last=JSON.parse(fs.readFileSync(messages.at(-1),'utf8'));
    if(last.message_id!==manifest.closure_message_id||last.kind!=='ROUND_CLOSED'||
       last.from_role!=='CEO'||last.to_role!=='OWNER')
      err('last archived M must match CEO ROUND_CLOSED');
   }
  }catch(e){err('missing core round closure metadata: '+e.message)}
 }
 if(beforeSha&&/^[a-f0-9]{40}$/.test(beforeSha)&&!/^0+$/.test(beforeSha)){
  try{
   const changes=execFileSync('git',['diff','--name-status',beforeSha,'HEAD','--',root],{encoding:'utf8'});
   for(const line of changes.split('\\n').filter(Boolean)){
    if(!line.startsWith('A\\t'))fail('Archive is append-only: '+line);
   }
  }catch(e){fail('Cannot check immutable archive history: '+e.message)}
 }
}
