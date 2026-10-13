# Quality Gates — เกณฑ์รับงานหลายชั้น

เลือกการตรวจให้เหมาะกับงานและเขียนไว้ใน Parent Issue **ก่อนพัฒนา** ค่าตัวอย่างต่อไปนี้เป็นเกณฑ์อ้างอิง ไม่ใช่คำสั่งให้ทุกงานต้องใช้ Test แบบเดียวกัน

| ชั้นตรวจ | ผู้รับผิดชอบ | ต้องยืนยัน |
| --- | --- | --- |
| Implementation | Engineer | เปลี่ยนเฉพาะไฟล์อนุญาต, Tests ใหม่+เดิมที่เกี่ยวข้อง, ไม่มีข้อมูลแต่งขึ้น |
| Team QA | Team Lead | ตรวจครบสองคน, Review diff, ประเด็นหายจริง, CI ผลสุดท้าย SHA ตรง, ส่ง `TEAM_ACCEPTED` |
| Department QA | Department Director | เชื่อมหลายทีม, ตรวจของที่ใช้งานร่วมกัน, ทดสอบสิ่งที่ข้ามทีม, วิเคราะห์และสั่งแก้ก่อน `DEPARTMENT_ACCEPTED` |
| Cross-Department QA | Integration Director / Acting Integrator | ตรวจสัญญาข้อมูลและ Integrate ทั้งหมดบน Branch เดียว, รัน CI รวม, บั๊กย้อนหลัง |
| Release | CEO | Owner scope ถูกต้อง, PR HEAD ไม่เปลี่ยน, CI บน HEAD รวมผ่าน, Acceptance/risks ครบ, Merge `main` และยืนยัน SHA |

## มาตรฐานเกม Ant Kingdom
- **npm test**, **npm run build** และ GitHub Actions ของ Branch รวมต้องผ่าน; ตรวจเลข Test และผลจริง ไม่ใช้คำว่า PASS จากข้อความอย่างเดียว
- หากแตะ UI/Renderer/Input: Browser QA บนขนาด **320×568, 390×844, 768×1024, 844×390, 1440×900** และตรวจ JavaScript Error/Hit targets
- หากแตะ Simulation/Map/Resource: ตรวจ Seed Determinism, Tick, Pause/Speed, Reachability, ผล Gameplay จริง และการจำลองระยะยาว **30,000 Tick × อย่างน้อย 3 Seeds** เมื่อมีความเสี่ยงที่เหมาะสม
- หากแตะทรัพยากร: ต้องตรวจ physical accounting; ไม่สร้างอาหาร น้ำ โปรตีน หรือวัสดุโดยไม่มีที่มา/บัญชี
- หากแตะ Combat/Pathfinding: ตรวจการเคลื่อนที่จริง การเข้าถึงพื้นที่ และ Regression ที่เกี่ยวข้อง
- หากแตะ Performance: มี benchmark เทียบก่อน/หลังและภาระมือถือพอสมควร
- CI ไม่สามารถรันได้ / DNS blocked / Browser QA ยังไม่วิ่ง = **NOT VERIFIED** ไม่ใช่ PASS

## หลักฐานที่ต้องมาพร้อมงาน
1. Github Issue และ PR, Branch, full HEAD SHA, base SHA, changed filenames
2. Test Commands และ Workflow Run URL ที่ยืนยัน HEAD เดียวกัน
3. Screenshot/Artifact หรือ benchmark ถ้าจำเป็น
4. Risks, Known Failures, Out-of-scope defects, ระดับความรุนแรง
5. Team Acceptance / Department Acceptance / Integration Acceptance ตามโครงสร้างรอบนั้น

**CEO ไม่รับ PR ของ Engineer เป็น Final PR โดยตรง** หากไม่ผ่านสายตรวจรับ และ **CEO ไม่แก้ Gameplay เอง** เพื่อให้ CI ผ่าน. 
