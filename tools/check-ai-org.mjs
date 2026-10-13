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
assert.equal(r.policy.recipients_must_be_immediate_edges,true);
assert.ok(page.includes('ROLE-SKILLS-AND-SCOPE.md') && page.includes('TASK-STATE-AND-HANDOFF.md'),
  'human team chart must link skills and after-task instructions');
console.log('ROLE_ONBOARDING_AND_HANDOFF_CONTRACT_PASS', {slots:r.role_slots.length,mandatory_files:requiredContracts.length});

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
assert.ok(page.includes(r.registry_version),'human chart must show registry version');
assert.ok(page.includes('TEAM-REGISTRY.json'),'chart must link JSON');
assert.ok(release.includes('No new release candidate') || release.includes('candidate_sha'),'release board missing');
if(r.round_status==='STANDBY')assert.equal(r.active_release_candidate,null,'standby cannot claim release');
console.log('ORG_REGISTRY_STRUCTURE_PASS',{version:r.registry_version,slots:slotMap.size,appointed:appointed.size,round_status:r.round_status});
console.log('CAVEAT: structural evidence only; separate ChatGPT identities/signature integrity and Release QA are NOT validated here.');
