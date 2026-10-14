# Reporting and Owner relay — Governance V2 Fast Lane

[Fast Lane](FAST-LANE-GOVERNANCE.md) is the canonical policy. All evidence lives in real GitHub Issues/PRs/CI. The **one accountable manager per role** remains, but technical requests and urgent blocker alerts can go straight to the relevant active role without manager-to-manager message relays.

## For an appointment

Manager creates **one individual Issue** with Role ID, parent and approved slot → Owner forwards manager's message → new AI posts **one real `APPOINTMENT_ACK`** in that Issue → manager verifies ACK and slot. Manager may let preapproved child roles proceed immediately; Delivery/Roster Steward syncs registry in **batches**, with no fictional ACTIVE entry. Suggest the chat name as the exact `<ROLE_ID>`.

## For a technical request / incident

Use existing Issue/PR and give `from → actual recipient | TECH_CONSULT / CROSS_TEAM_REVIEW / DIRECT_SCOPED_TASK / URGENT_INCIDENT | reason + component`. No new form or Issue for a small question. Notify impacted direct manager/Delivery when priority, assigned code paths, capacity or release gate would change. Recipient may investigate immediately; **new writes outside original Task scope require explicit component-owner approval** on that Issue.

## For code delivery and Release

Engineer → accountable Lead (Team acceptance), Lead → Director (department acceptance), Director → Domain Deputy, Domain/independent QA → Delivery, Delivery signs **last** and sends final release to CEO, CEO solely merges `ant-project/main` and informs Owner. QA may **also send a blocker/repro directly** to the affected specialist while its formal `QA_HOLD` remains with Delivery.

Reports must ground claims in issue/PR permalinks, actual full SHA, test commands and CI/browser evidence as required by the task. `NOT_VERIFIED` is not `PASS`. If release signature CI is not configured, maintain `GATE_NOT_CONFIGURED / RELEASE_HOLD`; direct contact does not relax it.

## Copy-and-paste messages for Owner: three lines maximum

```text
<ROUND> <SENDER> → <RELEVANT_ACTIVE_ROLE> | <EVENT / REQUEST_TYPE / STATUS>
GitHub: <real permalink to Issue/PR/report>
Next recipient: <RELEVANT_ACTIVE_ROLE> | <one concrete question / assigned action>
```

Owner handles **only** the actual inter-chat copy/paste and strategic decisions, not GitHub Actions, QA, code, branch deletion or artifacts. If no other chat needs action, send `STANDBY / NO_RELAY_REQUIRED` instead of circulating administrative messages.
