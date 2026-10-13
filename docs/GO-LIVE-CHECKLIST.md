# Governance V2 — ความพร้อมเปิดใช้งานจริง (Readiness Gates)

**แยกสองสถานะให้ชัด:** `RULEBOOK_READY` = คู่มือแต่ละ Role/Appointment/Task/Relay มีครบและผ่านการตรวจไฟล์; `AGENTS_READY` = แชท AI แต่ละตัวรับแต่งตั้ง/ตรวจเครื่องมือ/ACK และระบบส่งงานสามารถทำจริงแล้ว. **สองสถานะนี้ไม่เหมือนกัน.**

## ตรวจตามจริง ณ เวลายกร่าง Audit
| Gate | Status | เหตุผลและสิ่งที่ต้องทำ |
| --- | --- | --- |
| Central governance docs on `appointment-CEO/main` | RULEBOOK_READY หลัง Merge audit PR + CI | อ่านบทบาท/ทักษะ/การรายงานและคำสั่งตามลำดับชั้นได้ |
| Unique personal Role/Appointment Issue + actual chat ACK | NOT_STARTED | `appointments=[]` ใน Registry; ต้องให้หัวหน้าตรงแต่งตั้งและ Owner ส่งข้อความจริง |
| Capacity/role scope and authority for each new AI | TEMPLATE_ONLY | ระบุเป้าหมาย/จำนวนคนโดย CEO ก่อน แล้วผู้นำสายแต่ละชั้นจัด Issue สำหรับลูกน้องจริง |
| Individual work assignment, file allowlist and test contract | NOT_STARTED | ใช้ [Task Issue Contract](TASK-ISSUE-CONTRACT.md) เมื่อ CEO ประกาศ Round จริง |
| Real tools & skill checks for each chat | NOT_VERIFIED | แชทใหม่ต้องประกาศ SKILL_READY/SKILL_GAP จาก GitHub/CI/Browser ที่เข้าถึงจริง |
| Rulebook structure, mandatory links and legacy QA routing | AUTO_TESTED | `tools/check-ai-org.mjs` และ `tools/check-governance-links.mjs` บน PR/push; ตรวจไฟล์เท่านั้น |
| AI-to-AI communication automation | NOT_AVAILABLE | Owner ต้องส่งข้อความที่ AI เตรียมเองไปยังแชทปลายทางจริง; GitHub comments ไม่ส่งข้ามแชทเอง |
| Automatic final `SIGNATURE_READY` gate | NOT_IMPLEMENTED | มอบหมาย Platform/Delivery วางระบบตรวจ required-signers, candidate SHA, latest CI and unresolved HOLD ก่อนปล่อยเกมรอบถัดไป |
| Independent signer identity | NOT_CRYPTOGRAPHIC | บัญชี GitHub เดียวกันไม่พิสูจน์ว่าผู้ลงนามเป็น AI แชทคนละตัว; ต้องยอมรับเป็น organizational receipt หรือจัดบัญชี/permission แยกตามนโยบาย |
| Actual gameplay Release readiness | NOT_EVALUATED | Governance QA ไม่ใช่ Runtime/Gameplay QA; ต้องตรวจแยกกับ Source ที่จะ Release |

## ขั้นตอนขั้นต่ำที่ Owner และ CEO ต้องทำ
1. **Owner:** บอกเป้าหมายเกมรอบใหม่และแชทที่จะให้เป็น CEO เพียงคนเดียวเมื่อพร้อม; ส่งต่อข้อความแบบ 3 บรรทัดตามที่ AI แต่ละตัวเขียนให้. Owner ไม่ทำ CI/PR/ZIP.
2. **CEO:** ตรวจ Role Charter และ Repository เกม, ตั้งเพดานคน/สายงานที่ใช้/required signers, ออก Issue แต่งตั้ง Delivery ตาม [Activation Packet](ACTIVATION-PACKET.md). อย่ารายงานว่ารับทุกตำแหน่งแล้วเพราะ Role Slots มีอยู่.
3. **Delivery:** แต่งตั้ง Domain Deputies ใน Slots ที่อนุมัติ; แต่ละชั้นแต่งตั้ง/รอ ACK ลูกน้องตรง, Registry Steward อัปเดต JSON+แผนผังหลังตรวจ ACK จริง.
4. **ก่อน Engineer เริ่ม Source:** ได้ Task Issue ที่กรอกทุก field จริง มีตัวอย่าง Tests, Branch, Scope/Paths, Head SHA, Parent และ Next recipient.
5. **ก่อน CEO Merge game main ครั้งถัดไป:** Platform/Delivery ต้องมี `SIGNATURE_READY` ที่ตรวจได้จริงหรือถือ `GATE_NOT_CONFIGURED / RELEASE_HOLD` ตาม [Release Protocol](RELEASE-SIGNATURES.md). QA deputy มีสิทธิ HOLD จริง; CEO ไม่อาศัย Markdown Signature แบบกรอกเองเพื่อข้ามการทดสอบ.

## ตีความคำว่า "AI รู้หน้าที่ทันที"
- **ได้**: เมื่อแต่ละแชทได้รับ Role ID, direct parent, ลิงก์ Issue แต่งตั้งที่เติมครบและเปิดอ่าน Governance จาก main; จากนั้นตอบ ACK และรอ Task.
- **ไม่ได้**: เมื่อเพียงส่ง URL Repository, มีชื่อ Slot บนผัง, หรือมีคำว่า SKILL_READY ใน Template. สิ่งเหล่านั้นไม่สร้างตำแหน่งจริงและไม่ติดตั้งความสามารถเพิ่ม.
- งานที่ยังไม่มีเจ้าของ/ยังไม่มีทดสอบต้องบอก `UNASSIGNED / NOT_VERIFIED` ตามจริง ห้ามรับรองว่าระบบพร้อม 100%.

**สถานะเอกสารนี้จะเปลี่ยนได้เมื่อมีหลักฐาน GitHub/ACK/CI จริงเท่านั้น ไม่ปรับเป็น READY จากการเขียนคำสั่งเพียงอย่างเดียว.**
