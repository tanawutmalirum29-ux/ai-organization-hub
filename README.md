# AI Organization — Central Governance

**ระบบบริหารทีม AI สำหรับทุกโปรเจกต์** (เกม/แอป/เว็บไซต์/เอกสาร) ผ่าน GitHub. `main` ของรีโปนี้เป็น **กฎองค์กรกลาง/คู่มือคำสั่ง/แบบแต่งตั้งเท่านั้น** ไม่ใช่ `main` เกม และไม่ใช่รีโปสำหรับเอาโค้ดผลิตภัณฑ์ไป Merge.

## ต้องแนบลิงก์ครบ 3 แห่งทุกครั้งที่ตั้งงาน/แต่งตั้งทีม

| ที่อยู่ | ใช้ทำอะไร |
|---|---|
| **1. PROJECT_REPO — รีโปเกม/โปรเจกต์** | **ใส่ URL เต็มของโปรเจกต์ที่ OWNER ระบุจริง** (เช่น `https://github.com/<owner>/<project>`), เป็นที่อยู่ของ Product Issue/PR, Code, CI, `main` ที่จะส่งมอบ |
| **2. ORG_WORKSPACE_REPO — องค์กรกลาง** | https://github.com/tanawutmalirum29-ux/appointment-CEO — อ่านกฎบน main/แต่งตั้ง/สายผู้รับผิดชอบ; Branch `work/<project>/<mission>` พักงานธุรการที่อนุญาต |
| **3. STAGING_REPO — พื้นที่สำรอง** | https://github.com/tanawutmalirum29-ux/Staging_area — Branch `stage/<project>/<mission>` สำรอง Source/Patch/Tests เมื่ออนุญาต; ไม่ใช่ `main` สำหรับปล่อยเกม |

**PROJECT_REPO ต้องใส่ตามงานปัจจุบัน ห้ามยึดชื่อเกมเดิมเป็นค่าเริ่มต้น.** ใน Issue AP-ROLE และ Handoff ใส่ **ทั้ง 3 URL จริง**; ส่วนคำสั่งแชท `ROLE: AP-ROLE #<issue> <issue-url>` ส่งสั้นได้ เพราะผู้รับเปิด Issue แล้วเห็นลิงก์ครบ. เมื่ออธิบายงานใหม่ให้ OWNER ให้แสดงทั้งสามลิงก์ด้วย.

## โครงสร้างองค์กรและการตรวจรับ

```text
OWNER
└── CEO (คุมภารกิจ, แต่งตั้ง DIR, QA, รับงานจาก DIR, Merge main)
    ├── DIR-A (ดูแลแผนก; สูงสุด 2 TL)
    │   ├── TL-A1 (ตรวจ Engineer; สูงสุด 2)
    │   │   ├── ENGINEER-A1-1
    │   │   └── ENGINEER-A1-2
    │   └── TL-A2 (เพิ่มเมื่อมีงานจริง; สูงสุด 2 Engineer)
    ├── DIR-B (เพิ่มเมื่อมีงานจริงโดยไม่เกินเพดาน)
    └── QA-REVIEWER (อิสระจากผู้เขียนโค้ด)
```

**AI ACTIVE ไม่เกิน 10 คนต่อภารกิจรวม CEO/DIR/TL/Engineer/QA**; ไม่ต้องตั้งคนเต็มอัตราในงานเล็ก. หากมีการมอบหมาย Engineer ต้องระบุสาย `CEO→DIR→TL→Engineer` จริง. QA ตรวจอิสระ. สายตรวจ: Engineer→TL→DIR→CEO→QA exact SHA→CEO Merge. ทุกแชทต้องรับ AP-ROLE และ ACK เอง; Issue ไม่ทำให้ AI เริ่มงานเอง.

## วิธีเริ่มงานใหม่

