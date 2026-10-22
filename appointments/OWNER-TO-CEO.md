# แบบแต่งตั้ง CEO — เข้ากันได้กับชื่อเดิม

**ใช้ต่อได้:** ชื่อ `CEO` ยังคงเป็นชื่อ PROJECT LEAD ได้ แต่โครงสร้างองค์กรปัจจุบันเหลือ **OWNER → PROJECT LEAD/CEO → Engineer/Creator/QA โดยตรง** ไม่ต้องตั้ง DIR/TL.

**แม่แบบหลักล่าสุด:** [OWNER-TO-LEAD.md](OWNER-TO-LEAD.md) · [RULES.md](../RULES.md) · [ROLE-HANDOFF.md](ROLE-HANDOFF.md)

เวลาสร้าง AP-ROLE ใหม่ให้ใช้ [OWNER-TO-LEAD.md](OWNER-TO-LEAD.md) โดยกรอก `TO_ROLE: CEO` หาก OWNER ต้องการชื่อนี้. **ต้องแนบสามลิงก์ครบ**:

- `PROJECT_REPO:` URL เต็มของโปรเจกต์จริง
- `ORG_WORKSPACE_REPO:` https://github.com/tanawutmalirum29-ux/ai-organization-hub
- `STAGING_REPO:` https://github.com/tanawutmalirum29-ux/Staging_area

AI ที่อยู่ใน Issue เก่ารับงานต่อได้ตามขอบเขตและสิทธิ์เดิม โดย Lead ปรับ `REPORTS_TO` ของ Worker ตรงเข้าหาตนเองและบันทึก Handoff ให้ชัดเจน ไม่ต้องสร้าง Issue/Branch ใหม่เพียงเพื่อเปลี่ยนโครงสร้าง. DIR/TL ไม่ใช่ Gate บังคับอีกต่อไป.

ส่งเข้าแชทใหม่: `CEO: AP-ROLE #<issue> <issue-url>` หรือ `PROJECT-LEAD: AP-ROLE #<issue> <issue-url>`. แค่สร้าง Issue ไม่ทำให้ AI เริ่มงานเอง.
