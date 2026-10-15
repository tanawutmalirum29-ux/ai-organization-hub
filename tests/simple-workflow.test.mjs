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
 assert.match(rules,/ไม่ได้เดินทางไปยัง ChatGPT อีกแชทโดยอัตโนมัติ/);
});
test('retain shorthand command vocabulary and safe retry semantics',()=>{
 for(const cmd of ['MN','TR','ST','FAST','C','I','Q','H','SYNC','CI','RV','SW','NP','NX','MN-ROLE','AP-ROLE','MQ','BR','BL','WHY','SIM','RC','PF','P','B','ER','CCCC DB','c','Completed']){
  assert.ok(commands.includes('`'+cmd+'`'),'Missing short command '+cmd);
 }
 assert.match(commands,/หนึ่งครั้ง/);
 assert.match(commands,/ไม่ลบประวัติอัตโนมัติ/);
});
test('CEO bootstrap is brief and not blocked by mandatory M ledgers',()=>{
 assert.match(template,/ANT KINGDOM \| OWNER → CEO/);
 assert.match(template,/RULES.md/);
 assert.match(template,/COMMANDS.md/);
 assert.match(template,/npm test/);
 assert.match(template,/ไม่ต้องสร้าง/);
 assert.match(readme,/RULES.md/);
 assert.match(readme,/COMMANDS.md/);
});
