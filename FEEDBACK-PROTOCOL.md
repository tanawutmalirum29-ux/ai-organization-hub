# V10 — AI game design consultation, proposals and final CEO decisions

> **V8 delivery:** Full proposals, balances, code review and evidence are written to GitHub as numbered messages. OWNER sees ONLY short `MN-ROLE` notifications; the recipient reads on `MN`, receipts every message and answers `C`/`MN-ROLE`. Never paste a long proposal into routine chat. ORG-ADVISOR↔OWNER organization brainstorming is the only full-language exception. See [Code Protocol](CODE-RELAY-PROTOCOL.md).

**V10 precedence:** Advice still goes via GAME-ADVISOR→DEPUTY→CEO and the DCEO two signatures, but only actionable dependencies should create a numbered M. Routine review drafts/short status are silent GitHub records, and no early CEO MN for incomplete signatures. No four retirement messages; use batch archive. See [V10 Lean](EFFICIENCY-PROTOCOL-V10.md).

**V9 precedence (historic):** the primary GAME-ADVISOR presents full work to OWNER after NP/Owner idea, waits for Owner C, sends ADVISOR_HANDOFF to deputy; the deputy advisor alone submits the initial independent PROPOSAL directly CEO; CEO then uses two DCEO independent signoffs. Old generic 'advisor directly to CEO' shortcuts below apply only to earlier rounds. See [V9 phases](STARTUP-PROTOCOL-V9.md).

This protocol supplements [README](README.md) and [MESSAGE-PROTOCOL](MESSAGE-PROTOCOL.md). It allows **all AI positions to make gameplay suggestions** without assigning new work or bypassing the CEO's internal implementation/QA/release gates.

## 1. Who may comment and where it goes

```text
             OWNER (copies messages; requests ideas; no veto)
                             ↕ relay
                            CEO ← GAME-ADVISOR (direct recommendations)
                             ↑
                            DIR
                             ↑
                             TL
                             ↑
                          Engineer
```

- Every active role may identify balance/technical/design issues and question conclusions respectfully. **Ideas are welcome; hierarchy controls execution, not thought.**
- Engineers write to their own TL, TL to own DIR, DIR to CEO, GAME-ADVISOR directly to CEO. CEO decides; OWNER receives copies/status only and never approves features, missions, scope, QA or merges.
- Managers assess and may forward a proposal upward as a *new* `PROPOSAL` with source message ID, author, assessment and evidence preserved. This is a new message from the manager, **not** an impersonation. Sending an idea to a different chat still requires the Owner to manually paste the verified numbered relay.
- Advisor may request a scoped read-only design review from CEO (via a numbered TASK), but has no veto, staffing powers, game write privileges or authority to order Engineers.
- An AI finishing a task should inspect game impact and identify material improvements; if no material concerns, it may say "no game-design concerns observed" in RESULT rather than creating noise. A real gameplay/QA defect remains a BLOCKED/REVIEW finding under normal gates.

## 2. What to evaluate

1. **Game loop & fun:** colony growth, resource sinks/sources, decision-making, progression, pacing, reward frequency.
2. **Balance:** soldier strength and survival, unit counters, enemy pressure, production timings, cost ratios, scarcity, snowball / dominant strategies.
3. **Usability:** selection clarity, UI overlap, troop-management workflow, mobile screens, CSS-based feedback, accessibility.
4. **Systems integration:** combat AI, exploration, raids, buildings, economy, research, unlocks, state synchronization, performance and failure modes.
5. **Practicality:** dependencies, build complexity, measurable acceptance tests, compatibility with live branches and regression risk.

Compare actual repository code/game data rather than inventing current numbers. Mark assumptions as assumptions. For balance changes, record **current value (verified if available) → proposed value or range**, reason, impact on adjacent systems, and a test/simulation scenario. Rank `P0` (blocking exploit or critical gameplay), `P1` (major imbalance/usability), `P2` (valuable enhancement), `P3` (optional polish). A priority tag alone grants no authority.

## 3. Numbered proposal record

All fields of a normal [ledger envelope](MESSAGE-PROTOCOL.md) apply. `proposal` is mandatory for `kind: "PROPOSAL"`, with **nonempty strings** for each of the six fields below:

