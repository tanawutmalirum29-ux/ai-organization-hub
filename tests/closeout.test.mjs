import {test} from 'node:test';
import assert from 'node:assert/strict';
import {evaluateCloseoutSnapshot} from '../scripts/closeout-check.mjs';

const SHA='a'.repeat(40);
function snapshot(){
 const repo=repository=>({
  repository,default_branch:'main',archived:false,main_sha:SHA,
  branches:['main'],all_branches_fetched:true,
  total_issues:0,all_issues_fetched:true,
  total_prs:0,all_prs_fetched:true,
  tags:[],all_tags_fetched:true,
  releases:[],all_releases_fetched:true,
  old_project_workflow_run_count:0,all_action_runs_fetched:true,
  old_project_workflow_artifact_count:0,all_artifacts_fetched:true,
  no_project_files_on_main:true,history_clean_verified:true,ci_result:'success'
 });
 return {artifact_type:'CLOSEOUT_REVIEW',verified_at:'2026-10-15T04:12:00Z',
  repositories:[repo('tanawutmalirum29-ux/appointment-CEO'),repo('tanawutmalirum29-ux/ant-project')],
  no_durable_archive:true,closure_type:'COMPLETED',
  release:{merged:true,independent_qa_passed:true,critical_checks_passed:true,all_future_failures_triaged:true}
 };
}
const blocked=s=>{const result=evaluateCloseoutSnapshot(s);assert.equal(result.ok,false);return result.blockers.join(' ');};
test('Only clean main, zero historical records in both repositories permits Completed',()=>{
 assert.deepEqual(evaluateCloseoutSnapshot(snapshot()),{ok:true,action:'Completed',blockers:[]});
});
test('Cannot keep a second branch in either repository',()=>{
 const s=snapshot();s.repositories[0].branches.push('round/old');assert.match(blocked(s),/branches/);
 s.repositories[0].branches=['main'];s.repositories[1].branches.push('feature/old');assert.match(blocked(s),/branches/);
});
test('Closing issue or PR does not delete it: all states must be zero',()=>{
 const s=snapshot();s.repositories[0].total_issues=1;assert.match(blocked(s),/Issues must be deleted/);
 s.repositories[0].total_issues=0;s.repositories[1].total_prs=1;assert.match(blocked(s),/historic\/open\/merged PRs/);
});
test('No retained releases, tags, actions or artifacts',()=>{
 const s=snapshot();s.repositories[0].tags=['old'];assert.match(blocked(s),/tags/);
 s.repositories[0].tags=[];s.repositories[0].releases=[{id:1}];assert.match(blocked(s),/releases/);
 s.repositories[0].releases=[];s.repositories[1].old_project_workflow_run_count=1;assert.match(blocked(s),/runs\/artifacts/);
});
test('Missing pagination evidence cannot be treated as deleted',()=>{
 const s=snapshot();s.repositories[0].all_issues_fetched=false;
 s.repositories[1].all_prs_fetched=false;s.repositories[1].all_branches_fetched=false;
 assert.equal(evaluateCloseoutSnapshot(s).ok,false);
});
test('No old reports in main, archives, or historical Git objects may remain',()=>{
 const s=snapshot();s.repositories[0].no_project_files_on_main=false;
 s.repositories[1].history_clean_verified=false;s.no_durable_archive=false;
 assert.match(blocked(s),/old project reports/);
 assert.match(blocked(s),/history/);
 assert.match(blocked(s),/archives/);
});
test('CI/QA must be real even when cleanup is complete',()=>{
 const s=snapshot();s.repositories[1].ci_result='failure';
 assert.match(blocked(s),/validation/);
 s.repositories[1].ci_result='success';s.release.independent_qa_passed=false;
 assert.match(blocked(s),/QA/);
});
test('Cancelled work may close only if it did not enter game main',()=>{
 const s=snapshot();s.closure_type='CANCELLED';
 s.release={merged:false,no_cancelled_game_changes_on_main:true};
 assert.equal(evaluateCloseoutSnapshot(s).ok,true);
 s.release.merged=true;assert.match(blocked(s),/Cancelled/);
});
