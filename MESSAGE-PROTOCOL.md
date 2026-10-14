# V4 — Mandatory numbered inter-chat communication protocol

**Scope:** ALL CEO/DIR/TL/Engineer outbound instructions, appointments, ACKs, work reports, QA verdicts, blockers, refusals and release handoffs. Owner manually transports the copy block between separate ChatGPT chats. GitHub is the source of truth for sequence/receipts, not shared chat memory.

## 1. Round bootstrap

1. Owner chooses a **new unique** `ROUND_ID` (`[A-Z0-9][A-Z0-9-]{2,39}`) for ONE CEO generation, e.g. `COLONY-NEXT-02`, and its specific game repository. Owner's initial new-CEO appointment is explicitly numbered `<ROUND_ID>-M000001` (bootstrap exception: a branch does not exist *yet*).
2. The appointed CEO must verify that the proposed `round/<lowercase-round-id>` branch does **not** already exist. If it exists, halt and ask Owner to resolve the collision: never hijack a previous round.
3. CEO creates its round branch from governance `main`, creates `workspace/round.json`, `workspace/roster.json`, and persists the original Owner→CEO appointment as `workspace/messages/000001.json`, **verbatim** (including copy-ready relay). Record CEO's own new `APPOINTMENT_ID` in roster. After accepting, CEO generates and persists its ACK as `000002.json` and provides the Owner the copy-ready ACK.
4. All subsequent append-only messages use the branch's sequential ledger. Do not modify governance `main`, inherit any prior-round message number, or merge this branch to `main`.

**Onboarding to GitHub:** each receiving AI must read main README, its role charter, this protocol, and live `workspace/round.json`/`roster.json` from its **appointed branch**. No AI knows another conversation's completion without Owner relay.

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

## 3. Mandatory receiving gate — BEFORE any work

For *every* forwarded request in a ChatGPT conversation, read current round branch and confirm:

1. `ROUND_ID` is your active generation; `MESSAGE_ID` exists in that branch's ledger with identical content, correct six-digit sequence and not revoked.
2. `TO_ROLE` equals your own appointment's `role_id`; `TO_APPOINTMENT_ID` equals **your fresh-chat appointment ID**, not merely a reused title. Check round roster entry and source-parent authority. `OWNER` is an explicit endpoint, not a subordinate AI role.
3. `FROM_ROLE`, `FROM_APPOINTMENT_ID`, `TASK_REF` and scope are valid. Only your direct parent can delegate regular work, except explicit authorized inter-team consultation that cannot grant extra write scope.
4. Check for an existing receipt/processing record: if an `ACK`, `RESULT` or `REJECTED` from **your same appointment** already references this `MESSAGE_ID` for the same action, it has been handled. An old message pasted twice is **not a new command**.

**Decision:** 
- `TO_ROLE != SELF`, mismatched appointment/generation, unauthorized sender → `REJECTED_WRONG_RECIPIENT` / `REJECTED_UNAUTHORIZED`. **Do no work, no GitHub mutations.** Respond to Owner with the received ID and reason, asking for the correct message to the correct chat.
- Already processed, repeated `MESSAGE_ID` or equivalent `event_key` → `REJECTED_DUPLICATE`. **Do not rerun or create a fresh duplicate ACK/report.**
- Missing ledger entry, gaps, missing fields, mismatch or no GitHub read → `HOLD_UNVERIFIED`. **Do not act** until a verified version is supplied.
- Only verified, authorized, new instructions may proceed; return a numbered ACK and later a numbered RESULT or BLOCKED report, as appropriate.

**Important limitation:** GitHub can confirm logged round and role IDs, but cannot prove which human pasted a message or cryptographically authenticate a ChatGPT conversation. An appointment ID is a routing identifier, not a secret. Owner must forward into the correct fresh chat; never claim full authentication.

## 4. Mandatory owner-ready outgoing block

At **every reporting or handoff boundary**—appointment acceptance, completion, blocker, review, refusal, next assignment—the sending AI MUST:
1. Persist a new numbered message (unless a refusal is due to an invalid inbound message, where **no ledger mutations** are allowed).
2. State `Next recipient: <EXACT_ROLE>`; supply one standalone verbatim **copy-ready** block containing all envelope fields, actual Github link, precise status, evidence/branch/PR/CI/SHA, required action, and prohibitions.
3. Clearly state the relay is **PREPARED FOR OWNER TO FORWARD**, not sent automatically to another chat. Never just say "แจ้งหัวหน้าแล้ว" or "รอ AI อีกแชทเห็นเอง".
4. If task is complete and nobody needs to act, send a numbered final report to the direct parent or Owner. This includes no-code administrative milestones.

**Minimum handoff block:**

```text
ROUND_ID: <ACTUAL_ROUND>
MESSAGE_ID: <ACTUAL_ROUND>-M<6_DIGITS>
FROM_ROLE: <ACTUAL_SENDER>
FROM_APPOINTMENT_ID: <ACTUAL_ID>
TO_ROLE: <EXACT_NEXT_RECIPIENT>
TO_APPOINTMENT_ID: <ACTUAL_ID_OR_OWNER>
TASK_REF: <ACTUAL_GAME_TASK_OR_ORG_SETUP>
IN_REPLY_TO: <EXISTING_ID_OR_NONE>
LEDGER_URL: <VERIFIED_GITHUB_FILE_URL>
STATUS: <ACTUAL_STATUS>
EVIDENCE: <VERIFIED_LINKS_AND_SHA>
REQUESTED_ACTION: <EXACT_NEXT_STEP>
LIMITS: <SCOPE_AND_MERGE_GATES>
```

Never send placeholders such as `<ACTUAL...>` in a live relay.

## 5. Closeout — mission vs organization lifecycle

**The game repository**: independent reviewer + QA green, Owner release authorization, merge to **game main**, verify exact post-merge HEAD and acceptance. Close resolved game Issues and PRs, preserve links/release summary on game main (or an Owner-approved permanent record), delete only confirmed merged/obsolete task branches and temporary resources. If code is unmerged, CI red, open blocking PR, or Owner release authorization absent, CLEANUP_HOLD. GitHub closed Issues/PRs are part of audit history; a closed Issue is not physically deleted.

**The appointment repository**: once all numbered handoffs are complete and Owner explicitly approves closure, record final numbered CEO→Owner `ROUND_CLOSED` relay and verify permanent final evidence exists outside temporary branch. Delete **only this closed round branch** when supported; **never merge it into governance main**. When no rounds are active, `main` is the only remaining branch. If tool lacks branch deletion, provide a precise Owner deletion instruction and status `CLEANUP_PENDING`; never say cleanup finished.

Old numbered messages cannot be replayed in a new CEO generation.
