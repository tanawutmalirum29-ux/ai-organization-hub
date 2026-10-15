# V8 — Per-appointment Owner conversation journal, receipts and chat recovery

Applies to CEO, GAME-ADVISOR, optional ORG-ADVISOR, every DIR/TL/Engineer; **all conversations with OWNER**, including codes and Owner free-form requests, must be recorded as the receiving AI actually sees them. GitHub cannot capture other ChatGPT chats automatically.

## 1. Archiving Owner↔AI chat turns

In the **active round branch**, each AI owns `workspace/chats/<OWN_APPOINTMENT_ID>/events/000001.json`, `000002.json`, ... (**new files, append-only**). Separate journal numbers from global `workspace/messages` numbers. Save the Owner turn **before** executing consequential work where possible, and save the AI's actual final short code/status or exception as the next event. For long work journal interim state and links; do not write the large report into the ChatGPT conversation.

```json
{
  "sequence": 1,
  "round_id": "COLONY-NEW-01",
  "role_id": "DIR-A",
  "appointment_id": "COLONY-NEW-01-DIR-A-01",
  "speaker": "OWNER",
  "text": "MN",
  "code": "MN",
  "message_refs": ["COLONY-NEW-01-M000017"],
  "logged_at": "2026-10-15T01:00:00Z",
  "redacted": false
}
```

For an AI reply `speaker: "AI"`, `text: "C MN-CEO"`. Where full raw text is not accessible in the chat, **do not pretend** to reconstruct it: record `text: "[UNAVAILABLE]"`, `redacted: true`, `reason` and any verifiable GitHub refs. A role cannot reconstruct a message received in another independent chat unless Owner delivered it or it was written to GitHub.

Before showing `C`, verify the *current turn's* Owner and AI journal records were saved (AI's final code can be journaled immediately before output). If log write failed, **`ER`** rather than claiming durable capture. Append-only means no silent revisions; add correction events. Keep journal text faithful; never "summarize" and claim verbatim.

**Privacy:** A public GitHub repository exposes its contents to the public. Do **not** publish passwords, secrets, contact data, medical details or private attachments verbatim. Replace sensitive spans with `[REDACTED]`, set `redacted: true` and explain reason. If exact confidential transcript is essential, first use a private approved repository with access controls, or report `ER`; do not falsely claim complete public archives. Never store hidden model reasoning/internal messages, which are not an available user transcript.

## 2. Immutable per-message read receipt

When `MN` is received, write **one** file per incoming message and target appointment:
`workspace/receipts/M000017/COLONY-NEW-01-DIR-A-01.json`.

```json
{
  "round_id": "COLONY-NEW-01",
  "message_id": "COLONY-NEW-01-M000017",
  "recipient_role": "DIR-A",
  "recipient_appointment_id": "COLONY-NEW-01-DIR-A-01",
  "trigger": "MN",
  "disposition": "ACTION_STARTED",
  "reason": "Valid direct-parent instruction, implementation tracked in game Issue #201",
  "evidence_ref": "https://github.com/tanawutmalirum29-ux/ant-project/issues/201",
  "read_at": "2026-10-15T01:00:00Z"
}
```

Allowed dispositions: `HANDLED`, `ACTION_STARTED`, `SUPERSEDED`, `NO_ACTION`, `BLOCKED`, `REJECTED`. Always include specific `reason`; `SUPERSEDED` should cite newer message ID/decision in `evidence_ref`. `ACTION_STARTED` is a read receipt **not** a completion claim; later create numbered `RESULT` or Issue/PR progress as needed, not overwrite receipt. `NO_ACTION` must be justified (for example already satisfied by a newer valid order). The recipient cannot modify the immutable source `M000017`. A repeated `MN` sees the existing receipt and never repeats work.

The receipt file is indexed by immutable message suffix and full appointment ID. If the appointment is recovered, the replacement `-02` has its own receipts; **old messages addressed to `-01` are not automatically executable by `-02`**.

## 3. Recovering a dead chat / new appointment

1. OWNER creates a fresh ChatGPT chat and delivers a **one-time full replacement appointment** with new `APPOINTMENT_ID`, live repo/round link, previous appointment ID and relevant GitHub journal paths. **Never reuse the retired appointment ID**.
2. The authorized appointing parent records the rotation under **`workspace/round.json.appointment_history[]`** using `{role_id, appointment_id, retired_after_sequence}` for the old appointment, closes it and updates the matching single active roster role to the new `-02` ID, with a numbered fresh appointment M. Historical messages at or before the recorded effective sequence keep their old ID; only new messages address the replacement. A new Round bootstrap is a valid alternate recovery. Write a numbered appointment and supply its full one-time text; the receiver verifies.
3. Receiver uses `RC` to read main V8 charter/role protocol, current round/roster, old session journal, prior M messages/receipts, game issues/PR/branch and any unresolved work. Report missing records candidly; the archive recovers **only what was actually recorded**, not hidden chat state.
4. A pending old-recipient task must be explicitly reissued as a **new M** for the new appointment with a reference to the original; the old appointment's receipts remain for audit. No impersonation or secret auto-transfer.
5. The replacement logs its own journal from `000001`. Continue with short `MN` once the single full appointment is accepted.

Rotations within one round should preserve historical IDs and validate their effective ranges. If the existing validator/roster cannot safely express a new appointment identity in place, use a **fresh new Round/CEO generation** and link the old archive; do not corrupt immutable history to force migration.

## 4. Archive quality / CI

The template validator checks new V8 round `workspace/receipts` and `workspace/chats` records for valid role/appointment references, exact message recipients, unique filenames, contiguous per-chat event numbers, timestamps, sensible dispositions, no undocumented empty records, and safe path shape. It cannot independently prove that a ChatGPT UI showed a message. GitHub push CI checks that past ledger, receipt and chat event JSON files were not modified or removed. A direct GitHub admin bypass of branch protection can still rewrite history; preserve access controls and backups.
