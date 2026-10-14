# OWNER → GAME-ADVISOR — direct read-only request for proposals (V7)

The Owner can ask the appointed Game Advisor for design ideas **without seeking or exercising any decision authority**. To obey the append-only relay protocol, Owner first sends the plain question to the active CEO as a recording request only. CEO looks up current `round.json`, roster and last numbered message and records an `OWNER→GAME-ADVISOR` `CONSULTATION_REQUEST` **verbatim**, without altering its scope or pretending to be the decision-maker. OWNER forwards that saved relay to the Advisor chat. Advisor reads the game and answers with a **new numbered `GAME-ADVISOR→CEO PROPOSAL`**, referencing the consultation request. OWNER forwards it to CEO for evaluation. CEO makes the decision after discussing with its AI team.

```text
ROUND_ID: <VERIFIED_ROUND_ID>
MESSAGE_ID: <NEXT_GITHUB_PERSISTED_MESSAGE_ID>
FROM_ROLE: OWNER
FROM_APPOINTMENT_ID: OWNER
TO_ROLE: GAME-ADVISOR
TO_APPOINTMENT_ID: <VERIFIED_ADVISOR_APPOINTMENT_ID>
TASK_REF: GAME_DESIGN_ADVICE
IN_REPLY_TO: NONE
LEDGER_URL: <VERIFIED_GITHUB_LEDGER_URL>
STATUS: CONSULTATION_REQUEST / READ_ONLY / NOT_AN_APPROVAL
QUESTION: <VERBATIM_OWNER_QUESTION>
REQUESTED_ACTION:
  วิเคราะห์เกมจริงและเสนอทางเลือก พร้อมหลักฐาน ประโยชน์ ต้นทุน ความเสี่ยง และผลกระทบด้านความสมดุล
  ตอบกลับแบบ PROPOSAL เลขใหม่ โดย TO_ROLE: CEO ผ่าน OWNER
LIMITS:
  ห้ามถือว่าเป็นคำสั่งพัฒนา ห้ามแก้เกม ห้ามสั่งทีม และห้ามขอให้ OWNER ชี้ขาด
```

Round message JSON: `{"kind":"CONSULTATION_REQUEST","consultation":{"topic":"<VERBATIM_OWNER_QUESTION>"}}` plus the mandatory verified message envelope and copy-ready relay_text. This is a **template**, not a live numbered message. CEO may record the exact Owner message as a coordinator, but may not invent a question or use Owner's name for its own instructions.
