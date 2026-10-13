# Ant Kingdom — Governance V2 | ศูนย์กลางการแต่งตั้งและบริหารองค์กร
**เอกสารนโยบายองค์กรหลักบน `appointment-CEO/main`**: ใช้กำหนดโครงสร้าง การแต่งตั้ง และการรับรองงานในรอบถัดไป **ไม่ใช่คำสั่งเริ่มพัฒนาเกมหรือยืนยันว่ามี AI แชทใหม่แล้ว**. ส่วนโค้ดเกมและงานพัฒนาอยู่ที่ [ant-project](https://github.com/tanawutmalirum29-ux/ant-project) เท่านั้น

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

**กฎห้ามข้ามหัว:** ข้อความจาก CEO ตรงถึง VIS-E ไม่มีอำนาจเป็นคำสั่งปฏิบัติงาน ต้องให้ CEO→Delivery→รองด้าน Experience→VIS-DIR→VIS-TL→VIS-E ทีละขั้น. AI ขอดูงานคนอื่นได้โดยส่งเรื่องผ่านหัวหน้าตรง; หัวหน้าตัดสินได้เฉพาะเรื่องในอำนาจ หากเกินขอบเขตจึงส่งต่อขึ้นหนึ่งชั้นไปหาผู้บริหารร่วม แล้วลงอีกสาย.

**ระบบคน:** CEO เลือกงบจำนวนคน/Domain; หัวหน้าทุกชั้นแต่งตั้งลูกน้องตัวเองและรายงานทะเบียน, โดยไม่รอ CEO แต่งตั้ง Engineer ทีละคน. ทุก AI สามารถขอ Assistant โดยผ่านสายขึ้น CEO เพื่อตัดสินงบคน โดย **ไม่ต้องให้ DCEO-QA ตรวจเกมก่อน**. Role ใหม่ต้องมี Issue, ข้อความ Owner relay และ ACK ของแชทจริงจึง ACTIVE.

**หลักฐาน:** รายงาน/CI/ลายเซ็นอยู่ใน GitHub, CEO ไม่รับคำว่า PASS ลอย ๆ; CI verifier ของลายเซ็นเป็นคุณสมบัติที่ *กำหนดให้ implement ในรอบเปิดใช้งาน* มิใช่บอกว่ามี Workflow นี้อยู่แล้ว. การใช้ GitHub บัญชีเดียวกันไม่ยืนยันตัวผู้ลงนามแต่ละแชทอย่างเข้ารหัส. เจ้าของโครงการไม่ต้องกด Actions/ส่ง ZIP.

## Legacy documents
[ORGANIZATION](docs/ORGANIZATION.md), [WORKFLOW](docs/WORKFLOW.md), [QUALITY-GATES](docs/QUALITY-GATES.md), [REPORTING](docs/REPORTING.md) และไฟล์แต่งตั้งรุ่นก่อนถือเป็น **Legacy Reference** ในกรณีเนื้อหาขัดกับ V2 ให้ใช้ไฟล์ V2 เป็นหลัก. ผัง 17 AI เดิมใน ant-project เป็นบันทึกประวัติ ไม่ใช่คำสั่งแต่งตั้งที่ทำงานใหม่ได้.

**โปรดอย่าลบแชท AI เดิมหรือถือว่าตำแหน่งที่ยังไม่ ACK เป็น ACTIVE:** ผังองค์กรใน `docs/ai-org` ระบุเฉพาะโครงสร้าง/สถานะจริง และบันทึกการแต่งตั้งต้องมี GitHub Issue และคำตอบรับแชทก่อน.
