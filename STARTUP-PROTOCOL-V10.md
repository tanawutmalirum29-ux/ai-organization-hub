# V10 Lean — Start fast, notify only an actionable recipient

**Applies only to NEW `round/<slug>` workspaces with `protocol_version: "V10"`.** V9 and older rounds are immutable legacy; canonical governance `main` is templates/tests only. This document supersedes V9 *only where the changes are explicitly specified below*. Read [V9 provenance and proposal rules](STARTUP-PROTOCOL-V9.md), [V10 event economy](EFFICIENCY-PROTOCOL-V10.md) and [short-code protocol](CODE-RELAY-PROTOCOL.md).

## Mandatory design gates preserved

1. OWNER gives the **one-time full CEO appointment**. CEO reads rules, starts a new round, appoints **only GAME-ADVISOR and GAME-ADVISOR-DEPUTY** with each role's first full appointment and checks immutable original M and each role's first read receipt. Set `startup_phase=WAIT_NP`. No other staff, game coding, or proactive feature design yet. **Do not send separate ACK M** back to CEO just to confirm appointment; the per-appointment read receipt in GitHub is sufficient.
2. OWNER sends `NP` or an idea to GAME-ADVISOR. Advisor presents the **full proposal to OWNER in chat** and archives it. OWNER's literal `C`, journaled **after** visible presentation, permits numbered `ADVISOR_HANDOFF` to GAME-ADVISOR-DEPUTY via `MN-GAME-ADVISOR-DEPUTY`.
3. Deputy advisor adds independent alternatives, QA and balance, and writes the **single actionable `PROPOSAL` directly to CEO**. Only this consequential M triggers `MN-CEO`. Advisor/deputy do **not** send routine progress REPORTs or mirror proposals to CEO.
4. CEO reads/receipts the deputy proposal, appoints temporary **DCEO-A and DCEO-B** using each first full appointment; no production hires yet. Two deputy CEOs exchange numbered `PLAN_REVIEW` *only when the other must act* (real `MN` courier required, and each review individually receipted). They can improve their own draft/Issue notes without messaging CEO. One plans source-of-truth versioned `workspace/plans/<PLAN_ID>/rN.json`. Each must have independently reviewed the other's actual feedback and record a **separate `PLAN_SIGNOFF` addressed to CEO**, referring to the **same Git blob SHA, plan path and revision**. The first signature is **saved silently**: no `MN-CEO` until the other signature agrees on the same plan and both records are in GitHub. Second signer issues **one** `MN-CEO` notification; `NX` does not route a partial, unmatched signature to CEO just because it is unread. This is notification suppression, never omission of a signature or fabricated interchat contact.
5. CEO reads/receipts **both** signoffs, independently verifies signature and latest plan SHA, records one CEO `PLAN_APPROVAL` to OWNER **for audit only** (no OWNER notification/permission/approval step), then saves a **single batch retirement** file `workspace/retirements/planning-council.json` with all four exact role+appointment IDs, approving M ID, same plan SHA, CEO identity, reason, timestamp. Mark all four roster roles `CLOSED` in the same operational closeout. **Do not generate four `ROLE_RETIRED` numbered messages, notify OWNER, or contact these four chats again.** All source messages, receipts and session journals remain auditable.
6. CEO builds the smallest viable execution structure (CEO→Engineer, CEO→TL→Engineer, CEO→DIR→Engineer or scaled DIR→TL→Engineer), with separate independent QA authority, clear exclusive file scopes and real first appointments. Give lead a `MISSION_CHARTER` linked to the exact signed plan SHA. No game implementation before these gates. Implementer/TL can complete all scoped substeps autonomously and record progress silently; report only final actionable handoff, blocker beyond delegation, changed scope, independent QA/RELEASE need.
7. Preserve independent QA, real CI and exact-head release decision. Game/main merge and issue closeout only under the old CEO gate; once verified, auto-close the one-mission round and all remaining execution appointments. OWNER is only a courier, never a merge approver.

## V10 binding gates and archival formats

A **silent GitHub artifact** is a real commit but **is not a numbered inter-chat M or an automatic ChatGPT notification**. Non-actionable status belongs to GitHub Issue/PR comments or append-only `workspace/activity/<APPOINTMENT_ID>/000001.json` ...; no OWNER relay. An `M` is for an **actionable cross-chat dependency** only. Keep the gapless original numbered M ledger. For every created M, the named recipient records the ordinary immutable `workspace/receipts/M000000/<recipient-appointment>.json` upon real `MN`/first appointment. Silent artifacts do not require these M receipts.

Batch retirement `workspace/retirements/planning-council.json`:
```json
{
  "round_id": "FRESH-ROUND",
  "kind": "PLANNING_COUNCIL_RETIRED",
  "ceo_appointment_id": "FRESH-ROUND-CEO-01",
  "approval_message_id": "FRESH-ROUND-M000012",
  "approved_plan_sha": "<40-character-real-Git-blob-sha>",
  "recorded_at": "2026-10-15T03:00:00Z",
  "reason": "Planning completed; two signatures checked; execution phase begins",
  "members": [
    {"role_id":"GAME-ADVISOR","appointment_id":"FRESH-ROUND-GAME-ADVISOR-01"},
    {"role_id":"GAME-ADVISOR-DEPUTY","appointment_id":"FRESH-ROUND-GAME-ADVISOR-DEPUTY-01"},
    {"role_id":"DCEO-A","appointment_id":"FRESH-ROUND-DCEO-A-01"},
    {"role_id":"DCEO-B","appointment_id":"FRESH-ROUND-DCEO-B-01"}
  ]
}
```
Only the CEO records that file **after** `PLAN_APPROVAL` and switches the four statuses `CLOSED`. An execution appointment's M sequence must be strictly after the approval M; the actual batch artifact + closed roster must be verified before any appointment or charter. Old `ROLE_RETIRED` M files are forbidden in V10. Keep the retirement file immutable once written.

**Owner short codes:** `NP`, `C`, `I`, `NX`, and newly `FAST`, `BR`, `BL`, `MQ`, `SW`, `WHY`. Full advisor presentation and one-time initial appointments remain the only routine long responses. See [V10 efficiency](EFFICIENCY-PROTOCOL-V10.md). The role in an existing chat can only act while invoked and with GitHub access — there is no automatic cross-chat execution or unsolicited push notification.

## Strict safety

Never waive independent DCEO consent, exact plan revisions, phase gates, QA separation, browser/native CI evidence, receipt of actionable M, correct identities, Owner first-appointment handoff, or genuine user-side interchat courier. `FAST` may batch lower-level work but cannot skip a failing check, counterfeit an AI opinion, change the selected quest, or unilaterally merge game/main. The number of messages should drop because **unnecessary messages are not created**, not because errors are silenced.
