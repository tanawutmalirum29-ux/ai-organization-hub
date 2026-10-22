# แบบแต่งตั้งผู้ปฏิบัติงานและ QA — องค์กรสายสั้น

[กฎกลาง](../RULES.md) · [คำสั่ง](../COMMANDS.md) · [แต่งตั้ง Project Lead](OWNER-TO-LEAD.md)

โครงสร้างใหม่: **OWNER → PROJECT LEAD/CEO → ENGINEER/CREATOR/QA โดยตรง**. Coordinator/Reviewer เพิ่มได้เฉพาะเมื่อภารกิจใหญ่และไม่เป็นขั้นบังคับ; DIR/TL เดิมสามารถทำหน้าที่นี้ได้โดยไม่สร้างคนใหม่.

## ลิงก์ 3 แห่งที่ต้องอยู่ในทุก AP-ROLE

- `PROJECT_REPO:` URL เต็มของโปรเจกต์/เกม/แอปที่รับงานจริง
- `ORG_WORKSPACE_REPO:` https://github.com/tanawutmalirum29-ux/ai-organization-hub
- `STAGING_REPO:` https://github.com/tanawutmalirum29-ux/Staging_area

## แม่แบบสำหรับ Engineer / Creator / QA / Coordinator

เปิด Issue ใน `PROJECT_REPO` ปัจจุบัน:

```text
AP-ROLE
PROJECT_REPO: https://github.com/<owner>/<project>
ORG_WORKSPACE_REPO: https://github.com/tanawutmalirum29-ux/ai-organization-hub
STAGING_REPO: https://github.com/tanawutmalirum29-ux/Staging_area
PARENT_ISSUE: #<master-task>
TASK_ISSUE: #<role-issue>
FROM_ROLE: PROJECT_LEAD / CEO
TO_ROLE: ENGINEER / CREATOR / QA-REVIEWER / COORDINATOR
REPORTS_TO: PROJECT_LEAD #<issue>
OBJECTIVE: <เป้าหมาย>
SCOPE: <งานที่รับผิดชอบ>
EDITABLE_PATHS: <ไฟล์/โฟลเดอร์ที่แก้ได้>
READ_ONLY_PATHS: <ไฟล์ที่ห้ามแก้>
BASE_SHA: <source SHA from project>
BRANCH: <owned branch / REVIEW_ONLY>
DELIVERABLE: <PR/tests/report>
ACCEPTANCE: <checks and QA rules>
REVIEWER: PROJECT_LEAD, independent QA for release
KNOWN_BLOCKERS: <if any>
BACKUP_REF: <commit/checksum or NOT_YET>
RESTORE_PLAN: <how to test restoring on disposable branch>
STATUS: APPOINTED / START_AUTHORIZED or HOLD
SESSION_ACTIVATION: AWAITING_OWNER_RELAY
NEXT_ACTION: <one actionable step>
```

## วิธีสื่อสารและตรวจรับ

- Lead เปิด Issue แล้วส่งคำสั่ง `ROLE: AP-ROLE #<issue> <issue-url>` ให้ OWNER ส่งเข้าแชทผู้รับ. ผู้รับ ACK เอง; ไม่ลงชื่อแทน.
- **Engineer/Creator → Project Lead**: Code/Tests/PR+SHA; หากขอเปลี่ยนไฟล์นอกขอบเขตส่ง `API_REQUEST` ให้ Lead โดยตรง.
- **QA → Project Lead**: ผลตรวจอิสระ ระบุ exact SHA, PASS/FAIL/NOT_RUN; QA ไม่แก้ Production ที่ตนตรวจ.
- **Coordinator (ทางเลือก) → Lead**: ช่วยวิเคราะห์/ติดตาม/รีวิวแบบไม่เป็นด่านบังคับและไม่มีสิทธิ์ Merge main เว้น OWNER อนุมัติ.
- ทุกภารกิจ ACTIVE AI ไม่เกิน 10 คน; ไม่ตั้งคนเพิ่มเพียงเพื่อเติมผัง และไม่แต่งตั้งตำแหน่งเดิมซ้ำเมื่อเปลี่ยนสายรายงาน.
- เมื่อรับ `MN` ตรวจ source of truth: สาม URL, Issue, SHA, PR/CI, owned files, backup, `NEXT_ACTION`. ลงมือจริงแล้วบันทึกผลใน Issue ไม่เพียงส่ง ACK.
- ปัญหา GitHub/Source/CI/Save ให้ใช้ [RULES.md §§5.1–5.3](../RULES.md) ตรวจต้นเหตุและกู้คืนในช่องทางที่ได้รับอนุญาต; ห้ามใช้ role/repo ใหม่เพื่อหลบการปฏิเสธสิทธิ์/ความปลอดภัย.
