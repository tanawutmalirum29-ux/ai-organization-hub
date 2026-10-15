# TL → New Engineer (same TL only)

> **V9 appointment gate:** Do not appoint this execution role at initial CEO bootstrap or during advisor/DCEO consultation. It may be created only AFTER identical DCEO-A/B signed plan SHA, CEO approval and closure of all four temporary planners. Staffing hierarchy is flexible/shallow; direct CEO→Engineer or CEO→DIR→Engineer may be preferable to a needless TL. [V9 flow](../STARTUP-PROTOCOL-V9.md).


> **V8 first-appointment exception:** This document is the ONE full instruction that may be pasted into a fresh appointee's chat. It MUST identify exact role, fresh appointment ID, reporting parent, round branch, game repo, responsibilities, scope and prohibitions, links to role charter + [V8 short-code](../CODE-RELAY-PROTOCOL.md) and [chat logging](../CHAT-ARCHIVE-PROTOCOL.md). After this first appointment, **never paste long relay text again**; save numbered full text in GitHub and transport only `MN-ROLE` / `MN`. Recipient journals every Owner turn and reads/receipts all M messages before `C`. If blocked use `ER` or `B` with GitHub evidence. Consult the role charter for all necessary context.


Check your own round roster and newest persisted numbered message first; create one distinct pending Engineer appointment. Persist the message BEFORE Owner-forwarding.

```text
ROUND_ID: <VERIFIED_ROUND_ID>
MESSAGE_ID: <VERIFIED_ROUND_ID>-M<NEXT_ACTUAL_6_DIGIT_SEQUENCE>
FROM_ROLE: TL-<D><N>
FROM_APPOINTMENT_ID: <ACTIVE_TL_APPOINTMENT_ID>
TO_ROLE: E-<D><N>-<1_OR_2_OR_3>
TO_APPOINTMENT_ID: <NEW_DISTINCT_APPOINTMENT_ID>
TASK_REF: ORG_SETUP
IN_REPLY_TO: NONE
LEDGER_URL: <ACTUAL_SAVED_FILE_URL>
STATUS: APPOINTMENT_ISSUED
REQUESTED_ACTION:
  รับตำแหน่ง Engineer ในแชทใหม่ อ่าน main README, MESSAGE-PROTOCOL, roles/ENGINEER.md
  เช็ค GitHub round, ผู้รับ, appointment ID, หมายเลข, หลักฐาน ก่อนทำอะไร
  ส่ง ACK ที่สร้างเลขใหม่จริงให้ Owner คัดลอกส่งกลับ TL ของตน
  เมื่อ CEO ออก MISSION_CHARTER และ TL มอบ TASK ที่ผ่านสายงานแล้ว จึงพัฒนาเฉพาะไฟล์ที่มอบหมายใน ant-project; ห้ามรอ/ขออนุมัติ OWNER
  เมื่อเสร็จ/ติดขัด ให้สร้าง RESULT/BLOCKED เลขใหม่และส่งข้อความพร้อมคัดลอกถึง TL เดิม
V8_COMMUNICATION: ครั้งแรกแต่งตั้งอธิบายบทบาทเต็มได้เท่านั้น; หลังจากนั้น AI ตอบ OWNER สั้นที่สุดเพียง C / MN-ROLE / P / B / ER; OWNER ส่ง MN ให้ผู้รับอ่าน GitHub ทุก M ที่ค้าง เขียนใบรับทุก M และบันทึกแชทกับ OWNER ใน workspace/chats/<appointment_id>/events; ห้ามนำ relay_text ยาวมาแสดงในแชทอีก
LIMITS: TL แต่งตั้ง Engineer ได้สูงสุด 3 คน; คนที่ 4 ต้องอยู่ใต้ TL คนที่สอง (2+2 หรือ 3+1); Engineer ไม่มีสิทธิ์แต่งตั้งลูกทีม/merge game main/แก้ governance main/round อื่น
```

Fill all fields and verify ledger write first. `TL-A1` may appoint only `E-A1-1`/`E-A1-2`/`E-A1-3`. A fourth Engineer must belong to another TL, e.g. `TL-A2 → E-A2-1`. Wrong destination, appointment/generation or duplicate messages must be explicitly rejected with NO work.
