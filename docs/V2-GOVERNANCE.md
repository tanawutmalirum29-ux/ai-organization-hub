# Ant Kingdom — Governance V2: accountable roles, direct coordination

**Current policy:** [FAST-LANE-GOVERNANCE](FAST-LANE-GOVERNANCE.md). Governance V2 is ACTIVE for the roles and ACKs recorded in the live [Registry](ai-org/TEAM-REGISTRY.json); an unissued slot does not create a ChatGPT chat. `COLONY-NEXT-01` remains `IMPLEMENTATION_HOLD` until its authorized manager separately releases implementation.

## Organization and technical authority

`OWNER → CEO → DCEO-DELIVERY → DCEO-SYS/EXP/PLAT/QA → Directors → Team Leads → as-needed Engineers/Assistants (max 10 active AI per working team)`.

Every active role has **one accountable direct manager**, and new roles may be appointed only by that direct manager within preapproved slots. **That hierarchy governs accountability and ownership, not who may ask a technical question.** Direct technical contacts, cross-team consultations, and real urgent incident notices may go to the relevant role **without passing through every intermediary**. For out-of-scope code changes, the actual component owner must still consent. Read [Routing](REQUEST-ROUTING.md).

## Dynamic team staffing

Every working team has **no more than 10 active AI contributors including Lead and hands-on management helpers**. A work team may use zero dedicated Engineers if its Lead performs the task, one, or more as needed. When work exceeds ten participants, split into separate coherent teams rather than cramming additional people into one. Senior management can contribute design, code, tests and integration when qualified, but implementation/review must be separated and independent QA preserved. See [Adaptive team capacity](TEAM-CAPACITY-AND-MANAGEMENT-CONTRIBUTORS.md). The ten-person ceiling is per work team, **not the entire organization**; capacity slots are maximum approval, not a minimum hiring quota.

## Simple appointment procedure

1. Manager creates **one individual Appointment Issue** with real role ID, direct parent, approved slot, charter, scope and name recommendation.
2. Owner forwards one prewritten message; receiving AI reads its rules, checks real tools and posts **one `APPOINTMENT_ACK`** in that Issue.
3. Manager verifies ACK + capacity. Recipient is operationally ready for its authorized duties or for appointing its allocated child roles **without a separate registry-sync gate**. Delivery/Roster Steward updates the JSON registry in a batched PR, never fabricating an ACTIVE role without a real ACK.

No need for a fresh ancestors' approval for each subordinate inside an already authorized capacity envelope. Missing ACK, duplicate ID, unapproved capacity or real tool blocker remain HOLD. See [Activation](ACTIVATION-PACKET.md), [Fast Lane](FAST-LANE-GOVERNANCE.md) and [Staffing](STAFFING.md).

## Work, QA and Release authority still protected

CEO defines round scope/capacity, handles true exceptions, and is **the only role that merges `ant-project/main`**. Delivery integrates the candidate and signs **last**. Relevant SYS/EXP/PLAT deputies sign their affected domains on the immutable full candidate SHA; independent DCEO-QA must pass and may issue binding `QA_HOLD`. Directors/Leads own work breakdown, file ownership, review and integration; Engineers change only allowed paths with PR/CI evidence.

A direct cross-team request may diagnose, review, or ask for an existing scoped fix; it **may not** silently move ownership, grant new file paths, evade code review, ignore a `QA_HOLD`, add unapproved assistants or merge main. If the automated release-signature verifier is not installed, preserve `GATE_NOT_CONFIGURED / RELEASE_HOLD`; urgency is not a substitute for a valid gate.

## Practical handoff

- Routine Task success: report to the accountable reviewer/manager (normal reporting is useful but not a communication restriction).
- Technical assistance or urgent blocker: send one direct GitHub-backed request to the actual relevant **ACTIVE** recipient; log component, action and review owner. Affected parent/Delivery receive FYI only when resource use, scope, priority or release impact changes.
- Owner's only job: decide product goals and forward the concise 3-line AI-written message between chats. GitHub comments do not automatically contact other ChatGPT conversations. No manual Owner CI, ZIP or Git operations.

See [Role Start](ROLE-START-HERE.md), [Skills](ROLE-SKILLS-AND-SCOPE.md), [Task issue](TASK-ISSUE-CONTRACT.md), [After-task](TASK-STATE-AND-HANDOFF.md), [Chat naming](CHAT-NAMING.md), [Release signatures](RELEASE-SIGNATURES.md).
