# Delivery SOP — V2
1. **Owner→CEO** ให้เป้าหมาย. CEO ตรวจ main ล่าสุด กำหนดขอบเขต Round, capacity envelope, domain Required Signers และแต่งตั้ง Delivery รอง CEO หากยังไม่มี; ไม่สั่ง Engineer ตรง.
2. **CEO→Delivery** มอบหมายงานระดับสูง. Delivery แต่งตั้งรอง SYS/EXP/PLAT/QA ใน Slot ที่อนุมัติ, ออกงานเฉพาะผู้ใต้บังคับบัญชาตรง, ดูแลทะเบียนคน. Domain Deputies แต่งตั้ง Directors, Director แต่งตั้ง Lead, Lead แต่งตั้ง Engineers 2 คน; ทุกคนต้องมี Issue/ACK จริง.
3. **Engineer/Assistant** พัฒนาเฉพาะไฟล์อนุญาตและส่ง PR/CI ให้หัวหน้าตรง. **Lead** ตรวจครบ 2 Engineers ลง `TEAM_ACCEPTED`. **Director** ตรวจรวมลง `DEPARTMENT_ACCEPTED`. **Domain Deputies** ทดสอบงานในเขตรับผิดชอบจริงบน Candidate SHA สุดท้ายแล้วลง `DOMAIN_SIGNED` / HOLD. **Independent DCEO-QA** ตรวจระบบข้ามส่วนและลง `INDEPENDENT_QA_SIGNED` / `QA_HOLD`.
4. **Delivery** รวมงานบน Release Candidate เดียว ตรวจลายเซ็นผู้เกี่ยวข้องทุกฝ่าย + CI ที่ HEAD ตรงกัน แล้วลง `DELIVERY_SIGNED` เป็นคนสุดท้าย, ส่ง Final PR ให้ CEO พร้อม `SIGNATURE_READY` ที่เครื่องตรวจ (เมื่อ implement แล้ว).
5. **CEO** ตรวจนโยบายที่ Owner อนุมัติ, ลายเซ็นทุกคน, ไม่มี HOLD, SHA ตรง, CI Final PASS, แล้ว Merge เข้า `main` คนเดียว. CEO ไม่ทำ Browser/Game QA ซ้ำ. เมื่อปิดรอบให้ปิดงานที่เสร็จแต่เก็บหลักฐานและพักทุกตำแหน่ง.
6. **Cross-team requests** และคำสั่งทุกชนิดเดินผ่าน parent ทีละคน; ดู [Routing](REQUEST-ROUTING.md). **Staffing/Assistant request** เดินขึ้น CEO ผ่านสาย แต่ไม่อ้อมผ่าน QA ตรวจเกม; ดู [Staffing](STAFFING.md). **Owner** ส่งต่อข้อความสั้นระหว่างแชทเท่านั้น ไม่กด Workflow/ขน Artifact.

**No bypass, no greenwashing:** CI ไม่รัน ≠ PASS, เปลี่ยน Release SHA เมื่อไรลายเซ็นเดิมใช้แทนไม่ได้, ไม่มีการ Merge main โดย Director/Deputy. การแต่งตั้งไม่อนุมัติงานพัฒนาใหม่.
