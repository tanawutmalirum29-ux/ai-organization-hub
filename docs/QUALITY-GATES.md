# Quality Gates — V2 signed chain
| Stage | Reviewer responsible | Required receipt |
| --- | --- | --- |
| Implementation | Engineer + immediate manager for Assistant | Exact file diff, tests, CI, delivered SHA |
| Team | Team Lead | Both core Engineers and helpers actually reviewed; `TEAM_ACCEPTED` |
| Department | Department Director | Team integration and actual regression; `DEPARTMENT_ACCEPTED` |
| Domain | Relevant DCEO-SYS/EXP/PLAT | **Domain-specific actual QA** on frozen Candidate SHA; `DOMAIN_SIGNED` or HOLD |
| Independent QA | DCEO-QA | Cross-domain/gameplay/browser verification; `INDEPENDENT_QA_SIGNED` or hard `QA_HOLD` |
| Release integration | DCEO-DELIVERY | Full integrated branch/tests, all required domain/QA receipts same exact full SHA, then **last** `DELIVERY_SIGNED` |
| CEO | AI CEO | Check fresh `SIGNATURE_READY` / immutable SHA / Owner scope, Merge main only |

ต้องกำหนด `required_signers` ตามรอบก่อนเริ่มทำ, QA ต้องยืนยัน HEAD/CI จริง, ไม่ใช้ PASS จาก Source/Issue เพียงข้อความเดียว. 40-character Candidate SHA ใหม่ทำให้ Final Signature เดิมใช้ไม่ได้ ต้องตรวจ/เซ็นใหม่. ตรวจ UI จริง 5 ขนาดเมื่อแตะ UI, Simulation/Conservation/Seed และ Long Tick เมื่อเหมาะสม, SVG/assets, performance ตามความเสี่ยง. ทดสอบอัตโนมัติบน GitHub และแสดง Artifact จริง; ผู้ใช้ไม่กด Actions.

รอง CEO ไม่สามารถยกเลิก QA_HOLD เอง. ไม่ถือว่าการตรวจ Contrast บางตัวอย่างเป็นใบรับรอง WCAG ทุกจุด, หรือ Chromium fallback เป็นการตรวจ Legacy browser จริง. ดู [RELEASE-SIGNATURES](RELEASE-SIGNATURES.md) สำหรับแบบคำรับรองและเงื่อนไข CI Verifier ที่ยังต้อง implement.
