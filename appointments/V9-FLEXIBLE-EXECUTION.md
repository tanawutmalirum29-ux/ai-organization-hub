# V9 — Dynamic shallow execution appointment (ONE-time full message)

> **V10 Lean execution-stage first appointment override:** NEVER appoint before both DCEO signoffs, CEO PLAN_APPROVAL and one checked retirement batch with four CLOSED planners. Appoint this execution role only in the smallest suitable direct-parent chain. One initial full appointment, then only action-triggered M/MN; routine ACK/status/tests stay in Issue/PR or append-only activity. Do not message CEO for a fixable Engineer subtask within authorized scope. QA independence/CI/exact-head release still mandatory. See [V10 Lean](../EFFICIENCY-PROTOCOL-V10.md).


Use only **after** two DCEO signatures on the exact same plan blob, CEO PLAN_APPROVAL and ROLE_RETIRED of all four temporary planners. The actual signer plan suggests roles and scopes; CEO may choose an appropriately different smaller team with recorded rationale, but no pre-approval engineering. A fresh appointed role can be direct CEO or a matching DIR/TL as needed — no forced hierarchy levels.

Allowed structures:
- `CEO → E-A1-1` for a small feature and **separate independent reviewer**.
- `CEO → DIR-A → E-A1-1` when coordination is useful but TL overhead isn't.
- `CEO → TL-A1 → E-A1-1` for direct hands-on technical supervision.
- `CEO → DIR-A → TL-A1 → E-A1-1/E-A1-2` only for larger parallel scoped streams.

For each fresh appointee, appointing direct manager saves numbered `APPOINTMENT` and passes a ONE-time full appointment through Owner; subsequent updates use `MN-ROLE` codes.

```text
ROUND_ID: <ROUND>
MESSAGE_ID: <PERSISTED_M_ID>
FROM_ROLE: <ACTUAL_DIRECT_APPOINTING_MANAGER>
FROM_APPOINTMENT_ID: <MANAGER_APPOINTMENT_ID>
TO_ROLE: <EXACT_NEW_DELIVERY_ROLE>
TO_APPOINTMENT_ID: <FRESH_APPOINTMENT_ID>
TASK_REF: <SIGNED_PLAN_TASK_REF>
IN_REPLY_TO: NONE
LEDGER_URL: <REAL_LEDGER_URL>
STATUS: FIRST_APPOINTMENT / EXECUTION_STAGE_AUTHORIZED
PARENT: <EXACT_DIRECT_MANAGER_IN_ROSTER>
ROLE: <NAME_AND_CLEAR_RESPONSIBILITIES>
ROLE_CHARTER: <MAIN_ROLE_DOCUMENT_URL>
ROUND_BRANCH: round/<ACTUAL_ROUND>
GAME_REPO: https://github.com/tanawutmalirum29-ux/ant-project
SIGNED_PLAN_REF: <WORKSPACE_PLAN_PATH_AND_EXACT_SHA>
CEO_PLAN_APPROVAL: <SAVED_CEO_APPROVAL_MESSAGE_ID>
MISSION_CHARTER: <SAVED_CHARTER_MESSAGE_ID>
SCOPED_FILES: <EXCLUSIVE_ALLOWED_GAME_PATHS>
QA_REVIEWER: <DIFFERENT_ACCOUNTABLE_REVIEW_ROLE>
TASKS: <EXACT_SOURCES_ACCEPTANCE_CI_AND_REPORTING>
DUTIES: Read charter/plan/code/receipts and verify real appointment, perform only authorized scoped tasks, report results to own parent via saved M and short MN code.
LIMITS: No touching unrelated source/governance main; no self QA release; no Owner game approval. Every MN receives individual read receipts, all OWNER turns are journaled. One-time appointment full; all further chat replies codes only.
```

Do not invent scope, SHA, assignment, parent or date. A standalone QA reviewer must be independent from implemented changes. The signed plan is a decision input, not permission to skip CI/release.
