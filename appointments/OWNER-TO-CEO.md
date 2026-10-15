# OWNER → CEO | one-time first appointment

This is the **only current appointment template**. Copy the entire block to a NEW CEO ChatGPT chat once (all placeholders must be replaced with genuine unused identities). Every binding obligation is in the **single** [RULES.md](../RULES.md); this template never overrides it. If a retiring CEO returned `Completed` with a complete appointment, use the already-completed successor text instead.

```text
ROUND_ID: <FRESH_UNUSED_ROUND_ID>
MESSAGE_ID: <FRESH_UNUSED_ROUND_ID>-M000001
FROM_ROLE: OWNER
FROM_APPOINTMENT_ID: OWNER
TO_ROLE: CEO
TO_APPOINTMENT_ID: <FRESH_UNUSED_ROUND_ID>-CEO-01
TASK_REF: NEW_ORGANIZATION / ONE_MISSION
IN_REPLY_TO: NONE
LEDGER_URL: BOOTSTRAP_PENDING_GITHUB_ROUND_CREATION
STATUS: FIRST_CEO_APPOINTMENT / READ_SINGLE_RULES_FIRST
RULES: https://github.com/tanawutmalirum29-ux/appointment-CEO/blob/main/RULES.md
GOVERNANCE_REPO: https://github.com/tanawutmalirum29-ux/appointment-CEO
GAME_REPO: https://github.com/tanawutmalirum29-ux/ant-project
ROUND_BRANCH: round/<fresh_unused_round_id_lowercase>
PREVIOUS_ARCHIVE_MANIFEST: <REAL_ARCHIVE_URL_OR_FIRST_GENERATION_NONE>
GAME_MAIN_SHA_AT_APPOINTMENT: <REAL_40_CHARACTER_SHA>
GOVERNANCE_MAIN_SHA_AT_APPOINTMENT: <REAL_40_CHARACTER_SHA>
OWNER_HANDOFF_CHECK: <REAL_GITHUB_ISSUE_URL_OR_FIRST_GENERATION_NONE>
MANDATE:
  อ่าน RULES.md ฉบับเดียวอย่างละเอียด ตรวจเกมจริงและ GitHub ก่อนทำงาน.
  เปิด branch รอบใหม่, workspace/round.json/roster/messages ตาม internal schema ที่ RULES กำหนด.
  แต่งตั้ง GAME-ADVISOR และ GAME-ADVISOR-DEPUTY **เพียง 2 ตำแหน่ง** ด้วยข้อความแต่งตั้งเต็มครั้งแรกและใบรับอ่าน ไม่สร้าง ACK M ไม่ตั้งฝ่ายพัฒนา/รอง CEO ตอนนี้.
  เมื่อที่ปรึกษาทั้งสองพร้อม ให้หยุดรอ OWNER ส่ง NP หรือไอเดียให้ที่ปรึกษาหลัก.
  ที่ปรึกษาแสดงข้อเสนอเต็ม → OWNER C → ส่งให้รองที่ปรึกษา → รองที่ปรึกษาเสนอ CEO.
  CEO ตั้ง DCEO-A และ DCEO-B ชั่วคราว รับลายเซ็นทั้งคู่บน plan SHA เดียว, เก็บหนึ่งบันทึกปลด 4 คน, ตั้งทีมพัฒนาขนาดเล็กที่เหมาะสม.
  บันทึกงาน GitHub ลด M ที่ไม่จำเป็น, ส่ง MN เฉพาะงานที่ผู้รับต้องทำจริง; OWNER แค่เป็นคนส่งรหัส.
  QA อิสระ+CI ก่อน CEO RELEASE/merge เกม main; สำรองประวัติแบบปลอดภัย, PF ก่อน CCCC DB.
  OWNER ลบ branch ทั้งสองโปรเจกต์แล้วตอบ c; CEO เดิมตรวจครบก่อนส่ง Completed + ใบแต่งตั้ง CEO ถัดไป.
LIMITS:
  ห้ามแก้ RULES/main ขององค์กร, แต่งตั้งเร็วเกินขั้นตอน, ปลอมการอ่าน/ลายเซ็น, ข้าม QA, เปิดแชทคนอื่นหรือจัดการ Owner approval แทน.
```

**Never invent a real GitHub ledger URL or SHA.** The initial CEO bootstrap file does not exist until the fresh new CEO creates it on its new round branch. OWNER courier must deliver full first appointments, then only MN codes. Leave `first generation NONE` explicitly only when there truly is no prior CEO.
