// Governance V2 roster sanity gate. This verifies structure, NOT independent ChatGPT identities or Release QA signatures.
import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
const r = JSON.parse(readFileSync(new URL('../docs/ai-org/TEAM-REGISTRY.json', import.meta.url),'utf8'));
const page = readFileSync(new URL('../docs/ai-org/ACTIVE_TEAM.md', import.meta.url),'utf8');
const release = readFileSync(new URL('../docs/ai-org/RELEASE-SIGNATURES.md', import.meta.url),'utf8');
const sha = /^[0-9a-f]{40}$/;
assert.equal(r.schema_version, 2);
assert.ok(typeof r.registry_version === 'string' && r.registry_version.length > 3);
assert.ok(sha.test(r.baseline_main_sha), 'invalid last baseline main SHA');
assert.ok(Array.isArray(r.role_slots) && Array.isArray(r.appointments));
assert.ok(Array.isArray(r.pending_staffing_requests));
const slotMap = new Map();
for (const s of r.role_slots) {
  assert.ok(s.role_id && typeof s.role_id === 'string');
  assert.ok(!slotMap.has(s.role_id), 'duplicate role slot: '+s.role_id);
  slotMap.set(s.role_id,s);
}
assert.equal(slotMap.get('CEO')?.parent_role_id,null,'CEO is unique org root');
for (const s of r.role_slots) {
  if(s.role_id !== 'CEO')assert.ok(slotMap.has(s.parent_role_id),'orphan slot '+s.role_id);
  const walked = new Set();
  let x=s;
  while(x){
    assert.ok(!walked.has(x.role_id),'slot cycle at '+x.role_id);
    walked.add(x.role_id);
    x=x.parent_role_id===null ? null : slotMap.get(x.parent_role_id);
  }
}
// Explicit skills, charter and handoff contract for each proposed executive slot.
const requiredContracts = [
  'README.md',
  'docs/ROLE-START-HERE.md',
  'docs/ROLE-SKILLS-AND-SCOPE.md',
  'docs/TASK-STATE-AND-HANDOFF.md',
  'docs/RELAY-TEMPLATES.md',
  'roles/ASSISTANT.md',
  'roles/ROSTER-STEWARD.md',
  'appointments/APPOINT-ROSTER-STEWARD.md'
];
const repoRoot = new URL('../', import.meta.url);
for (const path of requiredContracts) {
  assert.ok(existsSync(new URL(path, repoRoot)), 'missing required AI rule: '+path);
}
const mainReadme = readFileSync(new URL('README.md', repoRoot), 'utf8');
for (const p of requiredContracts.filter(x => x.startsWith('docs/'))) {
  assert.ok(mainReadme.includes(p) || p==='docs/RELAY-TEMPLATES.md', 'README lacks skills/handoff entry '+p);
}
for (const role of r.role_slots) {
  assert.ok(role.role_charter && existsSync(new URL(role.role_charter, repoRoot)), 'missing role charter: '+role.role_id);
  assert.ok(Array.isArray(role.required_skill_areas) && role.required_skill_areas.length>0, 'missing explicit skills for '+role.role_id);
  assert.equal(role.skill_contract,'docs/ROLE-SKILLS-AND-SCOPE.md');
  assert.equal(role.onboarding_procedure,'docs/ROLE-START-HERE.md');
  assert.equal(role.task_completion_procedure,'docs/TASK-STATE-AND-HANDOFF.md');
  assert.equal(role.owner_message_template,'docs/RELAY-TEMPLATES.md');
  assert.ok(role.next_recipient_after_signoff, 'missing Next recipient for '+role.role_id);
  assert.equal(role.slot_status,'TEMPLATE_ONLY_NOT_APPOINTED','unacknowledged slot must not claim ACTIVE: '+role.role_id);
  const charter = readFileSync(new URL(role.role_charter, repoRoot), 'utf8');
  assert.ok(charter.includes('ROLE-START-HERE.md') && charter.includes('TASK-STATE-AND-HANDOFF.md'), 'charter missing onboarding/handoff links: '+role.role_id);
}
for (const path of [
  'appointments/APPOINT-CEO.md',
  'appointments/APPOINT-DEPUTY-DELIVERY.md',
  'appointments/APPOINT-DEPUTY-DOMAIN.md',
  'appointments/APPOINT-DEPARTMENT-DIRECTOR.md',
  'appointments/APPOINT-TEAM-LEAD.md',
  'appointments/APPOINT-ENGINEER.md',
  'appointments/APPOINT-ASSISTANT.md',
  'appointments/APPOINT-ROSTER-STEWARD.md'
]) {
  const source=readFileSync(new URL(path, repoRoot),'utf8');
  assert.ok(source.includes('ROLE-START-HERE.md') && source.includes('TASK-STATE-AND-HANDOFF.md'),
    'appointment missing mandatory skill/handoff reader: '+path);
}
assert.equal(r.policy.owner_message_max_lines,3,'Owner relay cannot exceed 3 lines');
assert.equal(r.policy.skills_selfcheck_before_ack,true);
assert.equal(r.policy.recipients_must_be_immediate_edges,false,'Fast Lane allows relevant direct contacts');
assert.equal(r.policy.adjacent_hop_orders_only,false,'universal hop chain must be disabled');
assert.equal(r.policy.one_direct_parent,true,'manager accountability remains');
assert.equal(r.policy.direct_parent_approval_required,true,'new code scope needs authorized owner');
assert.ok(page.includes('ROLE-SKILLS-AND-SCOPE.md') && page.includes('TASK-STATE-AND-HANDOFF.md'),
  'human team chart must link skills and after-task instructions');
