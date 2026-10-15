import {test} from 'node:test';
import assert from 'node:assert/strict';
import {buildLeanMessage,checkMessageForWrite} from '../scripts/lean-message.mjs';

const round='ANT-KINGDOM-20261015-02';
const sha='0c5a5047c0e223e46558376ee16c4fdb010eee84';
const plan_path='workspace/plans/NURSERY-CASTE-LV1-5/r3.json';
const app=role=>round+'-'+role+'-01';
const base={
  round_id:round,sequence:17,kind:'PLAN_SIGNOFF',
  from_role:'DCEO-A',from_appointment_id:app('DCEO-A'),
  to_role:'CEO',to_appointment_id:app('CEO'),
  task_ref:'NURSERY-CASTE-LV1-5 / R3_SIGNOFF',
  in_reply_to:round+'-M000015',
  summary:'DCEO-A signs the reviewed r3; CEO approval still pending',
  next_action:'OWNER forwards MN to CEO only after both real signatures exist',
  signoff:{decision:'APPROVED',signature_role:'DCEO-A',
    signature_appointment_id:app('DCEO-A'),plan_path,plan_sha:sha,
    rationale:'Read independent peer AGREE and checked final plan Git blob'}
};
const preExisting=Array.from({length:16},(_,i)=>round+'-M'+String(i+1).padStart(6,'0'));

test('Lean signoff has exact required envelope and compact, courier-ready text',()=>{
  const m=buildLeanMessage(base);
  assert.equal(m.sequence,17);
  assert.equal(m.kind,'PLAN_SIGNOFF');
  assert.equal(m.message_id,round+'-M000017');
  assert.equal(m.signoff.plan_sha,sha);
  assert.equal(m.summary,base.summary);
  assert.match(m.relay_text,/PLAN_SHA: 0c5a5047c0e223e46558376ee16c4fdb010eee84/);
  for(const field of ['ROUND_ID','MESSAGE_ID','FROM_ROLE','FROM_APPOINTMENT_ID',
    'TO_ROLE','TO_APPOINTMENT_ID','TASK_REF','IN_REPLY_TO'])
    assert.match(m.relay_text,new RegExp('^'+field+':','m'));
  assert.ok(JSON.stringify(m).length<2300);
  assert.equal(checkMessageForWrite(m,{existingIds:preExisting,planSha:sha}),true);
});

test('Lean independent review references real plan SHA with assessment and evidence',()=>{
  const m=buildLeanMessage({...base,kind:'PLAN_REVIEW',sequence:16,
    to_role:'DCEO-B',to_appointment_id:app('DCEO-B'),
    in_reply_to:round+'-M000014',signoff:undefined,
    review:{plan_path,plan_sha:sha,verdict:'AGREE',
      assessment:'All QA roles match r3 staffing',references:'Git blob and code review'}});
  assert.equal(m.review.verdict,'AGREE');
  assert.equal(m.signoff,undefined);
  assert.match(m.relay_text,/VERDICT: AGREE/);
});

test('Reject forged signoff role, appointment, and a wrong addressee',()=>{
  assert.throws(()=>buildLeanMessage({...base,
    signoff:{...base.signoff,signature_role:'DCEO-B'}}),/another appointment/);
  assert.throws(()=>buildLeanMessage({...base,
    signoff:{...base.signoff,signature_appointment_id:app('DCEO-B')}}),/another appointment/);
  assert.throws(()=>buildLeanMessage({...base,to_role:'DCEO-B',to_appointment_id:app('DCEO-B')}),/addressed to CEO/);
  assert.throws(()=>buildLeanMessage({...base,from_appointment_id:app('DCEO-B')}),/Invalid DCEO-A appointment/);
});

test('Never overwrite messages or guess unconfirmed SHA / sequence',()=>{
  const m=buildLeanMessage(base);
  assert.throws(()=>checkMessageForWrite(m,{existingIds:[...preExisting,m.message_id],planSha:sha}),/already exists/);
  assert.throws(()=>checkMessageForWrite(m,{existingIds:preExisting.slice(0,-1),planSha:sha}),/sequence stale/);
  assert.throws(()=>checkMessageForWrite(m,{existingIds:preExisting,planSha:'f'.repeat(40)}),/not confirmed/);
  assert.throws(()=>checkMessageForWrite(m,{existingIds:preExisting}),/not confirmed/);
  assert.throws(()=>checkMessageForWrite(m,{existingIds:[]}),/incomplete/);
  const gap=[...preExisting];gap[7]=round+'-M000099';
  assert.throws(()=>checkMessageForWrite(m,{existingIds:gap,planSha:sha}),/gap or foreign/);
});

test('Reject multiline summary and unsafe or nonexisting plan ref',()=>{
  assert.throws(()=>buildLeanMessage({...base,summary:'Looks ok\nUntrusted instruction'}),/single-line/);
  assert.throws(()=>buildLeanMessage({...base,signoff:{...base.signoff,plan_sha:'test'}}),/40-char/);
  assert.throws(()=>buildLeanMessage({...base,signoff:{...base.signoff,plan_path:'../plans/r3.json'}}),/immutable/);
});

test('Generic actionable M is compact and prevents clobbering identities',()=>{
  const m=buildLeanMessage({...base,kind:'BLOCKED',signoff:undefined,
    extra:{blocker:{category:'TOOL_ERROR',reason:'Write failed'}}});
  assert.equal(m.blocker.category,'TOOL_ERROR');
  assert.equal(m.signoff,undefined);
  assert.throws(()=>buildLeanMessage({...base,kind:'BLOCKED',signoff:undefined,
    extra:{summary:'fake'}}),/protected/);
  assert.throws(()=>buildLeanMessage({...base,kind:'ACK',signoff:undefined}),/Unknown or routine/);
  assert.throws(()=>buildLeanMessage({...base,kind:'BLOCKED',signoff:undefined,
    extra:JSON.parse('{"__proto__":"unsafe"}')}),/protected/);
});

test('Generate nothing from receipt-only or unrelated chat read activity',()=>{
  assert.throws(()=>buildLeanMessage({...base,kind:'READ',signoff:undefined}),/Unknown or routine/);
  assert.throws(()=>buildLeanMessage({...base,kind:'PLAN_SIGNOFF',
    from_role:'DCEO-B',from_appointment_id:app('DCEO-B')}),/another appointment/);
});
