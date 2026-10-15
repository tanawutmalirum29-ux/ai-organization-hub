import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {auditPublicWorkspace} from '../scripts/org-privacy-audit.mjs';
function run(content){
 const root=mkdtempSync(join(tmpdir(),'public-privacy-'));
 try{
  mkdirSync(join(root,'chats'));writeFileSync(join(root,'chats','one.json'),content);
  return auditPublicWorkspace(root);
 }finally{rmSync(root,{recursive:true,force:true});}
}
test('Ordinary short-code receipt transcript has no detected secret',()=>assert.equal(run('{"speaker":"AI","text":"MN-CEO"}').safe,true));
test('Detect explicit email in private OWNER conversation',()=>{
 const r=run('{"text":"my email is dev@example.com"}');
 assert.equal(r.safe,false);assert.ok(r.problems.some(x=>x.kind==='EMAIL_ADDRESS'));
});
test('Detect GitHub token without printing actual token in report',()=>{
 const r=run('{"text":"ghp_'+'x'.repeat(36)+'"}');
 assert.equal(r.safe,false);assert.ok(!JSON.stringify(r).includes('x'.repeat(36)));
});
test('Detect a plaintext secret assignment',()=>{
 const r=run('password: SuperSecretPassword123');
 assert.equal(r.safe,false);
});
