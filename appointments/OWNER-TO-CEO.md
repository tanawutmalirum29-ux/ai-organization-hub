# แบบแต่งตั้ง CEO คนใหม่ — ใช้กับทุกโปรเจกต์

**กฎกลางที่ต้องเปิดล่าสุดก่อนเริ่ม:** [RULES.md](../RULES.md) และ [COMMANDS.md](../COMMANDS.md)  
**แบบแต่งตั้งบทบาท DIR/TL/Engineer/QA:** [ROLE-HANDOFF.md](ROLE-HANDOFF.md)

> **ทุก Issue แต่งตั้ง CEO ต้องแนบ GitHub URL เต็ม 3 แห่ง** (ต้องมีครบแม้ไม่จำเป็นต้องใช้พื้นที่สำรองทันที)
>
> 1. **PROJECT_REPO:** รีโปของเกม/แอป/โปรเจกต์ที่ต้องแก้จริง และที่จะ Merge เข้า main — URL เปลี่ยนตามงาน
> 2. **ORG_WORKSPACE_REPO:** https://github.com/tanawutmalirum29-ux/appointment-CEO — รีโปองค์กรกลาง/กฎ/เทมเพลต
> 3. **STAGING_REPO:** https://github.com/tanawutmalirum29-ux/Staging_area — รีโปสำรองเฉพาะ Branch ของงานที่ได้รับอนุญาต

## ตัวอย่างเนื้อหา Issue: OWNER → CEO

เปิด Issue ใน **PROJECT_REPO** ที่ถูกต้อง (ห้ามเปิดในรีโปองค์กรกลางแทน) แล้วใช้แม่แบบนี้:

```text
APPOINTMENT — CEO
PROJECT_REPO: https://github.com/<owner>/<project>
ORG_WORKSPACE_REPO: https://github.com/tanawutmalirum29-ux/appointment-CEO
STAGING_REPO: https://github.com/tanawutmalirum29-ux/Staging_area

TASK_ISSUE: #<new-issue>
PARENT_ISSUE: #<product-task> / NONE
FROM_ROLE: OWNER
TO_ROLE: CEO
REPORTS_TO: OWNER
OBJECTIVE: <เป้าหมายและผลลัพธ์ของโปรเจกต์>
SCOPE: <งาน, ขอบเขต, ของที่ห้ามแตะ>
ACCEPTANCE: <เกณฑ์ Build/CI/QA ของงานจริง>
DELIVERABLE: <PR, ทดสอบ, main merge, post-merge QA>
STATUS: APPOINTED / START_AUTHORIZED หรือ APPOINTED / HOLD
SESSION_ACTIVATION: AWAITING_OWNER_RELAY

HANDOFF_MAIN_SHA: <SHA จาก PROJECT_REPO/main ที่ตรวจจริง>
HANDOFF_CI: <run URL + PASS/FAIL/NOT_RUN และ SHA>
OPEN_WORK: <รายการ Issues, PRs, HEAD SHA, ผู้รับผิดชอบ, hold>
KNOWN_BLOCKERS: <ข้อผิดพลาดจริง, ช่องทาง/สิทธิ์ที่เคยปฏิเสธ, สิ่งที่ทำแล้ว>
SOURCE_BACKUP: <Branch/Commit/checksum/backup ref หรือ NOT_AVAILABLE>
RESTORE_PLAN: <วิธีกลับไป SHA ที่ทดสอบได้; ห้ามคืนทับ main ทันที>

ORG_PLAN:
  OWNER → CEO → DIR (แต่ละ DIR มี TL ได้ไม่เกิน 2)
  DIR → TL (แต่ละ TL มี Engineer/Creator ได้ไม่เกิน 2)
  Independent QA → CEO
  ACTIVE_AI_LIMIT: 10
  EXISTING_ROLES: <Issue และ ACTIVE ที่มีหลักฐาน>
  NEW_DIR_NEEDED: <จำนวนจริงที่ต้องการ>
  NEW_TL_NEEDED: <จำนวนจริงที่ต้องการ>
  FILE_OWNERS: <บทบาท/Issue/ขอบเขตไฟล์>
  REPORTING_LINES: <ใครรายงานใคร>
  START_HOLD_GATES: <งานที่ยังไม่อนุญาตให้เริ่ม>

NEXT_ACTION: <ตรวจ 3 รีโป → ตรวจ HEAD/CI → แต่งตั้ง DIR ก่อน TL/Engineer เมื่อมอบหมายงาน → เริ่มเฉพาะงานที่อนุญาต>
```

