import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('Exactly one current full organization rulebook lives at governance/main/RULES.md',()=>{
 const md=fs.readdirSync('.').filter(x=>x.endsWith('.md')).sort();
 assert.deepEqual(md,['COMMANDS.md','README.md','RULES.md']);
 const rule=fs.readFileSync('RULES.md','utf8');
 assert.match(rule,/Only authoritative organization policy/);
 assert.match(rule,/GAME-ADVISOR-DEPUTY/);
 assert.match(rule,/DCEO-A/);
 assert.match(rule,/CCCC DB/);
 assert.match(rule,/PF/);
 assert.match(rule,/SIM/);
});
test('No retired role-charter tree or outdated protocol editions remain on main',()=>{
 assert.equal(fs.existsSync('roles'),false);
 assert.equal(fs.existsSync('STARTUP-PROTOCOL-V9.md'),false);
 assert.equal(fs.existsSync('STARTUP-PROTOCOL-V10.md'),false);
 assert.equal(fs.existsSync('CLOSEOUT-PROTOCOL-V10.md'),false);
 assert.equal(fs.existsSync('CODE-RELAY-PROTOCOL.md'),false);
 assert.deepEqual(fs.readdirSync('appointments').filter(x=>x.endsWith('.md')),
   ['OWNER-TO-CEO.md']);
});
test('Current public docs and CEO bootstrap link to the sole rulebook',()=>{
 for(const p of ['README.md','COMMANDS.md','appointments/OWNER-TO-CEO.md']){
  assert.match(fs.readFileSync(p,'utf8'),/RULES[.]md/);
 }
});
