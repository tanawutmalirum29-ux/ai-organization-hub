import {test} from 'node:test';
import assert from 'node:assert/strict';
import {preflight} from '../scripts/org-preflight.mjs';
const sha='a'.repeat(40);
function snap(){
 const repo=repository=>({repository,default_branch:'main',main_sha:sha,all_branches_fetched:true,
  branches:['main','feat/safely-merged'],open_pull_requests:[],all_open_prs_fetched:true,
  open_issues:[{number:201,labels:['future-work'],release_blocker:false}],all_open_issues_fetched:true,
  branch_risks:[{name:'feat/safely-merged',head_sha:sha,compared_against_sha:sha,
    compare_complete:true,ahead_by:0}],release_ci:'success',release_qa:'success'});
 return {purpose:'PREFLIGHT_BEFORE_DB',verified_at:'2026-10-15T09:00:00Z',
 repositories:[repo('tanawutmalirum29-ux/appointment-CEO'),repo('tanawutmalirum29-ux/ant-project')],
 archive:{stored_on_governance_main:true,all_files_verified:true,privacy_review_passed:true,
  source_round_sha:sha,manifest_url:'https://github.com/tanawutmalirum29-ux/appointment-CEO/blob/main/archives/R/MANIFEST.json',
  chat_files_preserved:['events/000001.json']},
 mission:{closed:true,released_main_verified:true}};
}
test('PF ready only after complete archive and verified deletion candidates',()=>assert.equal(preflight(snap()).code,'CCCC DB'));
test('PF rejects any unique ahead unmerged code without recoverable patch',()=>{
 const s=snap();s.repositories[1].branch_risks[0].ahead_by=2;
 assert.match(preflight(s).problems.join(' '),/unique unmerged code/);
});
test('PF refuses branch that was not actually compared with real main',()=>{
 const s=snap();s.repositories[0].branch_risks=[];
 assert.equal(preflight(s).ready,false);
});
test('PF refuses open PR even if branch is safely merged',()=>{
 const s=snap();s.repositories[0].open_pull_requests=[{number:19}];
 assert.equal(preflight(s).ready,false);
});
test('PF refuses public archive if privacy or complete chat file verification is missing',()=>{
 const s=snap();s.archive.privacy_review_passed=false;
 assert.equal(preflight(s).ready,false);
});
test('PF blocks untriaged release-critical issue rather than pretending future work',()=>{
 const s=snap();s.repositories[1].open_issues[0].release_blocker=true;
 assert.equal(preflight(s).ready,false);
});
test('PF refusal when either repo has not fetched complete branch pages',()=>{
 const s=snap();s.repositories[0].all_branches_fetched=false;
 assert.equal(preflight(s).ready,false);
});

test('PF can retire own completed archived governance round branch without a fake future Issue',()=>{
 const s=snap();const gov=s.repositories[0];gov.branches[1]='round/current-round';
 gov.branch_risks=[{name:'round/current-round',head_sha:sha,compared_against_sha:sha,
  compare_complete:true,ahead_by:3}];
 s.archive.source_round_branch='round/current-round';
 assert.equal(preflight(s).ready,true);
});
test('PF refuses claim that a different round branch was archived',()=>{
 const s=snap();const gov=s.repositories[0];gov.branches[1]='round/current-round';
 gov.branch_risks=[{name:'round/current-round',head_sha:sha,compared_against_sha:sha,
  compare_complete:true,ahead_by:3}];
 s.archive.source_round_branch='round/someone-else';
 assert.equal(preflight(s).ready,false);
});
