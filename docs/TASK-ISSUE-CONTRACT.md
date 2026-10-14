# Minimal Task Contract — scope is mandatory; bureaucracy is not

**Policy:** [Fast Lane](FAST-LANE-GOVERNANCE.md). **Consultations, bug reports and read-only reviews do not require a new Task Issue.** Reuse one existing Issue/PR and contact the actual relevant active AI directly; [Routing](REQUEST-ROUTING.md).

## For any production code write (one Task Issue or existing scoped Task comment)

Required:
```yaml
round_id: "COLONY-NEXT-01"
task_id: "real issue reference"
sender_role_id: "requester; may be cross-team / skip-level"
recipient_role_id: "actual authorized implementer"
appointment_issue_url: "real appointment Issue"
registry_version: "latest known; batch sync may be pending"
main_base_sha: "<40-character SHA>"
task_branch: "unique branch owned by assignee"
target_branch: "approved team / integration branch, NOT main for Engineer"
owned_paths: ["authorized source path"]
forbidden_paths: ["other-owned paths or NONE"]
input_contract: "affected component and actual reproducer / requirement"
output_contract: "measurable required behavior"
dependencies: ["NONE or real URL"]
acceptance_criteria: ["at least one testable criterion"]
required_tests: ["actual tests or explicit NOT_VERIFIED"]
auto_ci_trigger: "real workflow trigger or BLOCKED"
report_issue_url: "existing Task Issue"
reviewer_role_id: "accountable Lead / delegated owning manager"
next_recipient_role_id: "relevant reviewer / requester"
```

**Fast path:** if all code scope/ownership/test/branch information is already in the existing Issue, the request only needs a short comment referencing those existing fields; do not duplicate the Issue. **A direct request is not authorization to expand file paths.** For an out-of-scope write, the component's owner/authorized Lead or Director must give expedited acceptance **in that same Issue**. Notify affected direct manager and Delivery on meaningful scope conflicts; no mandatory chain via every superior.

**QA gates unchanged:** actual diff/CI, exact SHA and relevant browser/simulation checks, no fake PASS, no Engineer main merge. QA or reviewer may contact affected assignee directly with reproducer; final departmental/independent QA and Delivery/CEO release decisions remain required. No new game implementation while `IMPLEMENTATION_HOLD` is in effect.
