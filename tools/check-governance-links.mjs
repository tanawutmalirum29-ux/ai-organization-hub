// Check that authored relative Markdown paths in the governance repository resolve.
// This checks local file integrity only, not external GitHub URLs or actual AI competence.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
function walk(folder) {
  const result=[];
  for(const item of readdirSync(folder,{withFileTypes:true})){
    const file=path.join(folder,item.name);
    if(item.isDirectory()) {
      if(item.name!=='.git' && item.name!=='node_modules')result.push(...walk(file));
    }else if(item.isFile() && item.name.endsWith('.md'))result.push(file);
  }
  return result;
}
let checked=0;
for (const file of walk(root)){
  const markdown=readFileSync(file,'utf8');
  let inFence=false;
  for(const [i,line] of markdown.split('\n').entries()){
    if(/^\s*```/.test(line)){inFence=!inFence;continue;}
    if(inFence)continue;
    for(const m of line.matchAll(/\[[^\]]+\]\(([^\s)]+)(?:\s+[^)]*)?\)/g)){
      const href=m[1].split('#')[0].split('?')[0];
      if(!href || /^(https?:|mailto:|data:|#)/i.test(href))continue;
      let decoded;
      try{decoded=decodeURIComponent(href)}catch{throw new Error('bad encoded URL: '+href)}
      const target=path.resolve(path.dirname(file),decoded);
      assert.ok(target.startsWith(root+path.sep), 'link escapes repository: '+href+' '+file);
      assert.ok(existsSync(target) && (statSync(target).isFile()||statSync(target).isDirectory()),
        'broken local Markdown link: '+path.relative(root,file)+':'+(i+1)+' -> '+href);
      checked++;
    }
  }
}
console.log('GOVERNANCE_LOCAL_LINKS_PASS',{checked_links:checked});
