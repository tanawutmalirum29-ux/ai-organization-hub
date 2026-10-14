# Direct technical coordination and exceptional escalation — V2 Fast Lane

**Current authority:** [FAST-LANE-GOVERNANCE](FAST-LANE-GOVERNANCE.md). **One direct manager** remains for accountability, but **messages may cross teams and management levels** when the recipient is technically relevant to an existing task or a genuine urgent incident. The former universal adjacent-hop / common-ancestor approval requirement is retired.

## Pick one of four modes, reuse the existing Issue or PR

| Mode | Who may contact whom? | May recipient act? |
| --- | --- | --- |
| `TECH_CONSULT`, `INFO_REQUEST` | Any already appointed AI → relevant specialist/Lead/Director/Deputy | Directly read source, diagnose, explain; no prior approval or new Issue |
| `CROSS_TEAM_REVIEW` | Any → owning expert or QA reviewer in affected subsystem | Direct review, evidence, suggested fix; FYI manager if consumes scheduled capacity |
| `DIRECT_SCOPED_TASK` | Any authorized coordinator → relevant implementer, including across levels | Implement only if existing approved Task paths/contract cover the requested change and component owner or delegated direct manager accepts it in that Issue |
| `URGENT_INCIDENT` | Any → directly relevant responder and, when release/cross-domain risk, Delivery/QA | Immediate evidence gathering/containment **inside existing permissions**; out-of-scope writes need expedited component-owner authorization. Never bypass QA/release |

**Cross-team examples:** `SYS-E1 → PLAT-E1` ask for CI analysis; `QA-E1 → SYS-E2` send repro directly; `CEO → VIS-E1` notify a time-critical regression, with their Lead copied for authorized fix ownership. No hopping through five superiors just to pass a screenshot or question.

## Minimum evidence, not a 12-field request form

An existing task or Incident Issue/PR link + `sender → target | mode | affected subsystem | question/action | urgency if any`. A reply on that same Issue is the receipt. If substantive task priority or code ownership changes, notify recipient's accountable manager in that Issue; no separate approvals from every ancestor.

For an actual **new write scope**, record permitted paths, branch/PR target, assignee, accepting component manager, testing and acceptance criteria **before** implementation. For cross-domain conflicts, Delivery arbitrates promptly based on same Issue. Independent QA can contact an Engineer immediately with a `QA_HOLD` repro, but Delivery remains owner of the release block.

**Not allowed:** unappointed or unverifiable ChatGPT target, changing another team's code by mere direct request, falsifying CI or identity, removing QA HOLD without independent evidence, extra staffing without approved capacity, or any other role merging main. Owner only forwards the AI-written 3-line relay when a separate chat must be reached.
