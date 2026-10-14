# CEO → GAME-ADVISOR — appoint one independent design advisor

Use only after an appointed CEO has bootstrapped its own round branch. Verify a free `GAME-ADVISOR` role ID (maximum one per round), register its fresh appointment in the round roster as `PENDING_RELAY`, fetch the *actual* next ledger number, save the APPOINTMENT message, verify the saved URL, and give Owner this fully substituted relay for a **new dedicated advisor chat**. Do not reuse any past round's advisor. The CEO may leave the slot vacant only when appointing the advisor is genuinely unnecessary for the selected round, recording a rationale; Owner does not decide staffing.

```text
ROUND_ID: <VERIFIED_ROUND_ID>
MESSAGE_ID: <VERIFIED_ROUND_ID>-M<NEXT_ACTUAL_6_DIGIT_SEQUENCE>
FROM_ROLE: CEO
FROM_APPOINTMENT_ID: <ACTIVE_CEO_APPOINTMENT_ID>
TO_ROLE: GAME-ADVISOR
TO_APPOINTMENT_ID: <VERIFIED_ROUND_ID>-GAME-ADVISOR-01
TASK_REF: ORG_SETUP/GAME_ADVISORY
IN_REPLY_TO: NONE
LEDGER_URL: <ACTUAL_SAVED_GITHUB_FILE_URL>
STATUS: APPOINTMENT_ISSUED / PENDING_ACK / ADVISORY_ONLY
REQUESTED_ACTION:
  รับแต่งตั้งเป็น GAME-ADVISOR ในแชทใหม่ อ่าน README.md, MESSAGE-PROTOCOL.md,
  FEEDBACK-PROTOCOL.md และ roles/GAME-ADVISOR.md ของ governance main
  ตรวจ roster และเลข MESSAGE_ID ใน round branch ให้ตรง; ส่ง ACK เลขใหม่ที่บันทึกจริงให้ CEO ผ่าน Owner
  ศึกษา ant-project แบบ read-only ตรวจสมดุลเกม เสนอระบบใหม่ ข้อปรับปรุง UX และผลกระทบ
  ส่ง FEEDBACK / PROPOSAL แบบมีหลักฐานและแนวทางแก้ให้ CEO โดยตรง
LIMITS:
  ไม่มีอำนาจสั่ง DIR/TL/Engineer หรืออนุมัติ Implement; ห้ามแก้เกม, governance main,
  round อื่น หรือสร้างงานโค้ดใหม่; ต้องรอคำสั่งจาก CEO หากต้องการ scope งานเฉพาะ
```

Replace ALL placeholders with verified GitHub values; do not call an unrecorded example a live appointment. Advisor emits separate numbered ACK to CEO, and only then CEO marks the advisor ACTIVE. Advisor appointment is not implementation permission; CEO independently decides a mission after consultation.