console.log('ROLE_ONBOARDING_AND_HANDOFF_CONTRACT_PASS', {slots:r.role_slots.length,mandatory_files:requiredContracts.length});

// V2 operational hardening: a role template alone cannot start a chat/task.
for (const path of [
  'docs/ACTIVATION-PACKET.md',
  'docs/TASK-ISSUE-CONTRACT.md',
  'docs/READINESS-DRILLS.md',
  'tools/check-governance-links.mjs'
]) {
  assert.ok(existsSync(new URL(path, repoRoot)),'missing actual onboarding/task contract '+path);
}
for(const link of [
  'docs/ACTIVATION-PACKET.md',
  'docs/TASK-ISSUE-CONTRACT.md',
  'docs/READINESS-DRILLS.md'
]) assert.ok(mainReadme.includes(link),'README missing operational prerequisite '+link);
const qaSop=readFileSync(new URL('docs/AUTONOMOUS-QA.md',repoRoot),'utf8');
assert.ok(qaSop.includes('DCEO-DELIVERY') && qaSop.includes('DCEO-QA'),
  'QA policy must use V2 deputy chain');
assert.ok(!qaSop.includes('Integration Director if designated; otherwise CEO') &&
           !qaSop.includes('Integration Director, when appointed'),
  'QA SOP contains forbidden pre-V2 reporting route');
const activationSop=readFileSync(new URL('docs/ACTIVATION-PACKET.md',repoRoot),'utf8');
assert.ok(activationSop.includes('NEEDS_APPOINTMENT') && activationSop.includes('APPOINTMENT_ACK'),
  'activation must reject a bare repo URL and require real recipient ACK');
const taskSop=readFileSync(new URL('docs/TASK-ISSUE-CONTRACT.md',repoRoot),'utf8');
for(const field of ['sender_role_id','recipient_role_id','main_base_sha','owned_paths',
  'forbidden_paths','acceptance_criteria','required_tests','reviewer_role_id','auto_ci_trigger']){
  assert.ok(taskSop.includes(field),'task contract missing critical field '+field);
}
console.log('GOVERNANCE_ACTIVATION_AND_TASK_CONTRACT_PASS');

