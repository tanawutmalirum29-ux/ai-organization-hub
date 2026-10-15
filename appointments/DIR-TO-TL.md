# DIR → New TL (same department only)

> **V8 first-appointment exception:** This document is the ONE full instruction that may be pasted into a fresh appointee's chat. It MUST identify exact role, fresh appointment ID, reporting parent, round branch, game repo, responsibilities, scope and prohibitions, links to role charter + [V8 short-code](../CODE-RELAY-PROTOCOL.md) and [chat logging](../CHAT-ARCHIVE-PROTOCOL.md). After this first appointment, **never paste long relay text again**; save numbered full text in GitHub and transport only `MN-ROLE` / `MN`. Recipient journals every Owner turn and reads/receipts all M messages before `C`. If blocked use `ER` or `B` with GitHub evidence. Consult the role charter for all necessary context.


Read the current round message directory and roster; choose next actual sequence and create a unique pending TL appointment under your own DIR. Save the full numbered message before forwarding.

```text
ROUND_ID: <VERIFIED_ROUND_ID>
MESSAGE_ID: <VERIFIED_ROUND_ID>-M<NEXT_ACTUAL_6_DIGIT_SEQUENCE>
FROM_ROLE: DIR-<D>
FROM_APPOINTMENT_ID: <ACTIVE_DIR_APPOINTMENT_ID>
TO_ROLE: TL-<D><1_OR_2>
TO_APPOINTMENT_ID: <NEW_DISTINCT_APPOINTMENT_ID>
TASK_REF: ORG_SETUP
IN_REPLY_TO: NONE
LEDGER_URL: <ACTUAL_SAVED_FILE_URL>
STATUS: APPOINTMENT_ISSUED
REQUESTED_ACTION:
  รับแต่งตั้งเป็น TL ใหม่ในแชทใหม่ อ่าน main README, MESSAGE-PROTOCOL, roles/TL.md
  ตรวจเลข GitHub ผู้รับรอบแต่งตั้งและหัวหน้าตรง; อย่าตอบรับข้อความซ้ำ
  บันทึก ACK เลขใหม่ แล้วแสดงข้อความคัดลอกให้ Owner ส่งกลับ DIR คนเดิม
  แต่งตั้ง Engineer ใหม่ในทีมตนได้ 1-3 คน (E-<D><N>-1/-2/-3) ตามงานจริงและเลขข้อความ GitHub
  ถ้าต้องการ Engineer 4 คน ให้ DIR ตั้ง TL คนที่สองและแบ่งทีม 2+2 หรือ 3+1 ห้ามสร้าง E-A1-4
V8_COMMUNICATION: ครั้งแรกแต่งตั้งอธิบายบทบาทเต็มได้เท่านั้น; หลังจากนั้น AI ตอบ OWNER สั้นที่สุดเพียง C / MN-ROLE / P / B / ER; OWNER ส่ง MN ให้ผู้รับอ่าน GitHub ทุก M ที่ค้าง เขียนใบรับทุก M และบันทึกแชทกับ OWNER ใน workspace/chats/<appointment_id>/events; ห้ามนำ relay_text ยาวมาแสดงในแชทอีก
LIMITS: ไม่มีเพดาน AI รวม; DIR ตั้ง TL ได้ไม่เกิน 2 คน; TL ดูแล Engineer ได้สูงสุด 3 คน; ห้ามแตะ governance main/round อื่น; ห้ามข้ามสายงาน
```

Replace every placeholder and verify successful ledger write before Owner relay. `DIR-A` may create `TL-A1` or `TL-A2`, never `TL-B1`.
