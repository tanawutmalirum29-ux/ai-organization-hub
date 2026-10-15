// One shared receipt contract: an acknowledgement never implies completion or approval.
export const TRIGGERS=['MN','APPOINTMENT','RC','SYNC'];
export const DISPOSITIONS=['HANDLED','ACTION_STARTED','SUPERSEDED','NO_ACTION','BLOCKED','REJECTED'];
export function receiptShapeErrors(r,roundId) {
  if(!r || typeof r!=='object' || Array.isArray(r)) return ['receipt must be an object'];
  const errors=[];
  if(!TRIGGERS.includes(r.trigger)||!DISPOSITIONS.includes(r.disposition)||
     typeof r.reason!=='string'||!r.reason.trim()||
     typeof r.read_at!=='string'||!/^\d{4}-\d\d-\d\dT/.test(r.read_at)||
     Number.isNaN(Date.parse(r.read_at)))
    errors.push('receipt missing required trigger/disposition/reason/time');
  if(r.evidence_ref!=null &&
    !(typeof r.evidence_ref==='string' &&
      (/^https:\/\/github\.com\/[^/\s]+\/[^/\s]+\/.+/.test(r.evidence_ref) ||
       (typeof roundId==='string' && r.evidence_ref.startsWith(roundId+'-M') &&
        /^[-A-Z0-9]+-M\d{6}$/.test(r.evidence_ref)))))
    errors.push('receipt evidence_ref must be GitHub link or local message ID');
  // Starting is not a final result, so requiring result evidence here deadlocks intake.
  if(r.disposition==='SUPERSEDED' &&
     !(typeof r.evidence_ref==='string' && r.evidence_ref.trim()))
    errors.push('superseded receipt needs explicit evidence_ref');
  return errors;
}
