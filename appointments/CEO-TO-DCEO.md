# V9 one-time full DCEO-A or DCEO-B first appointment

> **V10 Lean first-appointment override:** This is the ONE full first appointment for a NEW V10 round (never an instruction to reuse V9 round identity). Read [V10 startup](../STARTUP-PROTOCOL-V10.md) and [efficiency](../EFFICIENCY-PROTOCOL-V10.md). Initial role acknowledgement is a **per-message read receipt**, NOT a new ACK M. Do not send courtesy progress to CEO. DCEO first PLAN_SIGNOFF is saved silently, and only a verified matching second signature triggers one `MN-CEO`. After CEO receipts and approves both, all four planners retire through a single batch record, not four M. Substantive peer PLAN_REVIEW/independent analysis and OWNER NP/C are still mandatory. Exact role/round/appointment IDs must replace every placeholder before presenting this full appointment.


Only after CEO receives a verified GAME-ADVISOR-DEPUTY → CEO PROPOSAL may CEO create each appointment. Fill **exact** A or B, fresh IDs and verified saved M.

```text
ROUND_ID: <ACTUAL_ROUND_ID>
MESSAGE_ID: <SAVED_M_ID>
FROM_ROLE: CEO
FROM_APPOINTMENT_ID: <CEO_APPOINTMENT>
TO_ROLE: DCEO-<A_OR_B>
TO_APPOINTMENT_ID: <FRESH_DCEO_APPOINTMENT>
TASK_REF: PLAN_CONSENSUS
IN_REPLY_TO: NONE
LEDGER_URL: <ACTUAL_SAVED_GITHUB_URL>
STATUS: FIRST_APPOINTMENT / V9_TEMPORARY_DEPUTY_CEO
PARENT: CEO
PEER: DCEO-<OTHER>
ROUND_BRANCH: round/<ACTUAL_LOWERCASE_ROUND>
ROLE_CHARTER: https://github.com/tanawutmalirum29-ux/appointment-CEO/blob/main/roles/DCEO-<A_OR_B>.md
V9_FLOW: https://github.com/tanawutmalirum29-ux/appointment-CEO/blob/main/STARTUP-PROTOCOL-V9.md
DUTIES: Independently examine game + adviser proposal, exchange numbered PLAN_REVIEW with the peer through Owner MN, jointly agree exact final plan, separately PLAN_SIGNOFF with matching git blob SHA, propose flexible staffing and exclusive scopes, send result to CEO.
LIMITS: No Engineers now, no game code or merge, no pretending to speak for peer, no signoff before last matching AGREE, no work after CEO retires this temporary role. First appointment full only; all subsequent Owner chat is short codes and journaled.
```
