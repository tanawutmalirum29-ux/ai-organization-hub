# หลังรับงาน/หลังจบงาน ต้องทำอะไร บอกใคร และส่ง Owner ข้อความไหน (V2)

**กฎสูงสุด:** AI ทำงาน GitHub ให้ครบเอง, บันทึกหลักฐานจริงก่อน, แล้วส่งข้อความ **ไม่เกิน 3 บรรทัด** ที่ระบุปลายทางที่มีอยู่จริงในสายบังคับบัญชาให้ Owner คัดลอกเท่านั้น. เจ้าของไม่ต้องทดสอบ, run workflows, สรุปรายงานแทน, ส่ง ZIP หรือเลือกแก้บั๊ก. ใช้ [ตัวอย่าง](RELAY-TEMPLATES.md).

## A. ตารางสถานะ → การกระทำถัดไป (ทุก Role)
| สถานะ | AI ทำเองให้เสร็จก่อนส่งข้อความ | ผู้รับตามสายถัดไป | สิ่งที่จะบอก Owner |
| --- | --- | --- | --- |
| `APPOINTMENT_ISSUED` | ผู้แต่งตั้งเขียน Role ID/Parent/Scope/Issue/Skill links และประกาศรับตำแหน่ง | **ลูกน้องตรง** (แชทใหม่/ที่มีอยู่) | `ส่งข้อความนี้ให้ <Role ID> เพื่อรับแต่งตั้ง` พร้อมลิงก์เดียว |
| `APPOINTMENT_ACK / SKILL_READY` | ลูกน้องอ่าน role+skills, ตรวจเครื่องมือ, บันทึก ACK / gap จริง | **หัวหน้าตรง** | `ส่งข้อความนี้ให้ <Parent role> เพื่อรับทราบ` |
| `TASK_ASSIGNED` | หัวหน้าตรงเปิด Issue เฉพาะคน, เป้าหมาย/allowlist/CI/เกณฑ์รับ | **ลูกน้องตรงหนึ่งคน** | `ส่งให้ <Role ID> เริ่มตาม Issue` |
| `IMPLEMENTED / ENGINEER_DELIVERED` | Engineer ตรวจ Diff, Tests, Auto CI, เปิด PR+รายงาน full SHA/URLs | **Team Lead ตรง** | `ส่งให้ <Lead> ตรวจ PR`; ไม่ส่ง CEO |
| `CHANGES_REQUESTED` | Reviewer เขียน repro, ไฟล์/เกณฑ์ที่ไม่ผ่านและอำนาจแก้เฉพาะส่วน | **ผู้ใต้บังคับบัญชาตรงที่รับผิดชอบ** | `ส่งให้ <Role ID> แก้และส่งกลับ` |
| `TEAM_ACCEPTED` | Lead ตรวจ 2 core Engineers ครบ, รวม Team scope/CI, ลงรับรอง | **Director ตรง** | `ส่งให้ <Director> ตรวจรวม` |
| `DEPARTMENT_ACCEPTED` | Director ทดสอบ HEAD แผนกรวม, Risks, ลงรับรอง | **Domain Deputy ตรง** | `ส่งให้ <DCEO-DOMAIN> ตรวจ Candidate` |
| `DOMAIN_SIGNED / DOMAIN_HOLD` | Deputy ตรวจ integrated **candidate_sha เดียว** และหลักฐาน scope | **DCEO-DELIVERY** | `ส่งให้ Delivery รวบรวมลายเซ็น/คืนแก้` |
| `INDEPENDENT_QA_SIGNED / QA_HOLD` | DCEO-QA ตรวจ Candidate SHA, CI/Artifacts และ Regression จริง; BLOCK หาก fail | **DCEO-DELIVERY** | `ส่งให้ Delivery รับรองหรือสั่งแก้ตามสาย` |
| `DELIVERY_SIGNED` | Delivery ตรวจทุก required signer SHA เดียว, CI, no HOLD และเซ็นคนสุดท้าย | **AI CEO** | `ส่งให้ CEO ตรวจลายเซ็นและ Merge Gate` |
| `RELEASE_ACCEPTED / RELEASE_HOLD` | CEO ตรวจ Gate, Merge หากได้รับอนุญาตแล้ว/บันทึกเหตุผล HOLD; ตรวจ main SHA จริง | **Owner** เมื่อรายงานผล/ขอเป้าหมาย; **Delivery** เมื่อสั่งแก้ | `ส่งข้อความนี้ให้ Delivery` เฉพาะกรณีสั่งแก้; รายงาน Owner โดยตรงเมื่อ Release |
| `CLOSED / STANDBY` | ผู้ถือ Issue ปิดเฉพาะงานที่เสร็จ, เก็บ PR/QA หลักฐาน, บันทึก HEAD/cleanup ไม่ลบหลักฐาน, ไม่เริ่มงานใหม่ | **หัวหน้าตรง** (ยืนยันปิดงาน) หรือไม่มี Recipient ถ้ารับทราบแล้ว | บอก `จบรอบ รอคำสั่ง`; **ไม่ต้องส่งข้อความต่อถ้าไม่มีผู้รับงานจริง** |
| `BLOCKED / NOT_VERIFIED / CAPABILITY_BLOCKED` | ลงสาเหตุและลองแก้เท่าที่ได้รับสิทธิ์จริง; บันทึกสิ่งที่ไม่ได้ทดสอบ | **หัวหน้าตรง** (หรือ supervisor ของ Task) | `ส่งให้ <Parent> ตัดสินใจ/สั่งซ่อม` ไม่โยนงานให้ Owner |
| `ACCESS_REQUEST` | ขอข้อมูล/เวลา/สิทธิ์ข้ามสายพร้อม Request ID และ READ_ONLY/expiry | **หัวหน้าตรง** เท่านั้น → common ancestor ตามจำเป็น | `ส่งให้ <Parent> พิจารณา/ส่งต่อหนึ่งชั้น` |
| `STAFFING_REQUEST` | เขียนเหตุผล/งบ/ขอบเขต/รายงานต่อใครและผลกระทบทีม | **หัวหน้าตรง** เท่านั้น → CEO Capacity ตามสาย | `ส่งให้ <Parent> ขออนุมัติคนช่วย`; ไม่ผ่าน DCEO-QA ตรวจเกม |

