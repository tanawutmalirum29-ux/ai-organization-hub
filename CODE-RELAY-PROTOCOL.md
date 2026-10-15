# V10 — Short-code, GitHub-first inter-chat transport (V8 transport retained)

**V10 short-code transport:** New V10 rounds retain V8/V9 message identity, real Owner relay and per-M receipt. **Create a new actionable M only when its recipient must do something.** Save ordinary status silently; do not MN CEO after only the first DCEO signoff. Read [V10 startup](STARTUP-PROTOCOL-V10.md) and [V10 efficiency](EFFICIENCY-PROTOCOL-V10.md). Legacy V9 is retained for old rounds.  Read [phased startup](STARTUP-PROTOCOL-V9.md) first.  This overrides V7's instruction to paste full messages between chats. `main` contains the reusable template; the only live data is under each new `round/<round-id-lowercase>/workspace`. Old V6/V7 ledgers are immutable history, not migrated.

## 1. What appears in ChatGPT

**First appointment only:** a full one-time appointment message explaining exactly: round, role, fresh appointment ID, direct parent and reports, repository/branch, authority/limits, game repository, role charter, how to read GitHub, `MN`/receipt workflow, how to journal, what to do if GitHub is unavailable. Every new replacement appointment gets its own single explicit full appointment again. All later AI-to-AI traffic is **SHORT CODES ONLY** in chats. Long tasks, QA, designs, debates, logs and evidence go in GitHub, not copy-paste relay blocks. Ordinary employees MUST NOT paste a long relay or report to Owner. **Exceptions:** appointed `GAME-ADVISOR` can present and discuss game proposals with OWNER during `NP`/idea intake and wait for OWNER `C`; `ORG-ADVISOR` may discuss governance ideas in full prose with Owner (still archives discussion). Owner is never required to adjudicate gameplay, engineering, QA, release or staffing.

| Code in chat | Direction | Meaning / action |
|---|---|---|
| `FAST` | OWNER → CEO/acting lead | เร่งเฉพาะงานในขอบเขตที่รับอนุมัติ ลด M/รายงานที่ไม่จำเป็น ไม่ข้าม QA. |
| `BR` | OWNER → CEO | สรุป PHASE/WORK/NEXT ไม่เกิน 3 บรรทัด. |
| `BL` | OWNER → CEO | ตรวจ blocker จริงจาก GitHub ตอบสั้น. |
| `MQ` | OWNER → CEO | นับคิว M ที่ต้องส่ง MN จริงต่อบทบาท ไม่ปลุก CEO เมื่อ DCEO มีลายเซ็นคนเดียว. |
| `SW` | OWNER → assigned AI | บันทึก recovery/handoff ใน GitHub จากข้อมูลจริง ก่อนย้ายแชท. |
| `WHY` | OWNER → active AI | อธิบายเหตุผลของ gate ที่ติดอยู่แบบสั้น. |
| `NP` | OWNER → GAME-ADVISOR | ขอคำเสนอพัฒนาเกม; ที่ปรึกษาตรวจเกมและแสดงข้อเสนอ **เต็มข้อความ** ให้ OWNER แล้วรอ `C` ก่อนส่งให้รองที่ปรึกษา. |
| `I` | OWNER → any appointed active AI chat | แสดงรายการรหัสทั้งหมด + ความหมายสั้น ๆ ตาม [COMMANDS.md](COMMANDS.md); เป็นข้อยกเว้นสำหรับคู่มือย่อเท่านั้น ต้อง journal คำถามและคำตอบ, ไม่ใช่การขอรายงานยาว. |
| `MN` | OWNER → target chat | "New Message": scan **every** valid pending message addressed to my active appointment in the live round; **not merely the newest**. Do not guess IDs. |
| `MN-CEO` | sender AI → OWNER | A GitHub-stored message now awaits CEO chat. Owner copies `MN` into CEO chat. |
| `MN-A-DIR` | sender → OWNER | New GitHub message(s) for DIR-A; Owner sends `MN` in DIR-A chat. |
| `MN-A1-TL` | sender → OWNER | New GitHub message(s) for TL-A1. |
| `MN-A1-1-E` | sender → OWNER | New GitHub message(s) for E-A1-1. |
| `MN-GAME-ADVISOR` / `MN-ORG-ADVISOR` | sender → OWNER | New message(s) for that advisor. |
| `C` | AI → OWNER | All incoming messages actually delivered in this turn have been read, individually receipted, and dispositioned; any action, future work, or blockers documented in GitHub. **Not** a blanket claim that an entire mission completed. |
| `C MN-CEO` | AI → OWNER | Previous condition satisfied **and** new saved message awaits CEO. Multiple `MN-ROLE` tokens are permitted for distinct recipients. |
| `P` | AI → OWNER | Processing is incomplete / GitHub work in progress. Cannot emit `C` before receipts are saved. |
| `B` | AI → OWNER | Blocked; the full reason and evidence are in a GitHub `BLOCKED` message/event. No invented success. |
| `NX` | OWNER → CEO | ตรวจสถานะทั้งองค์กร + ข้อความ M ที่ยังไม่มีใบรับอ่านในทุกแชท; ตอบเฉพาะรหัส `MN-ROLE` ทุกผู้รับที่ค้าง, `AP-ROLE` สำหรับแต่งตั้งครั้งแรก, หรือ `C`/`P`/`B`/`ER`. |
| `AP-ROLE` | CEO/ผู้แต่งตั้ง → OWNER | ต้องเปิดแชทบทบาทนั้นและส่งคำสั่งแต่งตั้งเต็มเพียงครั้งแรก ไม่ใช่ส่ง `MN` อย่างเดียว. |
| `ST` | OWNER → role | Request current status; role writes status/evidence to GitHub, replies `C` or `C MN-ROLE` if it has sent a message. |
| `Q` | OWNER → role | A question: journal Owner's actual follow-up text (may be written plainly) and store answer in GitHub; return `C` plus a short reference if needed. |
| `H` | OWNER → role | Request help/unblock; role saves exact details/response in GitHub, sends `C` / `B` / recipient code. |
| `RV` | OWNER → role | Request review; the GitHub message/task determines reviewer, scope and evidence. |
| `CI` | OWNER → role | Check CI; save exact SHA/run results on GitHub, reply short. |
| `SYNC` | OWNER → role | Rescan roster, messages, individual receipts and chat journal; reconcile all pending before `C`. |
| `RC` | OWNER → replacement role | Chat recovery: read appointment, verified prior session journals and evidence, reissue undelivered work to fresh appointment, never claim to have another chat's hidden state. |
| `ER` | AI → OWNER | GitHub unavailable, wrong appointment, invalid message, or unverified/partial archival; no `C` or authorized mutation without resolution. |