// Chat titles are *suggestions*, derived deterministically from actual Role IDs.
// This CI never claims to rename a ChatGPT conversation.
assert.ok(existsSync(new URL('docs/CHAT-NAMING.md', repoRoot)), 'missing required chat title instructions');
assert.ok(mainReadme.includes('docs/CHAT-NAMING.md'), 'README must link chat naming rule');
assert.equal(r.policy.chat_title_format, '{role_id}');
assert.equal(r.policy.chat_title_must_be_proposed_on_first_ack, true);
assert.equal(r.policy.chat_title_is_not_proof_of_rename, true);
const chatNaming = readFileSync(new URL('docs/CHAT-NAMING.md', repoRoot), 'utf8');
assert.ok(chatNaming.includes('<ROLE_ID>') && chatNaming.includes('NEEDS_APPOINTMENT'),
  'chat naming rule must derive from authorized role and reject unknown appointment');
for (const slot of r.role_slots) {
  assert.equal(slot.suggested_chat_title, slot.role_id, 'chat title does not match role '+slot.role_id);
  assert.equal(slot.chat_title_rule, 'docs/CHAT-NAMING.md');
}
for (const appt of r.appointments) {
  assert.equal(appt.suggested_chat_title, appt.role_id, 'appointed chat title must match actual Role ID');
}
for (const name of [
 'APPOINT-CEO.md','APPOINT-DEPUTY-DELIVERY.md','APPOINT-DEPUTY-DOMAIN.md',
 'APPOINT-DEPARTMENT-DIRECTOR.md','APPOINT-TEAM-LEAD.md','APPOINT-ENGINEER.md',
 'APPOINT-ASSISTANT.md','APPOINT-ROSTER-STEWARD.md'
]) {
  const t = readFileSync(new URL('appointments/'+name, repoRoot), 'utf8');
  assert.ok(t.includes('CHAT-NAMING.md') && t.includes('ชื่อแชทแนะนำ'),
    'appointment template missing first-reply chat title: '+name);
}
assert.ok(!chatNaming.includes('ANT | <ROLE_ID>'), 'chat title rule must not use former prefix');
console.log('ROLE_CHAT_TITLE_CONTRACT_PASS', {slots:r.role_slots.length,proposed:true,renamed:false});

// Owner-approved Fast Lane invariants; structural policy check, not a real chat or QA execution.
const fastPath = 'docs/FAST-LANE-GOVERNANCE.md';
assert.equal(r.policy.fast_lane_policy, fastPath);
for (const flag of [
  'direct_relevant_cross_team_contact','urgent_skip_level_contact_allowed',
  'direct_cross_team_write_requires_scope_owner_approval',
  'appointment_one_issue_one_ack','batched_registry_sync','implementation_hold_unchanged'
]) assert.equal(r.policy[flag], true, 'fast-lane flag must be true: '+flag);
assert.equal(r.policy.registry_sync_required_before_subordinate_appointment, false);
assert.ok(existsSync(new URL(fastPath, repoRoot)), 'missing fast-lane rule');
assert.ok(mainReadme.includes(fastPath), 'README must link Fast Lane policy');
const fastSop = readFileSync(new URL(fastPath,repoRoot), 'utf8');
const routingSop = readFileSync(new URL('docs/REQUEST-ROUTING.md',repoRoot), 'utf8');
for (const token of ['APPOINTMENT_ACK', 'TECH_CONSULT', 'CROSS_TEAM_REVIEW',
  'DIRECT_SCOPED_TASK','URGENT_INCIDENT','IMPLEMENTATION_HOLD',
  'QA_HOLD','DCEO-DELIVERY','CEO','registry']) {
  assert.ok(fastSop.toLowerCase().includes(token.toLowerCase()),
    'fast lane policy missing operational guardrail: '+token);
}
assert.ok(routingSop.includes('FAST-LANE-GOVERNANCE.md') &&
  routingSop.includes('DIRECT_SCOPED_TASK') && routingSop.includes('URGENT_INCIDENT'),
  'request routing must permit direct scoped/urgent paths');
