# แต่งตั้ง PROJECT LEAD — ใช้กับทุกโปรเจกต์

**บทบาทกลาง:** `PROJECT_LEAD` รับผิดชอบการส่งมอบโครงการ; สามารถใช้ชื่อ `CEO`, `LEAD` หรือ `MANAGER` ได้ตามที่ OWNER กำหนด โดย **ไม่บังคับ DIR/TL**.

**กฎ:** [RULES.md](../RULES.md) · [คำสั่งย่อ](../COMMANDS.md) · [แต่งตั้งผู้ปฏิบัติงาน](ROLE-HANDOFF.md)

## สามลิงก์ที่ต้องระบุในทุก Issue

- `PROJECT_REPO:` URL เต็มของโปรเจกต์จริงที่ OWNER ให้ทำ และที่จะ Merge เข้า `main`
- `ORG_WORKSPACE_REPO:` https://github.com/tanawutmalirum29-ux/ai-organization-hub
- `STAGING_REPO:` https://github.com/tanawutmalirum29-ux/Staging_area

## แบบ Issue: OWNER → PROJECT LEAD

เปิด Issue นี้ใน **PROJECT_REPO** ที่ถูกต้อง:

```text
AP-ROLE — PROJECT LEAD
PROJECT_REPO: https://github.com/<owner>/<project>
ORG_WORKSPACE_REPO: https://github.com/tanawutmalirum29-ux/ai-organization-hub
STAGING_REPO: https://github.com/tanawutmalirum29-ux/Staging_area
FROM_ROLE: OWNER
TO_ROLE: PROJECT_LEAD / CEO / LEAD / MANAGER
REPORTS_TO: OWNER
TASK_ISSUE: #<issue>
PARENT_MISSION: #<issue> / NONE

OBJECTIVE: <สิ่งที่ต้องส่งมอบ>
SCOPE: <งาน/ไฟล์/ความเสี่ยง/ข้อห้าม>
DELIVERABLE: <PR, files, tests, product main>
ACCEPTANCE: <เกณฑ์ทดสอบตามโปรเจกต์>
STATUS: APPOINTED / START_AUTHORIZED หรือ HOLD
SESSION_ACTIVATION: AWAITING_OWNER_RELAY

CURRENT_MAIN_SHA: <full verified SHA>
CURRENT_CI: <run URL and PASS/FAIL/NOT_RUN for that SHA>
OPEN_WORK: <Issues/PRs/branch SHA and owners>
KNOWN_BLOCKERS: <error and restrictions with evidence>
BACKUP_REF: <tested snapshot or NOT_AVAILABLE>
RESTORE_PLAN: <restore/test in disposable branch, PR back>
ORG_PLAN:
  DIRECT_REPORTS: <worker issues and file scopes>
  INDEPENDENT_QA: <issue or NOT_REQUIRED_BY_SCOPE>
  OPTIONAL_COORDINATOR: <issue or NONE>
  ACTIVE_LIMIT: 10
  FILE_OWNERS: <disjoint writable paths>
NEXT_ACTION: <first real task>
```

## Lead เริ่มงานอย่างไร

1. OWNER ส่ง `PROJECT-LEAD: AP-ROLE #<issue> <url>` หรือ `CEO: AP-ROLE #<issue> <url>` เข้า **แชทใหม่**. ผู้รับเปิด 3 รีโป/กฎล่าสุดและตรวจสถานะ GitHub จริง, ACK เฉพาะเมื่อได้รับคำสั่งจริง.
2. Lead ดึงสถานะ `PROJECT_REPO/main`, CI, PR, Issues และ SHA; ถ้าเป็นงานสืบต่อ ให้รักษาหลักฐาน ไม่รีเซ็ตงานที่ค้าง.
3. Lead แต่งตั้ง **Engineer/Creator/QA โดยตรง** จาก [ROLE-HANDOFF.md](ROLE-HANDOFF.md). ไม่ต้องตั้ง DIR, TL หรือ Coordinator เพื่อให้ Worker เริ่มงาน. Coordinator เป็นทางเลือกสำหรับหลาย Workstream โดยไม่เป็นด่านอนุมัติ.
4. Lead อนุมัติ `EDITABLE_PATHS` ให้แต่ละ Worker ไม่ซ้ำกัน, ตรวจ Review/Tests/CI, ขอ QA อิสระเมื่อจำเป็นและอนุมัติ exact integrated SHA ก่อน Merge ตามอำนาจ.
5. เมื่อ GitHub ใช้งานผิดปกติ ใช้ RULES.md §§5.1–5.3: ตรวจสาเหตุ, Retry เหตุชั่วคราวอย่างจำกัด, สำรอง/ทดสอบกู้คืน, Staging ที่ได้รับอนุญาต, ZIP เป็นทางสุดท้าย. ห้ามเปลี่ยนรีโป/บทบาทเพื่อหลบการปฏิเสธด้านสิทธิ์หรือความปลอดภัย.
6. หลัง `main` ผ่าน Post-merge CI และเสร็จงานจริง ให้ใช้ `PF` เพื่อล้างเฉพาะงานชั่วคราวที่ปลอดภัย โดยไม่ลบ Backup จุดเดียวหรือ PR/Branch ของคนอื่น.

**การเปลี่ยนทีมเดิม:** ถ้ามี CEO อยู่แล้วให้ใช้เป็น PROJECT_LEAD ได้เลย; Engineer/QA เดิมเปลี่ยน `REPORTS_TO` มาที่ Lead โดยตรง; DIR ที่ ACTIVE อาจช่วยเป็น Coordinator ตามขอบเขต, ส่วน TL ที่ยังไม่ได้รับงานจริงให้ระบุ SUPERSEDED. ไม่แต่งตั้งบทบาทซ้ำหรือปิด Product Issue เพราะเปลี่ยนผัง.
