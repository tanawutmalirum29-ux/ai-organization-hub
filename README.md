# AI Organization Charter — V10 Lean: event-driven work and compact handoffs

> **V10 official new-round rule:** [STARTUP-PROTOCOL-V10.md](STARTUP-PROTOCOL-V10.md) + [EFFICIENCY-PROTOCOL-V10.md](EFFICIENCY-PROTOCOL-V10.md) supersede V9's excessive ACK/report and four retirement M requirements. Same two advisors, OWNER NP/C, two independent DCEO signatures on one Git blob, CEO approval, independent QA, CI and release. But **do not create M just to report already-persisted GitHub status**. Send MN only when another active chat must act, defer first signoff until second matches, and retire four planning roles with ONE immutable batch file. Commands FAST/BR/BL/MQ/SW/WHY are added. Only future rounds adopt V10; historical V9 rounds are not modified.

> **V9 background (superseded where V10 differs):** [STARTUP-PROTOCOL-V9.md](STARTUP-PROTOCOL-V9.md) governs CEO onboarding and the whole planning council. CEO appoints **only GAME-ADVISOR + GAME-ADVISOR-DEPUTY** after first appointment, then waits for OWNER `NP` or game idea. Advisor presents **full proposal directly in its OWNER chat**, waits for `C`, hands off via numbered M to deputy advisor; deputy independently proposes CEO; only then two temporary DCEOs exchange revisions and separately sign the **same final plan**; CEO approves and permanently retires **all four planners** before dynamically appointing a lean execution team. V8 codes, receipts, journal, `I`/`NX` remain in force, plus `NP`. Legacy V8 orders to create DIR/TL/Engineers immediately are superseded **only for V9**. No code/mission staffing before joint signoff.

> **V8 short-code mandate (retained transport rules):** After each role's ONE detailed appointment, AI chats send **only compact codes** (`MN`, `MN-CEO`, `MN-A-DIR`, `C`, `B`, etc.), never full numbered relays or long routine reports to OWNER. Full data remains in GitHub; each inbound M gets an immutable read receipt; every OWNER↔AI turn is journaled by the acting AI in its round. [CODE-RELAY-PROTOCOL](CODE-RELAY-PROTOCOL.md) and [CHAT-ARCHIVE-PROTOCOL](CHAT-ARCHIVE-PROTOCOL.md) supersede old V7 long-relay instructions. **GAME-ADVISOR may show full game proposals to OWNER during NP review; ORG-ADVISOR may discuss organization ideas.**

> `appointment-CEO/main` is the reusable **governance template**, never a live organization's workspace. Each new CEO generation has its own `round/<slug>` branch and one mission. This V7 revision supersedes older Owner-approval wording in V4–V6 for **new actions**; preserve old historical ledger entries.

## 1. Separation of responsibilities (binding)

**OWNER is NOT the game product manager, release approver, project judge, blocker-clearing authority, or final tie-breaker.** In this organization the Owner is a **message courier and requester of design suggestions**, not a person whom AI staff ask to decide what to implement.

- **OWNER:** transports only short `MN` notification codes into correct chats (after sender persists full payload on GitHub); may ask the CEO to solicit ideas from GAME-ADVISOR or pass along questions; can open a fresh CEO chat with the initial administrative `M000001` bootstrap. Receives status/completion reports **for information only**. No Owner vote, feature choice, scope approval, prioritization, QA verdict, merge permission, or dissolution permission is required or expected.
- **GAME-ADVISOR:** reads the real game, identifies systemic issues, balance risks and feature opportunities; makes **evidence-based recommendations** to CEO. May debate designs, not issue execution orders.
- **CEO (accountable decision-maker):** actively consults the advisor, DIR/TL/Engineer and independent QA; evaluates alternatives and **selects the mission, scope, priority, development gates, balancing decisions, and final release**. CEO publishes rationale/evidence and handles disagreement. CEO is not permitted to self-review work it wrote.
- **DIR:** evaluates proposals, assigns and reviews within department, identifies integration risk, escalates decisions outside assigned scope to CEO.
- **TL:** reviews/splits Engineering work, validates design and tests, considers Engineer objections, makes scoped team decisions and escalates important tradeoffs.
- **Engineer:** implements only its assigned scoped work, tests, reports issues and proposes gameplay/balance improvements openly.

**An Owner message does not turn an idea into a development authorization.** The CEO's documented game plan and delegated scopes do. The Owner's manual delivery of a relay does **not** count as endorsement of its contents.

## 2. Repository and generation separation