assert.ok(activationSop.includes('FAST-LANE-GOVERNANCE.md') &&
  activationSop.includes('one ACK') || activationSop.includes('one Issue'),
  'activation must use one issue and ACK');
assert.ok(page.includes('FAST-LANE-GOVERNANCE.md'),
  'active team page must expose new routing');
assert.ok(r.round_status.includes('IMPLEMENTATION_HOLD'),
  'governance-only policy changes must preserve current implementation hold');
console.log('GOVERNANCE_FAST_LANE_POLICY_PASS', {
  registry:r.registry_version,appointed:r.appointments.length,
  direct_contacts:true,batched_registry:true,impl_hold:r.round_status
});

const appointed = new Map();
const states = new Set(['PROPOSED','PENDING_ACK','ACTIVE','STANDBY','INACTIVE']);
const issueUrl = /^https:\/\/github\.com\/[^/]+\/[^/]+\/issues\/[0-9]+/;
const ackUrl = /^https:\/\/github\.com\/[^/]+\/[^/]+\/issues\/[0-9]+#issuecomment-[0-9]+$/;
for (const m of r.appointments) {
  assert.ok(typeof m.role_id==='string' && m.role_id.length>1);
  assert.ok(!appointed.has(m.role_id),'duplicate active appointment '+m.role_id);
  appointed.set(m.role_id,m);
  assert.ok(states.has(m.status),'invalid status '+m.role_id);
  assert.ok(m.parent_role_id!==m.role_id, 'self parenting');
  if(m.role_id==='CEO')assert.equal(m.parent_role_id,null);
  else assert.ok(typeof m.parent_role_id==='string' && m.parent_role_id,'missing immediate parent '+m.role_id);
  if (['ACTIVE','STANDBY'].includes(m.status)) {
    assert.ok(issueUrl.test(m.appointment_issue_url),'missing real appointment Issue '+m.role_id);
    assert.ok(ackUrl.test(m.ack_comment_url),'missing GitHub recipient ACK '+m.role_id);
    assert.ok(m.appointed_by_role,'missing appointing role '+m.role_id);
  }
}
for (const m of r.appointments) {
  const ids = new Set();
  let p=m;
  while(p){
    assert.ok(!ids.has(p.role_id),'appointment cycle '+m.role_id);
    ids.add(p.role_id);
    if(p.parent_role_id===null)break;
    p=appointed.get(p.parent_role_id);
    assert.ok(p, 'appointed parent not found for '+m.role_id);
  }
}
// Owner maximum TEN AI for the ENTIRE ORGANIZATION, not per Team.
// The CI can validate roster data and declared real ACK receipts, not unseen chats.
const capacityDoc='docs/TEAM-CAPACITY-AND-MANAGEMENT-CONTRIBUTORS.md';
assert.ok(existsSync(new URL(capacityDoc,repoRoot)), 'missing global staffing policy');
assert.ok(mainReadme.includes(capacityDoc), 'README lacks global staffing cap');
assert.equal(r.policy.max_ai_entire_organization,10,'the global maximum is exactly ten');
assert.equal(r.global_staffing_limit,10,'registry global limit must equal policy');
assert.equal(r.policy.global_staffing_hard_cap,true);
assert.equal(r.policy.team_size_scope,'ENTIRE_ORGANIZATION',
  'per-work-team cap is forbidden: must cap entire organization');
assert.equal(r.policy.allow_more_than_max_for_large_work,false);
assert.equal(r.policy.split_workstream_if_exceeds_max,false,
  'no extra staffing via new teams');
