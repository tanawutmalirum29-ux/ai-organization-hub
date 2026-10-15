import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {evaluateCloseoutSnapshot} from './closeout-check.mjs';

export function generateNewCeoHandoff(snapshot,template,roundId){
 const check=evaluateCloseoutSnapshot(snapshot);
 if(!check.ok)throw Error('B: cleanup not verified: '+check.blockers.join('; '));
 if(typeof roundId!=='string'|| !/^[A-Z0-9][A-Z0-9-]{2,39}$/.test(roundId))
   throw Error('B: new round ID invalid');
 if(!Array.isArray(snapshot.existing_round_ids)||snapshot.all_existing_round_ids_verified!==true)
   throw Error('B: previous round IDs must be checked exhaustively from governance archives/issues');
 if(snapshot.existing_round_ids.includes(roundId)||
    snapshot.archive?.manifest_path?.includes('/'+roundId+'/'))
   throw Error('B: this round ID was already used');
 if(!/^https:\/\/github[.]com\/tanawutmalirum29-ux\/appointment-CEO\/issues\/[1-9][0-9]*$/.test(snapshot.handoff_issue_url||''))
   throw Error('B: closeout status must be durably saved in an actual governance/main Issue');
 const when=Date.parse(snapshot.verified_at),age=Date.now()-when;
 if(!Number.isFinite(when)||age>15*60*1000||age < -2*60*1000)
   throw Error('ER: stale verification; fetch both GitHub repositories again after OWNER c');
 const match=template.match(/\x60\x60\x60text\n([\s\S]*?)\n\x60\x60\x60/);
 if(!match)throw Error('ER: no official first CEO appointment in template');
 const old=match[1];
 const gov=snapshot.repositories.find(r=>r.repository==='tanawutmalirum29-ux/appointment-CEO');
 const game=snapshot.repositories.find(r=>r.repository==='tanawutmalirum29-ux/ant-project');
 const values={
  '<FRESH_UNUSED_ROUND_ID>':roundId,
  '<fresh_unused_round_id_lowercase>':roundId.toLowerCase(),
  '<REAL_ARCHIVE_URL_OR_FIRST_GENERATION_NONE>':
   'https://github.com/tanawutmalirum29-ux/appointment-CEO/blob/main/'+snapshot.archive.manifest_path,
  '<REAL_GITHUB_ISSUE_URL_OR_FIRST_GENERATION_NONE>':snapshot.handoff_issue_url
 };
 let s=old;
 for(const [k,v] of Object.entries(values))s=s.split(k).join(v);
 const line1='GAME_MAIN_SHA_AT_APPOINTMENT: <REAL_40_CHARACTER_SHA>';
 const line2='GOVERNANCE_MAIN_SHA_AT_APPOINTMENT: <REAL_40_CHARACTER_SHA>';
 if(!s.includes(line1)||!s.includes(line2))throw Error('ER: official appointment SHA placeholders changed');
 s=s.replace(line1,'GAME_MAIN_SHA_AT_APPOINTMENT: '+game.main_sha)
    .replace(line2,'GOVERNANCE_MAIN_SHA_AT_APPOINTMENT: '+gov.main_sha);
 if(/<[^<>]*>/.test(s))throw Error('ER: unresolved first appointment placeholders');
 return 'Completed\n\n'+s+'\n';
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{
  if(process.argv.length!==5)throw Error('Usage: node scripts/next-ceo.mjs <recent-Github-snapshot.json> <appointments/OWNER-TO-CEO.md> <FRESH_ROUND_ID>');
  const snapshot=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
  const template=fs.readFileSync(process.argv[3],'utf8');
  process.stdout.write(generateNewCeoHandoff(snapshot,template,process.argv[4]));
 }catch(e){console.error('B: '+e.message);process.exitCode=1}
}
