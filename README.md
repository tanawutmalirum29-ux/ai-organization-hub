# Ant Kingdom — Organization workspace

**กฎองค์กรมีเพียงหนึ่งไฟล์:** [RULES.md](RULES.md)

กฎนี้ใช้กับการจัดองค์กร AI เพื่อพัฒนาเกม [Ant Kingdom](https://github.com/tanawutmalirum29-ux/ant-project). README เกมลิงก์กลับมายัง `RULES.md` นี้โดยตรง ไม่มีชุดกฎในเกมที่แยกเวอร์ชัน ไม่มีโครง 17 AI เดิม หรือกฎแต่งตั้งย้อนหลังที่บังคับใช้ซ้ำ

**สำหรับ OWNER:** เริ่มจาก [ใบแต่งตั้ง CEO คนใหม่](appointments/OWNER-TO-CEO.md) (ต้องแทนค่าจริง) หรือใช้ใบแต่งตั้งเต็มที่ CEO คนเดิมส่งหลัง `Completed`. เมื่อ CEO ตั้งที่ปรึกษา 2 คนแล้ว ส่ง `NP` ไปที่ GAME-ADVISOR, อ่านข้อเสนอเต็มและตอบ `C`; ที่เหลือ AI วางแผนและตรวจสองลายเซ็นกันเอง OWNER ส่งเพียง `MN` ไปแชทที่ระบุ

**อ้างอิงเร็ว:** [คำสั่ง I / NP / NX / TR / PF / SIM / CCCC DB](COMMANDS.md). `Tr` ใช้ในแชท AI เดิมเพื่อประเมินและลองทำขั้นตอนล่าสุดที่เกิด `ER`/`B` อีกครั้งตามข้อจำกัดใน [RULES.md](RULES.md#tr--retry-after-erb-owner--same-ai-chat). เอกสารอ้างอิงนี้ไม่มีสิทธิ์เปลี่ยนกฎกลาง

## เครื่องมือทดสอบและสถานะ

- `node --test tests/*.test.mjs` — ทดสอบ governance/QA gates รวมทั้งสถานการณ์ผิดพลาด
- `node scripts/org-sim.mjs` — จำลองวงจรองค์กรแบบ offline regression; ไม่ใช่การเปิด ChatGPT หลายแชทจริง
- `node scripts/org-dashboard.mjs workspace --write` — สร้าง `workspace/DASHBOARD.md` บน round branch จาก ledger/receipts จริง; CEO ต้อง commit เองก่อน OWNER เปิดดู
- `node scripts/org-preflight.mjs <LIVE_EVIDENCE.json>` — PF readiness ต่อการส่ง `CCCC DB` โดยหลักฐานต้องดึงจาก GitHub จริง
- `node scripts/org-privacy-audit.mjs` — scanner ที่ใช้โดยเครื่องมือสำรอง workspace; ข้อมูลละเอียดอ่อนห้ามเก็บ public โดยไม่ได้ตรวจ
- `node scripts/v10-prepare-archive.mjs ...` — เตรียมสำเนารอบที่ CLOSED ครบ พร้อม SHA256 ใน governance/main, ห้ามลบ branch ก่อน verify
- `node scripts/v10-closeout-check.mjs ...` — ตรวจทั้งสอง GitHub repo หลัง OWNER ส่ง `c`
- `node scripts/v10-next-ceo.mjs ...` — สร้างใบแต่งตั้ง CEO ใหม่จากผลตรวจล่าสุดที่ผ่านจริง
- `node scripts/v8-next.mjs workspace` / `node scripts/v10-mq.mjs workspace` — ชื่อไฟล์ tooling ภายในเพื่อความเข้ากันได้กับหลักฐานเก่า **ไม่ใช่กฎหลายเวอร์ชัน**

**GitHub main มีแต่กฎแม่แบบ โค้ดตรวจสอบ และประวัติสำรองที่อนุญาต.** แต่ละ CEO ใหม่ทำงานบน `round/<id>` ของตัวเองเพียงหนึ่งภารกิจ; ไม่ Merge workspace กลับเข้า main. Round/Chat ที่ปิดไปเป็นประวัติ ไม่ต้องสร้างใหม่หรือแก้ไข

## ความปลอดภัยของข้อมูล

`appointment-CEO` เปิดเผยสาธารณะ. อย่าใส่ Token, รหัสผ่าน, ข้อมูลผู้ใช้ละเอียดอ่อน หรือข้อความส่วนตัวทั้งฉบับลงใน `main`. ก่อนลบ Branch ต้องเก็บข้อมูลที่ต้องรักษาไว้ในพื้นที่ Private ที่ตรวจสอบได้และมีบันทึก redaction เท่านั้น; ถ้าทำไม่ได้ให้ PF ตอบ `B` ไม่ส่ง DB

GitHub Actions/tests แสดงความถูกต้องของ schema/โค้ดจำลอง ไม่ใช่หลักฐานว่า ChatGPT หลายแชทเชื่อมกันได้เองหรือเกมทดสอบบนมือถือจริง
