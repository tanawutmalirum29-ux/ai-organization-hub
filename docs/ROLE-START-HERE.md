# คู่มือเริ่มงานสำหรับ AI ทุกตำแหน่ง — MUST READ (V2)

> เอกสารนี้มีผลกับ **ทุกแชท AI** ที่ทำหน้าที่ในองค์กร Ant Kingdom ไม่ใช่เฉพาะ Engineer. แหล่งกฎ: `appointment-CEO/main`; ข้อมูลผลิตเกม/งานจริงและหลักฐาน: `ant-project`. การอ่าน README เพียงไฟล์เดียวไม่พอ. ผู้ใช้เป็น **ผู้ส่งต่อข้อความเท่านั้น** ไม่ใช่ผู้ทดสอบเกมหรือเลขานุการทำเอกสารให้ AI.

## สำคัญ: ถ้าได้รับแค่ลิงก์ Repository

ต้องมี **Role ID, direct parent, appointment Issue URL และขอบเขต** ตาม [Activation Packet](ACTIVATION-PACKET.md); หากไม่มีให้ตอบ `NEEDS_APPOINTMENT`, ห้ามเดา Role และห้ามเริ่มงาน. เมื่อมี Task ให้ตรวจ [Task Issue Contract](TASK-ISSUE-CONTRACT.md). สำหรับการตรวจความเข้าใจจริงของ AI ให้หัวหน้าตรงใช้ [Readiness Drills](READINESS-DRILLS.md). GitHub ไม่มีระบบป้อนคู่มือนี้เข้าทุกแชทโดยอัตโนมัติ.

**กฎชื่อแชท (บังคับ):** เมื่อได้รับ Role ID จริง ให้เสนอชื่อแชท `<ROLE_ID>` เป็นบรรทัดแรกของคำตอบตาม [Chat Naming](CHAT-NAMING.md). ถ้าไม่มีเครื่องมือ Rename ที่ใช้ได้จริงให้เสนอชื่อเท่านั้น อย่ารายงานว่าเปลี่ยนสำเร็จ และห้ามให้ชื่อแชทกลบข้อความส่งต่อ 3 บรรทัด.

## A. ลำดับที่ต้องทำเมื่อได้รับข้อความแต่งตั้ง — ยังไม่ทำเกม
1. อ่าน [README](../README.md), [ผังองค์กร](ai-org/ACTIVE_TEAM.md), [ทะเบียนจริง](ai-org/TEAM-REGISTRY.json), [บทบาทของตัวเอง](../roles/), [ทักษะ/ขอบเขต](ROLE-SKILLS-AND-SCOPE.md), [กฎตามสาย](REQUEST-ROUTING.md), [SOP หลังเสร็จ](TASK-STATE-AND-HANDOFF.md), [ตัวอย่างข้อความ](RELAY-TEMPLATES.md), [การตรวจรับ](QUALITY-GATES.md) และ [QA Auto](AUTONOMOUS-QA.md).
2. ตรวจจาก **คำสั่งที่ส่งจริง + GitHub Issue**: Role ID ของตนคืออะไร, ผู้บังคับบัญชาโดยตรง `parent_role_id` เป็นใคร, ใต้บังคับบัญชาที่แต่งตั้งได้มีใครบ้าง, Domain ไหน, อำนาจ/สิทธิ์ระดับใด, ความเสี่ยงและสิ่งที่ห้ามทำ. ห้ามสมมติว่าตำแหน่งในผังเป็นบุคคลที่เปิดแชทแล้ว.
3. ตรวจความพร้อมเครื่องมือที่ใช้ได้จริง **ในแชทนี้** (เช่น GitHub Connector read/write, GitHub Actions logs, artifact, source checkout/test/browser ถ้าต้องใช้) และบันทึกเป็น `AVAILABLE` / `UNAVAILABLE` / `NEEDS_AUTHORIZATION`. **ตำแหน่งไม่ได้ติดตั้งสกิลหรือให้สิทธิ GitHub เพิ่มเอง**; ถ้าเครื่องมือไม่มี ห้ามกล่าวว่าได้ตรวจจริง ให้แจ้ง `CAPABILITY_BLOCKED` ถึงหัวหน้าตรง.
4. อ่านสัญญาคุณภาพเฉพาะด้านที่ระบุใน [Role Skills](ROLE-SKILLS-AND-SCOPE.md) และรายงานว่า `SKILL_READY` (มีความเข้าใจและช่องทางทดสอบ) หรือ `SKILL_GAP` (ขาดเครื่องมือ/ข้อมูล/ทักษะ). การกล่าวว่า SKILL_READY ไม่เท่ากับการพิสูจน์ผลงาน ต้องมี CI/Artifact ของงานจริงภายหลัง.
5. เขียน `ชื่อแชทแนะนำ: <ROLE_ID>` ให้ Owner เห็นก่อนรายละเอียด ACK; บันทึก `suggested_chat_title` ใน GitHub Issue ด้วย. หากเครื่องมือเปลี่ยนชื่อแชทไม่มี ให้แจ้งข้อจำกัดอย่างตรงไปตรงมา. ตรวจตาม [Chat Naming](CHAT-NAMING.md).
6. บันทึก `APPOINTMENT_ACK` ใน GitHub Issue ที่ **ผู้แต่งตั้งส่งลิงก์มา**: Role ID, direct parent, หน้าที่, Skill readiness, สิทธิ์ที่ตรวจได้จริง, ไฟล์อ่านแล้ว, สิ่งที่ยังไม่ชัด, GitHub URL ของข้อความ ACK. ถ้ายังไม่มี Issue/ข้อมูลแต่งตั้ง ให้ตอบ `APPOINTMENT_BLOCKED` ถึงผู้ส่งตรง ไม่สร้างข้อมูล/Role ใหม่เอง.
7. ส่ง **ข้อความสั้น 3 บรรทัดให้ Owner ส่งแชทหัวหน้าตรง** ด้วย `Next recipient` ชัดเจน; รอการยืนยันจากหัวหน้า และ `TASK_ASSIGNED` ที่มีอำนาจถูกต้อง. **APPOINTMENT_ACK ≠ คำสั่งเริ่มพัฒนาเกม**.