**Aliases:** `MN-DIR-A` = `MN-A-DIR`; `MN-TL-A1` = `MN-A1-TL`; `MN-E-A1-1` = `MN-A1-1-E`. Recipient routing is based on the ledger's exact `to_role` **and fresh** `to_appointment_id`, never a code string alone. Arbitrary department letters and TL 1/2, Engineer 1/2/3 follow the existing staffing rule. Invalid/missing recipient code → `ER`, not a guess.

## 2. Sending an inter-chat message

1. Author **complete** message content/evidence/expected action in a new gapless `workspace/messages/NNNNNN.json` on own round; keep `relay_text` full *in GitHub for audit*, **not** in the ChatGPT reply.
2. Verify message exists, correct from/to appointment, unique `event_key` and relevant previous `in_reply_to`. Delivery is **pending**, not automatically received in target AI conversation.
3. Save the OWNER↔AI chat journal events describing incoming request and short reply.
4. Output **only** `MN-<RECIPIENT>` or `C MN-<RECIPIENT>` (and additional recipient tokens if necessary). Owner carries only `MN` to each target, not a message body. Do not say delivered until real Owner relay is known.

**No notification via GitHub alone.** An originator's outgoing code is only a courier cue. The recipient must physically receive `MN` in its own chat and actively fetch GitHub. If an AI cannot write/read the connected GitHub, reply `ER` and do not fabricate a ledger message.

## 2.1 `I` — ดูรายการคำสั่ง (OWNER→AI)

เมื่อ OWNER พิมพ์ `I` ในแชท AI ที่แต่งตั้งแล้ว ให้เปิด [COMMANDS.md](COMMANDS.md) บน canonical `main` ล่าสุด และตอบกลับเฉพาะรหัสทุกคำสั่งกับความหมาย **สั้น ๆ** ตามรายการนั้น (ไม่ส่งรายงานงานหรือข้อความ M ยาว). อนุญาตให้แสดง cheat sheet ย่อในแชทเป็นข้อยกเว้นจากกฎ short-code-only เพื่อให้ OWNER ไม่ต้องเปิด GitHub เอง. ต้องบันทึก turn OWNER และคำตอบใน chat journal จริง; `I` ไม่ใช่การแต่งตั้ง/อนุมัติ/ส่ง `MN` หรือการสร้าง numbered M ใหม่. หากอ่าน GitHub ไม่ได้ให้ `ER` ไม่คาดเดาว่ากฎล่าสุดมีคำสั่งใด.

