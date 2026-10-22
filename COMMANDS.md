# คำสั่งย่อสำหรับทุกบทบาท

**กฎบังคับ:** [RULES.md](RULES.md)
**รีโป 3 แห่งของทุก AP-ROLE:** `PROJECT_REPO` = รีโปงานจริง, `ORG_WORKSPACE_REPO` = https://github.com/tanawutmalirum29-ux/ai-organization-hub, `STAGING_REPO` = https://github.com/tanawutmalirum29-ux/Staging_area. ต้องเขียน **ทั้ง 3 URL เต็ม** ใน Issue แต่งตั้งและ Handoff (ไม่ใช่ส่งเพียงชื่อย่อ).  
เมื่อได้รับ `AP-ROLE`, `MN`, `I` หรือมีข้อสงสัย ให้อ่านกฎและคำสั่งจาก `ai-organization-hub/main` ล่าสุดก่อนทำงาน และใช้ `PROJECT_REPO` ของงานปัจจุบันเท่านั้น

| คำสั่ง | สิ่งที่ต้องทำ |
|---|---|
| `I` | แสดงเมนูคำสั่งนี้สั้น ๆ ตามบทบาท |
| `C` | รับทราบ/ไม่มีงานส่งต่อ; ตอบ `C` เท่านั้นเมื่อทำงานที่ได้รับมอบหมายเสร็จจริง ไม่ใช้เป็นอนุมัติ Merge |
| `MN` / `MN #<issue>` | อ่าน Issue/PR ล่าสุดและ 3 รีโป ตรวจ SHA/บทบาท/ขอบเขต แล้วลงมือทำจริง; ถ้าติดปัญหาให้ใช้ RULES.md §§5.1–5.3 พร้อมบันทึกหลักฐาน |
| `TR` | เก็บ error จริง จัดประเภท network/timeout/CI/permission/safety, ตรวจ SHA/side effects แล้ว retry สูงสุดหนึ่งครั้งเมื่อเป็นเหตุชั่วคราว; ห้ามเลี่ยงการบล็อกสิทธิ์/ความปลอดภัย |
| `ST` | สถานะสั้น ๆ พร้อมสิ่งที่ค้างและหลักฐานจริง |
| `FAST` | ทำต่อในขอบเขตเดิมโดยลดการรายงานระหว่างขั้น แต่ไม่ละ QA |
| `NX` / `MN-ROLE` | แสดงข้อความหนึ่งบรรทัดที่ OWNER ต้องส่งไปแชทผู้รับถัดไป |
| `AP-ROLE` | OWNER แต่งตั้ง PROJECT LEAD (ชื่อ CEO ใช้ได้); Lead แต่งตั้ง Engineer/Creator/QA/Coordinator โดยตรง ไม่ต้องผ่าน DIR/TL; Issue ต้องมีสาม URL, REPORTS_TO, ขอบเขตไฟล์, SHA, START/HOLD, ผู้ตรวจรับและชื่อ Issue |
| `MQ` | ตรวจ Issue/PR หรือคำขอที่รอการตอบกลับจริง |
| `BR` | สรุปงานทั้งหมดและลำดับที่ต้องทำ |
| `Q` | ตอบข้อสงสัยเกี่ยวกับงาน |
| `H` | ขอความช่วยเหลือสำหรับงานที่เกินขอบเขต |
| `SYNC` | ตรวจเทียบ Branch, Issue, PR และ Commit กับ GitHub |
| `CI` | ตรวจ CI/Build/Tests สำหรับ SHA เป้าหมาย |
| `RV` | ขอ Review/QA ที่เป็นอิสระเมื่อจำเป็น |
| `SIM` | รันทดสอบจริงหรือจำลองระบบตามงาน ระบุ `REAL/SYNTHETIC`, `PASS/FAIL/NOT_RUN` ตามจริง |
| `ORG` | ตรวจโครงสร้าง OWNER→PROJECT LEAD→WORKER/QA, Coordinator เป็นทางเลือก, AI ACTIVE รวมไม่เกิน 10, สาย REPORTS_TO/ACK จริง, ไฟล์ทับซ้อนและงานที่ค้าง |
| `BK` | สร้าง/ตรวจ backup โดยอิง SHA, Manifest, Checksums และ Restore Test ตาม RULES.md §5.2 ก่อนเปลี่ยนงานที่เสี่ยง |
| `DR` | ทดสอบกู้คืนจาก backup ใน Branch/สำเนาแยกโดยไม่แก้ `main`; แสดงผลการทดสอบจริง |
| `SW` / `RC` | ส่งต่อหรือกู้บริบทจาก Issue/PR/Commit จริง |
| `NP` | ขอข้อเสนอปรับปรุงจากผู้มีหน้าที่ Advisor หากได้รับแต่งตั้ง |
| `BL` / `WHY` | รายงานเหตุผลที่ติดขัดโดยอ้างหลักฐาน |
| `P` | สถานะกำลังดำเนินการ |
| `B` | สถานะติดข้อจำกัด |
| `ER` | แจ้งข้อผิดพลาดหรือสิทธิ์ไม่เพียงพอตามความจริง |
| `PF` | ตรวจและดำเนินการล้างหลังส่งมอบตาม RULES.md §6 |
| `CCCC DB` | ยืนยันจบภารกิจและเรียกขั้น `PF` |
| `c` | ตรวจผลปิดงาน/ล้างข้อมูลอีกครั้ง |
| `Completed` | ยืนยันส่งมอบและ QA แล้ว; ใช้ `Completed/CLEAN` ก็ต่อเมื่อ Cleanup ผ่านการตรวจจริง |

