# CEO → New DIR (one chat, own round only)

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
LIMITS: ไม่มีเพดาน AI รวม; DIR ตั้ง TL สูงสุด 2 คน; TL ตั้ง Engineer สูงสุด 3 คน; ถ้าต้องการ 4 Engineer ต้องแยกเป็น 2 TL; ห้ามแตะ governance main/round อื่น; ห้ามเริ่มโค้ดเกมหากยังไม่มี CEO MISSION_CHARTER และ TASK ที่ผ่านสายงาน; OWNER เป็นผู้ส่งต่อข้อความเท่านั้น
```

Replace **all** placeholders and record EXACT same relay in next `workspace/messages/NNNNNN.json` before sharing. Receiver rejects wrong recipient, generation, unlogged/duplicate message. `DIR-A` owns only `TL-A1`/`TL-A2`; do not inherit old teams.
