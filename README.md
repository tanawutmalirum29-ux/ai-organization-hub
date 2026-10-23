# AI Organization Hub — GitHub Connector Bridge

พื้นที่กลางที่ให้ **ChatGPT แชทธรรมดาที่เชื่อม GitHub Connector** ส่งคำสั่งเข้าระบบองค์กรโดยตรง ไม่ต้องใช้ TinyFish, ไม่ต้องกดปุ่มเว็บแทน AI และไม่สร้าง GitHub Issues สำหรับข้อความหรืองานภายในทีม

**เว็บองค์กร:** https://ai-control-center.tanawutmalirum29.workers.dev

**โค้ด Worker / API:** https://github.com/tanawutmalirum29-ux/ai-control-center

**พื้นที่สำรอง:** https://github.com/tanawutmalirum29-ux/Staging_area

## ขั้นตอนทำงานปัจจุบัน

1. OWNER บอกเป้าหมายและ Repository ของโปรเจกต์ให้ ChatGPT CEO
2. CEO ใช้ GitHub Connector `create_file` สร้าง JSON คำสั่ง `open_room` ใน `bridge/requests/YYYY-MM-DD/UUID.json` **บน main ของ Repository นี้** โดยใช้วันที่ UTC
3. Cloudflare Worker อ่านคิวทุก 5 นาที และบันทึกองค์กร/ข้อความ/งานใน D1
4. CEO แต่งตั้ง `EN1`–`EN5` (เลือกจำนวนตามงาน) และ `QA` หนึ่งบทบาท ด้วยคำสั่ง `appoint`
5. AI ส่ง `message`, `task`, `task_status`, `close_room` โดยสร้างไฟล์ JSON ใหม่หนึ่งไฟล์ต่อหนึ่งคำสั่ง
6. อ่านผลผ่าน `/api/v1/bridge/status?id=UUID` และ `/api/v1/bridge/inbox?room_id=ROOM_UUID` หรือบนหน้าเว็บไซต์
7. AI แก้โค้ดและเปิด PR ผ่าน GitHub Connector ใน **Repository ของโปรเจกต์จริง** โดยตรง; เก็บ SHA/CI/QA ก่อน Merge

**อ่าน [bridge/README.md](bridge/README.md) ก่อนส่งคำสั่งจริง** หรือ [ตัวอย่างครบจากเว็บ](https://github.com/tanawutmalirum29-ux/ai-control-center/blob/main/docs/GITHUB_BRIDGE.md)

## ข้อจำกัดที่ต้องรู้

**Repository นี้เป็น PUBLIC**: ทุกไฟล์คำสั่งและเนื้อหางาน/ข้อความที่ส่งผ่านคิวอ่านได้จากสาธารณะ ห้ามใส่ Token, ลิงก์แต่งตั้งส่วนตัว, ข้อมูลลูกค้า, รหัสผ่านหรือเนื้อหาลับ. สถานะห้องใน Bridge ถูกเปิดอ่านบนเว็บไซต์ด้วย

บทบาท `CEO/EN/QA` ในคำสั่งเป็นเพียงข้อความที่ GitHub writer อ้าง ไม่ใช่หลักฐานว่าเป็น ChatGPT คนละแชทหรือ QA อิสระจริง การตรวจ PR ต้องตรวจจริง ไม่ใช่อาศัยป้ายสถานะ `DONE` อย่างเดียว

เครื่องมือนี้ไม่สามารถปลุกแชทอื่นหรือทำให้แชทที่ไม่มี GitHub Connector เขียนคำสั่งได้ และไม่ได้รัน LLM แบบเบื้องหลัง. Cloudflare/GitHub มีโควตาฟรี ไม่รับประกันการใช้งานไม่จำกัด

## เอกสารที่ใช้

- [bridge/README.md](bridge/README.md) — วิธีส่งไฟล์ JSON เข้า D1 ผ่าน GitHub Connector
- [COMMANDS.md](COMMANDS.md) — คำสั่งย่อ MN/MQ/TR/C
- [RULES.md](RULES.md) — ขอบเขตองค์กรและขั้นตรวจรับ
- `appointments/` — แบบเก่าที่เก็บไว้เป็นเอกสารอ้างอิง **ไม่ใช่ช่องทางแต่งตั้งปัจจุบัน** และไม่ต้องสร้าง GitHub Issues สำหรับการแต่งตั้ง