1. OWNER ส่งเป้าหมายและ **ลิงก์โปรเจกต์จริง**; ผู้แต่งตั้งระบุ 3 URL ใน AP-ROLE ของ CEO ใน `PROJECT_REPO`.
2. CEO เปิดกฎกลางฉบับล่าสุด ตรวจ `PROJECT_REPO/main`, CI/Issues/PRs/SHA, ลง ACK ในแชทของตน. ถ้าเป็นงานสืบต่อให้เก็บสถานะเดิม ไม่เริ่มใหม่จากศูนย์.
3. หากต้องแบ่งทีม ให้ CEO แต่งตั้ง DIR; DIR แต่งตั้ง TL; TL แต่งตั้ง Engineer; CEO แต่งตั้ง QA อิสระ. ทุก Issue ต้องมี `REPORTS_TO`, `EDITABLE_PATHS`, `START/HOLD`, `BASE_SHA`, `ACCEPTANCE`. หลีกเลี่ยงคน/ไฟล์ซ้ำและให้ OWNER ส่งข้อความต่อแชทใหม่เท่าที่จำเป็น.
4. พัฒนา Branch/Commit/PR ในโปรเจกต์ (หรือสำรองตามสิทธิ์), ทดสอบจริง; TL/DIR/CEO ตรวจ, QA อิสระลงผลสำหรับ **exact integrated SHA** ก่อน Merge `PROJECT_REPO/main`.
5. หลัง Merge ตรวจ CI/Deploy บน main แล้วทำ `PF` กับสาขาทำงานชั่วคราวทุกรีโปที่เกี่ยวข้อง โดยไม่ลบข้อมูลที่ยังใช้กู้คืน.

## ถ้า GitHub หรือเครื่องมือมีปัญหา

| ปัญหา | ทางปฏิบัติ |
|---|---|
| DNS/Clone ไม่ได้ | ตรวจ URL/Network, ใช้ connector อ่าน SHA, local copy ที่ได้รับอนุญาต; ไม่บอกว่า build ผ่านหากไม่ได้รัน |
| Timeout/429/5xx | ตรวจผลเดิมและ SHA, retry สูงสุดหนึ่งครั้งตามสาเหตุ/ระยะรอ; ไม่สร้าง commit/issue ซ้ำ |
| Conflict/Branch เปลี่ยน | Fetch HEAD ใหม่, ตรวจ Diff/เจ้าของไฟล์, ประสาน TL→DIR→CEO |
| CI RED | อ่าน Logs จริง, แก้ Regression, rerun SHA ปัจจุบัน; ห้าม Skip Tests |
| Save/Migration/Patch เสี่ยง | สำรอง Snapshot/Manifest/Checksums, Dry-run, Rollback ทดสอบบน Branch แยกก่อน |
| สิทธิ์/ความปลอดภัยปฏิเสธ | ตรวจสิทธิ์รายคำสั่ง, ขอช่องทางที่อนุญาต; ห้ามใช้รีโปสำรอง/บทบาทอื่นอ้อมการปฏิเสธ |
| ทุกช่องทางที่อนุญาตใช้ไม่ได้ | ZIP เป็นทางสุดท้าย: Patch, Source SHA, Manifest, SHA-256, Dry-run/Restore, ผล PASS/FAIL/NOT_RUN ตามจริง |

## เอกสารเริ่มต้นของทุกคน

- **[RULES.md](RULES.md)** — ข้อบังคับการตั้งทีม, สามรีโป, ขั้นตอนพัฒนา/ตรวจรับ, Backup/Recovery/Runbook, PF
- **[COMMANDS.md](COMMANDS.md)** — `AP-ROLE`, `MN`, `TR`, `ORG`, `BK`, `DR`, `ST`, `NX`, `PF`
- **[appointments/OWNER-TO-CEO.md](appointments/OWNER-TO-CEO.md)** — แบบ AP-ROLE CEO + แผนองค์กร + สามลิงก์
- **[appointments/ROLE-HANDOFF.md](appointments/ROLE-HANDOFF.md)** — แบบ AP-ROLE DIR/TL/Engineer/QA + สายรายงาน + สามลิงก์
- **[Staging_area README](https://github.com/tanawutmalirum29-ux/Staging_area)** — วิธีเก็บ Manifest, สำรองและคืนงาน

**รายงานตามจริง:** `C` เมื่อทำงานส่วนของตนสำเร็จจริง, `ER` เมื่อมีอุปสรรค, `ST` เมื่อถามสถานะ; Merge/QA/Backup ต้องมี Commit SHA, Issue/PR และผล Tests จริง. อย่าอ้างว่าล้างประวัติ/รีเซ็ต Issue เป็น #1 ได้จากการปิด Issue หรือการลบ Branch — การรีเซ็ตเลขและ history ต้องใช้ Repository ใหม่และมีขั้นตรวจการย้ายระบบ.
