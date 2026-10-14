# V2 Handoff — active organization, faster onboarding

**Source of truth:** [Fast Lane](../FAST-LANE-GOVERNANCE.md), [Live Registry](TEAM-REGISTRY.json), [Team Chart](ACTIVE_TEAM.md). Older checklists requiring every command to advance one edge or every appointment to wait for `REGISTRY_SYNCED` are superseded.

## Current COLONY-NEXT-01 transition

- Already accepted CEO, Delivery, Domain Deputies and Directors keep their real ACKs and reporting lines. Read **latest** Registry for exact ACTIVE status; Issue `PENDING_ACK` is not actual acceptance.
- Directors have issued `SYS-TL1`, `EXP-TL1`, `PLAT-TL1`, `QA-TL1` appointment Issues. Each must post a **real** ACK in its Issue. After their own Director verifies ACK and existing allocated slot, they may issue appointed subordinate Engineer Issues **without an extra upstream registry-unlock relay**.
- Roster Steward/Delivery batches verified `role_id, parent_role_id, appointment Issue, ACK permalink, approved slot` in a single governance PR/CI. Unverified roles are never invented as `ACTIVE`; Parent links and duplicate identities must pass validator. Operational authorization from Issue+ACK can precede the batch merge; all roles must be reconciled before any signed Release.
- No Gameplay Source implementation starts merely from staffing or this policy update; `IMPLEMENTATION_HOLD` stays until the authorized Round manager lifts it.

## Direct work requests

**Any real relevant task/bug/CI/urgent incident:** read existing Task/PR and send a direct 3-line Owner relay to the actual relevant active chat. `TECH_CONSULT` and `CROSS_TEAM_REVIEW` require no chain. `URGENT_INCIDENT` can contact the real responder immediately with evidence, affected manager + Delivery FYI if release or scope impacted. `DIRECT_SCOPED_TASK` proceeds only within existing approved Task paths; extra scope needs actual component owner approval, on the same Issue.

Keep required signers exact full SHA, independent QA HOLD, Delivery LAST, CEO-only `ant-project/main` merge and actual automatic release gate requirement unchanged. No new ChatGPT chats are created by GitHub or JSON.