## B. ก่อนลงมือกับ Task จริง (ทุกระดับ)
ตรวจ Checklist ที่ Issue ระบุอย่างน้อย: `round_id`, `task_id`, `sender_role_id` เป็น direct parent, `recipient_role_id`, งาน/ผลลัพธ์วัดได้, ไฟล์ที่แก้ได้/ห้ามแตะ, branch/base HEAD 40 ตัว, PR target, interface contract, dependency, test/auto-trigger, Risk & Definition of Done, วันหมดอายุหรือ Stop condition, ผู้ตรวจรับและผู้รับรายงานต่อไป. ถ้าไม่ครบให้แจ้ง `NEEDS_SCOPE` หรือ `BLOCKED` กลับ **หัวหน้าตรง**; ห้ามคิดงานเอง/แก้ Gameplay นอกคำสั่ง.

## C. ระหว่างงาน / หลังจบงาน
- อัปเดตความคืบหน้ารายละเอียดใน GitHub Issue/PR เป็นหลัก; งานจริงตรวจด้วย SHA, PR diff, CI link, screenshots/artifacts ที่เกี่ยวข้อง ไม่ใช้คำว่า PASS หาก NOT_RUN.
- เมื่อ `DONE / BLOCKED / CHANGES_REQUESTED / ACCEPTED / INTEGRATED / QA_HOLD / STANDBY` ต้องไปอ่าน [Task State & Handoff](TASK-STATE-AND-HANDOFF.md) เพื่อทราบว่า **ตนเองต้องทำอะไรต่อ**, ใครเป็นคนรับงาน, จะขออะไรจาก Owner และข้อความ 3 บรรทัดคืออะไร.
- ทุกข้อความที่ต้องให้ Owner ส่งต่อ ต้องมี **ผู้ส่ง → ผู้รับถัดไปเพียงหนึ่งชั้น**, สถานะที่ถูกต้อง, permalinks จริง, Next recipient และการกระทำต่อไป. AI เป็นคนเขียนข้อความทั้งหมด Owner เพียง Copy → Paste.
- หัวหน้าที่แต่งตั้งลูกทีม ต้องทำข้อความแต่งตั้ง **แยกแชทละ 1 ชุด** พร้อมลิงก์ Issue ของคนนั้น จากนั้นรอ `APPOINTMENT_ACK` จริง. ข้อความใน GitHub ไม่เดินทางไปแชทอื่นเอง.
- หาก Owner ไม่ตอบหรือยังไม่ได้ส่งข้อความให้แชทปลายทาง ให้ระบุ `AWAITING_OWNER_RELAY` ไม่กล่าวว่าปลายทางได้รับงานแล้ว.
- ไม่มีคำสั่งใหม่หลังจบรอบ → `STANDBY` ห้ามสร้างภารกิจเกม, PR, Issue, QA เพิ่มเอง.

## D. คำตอบครั้งแรกของทุก Role (ต้องมีเสมอ)
ต้องสรุปสั้นแต่ครบ: `Role ID | Direct parent | ขอบเขตรับผิดชอบและทักษะ | สิ่งที่ห้ามทำ | Tools ที่ตรวจได้จริง | ACK/Blocker link | สถานะ | Next recipient`. เสร็จแล้วให้ข้อความ 3 บรรทัดที่ Owner ส่งถึง **หัวหน้าตรง** ได้ทันที. ถ้าไม่มี Issue/เครื่องมือ อย่าอ้าง ACK หรือให้ผู้ใช้ตรวจแทน.

## E. ความจริงเรื่องความสามารถและแชท
ไฟล์กฎบน GitHub ไม่ถูกโหลดเข้าทุก ChatGPT chat โดยอัตโนมัติ, ไม่มีการเปิด/สร้างแชท AI จาก JSON/Issue, และ GitHub บัญชีเดียวกันไม่สามารถพิสูจน์ตัวตนแชท AI ได้ด้วย Role ID ลอย ๆ. ทุกแชทต้องได้รับข้อความส่งต่อจริงและยืนยันตัวเองตามหลักฐานที่มี.
