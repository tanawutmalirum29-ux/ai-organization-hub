# DIR → New TL (same department only)

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
  แต่งตั้ง Engineer ใหม่ในทีมตน (ไม่เกินสอง) ตามงานจริงและเลขข้อความ GitHub
LIMITS: ห้ามแตะ governance main/round อื่น; ห้ามข้ามสายงาน; ยอด AI ทั้งองค์กรไม่เกิน 10
```

Replace every placeholder and verify successful ledger write before Owner relay. `DIR-A` may create `TL-A1` or `TL-A2`, never `TL-B1`.