assert.equal(r.policy.min_core_engineers_per_lead,0);
assert.equal(r.policy.fixed_two_engineers_required,false);
assert.equal(r.policy.team_size_basis,'all_staffed_roles_and_acknowledged_unreconciled_chats');
for(const flag of ['management_hands_on_contribution_allowed',
  'implementer_cannot_self_approve','independent_quality_required_when_manager_codes',
  'owner_only_can_change_team_cap','require_external_ack_reconciliation']){
  assert.equal(r.policy[flag],true,'missing global staffing protection: '+flag);
}
const globalRosterRoles=r.appointments.filter(a=>a.status!=='INACTIVE'&&a.status!=='RETIRED');
assert.ok(globalRosterRoles.length<=10,'GLOBAL_AI_CAP_EXCEEDED: current registry staff > 10');
assert.ok(Array.isArray(r.unreconciled_verified_ack_issues),'must record external real ACKs');
const external=new Set();
for(const item of r.unreconciled_verified_ack_issues){
  assert.ok(typeof item.role_id==='string'&&item.role_id.length>0,'external ACK missing role');
  assert.ok(!external.has(item.role_id),'duplicate external ACK');
  external.add(item.role_id);
  assert.ok(!appointed.has(item.role_id),'external ACK role also in registered roster');
  assert.ok(issueUrl.test(item.appointment_issue_url||''),'external ACK missing real appointment issue');
  assert.ok(ackUrl.test(item.ack_comment_url||''),'external ACK missing real comment permalink');
  assert.equal(item.status,'ACK_RECEIVED_UNRECONCILED');
  assert.equal(item.counts_as_existing_chat,true);
}
const totalKnown=globalRosterRoles.length+external.size;
assert.ok(totalKnown<=10 || (
  r.policy.new_appointments_frozen_until_reconciled===true &&
  r.policy.global_cap_compliance_verified===false &&
  r.staffing_status==='STAFFING_FREEZE_UNRECONCILED_ACKS'
),'GLOBAL_CAP_OVERBOOKED: freeze and refuse capacity-compliance claim until genuine reconciliation');
if(external.size>0){
  assert.equal(r.policy.new_appointments_frozen_until_reconciled,true);
  assert.equal(r.policy.global_cap_compliance_verified,false);
}
assert.ok(Array.isArray(r.work_teams));
const workTeamIds=new Set();
for(const team of r.work_teams){
  assert.ok(typeof team.team_id==='string'&&team.team_id.length>0);
  assert.ok(!workTeamIds.has(team.team_id),'duplicate task team');
  workTeamIds.add(team.team_id);
  assert.ok(Array.isArray(team.active_member_role_ids));
  const members=new Set(team.active_member_role_ids);
  assert.equal(members.size,team.active_member_role_ids.length,'duplicate team member');
  assert.ok(members.size<=10,'no workstream may contain >10 global AI');
  for(const id of members){
    assert.ok(globalRosterRoles.some(x=>x.role_id===id),'hidden AI not in global registry: '+id);
  }
  for(const id of (team.hands_on_management_role_ids||[])){
    assert.ok(members.has(id),'unregistered management helper in workteam: '+id);
  }
}
for(const name of ['appointments/APPOINT-TEAM-LEAD.md','roles/TEAM-LEAD.md',
  'docs/STAFFING.md','docs/V2-GOVERNANCE.md','README.md']){
  const content=readFileSync(new URL(name,repoRoot),'utf8');
  assert.ok(content.includes('TEAM-CAPACITY-AND-MANAGEMENT-CONTRIBUTORS.md'),
    'global cap policy must be in all onboarding/authority files: '+name);
  assert.ok(!content.includes('each team at') && !content.includes('teams are capped independently'),
    'per-team cap not valid: '+name);
}
console.log('GLOBAL_TEN_AI_HARD_CAP_POLICY_PASS_PENDING_RECONCILIATION',{
  maximum:10,registeredStaff:globalRosterRoles.length,
  externalAcknowledgedUnreconciled:external.size,
  knownStaffingReceipts:totalKnown,
  compliant:r.policy.global_cap_compliance_verified,
  staffingFreeze:r.policy.new_appointments_frozen_until_reconciled,
  workTeams:r.work_teams.length
});

