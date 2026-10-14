#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const errors = [];
const fail = s => errors.push(s);
const read = p => { try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch(e) { fail(`Unreadable JSON ${p}: ${e.message}`); return null; } };
const branch = process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF_NAME || process.argv[2] || 'main';
const root = 'workspace';
const roundBranch = branch.startsWith('round/');
const exists = fs.existsSync(root);

if (!roundBranch) {
  if (exists) fail('Governance main/policy PR must not contain workspace/: live rounds belong on round/<slug>.');
} else {
  if (process.env.GITHUB_BASE_REF === 'main') fail('Round branch must NEVER be merged into governance main.');
  const round = read(path.join(root, 'round.json'));
  const roster = read(path.join(root, 'roster.json'));
  const id = round?.round_id;
  if (!/^[A-Z0-9][A-Z0-9-]{2,39}$/.test(id || '')) fail('Invalid round_id.');
  if (id && branch !== `round/${id.toLowerCase()}`) fail('Branch/round_id mismatch.');
  if (roster?.round_id !== id) fail('Roster round_id mismatch.');
  if (round?.game_repository !== 'tanawutmalirum29-ux/ant-project') fail('Unsupported game_repository: explicit Owner policy required.');
  if (!['ACTIVE', 'RELEASED', 'CLOSED'].includes(round?.state)) fail('Invalid round state.');
  const autonomyFrom = round?.owner_relay_only_from_sequence;
  if (autonomyFrom != null && (!Number.isSafeInteger(autonomyFrom) || autonomyFrom < 2))
    fail('owner_relay_only_from_sequence must be an integer >= 2 (bootstrap exception).');

  const roles = roster?.roles;
  const known = new Map();
  const ids = new Set();
  if (!Array.isArray(roles) || roles.length < 1) fail('Roster must contain CEO; no global AI count cap.');
  else for (const r of roles) {
    if (!r.role_id || known.has(r.role_id)) fail(`Duplicate/missing role_id ${r.role_id}`);
    if (!r.appointment_id || ids.has(r.appointment_id)) fail(`Duplicate/missing appointment ID ${r.appointment_id}`);
    if (!['ACTIVE', 'PENDING_RELAY', 'CLOSED'].includes(r.status)) fail(`Invalid status for ${r.role_id}`);
    const dir = /^DIR-([A-Z]+)$/.exec(r.role_id || '');
    const tl = /^TL-([A-Z]+)([12])$/.exec(r.role_id || '');
    const eng = /^E-([A-Z]+)([12])-([123])$/.exec(r.role_id || '');
    if (r.role_id === 'CEO') {
      if (r.parent_role !== 'OWNER') fail('CEO parent must be OWNER');
    } else if (r.role_id === 'GAME-ADVISOR') {
      if (r.parent_role !== 'CEO') fail('GAME-ADVISOR parent must be CEO');
    } else if (dir) {
      if (r.parent_role !== 'CEO') fail(`DIR wrong parent: ${r.role_id}`);
    } else if (tl) {
      if (r.parent_role !== `DIR-${tl[1]}`) fail(`TL wrong parent: ${r.role_id}`);
    } else if (eng) {
      if (r.parent_role !== `TL-${eng[1]}${eng[2]}`) fail(`Engineer wrong parent: ${r.role_id}`);
    } else {
      fail(`Invalid role_id ${r.role_id}: two TL per DIR and three Engineers per TL only`);
    }
    known.set(r.role_id, r); ids.add(r.appointment_id);
  }
  if (!known.has('CEO')) fail('Round must contain CEO');
  for (const r of known.values()) {
    if (r.role_id !== 'CEO' && !known.has(r.parent_role)) fail(`Missing parent for ${r.role_id}`);
    if (id && !r.appointment_id.startsWith(id + '-')) fail(`Cross-round appointment ${r.appointment_id}`);
  }

  const dir = path.join(root, 'messages');
  const names = fs.existsSync(dir) ? fs.readdirSync(dir).sort() : [];
  if (!names.length) fail('At least bootstrap message 000001.json required.');
  const eventKeys = new Set();
  const receiptKeys = new Set();
  const msgIds = new Set();
  const msgs = [];
  for (let i = 0; i < names.length; i++) {
    const expected = `${String(i + 1).padStart(6, '0')}.json`;
    if (names[i] !== expected) { fail(`Gap or unexpected file: expected ${expected}, found ${names[i]}`); continue; }
    const m = read(path.join(dir, names[i]));
    if (!m) continue;
    msgs.push(m);
    const expectedId = `${id}-M${String(i + 1).padStart(6, '0')}`;
    if (m.sequence !== i + 1 || m.message_id !== expectedId || m.round_id !== id) fail(`Message envelope mismatch in ${expected}`);
    if (!m.event_key || eventKeys.has(m.event_key)) fail(`Duplicate/empty event_key in ${expected}`);
    if (msgIds.has(m.message_id)) fail(`Duplicate message_id in ${expected}`);
    eventKeys.add(m.event_key); msgIds.add(m.message_id);
    for (const side of ['from', 'to']) {
      const role = m[`${side}_role`], a = m[`${side}_appointment_id`];
      if (role === 'OWNER') { if (a !== 'OWNER') fail(`${expected}: OWNER ID must be OWNER`); }
      else if (!known.has(role) || known.get(role).appointment_id !== a) fail(`${expected}: invalid ${side} role/appointment`);
    }
    if (!['APPOINTMENT','ACK','TASK','RESULT','BLOCKED','REJECTED','REPORT','REVIEW','RELEASE','ROUND_CLOSED','FEEDBACK','PROPOSAL','DECISION','CONSULTATION_REQUEST','MISSION_CHARTER'].includes(m.kind)) fail(`${expected}: invalid kind`);
    if (typeof m.task_ref !== 'string' || !m.task_ref) fail(`${expected}: missing task_ref`);
    if (typeof m.summary !== 'string' || !m.summary) fail(`${expected}: missing summary`);
    if (typeof m.relay_text !== 'string' ||
       !m.relay_text.includes(`MESSAGE_ID: ${expectedId}`) ||
       !m.relay_text.includes(`ROUND_ID: ${id}`) ||
       !m.relay_text.includes(`FROM_ROLE: ${m.from_role}`) ||
       !m.relay_text.includes(`TO_ROLE: ${m.to_role}`) ||
       !m.relay_text.includes(`FROM_APPOINTMENT_ID: ${m.from_appointment_id}`) ||
       !m.relay_text.includes(`TO_APPOINTMENT_ID: ${m.to_appointment_id}`) ||
       !m.relay_text.includes(`TASK_REF: ${m.task_ref}`) ||
       !m.relay_text.includes('IN_REPLY_TO:')) fail(`${expected}: missing mandatory copy-ready relay fields`);
    if (m.kind === 'APPOINTMENT' && m.to_role !== 'CEO' && known.get(m.to_role)?.parent_role !== m.from_role)
      fail(`${expected}: appointment must be issued by direct parent`);
    if (['FEEDBACK','PROPOSAL'].includes(m.kind)) {
      const allowedParent = known.get(m.from_role)?.parent_role;
      if (!allowedParent || m.to_role !== allowedParent)
        fail(`${expected}: feedback/proposal must go to direct parent`);
    }
    if (m.kind === 'PROPOSAL') {
      const fields = ['subject','observed_problem','suggested_change','expected_effect','risks','evidence'];
      if (!m.proposal || fields.some(k => typeof m.proposal[k] !== 'string' || !m.proposal[k].trim()))
        fail(`${expected}: PROPOSAL missing structured game-design fields`);
    }
    if (m.kind === 'DECISION' && (!m.in_reply_to || !m.decision ||
        !['ACCEPTED_FOR_SCOPING','DEFERRED','REJECTED','NEEDS_DATA'].includes(m.decision.status) ||
        typeof m.decision.rationale !== 'string' || !m.decision.rationale.trim()))
      fail(`${expected}: DECISION requires proposal reply, status and rationale`);
    if (m.sequence === 1 && (m.from_role !== 'OWNER' || m.to_role !== 'CEO' || m.kind !== 'APPOINTMENT')) fail('Message 000001 must be Owner→CEO bootstrap.');
    if (autonomyFrom != null && m.sequence >= autonomyFrom) {
      if (m.from_role === 'OWNER') fail(`${expected}: Owner is a courier, not a sender of implementation/decision messages in V7`);
      if (m.kind === 'DECISION' && m.to_role === 'OWNER')
        fail(`${expected}: Owner cannot receive a request to adjudicate decisions`);
      if (m.kind === 'CONSULTATION_REQUEST' && (m.from_role !== 'CEO' || m.to_role !== 'GAME-ADVISOR' ||
          typeof m.consultation?.topic !== 'string' || !m.consultation.topic.trim()))
        fail(`${expected}: CONSULTATION_REQUEST must be CEO to GAME-ADVISOR with topic`);
      if (m.kind === 'MISSION_CHARTER') {
        const required=['scope','non_goals','source_proposals','acceptance_criteria','qa_plan'];
        if (m.from_role !== 'CEO' || !/^DIR-[A-Z]+$/.test(m.to_role) ||
            !m.mission || required.some(k=>typeof m.mission[k] !== 'string' || !m.mission[k].trim()))
          fail(`${expected}: MISSION_CHARTER requires CEO to DIR with scoped mission and QA evidence plan`);
      }
      if (m.kind === 'RELEASE') {
        const required=['pr_url','qa_evidence','ci_evidence','rationale'];
        if (m.from_role !== 'CEO' || !/^DIR-[A-Z]+$/.test(m.to_role) ||
            !m.release || required.some(k=>typeof m.release[k] !== 'string' || !m.release[k].trim()))
          fail(`${expected}: RELEASE must be CEO to DIR with PR, QA, CI and rationale`);
      }
    }
  }
  for (const m of msgs) {
    if (m.in_reply_to != null) {
      if (['ACK', 'RESULT', 'REJECTED'].includes(m.kind)) {
        const receipt = [m.from_appointment_id, m.kind, m.in_reply_to].join('::');
        if (receiptKeys.has(receipt)) fail(`Duplicate processed receipt: ${m.message_id}`);
        receiptKeys.add(receipt);
      }
      const target = msgs.find(v => v.message_id === m.in_reply_to);
      if (!target || target.sequence >= m.sequence) fail(`Bad reply link: ${m.message_id}`);
      else if (m.from_role !== target.to_role || m.from_appointment_id !== target.to_appointment_id)
        fail(`Reply sender mismatch: ${m.message_id}`);
      if (m.kind === 'DECISION' && target &&
        (!['PROPOSAL','FEEDBACK'].includes(target.kind) ||
         m.to_role !== target.from_role || m.to_appointment_id !== target.from_appointment_id))
        fail(`DECISION must answer original feedback/proposal author: ${m.message_id}`);
    } else if (['ACK','RESULT','REJECTED'].includes(m.kind)) fail(`Reply type requires in_reply_to: ${m.message_id}`);
  }
  // V6: closed rounds are terminal, including explicit Owner-cancelled unshipped missions.
  if (round?.state === 'CLOSED') {
    if (!['MISSION_COMPLETED', 'OWNER_CANCELLED', 'AI_CANCELLED'].includes(round.closure_reason))
      fail('CLOSED round requires valid V6 closure_reason');
    if (roles?.some(r => r.status !== 'CLOSED'))
      fail('CLOSED round must retire every role, including pending relay appointments');
    const final = msgs[msgs.length - 1];
    if (!final || final.kind !== 'ROUND_CLOSED' || final.from_role !== 'CEO' ||
        final.to_role !== 'OWNER' || final.closure_reason !== round.closure_reason)
      fail('CLOSED round requires final CEO to OWNER ROUND_CLOSED ledger record with matching closure reason');
    if (round.closure_reason === 'MISSION_COMPLETED') {
      if (!/^[0-9a-f]{40}$/.test(round.final_game_main_sha || '') ||
          typeof round.closure_evidence_url !== 'string' || !round.closure_evidence_url)
        fail('MISSION_COMPLETED requires verified final game main SHA and durable closure evidence');
    }
    if (round.closure_reason === 'OWNER_CANCELLED' &&
        (typeof round.owner_cancellation_evidence !== 'string' || !round.owner_cancellation_evidence))
      fail('Historical OWNER_CANCELLED requires archived Owner cancellation evidence');
    if (round.closure_reason === 'AI_CANCELLED' &&
        (typeof round.ai_cancellation_evidence_url !== 'string' || !round.ai_cancellation_evidence_url))
      fail('AI_CANCELLED requires CEO decision evidence URL');
    if (autonomyFrom != null && round.closure_reason === 'OWNER_CANCELLED')
      fail('V7 rounds cannot close with OWNER_CANCELLED; CEO decides AI_CANCELLED');
  }
  // Append-only enforcement on GitHub pushes. Branch protection is still needed
  // against actors who can bypass CI or rewrite history.
  const before = process.env.BEFORE_SHA;
  if (process.env.GITHUB_EVENT_NAME === 'push' && /^[0-9a-f]{40}$/.test(before || '') && !/^0{40}$/.test(before)) {
    try {
      const changes = execFileSync('git', ['diff', '--name-status', before, 'HEAD', '--', 'workspace/messages'], {encoding: 'utf8'});
      for (const line of changes.trim().split('\n').filter(Boolean)) {
        if (!line.startsWith('A\t')) fail(`Prior message modification/deletion forbidden: ${line}`);
      }
    } catch (e) { fail(`Could not verify append-only history: ${e.message}`); }
  }
}
if (errors.length) { for (const e of errors) console.error('ERROR:', e); process.exit(1); }
console.log(`VALID governance branch=${branch}, workspace=${roundBranch ? 'validated' : 'absent'}`);
