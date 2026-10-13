# มาตรฐานรายงาน GitHub-first และข้อความส่งต่อ

## หลักฐานจริงเก็บที่ไหน
- **งานพัฒนาและรายงานเต็ม**: `ant-project` GitHub Issue ของบทบาท/งานนั้น และ Draft PR ใน `ant-project`
- **กฎถาวรและคำสั่งแต่งตั้งแบบกลาง**: `appointment-CEO`
- ไม่ต้องสร้าง `docs/ai-reports/*` จำนวนมากในเกมโดยไม่จำเป็น; GitHub comments เป็นบันทึกความคืบหน้า
- ทุกการเปลี่ยนสถานะสำคัญบันทึกไว้ที่ Github เพื่อให้ CEO/Director ตัวใหม่อ่านต่อได้โดยไม่ต้องใช้แชทเก่า

## Owner Zero-Click และการส่งต่อ
- Owner เป็นผู้กำหนดทิศทางและคัดลอกเฉพาะข้อความ AI-to-AI ไม่เกินสามบรรทัด ไม่รับงาน Run workflow, checkout, terminal, ZIP, screenshots หรือ Artifact transfer
- Engineer/Lead/Director ต้องเปิดอ่านผล CI, Logs, Screenshots, Artifacts และสร้าง/ซ่อม auto-trigger ตามสิทธิ์ที่ CEO อนุมัติด้วยตนเอง
- หาก CI ทำงานไม่ได้ ต้องบันทึกสาเหตุและสถานะ `NOT_VERIFIED` ใน GitHub แล้วส่ง Blocker ไปยังผู้บังคับบัญชาที่รับผิดชอบ ไม่มอบงานเทคนิคให้ Owner
- ดูนโยบายที่บังคับใช้ทุกแผนก: [AUTONOMOUS-QA.md](AUTONOMOUS-QA.md)

## Milestones ใน Issue
`APPOINTED` (รับตำแหน่ง, ยังไม่มีงานจริง) → `STARTED` → `CONTRACT CHECK` → `IMPLEMENTED` → `TESTED` → `READY FOR REVIEW` / `BLOCKED` → `ACCEPTED` / `CHANGES REQUESTED` → `INTEGRATED` → `CLOSED`

## รายงานที่ผู้พัฒนาต้องลง (full GitHub Issue / PR)
- หน้าที่, ชื่องาน/รอบ, ลิงก์ Parent Issue, Recipient
- Branch, HEAD SHA เต็ม, รายชื่อไฟล์เปลี่ยนและบทสรุปทางเทคนิค
- สัญญาข้อมูลที่ใช้ / การไม่เข้ากันและการแก้
- Tests ที่รันจริง + CI link ต่อ HEAD + Screenshots/Logs เท่าที่จำเป็น
- ปัญหาที่ยังเหลือ/ความเสี่ยง/คำขอตัดสินใจ
- ขั้นส่งต่อ `READY FOR TEAM REVIEW` หรือ `BLOCKED` และผู้รับต่อ

## รายงานสรุปตามผู้บังคับบัญชา
- **Team Lead → Department Director:** รายชื่อ 2 workers+PR+SHA, ผลตรวจและการสั่งแก้, Team Integration PR, `TEAM_ACCEPTED`
- **Department Director → Integration Director/CEO:** งานของทุกทีม, ความขัดแย้ง/บั๊กที่แก้, แผน Integration, Test ทั้งแผนก, `DEPARTMENT_ACCEPTED`
- **Integration Director → CEO:** Summary ทุกแผนก, Final Release PR+HEAD, Quality Gate/CI รวม, known risks, `RELEASE_READY`
- **CEO → Owner:** รายงานสั้นว่าทำอะไร สำเร็จ/ติดขัด รวมเข้า main แล้วหรือไม่ พร้อม PR และ SHA

## ข้อความให้ Owner คัดลอกระหว่างแชท — ไม่เกิน 3 บรรทัด
```text
<ROUND> <ROLE-ID> | READY/BLOCKED/CHANGES_REQUESTED | PR #... | CI PASS/FAIL/NOT_VERIFIED | Head abc1234
GitHub report: https://github.com/tanawutmalirum29-ux/ant-project/issues/<n>#issuecomment-<id>
Next recipient: <ชื่อบทบาท/รหัสผู้รับ> | Blocker: none/<สั้น ๆ>
```

ถ้ายังไม่มี PR ให้ใช้ `Issue #...` แทนได้ แต่ต้องมีลิงก์รายงานจริง ห้ามประดิษฐ์ SHA, CI, URL หรืออ้างว่าบุคคลถัดไปได้รับคำสั่งโดยยังไม่ได้ส่ง

## การมอบหมายงานต้องส่งถึงทุกคน
แต่ละคนที่มีหน้าที่จริงต้องได้รับข้อความแต่งตั้งพร้อมลิงก์ของตนเอง ไม่ถือว่าโพสต์คำสั่งของ CEO ครั้งเดียวแล้ว Team Lead/Engineer ในแชทอื่นจะทราบโดยอัตโนมัติ

แสดงข้อความให้ Owner คัดลอกตามลำดับ: CEO → Director / Integrator → Team Lead → Engineer (2 คนต่อ Team Lead). แต่ละชั้นเป็นคนเขียนและส่งคำสั่งที่ลงชื่อถึงผู้ใต้บังคับบัญชาโดยเฉพาะ
