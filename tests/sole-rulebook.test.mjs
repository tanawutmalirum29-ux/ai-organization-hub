import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('Exactly one current full organization rulebook lives at governance/main/RULES.md',()=>{
 const md=fs.readdirSync('.').filter(x=>x.endsWith('.md')).sort();
 assert.deepEqual(md,['COMMANDS.md','README.md','RULES.md']);
 const rule=fs.readFileSync('RULES.md','utf8');
 assert.match(rule,/ข้อบังคับการบริหารองค์กร AI/);
 assert.match(rule,/GAME-ADVISOR-DEPUTY/);
 assert.match(rule,/DCEO-A/);
 assert.match(rule,/CCCC DB/);
 assert.match(rule,/PF/);
 assert.match(rule,/QA/);
});
test('Main contains a single charter and one CEO appointment',()=>{
 assert.equal(fs.existsSync('roles'),false);
 assert.deepEqual(fs.readdirSync('appointments').filter(x=>x.endsWith('.md')),
   ['OWNER-TO-CEO.md']);
 const rules=fs.readFileSync('RULES.md','utf8');
 assert.match(rules,/ANT KINGDOM/);
 assert.match(rules,/ข้อบังคับ/);
 assert.doesNotMatch(rules,/\\bV(?:6|7|8|9|10)\\b/);
});
test('Current public docs and CEO bootstrap link to the sole rulebook',()=>{
 for(const p of ['README.md','COMMANDS.md','appointments/OWNER-TO-CEO.md']){
  assert.match(fs.readFileSync(p,'utf8'),/RULES[.]md/);
 }
});
