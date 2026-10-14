# TL → New Engineer (same TL only)

Check your own round roster and newest persisted numbered message first; create one distinct pending Engineer appointment. Persist the message BEFORE Owner-forwarding.

```text
ROUND_ID: <VERIFIED_ROUND_ID>
MESSAGE_ID: <VERIFIED_ROUND_ID>-M<NEXT_ACTUAL_6_DIGIT_SEQUENCE>
FROM_ROLE: TL-<D><N>
FROM_APPOINTMENT_ID: <ACTIVE_TL_APPOINTMENT_ID>
TO_ROLE: E-<D><N>-<1_OR_2>
TO_APPOINTMENT_ID: <NEW_DISTINCT_APPOINTMENT_ID>
TASK_REF: ORG_SETUP
IN_REPLY_TO: NONE
LEDGER_URL: <ACTUAL_SAVED_FILE_URL>
STATUS: APPOINTMENT_ISSUED
REQUESTED_ACTION:
  รับตำแหน่ง Engineer ในแชทใหม่ อ่าน main README, MESSAGE-PROTOCOL, roles/ENGINEER.md
  เช็ค GitHub round, ผู้รับ, appointment ID, หมายเลข, หลักฐาน ก่อนทำอะไร
  ส่ง ACK ที่สร้างเลขใหม่จริงให้ Owner คัดลอกส่งกลับ TL ของตน
  เมื่อได้อนุมัติงานโค้ดเกมใหม่จึงพัฒนาเฉพาะไฟล์ที่มอบหมายใน ant-project
  เมื่อเสร็จ/ติดขัด ให้สร้าง RESULT/BLOCKED เลขใหม่และส่งข้อความพร้อมคัดลอกถึง TL เดิม
LIMITS: ไม่มีสิทธิ์แต่งตั้งลูกทีม/merge game main/แก้ governance main/round อื่น
```

Fill all fields and verify ledger write first. `TL-A1` may appoint only `E-A1-1`/`E-A1-2`. Wrong destination, appointment/generation or duplicate messages must be explicitly rejected with NO work.