## ตรวจข้อมูลก่อนตอบ OWNER

ทุกคำสั่งทำงานให้ระบุภายใน Issue/PR: `PROJECT_REPO`, `ORG_WORKSPACE_REPO`, `STAGING_REPO`, `ROLE`, `REPORTS_TO`, `TASK_ISSUE`, `BASE_SHA`, `HEAD_SHA`, `TESTS`, `BLOCKER`, `NEXT_ACTION`. Lead ไม่ลง `ACK` แทนผู้ปฏิบัติงาน/QA และไม่แต่งตั้ง DIR/TL เพียงเพื่อเปิดงานให้ Engineer. หากแสดงแผนเริ่มงาน/แต่งตั้งให้ OWNER ให้แนบ 3 ลิงก์เสมอ; คำสั่งส่งต่อแบบสั้นใช้ลิงก์ Issue เดียวได้เพราะใน Issue มี 3 ลิงก์ครบ.

## วิธีส่งต่อ

- ครั้งแรก: `ROLE: AP-ROLE #<issue> <issue-url>`
- ครั้งถัดไป: `ROLE: MN #<issue> <issue-url>`
- ไม่มีงานส่งต่อ: `C`
- ต้องแจ้งปัญหา: `ER: <สาเหตุจริง>`

เนื้อหาทางเทคนิคให้เขียนที่ Issue/PR ของ `PROJECT_REPO`; AI แต่ละแชทต้องเปิดอ่านและทำงานเอง ไม่สมมติว่าได้รับข้อความหรือยืนยันแทนแชทอื่น

**องค์กรแบบสั้น:** `OWNER → PROJECT LEAD → ENGINEER/CREATOR` พร้อม `QA` อิสระ; `COORDINATOR` เพิ่มเฉพาะภารกิจใหญ่และไม่เป็น Gate บังคับ. บทบาท CEO/อดีต DIR/TL ใช้ต่อได้ตามการโอนงาน ไม่ต้องตั้งใหม่ทั้งทีม.

**พื้นที่ทำงานสำรอง:** [ai-organization-hub](https://github.com/tanawutmalirum29-ux/ai-organization-hub) (Branch `work/<project>/...`) และ [Staging_area](https://github.com/tanawutmalirum29-ux/Staging_area) (Branch `stage/<project>/...`) เฉพาะเมื่อมีสิทธิ์และไม่มีการห้ามเดิม; งานสุดท้ายต้องกลับ PR/QA/Merge ที่ `PROJECT_REPO/main`. ลำดับ: ซ่อมจุดเดิม → retry อย่างจำกัด → local backup → staging ที่อนุญาต → ZIP ทางสุดท้าย. อ่าน RULES.md §§5.1–5.3.

## การปิดงาน

เมื่อ Merge/ส่งมอบบน `main` และตรวจผ่านแล้ว ให้เข้าสู่ `PF` โดยอัตโนมัติ. ล้าง Branch และสิ่งชั่วคราวตามสิทธิ์. ถ้าต้องการประวัติ Commit ใหม่หรือ Issue เริ่มที่ #1 ต้องสร้าง Repository ใหม่จาก snapshot ที่ตรวจแล้ว; ไม่สามารถรีเซ็ตด้วยการปิด Issue หรือแก้ README อย่างเดียว. หากยังไม่ล้างครบ ใช้ `Completed/CLEANUP_BLOCKED` และแจ้งสิ่งที่ค้างตามจริง
