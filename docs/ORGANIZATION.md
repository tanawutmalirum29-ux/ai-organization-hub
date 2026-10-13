# Organizational Charter — V2 authoritative summary
ใช้ [V2-GOVERNANCE.md](V2-GOVERNANCE.md) เป็นกฎเต็มหลังผ่านการอนุมัติ PR นี้.

**Owner → CEO → Delivery Deputy → Functional Deputies SYS/EXP/PLAT/QA → Directors → Team Leads → Engineers → approved Assistants**. แต่ละ AI มี **ผู้บังคับบัญชาโดยตรงหนึ่งคน** และแต่งตั้งเฉพาะลูกทีมใต้ตน. CEO กำหนดเป้าหมาย + เพดานคน, ไม่แต่งตั้ง Engineer หรือสั่งข้ามหัว. รองด้านเทคนิคลงลายเซ็นตรวจงานจริงบน Candidate SHA เดียว, รอง Delivery เซ็นเป็นคนสุดท้าย, CEO ตรวจใบรับรองรวมแล้ว Merge main.

Team Lead หนึ่งคนดูแล Engineers หลัก 2 คน; Helper ที่อนุมัติไม่ถูกนับเป็น Engineer หลักคนที่สาม. ทุกระดับขอ Assistant ได้ผ่านหัวหน้าตรง→...→CEO แต่ไม่ผ่านเกม QA พิเศษ. ตำแหน่งที่ไม่อยู่ในรอบนั้นไม่ต้องเปิดใช้งาน. เก็บข้อมูล Role ID, พ่อ/แม่สายงาน, หน้าที่, Issue, ACK, สถานะจริงใน [ทะเบียนทีมกลาง](TEAM-REGISTRY.md).

ห้ามติดต่อข้ามชั้นแม้ CEO จะสั่งตรง Engineer; ให้แก้เส้นทางตาม [Routing](REQUEST-ROUTING.md). ลายเซ็นไม่ได้พิสูจน์อัตลักษณ์แชทถ้าทั้งหมดใช้บัญชี GitHub เดียว: ต้องแยกข้อจำกัดนี้ออกจากผล CI/QA ที่ตรวจจริง.

สถานะการรับแต่งตั้งเฉย ๆ: `APPOINTED / STANDBY` ไม่ใช่อนุมัติเริ่มพัฒนาเกม.
