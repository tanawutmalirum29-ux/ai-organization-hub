# Current commands — compact reference

**One authoritative policy:** [RULES.md](RULES.md). This table is a short cheat sheet only, not another governance rulebook.

| Code | Meaning |
|---|---|
| `I` | ดูรายการรหัสทั้งหมด |
| `NP` | ขอข้อเสนอเกมฉบับเต็มจากที่ปรึกษา |
| `MN` | อ่านทุก M ค้างในแชทนี้และเก็บ receipt |
| `MN-ROLE` | ส่ง MN ไปยังแชทผู้รับนั้น |
| `AP-ROLE` | เปิดแชทใหม่ ส่งแต่งตั้งเต็มครั้งแรก |
| `C` | อ่านแล้ว / OWNER ยืนยันอ่านข้อเสนอของที่ปรึกษา |
| `NX` | CEO ตรวจคิวข้อความที่ต้องส่งให้ใคร |
| `FAST` | ทำงานภายในขอบเขตต่อโดยไม่ส่งรายงานที่ซ้ำ |
| `BR` | สถานะ CEO สูงสุด 3 บรรทัด |
| `BL` | ดูงานที่ติดขัด |
| `MQ` | ดูจำนวน M ที่ต้องส่งจริง |
| `SW` | เก็บประวัติเพื่อกู้/ย้ายแชท |
| `WHY` | เหตุใดจึงไปขั้นต่อไปไม่ได้ |
| `PF` | ตรวจความพร้อมก่อนอนุญาตให้ลบ Branch |
| `SIM` | ทดสอบกฎและวงจรจำลององค์กรโดยใช้ test fixtures |
| `ST` | ขอรายงานสถานะงานที่แชทนี้ |
| `Q` | ขอคำถาม/ข้อมูล |
| `H` | ขอความช่วยเหลือ |
| `RV` | ขอให้ตรวจงาน |
| `CI` | ตรวจผล CI บน SHA จริง |
| `SYNC` | ประสาน ledger/receipts ให้ตรง GitHub |
| `RC` | กู้แชทที่เสียโดยแต่งตั้งคนใหม่และอ่านหลักฐานเดิม |
| `TR` / `Tr` / `tr` | OWNER สั่ง AI แชทเดิมตรวจงานล่าสุดที่เกิด `ER` หรือ `B` และลองทำเฉพาะขั้นที่ยังไม่สำเร็จอีก 1 ครั้ง หลังตรวจ GitHub/สาเหตุแล้ว; ห้ามเขียนข้อมูลซ้ำหรือข้ามข้อจำกัดความปลอดภัย |
| `P` | ยังดำเนินการ |
| `B` | ติดขัด |
| `ER` | ตรวจ GitHub ไม่ได้หรือข้อมูลผิด |
| `CCCC DB` | CEO: งานเสร็จ สำรองประวัติ+PF ผ่าน; OWNER ลบ non-main branches ได้ |
| `c` | OWNER ลบ Branch แล้ว ขอให้ CEO เดิมตรวจ GitHub สองที่ |
| `Completed` | CEO ตรวจครบและแนบใบแต่งตั้ง CEO รุ่นใหม่แบบเต็ม |

**TR scope:** Use `TR` only in the same active chat/appointment that reported `ER` or `B`. Verify real repository state first; if already completed, do not replay the action. Retry only a permitted incomplete step once. If denied by platform safety, do not bypass or disguise the rejected write; report the actual blocker and retain the hold. Full requirements: [RULES.md — TR](RULES.md#tr--retry-after-erb-owner--same-ai-chat).

After an OWNER `NP` suggestion only GAME-ADVISOR may show the full proposal and wait for OWNER C. After `CCCC DB`, an OWNER lowercase `c` triggers a **different** live cleanup verification. A full new CEO appointment following `Completed` is allowed once.
