import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {generateNewCeoHandoff} from '../scripts/next-ceo.mjs';
const SHA='a'.repeat(40),GOV='b'.repeat(40);
const template=readFileSync('appointments/OWNER-TO-CEO.md','utf8');
const roundId='ANT-KINGDOM-ORG-NEXT-01';
function snapshot(){
 const repo=(repository,main_sha)=>({
  repository,default_branch:'main',archived:false,branches:['main'],all_branches_fetched:true,main_sha,
  open_pr_count:0,all_open_prs_fetched:true,open_issues:[],all_open_issues_fetched:true,ci_result:'success'
 });
 return {artifact_type:'CLOSEOUT_ARCHIVE',verified_at:new Date().toISOString(),
  repositories:[repo('tanawutmalirum29-ux/appointment-CEO',GOV),repo('tanawutmalirum29-ux/ant-project',SHA)],
  archive:{verified_on_governance_main:true,source_round_commit_sha:'c'.repeat(40),
   game_main_sha:SHA,workspace_file_count:55,paths_and_hashes_verified:true,
   manifest_path:'archives/OLD-ROUND-001/MANIFEST.json'},
  release:{merged:true,independent_qa_passed:true,critical_checks_passed:true,all_future_failures_triaged:true},
  handoff_issue_url:'https://github.com/tanawutmalirum29-ux/appointment-CEO/issues/55',
  existing_round_ids:['OLD-ROUND-001'],all_existing_round_ids_verified:true
 };
}
test('After user c and verified cleanup, generate Completed plus single fresh complete CEO first appointment',()=>{
 const t=generateNewCeoHandoff(snapshot(),template,roundId);
 assert.ok(t.startsWith('Completed\n\nROUND_ID: '+roundId+'\n'));
 assert.ok(t.includes('TO_APPOINTMENT_ID: '+roundId+'-CEO-01'));
 assert.ok(t.includes('GAME_MAIN_SHA_AT_APPOINTMENT: '+SHA));
 assert.ok(t.includes('GOVERNANCE_MAIN_SHA_AT_APPOINTMENT: '+GOV));
 assert.ok(t.includes('OWNER_HANDOFF_CHECK: https://github.com/tanawutmalirum29-ux/appointment-CEO/issues/55'));
 assert.ok(t.includes('READ_SINGLE_RULES_FIRST'));
 assert.ok(!/<[^<>]*>/.test(t));
 // The exact first-line Completed and fresh ID are already asserted above.
});
test('Refuse successor if only one repository has main-only branches',()=>{
 const s=snapshot();s.repositories[0].branches.push('round/old');
 assert.throws(()=>generateNewCeoHandoff(s,template,roundId),/cleanup not verified/);
});
test('Refuse reuse of prior CEO round ID',()=>{
 assert.throws(()=>generateNewCeoHandoff(snapshot(),template,'OLD-ROUND-001'),/already used/);
});
test('Refuse successor if old CEO has not yet saved real handoff issue',()=>{
 const s=snapshot();delete s.handoff_issue_url;
 assert.throws(()=>generateNewCeoHandoff(s,template,roundId),/Issue/);
});
test('Refuse successor if prior rounds not checked for duplicate identity',()=>{
 const s=snapshot();s.all_existing_round_ids_verified=false;
 assert.throws(()=>generateNewCeoHandoff(s,template,roundId),/checked exhaustively/);
});
test('Refuse stale check from earlier day instead of guessing GitHub state',()=>{
 const s=snapshot();s.verified_at='2026-01-01T01:00:00Z';
 assert.throws(()=>generateNewCeoHandoff(s,template,roundId),/stale verification/);
});
test('No successor if an actual future-issue label masks a release blocker',()=>{
 const s=snapshot();s.repositories[1].open_issues=[{number:7,labels:['future-work'],release_blocker:true}];
 assert.throws(()=>generateNewCeoHandoff(s,template,roundId),/cleanup not verified/);
});
