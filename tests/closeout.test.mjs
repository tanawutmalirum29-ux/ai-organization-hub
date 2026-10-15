import {test} from 'node:test';
import assert from 'node:assert/strict';
import {evaluateCloseoutSnapshot} from '../scripts/closeout-check.mjs';

const SHA='a'.repeat(40), OTHER='b'.repeat(40);
function snapshot(){
 const repo=(repository)=>({
  repository,default_branch:'main',archived:false,
  branches:['main'],all_branches_fetched:true,main_sha:SHA,
  open_pr_count:0,all_open_prs_fetched:true,
  open_issues:[],all_open_issues_fetched:true,ci_result:'success'
 });
 return {artifact_type:'CLOSEOUT_REVIEW',verified_at:'2026-10-15T04:12:00Z',
  repositories:[repo('tanawutmalirum29-ux/appointment-CEO'),repo('tanawutmalirum29-ux/ant-project')],
  archive:{verified_on_governance_main:true,source_round_commit_sha:OTHER,game_main_sha:SHA,
    workspace_file_count:6,paths_and_hashes_verified:true,manifest_path:'archives/ORG-EXAMPLE/MANIFEST.json'},
  release:{merged:true,independent_qa_passed:true,critical_checks_passed:true,
    all_future_failures_triaged:true}
 };
}
test('C after DB: exact main-only both repos and verified archive permits Completed',()=>{
 assert.deepEqual(evaluateCloseoutSnapshot(snapshot()),{ok:true,action:'Completed',blockers:[]});
});
test('C must not issue Completed when governance branch remains',()=>{
 const s=snapshot();s.repositories[0].branches.push('round/old');
 const x=evaluateCloseoutSnapshot(s);
 assert.equal(x.action,'B');assert.match(x.blockers.join(' '),/branches not EXACTLY/);
});
test('C must not issue Completed when game still has a feature branch',()=>{
 const s=snapshot();s.repositories[1].branches.push('feat/unfinished');
 assert.equal(evaluateCloseoutSnapshot(s).ok,false);
});
test('Open pull requests disallow cleanup to avoid orphaned PR changes',()=>{
 const s=snapshot();s.repositories[1].open_pr_count=1;
 assert.match(evaluateCloseoutSnapshot(s).blockers.join(' '),/open PRs/);
});
test('Future-only issues are acceptable while release blocker issue fails',()=>{
 const s=snapshot();s.repositories[1].open_issues=[{number:55,labels:['future-work'],release_blocker:false}];
 assert.equal(evaluateCloseoutSnapshot(s).ok,true);
 s.repositories[1].open_issues[0].release_blocker=true;
 assert.equal(evaluateCloseoutSnapshot(s).ok,false);
 s.repositories[1].open_issues[0].release_blocker=false;
 s.repositories[1].open_issues[0].labels=[];
 assert.equal(evaluateCloseoutSnapshot(s).ok,false);
});
test('No false confirmation from missing archived chat history',()=>{
 const s=snapshot();s.archive.paths_and_hashes_verified=false;
 assert.match(evaluateCloseoutSnapshot(s).blockers.join(' '),/archive not verified/);
});
test('No false confirmation when actual current game main changed since release',()=>{
 const s=snapshot();s.repositories[1].main_sha=OTHER;
 assert.match(evaluateCloseoutSnapshot(s).blockers.join(' '),/Game main changed/);
});
test('Both branch/pr/issue checks must be exhaustive, never assume first page is all',()=>{
 const s=snapshot();s.repositories[0].all_branches_fetched=false;
 s.repositories[1].all_open_prs_fetched=false;
 s.repositories[1].all_open_issues_fetched=false;
 assert.equal(evaluateCloseoutSnapshot(s).ok,false);
});
test('Unverified CI never produces Completed; waiver needs verified green smoke',()=>{
 const s=snapshot();s.repositories[1].ci_result='failure';
 assert.equal(evaluateCloseoutSnapshot(s).ok,false);
 s.repositories[1].ci_result='waived';
 s.repositories[1].waiver_issue_urls=['https://github.com/tanawutmalirum29-ux/ant-project/issues/130'];
 assert.equal(evaluateCloseoutSnapshot(s).ok,false);
 s.repositories[1].release_smoke_result='success';
 assert.equal(evaluateCloseoutSnapshot(s).ok,true);
});
test('Critical QA and untriaged failures cannot be overridden by OWNER c',()=>{
 const s=snapshot();s.release.independent_qa_passed=false;
 s.release.all_future_failures_triaged=false;
 assert.equal(evaluateCloseoutSnapshot(s).ok,false);
});
