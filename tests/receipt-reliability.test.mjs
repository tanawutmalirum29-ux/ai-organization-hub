import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync,existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {prepareReceiptDraft} from '../scripts/org-receipt.mjs';
import {receiptShapeErrors} from '../scripts/receipt-contract.mjs';
const rid='RECEIPT-CASE-001',ap=rid+'-CEO-01';
const id=n=>rid+'-M'+String(n).padStart(6,'0');
const now='2026-10-15T05:00:00.000Z';
function fixture(fn){
  const root=mkdtempSync(path.join(tmpdir(),'receipt-test-'));
  const ws=path.join(root,'workspace');
  try{
    mkdirSync(path.join(ws,'messages'),{recursive:true});
    writeFileSync(path.join(ws,'round.json'),JSON.stringify({round_id:rid,state:'ACTIVE'}));
    writeFileSync(path.join(ws,'roster.json'),JSON.stringify({round_id:rid,roles:[{
      role_id:'CEO',appointment_id:ap,status:'ACTIVE'}]}));
    for(let n=1;n<=2;n++)writeFileSync(path.join(ws,'messages',String(n).padStart(6,'0')+'.json'),
      JSON.stringify({round_id:rid,message_id:id(n),to_role:'CEO',to_appointment_id:ap}));
    return fn(ws);
  }finally{rmSync(root,{recursive:true,force:true});}
}
const base=ws=>({workspace:ws,messageId:id(1),appointmentId:ap,now});
test('minimal four-field READ marker validates without approval fields',()=>fixture(ws=>{
 const r=prepareReceiptDraft(base(ws));
 assert.equal(r.dry_run,true);
 assert.deepEqual(Object.keys(r.record),['round_id','message_id','recipient_appointment_id','read_at']);
 assert.deepEqual(receiptShapeErrors(r.record,rid),[]);
 assert.equal(existsSync(path.join(ws,'receipts')),false);
}));
test('wrong recipient cannot falsely mark another appointment as read',()=>fixture(ws=>{
 assert.throws(()=>prepareReceiptDraft({...base(ws),appointmentId:rid+'-OTHER-01'}),/recipient/);
}));
test('repeating a saved valid READ returns already_read instead of rewriting',()=>fixture(ws=>{
 const p=path.join(ws,'receipts','M000001',ap+'.json');
 mkdirSync(path.dirname(p),{recursive:true});
 writeFileSync(p,JSON.stringify(prepareReceiptDraft(base(ws)).record));
 const r=prepareReceiptDraft(base(ws));
 assert.equal(r.already_read,true);
 assert.equal(r.record,null);
}));
test('existing invalid bookmark stays unread and can be repaired by actual recipient',()=>fixture(ws=>{
 const p=path.join(ws,'receipts','M000001',ap+'.json');
 mkdirSync(path.dirname(p),{recursive:true});
 writeFileSync(p,JSON.stringify({round_id:rid,message_id:id(2),
 recipient_appointment_id:ap,read_at:now}));
 const repaired=prepareReceiptDraft(base(ws));
 assert.equal(repaired.already_read,false);
 assert.equal(repaired.repair_existing,true);
 assert.deepEqual(receiptShapeErrors(repaired.record,rid),[]);
}));
test('optional disposition is optional for reading and does not gate result',()=>fixture(ws=>{
 const record=prepareReceiptDraft({...base(ws),disposition:'BLOCKED',reason:'unused',evidenceRef:'unused'}).record;
 assert.equal(Object.hasOwn(record,'disposition'),false);
 assert.equal(Object.hasOwn(record,'evidence_ref'),false);
 assert.deepEqual(receiptShapeErrors({...record,disposition:'ACTION_STARTED'},rid),[]);
}));
