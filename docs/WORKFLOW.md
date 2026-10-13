# SOP — รับงาน แบ่งงาน ตรวจรวมและ Merge

## Phase 0: รับแต่งตั้ง (Standby)
- ผู้แต่งตั้งส่งคำสั่งจาก `appointments/` พร้อมชื่อบทบาท/แผนก/ทีมตามจริง
- ผู้รับแต่งตั้งอ่านเอกสารบทบาทและระเบียบขององค์กร ตอบรับสถานะ `APPOINTED — AWAITING ASSIGNMENT`
- **ไม่สร้าง Issue/Branch/PR หรือแก้โค้ดโดยเพียงรับแต่งตั้ง**; ผู้ใช้ยังไม่ได้สั่งพัฒนา
- ตำแหน่งใดถูกปิดงาน/ถูกแทนที่ ให้ส่งมอบลิงก์เอกสารและสถานะโดยไม่แต่งตั้งตนเองขึ้นรับงานใหม่

## Phase 1: Owner สั่งภารกิจ CEO
1. Owner บอกเป้าหมาย เงื่อนไข หรือเรื่องที่จะพัฒนา
2. CEO ตรวจ `ant-project/main` ล่าสุด (ห้ามสมมติ SHA), ปัญหาค้างและงานที่เกี่ยวข้อง
3. CEO เสนอ **1 งานหลัก/รอบ** หรือจำนวนตาม Owner สั่ง พร้อมแผนก จำนวนทีม และเหตุผลความหนักแต่ละคน
4. เมื่อ Owner อนุมัติ CEO เปิด Parent Issue สัญญาข้อมูล กฎไฟล์ และ Department Issues/branches ใน `ant-project` พร้อมคำสั่งแต่งตั้งคนที่จะใช้จริง
5. CEO **สั่งงานระดับ Director** ไม่ข้ามไปทำโค้ดหรือสั่ง Engineer โดยตรง
6. หัวหน้าใหญ่แผนกกำหนด Team Leads ให้เหมาะกับงานและส่ง CEO ตรวจจำนวน; หัวหน้าแต่ละทีมแบ่งงานให้ Engineers สองคน

## Owner Zero-Click / CI อัตโนมัติทุกแผนก
- ต้องอ่านและปฏิบัติตาม [Autonomous CI/QA Governance](AUTONOMOUS-QA.md) ตั้งแต่การวางแผนแต่ละรอบ
- CEO และ Director ต้องกำหนด AI ผู้รับผิดชอบ workflow, automatic `push`/`pull_request` triggers, fast smoke และ full QA ตามความเสี่ยง **ก่อน** ให้ทีมเริ่มเขียนโค้ด
- Engineer และ Team Lead ต้องตรวจ/แก้ปัญหา CI/Artifacts เอง; Director ตรวจ Full Integration QA; Owner ทำหน้าที่ตัดสินเป้าหมายและส่งต่อข้อความเท่านั้น ห้ามให้ Owner กด Workflow, ส่ง ZIP หรือแก้ปัญหาเทคนิค
- ถ้าไม่มีช่องทางกระตุ้น CI อัตโนมัติในสิทธิ์ที่มี ให้ผู้รับผิดชอบแจ้ง Blocker ตามสายงาน และขออนุมัติขอบเขตแก้ workflow จาก CEO; ห้ามโยนงานเทคนิคให้ Owner

## Phase 2: ออกงานจริง
- ทุกหน่วยงานมี Issue/Task ID, ตัวรับผิดชอบ, ฐาน Git SHA, branch, ขอบเขตไฟล์ที่เขียนได้, interfaces, Acceptance Criteria, ชุดทดสอบ, ผู้รับรายงานและจุดส่งต่อ
- งานคู่ขนานต้องแยกไฟล์หรือออกแบบ contract ก่อน; มีตัวแก้ไฟล์ร่วมเพียงหนึ่งคนในช่วงบูรณาการ
- Workers เขียนเฉพาะไฟล์ใน Task Issue, เปิด **Draft PR**; ห้ามแก้ `main`
- งานนอกรายการให้แจ้ง Lead เป็น blocker, ห้ามแอบแก้

