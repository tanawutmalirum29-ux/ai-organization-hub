# V10 — Numbered GitHub messages; staged consultation and V8 compact transport

> **V10 LEAN OVERRIDE:** For new V10 rounds, [STARTUP-PROTOCOL-V10](STARTUP-PROTOCOL-V10.md) + [EFFICIENCY-PROTOCOL-V10](EFFICIENCY-PROTOCOL-V10.md) prevail: do NOT create ACK/REPORT/courtesy M, suppress first DCEO signoff notification until second same SHA, use a single validated batch-retirement file instead of four M. Keep full NP/C and all independent signature/QA gates. V9 still governs older V9 rounds.

> **V9 PLANNING SEQUENCE OVERRIDE (historic):** All new CEO rounds must follow [STARTUP-PROTOCOL-V9](STARTUP-PROTOCOL-V9.md): advisor/deputy only → OWNER NP or idea → full advisor proposal → journaled OWNER C → deputy proposal CEO → two peer DCEO signatures on same plan → CEO approval and planner retirements → flexible execution team. This phase gate supersedes old onboarding prose and old adviser→CEO direct suggestions before deputy review. M kinds ADVISOR_PRESENTATION, ADVISOR_HANDOFF, PLAN_REVIEW, PLAN_SIGNOFF, PLAN_APPROVAL, ROLE_RETIRED are checked by governance validator.

**ACTIVE V8 RULE (takes precedence over older wording anywhere in this document):** Full `relay_text` remains in immutable GitHub JSON **only**. After the very first one-time full appointment per new or replacement AI chat, absolutely **no long chat relay blocks**: sender outputs `MN-ROLE`; Owner posts `MN` into target chat; receiver scans all pending M IDs and writes individual sidecar read receipts; its reply is `C`, `C MN-ROLE`, `P`, `B`, or `ER`. Every Owner↔AI interaction is journaled. The sole natural-language chat exception is appointed `ORG-ADVISOR` speaking with Owner. Read [CODE-RELAY-PROTOCOL](CODE-RELAY-PROTOCOL.md) and [CHAT-ARCHIVE-PROTOCOL](CHAT-ARCHIVE-PROTOCOL.md). The long example below is a **GitHub payload example, not text to paste into ordinary chats**.

**Scope:** ALL CEO/GAME-ADVISOR/DIR/TL/Engineer outbound instructions, appointments, ACKs, game feedback, proposals, decisions, work reports, QA verdicts, blockers, refusals and release handoffs. Owner transports only the short notification code; the complete copy-ready audit text stays in GitHub. GitHub is the source of truth for sequence/receipts, not shared chat memory.

## 1. Round bootstrap

1. Owner transmits a **new unique** `ROUND_ID` (`[A-Z0-9][A-Z0-9-]{2,39}`) for ONE CEO generation, e.g. `COLONY-NEXT-02`, and its specific game repository. Owner's initial new-CEO appointment is explicitly numbered `<ROUND_ID>-M000001` (bootstrap exception: a branch does not exist *yet*).
2. The appointed CEO must verify that the proposed `round/<lowercase-round-id>` branch does **not** already exist. If it exists, halt and ask Owner to resolve the collision: never hijack a previous round.
3. CEO creates its round branch from governance `main`, creates `workspace/round.json`, `workspace/roster.json`, and persists the original Owner→CEO appointment as `workspace/messages/000001.json`, **verbatim** (including copy-ready relay). Record CEO's own new `APPOINTMENT_ID` in roster. After accepting, CEO generates and persists its ACK as `000002.json` and saves a verifiable ACK/receipt and replies briefly (normally `C`, plus `MN-ROLE` if a message was created).
4. For an old V7 round, `workspace/round.json` sets `owner_relay_only_from_sequence: 2`; for an existing round adopting V7, set it to the next available sequence, preserving old records. All subsequent append-only messages use the branch's sequential ledger. Do not modify governance `main`, inherit any prior-round message number, or merge this branch to `main`.

