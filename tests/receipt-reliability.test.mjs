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
const base=ws=>({workspace:ws,messageId:id(1),appointmentId:ap,
  disposition:'ACTION_STARTED',reason:'Read and started review',now});
test('preflight draft is schema-valid, safe and read-only',()=>fixture(ws=>{
  const r=prepareReceiptDraft(base(ws));
  assert.equal(r.dry_run,true);assert.deepEqual(receiptShapeErrors(r.record,rid),[]);
  assert.equal(existsSync(path.join(ws,'receipts')),false);
}));
test('preflight refuses false recipient and overwrites',()=>fixture(ws=>{
  assert.throws(()=>prepareReceiptDraft({...base(ws),appointmentId:rid+'-OTHER-01'}),/recipient/);
  const p=path.join(ws,'receipts','M000001',ap+'.json');
  mkdirSync(path.dirname(p),{recursive:true});writeFileSync(p,'{}');
  assert.throws(()=>prepareReceiptDraft(base(ws)),/already exists/);
}));
test('preflight requires real later M for superseding',()=>fixture(ws=>{
  const opt={...base(ws),disposition:'SUPERSEDED'};
  assert.throws(()=>prepareReceiptDraft(opt),/evidence_ref/);
  assert.throws(()=>prepareReceiptDraft({...opt,evidenceRef:id(99)}),/missing local M/);
  assert.throws(()=>prepareReceiptDraft({...opt,evidenceRef:id(1)}),/later M/);
  assert.equal(prepareReceiptDraft({...opt,evidenceRef:id(2)}).record.evidence_ref,id(2));
}));
test('preflight rejects bad reason and invalid evidence URL',()=>fixture(ws=>{
  assert.throws(()=>prepareReceiptDraft({...base(ws),reason:' '}),/required/);
  assert.throws(()=>prepareReceiptDraft({...base(ws),evidenceRef:'ftp://bad'}),/evidence_ref/);
}));
