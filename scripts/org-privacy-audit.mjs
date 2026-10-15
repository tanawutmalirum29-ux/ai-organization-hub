import fs from 'node:fs';
import path from 'node:path';

const findings=[
 {id:'GITHUB_TOKEN',re:/\b(?:ghp_|gho_|ghu_|ghs_|ghr_|github_pat_)[a-zA-Z0-9_]{12,}\b/g},
 {id:'AWS_ACCESS_KEY',re:/\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/g},
 {id:'PRIVATE_KEY',re:/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g},
 {id:'BEARER_TOKEN',re:/\bBearer\s+[A-Za-z0-9_\-\.]{25,}/gi},
 {id:'EMAIL_ADDRESS',re:/\b[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}\b/gi},
 {id:'PASSWORD_ASSIGNMENT',re:/\b(?:password|passwd|secret|api_key|access_token)\s*[:=]\s*["']?[^\s"',}]{8,}/gi}
];
export function auditPublicWorkspace(workspace){
 const problems=[],scanned=[];
 const walk=dir=>{
  for(const name of fs.readdirSync(dir)){
   const file=path.join(dir,name);
   const st=fs.lstatSync(file);
   if(st.isSymbolicLink()){problems.push({path:file,kind:'SYMLINK'});continue}
   if(st.isDirectory())walk(file);
   else if(st.isFile()){
    const relative=path.relative(workspace,file).replace(/\\/g,'/');
    scanned.push(relative);
    const body=fs.readFileSync(file,'utf8');
    for(const {id,re} of findings){
     re.lastIndex=0;
     if(re.test(body))problems.push({path:relative,kind:id});
    }
   }
  }
 };
 walk(workspace);
 return {safe:problems.length===0,files_scanned:scanned.length,problems,
  warning:'Pattern scan cannot establish that free-form chat data is safe. Explicit review or verified private archive is still necessary.'};
}
