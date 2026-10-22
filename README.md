# AI Organization Hub — ระบบองค์กร AI สำหรับทุกโปรเจกต์

เก็บ **กฎองค์กรกลาง, คำสั่งย่อ, แบบแต่งตั้ง, การสำรอง/กู้คืน และมาตรฐานตรวจรับงาน** โดยใช้ GitHub Issues/PR/CI ประสานระหว่างหลายแชท. ชื่อ GitHub ปัจจุบันคือ `ai-organization-hub`.

## โครงสร้างใหม่: สั้นเพียงสองชั้นหลัก

```text
OWNER
└── PROJECT LEAD (ใช้ชื่อ CEO ต่อได้)
    ├── ENGINEER / CREATOR A
    ├── ENGINEER / CREATOR B
    ├── QA / REVIEWER       (ตรวจอิสระ)
    └── COORDINATOR         (ทางเลือก ไม่บังคับ)
```

**ไม่ต้องมี DIR/TL ก่อนเริ่มพัฒนา**. PROJECT LEAD แต่งตั้ง Engineer และ QA โดยตรง; QA อิสระจากผู้สร้าง; Coordinator ใช้ช่วยประสานเฉพาะงานใหญ่ **ไม่เป็น Gate เพิ่ม**. มี AI ACTIVE ได้รวมไม่เกิน 10 ต่อภารกิจ. งานเล็ก Lead ทำเองได้; งานใหญ่แบ่งผู้ปฏิบัติงานตามไฟล์ที่ไม่ทับกัน.

**ตรวจรับ:** Worker → Project Lead/Reviewer ที่มอบหมาย → Independent QA เมื่อเป็นงานเสี่ยง/ต้องปล่อยเวอร์ชัน → Project Lead รวม `PROJECT_REPO/main` ตามสิทธิ์และตรวจ postmerge CI.

## ทุกการแต่งตั้งต้องมี GitHub 3 URL

| ฟิลด์ | URL และหน้าที่ |
|---|---|
| `PROJECT_REPO` | URL ของเกม/แอป/งานปัจจุบันที่ OWNER ระบุ เป็นที่ตั้ง Issue/PR/CI/โค้ดและ `main` ผลิตภัณฑ์ |
| `ORG_WORKSPACE_REPO` | https://github.com/tanawutmalirum29-ux/ai-organization-hub — กฎ/คำสั่ง/แบบแต่งตั้งบน `main` และ Branch ธุรการชั่วคราวที่ได้รับอนุญาต |
| `STAGING_REPO` | https://github.com/tanawutmalirum29-ux/Staging_area — Branch สำรอง/Tests/Recovery ที่ได้รับอนุญาต ไม่ใช้เป็น Main ผลิตภัณฑ์ |

**เมื่อเปลี่ยนโปรเจกต์ ให้เปลี่ยนเฉพาะ `PROJECT_REPO`**, ห้ามเดาจากชื่อแชทหรือรีโปเดิม. ในทุก AP-ROLE และ Handoff ต้องใส่สาม URL จริง; ข้อความไปแชทส่งสั้น `ROLE: AP-ROLE #<issue> <issue-url>` ได้ เพราะแชทผู้รับต้องเปิด Issue ที่มีลิงก์ครบ.

## วงจรทำงาน

1. OWNER กำหนดเป้าหมาย/รีโปจริงและแต่งตั้ง Project Lead ใน Issue ของโปรเจกต์ พร้อม `main SHA`, CI, ข้อจำกัดและงานค้าง.
2. Lead รับ AP-ROLE ในแชทของตน เปิดสามรีโปและ ACK ใน Issue ด้วยตนเอง. Issue ที่เปิดขึ้นมาเองไม่ทำให้ Agent เริ่มงาน.
3. Lead แต่งตั้ง Worker/QA โดยตรง แยกไฟล์ `EDITABLE_PATHS`, `REPORTS_TO`, `BASE_SHA`, `START/HOLD`, Acceptance ให้ชัด. ไม่สร้างชั้นกลางโดยไม่จำเป็น.
4. Worker เขียน Branch/Commit/PR และทดสอบจริง; Lead ตรวจ Diff/API; QA อิสระตรวจ exact integrated SHA เมื่อเป็น Gate.
5. Lead Merge `PROJECT_REPO/main` เมื่อผ่าน CI/QA และได้รับอนุญาต; ตรวจบน `main` แล้วทำ PF Cleanup อย่างระมัดระวังหลังสำรองกู้คืนได้.

## เมื่อมีปัญหา

อ่าน [RULES.md §§5.1–5.3](RULES.md): ตรวจ Error/สิทธิ์และ SHA จริง → Retry เหตุชั่วคราวแบบจำกัด → สำรองในเครื่อง → Staging ที่ได้รับอนุญาต → ZIP ทางเลือกสุดท้าย. ตรวจ checksum/manifest/rollback; ไม่ให้ OWNER วางไฟล์ทีละไฟล์. ไม่ข้ามการปฏิเสธสิทธิ์/ความปลอดภัยด้วยรีโปหรือบทบาทอื่น. `NOT_RUN` ไม่ใช่ `PASS`.

## เอกสาร

- [RULES.md](RULES.md) — กฎกลาง โครงสร้างสั้น, 3 รีโป, Review/QA, Backup/Restore, Runbook และ PF
- [COMMANDS.md](COMMANDS.md) — `AP-ROLE`, `MN`, `TR`, `ORG`, `BK`, `DR`, `ST`, `CI`, `PF`
- [appointments/OWNER-TO-LEAD.md](appointments/OWNER-TO-LEAD.md) — **แบบแต่งตั้งหลัก** ของ Project Lead (ชื่อ CEO ใช้ได้)
- [appointments/ROLE-HANDOFF.md](appointments/ROLE-HANDOFF.md) — แบบแต่งตั้ง Worker/Creator/QA/Coordinator โดยตรง
- [appointments/OWNER-TO-CEO.md](appointments/OWNER-TO-CEO.md) — ลิงก์เข้ากันได้สำหรับงานที่ใช้ชื่อ CEO เดิม
- [Staging_area](https://github.com/tanawutmalirum29-ux/Staging_area) — ขั้นตอนสำรอง Manifest/Restore

**หมายเหตุ:** การเปลี่ยนชื่อรีโปและการเปลี่ยนผังองค์กรไม่ได้อัปเดต PR/CI หรือเปิดแชท AI เอง; ถ้ามี Issue บทบาทเก่า ให้รักษาหลักฐานและกำหนด `REPORTS_TO` ใหม่ โดยไม่ทำลายงานที่ยังค้าง.