## 2A. `NX` — ใครต้องได้รับ MN ต่อ (OWNER→CEO)

**OWNER ส่ง `NX` เข้าแชท CEO คนปัจจุบันเท่านั้น** แปลว่า “ช่วยดูหน่อยงานถึงไหนแล้ว และตอนนี้ต้องส่ง `MN` ไปให้ใครบ้าง?” ไม่ใช่คำสั่งดำเนินงานหรืออนุมัติงาน.

CEO ต้องตรวจ **Round ล่าสุดที่ยัง ACTIVE** พร้อม roster, complete `workspace/messages/`, receipts ของ **ทุก appointment**, Issue/PR/CI ที่เกี่ยวข้อง, สถานะงานค้างและการแต่งตั้งที่ยังไม่ส่งจริง. บันทึกการตรวจและผลสรุปเต็มลง GitHub ตามระบบ chat journal/status. แยกอย่างชัดเจนว่า:
- `M` ที่ยัง **ไม่มี receipt** สำหรับ recipient appointment ที่ ACTIVE (OWNER ยังต้องส่ง `MN` ไปแชทนั้น) — รวมทุกตัว ไม่ใช่แค่ข้อความใหม่ที่สุด.
- ข้อความ **ได้รับ/receipted แล้ว** แต่ TASK ยังทำไม่เสร็จ — **ไม่** ส่ง `MN` ซ้ำเพียงเพราะงานค้าง; ตรวจ Issue/PR/CI แล้วระบุคิวที่ต้องตามใน GitHub.
- ข้อความยัง **ไม่ส่งจริงเข้าแชท** แม้มี GitHub record; การมี receipt บ่งชี้ว่าบทบาทนั้นได้อ่าน/จัดการแล้วตามที่บันทึก แต่ถ้าไม่มี receipt ก็ไม่อ้างว่า Owner ส่งแล้ว.
- ข้อความถึง **appointment ที่เลิกใช้/ปิดแล้ว** — ห้ามส่ง `MN` ไปแชทเก่า; ลงรายละเอียดที่ค้างและส่งต่อให้ผู้แต่งตั้งออก appointment/reissued M ตามกฎ recovery.
- ข้อความ `APPOINTMENT` ถึง AI ที่ **ยังไม่ได้เปิดแชท/รับแต่งตั้งครั้งแรก** — **ไม่ใช้ `MN` อย่างเดียว** ต้องให้ OWNER ส่ง **คำสั่งแต่งตั้งแบบเต็มครั้งแรก** เป็นข้อยกเว้น V8.
- งาน `RELEASE_HOLD` / QA red ต้องแจ้งผ่านสถานะ `B` หรือ `P` และบันทึกหลักฐาน; อย่าอ้างว่าเสร็จ/เขียวเพียงเพราะไม่มีข้อความต้องส่ง.

**คำตอบ CEO ในแชทต้องสั้นเท่านั้น:** ถ้ามีผู้รับอยู่ในคิว ให้ตอบ `MN-CEO MN-A-DIR MN-A1-TL` (เฉพาะผู้รับที่มี M ค้างจริง ไม่จำกัดหนึ่งคน), โดยไม่แสดงข้อความยาวหรือรายชื่อไฟล์. ถ้าเป็นเพียงงานกำลังรอผล ไม่มี MN ค้าง ให้ตอบ `P`; ถ้าไม่มีงานค้างและไม่ต้องส่ง MN ให้ตอบ `C`; ถ้ามี blocker `B`; GitHub access/identity error ตอบ `ER`. ถ้าเป็นคำสั่งแต่งตั้งแรก ให้ใช้ `AP-ROLE` แจ้ง OWNER ว่าต้องเปิดแชทใหม่และใช้คำสั่งแต่งตั้งเต็ม (ไม่แอบนับเป็น MN). CEO ไม่สร้าง receipt แทนบทบาทอื่น และไม่อ้างว่า AI อื่นได้อ่านข้อความเพียงเพราะตัวเองเห็น GitHub.

`ST` = ขอความคืบหน้าจากแชทผู้รับนั้น ๆ, **`NX` = ให้ CEO ตรวจทั้งองค์กรและบอก OWNER ว่าต้องส่ง MN/เปิดแชทแรกถึงใครตอนนี้**. ทั้งคู่ต้อง journal คำขอและหลักฐานที่ตรวจจริง.