**Onboarding to GitHub:** each receiving AI must read main README, its role charter, this protocol, [feedback protocol](FEEDBACK-PROTOCOL.md), and live `workspace/round.json`/`roster.json` from its **appointed branch**. No AI knows another conversation's completion without Owner relay.

## Staffing rule (no overall AI headcount cap)

There is **no global maximum number of AI chats**. Exactly one role ID `GAME-ADVISOR` may be appointed per round (directly by CEO; no subordinates; does not consume a DIR/TL/Engineer seat). One DIR has at most **two** TLs. A TL can have **one, two or three Engineers** numbered `-1`, `-2`, `-3`; a fourth Engineer is invalid under the same TL and requires the Director's second TL. Use 2+2 or 3+1 for four Engineers. `E-A1-4` and `TL-A3` are invalid. New appointments still require numbered ledger entries, short Owner-carried `MN`, distinct fresh AI chats and exact parent-child identity checks.

## 2. Ledger envelope and numbering

Each `workspace/messages/NNNNNN.json` is immutable and includes at least:

```json
{
  "sequence": 3,
  "message_id": "COLONY-NEXT-02-M000003",
  "round_id": "COLONY-NEXT-02",
  "from_role": "CEO",
  "from_appointment_id": "COLONY-NEXT-02-CEO-01",
  "to_role": "DIR-A",
  "to_appointment_id": "COLONY-NEXT-02-DIR-A-01",
  "kind": "APPOINTMENT",
  "event_key": "COLONY-NEXT-02:APPOINT:DIR-A:01",
  "task_ref": "ORG_SETUP",
  "in_reply_to": null,
  "summary": "แต่งตั้ง DIR-A รุ่นใหม่",
  "relay_text": "ROUND_ID: COLONY-NEXT-02\nMESSAGE_ID: COLONY-NEXT-02-M000003\nFROM_ROLE: CEO\nTO_ROLE: DIR-A\nFROM_APPOINTMENT_ID: COLONY-NEXT-02-CEO-01\nTO_APPOINTMENT_ID: COLONY-NEXT-02-DIR-A-01\nTASK_REF: ORG_SETUP\nIN_REPLY_TO: NONE\n...คำสั่งเต็ม..."
}
```

- Next number = **last existing sequential `NNNNNN.json` + 1** after fetching the live message directory from GitHub on your `round/` branch. Must be gapless beginning at 000001, unique **per round**. Never derive it from issue numbers, memory, local clock, stale snapshots or other branches.
- Before writing: check existing `message_id`, `event_key` (semantic idempotency key per distinct action), any reply linked to `in_reply_to`, and recipient appointment. If it is already logged, **do not send again**.
- Create **one new file** with that exact six-digit filename using GitHub's create-if-absent file API. If branch HEAD or name changed/concurrent writer caused a conflict: re-fetch the directory and redo all checks, then retry with the next actual number. Never overwrite a saved message or rebase into an invented sequence.
- A message is **NOT ISSUED** until the file write succeeded and its permanent GitHub URL is verified. If tooling prevents write/verification, **stop and report `HANDOFF_BLOCKED`**. Automated [validation](scripts/validate-governance.mjs) checks sequences, IDs, duplicate event keys, identities, reply links, and mandatory relay fields.
- Any ACK/RESULT/REJECTED for an incoming message uses a **new** message ID and `in_reply_to` set to the incoming ID; do not reuse the incoming ID as the outgoing reply. Further STATUS updates need distinct `event_key` values and true new evidence.

## 2A. Feedback message types (V5)

Use exactly the same numbered, GitHub-persisted copy-ready relay as any other action. [FEEDBACK-PROTOCOL.md](FEEDBACK-PROTOCOL.md) defines the full template and triage.

