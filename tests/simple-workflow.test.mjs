import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const rules=readFileSync('RULES.md','utf8');
const commands=readFileSync('COMMANDS.md','utf8');
const template=readFileSync('appointments/OWNER-TO-CEO.md','utf8');
const readme=readFileSync('README.md','utf8');

test('one simple authoritative rulebook with real QA and merge protections',()=>{
 assert.match(rules,/ข้อบังคับการบริหารองค์กร AI/);
 assert.match(rules,/SIMPLE WORKFLOW/);
 assert.match(rules,/OWNER/);
 assert.match(rules,/CEO/);
 assert.match(rules,/ENGINEER/);
 assert.match(rules,/npm test/);
 assert.match(rules,/npm run build/);
 assert.match(rules,/Pull Request|PR/);
 assert.match(rules,/main/);
 assert.match(rules,/ไม่เรียก ChatGPT แชทอื่นเองโดยอัตโนมัติ/);
 assert.match(rules,/GitHub Issue คือกล่องข้อความและใบแต่งตั้งหลัก/);
 assert.match(rules,/MN #140/);
 assert.match(rules,/ห้ามอ้างว่า AI คนอื่นอ่านแล้ว/);
});
test('retain shorthand command vocabulary and safe retry semantics',()=>{
 for(const cmd of ['MN','TR','ST','FAST','C','I','Q','H','SYNC','CI','RV','SW','NP','NX','MN-ROLE','AP-ROLE','MQ','BR','BL','WHY','SIM','RC','PF','P','B','ER','CCCC DB','c','Completed']){
  assert.ok(commands.includes('`'+cmd+'`'),'Missing short command '+cmd);
 }
 assert.match(commands,/หนึ่งครั้ง/);
 assert.match(commands,/ต้องสร้าง Repository ใหม่/);
 assert.match(commands,/ห้ามอ้างว่าลบสำเร็จ/);
});
test('issue-first appointment keeps mandatory gate and QA without M ledgers',()=>{
 assert.match(template,/แต่งตั้งด้วย GitHub Issues/);
 assert.match(template,/APPOINTMENT \| OWNER\/COORDINATOR → ENGINEER-B/);
 assert.match(template,/G1_FROZEN full SHA \+ API \+ START/);
 assert.match(template,/AP-ROLE #140/);
 assert.match(template,/MN #140/);
 assert.match(template,/ไม่ส่งข้อความเข้า ChatGPT แชทอื่นโดยอัตโนมัติ/);
 assert.match(commands,/\`MN\` หรือ \`MN #140\`/);
 assert.match(commands,/ไม่สร้าง M\/Receipt\/Ledger\/Chat Event/);
 assert.match(readme,/RULES.md/);
 assert.match(readme,/COMMANDS.md/);
});

test('all AI roles use brief owner relays and put full records in GitHub',()=>{
 for(const role of ['CEO','Coordinator','Engineer','QA']){
  assert.match(rules,new RegExp(role));
 }
 assert.match(rules,/กฎคำตอบสั้นถึง OWNER/);
 assert.match(rules,/ไม่เกิน 2 บรรทัดสั้น/);
 assert.match(rules,/Issue ของงาน\/PR/);
 assert.match(rules,/ROLE: AP-ROLE/);
 assert.match(rules,/ROLE: MN/);
 assert.match(rules,/OWNER ขอ/);
 assert.match(commands,/2 บรรทัดสั้น/);
 assert.match(commands,/ROLE: AP-ROLE/);
 assert.match(commands,/ROLE: MN/);
 assert.match(template,/ไม่ต้องส่งใบแต่งตั้ง รายงาน QA หรือแผนงานเต็ม/);
 assert.match(readme,/นโยบายสื่อสารถึง OWNER/);
});

test('post-mission cleanup promises a real new issue namespace without corrupting current main',()=>{
 assert.match(rules,/### 5\. ปิดงานและล้างประวัติทั้งหมด/);
 assert.match(rules,/Issue แรกของงานใหม่ได้เลข #1/);
 assert.match(rules,/สำรอง snapshot/);
 assert.match(rules,/ไม่รีเซ็ตเลข Issue\/PR/);
 assert.match(rules,/ห้าม Force Push\/Reset/);
 assert.match(rules,/CLEANUP_BLOCKED/);
 assert.match(commands,/POST-MISSION CLEANUP/);
 assert.match(commands,/Completed\/CLEANUP_BLOCKED/);
});

test('all roles reload live main rules and recognize I before claiming an unknown command',()=>{
 assert.match(rules,/โปรโตคอลคำตอบสั้นและคำสั่ง I/);
 assert.match(rules,/COMMANDS\.md.*เวอร์ชันล่าสุด/);
 assert.match(rules,/ห้ามตอบว่า "ไม่รู้จัก I"/);
 assert.match(rules,/ไม่ซิงก์/);
 assert.match(commands,/\| `I` \|/);
 assert.match(commands,/ห้ามตอบว่าไม่รู้จัก `I`/);
 assert.match(commands,/\| `C` \|/);
 assert.match(template,/เมื่อ OWNER พิมพ์ `I`/);
 assert.match(readme,/แชทเก่าเคยไม่รู้จัก/);
});
test('normal owner replies are exactly C or one MN relay, except I ST and ER',()=>{
 assert.match(rules,/ค่าเริ่มต้นให้ตอบเพียง `C`/);
 assert.match(rules,/มีงานต้องให้แชทอื่นดำเนินต่อจริง/);
 assert.match(rules,/เพียงบรรทัดเดียว/);
 assert.match(rules,/OWNER พิมพ์ `I`/);
 assert.match(rules,/OWNER พิมพ์ `ST`/);
 assert.match(rules,/ER: อ่านกฎล่าสุดไม่ได้/);
 assert.match(commands,/ถ้าไม่มีงานต้องส่งต่อ ตอบเพียง/);
 assert.match(commands,/ถ้าต้องให้แชทอื่นทำงานต่อ ตอบเพียง/);
 assert.match(template,/ไม่มีผู้รับถัดไปให้ตอบ `C` เท่านั้น/);
});