// CEO replacement/succession receipts. Historical ACK roles do not hold current operational authority.
if(r.registry_version==='GOV-V2-COLONY-NEXT-01-007'){
  assert.equal(r.appointments.length,10,'one CEO succession slot plus nine existing staff');
  const ceo=r.appointments.find(x=>x.role_id==='CEO');
  assert.equal(ceo?.status,'PENDING_ACK','new CEO must not be ACTIVE without actual personal ACK');
  assert.equal(ceo?.appointment_id,'CEO-V2-20261014-02');
  assert.ok(ceo?.appointment_issue_url?.endsWith('/issues/28'),'new CEO must use real personal Issue #28');
  assert.ok(ceo.ack_comment_url==null,'new CEO ACK is not yet real');
  assert.equal(r.appointments.filter(x=>x.status==='ACTIVE').length,9,'nine retained managers must remain real ACTIVE staff');
  assert.equal(r.capacity_envelope?.max_distinct_ai_chats_total,10);
  assert.equal(r.capacity_envelope?.approved_roster_model?.team_leads,0);
  assert.equal(r.capacity_envelope?.approved_roster_model?.core_engineers,0);
  assert.equal(r.policy.new_appointments_frozen_until_reconciled,true);
  assert.equal(r.policy.global_cap_compliance_verified,false,'do not assert active replacement before ACK');
  assert.ok(Array.isArray(r.retired_appointments),'retirement receipts missing');
  const retiredIds=new Set(r.retired_appointments.map(x=>x.role_id));
  for(const id of ['CEO','SYS-TL1','EXP-TL1','PLAT-TL1','QA-TL1']){
    assert.ok(retiredIds.has(id),'retirement handoff missing '+id);
    const old=r.retired_appointments.find(x=>x.role_id===id);
    assert.equal(old.status,'RETIRED');
    assert.ok(ackUrl.test(old.ack_comment_url),'historical real ACK must be retained '+id);
    assert.ok(issueUrl.test(old.retirement_issue_url),'retirement issue receipt required '+id);
  }
  assert.equal(r.unreconciled_verified_ack_issues.length,0,'four Lead ACKs need archival disposition');
  assert.equal(r.staffing_snapshot.registered_active_roles,9);
  assert.equal(r.staffing_snapshot.successor_ceo_pending_ack,1);
  assert.equal(r.staffing_snapshot.retired_ack_evidence_count,5);
  assert.equal(r.staffing_snapshot.additional_staffing_authorized,false);
  assert.ok(page.includes('CEO-V2-20261014-02')&&page.includes('PENDING_ACK'),
    'team chart must distinguish new CEO pending from actual ACTIVE');
  console.log('CEO_SUCCESSION_SLOT_RECONCILIATION_PASS',{
    retainedActive:9,ceoPending:true,retiredReceipts:5,globallyAllocatedSeats:10,
    gameplayHold:r.round_status
  });
}

assert.ok(page.includes(r.registry_version),'human chart must show registry version');
assert.ok(page.includes('TEAM-REGISTRY.json'),'chart must link JSON');
assert.ok(release.includes('No new release candidate') || release.includes('candidate_sha'),'release board missing');
if(r.round_status==='STANDBY')assert.equal(r.active_release_candidate,null,'standby cannot claim release');
console.log('ORG_REGISTRY_STRUCTURE_PASS',{version:r.registry_version,slots:slotMap.size,appointed:appointed.size,round_status:r.round_status});
console.log('CAVEAT: structural evidence only; separate ChatGPT identities/signature integrity and Release QA are NOT validated here.');
