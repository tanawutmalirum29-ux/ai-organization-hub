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
 assert.match(commands,/ไม่ลบประวัติอัตโนมัติ/);
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