## B. รายงานเต็มที่ AI ต้องทำใน GitHub ก่อนทุกการส่ง
Required: `round_id, role_id, direct_parent_role_id, event/status, issue_url, task scope, PR/link, base_sha, head_sha หรือ candidate_sha เต็ม, changed_files, code/contracts, actual test commands + exit codes, exact CI run URL/checked-out source, real artifacts/screenshots (ถ้าจำเป็น), observed failures, risk/limits, next_role_id`. สำหรับงานที่ไม่เขียนโค้ดให้ระบุ `NO_CODE` ไม่แต่ง SHA/PR. ลงลายเซ็นตามหลักฐานและขั้นตอนใน [RELEASE-SIGNATURES](RELEASE-SIGNATURES.md). AI ที่เป็น Lead/Director ต้องวิเคราะห์จริง ไม่ Forward PASS เฉย ๆ.

## C. ข้อความที่แชทแต่ละตัวต้องลงท้ายเมื่อส่งงานให้ Owner
`<ROUND> <SENDER_ROLE> → <DIRECT_NEXT_ROLE> | <EVENT> | Issue/PR | HEAD 7–12 chars หรือ NO_CODE`
`GitHub report: <PERMANENT URL จริง เช่น https://github.com/owner/repo/issues/N#issuecomment-ID>`
`Next recipient: <DIRECT_NEXT_ROLE> | <การกระทำเดียวที่ต้องการจากปลายทาง>`

**ต้องเขียนชื่อปลายทางชัด** เช่น `VIS-E2 → VIS-TL1` ไม่ใช้ "ฝากผู้เกี่ยวข้อง" หรือส่งถึง CEO ทั้งที่ข้าม Director. ถ้าต้องแจ้งลูกน้อง 2 คน ให้ AI ทำ **สองบล็อกแยกกัน**; Owner ไม่เขียน/แก้คำสั่ง. เมื่อปลายทางเป็น Owner (CEO สรุป Release) ให้เขียน `Next recipient: OWNER — INFORMATION ONLY / AWAITING NEW GOAL` โดยไม่สั่ง Owner ทำงาน GitHub. ถ้าไม่มีงานให้ส่งต่อก็อย่าสร้างคำสั่งบังคับให้ Owner ไปส่งซ้ำ.

## D. สามคำถามบังคับก่อนจบทุกการตอบ
1. **งานใน GitHub ทำจริงหรือยัง?** ถ้าไม่สำเร็จต้องบอก `BLOCKED / DRAFT / NOT_VERIFIED` ตามจริง ไม่ใช้ COMPLETED.
2. **ขั้นถัดไปอยู่ในอำนาจใคร?** ต้องอ้างอิง `parent_role_id` และสายงานจากทะเบียนจริง ไม่ข้ามหัว; หากไม่แน่ใจให้ส่งหัวหน้าตรง `NEEDS_ROUTING`.
3. **Owner ต้องทำอะไร?** คำตอบต้องเป็นเพียง `คัดลอก 3 บรรทัดนี้ไปยังแชท <ROLE-ID>` หรือ `ไม่ต้องทำอะไร รอบนี้ STANDBY`; ห้ามมอบหมาย CI/manual GitHub.
