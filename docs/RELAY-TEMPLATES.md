# ข้อความ 3 บรรทัดที่ AI ต้องสร้างเองให้ Owner คัดลอก (V2)

**ใช้หลังจากบันทึก GitHub Issue/PR/Comment ที่มี URL จริงแล้วเท่านั้น**. เติมทุกวงเล็บมุมด้วยค่าจริงก่อนแสดงข้อความ. ส่งต่อทีละ **หนึ่ง direct parent/child edge**. ไม่มีการส่งจากแชทหนึ่งไปอีกแชทโดยอัตโนมัติ.

## 1) แต่งตั้ง (หัวหน้าตรง → ผู้ใต้บังคับบัญชา)
`<ROUND> <PARENT> → <CHILD> | APPOINTMENT_ISSUED | Scope/Charter: <ID>`
`GitHub appointment: <REAL ISSUE URL>; Read: https://github.com/tanawutmalirum29-ux/appointment-CEO/blob/main/docs/ROLE-START-HERE.md`
`Next recipient: <CHILD> | อ่านกฎ/สกิล/สิทธิ์ โพสต์ ACK แล้วตอบหัวหน้าตรง; ยังไม่ทำเกม`

## 2) รับตำแหน่ง (ลูกน้อง → หัวหน้าตรง)
`<ROUND> <CHILD> → <PARENT> | APPOINTMENT_ACK / SKILL_READY or SKILL_GAP`
`GitHub report: <REAL ACK COMMENT URL>`
`Next recipient: <PARENT> | ยืนยันรับตำแหน่งและมอบ Task ที่มี Scope หรือให้ STANDBY`

## 3) รับงานเสร็จของ Engineer (Engineer → Lead)
`<ROUND> <ENGINEER> → <TEAM-LEAD> | ENGINEER_DELIVERED or BLOCKED | PR <N> | HEAD <SHA>`
`GitHub report: <REAL ISSUE COMMENT URL>`
`Next recipient: <TEAM-LEAD> | ตรวจ Source, CI, Limits แล้ว ACCEPT หรือ CHANGES_REQUESTED`

## 4) หัวหน้าทีม/แผนกตรวจรับ (Lead → Director หรือ Director → Deputy)
`<ROUND> <SENDER> → <DIRECT_PARENT> | TEAM_ACCEPTED or DEPARTMENT_ACCEPTED | HEAD <SHA>`
`GitHub report: <REAL ISSUE COMMENT URL>`
`Next recipient: <DIRECT_PARENT> | ตรวจรวมของระดับถัดไปบน SHA จริง`

## 5) รองฝ่ายตรวจรับ/ไม่ผ่าน (Deputy → Delivery)
`<ROUND> <DOMAIN-DEPUTY or QA-DEPUTY> → DCEO-DELIVERY | DOMAIN_SIGNED / INDEPENDENT_QA_SIGNED / HOLD | CANDIDATE <40SHA>`
`GitHub report: <REAL SIGNATURE URL + CI/ARTIFACT LINK>`
`Next recipient: DCEO-DELIVERY | ตรวจ required signers ให้ครบหรือส่ง Rework ตามสาย`

## 6) รอง Delivery ส่งให้ CEO เป็นครั้งสุดท้าย (Delivery → CEO)
`<ROUND> DCEO-DELIVERY → CEO | DELIVERY_SIGNED / SIGNATURE_HOLD | CANDIDATE <40SHA>`
`GitHub report: <REAL LAST SIGNATURE URL + FINAL PR>`
`Next recipient: CEO | ตรวจ Signatures/HEAD/Required CI และตัดสิน Merge main หรือคืนแก้`

## 7) CEO รายงาน Owner เมื่อ Release / HOLD
`<ROUND> CEO → OWNER | RELEASED / RELEASE_HOLD | main <40SHA or UNCHANGED>`
`GitHub report: <REAL RELEASE OR HOLD URL>`
`Next recipient: OWNER | INFORMATION ONLY / เลือกเป้าหมายรอบใหม่เมื่อพร้อม`

## 8) ขอ Assistant (Requester → Parent)
`<ROUND> <REQUESTER> → <DIRECT_PARENT> | STAFFING_REQUEST | REQUEST_ID <ID>`
`GitHub request: <REAL ISSUE COMMENT URL>`
`Next recipient: <DIRECT_PARENT> | พิจารณาในอำนาจหรือส่งต่อขึ้นหนึ่งชั้นเพื่อขอ Capacity`

## 9) ขออ่านงานข้ามทีม (Requester → Parent)
`<ROUND> <REQUESTER> → <DIRECT_PARENT> | ACCESS_REQUEST / READ_ONLY | ID <ID>`
`GitHub request: <REAL ISSUE COMMENT URL>`
`Next recipient: <DIRECT_PARENT> | อนุมัติในอำนาจหรือส่งต่อถึง Common Ancestor ทีละชั้น`

## 10) จบงาน/ไม่มีงานส่งต่อ
`<ROUND> <ROLE> | CLOSED / STANDBY | HEAD <SHA or NO_CODE>`
`GitHub report: <REAL FINAL COMMENT URL>`
`Next recipient: <DIRECT_PARENT> | รับทราบการปิดงาน; ไม่มอบหมายงานใหม่หากยังไม่มีคำสั่ง`

**ข้อความถึง Owner ต้องสั้น แต่ GitHub Report ฉบับเต็มต้องละเอียด.** ห้ามส่งลิงก์ผิด, สมมติ CI PASS, อ้างว่าส่งข้อความถึงแชทอื่นแล้วทั้งที่ Owner ยังไม่ส่ง, หรือสั่ง Owner ให้เปิด Action/แก้ Code/ดาวน์โหลด Artifact. หากมีเหตุผลให้ไม่ต้องส่งต่อ ให้ตอบ `STANDBY — ไม่มีข้อความต้องส่ง` อย่างชัดเจน.
