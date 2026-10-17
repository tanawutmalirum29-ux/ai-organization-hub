# ANT KINGDOM — แต่งตั้งด้วย GitHub Issues (แบบสั้น)

**กฎหลัก:** [RULES.md](../RULES.md) · **คำสั่งย่อ:** [COMMANDS.md](../COMMANDS.md)

การแต่งตั้ง CEO/ENGINEER/QA **ให้เขียนใบแต่งตั้งใน Issue ของงานจริงก่อน** แทนการส่งข้อความ M00000 หรือคัดลอกใบแต่งตั้งหลายหน้า

## แบบฟอร์ม Comment ใบแต่งตั้งใน Issue

```text
APPOINTMENT | OWNER/COORDINATOR → ENGINEER-B
TASK: #140 (UI-02 Military) ; related #141
STATUS: APPOINTED / DESIGN_REVIEW_ALLOWED / IMPLEMENTATION_HOLD
TARGET: ant-project PR #146 (integration, NOT main)
READ: Issue description + UI renovation contract/QA
DO NOW: read source, review design, post ACK/risks/questions in #140
WAIT: G1_FROZEN full SHA + API + START on Issue before writing code
REPORT: post RESULT/PR/SHA/Tests in #140, not M00000
```

OWNER ส่งข้อความในแชทพนักงานสั้น ๆ **ครั้งแรก**: `ENGINEER-B: AP-ROLE #140 https://github.com/tanawutmalirum29-ux/ant-project/issues/140`

**ครั้งถัดไป**: `MN #140` แล้วให้แชทนั้นอ่าน Issue/Comments ใหม่เอง

หากมีงานสองส่วนให้แยก Issue (เช่น #140, #141) แต่ผู้รับผิดชอบเดิมได้. การอนุญาตเริ่มงานต้องอยู่ใน Issue พร้อม Commit SHA และขอบเขตไฟล์ที่ตรวจได้; `APPOINTED` ไม่ใช่ `START`. Engineer เปิด PR ของตนไปยัง integration branch เท่านั้นจน Coordinator อนุญาตอย่างชัดเจน.

## ข้อความที่ AI ทุกตัวส่งถึง OWNER

**ต้องโหลดกฎใหม่จริงเมื่อได้รับ `AP-ROLE`, `MN` หรือ `I`:** เปิด [RULES.md](../RULES.md) และ [COMMANDS.md](../COMMANDS.md) จาก `main` สดก่อนตีความคำสั่ง ไม่ใช้ความจำของแชทที่ได้รับแต่งตั้งไปก่อนหน้านั้น. เมื่อ OWNER พิมพ์ `I` ต้องแสดงรายการคำสั่งจากคู่มือ ไม่ใช่ตอบว่าไม่รู้จัก; หาก GitHub ไม่พร้อม ให้ตอบ `ER: อ่านกฎล่าสุดไม่ได้`. GitHub ไม่ส่งกฎใหม่เข้าแชท AI โดยอัตโนมัติ



**ไม่ต้องส่งใบแต่งตั้ง รายงาน QA หรือแผนงานเต็มให้ OWNER** ไม่ว่าผู้ส่งจะเป็น CEO, Coordinator, Engineer หรือ QA ให้บันทึกทั้งหมดไว้ใน GitHub Issue/PR; **ไม่มีผู้รับถัดไปให้ตอบ `C` เท่านั้น, มีผู้รับถัดไปตอบเพียง `ROLE: MN #<issue> <url>` บรรทัดเดียว หรือ `ROLE: AP-ROLE #<issue> <url>` ครั้งแรก**

**กรณีไม่มีผู้รับที่ต้องส่งต่อ:** แจ้ง `ST: <สถานะ> | #<issue>` และ `OWNER: ไม่ต้องดำเนินการ` ตามจริง ไม่สร้างงานให้ OWNER โดยไม่จำเป็น; ถ้า OWNER ร้องขอรายละเอียดตรง ๆ จึงให้คำอธิบายเพิ่ม

## CEO ใหม่

ถ้า OWNER ตั้ง CEO ใหม่ ให้สร้าง Issue ภารกิจใน GitHub แล้วส่ง `CEO: AP-ROLE #<issue> <url>`. CEO ต้องตรวจ `RULES.md`, Issue, PR, Branch, กฎ UI และงานค้างจริงก่อนเริ่ม. **Issues ใช้สื่อสาร, PR ส่งโค้ด, CI/Commit เป็นหลักฐาน**. ไม่มี Round ID, M/Receipt/Chat Event/Signoff.

**ข้อจำกัดสำคัญ:** GitHub Comments ไม่ส่งข้อความเข้า ChatGPT แชทอื่นโดยอัตโนมัติ; OWNER ยังต้องส่งลิงก์ Issue สั้น ๆ ไปยังห้องแชทนั้น. ห้ามโพสต์ ACK/Review/Signoff แทน AI ที่ยังไม่ตอบจริง.
