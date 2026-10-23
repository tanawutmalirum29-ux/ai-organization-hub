# คำสั่งย่อสำหรับ ChatGPT (GitHub Connector Bridge)

**เริ่มต้นทุกภารกิจ:** เปิด [bridge/README.md](bridge/README.md) แล้วดู GitHub Project Repository ที่ OWNER ระบุ ห้ามเดาโปรเจกต์จากแชทเก่า

| รหัส | การทำงาน |
|---|---|
| `MN` | อ่านสถานะห้องจาก `/api/v1/bridge/inbox`, อ่าน Receipt งานล่าสุด, ลงมือทำงานที่ได้รับมอบหมายด้วย GitHub Connector; หากเป็น CEO ให้ส่งงานผ่านไฟล์ JSON ในคิว |
| `MQ` | อ่านงาน/ข้อความล่าสุดในห้องและ PR/CI ของโปรเจกต์จริง |
| `TR` | ตรวจ error/Receipt/CI จริง แยก PASS / FAIL / NOT_RUN; แก้แล้วสร้าง **คำสั่งใหม่ UUID ใหม่** เมื่อคำสั่งก่อนถูก REJECTED |
| `C` | รับทราบหรือรายงานงานจบตามจริง; ไม่ใช่การอนุมัติ Merge |
| `ST` | ตอบสถานะล่าสุดสั้น พร้อม SHA หรือ Receipt UUID |
| `CI` | ตรวจ GitHub Actions ของ SHA ที่กำลังจะรวม |
| `RV` | ตรวจ code/browser/QA จริง (บทบาท QA ใน Bridge ไม่ยืนยันผู้ตรวจอิสระ) |

## ห้ามใช้ช่องทางเก่าในงานองค์กรใหม่

- ไม่สร้าง/เขียน GitHub Issues เพื่อคุยกันในทีม, แต่งตั้ง, ส่ง M หรือ T
- ไม่ใช้ TinyFish/ตัวกดหน้าเว็บสำหรับงานที่ GitHub Connector ทำตรงได้
- ไม่ใช้หน้าตัวแก้โค้ดเก่าของ AI Control Center (ถูกถอดออกแล้ว)
- ไม่ใส่ข้อมูลลับในคิว GitHub สาธารณะ
- ไม่อ้างว่า CI PASS = QA ผ่าน / ไม่รวม `main` โดยไม่มีสิทธิ์และหลักฐานตามคำสั่ง

## รูปแบบคำตอบถึง OWNER

ตอบสั้นหนึ่งบรรทัด `ROLE: MN/MQ/TR/C — ผลลัพธ์ + SHA/Receipt + สิ่งที่ค้าง`. ทำงานจริงก่อนรายงาน. OWNER ส่งต่อข้อความไปแชทต่าง ๆ เอง; ระบบ Bridge ไม่ส่งข้อความเข้า ChatGPT แชทอื่นอัตโนมัติ

**ลิงก์:** [เว็บ](https://ai-control-center.tanawutmalirum29.workers.dev) · [คิวองค์กร](https://github.com/tanawutmalirum29-ux/ai-organization-hub) · [คู่มือ Bridge](bridge/README.md)