- `FEEDBACK`: a specific observation or concern, **to one's direct parent only** (GAME-ADVISOR/DIR to CEO, TL to DIR, Engineer to TL). CEO may send a non-decision REPORT to Owner, not submit proposals for Owner adjudication. May be unsolicited or in reply to assigned work.
- `PROPOSAL`: a concrete recommendation to the same direct parent, with a mandatory `proposal` object containing nonempty `subject`, `observed_problem`, `suggested_change`, `expected_effect`, `risks`, and `evidence` strings. Proposals may be escalated by the recipient to their own parent using a **new numbered message** and a link/reference to the original; do not impersonate the original author.
- `DECISION`: direct parent's numbered response to an existing earlier FEEDBACK/PROPOSAL addressed to them. Must reply with `in_reply_to` pointing to that exact message, return **to its author**, and include `decision.status` from `ACCEPTED_FOR_SCOPING`, `DEFERRED`, `REJECTED`, or `NEEDS_DATA`, plus a nonempty `decision.rationale`. `ACCEPTED_FOR_SCOPING` permits drafting plans **only**, not source changes.
- `IN_REPLY_TO` for FEEDBACK/PROPOSAL may be `NONE` if unsolicited, or a valid received message if relevant. Reply-link verification still applies. For DECISION it is mandatory.
- `CONSULTATION_REQUEST`: an Owner question sent **OWNER→GAME-ADVISOR**, or a CEO question sent **CEO→GAME-ADVISOR**, and containing `consultation.topic` (nonempty). CEO, as round ledger coordinator, must record the Owner's verbatim read-only question before Owner forwards it. Advisor replies with `PROPOSAL` **to CEO** citing the consultation message as `in_reply_to`. Owner cannot issue any other post-bootstrap command or decide the outcome.
- `MISSION_CHARTER`: from CEO to an appointed DIR with structured `mission.scope`, `mission.non_goals`, `mission.source_proposals`, `mission.acceptance_criteria`, `mission.qa_plan` (nonempty strings). It is CEO's independently made game-development authorization after consultation.
- `RELEASE`: only CEO to DIR for game-main integration, with `release.pr_url`, `release.qa_evidence`, `release.ci_evidence`, `release.rationale`. Do not merge without the stated gate and verified evidence.
- **No suggestion alone grants implementation rights;** the CEO's MISSION_CHARTER, delegated tasks, independent QA and CEO RELEASE control delivery. Owner approval is not part of any of these gates.

## 3. V8 receiving gate: short MN and immutable receipts

A role never executes from an unverified chat code alone. On receiving `MN`, first validate round, current role and appointment ID, inspect every live numbered GitHub message addressed to that exact appointment (not just the newest), skip already individually receipted messages, and classify **all** remaining valid messages in sequence. Even obsolete/duplicate messages get one correctly reasoned `SUPERSEDED` or `NO_ACTION` sidecar read receipt, without executing stale work. Unauthorized/spoofed messages receive `REJECTED` evidence; do not act.

Each read receipt is a **separate immutable** `workspace/receipts/M000000/<appointment_id>.json` file referring to the original M. Never overwrite the original M's body to mark read; do not create duplicate receipts. For assigned engineering tasks, any required numbered `TASK_ACCEPTANCE`, `RESULT`, `BLOCKED`, QA or RELEASE is a **separate** record and does not replace the read receipt.

If the recipient's `MN` includes multiple incoming messages, all must be checked/receipted before the chat response `C`; if work is still ongoing, record it in GitHub and use `P` / `B`. No message is silently dropped merely because it was superseded by a newer directive. Where GitHub cannot be accessed, report `ER`, not false success. See the complete [V8 checklist](CODE-RELAY-PROTOCOL.md).

## 3.0 Quick command reference via `I`

OWNER sends `I` to an appointed active AI chat to receive the short [canonical command list](COMMANDS.md) in-chat. This small reference-only reply is an explicit exception to routine code-only replies; **never** include an actual full M body, report, QA evidence or chat log. Journal the OWNER's `I` and the returned concise cheat sheet. This is not an AI-to-AI message and creates no extra global message record.

## 3A. Organization-wide status and courier instructions via `NX`

