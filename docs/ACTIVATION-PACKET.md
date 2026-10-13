# ใบแต่งตั้งฉบับใช้งานจริง — Activation Packet V2

**ชื่อแชทตาม Role:** ทุก Issue แต่งตั้งต้องมี `suggested_chat_title: ANT | <ROLE_ID>` และ AI ต้องแสดง `ชื่อแชทแนะนำ: ANT | <ROLE_ID>` ในคำตอบรับครั้งแรก ตาม [Chat Naming](CHAT-NAMING.md). การเสนอชื่อต้องไม่อ้างว่าเปลี่ยนชื่อใน ChatGPT ได้เอง.

**สำคัญ:** การให้ AI แค่ลิงก์ Repository ไม่เพียงพอให้รู้ว่าตนเองเป็นใคร ต้องมี **Role ID + ผู้บังคับบัญชาโดยตรง + Issue แต่งตั้งเฉพาะบุคคล** ในข้อความแรกเสมอ. Template/Slot ใน `TEAM-REGISTRY.json` ไม่ใช่ AI แชทจริง. คนส่งต่อข้อความ (Owner) ไม่ต้องเขียนข้อมูลเหล่านี้เอง: **หัวหน้าที่แต่งตั้ง** เป็นผู้เตรียมจนสมบูรณ์.

## หน้าที่ของหัวหน้าตรงก่อนขอให้ Owner ส่งข้อความ
1. ตรวจ `appointment-CEO/main` ล่าสุด และบัญชี `docs/ai-org/TEAM-REGISTRY.json` ว่าตนมีสิทธิแต่งตั้ง Role นี้จริง มีงบ Slot/Approval และ Role ID ยังไม่ถูกใช้ซ้ำ.
2. สร้าง **GitHub Issue แต่งตั้งเฉพาะ AI 1 คน** ใน `appointment-CEO` ระบุ: `appointment_id`, `role_id`, `parent_role_id`, `appointing_role_id` (ต้องเป็นผู้บังคับบัญชาโดยตรง), `domain`, `capacity_slot_id`, `approval_issue_url`, `charter_url`, `required_skills`, `allowed_permissions`, `prohibited_actions`, `report_to`, `initial_status=PENDING_ACK`, `round_id=STANDBY` หากยังไม่มีภารกิจจริง, `ack_acceptance`, `suggested_chat_title: ANT | <ROLE_ID>` และผู้ที่รับผิดชอบลงทะเบียน. **ห้ามใช้ลิงก์ตัวอย่างแทน Issue จริง**.
3. ส่ง Owner เพียงข้อความสั้นต่อไปนี้ (แทนที่ทุกช่องด้วยข้อมูลจริง; อย่าส่ง Template เปล่า):

```text
<APPOINTMENT-ID> <PARENT-ROLE> → <NEW-ROLE-ID> | APPOINTMENT_ISSUED / AWAITING_ACK
GitHub appointment: <REAL-APPOINTMENT-ISSUE-URL> | Read: https://github.com/tanawutmalirum29-ux/appointment-CEO/blob/main/docs/ROLE-START-HERE.md
Next recipient: <NEW-ROLE-ID> | อ่าน Issue/Charter/Skills ตรวจเครื่องมือ โพสต์ ACK และรายงาน <PARENT-ROLE>; ห้ามเริ่มงานเกมก่อน TASK_ASSIGNED
```

## หน้าที่ของ AI แชทปลายทางเมื่ออ่านข้อความแรก
1. เปิด Issue จริง, `ROLE-START-HERE.md`, Role Charter ที่ Issue ระบุ และ `ROLE-SKILLS-AND-SCOPE.md` จาก **main**; อ่านสถานะใน Registry ว่าตำแหน่งเป็น Slot หรือแต่งตั้งแล้ว. ไม่ใช้ชื่อแชทหรือข้อความที่จำมาจากรอบเก่าเพื่อเดาตำแหน่ง.
2. ตรวจ `role_id` และ `parent_role_id` ใน Issue เทียบกับสายงานที่มีอยู่. ตรวจทักษะ/เครื่องมือในแชทนี้จริง เช่น GitHub Connector, Actions log, Browser/Node หากงานต้องใช้. ถ้าไม่พร้อม ให้รายงาน `SKILL_GAP` หรือ `CAPABILITY_BLOCKED` อย่าอ้างว่า PASS.
3. แจ้งชื่อแชทแนะนำ `ANT | <ROLE_ID>` **เป็นบรรทัดแรกของคำตอบ**; หากไม่มีเครื่องมือ Rename ให้ Owner เปลี่ยนชื่อเองในแอป ไม่อ้างว่าทำได้แล้ว. โพสต์ `APPOINTMENT_ACK` ใน **Issue แต่งตั้งนั้น** พร้อม `role_id`, `parent_role_id`, ทักษะและเครื่องมือ `AVAILABLE/UNAVAILABLE`, ขอบเขต, ข้อห้าม, สิ่งที่ขาด, สถานะ `STANDBY`, `suggested_chat_title` และลิงก์แหล่งกฎที่อ่านจริง. ห้ามกล่าวว่า ACK สำเร็จก่อน GitHub ยืนยัน URL.
4. ส่ง Owner ข้อความ 3 บรรทัดให้นำไปยัง **หัวหน้าตรงเท่านั้น**. หัวหน้าตรวจ ACK จริง แล้วให้ Roster Steward ลงทะเบียน `ACTIVE` หรือ `STANDBY` ตามความจริง.
5. ไม่สร้าง GitHub Task/Branch หรือเริ่มพัฒนาเกมเอง. รับงานจริงได้เมื่อมี `TASK_ASSIGNED` เฉพาะตัวตาม [Task Issue Contract](TASK-ISSUE-CONTRACT.md) เท่านั้น.

## ถ้า Owner ส่งเพียง URL ของ Repository หรือ Role ไม่ครบ
ตอบ `NEEDS_APPOINTMENT` และลิงก์ `ACTIVATION-PACKET.md` โดยไม่เดาว่าตัวเองเป็น CEO/Director/Engineer, ไม่เปลี่ยน Registry และไม่เขียนโค้ด. ต้องขอข้อความแต่งตั้งที่สร้างโดยหัวหน้าตรงให้ Owner ส่งต่อ ไม่ให้ Owner คิด Role ID หรือ Issue เอง.

## ภายหลังเปลี่ยนตำแหน่ง / ย้ายสาย / เปลี่ยนผู้บังคับบัญชา
ต้องมี `TRANSFER_REQUEST` ผ่านผู้บังคับบัญชาปัจจุบันไปยัง common ancestor, อนุมัติโอนความรับผิดชอบ, ใหม่ `APPOINTMENT_ACK` โดย AI ปลายทาง, ปิดสิทธิ์ Task เดิมที่ชนกัน และ Registry revision/PR. ห้ามมีหัวหน้าตรงสองคนพร้อมกัน.

**สถานะปัจจุบันขององค์กรที่ตรวจ ณ รอบเขียนคู่มือนี้:** `appointments=[]`. เอกสารนี้ไม่ได้แต่งตั้ง AI หรือทำให้แชทรับคำสั่งอัตโนมัติ.
