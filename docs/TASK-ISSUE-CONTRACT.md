# ใบสั่งงานจริงสำหรับ AI 1 ตัว — Task Issue Contract V2

**ห้ามใช้เอกสารแต่งตั้งแทนใบสั่งงาน.** หลัง `APPOINTMENT_ACK` หัวหน้าตรงต้องสร้าง Task Issue ใน `ant-project` (หรือ `appointment-CEO` สำหรับงาน Governance เท่านั้น) ก่อนสั่งเริ่ม. Engineer, Lead, Director และ Deputy ทุกระดับใช้สัญญานี้กับ **ลูกน้องตรงของตัวเอง**.

## ชุดฟิลด์ที่หัวหน้าต้องกรอกจริง
```yaml
round_id: "ROUND-..."
task_id: "TASK-..."
sender_role_id: "PARENT-ROLE"              # must be direct parent
recipient_role_id: "CHILD-ROLE"            # one real chat and one primary owner
appointment_issue_url: "https://github.com/.../issues/N"
registry_version: "GOV-V2-CHARTER-..."
main_base_sha: "<40-character SHA>"
task_branch: "feat/round-task-owner"
target_branch: "<TEAM or DEPARTMENT branch, not main for Engineer>"
owned_paths: ["src/path-a.js"]
forbidden_paths: ["src/another-team/**"]
input_contract: "expected data/event/interface"
output_contract: "expected behavior, exact public interface"
dependencies: ["issue URL or NONE"]
acceptance_criteria: ["measurable condition 1", "measurable condition 2"]
required_tests: ["named command/workflow", "negative/edge scenario"]
auto_ci_trigger: "PR/push trigger actually supported, or BLOCKED"
report_issue_url: "https://github.com/.../issues/N"
reviewer_role_id: "DIRECT-PARENT"
next_recipient_role_id: "DIRECT-PARENT"
scope_risk: "low|medium|high"
stop_conditions: ["CI NOT_RUN","missing tools","scope conflict","unexpected main drift"]
```

**ข้อกำหนดก่อนสั่งเริ่ม:** Issue ต้องมีค่าจริง, SHA 40 ตัว, ผู้สั่ง/ผู้รับเป็นสายติดกันใน Registry, และเจ้าของไฟล์ไม่ซ้อนทับกับ Task ของเพื่อนร่วมทีมโดยไม่มีคำสั่ง Integration. ใครก็ตามที่ได้รับ Issue ที่มี Placeholder หรือ role identity ไม่ครบต้องตอบ `NEEDS_SCOPE` กลับหัวหน้าตรง ไม่สร้างงานจากความคาดเดา.

## การทำงานและตรวจรับ
- AI ผู้รับงานต้องเช็ค Source จริง, ทดลอง test/CI ตามสิทธิ, commit เฉพาะ path allowlist, เปิด Draft PR เข้า target branch ที่ได้รับอนุญาต, ตรวจ HEAD และ Link งานจริง; ไม่ Merge `main`.
- หัวหน้าตรงอ่าน Diff/Tests เอง, เลือก `ACCEPTED` หรือ `CHANGES_REQUESTED` พร้อม Repro. ข้อความที่ Owner ส่งต่อ **ไม่เกิน 3 บรรทัด** โดยตรงถึงหัวหน้าหรือผู้ใต้บังคับบัญชา 1 ชั้นตาม [Status SOP](TASK-STATE-AND-HANDOFF.md).
- หากงานไปชนไฟล์อีกฝ่าย ไม่สั่งข้ามหัว: เปิด `ACCESS_REQUEST/SCOPE_REQUEST` ผ่านตัวเองไป Common Ancestor เพื่อกำหนดเจ้าของ/สัญญาใหม่.
- `NOT_RUN` ไม่ใช่ `PASS`; เขียน `CAPABILITY_BLOCKED` พร้อมสิ่งที่ AI ทดลองแล้วหาก Connector/CI ไม่พร้อม ไม่ส่ง Owner ไปกดเอง.
- งานส่งขึ้น CEO เฉพาะเมื่อ Delivery ลงนามสุดท้ายบน **Release Candidate SHA เดียวกัน** และ QA อิสระรับรองจริง.

## ตัวอย่างเส้นทางหนึ่งงาน (ไม่ใช่การมอบหมายงานจริง)
`DCEO-EXP` ออก Task ให้ `VIS-DIR` → `VIS-DIR` ออก Subtask ให้ `VIS-TL1` → `VIS-TL1` แยก Task ให้ `VIS-E1` และ `VIS-E2`. แต่ละคนมี Issue, branch, allowed paths และ Tests ของตน. Engineer รายงาน Lead, Lead ส่ง Director, Director ส่ง Domain Deputy, Domain ส่ง Delivery. **ไม่มี CEO → VIS-E ตรง**.

## งานจบแล้ว
`ENGINEER_DELIVERED` ไม่เท่ากับ `TEAM_ACCEPTED` หรือ `RELEASED`. เจ้าของแต่ละระดับรายงานตาม [Task State & Handoff](TASK-STATE-AND-HANDOFF.md), ส่งข้อความพร้อม `Next recipient` และเข้า `STANDBY` เมื่อไม่มีงานที่ได้รับอนุมัติแล้ว.
