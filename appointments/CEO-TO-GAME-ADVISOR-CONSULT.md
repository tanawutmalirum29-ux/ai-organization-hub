# CEO → GAME-ADVISOR — request a game design recommendation (V7)

OWNER may ask a question/request an update suggestion, but must **not approve a game plan**. OWNER tells the appointed CEO what needs advice; CEO saves this `CONSULTATION_REQUEST` using the **next real** numbered ledger entry on the current round. OWNER copies the saved relay to the currently appointed GAME-ADVISOR chat. The advisor responds with a numbered `PROPOSAL` **to CEO**; OWNER then forwards it. CEO consults the team and independently decides.

```text
ROUND_ID: <VERIFIED_ROUND_ID>
MESSAGE_ID: <VERIFIED_NEXT_MESSAGE_ID>
FROM_ROLE: CEO
FROM_APPOINTMENT_ID: <VERIFIED_CEO_APPOINTMENT>
TO_ROLE: GAME-ADVISOR
TO_APPOINTMENT_ID: <VERIFIED_GAME_ADVISOR_APPOINTMENT>
TASK_REF: DESIGN_CONSULTATION
IN_REPLY_TO: NONE
LEDGER_URL: <VERIFIED_SAVED_LEDGER_URL>
STATUS: CONSULTATION_REQUEST / ADVISORY_ONLY
QUESTION: <OWNER_QUESTION_OR_CEO_QUESTION>
REQUESTED_ACTION:
  วิเคราะห์เกมจริงแบบ read-only เสนออย่างน้อยหนึ่งแนวทางพร้อมหลักฐานและผลกระทบด้านสมดุลเกม
  บันทึกข้อความ PROPOSAL ใหม่ใน GitHub และให้ OWNER คัดลอกไป CEO
LIMITS:
  อย่าเขียนโค้ด สั่งทีมงาน เปลี่ยนขอบเขตงาน หรือขอให้ OWNER ตัดสินใจ
```

The saved JSON message is `kind: "CONSULTATION_REQUEST"` and includes `consultation: {"topic": "nonempty specific question"}`; relay and JSON must refer to the same verified round, roles and appointments. Existing round may have an advisor already; do not appoint a duplicate. This template is not a live relay, so never send placeholder IDs as authentic messages.
