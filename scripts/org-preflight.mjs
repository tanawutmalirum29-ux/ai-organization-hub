import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const REPOS=['tanawutmalirum29-ux/appointment-CEO','tanawutmalirum29-ux/ant-project'];
const sha=x=>typeof x==='string'&&/^[a-f0-9]{40}$/.test(x);
const trusted=x=>typeof x==='string'&&x.startsWith('https://github.com/');
export function preflight(snapshot){
 const problems=[], pending=[];
 if(snapshot?.purpose!=='PREFLIGHT_BEFORE_DB')problems.push('Incorrect PF intent');
 if(!Number.isFinite(Date.parse(snapshot?.verified_at)))problems.push('No live verification timestamp');
 if(!Array.isArray(snapshot?.repositories)||snapshot.repositories.length!==2)problems.push('Both repositories required');
 for(const name of REPOS){
  const r=(snapshot.repositories||[]).find(x=>x.repository===name);
  if(!r){problems.push('Repository missing: '+name);continue;}
  if(r.default_branch!=='main'||!sha(r.main_sha)||r.all_branches_fetched!==true)
   problems.push(name+': main and exhaustive branch list not verified');
  if(!Array.isArray(r.branches)||!r.branches.includes('main'))problems.push(name+': main branch absent');
  if(r.all_open_prs_fetched!==true||!Array.isArray(r.open_pull_requests)||r.open_pull_requests.length>0)
   problems.push(name+': unresolved/open PRs or unchecked PR pagination');
  if(r.all_open_issues_fetched!==true||!Array.isArray(r.open_issues))problems.push(name+': unchecked issue backlog');
  else for(const issue of r.open_issues){
   if(issue.release_blocker===true||!Array.isArray(issue.labels)||
       !issue.labels.some(x=>['future-work','backlog','next-mission'].includes(x)))
    problems.push(name+': untriaged/release-blocking issue '+issue.number);
  }
  const live=(r.branches||[]).filter(x=>x!=='main');
  if(!Array.isArray(r.branch_risks)||r.branch_risks.length!==live.length||
    new Set(r.branch_risks.map(x=>x.name)).size!==live.length)
    problems.push(name+': every non-main branch must be examined against main');
  else for(const b of r.branch_risks){
   if(!live.includes(b.name)||!sha(b.head_sha)||b.compared_against_sha!==r.main_sha||
      b.compare_complete!==true)problems.push(name+': unverified compare for '+b.name);
   const archivedOwnRound=(name===REPOS[0] && b.name.startsWith('round/') &&
      snapshot.archive?.source_round_branch===b.name &&
      snapshot.archive?.source_round_sha===b.head_sha &&
      snapshot.archive?.stored_on_governance_main===true &&
      snapshot.archive?.all_files_verified===true &&
      snapshot.archive?.privacy_review_passed===true &&
      trusted(snapshot.archive?.manifest_url));
   const deferredCode=b.recoverable===true&&trusted(b.future_issue_url)&&
      trusted(b.durable_patch_url)&&b.code_and_tests_preserved===true;
   if(b.ahead_by>0 && !archivedOwnRound && !deferredCode)
    problems.push(name+': unique unmerged code on '+b.name+' is not durably preserved');
   else pending.push({repository:name,branch:b.name,ahead_by:b.ahead_by,
     archive_link:archivedOwnRound?snapshot.archive.manifest_url:(b.durable_patch_url||null)});
  }
  if(r.release_ci!=='success'||r.release_qa!=='success')
   problems.push(name+': latest relevant release/CI/QA checks not verified');
 }
 const a=snapshot.archive;
 if(a?.stored_on_governance_main!==true||a?.all_files_verified!==true||
    a?.privacy_review_passed!==true||!sha(a?.source_round_sha)||
    !trusted(a?.manifest_url)||!Array.isArray(a?.chat_files_preserved)||
    a.chat_files_preserved.length===0)
  problems.push('Permanent archive/chat history/privacy verification not complete');
 if(snapshot.mission?.closed!==true||snapshot.mission?.released_main_verified!==true)
  problems.push('Game mission not proven released and fully CLOSED');
 return {ready:problems.length===0,code:problems.length?'B':'CCCC DB',problems,branches_to_delete:pending};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{
  if(process.argv.length!==3)throw Error('Usage: node scripts/org-preflight.mjs <LIVE_EVIDENCE.json>');
  const answer=preflight(JSON.parse(fs.readFileSync(process.argv[2],'utf8')));
  process.stdout.write(JSON.stringify(answer,null,2)+'\n');
  if(!answer.ready)process.exitCode=1;
 }catch(e){console.error('ER: '+e.message);process.exitCode=1;}
}