OWNER sends `NX` to the **current CEO** to ask "Where is work up to, and whom should I MN next?" CEO must inspect the live roster, all messages, all individual receipts, open game Issues/PR/CI, first appointments and outstanding tasks; write detailed findings **only to GitHub**. Reply with **all** relevant short `MN-ROLE` codes, `AP-ROLE` for an initial appointment requiring its full one-time text, or `C`/`P`/`B`/`ER` if none to route. Never direct OWNER to a retired chat, never mark another chat's message read, and never assume a GitHub-saved message was physically relayed. [Full NX rules](CODE-RELAY-PROTOCOL.md#2a-nx--ใครต้องได้รับ-mn-ต่อ-ownerceo).

## 4. Owner-facing **short replies only**

**First appointment:** full detail once, including role, fresh ID, parent, branch, repo, authority, duties, codes and journaling. All later chat replies must be short (normally a single code line):

```text
MN-A-DIR
MN-CEO
C
C MN-CEO MN-A-DIR
P
B
ER
```

Long instruction content, status, evidence, SHA and decisions stay in GitHub. Sender sends `MN-ROLE` **only after** successfully persisting and verifying the new M JSON. Owner forwards `MN` into the relevant role's chat, **not the original long text**. Save each Owner and AI turn under `workspace/chats/<appointment-id>/events/` before claiming `C`. **ORG-ADVISOR↔OWNER full conversation is permitted and journaled.**

Do not misinterpret the short code as a cryptographic sender identity, a merge authorization, or automatic cross-chat delivery.

## 5. V8/V7 Closeout — ONE mission per round, self-directed by AI

A successful mission closes only after **CEO-authorized** merge to `ant-project/main`, independent QA and CI, exact final main SHA verification, completed game task Issues/PRs, permanent release/evidence summary and safe relay reconciliation. **No Owner approval or signature is part of scope, merge, QA acceptance or team dissolution.**

1. Verify the saved CEO `RELEASE` message, PR/CI/independent-QA evidence, actual merged game-main SHA and game-side summary. If any condition is missing, record `CLOSEOUT_HOLD`.
2. Check all appointed Advisor/DIR/TL/Engineer chats' remaining work and relays; never assume other chats read GitHub automatically.
3. Append a new sequential `CEO→OWNER` `ROUND_CLOSED` report with `closure_reason=MISSION_COMPLETED`, verified exact SHA and links, and full Owner-copy-ready status. **It is a notification, not a request for authorization.**
4. Mark every roster role, including CEO/Advisor/pending appointments, `CLOSED`; set round `state=CLOSED`, final game SHA, and durable `closure_evidence_url`. Validate the round and preserve append-only history.
5. Retire the generation without prompting Owner. If branch cleanup is safe and permitted, delete only this CLOSED round branch; otherwise report `BRANCH_CLEANUP_PENDING`.

**Unshipped cancellation:** CEO may cancel a mission after recording its own consultation-backed reason as `AI_CANCELLED`. Preserve game issues/PRs, close work as `not_planned`, never claim a shipped SHA, issue terminal `ROUND_CLOSED`, close the roster and supply `ai_cancellation_evidence_url`. Legacy closed `OWNER_CANCELLED` entries remain valid historical records but are **not** a V7 Owner veto or decision mechanism.

The next mission requires a new CEO round, new chat and new appointments. Owner only transports the new administrative bootstrap and future relay blocks. An old CEO may draft a new bootstrap as a retired scribe, with no continuing decision authority. Old messages never transfer authority into a new round.

For V9, OWNER's `NP` and the OWNER's response `C` to an advisor's full proposal are chat-journal interactions, not Owner signoff or cross-AI M messages. The advisor makes the full presentation before C and then the numbered handoff. Both DCEOs sign by separate M records, not long chat text. See [V9 startup](STARTUP-PROTOCOL-V9.md).

**V10 note:** A silent activity or retirement artifact is not a message, so it does not require a new ledger number or an Owner relay. Every **real** M still has a unique gapless sequence and exact recipient receipt after actual delivery. No task can be secretly delegated via silent activity records.
