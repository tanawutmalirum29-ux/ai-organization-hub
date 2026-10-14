import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const validator = resolve('scripts/validate-governance.mjs');
const role = (name, parent) => ({
  role_id:name, parent_role:parent, status:'ACTIVE', appointment_id:'TEST-01-'+name+'-01'
});
const CEO = role('CEO','OWNER');
const ADVISOR = role('GAME-ADVISOR','CEO');
const DIR = role('DIR-A','CEO');
const TL = role('TL-A1','DIR-A');
const ENG = role('E-A1-1','TL-A1');
const proposal = {
  subject:'Troop cost', observed_problem:'Repeated cheap spam dominates',
  suggested_change:'Test +10% unit upkeep', expected_effect:'Increase unit diversity',
  risks:'Potential early economy squeeze', evidence:'Example issue and repeatable scenario'
};
const decision = {status:'ACCEPTED_FOR_SCOPING',rationale:'Testable; request separate Owner mandate for implementation'};

function message(n,from,to,kind,opts={}) {
  const msgid='TEST-01-M'+String(n).padStart(6,'0');
  const fields=[
    'ROUND_ID: TEST-01','MESSAGE_ID: '+msgid,
    'FROM_ROLE: '+from,'FROM_APPOINTMENT_ID: '+(from==='OWNER'?'OWNER':'TEST-01-'+from+'-01'),
    'TO_ROLE: '+to,'TO_APPOINTMENT_ID: '+(to==='OWNER'?'OWNER':'TEST-01-'+to+'-01'),
    'TASK_REF: DESIGN','IN_REPLY_TO: '+(opts.in_reply_to||'NONE')
  ];
  return {
    sequence:n, message_id:msgid, round_id:'TEST-01',
    from_role:from, from_appointment_id:from==='OWNER'?'OWNER':'TEST-01-'+from+'-01',
    to_role:to, to_appointment_id:to==='OWNER'?'OWNER':'TEST-01-'+to+'-01',
    kind, task_ref:'DESIGN', event_key:'TEST-01:'+kind+':'+n,
    in_reply_to: opts.in_reply_to||null, summary:'Test '+kind,
    relay_text:fields.join('\n'), ...('proposal' in opts?{proposal:opts.proposal}:{}),
    ...('decision' in opts?{decision:opts.decision}:{})
  };
}

function validate(roles,messages) {
  const cwd=mkdtempSync(join(tmpdir(),'game-advisor-'));
  try {
    mkdirSync(join(cwd,'workspace','messages'),{recursive:true});
    writeFileSync(join(cwd,'workspace','round.json'),JSON.stringify({
      round_id:'TEST-01',game_repository:'tanawutmalirum29-ux/ant-project',state:'ACTIVE'
    }));
    writeFileSync(join(cwd,'workspace','roster.json'),JSON.stringify({round_id:'TEST-01',roles}));
    messages.forEach((m,i)=>writeFileSync(join(cwd,'workspace','messages',String(i+1).padStart(6,'0')+'.json'),JSON.stringify(m)));
    return spawnSync(process.execPath,[validator,'round/test-01'],{
      cwd,encoding:'utf8',env:{...process.env,GITHUB_HEAD_REF:'',GITHUB_REF_NAME:'',GITHUB_EVENT_NAME:'test',BEFORE_SHA:''}
    });
  } finally {rmSync(cwd,{recursive:true,force:true});}
}
const bootstrap=message(1,'OWNER','CEO','APPOINTMENT');

test('CEO can appoint an advisor, receive a proposal and decide without game authorization',()=>{
  const msgs=[
    bootstrap,
    message(2,'CEO','GAME-ADVISOR','APPOINTMENT'),
    message(3,'GAME-ADVISOR','CEO','ACK',{in_reply_to:'TEST-01-M000002'}),
    message(4,'GAME-ADVISOR','CEO','PROPOSAL',{proposal}),
    message(5,'CEO','GAME-ADVISOR','DECISION',{in_reply_to:'TEST-01-M000004',decision})
  ];
  const result=validate([CEO,ADVISOR],msgs);
  assert.equal(result.status,0,result.stderr);
});

test('advisor cannot be subordinated to a DIR',()=>{
  const wrong={...ADVISOR,parent_role:'DIR-A'};
  const result=validate([CEO,DIR,wrong],[bootstrap]);
  assert.notEqual(result.status,0);
  assert.match(result.stderr,/GAME-ADVISOR parent must be CEO/);
});

test('Engineer cannot bypass TL to send a proposal straight to CEO',()=>{
  const result=validate([CEO,DIR,TL,ENG],[bootstrap,message(2,'E-A1-1','CEO','PROPOSAL',{proposal})]);
  assert.notEqual(result.status,0);
  assert.match(result.stderr,/direct parent/);
});

test('upward relay Engineer to TL to DIR to CEO preserves linked provenance',()=>{
  const result=validate([CEO,DIR,TL,ENG],[
    bootstrap,message(2,'E-A1-1','TL-A1','PROPOSAL',{proposal}),
    message(3,'TL-A1','DIR-A','PROPOSAL',{in_reply_to:'TEST-01-M000002',proposal}),
    message(4,'DIR-A','CEO','PROPOSAL',{in_reply_to:'TEST-01-M000003',proposal})
  ]);
  assert.equal(result.status,0,result.stderr);
});

test('DECISION must answer the originating advisor or contributor',()=>{
  const result=validate([CEO,DIR,ADVISOR],[
    bootstrap,message(2,'GAME-ADVISOR','CEO','PROPOSAL',{proposal}),
    message(3,'CEO','DIR-A','DECISION',{in_reply_to:'TEST-01-M000002',decision})
  ]);
  assert.notEqual(result.status,0);
  assert.match(result.stderr,/DECISION must answer original feedback/);
});

test('proposal missing evidence fails validation',()=>{
  const result=validate([CEO,ADVISOR],[
    bootstrap,message(2,'GAME-ADVISOR','CEO','PROPOSAL',{proposal:{...proposal,evidence:''}})
  ]);
  assert.notEqual(result.status,0);
  assert.match(result.stderr,/missing structured game-design fields/);
});

test('DECISION without status or rationale fails validation',()=>{
  const result=validate([CEO,ADVISOR],[
    bootstrap,message(2,'GAME-ADVISOR','CEO','PROPOSAL',{proposal}),
    message(3,'CEO','GAME-ADVISOR','DECISION',{in_reply_to:'TEST-01-M000002',decision:{status:'REJECTED',rationale:''}})
  ]);
  assert.notEqual(result.status,0);
  assert.match(result.stderr,/DECISION requires proposal reply/);
});
