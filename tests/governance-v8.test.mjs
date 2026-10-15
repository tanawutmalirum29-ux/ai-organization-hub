import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {spawnSync} from 'node:child_process';

const validator=resolve('scripts/validate-governance.mjs');
const rid='V8-CASE-001', id=n=>rid+'-M'+String(n).padStart(6,'0');
const app=role=>rid+'-'+role+'-01';
const role=(name,parent)=>({role_id:name,parent_role:parent,status:'ACTIVE',appointment_id:app(name)});
const ceo=role('CEO','OWNER'),dir=role('DIR-A','CEO'),tl=role('TL-A1','DIR-A'),eng=role('E-A1-1','TL-A1');
const org=role('ORG-ADVISOR','OWNER');
function msg(n,from,to,kind,extra={}) {
  const fa=from==='OWNER'?'OWNER':app(from),ta=to==='OWNER'?'OWNER':app(to);
  const m={sequence:n,message_id:id(n),round_id:rid,from_role:from,from_appointment_id:fa,
    to_role:to,to_appointment_id:ta,kind,event_key:rid+':'+kind+':'+n,task_ref:'CASE',
    in_reply_to:null,summary:'case '+n,
    relay_text:['ROUND_ID: '+rid,'MESSAGE_ID: '+id(n),'FROM_ROLE: '+from,
      'FROM_APPOINTMENT_ID: '+fa,'TO_ROLE: '+to,'TO_APPOINTMENT_ID: '+ta,
      'TASK_REF: CASE','IN_REPLY_TO: NONE'].join('\n'),...extra};
  return m;
}
const base=msg(1,'OWNER','CEO','APPOINTMENT');
function receipt(n,recipient='DIR-A',disposition='HANDLED',extra={}) {
  return {round_id:rid,message_id:id(n),recipient_role:recipient,
    recipient_appointment_id:app(recipient),trigger:'MN',disposition,
    reason:'Read, classified and acted under scoped parent authority',
    read_at:'2026-10-15T01:00:00Z',...extra};
}
function event(n,appointment='DIR-A',speaker='OWNER',extra={}) {
  return {sequence:n,round_id:rid,appointment_id:app(appointment),role_id:appointment,
    speaker,text:n===1?'MN':'C',code:n===1?'MN':'C',redacted:false,
    logged_at:'2026-10-15T01:00:00Z',...extra};
}
function run({messages=[base],roles=[ceo,dir],receipts=[],events=[],v8=true,autonomy=2,history=[]}={}) {
  const cwd=mkdtempSync(join(tmpdir(),'v8-archive-'));
  try {
    mkdirSync(join(cwd,'workspace','messages'),{recursive:true});
    writeFileSync(join(cwd,'workspace','round.json'),JSON.stringify({
      round_id:rid,state:'ACTIVE',game_repository:'tanawutmalirum29-ux/ant-project',
      ...(v8?{protocol_version:'V8',appointment_history:history}:{}),
      ...(autonomy==null?{}:{owner_relay_only_from_sequence:autonomy})
    }));
    writeFileSync(join(cwd,'workspace','roster.json'),JSON.stringify({round_id:rid,roles}));
    messages.forEach((m,i)=>writeFileSync(join(cwd,'workspace','messages',
      String(i+1).padStart(6,'0')+'.json'),JSON.stringify(m)));
    for (const e of receipts) {
      const n=e.message_id.split('-M').at(-1);
      const p=join(cwd,'workspace','receipts','M'+n);
      mkdirSync(p,{recursive:true});
      writeFileSync(join(p,e.recipient_appointment_id+'.json'),JSON.stringify(e));
    }
    for (const e of events) {
      const p=join(cwd,'workspace','chats',e.appointment_id,'events');
      mkdirSync(p,{recursive:true});
      writeFileSync(join(p,String(e.sequence).padStart(6,'0')+'.json'),JSON.stringify(e));
    }
    return spawnSync(process.execPath,[validator,'round/'+rid.toLowerCase()],{
      cwd,encoding:'utf8',env:{...process.env,GITHUB_HEAD_REF:'',GITHUB_REF_NAME:'',
        GITHUB_EVENT_NAME:'test',BEFORE_SHA:''}
    });
  }finally{rmSync(cwd,{recursive:true,force:true});}
}
const two=[base,msg(2,'CEO','DIR-A','TASK'),msg(3,'CEO','DIR-A','REPORT')];
test('V8 validates independently receipted simultaneous incoming messages and OWNER chat events',()=>{
  const r=run({messages:two,receipts:[receipt(2),receipt(3)],events:[event(1),event(2,'DIR-A','AI')]});
  assert.equal(r.status,0,r.stderr);
});
test('V8 does not alter past V7 fixtures without protocol_version',()=>{
  const r=run({messages:two,v8:false});
  assert.equal(r.status,0,r.stderr);
});
test('V8 bad read bookmark warns without stopping unrelated CI',()=>{
  const r=run({messages:two,receipts:[receipt(2,'CEO')]});
  assert.equal(r.status,0,r.stderr);
  assert.match(r.stderr,/WARN: invalid\/unread read marker/);
});
test('V8 receipt with no disposition or evidence is a valid read bookmark',()=>{
  const m={round_id:rid,message_id:id(2),recipient_appointment_id:app('DIR-A'),
    read_at:'2026-10-15T01:00:00Z'};
  const r=run({messages:two,receipts:[m]});
  assert.equal(r.status,0,r.stderr);
});
test('V8 historic receipt without reason remains a valid read bookmark',()=>{
  const r=run({messages:two,receipts:[receipt(2,'DIR-A','ACTION_STARTED',{reason:''})]});
  assert.equal(r.status,0,r.stderr);
});
test('V8 rejects gapped appointment journal sequence',()=>{
  const r=run({messages:two,events:[event(2,'DIR-A','AI')]});
  assert.notEqual(r.status,0);assert.match(r.stderr,/chat journal gap/);
});
test('V8 rejects journal records claiming an unrecorded ledger ref',()=>{
  const r=run({messages:two,events:[event(1,'DIR-A','OWNER',{message_refs:[id(89)]})]});
  assert.notEqual(r.status,0);assert.match(r.stderr,/journal references missing/);
});
test('V8 accepts appointed ORG-ADVISOR chatting full with Owner',()=>{
  const r=run({roles:[ceo,org],messages:[base],events:[event(1,'ORG-ADVISOR','OWNER',{text:'เสนอแก้ผังองค์กรให้ใช้รหัสสั้นแทนข้อความยาว',code:'Q'})]});
  assert.equal(r.status,0,r.stderr);
});
test('V8 Engineer TASK_ACCEPTANCE is authorized only from the direct TL task',()=>{
  const m=[base,msg(2,'TL-A1','E-A1-1','TASK'),msg(3,'E-A1-1','TL-A1','TASK_ACCEPTANCE',{in_reply_to:id(2)})];
  assert.equal(run({messages:m,roles:[ceo,dir,tl,eng]}).status,0);
  const wrong=[base,msg(2,'CEO','E-A1-1','TASK'),msg(3,'E-A1-1','TL-A1','TASK_ACCEPTANCE',{in_reply_to:id(2)})];
  const r=run({messages:wrong,roles:[ceo,dir,tl,eng]});
  assert.notEqual(r.status,0);assert.match(r.stderr,/TASK_ACCEPTANCE must answer prior direct TL/);
});
test('V8 RELEASE supports nonempty Github arrays, but not empty arrays',()=>{
  const yes={pr_url:'https://github.com/o/r/pull/1',qa_evidence:['https://github.com/o/r/issues/1'],ci_evidence:['https://github.com/o/r/actions/runs/1'],rationale:'Reviewed'};
  const good=run({messages:[base,msg(2,'CEO','DIR-A','RELEASE',{release:yes})]});
  assert.equal(good.status,0,good.stderr);
  const bad=run({messages:[base,msg(2,'CEO','DIR-A','RELEASE',{release:{...yes,qa_evidence:[]}})]});
  assert.notEqual(bad.status,0);assert.match(bad.stderr,/RELEASE must be CEO/);
});

