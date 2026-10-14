import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const validator = resolve('scripts/validate-governance.mjs');
const roundId = 'V6-LIFECYCLE-TEST';
const role = (name, parent, status='ACTIVE') =>
  ({ role_id:name, parent_role:parent, status, appointment_id:roundId+'-'+name+'-01' });
const id = n => roundId+'-M'+String(n).padStart(6,'0');
function message(n, from, to, kind, extra={}) {
  const fa=from==='OWNER'?'OWNER':roundId+'-'+from+'-01';
  const ta=to==='OWNER'?'OWNER':roundId+'-'+to+'-01';
  return {
    sequence:n, message_id:id(n), round_id:roundId, from_role:from,
    from_appointment_id:fa, to_role:to, to_appointment_id:ta, kind,
    event_key:roundId+':'+kind+':'+n, task_ref:'TEST_MISSION', in_reply_to:null,
    summary:'V6 '+kind+' '+n,
    relay_text:[
      'ROUND_ID: '+roundId,'MESSAGE_ID: '+id(n),'FROM_ROLE: '+from,
      'FROM_APPOINTMENT_ID: '+fa,'TO_ROLE: '+to,'TO_APPOINTMENT_ID: '+ta,
      'TASK_REF: TEST_MISSION','IN_REPLY_TO: NONE'
    ].join('\n'),...extra
  };
}
const base=[message(1,'OWNER','CEO','APPOINTMENT')];
function validate({ state='ACTIVE', reason, roles, messages=base, sha, evidence, cancellation }) {
  const cwd=mkdtempSync(join(tmpdir(),'v6-closeout-'));
  try {
    mkdirSync(join(cwd,'workspace','messages'),{recursive:true});
    writeFileSync(join(cwd,'workspace','round.json'), JSON.stringify({
      round_id:roundId,game_repository:'tanawutmalirum29-ux/ant-project',
      state,closure_reason:reason,final_game_main_sha:sha,
      closure_evidence_url:evidence,owner_cancellation_evidence:cancellation
    }));
    writeFileSync(join(cwd,'workspace','roster.json'),JSON.stringify({
      round_id:roundId,roles:roles||[role('CEO','OWNER')]
    }));
    messages.forEach((m,i)=>writeFileSync(join(cwd,'workspace','messages',
      String(i+1).padStart(6,'0')+'.json'),JSON.stringify(m)));
    return spawnSync(process.execPath,[validator,'round/'+roundId.toLowerCase()],{
      cwd,encoding:'utf8',
      env:{...process.env,GITHUB_HEAD_REF:'',GITHUB_REF_NAME:'',
        GITHUB_EVENT_NAME:'test',BEFORE_SHA:''}
    });
  }finally{rmSync(cwd,{recursive:true,force:true});}
}
const release=message(2,'CEO','OWNER','ROUND_CLOSED',{closure_reason:'MISSION_COMPLETED'});
const cancel=message(2,'CEO','OWNER','ROUND_CLOSED',{closure_reason:'OWNER_CANCELLED'});
test('active V6 round is allowed before mission completion',()=>{
  const r=validate({});
  assert.equal(r.status,0,r.stderr);
});
test('completed mission must contain final SHA and all roles retired',()=>{
  const r=validate({state:'CLOSED',reason:'MISSION_COMPLETED',
    roles:[role('CEO','OWNER','CLOSED'),role('DIR-A','CEO','CLOSED')],
    messages:[...base,release],sha:'a'.repeat(40),
    evidence:'https://github.com/tanawutmalirum29-ux/ant-project/issues/123'});
  assert.equal(r.status,0,r.stderr);
});
test('cannot close round with any active or unrelayed role',()=>{
  const r=validate({state:'CLOSED',reason:'MISSION_COMPLETED',
    roles:[role('CEO','OWNER','CLOSED'),role('DIR-A','CEO','PENDING_RELAY')],
    messages:[...base,release],sha:'a'.repeat(40),evidence:'https://github.com/test'});
  assert.notEqual(r.status,0);assert.match(r.stderr,/retire every role/);
});
test('Owner-cancelled unshipped mission closes without fake game merge',()=>{
  const r=validate({state:'CLOSED',reason:'OWNER_CANCELLED',
    roles:[role('CEO','OWNER','CLOSED')],messages:[...base,cancel],
    cancellation:'Owner explicitly cancelled before implementation 2026-10-15'});
  assert.equal(r.status,0,r.stderr);
});
test('cancelled round without explicit Owner evidence must be rejected',()=>{
  const r=validate({state:'CLOSED',reason:'OWNER_CANCELLED',
    roles:[role('CEO','OWNER','CLOSED')],messages:[...base,cancel]});
  assert.notEqual(r.status,0);assert.match(r.stderr,/Owner cancellation evidence/);
});
