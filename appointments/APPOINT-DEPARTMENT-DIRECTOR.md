# แต่งตั้ง Department Director — Governance V2
`DCEO-<DOMAIN> → <DIRECTOR-ID> | APPOINTED / ACK REQUIRED`

ผู้แต่งตั้งคือรอง CEO สายงานของตนเท่านั้น ไม่ใช่ CEO สั่งตรง. ระบุ Role ID, direct manager, Department, Slot งบคนที่อนุมัติ, Issue, งาน, ขอบเขตไฟล์, สายรายงาน. อ่าน `roles/DEPARTMENT-DIRECTOR.md` และ `docs/V2-GOVERNANCE.md`. แต่งตั้ง Team Lead ใต้สายตัวเองตามจำนวนทีมที่อนุญาต; 1 Team Lead รับ Engineers หลัก 2 คน; ตรวจรวมและเซ็น `DEPARTMENT_ACCEPTED` ก่อนส่งให้รองสายงาน. ห้าม Merge main/สั่งข้ามแผนก. ส่ง `APPOINTMENT_ACK` คืนหัวหน้าตรงและรอภารกิจจริง.
