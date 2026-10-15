# AI Organization Charter — V8: GitHub-first short-code communication; AI-led decisions

> **V8 short-code mandate:** After each role's ONE detailed appointment, AI chats send **only compact codes** (`MN`, `MN-CEO`, `MN-A-DIR`, `C`, `B`, etc.), never full numbered relays or long routine reports to OWNER. Full data remains in GitHub; each inbound M gets an immutable read receipt; every OWNER↔AI turn is journaled by the acting AI in its round. [CODE-RELAY-PROTOCOL](CODE-RELAY-PROTOCOL.md) and [CHAT-ARCHIVE-PROTOCOL](CHAT-ARCHIVE-PROTOCOL.md) supersede old V7 long-relay instructions. **ORG-ADVISOR alone may discuss organizational ideas with OWNER in full prose.**

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

## 3. Organization and staffing

```text
OWNER (courier + new-chat bootstrap; no game approval)
  │  transports verified relay messages
  └── CEO (final AI game decision and release)
        ├── GAME-ADVISOR (one per round, advice only)
        └── DIR-A / DIR-B / ... (as many departments as work requires)
              ├── TL-A1 (at most three E-A1-1/-2/-3)
              └── TL-A2 (at most three E-A2-1/-2/-3)
```

**Optional independent ORG-ADVISOR:** reports organizational recommendations to OWNER in full language; not a CEO game subordinate or a release approver. It does not count against DIR/TL/Engineer slots. Its AI-to-AI messages still use V8 codes and its Owner discussion is archived.

There is **no global AI-chat headcount cap**. One DIR has at most **two** TLs. One TL has at most **three** Engineers. Four Engineers in a department require two TLs (2+2 or 3+1), not `E-A1-4`. Every new generation gets **fresh, distinct chats, appointment IDs and acknowledgments**; do not inherit old staff. CEO appoints one GAME-ADVISOR (fresh chat) unless the role is already appointed this generation; CEO appoints DIRs, DIR appoints TLs, TL appoints Engineers. Owner never approves staffing decisions.

## 4. Consultation → collective evaluation → CEO decision → delivery

1. **Idea request:** Owner may request a recommendation **directly from GAME-ADVISOR**, with a saved numbered `OWNER→GAME-ADVISOR CONSULTATION_REQUEST`; CEO as round-ledger coordinator records the Owner's *verbatim question* first, and Owner forwards it. CEO may also issue its own numbered consultation request. Neither form is a decision or approval. Owner sends `MN` to the advisor chat; the advisor responds with a saved `PROPOSAL` to CEO and Owner sends `MN` to CEO for that response. This is a **request for advice, not an Owner decision or implementation order**. See [advisor consultation template](appointments/CEO-TO-GAME-ADVISOR-CONSULT.md).
2. **Debate:** Any Engineer/TL/DIR/Advisor may submit grounded `FEEDBACK` or structured `PROPOSAL`. Engineers go to own TL → DIR → CEO; advisor and DIR go to CEO. Managers retain original authorship and examine costs, gameplay balance, technical feasibility, alternatives, acceptance criteria and QA risks.
3. **Decision:** CEO responds with a numbered `DECISION` to the original reporting AI and selects its own implementation mission. Before game implementation, CEO records a **numbered `MISSION_CHARTER` addressed to the responsible DIR**, including scope, non-goals, relevant proposals, constraints, measurable acceptance and QA plan. A proposed change alone is never a task.
4. **Execution:** DIR/TL appoint/assign within their role limits using numbered `TASK` messages against the selected charter. Engineers can start only after their own authenticated scoped TASK and the CEO's charter; `IMPLEMENTATION_HOLD` remains in force until that internal gate opens. Unapproved changes cannot be introduced by suggestion alone.
5. **Independent QA and release:** Another contributor who did not author the relevant change must review it, tests/CI must pass, critical QA blockers must be resolved, and CEO must record a `RELEASE` authorization with actual PR/test/QA evidence. CEO directs the authorized game-main integration, verifies the post-merge `ant-project/main` SHA, and reports result. **Do not request or wait for Owner merge approval.** A failed gate means `RELEASE_HOLD`, not a fake success.
6. **Automatic dissolution:** After release reaches game main, evidence is archived, task issues are resolved, and all pending handoffs are reconciled, CEO *automatically* closes the full generation. Final `CEO→OWNER ROUND_CLOSED` is a status report **only**. No Owner approval for cleanup, merge or dissolution. If a mission is discontinued before shipment, CEO makes a documented `AI_CANCELLED` decision after consultation and archives the reason; never report it as shipped.