test('V8 permits a fresh replacement appointment while old IDs remain read-only history',()=>{
  const replacement={...dir,appointment_id:rid+'-DIR-A-02'};
  const old=msg(2,'CEO','DIR-A','TASK');
  const newer=msg(3,'CEO','DIR-A','TASK');
  newer.to_appointment_id=replacement.appointment_id;
  newer.relay_text=newer.relay_text.replace(app('DIR-A'),replacement.appointment_id);
  const history=[{role_id:'DIR-A',appointment_id:app('DIR-A'),retired_after_sequence:2}];
  const ok=run({messages:[base,old,newer],roles:[ceo,replacement],history});
  assert.equal(ok.status,0,ok.stderr);
  const stale=run({messages:[base,old,msg(3,'CEO','DIR-A','TASK')],roles:[ceo,replacement],history});
  assert.notEqual(stale.status,0);assert.match(stale.stderr,/invalid to role\/appointment/);
});
test('V8 OWNER may appoint independent ORG-ADVISOR once, but not command game DIR',()=>{
  const allowed=run({roles:[ceo,org],messages:[base,msg(2,'OWNER','ORG-ADVISOR','APPOINTMENT')]});
  assert.equal(allowed.status,0,allowed.stderr);
  const denied=run({roles:[ceo,dir],messages:[base,msg(2,'OWNER','DIR-A','APPOINTMENT')]});
  assert.notEqual(denied.status,0);assert.match(denied.stderr,/Owner is a courier/);
});
