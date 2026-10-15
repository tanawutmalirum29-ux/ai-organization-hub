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
  total_issues:0,all_issues_fetched:true,total_prs:0,all_prs_fetched:true,
  tags:[],all_tags_fetched:true,releases:[],all_releases_fetched:true,
  old_project_workflow_run_count:0,all_action_runs_fetched:true,
  old_project_workflow_artifact_count:0,all_artifacts_fetched:true,
  no_project_files_on_main:true,history_clean_verified:true,ci_result:'success'
 });
 return {artifact_type:'CLOSEOUT_REVIEW',verified_at:new Date().toISOString(),
  repositories:[repo('tanawutmalirum29-ux/appointment-CEO',GOV),repo('tanawutmalirum29-ux/ant-project',SHA)],
  no_durable_archive:true,closure_type:'COMPLETED',
  release:{merged:true,independent_qa_passed:true,critical_checks_passed:true,all_future_failures_triaged:true},
  previous_round_id:'OLD-ROUND-001',new_round_id_verified_unique:true
 };
}
test('Fresh CEO after actual purge: no previous round archive or Issue reference',()=>{
 const t=generateNewCeoHandoff(snapshot(),template,roundId);
 assert.ok(t.startsWith('Completed\n\nANT KINGDOM | OWNER → CEO | OFFICIAL APPOINTMENT\n\nROUND_ID: '+roundId+'\n'));
 assert.ok(t.includes('TO_APPOINTMENT_ID: '+roundId+'-CEO-01'));
 assert.ok(t.includes('GAME_MAIN_SHA: '+SHA));
 assert.ok(t.includes('GOVERNANCE_MAIN_SHA: '+GOV));
 assert.ok(t.includes('CLEAN_START_POLICY: ONLY_MAIN_NO_OLD_PROJECT_HISTORY'));
 assert.ok(!t.includes('PREVIOUS_ROUND_ARCHIVE:'));
 assert.ok(!t.includes('OWNER_HANDOFF_CHECK:'));
 assert.ok(t.includes('RULES: https://github.com/tanawutmalirum29-ux/appointment-CEO/blob/main/RULES.md'));
 assert.ok(!/<[^<>]*>/.test(t));
});
test('Cannot issue Completed if a round branch still exists',()=>{
 const s=snapshot();s.repositories[0].branches.push('round/old');
 assert.throws(()=>generateNewCeoHandoff(s,template,roundId),/cleanup not verified/);
});
test('Reject exact last round ID reuse',()=>{
 assert.throws(()=>generateNewCeoHandoff(snapshot(),template,'OLD-ROUND-001'),/differ/);
});
test('Reject successor if old Issues remain (even closed)',()=>{
 const s=snapshot();s.repositories[0].total_issues=1;
 assert.throws(()=>generateNewCeoHandoff(s,template,roundId),/cleanup not verified/);
});
test('Do not assume unused round ID from deleted issue/archive history',()=>{
 const s=snapshot();s.new_round_id_verified_unique=false;
 assert.throws(()=>generateNewCeoHandoff(s,template,roundId),/verified unused/);
});
test('Refuse stale snapshot rather than relying on old chat summary',()=>{
 const s=snapshot();s.verified_at='2026-01-01T01:00:00Z';
 assert.throws(()=>generateNewCeoHandoff(s,template,roundId),/stale verification/);
});
test('Refuse if an old PR still exists',()=>{
 const s=snapshot();s.repositories[1].total_prs=1;
 assert.throws(()=>generateNewCeoHandoff(s,template,roundId),/cleanup not verified/);
});
