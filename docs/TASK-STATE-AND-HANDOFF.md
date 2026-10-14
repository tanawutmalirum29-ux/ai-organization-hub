# Task status and next action — Governance V2 Fast Lane

This table preserves technical acceptance and Release gates while allowing [direct relevant contacts](FAST-LANE-GOVERNANCE.md). Routine reporting still has an accountable manager; **requests, consultations and urgent incidents need not move along every hierarchy edge**.

| State | Actual next action | Relevant recipient |
| --- | --- | --- |
| `APPOINTMENT_ISSUED / PENDING_ACK` | New chat reads Issue/charter and posts **one** real `APPOINTMENT_ACK` | That appointed AI chat |
| `APPOINTMENT_ACK / SKILL_READY` | Direct manager verifies Issue, ACK and slot; can let already approved children appoint immediately; Steward syncs registry in batch | Appointing direct manager, FYI Delivery/Steward if needed |
| `SKILL_GAP / CAPABILITY_BLOCKED` | Record real limitation, seek suitable scoped tool/alternative | Responsible manager or relevant PLAT specialist directly |
| `TASK_ASSIGNED` | Verify authorized Task scope, paths, PR target, tests and owner; then work | Named accountable assignee |
| `ENGINEER_DELIVERED / ASSISTANT_DELIVERED` | Verify PR/diff/CI, request rework or accept | Own Lead / approved direct reviewer |
| `CHANGES_REQUESTED` | Fix only accepted scope, rerun relevant evidence | Actual assignee, direct even if QA/Delivery surfaced repro |
| `TEAM_ACCEPTED` | Review integrated Team work | Department Director |
| `DEPARTMENT_ACCEPTED` | Verify domain candidate and sign/HOLD | Own Domain Deputy |
| `DOMAIN_SIGNED / DOMAIN_HOLD` | Compile same SHA evidence or route blocker directly to affected owner | DCEO-DELIVERY; impacted active specialist may receive direct repro |
| `INDEPENDENT_QA_SIGNED / QA_HOLD` | QA acceptance or binding block; direct notify affected Engineer allowed | DCEO-DELIVERY and impacted owner for triage |
| `DELIVERY_SIGNED` | Verify candidate SHA/signatures/CI and decide merge HOLD or Release | AI CEO |
| `RELEASED / RELEASE_HOLD` | Inform Owner of actual merge or HOLD; send actionable rework to relevant owner with manager FYI | Owner for info, responsible technical role for rework |
| `TECH_CONSULT / INFO_REQUEST` | Answer directly with relevant Issue/PR link, no new issue/hops | Relevant **ACTIVE** specialist |
| `CROSS_TEAM_REVIEW` | Read, diagnose and leave evidence on existing Issue | Relevant technical owner/QA |
| `DIRECT_SCOPED_TASK` | Implement only existing approved allowlist; scope expansion needs owning manager consent | Authorized assignee / reviewer |
| `URGENT_INCIDENT` | Contact relevant responder directly; contain in scope, log urgency and notify affected owner/Delivery | Closest technically relevant **ACTIVE** role |
| `STAFFING_REQUEST` | Use existing approved capacity, or request one CEO budget decision directly with manager FYI | Direct manager or CEO for extra budget |
| `BLOCKED / NOT_VERIFIED` | Log actual evidence and send it to an available relevant owner quickly | Responsible manager or relevant PLAT/QA expert |
| `STANDBY` | Close work-only issues with evidence; no new work without mandate | No relay unless another chat has a real action |

For any `URGENT_INCIDENT`, **there is no shortcut past independent QA, Delivery's last signature, CEO-only main merge or an existing `IMPLEMENTATION_HOLD`**. No fabricated PASS or purported inter-chat delivery. One Issue/PR is enough for the underlying technical thread.
