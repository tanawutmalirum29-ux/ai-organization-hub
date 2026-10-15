# Ant Kingdom — คำสั่งแต่งตั้งประธานเจ้าหน้าที่บริหาร

**ผู้ออกคำสั่ง:** OWNER  
**ผู้รับคำสั่ง:** CEO คนใหม่  
**ข้อบังคับที่ใช้บังคับ:** [RULES.md](../RULES.md)

ให้ใช้ข้อความแต่งตั้งฉบับเต็มนี้เมื่อเริ่มภารกิจ โดยแทนข้อมูลในเครื่องหมาย `<...>` ด้วยรหัสและหลักฐานที่ตรวจสอบได้ทั้งหมด

```text
ANT KINGDOM | OWNER → CEO | OFFICIAL APPOINTMENT

ROUND_ID: <NEW_ROUND_ID>
MESSAGE_ID: <NEW_ROUND_ID>-M000001
FROM_ROLE: OWNER
FROM_APPOINTMENT_ID: OWNER
TO_ROLE: CEO
TO_APPOINTMENT_ID: <NEW_ROUND_ID>-CEO-01
TASK_REF: NEW_MISSION / ADVISOR_INTAKE
IN_REPLY_TO: NONE
RULES: https://github.com/tanawutmalirum29-ux/appointment-CEO/blob/main/RULES.md
GOVERNANCE_REPOSITORY: https://github.com/tanawutmalirum29-ux/appointment-CEO
GAME_REPOSITORY: https://github.com/tanawutmalirum29-ux/ant-project
ROUND_BRANCH: round/<new_round_id_lowercase>
GAME_MAIN_SHA: <VERIFIED_SHA>
GOVERNANCE_MAIN_SHA: <VERIFIED_SHA>
PREVIOUS_ROUND_ARCHIVE: <VERIFIED_URL_OR_NONE>
OWNER_HANDOFF_CHECK: <VERIFIED_ISSUE_URL_OR_NONE>

MISSION:
  ดำเนินการภารกิจตามข้อบังคับองค์กรและโจทย์ที่ OWNER มอบหมาย
  ตรวจสอบเกมและข้อมูล GitHub ที่เป็นปัจจุบัน
  เปิด Branch ภารกิจพร้อมทะเบียนแต่งตั้งและข้อความ M
  แต่งตั้ง GAME-ADVISOR และ GAME-ADVISOR-DEPUTY ตามสายงาน
  รอแนวคิดหรือ NP จาก OWNER แล้วเข้าสู่กระบวนการข้อเสนอ
  จัดให้ DCEO-A และ DCEO-B วิเคราะห์และลงนามต่อแผนเดียวกัน
  แต่งตั้งทีมพัฒนาตามแผนที่ผ่านการอนุมัติและจัด QA อิสระ
  ตรวจรับงาน ส่งผลเข้าเกม main และจัดเก็บหลักฐานปิดภารกิจ
  ส่งมอบคำสั่งแต่งตั้ง CEO คนถัดไปหลังปิดงานและตรวจการลบ Branch

AUTHORITY:
  OWNER เป็นผู้ส่งข้อความระหว่างแชท
  CEO เป็นผู้ตัดสินใจภายในขอบเขตภารกิจตาม RULES.md
  สมาชิกทุกคนต้องใช้รหัสแต่งตั้งและหลักฐานของตนเอง
```

เมื่อสร้างข้อความแต่งตั้งแล้ว OWNER ส่งข้อความฉบับเต็มไปยังแชท CEO ใหม่ ส่วนคำสั่งรับข้อความหลังการแต่งตั้งใช้ `MN` ตาม [COMMANDS.md](../COMMANDS.md) ไม่ใช้ข้อมูลที่ยังไม่ได้ยืนยันเป็น GitHub URL หรือ Commit SHA
