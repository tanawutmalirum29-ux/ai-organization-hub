import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {auditPublicWorkspace} from './org-privacy-audit.mjs';

const sha40=s=>typeof s==='string'&&/^[0-9a-f]{40}$/.test(s);
const url=s=>typeof s==='string'&&s.startsWith('https://github.com/');
const filePaths=dir=>{
 const files=[];
 function scan(d){
  for(const name of fs.readdirSync(d)){
   const p=path.join(d,name),st=fs.lstatSync(p);
   if(st.isSymbolicLink())throw Error('Symlinks are forbidden for public archive: '+p);
   if(st.isDirectory())scan(p);
   else if(st.isFile())files.push(p);
   else throw Error('Unsupported file in round workspace '+p);
  }
 }scan(dir);return files.sort();
};
export function prepareCloseoutArchive({
 sourceWorkspace,governanceRoot='.',sourceRoundSha,gameMainSha,
 releaseEvidenceUrl,qaCiUrls,reviewedPublicContent=false,privateArchiveReference=null
}){
 if(reviewedPublicContent!==true)
  throw Error('Public chat/workspace contents must be reviewed for secrets/privacy before archiving');
 if(!sha40(sourceRoundSha)||!sha40(gameMainSha)||!url(releaseEvidenceUrl)||
    !Array.isArray(qaCiUrls)||qaCiUrls.length<1||!qaCiUrls.every(url))
  throw Error('Verified round/game SHAs, release and CI evidence are required');
 const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
 const round=read(path.join(sourceWorkspace,'round.json'));
 const roster=read(path.join(sourceWorkspace,'roster.json'));
 const rid=round.round_id;
 if(!/^[A-Z0-9][A-Z0-9-]{2,39}$/.test(rid||'')||
    round.state!=='CLOSED'||round.closure_reason!=='MISSION_COMPLETED'||
    round.final_game_main_sha!==gameMainSha||
    roster.round_id!==rid||!roster.roles?.length||
    !roster.roles.every(x=>x.status==='CLOSED'))
   throw Error('Round is not fully CLOSED with pinned released game/main SHA');
 const root=path.join(governanceRoot,'archives',rid);
 if(fs.existsSync(root))throw Error('Archived round already exists; never overwrite');
 const privacy=auditPublicWorkspace(sourceWorkspace);
 if(!privacy.safe)
  throw Error('Public archive blocked due to sensitive content ('+
   privacy.problems.map(x=>x.kind+':'+x.path).join(', ')+
   '); redact with documented provenance and retain originals in a VERIFIED PRIVATE archive before DB');
 const sourceFiles=filePaths(sourceWorkspace);
 const sourceRoot=path.resolve(sourceWorkspace);
 const names=sourceFiles.map(p=>path.relative(sourceRoot,p).replace(/\\/g,'/'));
 const messages=names.filter(x=>/^messages\/[0-9]{6}[.]json$/.test(x)).sort();
 if(!messages.length)throw Error('Round M ledger missing');
 for(let n=0;n<messages.length;n++){
  if(messages[n]!==`messages/${String(n+1).padStart(6,'0')}.json`)
   throw Error('Numbered M ledger gap: '+messages[n]);
 }
 const last=read(path.join(sourceWorkspace,messages.at(-1)));
 if(last.kind!=='ROUND_CLOSED'||last.from_role!=='CEO'||last.to_role!=='OWNER'||
    last.round_id!==rid||last.message_id!==rid+'-M'+String(messages.length).padStart(6,'0'))
   throw Error('Final numbered M is not the CEO ROUND_CLOSED');
 const ceo=roster.roles.find(x=>x.role_id==='CEO');
 if(!ceo?.appointment_id)throw Error('CEO appointment missing');
 const hashes={},all=[];
 try{
  for(let n=0;n<sourceFiles.length;n++){
   const destRel='archives/'+rid+'/workspace/'+names[n];
   const dest=path.join(governanceRoot,destRel);
   fs.mkdirSync(path.dirname(dest),{recursive:true});
   fs.copyFileSync(sourceFiles[n],dest);
   const copy=fs.readFileSync(dest),original=fs.readFileSync(sourceFiles[n]);
   if(!copy.equals(original))throw Error('Archived byte mismatch '+names[n]);
   hashes[destRel]=createHash('sha256').update(copy).digest('hex');
   all.push(destRel);
  }
  const manifest={
   artifact_type:'CLOSEOUT_ARCHIVE',round_id:rid,source_round_branch:'round/'+rid.toLowerCase(),
   source_round_commit_sha:sourceRoundSha,game_main_sha:gameMainSha,round_state:'CLOSED',
   closure_message_id:last.message_id,governance_archive_paths:all,
   message_count:messages.length,workspace_file_count:sourceFiles.length,
   sha256_by_path:hashes,redacted_paths:[],private_archive_reference:privateArchiveReference,
   game_release_evidence_url:releaseEvidenceUrl,qa_ci_urls:qaCiUrls,
   future_issues:[],prepared_by_ceo_appointment_id:ceo.appointment_id
  };
  fs.writeFileSync(path.join(root,'MANIFEST.json'),JSON.stringify(manifest,null,2)+'\n');
  return manifest;
 }catch(e){fs.rmSync(root,{recursive:true,force:true});throw e}
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{
  if(process.argv.length<8||process.argv[7]!=='--reviewed-public-content')
   throw Error('Usage: node scripts/prepare-archive.mjs <SOURCE_WORKSPACE> <SOURCE_ROUND_SHA> <GAME_MAIN_SHA> <RELEASE_EVIDENCE_GITHUB_URL> <CI_GITHUB_URL> --reviewed-public-content');
  const a=prepareCloseoutArchive({
   sourceWorkspace:process.argv[2],governanceRoot:'.',
   sourceRoundSha:process.argv[3],gameMainSha:process.argv[4],
   releaseEvidenceUrl:process.argv[5],qaCiUrls:[process.argv[6]],
   reviewedPublicContent:true
  });
  console.log(JSON.stringify({round:a.round_id,file_count:a.workspace_file_count,
   manifest:'archives/'+a.round_id+'/MANIFEST.json'}));
 }catch(e){console.error('ER: '+e.message);process.exitCode=1}
}
