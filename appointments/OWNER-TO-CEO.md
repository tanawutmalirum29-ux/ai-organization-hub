# แบบแต่งตั้ง AI สำหรับโปรเจกต์

**กฎกลาง:** [RULES.md](../RULES.md) · **คำสั่งย่อ:** [COMMANDS.md](../COMMANDS.md)

สร้าง Issue ใน `PROJECT_REPO` ของงานปัจจุบัน แล้วใช้โครงสร้างต่อไปนี้

```text
APPOINTMENT
PROJECT_REPO: <https://github.com/owner/project>
TASK_ISSUE: #<issue>
FROM_ROLE: OWNER / CEO / COORDINATOR
TO_ROLE: CEO / ENGINEER / REVIEWER / QA / ADVISOR / <custom-role>
OBJECTIVE: <ผลลัพธ์ที่ต้องการ>
SCOPE: <งานและไฟล์ที่อนุญาต>
DELIVERABLE: <ไฟล์, PR, การทดสอบ หรือผลลัพธ์>
STATUS: APPOINTED / START หรือ APPOINTED / HOLD
ACCEPTANCE: <เกณฑ์ตรวจรับเฉพาะโปรเจกต์>
NEXT_ACTION: <ขั้นแรกที่ผู้รับต้องทำ>
# เฉพาะเมื่อสืบทอดงานจากแชทที่ถึงข้อจำกัด
PREDECESSOR_ISSUE: #<เลข Issue เดิม>
HANDOFF_MAIN_SHA: <SHA ของ main ที่ตรวจจริง>
HANDOFF_CI: <ผล CI ที่ตรง SHA หรือ NOT_VERIFIED>
OPEN_WORK: <Issue/PR และงาน/ข้อจำกัดที่ HOLD ที่ยังต้องทำ>
SESSION_ACTIVATION: AWAITING_OWNER_RELAY / ACTIVE_IN_THIS_CHAT
```

**ส่งเข้าแชทผู้รับครั้งแรก:** `ROLE: AP-ROLE #<issue> <issue-url>`  
**ให้แชทเดิมทำต่อ:** `ROLE: MN #<issue> <issue-url>`

ผู้รับเปิด Issue และกฎล่าสุดด้วยตนเองก่อนทำงาน; แต่งตั้งแล้วไม่ได้อนุญาตให้เริ่มทันทีหากยังมี HOLD. ผู้แต่งตั้งและผู้รับต้องตรวจข้อจำกัดของโปรเจกต์และขอบเขตจริง โดยไม่สร้างงานนอกคำสั่ง

**เมื่อเสร็จภารกิจ:** ตรวจส่งมอบบน `PROJECT_REPO/main`, ดำเนินการ `PF` ตาม RULES.md §6, ยุบทีมชั่วคราว และตรวจว่าไม่มีสิ่งตกค้างที่ต้องจัดการ. คำตอบปกติถึง OWNER ใช้ `C` หรือบรรทัดส่งต่อที่จำเป็นเท่านั้น; กรณี `ST`, `I` หรือเกิด `ER` ให้ตอบตามข้อเท็จจริง
