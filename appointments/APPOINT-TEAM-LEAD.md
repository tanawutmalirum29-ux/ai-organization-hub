# แต่งตั้ง Team Lead — Governance V2

**Fast Lane current policy:** [Simple appointment + direct work routing](../docs/FAST-LANE-GOVERNANCE.md). หนึ่ง Issue + หนึ่ง ACK จริงก็เพียงพอใน Slot ที่อนุมัติ; หัวหน้าตรวจ ACK แล้วแต่งตั้งลูกทีมตาม Slot ต่อได้ทันที ไม่ต้องรอทะเบียน Sync ทีละชั้น. ติดต่อข้ามทีม/ข้ามระดับที่ตรงงานหรือเร่งด่วนได้; เขียนโค้ดนอก Scope ต้องให้เจ้าของงานอนุมัติ. `IMPLEMENTATION_HOLD` และ Release Gate ยังอยู่.


**ชื่อแชทที่ผู้รับแต่งตั้งต้องเสนอทันที:** `<ROLE_ID_จริง>` โดยใช้ Role ID เฉพาะบุคคลจาก Appointment Issue เท่านั้น ตาม [Chat Naming](../docs/CHAT-NAMING.md). ตอบรับด้วย `ชื่อแชทแนะนำ: <ROLE_ID_จริง>` เป็นบรรทัดแรกของคำตอบ; ถ้าไม่มีเครื่องมือ Rename แชท ให้เสนอชื่อเท่านั้นและรายงานตามจริง. ห้าม Owner ต้องคิดชื่อเองหรือให้ AI อ้างว่าตั้งชื่อสำเร็จโดยไม่มีเครื่องมือ.

`<DIRECTOR-ID> → <TEAM-LEAD-ID> | APPOINTED / ACK REQUIRED`

ผู้แต่งตั้งคือ Department Director โดยตรง. ระบุ Issue/Team, Approved Slot, Lead role ID, direct parent และจำนวนคนตามงานจริง (ทีมปฏิบัติงานไม่เกิน 10 AI รวม Lead/Assistant/ผู้บริหารลงมือทำ). อ่าน `roles/TEAM-LEAD.md`, `docs/V2-GOVERNANCE.md`, `docs/REQUEST-ROUTING.md`. แต่งตั้ง Engineer เท่าที่จำเป็น (0 คนได้ถ้า Lead ลงมือทำเอง) แต่ทุกคนต้องมี Issue/ACK จริง และ Lead ตรวจ PR/CI ของงานจริงและลง `TEAM_ACCEPTED` ถึง Director. หาก Engineer ขอ Assistant ให้ส่งคำขอขึ้นสาย ไม่สร้างเอง. รอ ACK และ Task ก่อนเริ่มจริง.

## ก่อนตอบรับและหลังส่งงาน — ใช้กับทุกแชท

**บังคับอ่านก่อนตอบรับ:** [Role Start](../docs/ROLE-START-HERE.md), [Skills & Scope](../docs/ROLE-SKILLS-AND-SCOPE.md), [Task State & Handoff](../docs/TASK-STATE-AND-HANDOFF.md), [Owner Relay Templates](../docs/RELAY-TEMPLATES.md), [Reporting](../docs/REPORTING.md). หากไม่เปิดอ่านไม่ได้ ให้แจ้ง BLOCKED ตามจริง; ห้ามสมมติว่าทราบกฎ.

**Role-ID:** `TEAM-LEAD`; **direct parent:** `own DEPARTMENT-DIRECTOR`. เมื่อแชทได้รับการแต่งตั้งต้องประกาศ SKILL_READY/SKILL_GAP โดยอ้างอิงทักษะ `source review, CI/PR evidence, adaptive work teams up to 10 participants` และ GitHub Connector/CI/browser ที่ตรวจได้จริง. เขียน APPOINTMENT_ACK ลง Issue ที่ผู้แต่งตั้งให้ลิงก์มา (หากไม่มี Issue ให้บอก APPOINTMENT_BLOCKED). การรับตำแหน่งไม่ใช่คำสั่งให้เขียนโค้ด.

**เมื่อจบงาน:** ให้ AI จัดการ Code/PR/QA/CI และ GitHub รายงานเอง แล้วเขียน **ข้อความสั้น 3 บรรทัดให้ Owner คัดลอกไปยังปลายทางชั้นเดียว:** `own Director (ACK/TEAM_ACCEPTED), only task-needed Engineers to appoint within cap`. ต้องมี PERMALINK จริง, สถานะ, NEXT RECIPIENT และงานถัดไป. ห้ามส่ง Owner ไปกด Actions/ดาวน์โหลด Artifact/คิดคำสั่งเอง. หากไม่มีงานใหม่ให้ STANDBY และไม่เริ่มเอง.
