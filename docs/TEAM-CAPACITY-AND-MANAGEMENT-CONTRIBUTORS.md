# Governance V2 — Adaptive team staffing, up to 10 AI per working team

**Owner directive — effective when merged into `appointment-CEO/main`.** This is an extension of [Fast Lane](FAST-LANE-GOVERNANCE.md) and OVERRIDES older references to **exactly two core Engineers per Team Lead**, mandatory Engineer pair appointments, or staffing primarily by org-chart position. It does **not** cap the entire company at 10. Multiple independent working teams may exist for a sufficiently large project.

## 1. Capacity and right-sizing

- A **working team** means the actual coordinated group assigned to one deliverable/workstream, ordinarily under one Team Lead or another named accountable owner. **Maximum 10 actively participating AI conversations per working team**, including its accountable Lead, Engineers, Assistants, and Directors/Deputies/other managers **when they themselves materially execute tasks in that team**. If one AI participates in several work teams, count that AI **once in each** team where it works. Do not escape the cap by renaming an Engineer "Assistant"/"Advisor"/"Manager" or allocating a hidden shadow team. Mere organization-wide oversight without executing the team's deliverable does not consume its membership slot.
- **No minimum two Engineers.** A Lead can run with zero dedicated Engineers when it personally performs the approved task, or one Engineer, or more specialized Engineers up to the ten-person *inclusive* cap. Hire only when separate concurrent work, independent expertise or review capacity is demonstrably needed; do not instantiate AI just to fill a chart.
- **Suggested planning ranges, not quotas:** very small = 1–2; normal = 2–4; larger = 5–7; complex = 8–10. Start with the smallest qualified group, assign broader cohesive modules to members, limit handoffs and rebalance before adding people.
- **Beyond ten:** split into two or more **distinct workstreams/teams**, each with its own accountable owner, bounded tasks, paths, PR targets, and acceptance reviews, keeping each team at **10 or fewer**. Delivery coordinates interfaces and shared dependencies. Only the Owner may change this general cap explicitly via a revised governance policy; CEO cannot self-waive by relabeling positions.
- **Count actual active participation** for a round, not dormant role templates, issued Issues, proposed slots, or organizational positions outside the team. Track `team_id`, `accountable_lead_role_id`, `active_member_role_ids` and `task_issue_url` for each activated working team. Inactive/standby AI not doing that team's work should not count. An operational role may be on standby without occupying a working team.

## 2. Managers may contribute technically

CEO, Delivery, Domain Deputies, Department Directors and Leads may personally **scope, design, diagnose CI, write/modify code, write tests, integrate or review**, **when task-relevant, qualified and equipped**. Their formal title is **not** a ban on technical work.

Conditions for hands-on management work:
1. Use the same **real Task Issue or existing scoped PR** as any Engineer: assign a named individual `implementation_owner_role_id`, allowed paths, base SHA/branch, tests, and a separate **reviewer_role_id** with actually available tools.
2. Count a hands-on manager in the work team's **ten-person cap**; remain accountable to their own direct manager for organizational results. Cross-team contacts still follow Fast Lane (direct relevant communication is permitted).
3. **No self-approval:** the implementer cannot serve as the sole acceptance reviewer or sign off their own changed code as independent QA. The owning manager or another qualified independent reviewer must check diff/CI; if that person is unavailable, `REVIEW_HOLD` until a real reviewer is assigned. Manager can participate in a team under a Lead while preserving a separate independent reviewer.
4. **QA independence:** DCEO-QA and QA signers must **not implement the very production change they independently certify**. If QA personnel contribute to a non-QA implementation, assign a different truly independent QA reviewer/signatory for that change; if the required independent QA function cannot be preserved, `QA_HOLD`.
5. **CEO main merge separation:** CEO remains the sole allowed merger of `ant-project/main`. If CEO authors code in a release candidate, the required non-CEO reviewer(s), affected Domain review, independent QA and Delivery-last signatures must still independently review the unchanged final SHA; CEO's own coding/test statement never substitutes for signatures or the configured final release gate.

## 3. Existing approved staffing is an upper envelope, not a hiring target

The **COLONY-NEXT-01** roster currently has ten ACK-backed organizational positions in the registry and an earlier **22-slot organizational envelope** (CEO + Delivery + four Deputies + four Directors + four Leads + eight optional Engineers). **Those 22 slots are not one working team and do not require recruiting 22 AI chats.** Already verified appointments and Pending ACK Issues remain valid; unfilled Engineer capacity is optional. Director/Lead can right-size teams to only needed members and ask CEO/Delivery to reallocate unused capacity, without invalidating an existing acceptance.

**Operational activation:** new appointments still require one Issue + one actual AI `APPOINTMENT_ACK` within approved capacity per [Activation Packet](ACTIVATION-PACKET.md); the registry is synchronized in batches. A policy merge does not create AI chats, make a person ACTIVE or release `IMPLEMENTATION_HOLD`.

## 4. Machine-readable roster and task protocol

In the roster, `policy.max_active_ai_per_work_team=10`, `policy.min_core_engineers_per_lead=0`, and `policy.fixed_two_engineers_required=false`. `work_teams[]` contains only **activated**, actually assigned working teams. Check unique member Role IDs within each team, maximum membership 10, named accountable manager, no duplicate `team_id`, and links to real task authorization. A roster snapshot can lag an ACK batch, but cannot mark fake or unacknowledged ACTIVE members.

For a team-sized task, define: `team_id`, `team_lead_role_id`, `active_members`, broad module ownership per person, expected tests/reviewer, and one current Task/Issue URL. Add a new team/member only after estimating actual work, avoiding unnecessary user relays. Do not grant source-write permissions merely by adding someone to `work_teams`.

## 5. What never changes

Exactly **one organizational direct parent** for each AI; one accountable owner per code path; real scope/CI/QA evidence; independent QA veto; Release Candidate signatures on the same full SHA; DCEO-DELIVERY signs LAST; CEO alone merges game `main`; absent signature automation remains `GATE_NOT_CONFIGURED / RELEASE_HOLD`. Cross-team consultations and genuine urgent incidents may go directly to a relevant ACTIVE role under Fast Lane, but no scope or release bypass.

**Owner burden:** decide product goal / authorize structural cap-policy changes / forward only the concrete AI-written messages required to contact other existing chats. Managerial AI must handle staffing plans, Task/PR/CI, and reviews themselves.