```json
{
  "sequence": 12,
  "message_id": "EXAMPLE-ROUND-M000012",
  "round_id": "EXAMPLE-ROUND",
  "from_role": "GAME-ADVISOR",
  "from_appointment_id": "EXAMPLE-ROUND-GAME-ADVISOR-01",
  "to_role": "CEO",
  "to_appointment_id": "EXAMPLE-ROUND-CEO-01",
  "kind": "PROPOSAL",
  "event_key": "EXAMPLE-ROUND:PROPOSAL:combat-balance:1",
  "task_ref": "DESIGN_REVIEW/ant-project#<ACTUAL_ISSUE_IF_ANY>",
  "in_reply_to": null,
  "summary": "Review troop balance (illustrative only)",
  "proposal": {
    "subject": "Troop selection and unit cost balancing",
    "observed_problem": "Explain the issue; current values only if verified",
    "suggested_change": "Exact testable change and proposed range",
    "expected_effect": "Player-facing behavior and measurable outcome",
    "risks": "Adjacent mechanics, edge cases and regressions",
    "evidence": "Actual source links/commit/tests, or explicitly state missing evidence"
  },
  "relay_text": "ROUND_ID: EXAMPLE-ROUND\nMESSAGE_ID: EXAMPLE-ROUND-M000012\nFROM_ROLE: GAME-ADVISOR\nFROM_APPOINTMENT_ID: EXAMPLE-ROUND-GAME-ADVISOR-01\nTO_ROLE: CEO\nTO_APPOINTMENT_ID: EXAMPLE-ROUND-CEO-01\nTASK_REF: DESIGN_REVIEW/ant-project#<ACTUAL_ISSUE_IF_ANY>\nIN_REPLY_TO: NONE\nLEDGER_URL: <ACTUAL_SAVED_GITHUB_URL>\nSTATUS: PROPOSAL_SUBMITTED\nEVIDENCE: <ACTUAL_EVIDENCE>\nPROBLEM: <WHAT_HAPPENS_NOW>\nSUGGESTION: <EXACT_ADJUSTMENT>\nBALANCE_IMPACT: <EXPECTED_EFFECT_AND_RISKS>\nREQUESTED_ACTION: CEO evaluate, not implement"
}
```

**This JSON and its URLs are EXAMPLES ONLY**, not a live message. Never copy their `sequence`/`event_key` into a new round without reading the real ledger and creating the next available file. `FEEDBACK` can be shorter and does not require the structured proposal object; state specific observations and links in its summary/relay.

## 4. Decisions and triage

The direct recipient evaluates each proposal and records one numbered response to its author:

| decision.status | Meaning |
| --- | --- |
| `ACCEPTED_FOR_SCOPING` | Worth investigating/scoping; **NOT** development approval |
| `DEFERRED` | Relevant, postpone with reason/dependency |
| `REJECTED` | Not worthwhile/too risky, with concrete rationale |
| `NEEDS_DATA` | Missing measurements, reproduction, alternatives, or feasibility |

A `DECISION` must have `in_reply_to` pointing to the actual PROPOSAL/FEEDBACK, be addressed back to the sender of that message, and include `decision: {"status": "...", "rationale": "..." }`. Forward the exact saved numbered DECISION block through Owner to the original submitting chat. Intermediate managers may also escalate high-value proposals to their parent and independently send a `DECISION` (e.g. `DEFERRED` awaiting CEO verdict) to the subordinate.

CEO collects significant proposals, merges overlapping suggestions without losing attribution, consults teams, then **independently selects a mission** and records a numbered `MISSION_CHARTER` for a designated DIR. CEO decides the new mission scope and may authorize scoped development. During `IMPLEMENTATION_HOLD`, even `ACCEPTED_FOR_SCOPING` cannot start code until that CEO charter and downstream TASK delegation are verified. After independent QA, only CEO may record a `RELEASE` decision for game-main integration; Owner acts solely as courier.

## 5. Hard safeguards

- No new task, GitHub game mutation, role appointment, code change, merge, deployment or balance-value edit may be justified solely by an unaccepted recommendation. The saved CEO mission charter, direct-manager scoped TASK, independent review/QA and CEO release gate grant authority at their respective stages; no Owner sign-off is needed.
- No overwriting numbered historical messages or reporting that another chat received an unforwarded message.
- The separate `appointment-CEO/main` remains governance-only; log actual proposals/decisions on **the active round branch**, not `main`.
- Existing rounds may adopt V7 prospectively through a recorded CEO governance-adoption/status relay and `owner_relay_only_from_sequence` in round.json. No Owner approval is needed. Do not rewrite old role charters or message history.

## 6. Decision disagreements and transparent accountability

CEO solicits substantive objections from Advisor and DIR before choosing a mission and again before releasing. If opinions differ, CEO records the competing viewpoints, source evidence, test results, reason for selection, and acceptance metrics; **CEO makes the final call**. DIR/TL can decide details inside an approved charter, not silently add a new feature or veto CEO. Unresolved P0 test failures force `RELEASE_HOLD` until fixed or scope is safely revised and re-tested. Owner simply transports the corresponding numbered relays.
