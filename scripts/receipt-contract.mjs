// READ markers are inbox bookmarks, not task statuses, approvals or QA evidence.
// Historical receipt fields are optional and ignored for read/unread.
export function receiptShapeErrors(record,roundId) {
  if(!record||typeof record!=='object'||Array.isArray(record))return ['read marker must be object'];
  const errors=[];
  if(record.round_id!==roundId||typeof record.message_id!=='string'||
     !record.message_id.startsWith(roundId+'-M')||
     !/^\d{6}$/.test(record.message_id.slice((roundId+'-M').length)))
    errors.push('read marker round/message mismatch');
  if(typeof record.recipient_appointment_id!=='string'||
     !/^[A-Z0-9]+(?:-[A-Z0-9]+)*$/.test(record.recipient_appointment_id))
    errors.push('read marker recipient missing');
  if(typeof record.read_at!=='string'||!/^\d{4}-\d\d-\d\dT/.test(record.read_at)||
     Number.isNaN(Date.parse(record.read_at)))errors.push('read marker timestamp missing');
  return errors;
}
export function isMessageRead(record,message,appointmentId) {
  return receiptShapeErrors(record,message.round_id).length===0 &&
    record.message_id===message.message_id &&
    record.recipient_appointment_id===appointmentId &&
    (record.recipient_role==null||record.recipient_role===message.to_role) &&
    message.to_appointment_id===appointmentId;
}