## 5. One mission per CEO generation; archive and restart

Each generation completes **exactly one selected mission** before retiring; unrelated later missions use an entirely new CEO chat, round branch, roster, and `M000001` administrative bootstrap. After successful release, CEO ensures independent QA evidence, merged game-main SHA, completed game Issues, archived release summary, reconciliation of in-flight numbered relays, and final `ROUND_CLOSED` report. End every AI appointment in the round without waiting for Owner to dissolve the organization. Delete only a **safely archived CLOSED round branch** if supported; otherwise `BRANCH_CLEANUP_PENDING`.

The Owner may open the next new CEO conversation and carry the advisor's proposed quest **without choosing or approving the quest**. An old CEO may draft the next bootstrap as an **administrative scribe only**; cannot retain executive authority. The new CEO consults fresh AI and makes its own decision. Past interrupted/cancelled work is read-only context.

For existing active V6/older rounds, do **not** rewrite old numbered messages. CEO may adopt V7 for subsequent new actions by setting `workspace/round.json.owner_relay_only_from_sequence` to the **next actually free ledger sequence** (after verifying the live directory) and recording a new numbered adoption/status message. Historical actions remain auditable, but no new Owner-approval request is needed. New V7 rounds set the property to `2` at bootstrap (the initial Owner→CEO administrative appointment is sequence 1).

## Policies and templates

- **[V8 short command codes, MN routing, full inbox scan](CODE-RELAY-PROTOCOL.md)** · [Read-only inbox enumerator](scripts/v8-inbox.mjs)
- **[V8 chat journal, per-message read receipts and crash recovery](CHAT-ARCHIVE-PROTOCOL.md)**
- [Numbered messages, identity checks, consultations and closeout](MESSAGE-PROTOCOL.md)
- [Gameplay feedback and AI decision process](FEEDBACK-PROTOCOL.md)
- [CEO](roles/CEO.md) · [Game Advisor](roles/GAME-ADVISOR.md) · [Organization Advisor](roles/ORG-ADVISOR.md) · [DIR](roles/DIR.md) · [TL](roles/TL.md) · [Engineer](roles/ENGINEER.md)
- [Owner → CEO administrative bootstrap](appointments/OWNER-TO-CEO.md) · [CEO → Advisor appointment](appointments/CEO-TO-GAME-ADVISOR.md) · [CEO → Advisor consultation](appointments/CEO-TO-GAME-ADVISOR-CONSULT.md) · [Owner → Advisor question](appointments/OWNER-TO-GAME-ADVISOR-CONSULT.md)
- [CEO → DIR](appointments/CEO-TO-DIR.md) · [DIR → TL](appointments/DIR-TO-TL.md) · [TL → Engineer](appointments/TL-TO-ENGINEER.md)
- [Round examples](examples/README.md) · [Governance validator](scripts/validate-governance.mjs)

Closed historical Issues and cancelled game tasks are evidence, **never active appointments or current directives**.

## V8 new-round bootstrap and compatibility

Every **new round** sets `workspace/round.json.protocol_version = "V8"` and `owner_relay_only_from_sequence = 2`. Its CEO persists the single detailed first appointment, then uses the short-code protocol exclusively; subsequent role first appointments are full **once each**. Optional `ORG-ADVISOR` is independent and may discuss organization with Owner in full sentences. Each code/turn is archived in the acting role's own `workspace/chats/<appointment_id>/events/`, and each delivered `M` gets a `workspace/receipts/M000000/<appointment_id>.json` record; no old message rewrite.

**Do not activate V8 retroactively on CLOSED older rounds.** V6/V7 history remains read-only and valid under its own original conventions. For a still ACTIVE V7 round, any migration must be recorded as a new CEO decision and a prospective protocol version switch with careful compatibility review; never hide earlier relay history or an unfinished task. No separate approvals from Owner for game decisions.

**V8 inbox helper (optional):** From the checked-out *active round branch* run `node scripts/v8-inbox.mjs workspace <ROLE_ID> <APPOINTMENT_ID>` to enumerate all unreceipted messages for that exact live chat. If working through the GitHub connector in ChatGPT, scan those same directories directly; no assumption that a background process will deliver new messages. Each role still must journal the Owner turn and save one receipt per handled M before replying `C`.