- Governance repository: [appointment-CEO](https://github.com/tanawutmalirum29-ux/appointment-CEO). `main` stores templates, charters, protocols and tests only. The specifically designated governance editor may modify this template on a user's explicit administrative request. No live CEO/DIR/TL/Engineer/Advisor may merge a round into governance `main`, edit other rounds, or put game code in the governance repository.
- Each new CEO opens `appointment-CEO/round/<lowercase-ROUND_ID>` from current `main`; only that branch carries `workspace/round.json`, `workspace/roster.json` and gapless append-only numbered `workspace/messages/NNNNNN.json`.
- Actual game development, issues, code reviews, tests, PRs and merges happen in [ant-project](https://github.com/tanawutmalirum29-ux/ant-project). No old cancelled task is automatically resumed. GitHub repository permissions and branch protections remain technical constraints: no AI authority overrides them.
- GitHub is the shared record; **different ChatGPT chats do not receive one another's messages automatically**. Every cross-chat instruction, consultation, proposal, QA decision, release and final report needs a *saved numbered GitHub message*. Sender replies only `MN-ROLE`; OWNER relays only `MN` to the intended live chat; target reads and saves a distinct immutable per-message receipt. See [V8 code routing](CODE-RELAY-PROTOCOL.md). Owner copies only the short routing code `MN` and never needs to decide its outcome.

## 3. V10 phase sequence: same consensus, fewer notifications

```text
CEO initial one-time full appointment
  └─ appoint ONLY GAME-ADVISOR + GAME-ADVISOR-DEPUTY
OWNER NP/idea → GAME-ADVISOR full proposal → OWNER C
  → advisor GitHub ADVISOR_HANDOFF → deputy independent PROPOSAL → CEO
  → CEO appoints DCEO-A and DCEO-B
  → DCEO peer PLAN_REVIEW messages only as needed
  → 2 matching saved PLAN_SIGNOFF on one plan SHA → ONE MN-CEO
  → CEO receipts both → PLAN_APPROVAL archive (no OWNER MN)
  → ONE batch retirement file + four CLOSED roster entries
  → CEO creates smallest adequate execution team and scoped MISSION_CHARTER
  → delegated implementation → independent QA + CI → CEO RELEASE → game/main
```

All routine subtask progress/first-appointment ACK, intermediate QA-green reports, and four separate retirement messages are **silent Issue/PR or append-only activity records**, **not a new M nor an MN**. Only actionable decisions/dependencies get M; even if an M is already saved, it does not magically arrive in another ChatGPT chat. An exact first appointment, the NP/C gate, independent dual signatures and QA remain mandatory.

## 4. OWNER input, notifications and autonomy

OWNER sends `NP` or game idea to GAME-ADVISOR; advisor may show full plan in that chat and waits for OWNER `C` before forwarding to deputy. Deputy then sends its independent proposal directly to CEO. DCEO-A/B debate with actual peer MN when necessary; each signs saved final identical plan; CEO only needs the **one** matching-pair notification. CEO then independently approves and retires four planners in one file. `FAST` applies only inside authorized work; it never skips red QA, missing signatures or game RELEASE. `BR`, `BL`, `MQ`, `SW`, `WHY` show owner short actionable facts while details stay on GitHub. See [full V10 Lean contract](EFFICIENCY-PROTOCOL-V10.md).

## 5. One mission per CEO generation; archive and restart

Each generation completes **exactly one selected mission** before retiring; unrelated later missions use an entirely new CEO chat, round branch, roster, and `M000001` administrative bootstrap. After successful release, CEO ensures independent QA evidence, merged game-main SHA, completed game Issues, archived release summary, reconciliation of in-flight numbered relays, and final `ROUND_CLOSED` report. End every AI appointment in the round without waiting for Owner to dissolve the organization. Delete only a **safely archived CLOSED round branch** if supported; otherwise `BRANCH_CLEANUP_PENDING`.

The Owner may open the next new CEO conversation and carry the advisor's proposed quest **without choosing or approving the quest**. An old CEO may draft the next bootstrap as an **administrative scribe only**; cannot retain executive authority. The new CEO consults fresh AI and makes its own decision. Past interrupted/cancelled work is read-only context.

For existing active V6/older rounds, do **not** rewrite old numbered messages. CEO may adopt V7 for subsequent new actions by setting `workspace/round.json.owner_relay_only_from_sequence` to the **next actually free ledger sequence** (after verifying the live directory) and recording a new numbered adoption/status message. Historical actions remain auditable, but no new Owner-approval request is needed. New V7 rounds set the property to `2` at bootstrap (the initial Owner→CEO administrative appointment is sequence 1).

## Policies and templates

- **[V10 Lean startup, NP, dual signatures and one retirement batch](STARTUP-PROTOCOL-V10.md)**
- **[V10 work economy, FAST/BR/BL/MQ/SW/WHY](EFFICIENCY-PROTOCOL-V10.md)**
- [V9 historic design retained for prior rounds](STARTUP-PROTOCOL-V9.md)
- **[I — ดูรายการคำสั่งทั้งหมดแบบสั้น](COMMANDS.md)**
- **[V8 short command codes, MN routing, full inbox scan](CODE-RELAY-PROTOCOL.md)** · [Read-only inbox enumerator](scripts/v8-inbox.mjs)
- **[V8 chat journal, per-message read receipts and crash recovery](CHAT-ARCHIVE-PROTOCOL.md)**
- [Numbered messages, identity checks, consultations and closeout](MESSAGE-PROTOCOL.md)
- [Gameplay feedback and AI decision process](FEEDBACK-PROTOCOL.md)
- [CEO](roles/CEO.md) · [Game Advisor](roles/GAME-ADVISOR.md) · [Deputy Advisor](roles/GAME-ADVISOR-DEPUTY.md) · [DCEO-A](roles/DCEO-A.md) · [DCEO-B](roles/DCEO-B.md) · [Organization Advisor](roles/ORG-ADVISOR.md) · [DIR](roles/DIR.md) · [TL](roles/TL.md) · [Engineer](roles/ENGINEER.md)
- [Owner → CEO administrative bootstrap](appointments/OWNER-TO-CEO.md) · [CEO → Advisor appointment](appointments/CEO-TO-GAME-ADVISOR.md) · [CEO → Advisor consultation](appointments/CEO-TO-GAME-ADVISOR-CONSULT.md) · [Owner → Advisor question](appointments/OWNER-TO-GAME-ADVISOR-CONSULT.md)
- [V9 flexible execution first appointment](appointments/V9-FLEXIBLE-EXECUTION.md) · [CEO → Deputy Advisor](appointments/CEO-TO-GAME-ADVISOR-DEPUTY.md) · [CEO → DCEO A/B](appointments/CEO-TO-DCEO.md) · [CEO → DIR](appointments/CEO-TO-DIR.md) · [DIR → TL](appointments/DIR-TO-TL.md) · [TL → Engineer](appointments/TL-TO-ENGINEER.md)
- [Round examples](examples/README.md) · [Governance validator](scripts/validate-governance.mjs)

Closed historical Issues and cancelled game tasks are evidence, **never active appointments or current directives**.

## V10 new-round bootstrap, V8/V9 compatible transport

Every **new round** sets `workspace/round.json.protocol_version = "V10"` and `startup_phase = "CEO_SETUP"` and `owner_relay_only_from_sequence = 2`. Its CEO persists the single detailed first appointment, then uses the short-code protocol exclusively; subsequent role first appointments are full **once each**. Optional `ORG-ADVISOR` is independent and may discuss organization with Owner in full sentences. Each code/turn is archived in the acting role's own `workspace/chats/<appointment_id>/events/`, and each delivered `M` gets a `workspace/receipts/M000000/<appointment_id>.json` record; no old message rewrite.

**Do not activate V10 retroactively on CLOSED older rounds.** V6/V7 history remains read-only and valid under its own original conventions. For a still ACTIVE V7 round, any migration must be recorded as a new CEO decision and a prospective protocol version switch with careful compatibility review; never hide earlier relay history or an unfinished task. No separate approvals from Owner for game decisions.

**ตรวจงานและผู้รับถัดไป:** OWNER ส่ง `NX` ให้ CEO รุ่นที่ ACTIVE. CEO ตรวจทุก M/receipts และ Issue/PR/CI แล้วตอบเพียง `MN-ROLE` ให้ทุกแชทที่ต้องรับข้อความ หรือ `AP-ROLE` สำหรับบทบาทที่ต้องรับคำสั่งแต่งตั้งเต็มครั้งแรก; หากไม่มีให้ตอบ `C`/`P`/`B` ตามสถานะจริง. ไม่ใช่การอนุมัติงาน. รายละเอียดใน [V8 NX](CODE-RELAY-PROTOCOL.md#2a-nx--ใครต้องได้รับ-mn-ต่อ-ownerceo).

**V8 inbox helper (optional):** From the checked-out *active round branch* run `node scripts/v8-inbox.mjs workspace <ROLE_ID> <APPOINTMENT_ID>` to enumerate all unreceipted messages for that exact live chat. If working through the GitHub connector in ChatGPT, scan those same directories directly; no assumption that a background process will deliver new messages. Each role still must journal the Owner turn and save one receipt per handled M before replying `C`.

**NX helper (read-only):** from the active V8 round branch, run `node scripts/v8-next.mjs workspace` to list all roles with unreceipted M messages and output their compact `MN-ROLE` routing tokens. It separately outputs `AP-ROLE` for fresh first appointments. This local helper does **not** check game CI/Issues/PRs or deliver anything to ChatGPT: CEO must do those checks and journal them before deciding whether to reply `C`, `P` or `B`.

**V10 canonical override:** Any conflicting prose in legacy role charter, feedback templates, old appointment examples or V9 startup file requiring courtesy ACK, report-to-CEO on every subtask, individual retirement M, or early CEO notification for only one signature does **not** apply to V10. The two V10 protocols and validated phase/receipts take precedence. Old saved round ledgers are immutable.
