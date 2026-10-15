import {fileURLToPath} from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

// Pure read-only branch and release handoff gate over a just-fetched snapshot.
// Actual CEO must fetch live data directly from both GitHub repos upon OWNER C.
const REPOS=['tanawutmalirum29-ux/appointment-CEO','tanawutmalirum29-ux/ant-project'];
const sha=s=>typeof s==='string'&&/^[a-f0-9]{40}$/.test(s);
export function evaluateCloseoutSnapshot(s){
 const blockers=[],names=[];
 if(s?.artifact_type!=='CLOSEOUT_REVIEW')blockers.push('Invalid review data');
 if(!s?.verified_at||!Number.isFinite(Date.parse(s.verified_at)))
   blockers.push('Missing live verification time');
 if(!Array.isArray(s?.repositories)||s.repositories.length!==2)
   blockers.push('Both repositories required');
 for(const repoName of REPOS){
  const r=(s.repositories||[]).find(x=>x.repository===repoName);
  if(!r){blockers.push('Repository missing: '+repoName);continue}
  names.push(r.repository);
  if(r.default_branch!=='main'||r.archived===true)
   blockers.push(repoName+': main must be default, repository must not be archived');
  if(!Array.isArray(r.branches)||r.branches.length!==1||r.branches[0]!=='main'||
    r.all_branches_fetched!==true)
   blockers.push(repoName+': branches not EXACTLY [main] with complete pagination');
  if(!sha(r.main_sha))blockers.push(repoName+': invalid verified main SHA');
  if(!Number.isSafeInteger(r.open_pr_count)||r.open_pr_count!==0||
     r.all_open_prs_fetched!==true)
   blockers.push(repoName+': open PRs must be zero with complete pagination');
  if(!Array.isArray(r.open_issues)||r.all_open_issues_fetched!==true)
   blockers.push(repoName+': all open issues must be listed');
  else for(const i of r.open_issues){
    if(!Number.isSafeInteger(i.number)||!Array.isArray(i.labels)||
      !i.labels.some(l=>['future-work','backlog','next-mission'].includes(l))||
      i.release_blocker===true)
      blockers.push(repoName+': untriaged or release-blocking issue #'+i.number);
  }
  if(r.ci_result!=='success' && !(r.ci_result==='waived'&&
    Array.isArray(r.waiver_issue_urls)&&r.waiver_issue_urls.length>0 &&
    r.waiver_issue_urls.every(x=>typeof x==='string'&&x.startsWith('https://github.com/'))&&
    r.release_smoke_result==='success' ))
    blockers.push(repoName+': main head CI/release smoke not verified green');
 }
 if(new Set(names).size!==2)blockers.push('Duplicate/ambiguous repository snapshot');
 const arch=s.archive;
 if(!arch||arch.verified_on_governance_main!==true ||
   !sha(arch.source_round_commit_sha)||!sha(arch.game_main_sha)||
   !Number.isSafeInteger(arch.workspace_file_count)||arch.workspace_file_count<1||
   arch.paths_and_hashes_verified!==true||
   !/^archives\/[A-Z0-9][A-Z0-9-]{2,39}\/MANIFEST[.]json$/.test(arch.manifest_path||''))
   blockers.push('Round archive not verified on governance/main');
 const game=(s.repositories||[]).find(x=>x.repository===REPOS[1]);
 if(game&&arch&&game.main_sha!==arch.game_main_sha)
   blockers.push('Game main changed since archived release; require fresh release verification and archive revision');
 if(s.release?.merged!==true||s.release?.independent_qa_passed!==true||
   s.release?.critical_checks_passed!==true||s.release?.all_future_failures_triaged!==true)
   blockers.push('Actual game release and outstanding critical issues not cleared');
 return {ok:blockers.length===0,action:blockers.length===0?'Completed':'B',blockers};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{
  if(process.argv.length!==3)throw Error('Usage: node scripts/closeout-check.mjs <LIVE-GITHUB-SNAPSHOT.json>');
  const check=evaluateCloseoutSnapshot(JSON.parse(fs.readFileSync(process.argv[2],'utf8')));
  process.stdout.write(JSON.stringify(check,null,2)+'\n');
  if(!check.ok)process.exitCode=1;
 }catch(e){console.error('ER: '+e.message);process.exitCode=1}
}
