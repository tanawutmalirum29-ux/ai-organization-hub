# Quick readiness drills — Governance V2 Fast Lane

**Global sizing:** [Owner global 10 cap](TEAM-CAPACITY-AND-MANAGEMENT-CONTRIBUTORS.md) means **ALL AI roles together <=10**, not per Team. Four genuine Lead ACKs (#21–#24) plus ten registered roles must be reconciled; no new AI for huge workloads.

These are suggested **checks**, not a mandatory separate training/approval ceremony. Real tools and performance must still be evidenced.

| Situation | Expected answer |
| --- | --- |
| A tiny team already has approved Engineer slots | Appoint no extra AI merely to fill slots; qualified Lead may implement within scope with separate independent reviewer |
| Huge round would benefit from 11+ AI across multiple work teams | DO NOT create the 11th chat or make another 10-AI team; schedule existing ten, combine duties, use managers as coders when appropriately reviewed |
| Director or Deputy helps code in a team | This AI already occupies one GLOBAL organizational seat; require separate reviewer and independent QA signoff |
| New chat received only repository URL | `NEEDS_APPOINTMENT`, no fake identity |
| New Lead received real Issue and posted ACK | Direct manager verifies actual ACK + approved slot; may appoint both allocated Engineers **before roster-sync PR** |
| A team has 4 individual verified ACKs waiting for roster update | Batch one registry PR; no separate unlock at every level |
| SYS Engineer needs PLAT Engineer's help with CI | `TECH_CONSULT` direct with existing Issue link, no ancestor hops |
| QA Engineer detects a real defect in SYS code | Send reproducer **directly** to SYS assignee and owning Lead/manager; independent QA HOLD remains effective |
| CEO sees urgent production regression inside already assigned code | `URGENT_INCIDENT` to relevant active Engineer directly + manager FYI; any write stays inside approved scope |
| Direct request asks to edit a different team's files | Owning Lead/Director/Domain delegate must approve scope in existing Issue; request alone does not grant write authority |
| Engineer needs extra Assistant capacity | Contact CEO directly with affected manager/Delivery included, one capacity decision; real appointment+ACK still required |
| Browser or CI tools are not accessible | `CAPABILITY_BLOCKED / NOT_VERIFIED`, no Owner manual debugging |
| Release candidate HEAD changed after QA signoffs | Old signatures stale; independent QA and Delivery gate rerun |
| Existing `IMPLEMENTATION_HOLD` | Remains HOLD even after policy/appointment Fast Lane update |
