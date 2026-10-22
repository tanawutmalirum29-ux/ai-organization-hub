# แบบแต่งตั้งสากล — DIR / TL / ENGINEER / QA

[กฎกลาง](../RULES.md) · [คำสั่ง](../COMMANDS.md) · [แต่งตั้ง CEO](OWNER-TO-CEO.md)

**ใช้กับทุกโปรเจกต์และทุกบทบาท โดยคัดลอกลง Issue ใหม่ใน `PROJECT_REPO` เท่านั้น**. ผู้รับงานต้องเปิดเอกสาร `main` ปัจจุบันก่อนเริ่ม.

## ลิงก์สามแห่งที่ต้องมีครบ

- `PROJECT_REPO`: URL เต็มของเกม/แอป/งานที่กำลังทำจริง (เปลี่ยนตามงานและห้ามเดา)
- `ORG_WORKSPACE_REPO`: https://github.com/tanawutmalirum29-ux/appointment-CEO
- `STAGING_REPO`: https://github.com/tanawutmalirum29-ux/Staging_area

## คัดลอกแบบแต่งตั้ง

```text
AP-ROLE
PROJECT_REPO: https://github.com/<owner>/<project>
ORG_WORKSPACE_REPO: https://github.com/tanawutmalirum29-ux/appointment-CEO
STAGING_REPO: https://github.com/tanawutmalirum29-ux/Staging_area

PARENT_ISSUE: #<master-task>
TASK_ISSUE: #<new-role-issue>
FROM_ROLE: <CEO | DIR-ID | TL-ID | OWNER>
TO_ROLE: <DIR-A | TL-A1 | ENGINEER-A1-1 | QA-REVIEWER>
REPORTS_TO: <CEO# | DIR# | TL#>
TEAM_PATH: <OWNER/CEO#79/DIR-A#.../TL-A1#.../ENGINEER-A1-1#...>
ORG_CAPACITY: <ACTIVE คนปัจจุบัน / 10, DIR TL x/2, TL Engineer y/2>
OBJECTIVE: <งานที่ได้รับ>
SCOPE: <ขอบเขตการทำจริง>
EDITABLE_PATHS: <ระบุไฟล์หรือโฟลเดอร์ชัด ห้ามซ้ำกับเจ้าของอื่น>
READ_ONLY_PATHS: <ไฟล์ที่อ่านได้แต่ห้ามเขียน>
BASE_BRANCH: <branch ที่ตรวจ>
BASE_SHA: <commit hash ที่ตรวจ>
INTEGRATION_PR: #<pr> / NOT_YET
DELIVERABLE: <PR / ไฟล์ / QA>
ACCEPTANCE: <สิ่งที่ทดสอบและหลักฐานต้องส่ง>
REVIEWER: <TL → DIR → CEO; QA แยก>
BACKUP_REF: <source snapshot/commit/checksum หรือ NOT_YET>
RESTORE_PLAN: <dry-run, rollback ref>
KNOWN_BLOCKERS: <สิทธิ์/CI/อื่น ๆ ตามจริง>
STATUS: APPOINTED / START_AUTHORIZED หรือ APPOINTED / HOLD
SESSION_ACTIVATION: AWAITING_OWNER_RELAY
NEXT_ACTION: <ขั้นแรกที่ทำได้จริง>
```

## ผู้แต่งตั้งมีหน้าที่

- **CEO แต่งตั้ง DIR** และแต่งตั้ง QA อิสระ; รับผิดชอบการเชื่อมชิ้นงานสุดท้ายและ Merge main.
- **DIR แต่งตั้ง TL** ได้สูงสุด 2 ทีมในแผนกตนเอง; บันทึก `REPORTS_TO` และแยกภาระงานจริง.
- **TL แต่งตั้ง Engineer** ได้สูงสุด 2 คนในทีมตน; บันทึกไฟล์ที่แก้ได้ไม่ซ้ำกัน; ส่งรีวิว DIR.
- **QA** รับรายงานจาก CEO ได้โดยตรง, ไม่มีอำนาจแก้ Production หรือ Merge main ในภารกิจที่ตรวจ.
- ถ้าบทบาท/Engineer มี Issue เดิมอยู่แล้ว ให้ผูกสังกัดด้วย `REPORTS_TO` ใหม่พร้อม ACK จริง ไม่เปิด role/Branch ซ้ำเพียงเพราะปรับผัง.
- รักษาเพดาน AI ที่ ACTIVE รวมกันไม่เกิน 10 ในภารกิจ ไม่ตั้งตำแหน่งว่างเป็นตัวแทนผู้ทำงาน.
- ส่ง AP-ROLE ให้ OWNER เป็นบรรทัดเดียว `ROLE: AP-ROLE #<issue> <issue-url>`; ชื่อสามรีโปมีอยู่ใน Issue แล้ว. ผู้รับต้องยืนยันในแชทตัวเอง ไม่ใช่ผู้แต่งตั้งรับทราบแทน.

## หลักฐานที่ต้องรายงานทุก MN

```text
ROLE:
REPORTS_TO:
PROJECT_REPO:
ORG_WORKSPACE_REPO:
STAGING_REPO:
ISSUE:
HEAD_SHA:
EDITABLE_PATHS:
CHANGED_PATHS:
CI/TESTS: PASS | FAIL | NOT_RUN (+ URL/SHA)
REVIEW_STATUS:
BLOCKER:
BACKUP_REF:
NEXT_ACTION:
```

เมื่อติดขัดให้ใช้ [RULES.md §§5.1–5.3](../RULES.md) เพื่อแยกปัญหาชั่วคราวกับการปฏิเสธสิทธิ์, สำรองงาน/ย้อนกลับ, ทดสอบจริง และรายงาน `HOLD` แทนคำกล่าวอ้างว่าเสร็จ. เปิด PR หรือมี ZIP อย่างเดียวไม่เท่ากับ Merge เข้า `PROJECT_REPO/main`.
