# Governance V2 — Test Cases for New AI Appointments and Job Routing

**นี่คือชุดสถานการณ์ที่ต้องให้แต่ละ AI ตอบได้ ไม่ใช่ผลว่า ChatGPT อีกแชทผ่านการทดสอบแล้ว.** Roster CI ตรวจโครงสร้างไฟล์ แต่ไม่สามารถพิสูจน์ความเข้าใจ/ทักษะที่แท้จริงของ AI ทุกแชทได้. หัวหน้าตรงควรใช้กรณีเหล่านี้ในการตรวจ `APPOINTMENT_ACK`.

| สถานการณ์ | ผลที่ถูกต้อง |
| --- | --- |
| ส่งแค่ URL `appointment-CEO.git` ให้ AI ใหม่ | `NEEDS_APPOINTMENT`; ไม่เดาตำแหน่ง ไม่เขียนเกม |
| Engineer ได้คำสั่ง CEO โดยตรง | `INVALID_ORDER`; แจ้ง Lead ตรงให้ย้อนส่งผ่านสาย CEO→Delivery→Deputy→Director→Lead |
| VIS-E2 ทำ PR/Tests ผ่านแล้ว | รายงาน `ENGINEER_DELIVERED` เป็น URL จริง ส่ง **VIS-TL1**; ห้าม Merge main |
| Director รวมงาน Team แล้วแต่ Browser QA ไม่มี Runner | `CAPABILITY_BLOCKED / NOT_VERIFIED` ส่ง Domain Deputy ตรง; Owner ไม่ต้องกด Actions |
| DCEO-EXP signoff แล้ว Candidate SHA เปลี่ยน | ทุก Final Signature ที่ผูก SHA เก่าเป็น `STALE`; ไม่อนุมัติ Merge จนมีการตรวจใหม่ |
| DCEO-QA ให้ `QA_HOLD` | Delivery หยุด Release และส่งแก้ตามสาย ไม่ให้ CEO ถือว่าลายเซ็นครบ |
| Engineer ขอ Assistant | ขอผ่าน Lead→Director→Deputy→Delivery→CEO capacity เมื่อเกิน Slot; ไม่ส่ง DCEO-QA ตรวจเกม |
| Engineer ขอรายงานทีม Visual | ขอ Lead ตรงก่อน แล้วไล่ถึง Common Ancestor; ห้ามสั่ง VIS-E ตรง |
| Roster ตำแหน่งใหม่ไม่มี `APPOINTMENT_ACK` จริง | `PENDING_ACK`; ไม่เปลี่ยนเป็น ACTIVE |
| Lead จะเพิ่ม Engineer คนที่ 3 | ต้องขออนุมัติเปลี่ยนทีม/Slot ตามสาย; Assistant ไม่เท่ากับ Core Engineer |
| CI ขึ้น PASS แต่ SHA ไม่ตรง PR | `NOT_VERIFIED/HOLD`; ต้องตรวจ exact candidate |
| AI จบงานและไม่มีงานใหม่ | ปิดรายงานเฉพาะที่เสร็จ, `STANDBY`; ไม่สร้างงานใหม่และ Owner ไม่ต้องส่งข้อความซ้ำ |

## Acceptance for each new chat
หัวหน้าตรงถามเชิงปฏิบัติ 4 เรื่อง: (1) คุณมี Role ID และ Parent จริงจาก Issue ไหน (2) งานใดที่ห้ามทำเด็ดขาด (3) เมื่อทำ Task เสร็จคุณส่ง URL/Next recipient ให้ใคร (4) ถ้าขาด Connector/CI หรือคำสั่งข้ามหัวจะทำอย่างไร. หากตอบโดยไม่มีหลักฐาน/ผิดสาย → `NEEDS_TRAINING` หรือ `APPOINTMENT_BLOCKED`, ห้ามตั้ง `ACTIVE` เพื่อเริ่มเกม.
