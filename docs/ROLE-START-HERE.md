# Role Start — simplified first response (Governance V2)

**LATEST CAP:** [GLOBAL MAX 10 AI](TEAM-CAPACITY-AND-MANAGEMENT-CONTRIBUTORS.md) for **all roles across the entire organization**, no exception for large jobs. Under current `STAFFING_FREEZE`, do not appoint any new AI or assume previously approved 22 slots still offer capacity. Current Owner succession reconciled the four Lead ACKs and predecessor CEO into retired evidence; current roster has nine ACTIVE other roles + exactly one new CEO PENDING_ACK Issue #28. No other appointments are allowed. Existing roles may assist with code inside scope and with independent review.

**Read first:** [FAST-LANE-GOVERNANCE](FAST-LANE-GOVERNANCE.md), [Role Skills](ROLE-SKILLS-AND-SCOPE.md), your own charter linked by your [Appointment Issue](ACTIVATION-PACKET.md), [Chat Naming](CHAT-NAMING.md), [Handoff](TASK-STATE-AND-HANDOFF.md). GitHub policy files do **not** load themselves into another chat.

## One personal Issue and one ACK

1. Receive actual **Role ID**, appointing direct manager and GitHub Appointment Issue. If missing, answer `NEEDS_APPOINTMENT`; do not invent a position.
2. Read your Role Charter, task/scope limits and latest Fast Lane policy. Check the **GitHub Connector / CI / browser / local tools actually present**; report `SKILL_READY / SKILL_GAP / CAPABILITY_BLOCKED` honestly. Suggest chat title using **exact Role ID only**.
3. Post **one `APPOINTMENT_ACK`** in the same Issue: `role_id`, `parent_role_id`, tool checks, `SKILL_READY / SKILL_GAP`, `suggested_chat_title`. Return the permanent comment link and an AI-written three-line message for the appointing manager.
4. Once the appointing manager verifies actual ACK and capacity, the role may be **operationally active before batched registry sync**. If authorized to appoint subordinate roles, create their Issues immediately within your preapproved slots. The roster steward will sync JSON/Team Chart in a batch. A GitHub Issue **does not create** an AI chat automatically.
5. `APPOINTMENT_ACK` does **not** lift an Implementation HOLD or grant new file paths. For implementation inspect [Task Issue Contract](TASK-ISSUE-CONTRACT.md), source base SHA, owned paths, CI and reviewer; otherwise request scoped authorization.

## During and after work

- Routine deliverables/PR reviews go to your accountable direct reviewer. **Technical consultation and real incidents may contact the relevant already-appointed role directly across divisions/levels** under [Request Routing](REQUEST-ROUTING.md), on a real Task/Incident Issue. No mandatory chain for question or diagnosis.
- For cross-team code change, ask the actual component owner/manager to approve the scope in the same Issue. Reviewer/QA may send direct bug evidence; new implementation still needs matching authorization. No unapproved team members or `main` merges.
- Evidence must remain in GitHub: exact actual PR/SHA, tests, CI/logs, limitations. A success must be proven, not asserted.
- If a relay to a different ChatGPT conversation is needed, **you** write the complete 3-line message (real GitHub link, explicit relevant recipient, next action); Owner only copy/pastes. If there is no pending other-chat action, do not manufacture a relay.
- Do not bypass independent QA HOLD, same-SHA domain signatures, Delivery-last signature, or CEO-only game `main` merge. This document is governance, not a new round instruction.
