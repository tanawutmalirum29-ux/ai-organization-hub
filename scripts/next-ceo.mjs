import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {evaluateCloseoutSnapshot} from './closeout-check.mjs';

export function generateNewCeoHandoff(snapshot,template,roundId){
 const check=evaluateCloseoutSnapshot(snapshot);
 if(!check.ok)throw Error('B: cleanup not verified: '+check.blockers.join('; '));
 if(typeof roundId!=='string'|| !/^[A-Z0-9][A-Z0-9-]{2,39}$/.test(roundId))
   throw Error('B: new round ID invalid');
 if(snapshot.previous_round_id===roundId)
   throw Error('B: new round ID must differ from the just-completed round');
 if(snapshot.new_round_id_verified_unique!==true)
   throw Error('B: new round ID must be verified unused among available active refs; do not write an archive to track IDs');
 const when=Date.parse(snapshot.verified_at),age=Date.now()-when;
 if(!Number.isFinite(when)||age>15*60*1000||age < -2*60*1000)
   throw Error('ER: stale verification; fetch both GitHub repositories again after OWNER c');
 const match=template.match(/\x60\x60\x60text\n([\s\S]*?)\n\x60\x60\x60/);
 if(!match)throw Error('ER: no official first CEO appointment in template');
 const old=match[1];
 const gov=snapshot.repositories.find(r=>r.repository==='tanawutmalirum29-ux/appointment-CEO');
 const game=snapshot.repositories.find(r=>r.repository==='tanawutmalirum29-ux/ant-project');
 const values={
  '<NEW_ROUND_ID>':roundId,
  '<new_round_id_lowercase>':roundId.toLowerCase()
 };
 let s=old;
 for(const [key,value] of Object.entries(values)) s=s.split(key).join(value);
 if(!s.includes('GAME_MAIN_SHA: <VERIFIED_SHA>') ||
    !s.includes('GOVERNANCE_MAIN_SHA: <VERIFIED_SHA>'))
   throw Error('ER: official appointment SHA fields are incomplete');
 s=s.replace('GAME_MAIN_SHA: <VERIFIED_SHA>','GAME_MAIN_SHA: '+game.main_sha)
    .replace('GOVERNANCE_MAIN_SHA: <VERIFIED_SHA>','GOVERNANCE_MAIN_SHA: '+gov.main_sha);
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