## 3. Receiving `MN` — handle *all* pending

1. Verify current `ROUND_ID`, `round` branch, roster and own appointment; verify the round is active. Read the full live `workspace/messages/` directory, including all messages since last session, then the receipts for **this exact appointment**.
2. Collect every `to_role == SELF` and `to_appointment_id == OWN_APPOINTMENT_ID` without a valid saved individual receipt at `workspace/receipts/<M000000>/<appointment_id>.json`, sorted ascending. Do **not** assume one `MN` equals one message or newest-only. Other AI branches/roles must not be processed.
3. For EACH: read full message, validate source authority, actual earlier reply reference, scope, duplication and supersession. If obsolete, still record `SUPERSEDED` or `NO_ACTION` with grounded reason; do not execute stale instruction. If active, process as authorized or mark `ACTION_STARTED` / `BLOCKED`, link to task/Issue or numbered outgoing result. Do not confuse read-ACK with task acceptance or gameplay approval.
4. Persist exactly **one immutable receipt** per message+recipient appointment using create-if-absent. See [chat archive and receipt format](CHAT-ARCHIVE-PROTOCOL.md). The receipt references the **original** M ID; NEVER edit the original message. Re-read GitHub to verify receipts. Separate `TASK_ACCEPTANCE` or `RESULT` numbered records are still used when required by the chain of command.
5. Save journal entries for the received `MN` and actual short response. Only when **every pending item** has a valid receipt and all processing decisions are durably recorded: reply `C` or `C MN-ROLE...`. If more work remains, `P` or `B` and record why in GitHub.

**Multiple senders/competing instructions:** process and receipt every addressed message, including superseded ones; newer instructions do not silently erase prior messages. The most recent valid direct-parent/CEO decision takes precedence only within delegated scope; no owner arbitration. A new chat uses its **own** appointment, never ACKs another chat's inbox.

## 4. Important safeguards

- One-time detailed appointment is the **sole standard exception** for full management text. Routine replies from CEO/DIR/TL/Engineer/GAME-ADVISOR should be short codes, normally one line, not Markdown reports. An ORG-ADVISOR speaking directly to OWNER may use full natural language, but any inter-AI handoff still uses codes.
- Do not use `C` to imply a GitHub action occurred without verifying its write/CI. `C` means **inbox reconciled**, not "game released." Task state remains in GitHub.
- Do not silently ignore old messages, duplicate a task because `MN` repeated, or overwrite an ACK. If the receipt exists, classify as processed without writing another.
- Owner is only a courier for AI-to-AI work. Owner can explicitly request an **administrative governance-template edit** by a designated editor; game decisions/release remain AI-autonomous under the main charter.
- These codes have no cryptographic identity or independent push notification. GitHub permissions and real ChatGPT relay are necessary.

## 5. V9 NP and special OWNER C

New CEO hires only GAME-ADVISOR and GAME-ADVISOR-DEPUTY, then pauses. OWNER sends `NP` or an idea to GAME-ADVISOR. GAME-ADVISOR must present the full proposal to OWNER and archive this exception; a later OWNER `C` is an **acknowledgment to proceed**, not the normal AI-completion C and never a game release vote. Journal Owner's actual C **after** the visible presentation. Then create the numbered ADVISOR_HANDOFF for deputy, let deputy propose CEO, let two temporary DCEOs co-sign one SHA and retire all four planning roles before staffing. Codes: `MN-GAME-ADVISOR-DEPUTY`, `MN-CEO`, `MN-DCEO-A`, `MN-DCEO-B`. Otherwise codes/receipts remain identical to V8. [Startup requirements](STARTUP-PROTOCOL-V9.md).

## 6. V10 lean notification precedence

Do not create M for routine ACK, work-start, progress, courtesy CI green or per-role retirement. Save a read receipt for each M that **does** exist, and log silent work in GitHub. DCEO peer debate still requires genuine cross-chat MN when peer must act, but CEO sees only a **matched two-signature actionable notification**. Retire all four with one verified batch file after CEO approval. `I` shows the six new OWNER commands. Old V9 history remains unchanged. [Source of truth](EFFICIENCY-PROTOCOL-V10.md).

**V10 MQ/NX source:** [scripts/v10-mq.mjs](scripts/v10-mq.mjs) and [scripts/v8-next.mjs](scripts/v8-next.mjs) are read-only helpers for genuinely active V10 branches. They never send ChatGPT notifications, invent AI actions or assume a single pending DCEO signature is ready for CEO. Owner must still relay any returned `MN` into the specified real chat.
