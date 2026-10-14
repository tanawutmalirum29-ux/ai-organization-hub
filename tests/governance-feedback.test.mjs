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
const decision = {status:'ACCEPTED_FOR_SCOPING',rationale:'Testable; CEO may scope a charter after consulting the team'};

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
    ...('decision' in opts?{decision:opts.decision}:{}),
    ...('consultation' in opts?{consultation:opts.consultation}:{}),
    ...('mission' in opts?{mission:opts.mission}:{}),
    ...('release' in opts?{release:opts.release}:{})
  };
}

function validate(roles,messages, autonomyFrom=null) {
  const cwd=mkdtempSync(join(tmpdir(),'game-advisor-'));
  try {
    mkdirSync(join(cwd,'workspace','messages'),{recursive:true});
    writeFileSync(join(cwd,'workspace','round.json'),JSON.stringify({
      round_id:'TEST-01',game_repository:'tanawutmalirum29-ux/ant-project',state:'ACTIVE',...(autonomyFrom == null ? {} : {owner_relay_only_from_sequence:autonomyFrom})
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

const validateV7 = (roles,messages,from=2)=>validate(roles,messages,from);

test('V7 rejects Owner decision after initial administrative bootstrap',()=>{
  const msgs=[bootstrap,message(2,'OWNER','CEO','TASK')];
  const result=validateV7([CEO],msgs);
  assert.notEqual(result.status,0);
  assert.match(result.stderr,/Owner is a courier/);
});

test('V7 permits CEO advisor consultation followed by advisor proposal to CEO',()=>{
  const msgs=[bootstrap,
    message(2,'CEO','GAME-ADVISOR','CONSULTATION_REQUEST',{consultation:{topic:'Evaluate resource balance'}}),
    message(3,'GAME-ADVISOR','CEO','PROPOSAL',{in_reply_to:'TEST-01-M000002',proposal}),
    message(4,'CEO','GAME-ADVISOR','DECISION',{in_reply_to:'TEST-01-M000003',decision})
  ];
  const result=validateV7([CEO,ADVISOR],msgs);
  assert.equal(result.status,0,result.stderr);
});

test('V7 accepts CEO mission and release without Owner approval',()=>{
  const mission={scope:'Balance troop supply',non_goals:'No new art',source_proposals:'TEST-01-M000002',acceptance_criteria:'AI balances within 10%',qa_plan:'Independent regression coverage'};
  const release={pr_url:'https://github.com/example/repo/pull/1',qa_evidence:'Independent reviewer passed',ci_evidence:'Tests passed',rationale:'Ready after verification'};
  const msgs=[bootstrap,
    message(2,'DIR-A','CEO','PROPOSAL',{proposal}),
    message(3,'CEO','DIR-A','MISSION_CHARTER',{mission}),
    message(4,'CEO','DIR-A','RELEASE',{release})
  ];
  const result=validateV7([CEO,DIR],msgs);
  assert.equal(result.status,0,result.stderr);
});

test('V7 rejects subordinate attempting to release to main',()=>{
  const msgs=[bootstrap,message(2,'TL-A1','DIR-A','RELEASE',{release:{
    pr_url:'PR',qa_evidence:'QA',ci_evidence:'CI',rationale:'Ready'
  }})];
  const result=validateV7([CEO,DIR,TL],msgs);
  assert.notEqual(result.status,0);
  assert.match(result.stderr,/RELEASE must be CEO to DIR/);
});

test('V7 historical owner instruction remains valid before adoption sequence',()=>{
  const msgs=[bootstrap,message(2,'OWNER','CEO','TASK'),message(3,'CEO','DIR-A','REPORT')];
  const result=validateV7([CEO,DIR],msgs,3);
  assert.equal(result.status,0,result.stderr);
});

test('V7 permits direct Owner-to-advisor read-only question followed by advisor-to-CEO proposal',()=>{
  const msgs=[
    bootstrap,
    message(2,'OWNER','GAME-ADVISOR','CONSULTATION_REQUEST',{consultation:{topic:'Suggest new research loops'}}),
    message(3,'GAME-ADVISOR','CEO','PROPOSAL',{in_reply_to:'TEST-01-M000002',proposal}),
    message(4,'CEO','GAME-ADVISOR','DECISION',{in_reply_to:'TEST-01-M000003',decision})
  ];
  const result=validateV7([CEO,ADVISOR],msgs);
  assert.equal(result.status,0,result.stderr);
});

test('V7 rejects Owner consultation request to Engineer',()=>{
  const result=validateV7([CEO,DIR,TL,ENG],[
    bootstrap,message(2,'OWNER','E-A1-1','CONSULTATION_REQUEST',{consultation:{topic:'Do this work'}})
  ]);
  assert.notEqual(result.status,0);
  assert.match(result.stderr,/CONSULTATION_REQUEST must be OWNER or CEO to GAME-ADVISOR/);
});

test('V7 rejects Owner-issued release even if it has QA evidence',()=>{
  const release={pr_url:'PR',qa_evidence:'QA',ci_evidence:'CI',rationale:'Owner cannot authorize this'};
  const result=validateV7([CEO,DIR],[
    bootstrap,message(2,'OWNER','DIR-A','RELEASE',{release})
  ]);
  assert.notEqual(result.status,0);
  assert.match(result.stderr,/Owner is a courier/);
});