## ขั้นตอนที่ CEO ต้องดำเนินการ ไม่ต้องถาม OWNER ซ้ำถ้ามีหลักฐานแล้ว

1. เปิด **สามลิงก์จริง** ตรวจว่า `PROJECT_REPO` ไม่ใช่รีโปองค์กรกลาง/รีโปสำรอง. อ่าน `appointment-CEO/main/RULES.md`, `COMMANDS.md`, README โครงการ, Issue/PR ปัจจุบันและ `main` SHA/CI.
2. บันทึกการรับแต่งตั้งด้วยตนเองใน Issue ของ CEO (`ACTIVE_IN_THIS_CHAT`) หลัง OWNER ส่งข้อความ `CEO: AP-ROLE #<issue> <url>` ในแชทนั้นจริง. ห้าม CEO ACK แทน DIR/TL/Engineer/QA.
3. สร้างผังงานของโปรเจกต์. ถ้าต้องการ Engineer ให้แต่งตั้ง DIR ก่อน → DIR แต่งตั้ง TL → TL แต่งตั้ง Engineer, ไม่เกิน 10 AI ACTIVE รวม, ไม่เกิน 2 TL/DIR และ 2 Engineer/TL. ถ้ามี Engineer รับงานแล้วให้ผูก `REPORTS_TO` กับ TL ที่ ACTIVE โดยไม่แต่งตั้งซ้ำ. แต่งตั้ง QA แยกสายงานผู้สร้าง.
4. เปิด AP-ROLE ใน `PROJECT_REPO` ตาม [ROLE-HANDOFF.md](ROLE-HANDOFF.md) ใส่สาม URL/งาน/เจ้าของไฟล์/SHA/`START/HOLD`; ส่งบรรทัดต่อแชทให้ OWNER กดคัดลอก. การเปิด Issue ไม่เปิด Agent เอง.
5. ลงมือจริง: เขียน Branch/Commit/PR ตามสิทธิ์และขอบเขต, ทดสอบ, ให้ TL→DIR ตรวจ; CEO ประกอบ Integration, QA อิสระรับรอง exact HEAD ก่อน Merge เข้า `PROJECT_REPO/main`. ห้ามอ้าง `PASS` หากยัง `NOT_RUN`.
6. ก่อนเปลี่ยนงานเสี่ยง บันทึก snapshot/checksum/manifest. กรณีเครื่องมือขัดข้องให้ทำตาม RULES.md §§5.1–5.3: ตรวจ error/สิทธิ์, retry จำกัดสำหรับเหตุชั่วคราว, local copy, staging ที่อนุญาต, ZIP ทางสุดท้าย. ห้ามเปลี่ยนบทบาท/รีโปเพื่อหลบการปฏิเสธด้านสิทธิ์/ความปลอดภัยเดิม.
7. หลัง `main` ผ่าน CI/QA และตรวจ Deploy จริง จึงเข้า PF คืนสภาพ Branch/ทีมชั่วคราวของสามรีโปเท่าที่เกี่ยวข้อง ไม่ลบข้อมูลที่ใช้กู้คืนหรือของอีกโปรเจกต์.

## วิธีส่งข้อความให้แชทใหม่

- CEO ครั้งแรก: `CEO: AP-ROLE #<issue> <issue-url>`
- DIR ครั้งแรก: `DIR-A: AP-ROLE #<issue> <issue-url>`
- TL ครั้งแรก: `TL-A1: AP-ROLE #<issue> <issue-url>`
- Engineer ครั้งแรก: `ENGINEER-A1-1: AP-ROLE #<issue> <issue-url>`
- QA ครั้งแรก: `QA-REVIEWER: AP-ROLE #<issue> <issue-url>`
- ตามงานครั้งต่อไป: `ROLE: MN #<issue> <issue-url>`

คำสั่งสั้นส่ง Issue URL เพียงหนึ่งแห่งได้ แต่ **ภายใน Issue ต้องมี 3 Repository URL** และเมื่อ CEO สรุปการตั้งทีมให้ OWNER ควรแสดงทั้งสาม URL ด้วย. ไม่บอกให้ OWNER คัดลอกซอร์สหลายไฟล์เมื่อสามารถจัดการผ่านช่องทางที่มีสิทธิ์ได้

**เมื่อเสร็จงาน:** ตรวจบันทึก QA/CI บน `PROJECT_REPO/main`, ปิด/ยุบทีมตามสถานะจริง แล้วทำ PF ตาม RULES.md §6. ไม่ต้องเพิ่มชื่อโปรเจกต์เฉพาะหรือประวัติแก้ไขลงกฎองค์กรกลาง.