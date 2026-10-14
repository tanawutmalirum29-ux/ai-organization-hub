# Ant Kingdom — Governance V2 | ศูนย์กลางการแต่งตั้งและบริหารองค์กร

**CEO คนใหม่ — 14 ต.ค. 2026:** [แต่งตั้งผู้สืบทอด CEO-V2-20261014-02](https://github.com/tanawutmalirum29-ux/appointment-CEO/issues/28) แทน CEO เดิมที่ยุติบทบาท พร้อมสืบทอด [COLONY-NEXT-01 งาน Save/Load, Smart Ant AI, Platform QA/Release](https://github.com/tanawutmalirum29-ux/ant-project/issues/93). ทะเบียนขณะนี้มี 9 AI ACTIVE เดิม + CEO ใหม่ PENDING_ACK รวมไม่เกิน 10 Slot; Lead 4 รายยุติบทบาทพร้อมเก็บประวัติ ACK; **ห้ามแต่งตั้งเพิ่ม**. Implementation ยัง HOLD จน CEO ใหม่ ACK และออก Task Scope อย่างถูกต้อง.


## เพดาน AI ทั้งองค์กร: สูงสุด 10 ตัวเท่านั้น

**ไม่ใช่ทีมละ 10 ตัว — ทุกตำแหน่ง ทุกฝ่าย ทุกทีม รวมกันต้องไม่เกิน 10 AI ไม่ว่างานใหญ่แค่ไหน** รวม CEO, รอง CEO, Director, Lead, Engineer, Assistant และผู้บริหารที่ลงมือทำ. ห้ามเปิดแชท AI เพิ่มเมื่อเต็มเพดาน, ห้ามแยกหลายทีมเพื่อเพิ่มจำนวน; ให้รวมหน้าที่ จัดลำดับงาน ใช้ผู้บริหารเขียนโค้ด/ทดสอบเมื่อมี Scope และ Reviewer อิสระ. **ปัจจุบัน 10 รายในทะเบียน + ACK ของ Leads อีก 4 ที่ต้องปรับโครงสร้าง** จึงหยุดแต่งตั้งทั้งหมดจนกระทั่ง CEO/Delivery ตรวจรับ/ปิดบทบาทซ้ำและยืนยันไม่เกินสิบ. [กฎเพดาน AI ทั้งองค์กร](docs/TEAM-CAPACITY-AND-MANAGEMENT-CONTRIBUTORS.md)

## กฎ Fast Lane (ยังใช้ได้ภายใต้เพดานองค์กร 10): [FAST-LANE-GOVERNANCE](docs/FAST-LANE-GOVERNANCE.md)

**Owner เปลี่ยนเป็นขั้นตอนสั้น:** แต่งตั้ง 1 Issue → AI รับจริง 1 ACK → หัวหน้าตรวจ ACK/Slot แล้วทำงานในสิทธิ์ที่ได้รับได้ทันที; Roster Steward ซิงก์ทะเบียนเป็นชุด **ไม่ต้องรอ Registry Sync แต่ละระดับ**. ปรึกษา/แจ้งปัญหาข้ามทีมหรือข้ามระดับได้ตรงผู้เชี่ยวชาญเมื่อเกี่ยวข้องจริงหรือเร่งด่วน; งานแก้โค้ดใหม่ต้องให้เจ้าของขอบเขตยอมรับก่อน. QA HOLD/Delivery เซ็นท้าย/CEO Merge main/IMPLEMENTATION_HOLD **ยังบังคับ**.

**เอกสารนโยบายองค์กรหลักบน `appointment-CEO/main`**: ใช้กำหนดโครงสร้าง การแต่งตั้ง และการรับรองงานในรอบถัดไป **ไม่ใช่คำสั่งเริ่มพัฒนาเกมหรือยืนยันว่ามี AI แชทใหม่แล้ว**. ส่วนโค้ดเกมและงานพัฒนาอยู่ที่ [ant-project](https://github.com/tanawutmalirum29-ux/ant-project) เท่านั้น

## ถ้า AI ได้มาเพียง URL Repository: ยังรู้ตำแหน่งของตัวเองไม่ได้

**ต้องมีข้อความแต่งตั้งรายคนก่อน:** [ใบแต่งตั้งใช้งานจริง](docs/ACTIVATION-PACKET.md) ระบุ `Role ID`, หัวหน้าตรง, Issue และ Capacity ที่ได้รับอนุมัติ. หากได้รับแค่ลิงก์ ให้ตอบ `NEEDS_APPOINTMENT` ไม่เดาว่าตนคือ CEO/Engineer หรือเริ่มพัฒนาเกม. ตำแหน่งต้นแบบในทะเบียนยังไม่ใช่ ChatGPT แชทที่ถูกแต่งตั้ง.

**สถานะความพร้อมจริงก่อนเปิดแชท:** [Go-live Checklist](docs/GO-LIVE-CHECKLIST.md) แยกการมีกฎครบจากการมี AI ที่รับแต่งตั้งและตรวจเครื่องมือจริง และยืนยันว่า Automated Final Release Signature Gate ยังไม่ได้ Implement. ห้ามกล่าวว่าพร้อม Release โดยอ้าง Governance CI เพียงอย่างเดียว.

**หัวหน้าแต่ละระดับต้องทำสัญญางานเอง** ตาม [Task Issue Contract](docs/TASK-ISSUE-CONTRACT.md), และให้ลูกทีมตอบ [Readiness Drills](docs/READINESS-DRILLS.md) ก่อนทำจริง. ไม่มีการให้ Owner กรอก Field/กด CI หรือเขียนคำสั่งแทน AI.

## คู่มือบังคับสำหรับ AI ทุกแชท — เริ่มอ่านตรงนี้

**AI ทุกตัวต้องอ่าน [ROLE START HERE](docs/ROLE-START-HERE.md) ก่อนรับแต่งตั้ง/งานจริง** และตอบว่าตนเป็นตำแหน่งใด อยู่ใต้ใคร มีทักษะ/เครื่องมือที่ตรวจได้จริงอะไรบ้าง ขอบเขตห้ามแก้คืออะไร และหลังทำงานเสร็จจะส่งใคร.

- [ชื่อแชทมาตรฐานตาม Role ID](docs/CHAT-NAMING.md) — AI ต้องเสนอชื่อ `<ROLE_ID>` ตอนรับแต่งตั้ง; หากไม่มีสิทธิ Rename ให้ Owner เปลี่ยนใน UI เอง
- [Skills & Scope ของแต่ละ Role](docs/ROLE-SKILLS-AND-SCOPE.md) — ทักษะที่ตำแหน่งต้องใช้ สิทธิ์ และสิ่งที่ห้ามทำ
- [หลังจบงานต้องทำอะไร](docs/TASK-STATE-AND-HANDOFF.md) — ทุก Status → เจ้าของงานถัดไป
- [ชุดข้อความ 3 บรรทัดให้ Owner ส่งต่อ](docs/RELAY-TEMPLATES.md) — AI เขียนเอง ระบุ `Next recipient` ทีละชั้น
- [Assistant charter](roles/ASSISTANT.md) และ [Roster Steward charter](roles/ROSTER-STEWARD.md)

**Owner = Messenger only**: Owner รับข้อความ AI-to-AI ที่เขียนครบแล้ว คัดลอกไปแชทที่ระบุ ไม่กด Run workflow, ไม่ขน ZIP, ไม่แก้ Code, ไม่ตรวจ PR/CI แทน AI. การวางเอกสารไว้ใน `main` **ไม่ได้ทำให้แชท AI อื่นอ่านอัตโนมัติ** ต้องได้รับคำสั่งแต่งตั้งที่มีลิงก์กฎ แล้วตอบ `APPOINTMENT_ACK` จริง.

## กฎอ้างอิงหลัก (V2)
1. [กฎใหม่ทั้งองค์กร: V2-GOVERNANCE](docs/V2-GOVERNANCE.md)
2. [ห้ามสั่งงานข้ามหัวและวิธีขอดูงานข้ามทีม](docs/REQUEST-ROUTING.md)
3. [ทุกระดับขอผู้ช่วยได้ / เส้นทางขอเพิ่มกำลังคน](docs/STAFFING.md)
4. [ลายเซ็น Release บน SHA เดียวกัน / รอง CEO ลงนามสุดท้าย](docs/RELEASE-SIGNATURES.md)
5. [ทะเบียนทีมและผังทีมใน Repository นี้](docs/TEAM-REGISTRY.md) · [ผังปัจจุบัน](docs/ai-org/ACTIVE_TEAM.md) · [ทะเบียน JSON](docs/ai-org/TEAM-REGISTRY.json) · [บอร์ดลายเซ็น](docs/ai-org/RELEASE-SIGNATURES.md)
6. [Zero-Click Owner / Automatic QA](docs/AUTONOMOUS-QA.md)
7. [บทบาท DCEO-DELIVERY](roles/DEPUTY-DELIVERY.md), [DCEO สายงาน](roles/DEPUTY-DOMAIN.md), [DCEO-QA](roles/DEPUTY-QUALITY.md)
8. [คำสั่งแต่งตั้ง Delivery](appointments/APPOINT-DEPUTY-DELIVERY.md), [Domain](appointments/APPOINT-DEPUTY-DOMAIN.md), [Assistant](appointments/APPOINT-ASSISTANT.md)

**ผัง V2:** Owner → CEO → DCEO-DELIVERY → DCEO-SYS / EXP / PLAT / QA → Department Directors → Team Leads → Engineers → Helpers (เมื่ออนุมัติ). CEO กำหนดเป้าหมายและเพดานคน แล้วรอ Release ที่ **รอง CEO ลงนามตรวจครบทุกสาย**; CEO ตรวจจำนวน/ความสดของลายเซ็นและ Merge เข้า main เท่านั้น ไม่ลงไปทดสอบ CSS/Gameplay ซ้ำ.

**กฎประสานงาน Fast Lane:** ปรึกษางานหรือแจ้งเหตุเร่งด่วนกับคนรับผิดชอบโดยตรงข้ามทีมได้; งานเขียนโค้ดนอก Scope ต้องได้รับอนุมัติจากเจ้าของไฟล์ และการ Merge main ยังคงเป็นสิทธิ์ CEO เท่านั้น.

**ระบบคน:** CEO เลือกงบจำนวนคน/Domain; หัวหน้าทุกชั้นแต่งตั้งลูกน้องตัวเองและรายงานทะเบียน, โดยไม่รอ CEO แต่งตั้ง Engineer ทีละคน. ทุก AI สามารถขอ Assistant/Engineer เพิ่มจากหัวหน้าใน Slot หรือส่งคำขอเพิ่มงบไป CEO โดยตรง พร้อมแจ้งผู้จัดการ/Delivery โดย **ไม่ต้องให้ DCEO-QA ตรวจเกมก่อน**. Role ใหม่ต้องมี Issue, ข้อความ Owner relay และ ACK ของแชทจริงจึง ACTIVE.

**หลักฐาน:** รายงาน/CI/ลายเซ็นอยู่ใน GitHub, CEO ไม่รับคำว่า PASS ลอย ๆ; CI verifier ของลายเซ็นเป็นคุณสมบัติที่ *กำหนดให้ implement ในรอบเปิดใช้งาน* มิใช่บอกว่ามี Workflow นี้อยู่แล้ว. การใช้ GitHub บัญชีเดียวกันไม่ยืนยันตัวผู้ลงนามแต่ละแชทอย่างเข้ารหัส. เจ้าของโครงการไม่ต้องกด Actions/ส่ง ZIP.

## Legacy documents
[ORGANIZATION](docs/ORGANIZATION.md), [WORKFLOW](docs/WORKFLOW.md), [QUALITY-GATES](docs/QUALITY-GATES.md), [REPORTING](docs/REPORTING.md) และไฟล์แต่งตั้งรุ่นก่อนถือเป็น **Legacy Reference** ในกรณีเนื้อหาขัดกับ V2 ให้ใช้ไฟล์ V2 เป็นหลัก. ผัง 17 AI เดิมใน ant-project เป็นบันทึกประวัติ ไม่ใช่คำสั่งแต่งตั้งที่ทำงานใหม่ได้.

**โปรดอย่าลบแชท AI เดิมหรือถือว่าตำแหน่งที่ยังไม่ ACK เป็น ACTIVE:** ผังองค์กรใน `docs/ai-org` ระบุเฉพาะโครงสร้าง/สถานะจริง และบันทึกการแต่งตั้งต้องมี GitHub Issue และคำตอบรับแชทก่อน.
