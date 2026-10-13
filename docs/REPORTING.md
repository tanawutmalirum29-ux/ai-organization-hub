# Reporting & relay — V2

**Mandatory closing message for EVERY role:** after actual work or appointment ACK, follow [Status → Who next](TASK-STATE-AND-HANDOFF.md) and use one of the exact [Owner Relay Templates](RELAY-TEMPLATES.md). Must identify `Sender → DIRECT_NEXT_ROLE`, GitHub report permalink and `Next recipient: ROLE-ID | next action`, or state `STANDBY / no relay needed`. No role may leave Owner to decide routing or invent a missing GitHub report.

**Mandatory Role selfcheck:** Each role reads [Start Here](ROLE-START-HERE.md) and [Role Skills](ROLE-SKILLS-AND-SCOPE.md) before ACK, reports actual tools/access and SKILL_READY or SKILL_GAP, and cannot claim a GitHub Issue comment automatically reached another ChatGPT chat.
Source of truth: Governance rules in `appointment-CEO`, active roster in `appointment-CEO/docs/ai-org/TEAM-REGISTRY.json` and `ACTIVE_TEAM.md`, actual game task/PR/tests/actions/signoff GitHub links in `ant-project` (canonical roles/signoff board remain in `appointment-CEO`).

**Every directive, approval and request must travel one adjacent organizational edge, never CEO→Engineer directly.** A cross-team consultation rises via immediate parents to shared ancestor, then down to recipient chain. No chat receives a message merely because a GitHub comment was posted; Owner carries **up to three concise lines** with sender, permanent GitHub link, immediate next recipient:
`<ROUND> <SENDER_ROLE> → <DIRECT_CHILD_OR_PARENT> | EVENT / STATUS / HEAD`
`GitHub evidence: https://github.com/.../issues/N#issuecomment-ID`
`Next recipient: <ONE ADJACENT ROLE> | <expected action>`

Event types: `APPOINTMENT_ISSUED`→`APPOINTMENT_ACK`; `TASK_ASSIGNED`→`ENGINEER_DELIVERED`→`TEAM_ACCEPTED`→`DEPARTMENT_ACCEPTED`→`DOMAIN_SIGNED`→`INDEPENDENT_QA_SIGNED`→`DELIVERY_SIGNED`→CEO `RELEASE_AUTHORIZED`. Also `ORG_DELTA`, `ACCESS_REQUEST`, `STAFFING_REQUEST`, `CAPACITY_APPROVED`, `QA_HOLD`, `INVALID_ORDER`. Each contains parent role, Issue, SHA+run URLs and next direct recipient as appropriate.

The Delivery roster steward records each actual acknowledged appointment and reports versioned org-chart changes to CEO via delivery (not every child Engineer's raw message). No requests to Owner to run CI, send ZIP, type commands or transport artifacts. Signoff comments under shared GitHub identity need source+scope+SHA/CI evidence and roster linkage; they cannot prove cryptographic ChatGPT identity. See [V2](V2-GOVERNANCE.md) and [Signatures](RELEASE-SIGNATURES.md).
