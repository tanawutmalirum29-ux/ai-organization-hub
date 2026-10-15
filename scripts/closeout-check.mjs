import {fileURLToPath} from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

// Pure read-only gate. All counters must come from COMPLETE live GitHub pagination.
// A GitHub branch reset/issue close is NOT a purge of PRs, issues or commit history.
const REPOS=['tanawutmalirum29-ux/appointment-CEO','tanawutmalirum29-ux/ant-project'];
const sha=s=>typeof s==='string'&&/^[a-f0-9]{40}$/.test(s);
export function evaluateCloseoutSnapshot(s){
 const blockers=[],seen=[];
 if(s?.artifact_type!=='CLOSEOUT_REVIEW')blockers.push('Invalid review data');
 if(!s?.verified_at||!Number.isFinite(Date.parse(s.verified_at)))
   blockers.push('Missing live verification time');
 if(!Array.isArray(s?.repositories)||s.repositories.length!==2)
   blockers.push('Both repositories required');
 for(const name of REPOS){
  const r=(s.repositories||[]).find(x=>x.repository===name);
  if(!r){blockers.push('Repository missing: '+name);continue}
  seen.push(r.repository);
  if(r.default_branch!=='main'||r.archived===true)
    blockers.push(name+': main must be default and active');
  if(!Array.isArray(r.branches)||r.branches.length!==1||r.branches[0]!=='main'||r.all_branches_fetched!==true)
    blockers.push(name+': branches must be EXACTLY [main], fully paginated');
  if(!sha(r.main_sha))blockers.push(name+': missing verified main SHA');
  if(r.all_issues_fetched!==true||r.total_issues!==0)
    blockers.push(name+': all historic/open/closed Issues must be deleted, not merely closed');
  if(r.all_prs_fetched!==true||r.total_prs!==0)
    blockers.push(name+': all historic/open/merged PRs must be absent (repository recreation may be necessary)');
  if(r.all_tags_fetched!==true||!Array.isArray(r.tags)||r.tags.length!==0)
    blockers.push(name+': old tags still exist or unverified');
  if(r.all_releases_fetched!==true||!Array.isArray(r.releases)||r.releases.length!==0)
    blockers.push(name+': old releases still exist or unverified');
  if(r.all_action_runs_fetched!==true||r.old_project_workflow_run_count!==0||
      r.all_artifacts_fetched!==true||r.old_project_workflow_artifact_count!==0)
    blockers.push(name+': historic workflow runs/artifacts remain or are not exhaustively verified');
  if(r.no_project_files_on_main!==true)
    blockers.push(name+': old project reports/archive/workspace/history remain on main');
  if(r.history_clean_verified!==true)
    blockers.push(name+': previous Git/PR history not proved clean; consider clean repository recreation');
  if(r.ci_result!=='success'&&r.release_smoke_result!=='success')
    blockers.push(name+': current main code/validation not verified');
 }
 if(new Set(seen).size!==2)blockers.push('Duplicate or incomplete repository snapshot');
 const cancelled=s.closure_type==='CANCELLED';
 if(cancelled){
  if(s.release?.merged!==false||s.release?.no_cancelled_game_changes_on_main!==true)
   blockers.push('Cancelled work must not be merged into game main');
 }else if(s.release?.merged!==true||s.release?.independent_qa_passed!==true||
    s.release?.critical_checks_passed!==true||s.release?.all_future_failures_triaged!==true)
   blockers.push('Release evidence and independent QA must be verified');
 if(s.no_durable_archive!==true)
   blockers.push('Durable round archives/backup/manifest are forbidden');
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
