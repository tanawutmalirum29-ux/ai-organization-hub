# V10 Lean — Event-triggered communication and quick OWNER commands

## Default: save everything needed, notify only when another chat must act

**DO NOT create a numbered M or request MN** solely for: first-appointment ACK, received-status-only ACK, "started", "working", a routine test passing, every Engineer subtask, intermediate nonblocking progress, CEO receiving a courtesy copy of A/B's debate, a preliminary plan signature whose peer has not yet matched it, four separate retirement notices, or administrative PR/Issue bookkeeping that does not require the recipient to act. Record the actual activity in Issue/PR/CI or the role's append-only `workspace/activity/<appointment-id>/NNNNNN.json` instead. Use a numbered M only for: first appointment, actual task assignment, essential peer review/discussion, changed scope beyond delegated limits, request for missing decision/data, blocked condition beyond role authority, actionable QA decision/handoff, final matching plan-signature readiness, CEO RELEASE and round closeout audit.

**A recipient must not infer delivery from a GitHub write.** A numbered M that requires action is still delivered by OWNER `MN` to the exact active ChatGPT role, then individually read-receipted there. New messages to closed or obsolete appointments are invalid. `NX` must display only actionable pending codes; see below for the paired-signoff gate.

Every delegated role may autonomously complete all **authorized** intermediate steps within approved scope without roundtrip status requests or fabricated approvals. Preserve task/Issue/PR evidence. Raise `B` and notify parent only if blocked **outside** delegated authority or required QA fails; do not send CEO a "FYI" report for a fixable local problem. Headcount, substep count and chat hopping should be minimized without merging reviewer and implementer identities.

## OWNER command contract

| Code | OWNER sends to | Short output / effect |
|---|---|---|
| `FAST` | CEO or current acting lead | Use lean handling for the **existing authorized scope**. Batch possible tasks, reduce routine reports; GitHub evidence, signatures, independent QA and CI mandatory. Reply `C` or `B` only after recording action. |
| `BR` | CEO | Brief snapshot **max 3 lines**: `PHASE ...`; `WORK ...`; `NEXT ...`. Cite or store full evidence GitHub; never invent status. |
| `BL` | CEO | Blocker query: return `B` plus shortest grounded `ROLE:reason` / `C` if none; archive details and game issue/CI refs. |
| `MQ` | CEO | Message queue counts per active role: `DIR-A:3 TL-A1:1 CEO:0`. Use current M ledger and exact appointment receipts; exclude closed roles, **exclude unmatched partial DCEO signoffs from actionable MN**; never infer "already delivered". |
| `SW` | CEO or role to be replaced | Produce a verifiable GitHub recovery packet linking appointment, last journal event, pending M receipts, open Issues/PR, exact source SHA, blockers; reply `C` only on verified write. Actual replacement requires fresh full appointment and OWNER delivery; cannot silently transfer hidden chat history. |
| `WHY` | any active assigned role | Explain **next unpassed gate / wait reason**, 1 concise line and a GitHub evidence reference if needed; no long report. |
| `NX` | CEO | Return **only all actionable `MN-ROLE`** / one-time `AP-ROLE` that OWNER must ferry now; if none, return `P` while work unfinished or `C` when fully complete. Never emit `MN-CEO` merely because the first of two DCEO signs is saved — until matching second signature also exists. |
| `I` | any active role | Print compact current command cheatsheet including these six. |

Older codes `NP`, `MN`, `C`, `ST`, `Q`, `H`, `RV`, `CI`, `SYNC`, `RC`, `P`, `B`, `ER` continue unchanged. `C` from OWNER to GAME-ADVISOR after full presentation still means "proposal seen, continue peer consultation", never a merge authorization.

**Operational truth:** GitHub Issues/CI can be checked live when this ChatGPT turn is running; no recurring/background polling without a separately configured automation. A finished Github record cannot send `MN` to another ChatGPT conversation automatically. OWNER retains the small courier duty.

## Required silent activity record

`workspace/activity/<APPOINTMENT_ID>/000001.json` (append-only, use next contiguous index, skip if records are entirely in existing exact Issue/PR), example:
```json
{
  "sequence": 1,
  "round_id": "ROUND",
  "role_id": "TL-A1",
  "appointment_id": "ROUND-TL-A1-01",
  "kind": "STATUS",
  "summary": "Integration tests passing at pinned head; no action for CEO yet",
  "evidence_url": "https://github.com/tanawutmalirum29-ux/ant-project/actions/runs/123",
  "logged_at": "2026-10-15T01:00:00Z"
}
```
Status logs do **not** create M, require MN, or replace immutable receipts for messages that *were* sent. V10 validator checks active V10 journal/receipt/activity identity, contiguous event files and no prior revision through GitHub CI when feasible. Do not publish secrets or private full chat transcripts into the public governance repository.

## One-time vs actionable notification

First appointment of a new AI must still be delivered in full — one time. After first accepted, send only MN routing codes. DCEO-A/B can share their actual peer `PLAN_REVIEW` by MN and should both record their own signed M. One consolidated `MN-CEO` after **both matching signoffs** avoids a pointless premature CEO wake-up. Four planners retire in a single verified batch artifact (no four Owner messages); do not silently erase their audit history.

## SW recovery packet schema (verified by CI)

Write `workspace/recovery/<CURRENT_APPOINTMENT_ID>.json` **only after reading the real chat journals, messages and receipts**. The repository validator checks pending M against the exact current per-message receipt set and requires the last claimed chat event file to exist. A snapshot doesn't create another appointment or move a chat by itself.

```json
{
  "round_id": "REAL_ROUND",
  "role_id": "CEO",
  "appointment_id": "REAL_ROUND-CEO-01",
  "generated_at": "2026-10-15T03:00:00Z",
  "source_round_branch": "round/real_round",
  "last_chat_event_path": "workspace/chats/REAL_ROUND-CEO-01/events/000005.json",
  "pending_message_ids": ["REAL_ROUND-M000017"],
  "open_game_issue_urls": ["https://github.com/tanawutmalirum29-ux/ant-project/issues/101"],
  "open_game_pr_urls": [],
  "latest_game_sha": "0123456789abcdef0123456789abcdef01234567",
  "blocker_summary": "None verified or exact blocker description"
}
```
These values are **structural examples only**, never literal evidence. The acting role must use actual URLs, latest real SHA, exact pending list, and real source round slug. If evidence cannot be checked, reply `ER`, not `C`. Personal/sensitive chat text is redacted on public GitHub; when the source transcript is incomplete, say so. The next chat gets a completely new first appointment and must read this evidence without assuming ChatGPT session memory transfers.

**MQ helper:** `node scripts/v10-mq.mjs workspace` from the actual V10 round branch prints count per active role plus matched MN codes and separately deferred preliminary DCEO signatures. It does not query game Issues/CI; BR/BL/WHY require live GitHub checks and must distinguish verified blockers from unverified unknowns.

## Final two-repository cleanup courier (CCCC DB)

After mission/game-main release, verified permanent governance/main archive, and round closure, output ONLY `CCCC DB`. OWNER deletes all branches other than main in both `appointment-CEO` and `ant-project`, replies `c` in the **previous CEO's chat**. That CEO is authorized only to verify live main-only branches/PRs/issue triage/CI/archive; then output `Completed` plus detailed one-time first CEO appointment. An archive must physically survive branch deletion, not just be identified by commit SHA. Any unverified property requires `B`/`ER`. [Binding cleanup protocol](CLOSEOUT-PROTOCOL-V10.md).
