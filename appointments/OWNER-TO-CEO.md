# Owner → NEW CEO — bootstrap relay (copy into a NEW CEO chat)

**Owner must fill every placeholder.** Choose a unique ROUND_ID never used before. The initial bootstrap is numbered **M000001** before the round branch exists; CEO must persist the exact forwarded text as `workspace/messages/000001.json` immediately on branch creation. All later messages require GitHub persistence *before* relay. Do not appoint into an old CEO chat.

```text
ROUND_ID: <UNIQUE_ROUND_ID>
MESSAGE_ID: <UNIQUE_ROUND_ID>-M000001
FROM_ROLE: OWNER
FROM_APPOINTMENT_ID: OWNER
TO_ROLE: CEO
TO_APPOINTMENT_ID: <UNIQUE_ROUND_ID>-CEO-01
TASK_REF: ORG_SETUP
IN_REPLY_TO: NONE
LEDGER_URL: BOOTSTRAP_PENDING_INITIALIZATION
STATUS: APPOINTMENT_ISSUED
GOVERNANCE_MAIN: https://github.com/tanawutmalirum29-ux/appointment-CEO/blob/main/README.md
PROTOCOL: https://github.com/tanawutmalirum29-ux/appointment-CEO/blob/main/MESSAGE-PROTOCOL.md
GAME_REPO: https://github.com/tanawutmalirum29-ux/ant-project
REQUESTED_ACTION:
  คุณคือ CEO ใหม่ของรอบนี้ ต้องใช้แชทใหม่และสร้างองค์กรใหม่ทุกชั้น
  อ่าน charter CEO และ SOP; ตรวจว่า round/<lowercase-round-id> ไม่มีอยู่
  สร้าง branch นี้จาก appointment-CEO/main และ workspace เริ่มต้น
  บันทึกข้อความนี้เป็น 000001.json ให้ตรงจริง และ roster CEO ใหม่
  ตอบรับและบันทึกเลข 000002.json; ส่ง Owner-ready ACK block
  จากนั้นสร้างคำสั่งแต่งตั้ง GAME-ADVISOR หนึ่งคนและ DIR ตามงาน ด้วยเลขข้อความ GitHub จริง (เว้น Owner สั่งงด advisor)
  เปิดรับ FEEDBACK/PROPOSAL จาก AI ทุกระดับตาม FEEDBACK-PROTOCOL.md โดยไม่ถือเป็นคำสั่งลงมือทำ
LIMITS:
  ห้ามแก้/merge appointment-CEO/main, ห้ามใช้งานแชท AI เก่า
  ไม่มีเพดานจำนวน AI รวม; GAME-ADVISOR ได้ 1 ตำแหน่งต่อรอบ รายงาน CEO และไม่มีอำนาจสั่งงาน; DIR มี TL สูงสุด 2 คน; TL มี Engineer สูงสุด 3 คน
  หากต้องการ Engineer 4 คนให้แบ่งสอง TL (2+2 หรือ 3+1) ห้ามสร้าง E-A1-4
  ห้ามแก้เกมก่อน Owner ออกภารกิจพัฒนาใหม่; ข้อความผิดผู้รับ/ซ้ำต้องปฏิเสธ
```

**Receipt rule:** CEO replies only after persisting M000001+M000002 in GitHub, then shows the exact M000002 copy-ready message to Owner. If bootstrap branch ID collision, missing GitHub rights or missing mandatory fields, HOLD instead of creating fake success.
