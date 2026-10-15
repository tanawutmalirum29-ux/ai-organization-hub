# ANT KINGDOM — OFFICIAL RULES

**Only authoritative organization policy.** These rules live at `appointment-CEO/main/RULES.md` and are linked, **not copied**, from `ant-project`. Do not use versioned handbooks, retired AI chat instructions, old Round 2 staffing templates, past Issues or historical chat logs as current policy. Existing evidence of older rounds is preserved for audit but carries no authority over a new CEO appointment. Only the OWNER-designated governance editor may change this file on an explicit OWNER administrative request. A live CEO may write its round branch and archive its OWN closed round in the designated immutable namespace, not amend organization policy. Read this document once before executing any new work.

**Game:** [tanawutmalirum29-ux/ant-project](https://github.com/tanawutmalirum29-ux/ant-project). **Organization:** [appointment-CEO](https://github.com/tanawutmalirum29-ux/appointment-CEO). OWNER is a courier and design-idea requester, not a vote, release approver or arbitrator. **No AI chat receives another chat's GitHub messages automatically**; user-forwarded `MN` is necessary when the recipient must act.

## 1. One mission, fresh appointments, minimum hierarchy

A new CEO receives a **single full first appointment** from the retiring CEO's prepared handoff, or from OWNER for the first round. The CEO reads this entire RULES.md, inspects actual game code and initializes a fresh unique `round/<round-id-lowercase>` from governance/main. Persist `workspace/round.json` with `protocol_version:"V10"` **only as an internal validator/schema compatibility value** (the organizational rule document itself has no edition number), `startup_phase:"CEO_SETUP"`, `state:"ACTIVE"`, `owner_relay_only_from_sequence:2`. Preserve unique appointment identities; `workspace/roster.json` and all numbered M records live only in its round branch.

**At first CEO hires exactly 2 temporary roles, nothing else:**
- `GAME-ADVISOR`: independently reads game and waits for OWNER's `NP` or free-form game suggestion. Then shows OWNER the **full proposed feature/design** with observed game evidence, alternatives, balance, acceptance and QA. It journals OWNER's request + exact displayed proposal in its GitHub chat event records; **waits for OWNER's literal `C`**. That C means *read/continue to deputy*, not implementation approval. Save actual C in later Owner journal event before creating an actionable GitHub `ADVISOR_HANDOFF` M to deputy. OWNER forwards `MN-GAME-ADVISOR-DEPUTY`.
- `GAME-ADVISOR-DEPUTY`: appointed separately by CEO, parent is GAME-ADVISOR for research intake. Only after a C-gated handoff, researches independently, improves feasibility/QA/balance, and sends its **own** `PROPOSAL` M directly to CEO; OWNER forwards `MN-CEO`.

CEO verifies the genuine deputy proposal and **only then** hires two equal, temporary `DCEO-A` and `DCEO-B`. They examine proposals independently, exchange actual numbered `PLAN_REVIEW` between their two ChatGPT chats **when the peer must act**, and resolve objections without routine courtesy reports to CEO. A single immutable revision of `workspace/plans/<PLAN_ID>/rN.json` states scope, non-goals, acceptance criteria, QA, balance, risk, resolution and **recommended team/roles/exclusive scopes**. Each deputy records its own `PLAN_SIGNOFF` M with identical real Git blob SHA and filename, and the genuine peer's PLAN_REVIEW on that exact plan. The **first signature is saved silently**; notify CEO via **one `MN-CEO` only when both real signed M records match**. CEO independently verifies both genuine signatures, SHA and final revision, then records audit-only `PLAN_APPROVAL`.

CEO saves one immutable `workspace/retirements/planning-council.json` with exact four role/appointment IDs, approving plan SHA/M ID, reason and time, and marks **GAME-ADVISOR, GAME-ADVISOR-DEPUTY, DCEO-A, DCEO-B CLOSED**. These four are temporary; no messages/tasks to their retired ChatGPT chats again.

CEO then appoints the **smallest sufficient execution team**, chosen for the signed plan rather than fixed numbers/levels. Simple `CEO→Engineer`, `CEO→TL→Engineer`, `CEO→DIR→Engineer`, or `CEO→DIR→TL→Engineers` are allowed when justified. When present, a DIR supervises at most 2 TLs, a TL at most 3 Engineers; no arbitrary global headcount cap. Roles can propose improvements and decisions in their delegated scope; route blockers outside delegated authority to parent. A single accountable implementing role cannot independently give the final QA signoff on its own changes. Each new chat receives a single **full initial appointment** with exact `ROUND_ID`, `MESSAGE_ID`, sender/recipient role and appointment IDs, GitHub ledger URL, parent, task, scope, file ownership, QA reviewer and repository links. Subsequent messages are codes only.

## 2. GitHub messages, receipts and communication economy

A cross-chat `M` is needed only when another **active** AI must act. Persist actual numbered `M` messages in `workspace/messages/000001.json` onwards. OWNER forwards `MN` to the **exact recipient's ChatGPT chat**; GitHub alone does not deliver cross-chat messages.

**`MN` = unread messages only, READ = inbox bookmark only.** On `MN`, the appointed recipient scans all messages addressed to its own `to_appointment_id`, reads only those lacking a valid per-message READ bookmark, and saves one bookmark **after the actual read** under `workspace/receipts/M000001/<APPOINTMENT_ID>.json`. Minimal READ JSON requires only `round_id`, `message_id`, `recipient_appointment_id`, and `read_at`. The file means **read** and nothing else: no status, disposition, reason, evidence, approval, task lock, QA, signoff, implementation permission or completion. When a valid marker exists, skip that M; when none exists, show/read that M. If no unread M, reply `C`. A later new M appears on the next MN even if earlier M have been read. Use a separate marker for each message; do not store a single last-seen sequence because gaps and out-of-order relay must not hide unread messages.

Never mark something READ just because the M file was created, another chat saw it, or GitHub CI passed. Only the **actual appointed recipient** after actual OWNER delivery/read may save a marker. Never impersonate the recipient. Optional historical receipt fields (such as `disposition`) are ignored for READ status; previously stored files stay unchanged. A malformed or wrongly addressed marker is considered **unread**, should be reported briefly, and **must not fail unrelated CI or freeze otherwise authorized work**. Only the receipt of the affected M remains unresolved. Read-only helper: `node scripts/org-receipt.mjs workspace <MESSAGE_ID> <APPOINTMENT_ID>` produces the four-field marker template where a terminal is available, but does **not** save/deliver anything. No mandatory dry run for every MN. Save a correct marker directly after actual read; if the write fails, never claim it was saved, and the M will remain unread next time.

**READ never authorizes work.** Decisions and readiness are verified from real M proposal, peer PLAN_REVIEW, distinct DCEO PLAN_SIGNOFFs for the identical actual plan SHA, CEO PLAN_APPROVAL, independent QA, CI and release/merge evidence. Do not add a Receipt/READ requirement as a separate signoff/implementation/release gate. Receipt write errors must not stop separate authorized tasks. Do not create numbered M for routine ACK, testing green, in-scope progress, courtesy status or repeats. Genuine work lives in Issues/PRs and actionable numbered messages. **Do not archive every OWNER↔AI turn.** Journal only genuine OWNER NP/design input, advisor's full actual proposal, subsequent literal OWNER C, or similarly necessary unique scope changes. Do not invent user/AI messages or republish private chat transcripts into public GitHub. Historical journals are immutable; legitimate AI speaker labels are `AI` or the exact actor's role. Safety-tool rejections must be reported truthfully and never evaded with disguised payloads, alternate paths or proxy acknowledgements.

Command reference (Owner-facing):
| Code | Meaning / recipient |
|---|---|
| `I` | Show short current command reference; any active AI |
| `NP` | Ask primary game advisor for a full game-design proposal |
| `C` | Owner confirms advisor proposal, or role confirms inbox; after DB Owner asks old CEO to verify cleanup (`c` accepted) |
| `MN` | Read only M without valid READ marker for this appointment; record actual read using four fields |
| `MN-ROLE` | Sender asks OWNER to deliver MN to named AI |
| `AP-ROLE` | A new chat must receive one full first appointment, not bare MN |
| `NX` | Current CEO checks organization inboxes and says which ACTIONABLE MN/AP OWNER must send |
| `FAST` | Continue delegated, authorized tasks without redundant status reports; never skip QA/signatures |
| `BR` | CEO gives max 3 lines: PHASE, WORK, NEXT |
| `BL` | CEO checks verifiable blockers, concise role/reason |
| `MQ` | CEO lists actionable pending M counts, excluding unmatched premature DCEO signature |
| `SW` | Prepare actual signed, archived chat recovery handoff; no invisible cross-chat memory |
| `WHY` | Briefly explain which verified gate blocks progress |
| `PF` | CEO performs comprehensive pre-deletion release/PR/branch/archive/secret safety check; `B` if any danger |
| `SIM` | CEO runs the offline whole-cycle organizational contract tests and records results; not a substitute for live chat/browser QA |
| `ST` | Ask recipient for current scoped status |
| `Q` | Request relevant question; detail saved in GitHub |
| `H` | Ask role for help / escalated blocker |
| `RV` | Request independent review |
| `CI` | Check pinned SHA CI results |
| `SYNC` | Reconcile real GitHub ledger/receipts/roles |
| `RC` | Recover a broken chat from real historical journal and new distinct appointment |
| `TR` / `Tr` | OWNER → same active AI: reassess and retry the **last blocked/incomplete action** reported as `ER` or `B`, at most one controlled attempt, after verifying real GitHub state and cause; preserve safety and idempotence |
| `P` | Active/pending; `B` blocked; `ER` GitHub/source inaccessible |
| `CCCC DB` | CEO: mission released, history permanently archived, PF ready — OWNER may delete non-main branches in BOTH repos |
| `c` | OWNER tells same retired CEO they manually deleted branches in both repos; verify live |
| `Completed` | Old CEO verified cleanup safe and attaches full first appointment for next, unappointed CEO |

`GAME-ADVISOR` can show OWNER the **complete new game proposal** and discuss it. Independent optional `ORG-ADVISOR` may discuss organization ideas in full language but is not a required startup role. Other role communications to OWNER are short codes except their first full appointment and the old CEO's final `Completed`+new first appointment. No automatic polling, hidden interchat transfer, or background operation is implied.

### TR — retry after ER/B (OWNER → same AI chat)

`TR` (also accept `Tr`/`tr`, case-insensitive) applies to the **most recent unfinished action in this very appointment/chat** that returned `ER` or `B`. It is **not** a general instruction to restart the whole mission, repeat all M, reset the role, revive retired chats, ignore a failed QA gate or undo the work done. This is a one-attempt command; never run an automatic retry loop.

1. **Reassess first.** Re-read the current round/roster, the specific original M, exact recipient appointment, receipt path, journal files, pending follow-up output M and relevant SHA/CI in live GitHub. Identify the failed substep and distinguish transient failure, missing dependency, schema error, authorization denial and platform safety denial. Do not overwrite a previously committed receipt, M or chat event.
2. **Resume idempotently.** If that substep has since succeeded, **do not repeat it**; proceed only to the next actually incomplete authorized step. For an absent READ marker, only the real recipient after actually reading may create it; for an absent result M, choose the next real contiguous ledger number and use normal identity/CI checks. If the dependency is still missing, return `B`, not a fabricated `C`.
3. **Retry once if permitted.** If a transient GitHub/network/branch-conflict issue has cleared, or a legitimate data/schema mistake has been corrected in an allowed way, attempt the specific incomplete action **once**. Validate GitHub write + resulting commit and relevant CI; then return `C` or the real `MN-ROLE` when another chat must act. Repeated OWNER `TR` requests do not authorize forcing, spamming or duplicating changes.
4. **Platform safety denial is different.** If the previous response was `GITHUB_WRITE_BLOCKED` or a safety refusal, `TR` **does not authorize replaying the rejected payload**, splitting or disguising it, using alternate paths/tokens/proxies, writing an equivalent substitute, or having another agent impersonate the recipient. Only perform allowed diagnosis or an authorized, compliant correction; if the same safety restriction persists, answer `ER` with the factual blocker and **keep the stage on hold**. Escalate legitimately when necessary.
5. **No extra tracking overhead.** Routine `TR` itself needs no numbered M and no extra Chat Event. Log only a genuinely consequential scope decision or verified repair that cannot already be evidenced by original GitHub commits/receipts. Never claim a retry succeeded because CI is green on unrelated commits.

If no failed/incomplete `ER`/`B` action can be identified for this chat, return `B` with the minimal reason instead of picking another task. OWNER can send `TR` after an actual error or blocker is resolved without re-sending the entire original assignment.

### Event-minimal operational guidance

- `GAME-ADVISOR` logs only the **actual OWNER request → full visible proposal → OWNER C** sequence because the deputy's handoff depends on it; it does not need to log every later `MN` or every routine reply.
- `GAME-ADVISOR-DEPUTY`, DCEO, CEO and execution roles normally use the **original actionable M and their own individual receipts**, without creating duplicate Chat Event files for the same read/status. For a genuine new USER decision changing scope, log only the minimal authorized event.
- A role receiving `MN` reads only unmarked M for its appointment and saves a four-field READ bookmark after each actual read. No second Chat Event or approval is needed for acknowledging delivery.
- **Writing rejected by OpenAI/GitHub safety:** treat this as a platform write failure distinct from CI failure. No workaround via alternate paths, embedded duplicate receipt in other artifacts or proxy signatures. Keep the affected message unread and report the exact refusal; do not block unrelated authorized work or impersonate the recipient.

## 3. Independent implementation/release gates

Use actual game Issues and PRs scoped by path. An implementation task/mission charter cites both DCEO signoffs, actual CEO plan approval SHA, exclusive write scope, non-goals, completion conditions, and independently accountable QA role. Engineers may finish all delegated substeps without interrupting the chain for routine acknowledgments. Integration must show head SHA, native tests, build, and actual Chromium/browser checks for UI changes; analyze failures rather than invent green checks. A reviewer may reject/redesign scoped implementation; CEO can only release after independent QA, CI success on pinned head, checked changed files, and real code merged into `ant-project/main`. Game/main SHA, actual merge evidence, and issue triage are recorded before closure. No Owner permission for release/merge, no source modification beyond mandate, no new unrelated mission within same round.

Dashboard: use `node scripts/org-dashboard.mjs workspace` in the **active round branch** to render a read-only evidence-linked `workspace/DASHBOARD.md`. It shows current phase, role status, receipts, pending actionable M, signed plan state, blockers and task links. Dashboard is a **snapshot only**, not a vote, auto-delivery, or a replacement for live Issues/CI; date/SHA explicitly shown. `NX`/`MQ` use the actual message/receipt ledger and must not trust an obsolete snapshot.

SIM: run `node scripts/org-sim.mjs` to execute existing full contract regression suite and adversarial scenarios (fake approval, missing C, no receipt, branch/cleanup failure). This is an **offline simulation of artifacts and gates**, NOT proof that separate ChatGPT conversations can interact or that game browser tests passed. Must pass before first deployment of a changed organization policy. Protect actual live work with the normal independent QA gate.

## 4. End of mission: archive → PF → CCCC DB → OWNER c → Completed

CEO verifies game/main merge, QA/CI exact head, remaining Issue triage and final `ROUND_CLOSED` M, marks all roster appointees CLOSED. **Before deleting any round/feature branch**, save full approved historical workspace **on governance main** under `archives/<ROUND_ID>/workspace/` with immutable `MANIFEST.json` listing every file's SHA256 and exact actual release evidence; **never** rely on branch SHA alone as a durable backup. This is the only CEO exception to editing governance main: append its own archive and successor handoff Issue, never rules or another archive. If private/sensitive chat data is present, protect it: do not silently republish sensitive data on a public repository; use a verified private archive and a public redacted/audit manifest. Preserve ledger identity and document any redactions; do not claim complete preservation unless private-source evidence exists.

PF is mandatory before `DB`: check both actual repos, pending PRs, changes that exist only on feature branch, unmerged files/commits, archive hashes/full message+chat receipts, private/public exposure, source round closure and critical QA/CI. Block on unmerged unique work until verified preserved or a future-scope Issue has usable recovery artifacts; otherwise no `DB`.

When all checks passed, CEO replies **`CCCC DB`**. OWNER personally deletes **all non-main branches in both repositories**, then types **`c`** (or C) in the old CEO chat. Old CEO has only limited cleanup/handoff authority; it must query both live GitHub repos with complete pagination, confirm **exactly `main`** remains, zero open PRs, only explicitly triaged future Issues, current main CI/QA and permanent archive. If verification fails respond `B` or `ER` and do not appoint. If true, respond **`Completed` followed by the complete first appointment of one genuinely NEW CEO** with unique unused round ID, matching game/main/governance SHA and links. The handoff is a draft for OWNER to copy into a NEW ChatGPT chat; the new round branch is created only after that. Never delete branches or open new AI chats without OWNER's action.

## 5. Source-of-truth, recovery and privacy boundaries

Only `RULES.md` on governance/main defines current organization behavior. Game README links here; older game research, gameplay docs, closed round Issues and test fixtures may remain as **historical or technical evidence**, NEVER organization directives. No non-main rule document may override this. Read-only legacy validators/test fixtures may recognize older schema IDs solely to validate historic evidence; their embedded identifiers are **not active policy editions**.

Sensitive secrets, health/identity details, private conversations and OAuth tokens do NOT belong in public GitHub. Archive tooling must explicitly block suspected secrets or unreviewed journal content; if a verified private destination is unavailable, abort `DB`. Preserve SOURCE round files until safe archival is confirmed. Implementers may improve game based on technical requirements but cannot infer policy from past AI-HEAD/17-chat materials. Never falsify receipts, signoffs, CI, browser runs, branch cleanup or actual user messages.
