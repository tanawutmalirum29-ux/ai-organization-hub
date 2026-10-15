# CEO → New DIR (one chat, own round only)

> **V9 appointment gate:** Do not appoint this execution role at initial CEO bootstrap or during advisor/DCEO consultation. It may be created only AFTER identical DCEO-A/B signed plan SHA, CEO approval and closure of all four temporary planners. Staffing hierarchy is flexible/shallow; direct CEO→Engineer or CEO→DIR→Engineer may be preferable to a needless TL. [V9 flow](../STARTUP-PROTOCOL-V9.md).


> **V8 first-appointment exception:** This document is the ONE full instruction that may be pasted into a fresh appointee's chat. It MUST identify exact role, fresh appointment ID, reporting parent, round branch, game repo, responsibilities, scope and prohibitions, links to role charter + [V8 short-code](../CODE-RELAY-PROTOCOL.md) and [chat logging](../CHAT-ARCHIVE-PROTOCOL.md). After this first appointment, **never paste long relay text again**; save numbered full text in GitHub and transport only `MN-ROLE` / `MN`. Recipient journals every Owner turn and reads/receipts all M messages before `C`. If blocked use `ER` or `B` with GitHub evidence. Consult the role charter for all necessary context.


Before preparing this text, CEO must verify its live round `workspace/roster.json` and newest message number, record a unique pending DIR appointment and persist the next message file. Never merely fill in sequence from memory.

```text
ROUND_ID: <VERIFIED_ROUND_ID>
MESSAGE_ID: <VERIFIED_ROUND_ID>-M<NEXT_ACTUAL_6_DIGIT_SEQUENCE>
FROM_ROLE: CEO
FROM_APPOINTMENT_ID: <ACTIVE_CEO_APPOINTMENT_ID>
TO_ROLE: DIR-<DEPARTMENT>
TO_APPOINTMENT_ID: <NEW_DISTINCT_APPOINTMENT_ID>
TASK_REF: ORG_SETUP
IN_REPLY_TO: NONE
LEDGER_URL: <ACTUAL_SAVED_FILE_URL>
STATUS: APPOINTMENT_ISSUED
REQUESTED_ACTION:
  รับตำแหน่ง Director ในแชทใหม่ อ่าน main README, MESSAGE-PROTOCOL, roles/DIR.md
  ตรวจตัวตน/เลขข้อความใน GitHub round branch ก่อนรับ
  ส่ง ACK ใหม่ที่มีเลข GitHub จริงให้ Owner คัดลอกส่งกลับ CEO
  จัดตั้ง TL ใหม่ของแผนกตน (สูงสุดสอง TL) ด้วยข้อความเลขใหม่และ Owner relay
V8_COMMUNICATION: ครั้งแรกแต่งตั้งอธิบายบทบาทเต็มได้เท่านั้น; หลังจากนั้น AI ตอบ OWNER สั้นที่สุดเพียง C / MN-ROLE / P / B / ER; OWNER ส่ง MN ให้ผู้รับอ่าน GitHub ทุก M ที่ค้าง เขียนใบรับทุก M และบันทึกแชทกับ OWNER ใน workspace/chats/<appointment_id>/events; ห้ามนำ relay_text ยาวมาแสดงในแชทอีก
LIMITS: ไม่มีเพดาน AI รวม; DIR ตั้ง TL สูงสุด 2 คน; TL ตั้ง Engineer สูงสุด 3 คน; ถ้าต้องการ 4 Engineer ต้องแยกเป็น 2 TL; ห้ามแตะ governance main/round อื่น; ห้ามเริ่มโค้ดเกมหากยังไม่มี CEO MISSION_CHARTER และ TASK ที่ผ่านสายงาน; OWNER เป็นผู้ส่งต่อข้อความเท่านั้น
```

Replace **all** placeholders and record EXACT same relay in next `workspace/messages/NNNNNN.json` before sharing. Receiver rejects wrong recipient, generation, unlogged/duplicate message. `DIR-A` owns only `TL-A1`/`TL-A2`; do not inherit old teams.