## Phase 3: ตรวจรับระดับทีมและแผนก
- Team Lead ตรวจครบ **ทั้ง 2 Engineers**, Source Diff, Test Logs, SHA/CI และการทำงานร่วมกัน
- หากพบปัญหา ให้ส่ง `CHANGES REQUESTED` พร้อมจุดแก้ที่ตรวจซ้ำได้ไปที่คนรับผิดชอบ แล้วรอ Commit และ CI ใหม่
- เมื่อผ่าน ส่ง `TEAM_ACCEPTED` ไปยัง Department Director โดยหลักฐานเต็มใน GitHub
- Department Director รวบรวมทุกทีม ตรวจการเชื่อมต่อ ทดสอบใน Department Integration Branch (ถ้าต้องใช้), แก้ Conflict ที่ได้รับมอบสิทธิ์, รวมรายงาน และส่ง `DEPARTMENT_ACCEPTED`
- Department Director **ห้ามส่ง CEO ทันทีโดยไม่วิเคราะห์** ผลกระทบต่อเกมส่วนอื่น ประสิทธิภาพ บัญชีทรัพยากร ความเสี่ยงและบั๊กที่ค้าง

## Phase 4: รับรวมข้ามแผนก
- ถ้ามี Integration Director: ผู้รับตำแหน่งรวบรวม Department PRs ลง Branch รวม, จัด Dependency/Conflict และทดสอบจริงบน HEAD เดียวกัน ก่อนส่ง Release Candidate ให้ CEO
- ถ้าไม่มีและมีแผนกเดียว: Department Director เตรียม Integration PR/CI ให้ CEO โดยตรง
- หากมีหลายแผนก ต้องมีผู้รับผิดชอบ Integration เดียวอย่างชัดเจน; CEO เลือก Integration Director หรือแต่งตั้ง Department Director หนึ่งคนเป็น Acting Integration Coordinator **โดยไม่อนุญาตให้ Merge main**
- ไม่ปิดต้นฉบับ PR จนแน่ใจว่าโค้ดนั้นอยู่ใน Final PR; ห้าม Merge ซ้ำ

## Phase 5: CEO Final Gate
- CEO ตรวจ Owner Approval, exact PR HEAD, base `main`, changelist, ไฟล์ที่อนุญาต, ข้อตกลงระบบ, full CI/QA และรายงานลงนามตามสายงาน
- ถ้าไม่ผ่าน → คืนกลับ Director/Integration Director ให้แก้; ไม่เปิดทางลัดผ่านเด็กทีมโดยตรง
- ถ้าผ่านและรอบงานอยู่ในอำนาจอนุมัติของ Owner → **CEO เท่านั้น Merge `ant-project/main`** (ตรวจ SHA ก่อน-หลัง), แจ้งผลผู้ใช้, บันทึกการปิดรอบและปิด PR ต้นทางโดยไม่ Merge ซ้ำ
- ถ้าผู้ใช้กำหนดให้รออนุมัติ Merge ต้องรอก่อนเสมอ

## การหยุดงาน / เปลี่ยน CEO
- ตำแหน่งใหม่ต้องอ่าน Governance Repo, ตรวจ HEAD จริงของ Game Repo และงานเปิดทั้งหมด ไม่รับช่วงด้วยข้อมูลเดา
- Owner สามารถหยุดงาน เปลี่ยนบทบาท หรือกลับแผนได้; CEO ปรับกระบวนการเมื่อได้รับคำสั่ง Owner เท่านั้น
- การเปลี่ยนโครงสร้างหรือตำแหน่งไม่เปลี่ยนไฟล์เกมใน `main` โดยอัตโนมัติ
