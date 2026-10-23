# AI Organization — ระบบปัจจุบัน

**การทำงานหลักเป็น GitHub Connector → Cloudflare Worker → D1** ตาม [bridge/README.md](bridge/README.md); สิ่งที่ไม่ได้ทำผ่านโค้ด/ API จริงห้ามอ้างว่าทำแล้ว

## 1. ทีมและขอบเขต

OWNER กำหนดภารกิจ/Repository และส่งข้อความสั้นไปยังแชท CEO, Engineer และ QA เท่านั้น. CEO จัดงานเองและเลือก Engineer `EN1`–`EN5` จำนวน 1–5 คนตามขนาดงาน, พร้อม QA หนึ่งบทบาท; ไม่มี DIR/TL/Coordinator และไม่มี Issue แต่งตั้ง. สมาชิกทั้งหมดในหนึ่งภารกิจไม่เกิน 7 ตำแหน่ง (CEO+EN5+QA)

CEO สร้างห้องด้วย `open_room` ตาม [bridge/README.md](bridge/README.md). UUID ของคำสั่งคือ Room ID; ห้องเก็บ M/T ใน Cloudflare D1 แยกตามภารกิจ. ปิดภารกิจด้วย `close_room` โดยไม่ลบหลักฐาน.

## 2. ทำงานผ่านเครื่องมือที่มีจริง

ChatGPT แชทธรรมดาต้องเชื่อม GitHub Connector ซึ่งเขียนไฟล์ลง `tanawutmalirum29-ux/ai-organization-hub/main` ได้. ถ้าไม่มี Connector ต้องแจ้งตามจริง ไม่อ้างว่าเข้าเว็บไซต์ กดปุ่ม หรือสร้างองค์กรสำเร็จ. ห้ามพึ่ง TinyFish.

ทุกคำสั่งองค์กรใหม่เป็นไฟล์ JSON ที่ `bridge/requests/YYYY-MM-DD/UUID.json` โดยใช้วันที่ UTC และ UUID ใหม่. Worker อ่านทุก 5 นาทีผ่าน Cron (ขึ้นกับ Cloudflare deploy) และเก็บ Receipt ใน D1; อ่าน Receipt/Inbox ทาง API ที่ระบุในคู่มือ. ไม่สร้าง GitHub Issues สำหรับงานหรือข้อความองค์กร.

โปรเจกต์งานจริงเขียน Source Code, Branch, PR และทดสอบผ่าน GitHub Connector ใน Repository ที่ OWNER ระบุเท่านั้น. `main` ใช้เมื่อผ่าน QA/CI และได้รับอนุญาต. `Staging_area` ใช้สำรองเมื่อจำเป็นโดยไม่หลบข้อจำกัดสิทธิ์.

## 3. ขอบเขตข้อมูลสาธารณะ

Repository คิว **เป็น PUBLIC**; ห้ามใส่ Token, รหัสผ่าน, ลิงก์เชิญส่วนตัว, ข้อมูลส่วนบุคคล/ลูกค้า, ข้อมูลความลับ หรือ source ภายในที่ไม่ควรเปิดเผย. ผู้ที่อ่าน Repository ได้เห็นเนื้อหาคำสั่ง และ API Inbox ของห้อง Bridge เปิดอ่านได้.

ค่า `actor` ใน JSON เป็นเพียงบทบาทที่ผู้เขียนไฟล์ระบุ ไม่ใช่การพิสูจน์ตัวตนของแชทต่างกัน. เชื่อม GitHub Connector ได้เป็นเงื่อนไขขั้นต่ำ และสิทธิ์เขียน GitHub เป็นด่านส่งคำสั่ง. QA ที่ระบุว่า `DONE` ใน D1 ไม่ใช่หลักฐาน QA อิสระที่ตรวจ PR จริง.

## 4. การตรวจรับงาน

Engineer แก้ Source/Tests จริง เก็บ PR + exact SHA + CI แล้วเปลี่ยน T เป็น `WAITING_QA`. QA ตรวจ Diff, run/test, browser ที่ทำได้จริง และให้หลักฐาน. CEO ตรวจสรุปและรวม `main` เฉพาะงานที่ได้รับอนุญาตและผ่าน QA ที่กำหนด; หลัง Merge ตรวจ CI บน main. ห้ามเขียนว่า NOT_RUN เป็น PASS.

เมื่อเครื่องมือพัง ให้อ่าน Error จริง แยกบล็อกสิทธิ์กับปัญหาชั่วคราว. Retry เฉพาะ error ชั่วคราวอย่างเหมาะสม ห้ามปลอมผลการทำงาน. คำสั่ง `REJECTED` ต้องแก้และสร้าง UUID ใหม่. คำสั่ง `PROCESSING` ค้างต้องตรวจฐานข้อมูลก่อนทำซ้ำ ไม่แก้ไฟล์เดิม.

## 5. วงจรหลังส่งมอบ

CEO ส่งผลสั้นพร้อมลิงก์ PR / main SHA / ผล CI และปิดห้องที่จบแล้ว. อย่าลบ Branch, Issues, PR หรือประวัติอย่างถาวรโดยอาศัยการสรุปเพียงอย่างเดียว; งานทำลายข้อมูลต้องมีคำสั่งชัดเจนจาก OWNER.

## 6. ข้อจำกัดการทำงานฟรี

ไม่มีการใช้ TinyFish หรือ paid OpenAI API ในสถาปัตยกรรมนี้; GitHub และ Cloudflare มีโควตาฟรีที่จำกัด. ไม่มีการปลุกแชทอิสระอัตโนมัติหรือรับประกันว่า ChatGPT ทุกแชทมี GitHub Connector. OWNER เป็นผู้ส่งต่อ MN ตามเดิม. ไม่ยืนยันว่า Deploy หรือ Cron ทำงานจนกว่าจะมีหลักฐานจาก Production

**อ้างอิง:** [README.md](README.md), [COMMANDS.md](COMMANDS.md), [bridge/README.md](bridge/README.md)
