import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const validator = resolve('scripts/validate-governance.mjs');
const role = (id, parent) => ({
  role_id: id, appointment_id: 'TEST-01-' + id + '-01',
  parent_role: parent, status: 'ACTIVE'
});
const ceo = role('CEO', 'OWNER');

function validate(roles) {
  const cwd = mkdtempSync(join(tmpdir(), 'governance-capacity-'));
  try {
    mkdirSync(join(cwd, 'workspace', 'messages'), {recursive:true});
    writeFileSync(join(cwd,'workspace','round.json'),JSON.stringify({
      round_id:'TEST-01',
      game_repository:'tanawutmalirum29-ux/ant-project',
      state:'ACTIVE'
    }));
    writeFileSync(join(cwd,'workspace','roster.json'),JSON.stringify({round_id:'TEST-01',roles}));
    const message_id = 'TEST-01-M000001';
    const fields = [
      'ROUND_ID: TEST-01','MESSAGE_ID: '+message_id,
      'FROM_ROLE: OWNER','FROM_APPOINTMENT_ID: OWNER',
      'TO_ROLE: CEO','TO_APPOINTMENT_ID: TEST-01-CEO-01',
      'TASK_REF: ORG_SETUP','IN_REPLY_TO: NONE'
    ];
    writeFileSync(join(cwd,'workspace','messages','000001.json'),JSON.stringify({
      sequence:1,message_id,round_id:'TEST-01',
      from_role:'OWNER',from_appointment_id:'OWNER',
      to_role:'CEO',to_appointment_id:'TEST-01-CEO-01',
      kind:'APPOINTMENT',event_key:'TEST-01:BOOTSTRAP',
      task_ref:'ORG_SETUP',in_reply_to:null,
      summary:'Owner appointment',relay_text:fields.join('\n')
    }));
    return spawnSync(process.execPath,[validator,'round/test-01'],{
      cwd,encoding:'utf8',
      env:{...process.env,GITHUB_HEAD_REF:'',GITHUB_REF_NAME:'',GITHUB_EVENT_NAME:'test',BEFORE_SHA:''}
    });
  } finally {
    rmSync(cwd,{recursive:true,force:true});
  }
}
function dept(d,counts) {
  const roles=[ceo,role('DIR-'+d,'CEO')];
  for(let n=1;n<=counts.length;n++){
    roles.push(role('TL-'+d+n,'DIR-'+d));
    for(let e=1;e<=counts[n-1];e++)roles.push(role('E-'+d+n+'-'+e,'TL-'+d+n));
  }
  return roles;
}

test('one TL can have three Engineers',()=>{
  const r=validate(dept('A',[3]));
  assert.equal(r.status,0,r.stderr);
});
test('fourth Engineer of one TL is rejected',()=>{
  const r=validate(dept('A',[4]));
  assert.notEqual(r.status,0);
  assert.match(r.stderr,/Invalid role_id E-A1-4/);
});
test('four Engineers split 2+2 across two TLs',()=>{
  const r=validate(dept('A',[2,2]));
  assert.equal(r.status,0,r.stderr);
});
test('four Engineers split 3+1 across two TLs',()=>{
  const r=validate(dept('A',[3,1]));
  assert.equal(r.status,0,r.stderr);
});
test('15 total AI have no headcount cap',()=>{
  const roles=[...dept('A',[2,2]),...dept('B',[2,2]).slice(1)];
  assert.equal(roles.length,15);
  const r=validate(roles);
  assert.equal(r.status,0,r.stderr);
});
test('third TL for a DIR is rejected',()=>{
  const r=validate([...dept('A',[2,2]),role('TL-A3','DIR-A')]);
  assert.notEqual(r.status,0);
  assert.match(r.stderr,/Invalid role_id TL-A3/);
});
test('Engineer wrong parent is rejected',()=>{
  const roles=dept('A',[3,1]);
  roles.find(x=>x.role_id==='E-A1-3').parent_role='TL-A2';
  const r=validate(roles);
  assert.notEqual(r.status,0);
  assert.match(r.stderr,/Engineer wrong parent/);
});
test('multi-letter department identifiers are supported',()=>{
  const r=validate(dept('AA',[3]));
  assert.equal(r.status,0,r.stderr);
});
