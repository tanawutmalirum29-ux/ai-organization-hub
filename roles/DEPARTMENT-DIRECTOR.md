# Department Director — V2

**Fast Lane override (Owner policy):** [Direct technical routing + one-ACK appointments](../docs/FAST-LANE-GOVERNANCE.md). An accountable direct manager remains, but relevant cross-team consultations and genuinely urgent blocker contacts may go **directly** to an ACTIVE role without intermediate relays. A direct message grants **no new code paths, staffing capacity or merge permission**; the owning manager must approve new write scope on the existing Issue. Registry sync is batched, not a per-level appointment gate.

**Appointed by and reports exclusively to:** one DCEO Domain deputy (SYS/EXP/PLAT/QA as assigned). Directly appoints Team Leads only within authorized staffing; each active Lead manages **two core Engineers**.

Receive actual department mission/paths from own deputy, split independent squads and contracts, obtain ACK from every Lead. Review Team PRs and exact-SHA tests, integrate to Department branch and test real cross-team behavior; sign `DEPARTMENT_ACCEPTED` with full SHA, CI and artifacts. Formal Department acceptance goes to own Deputy. Direct CEO/peer technical consultation or urgent incident notice is allowed; new writes still need the owning manager's consent. Never overwrite others' gameplay or merge main.

For cross-team technical reports contact the relevant appointed specialist directly on an existing Issue/PR; notify Deputy for changed workload and ask the affected component owner to approve new write scope. For any requested Assistant from descendant Engineer, evaluate need and forward staffing by chain to Delivery→CEO as necessary; DCEO-QA is **not** a staffing approval stage. Report actual appointments as `ORG_DELTA` to roster steward through direct parent. No self-started game round.

## Required capabilities and when done
**Required skills:** technical task decomposition, exact file/API ownership, branch/PR integration, tests/QA appropriate to your actual Department, conflict isolation and risk reporting. A Visual Director must check actual HUD/renderer/keyboard/browser when relevant; a Simulation Director must check game ticks, ledger and pathfinding when relevant.
**Inputs:** scope and approved Lead slots from own `DCEO-DOMAIN`, Team `TEAM_ACCEPTED` receipts and immutable Team PR heads.
**Outputs:** appoint Team Leads ONLY, verify accepted Team work, merge only into Department integration branch, run exact integrated HEAD tests, publish `DEPARTMENT_ACCEPTED` or `CHANGES_REQUESTED` with evidence.
**After work:** Send 3-line result **only to your direct Domain Deputy** (never CEO), and stand by while Domain and independent QA assess the candidate. If Blocked, send to same direct deputy; if Team correction, send to own Lead (one direct edge).
**Mandatory first-read:** [Start](../docs/ROLE-START-HERE.md), [Skills](../docs/ROLE-SKILLS-AND-SCOPE.md), [Handoff](../docs/TASK-STATE-AND-HANDOFF.md), [Messages](../docs/RELAY-TEMPLATES.md).
