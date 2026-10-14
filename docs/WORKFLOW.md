# Operational workflow — V2 Fast Lane

**GLOBAL CAP:** [10 AI across the ENTIRE organization](TEAM-CAPACITY-AND-MANAGEMENT-CONTRIBUTORS.md), not 10 per Team. CEO + Delivery + all Departments + technical staff + standby + verified unregistered ACKs count together. STAFFING_FREEZE pending reconciliation; giant jobs are split into tasks performed by these SAME 10 AI, not new chats. Managers can write scoped code with independent reviewer; no fixed Engineer pair.

**Authoritative:** [Fast Lane](FAST-LANE-GOVERNANCE.md), [Activation](ACTIVATION-PACKET.md), [Request routing](REQUEST-ROUTING.md), [Task scope](TASK-ISSUE-CONTRACT.md).

1. **Owner → CEO:** Owner defines goal or changing product priorities. CEO plans approved round scope, budget and release-required domains. Owner remains messenger only for AI inter-chat traffic.
2. **Staffing:** the appointing **direct manager** creates one Issue per real new AI, Owner forwards it, AI writes one real ACK on that Issue. Inside approved capacity, a manager can issue preapproved child appointments without awaiting another registry sync message. Steward/Delivery batches a safe registry PR, no fake ACTIVE.
3. **Tasks:** the actual work owner/Lead assigns file and branch scope once on a Task Issue; use it for implementation and tests. If the task already exists, a direct scoped request may reuse it instead of creating new tickets.
4. **Collaboration:** any active AI may directly consult the relevant specialist/peer or contact an urgent responder. No ancestor-hop permission for read-only diagnosis. For **new cross-team writes**, affected file owner/manager approves the scope and review in that same Issue; notify parent/Delivery for impact.
5. **QA and integration:** Engineer → Lead → Director → affected Deputy QA. Independent DCEO-QA may issue `QA_HOLD`; it may contact the failing implementation owner directly with a repro. Delivery integrates, verifies signatures/CI on the immutable candidate SHA and signs LAST.
6. **Release:** only CEO merges `ant-project/main` after required verified CI/signatures/QA and configured final signature gate. Unconfigured gate, missing runner/QA or unresolved HOLD blocks merge. Clean up completed branches with approved Platform automation, not manual Owner work.
7. **Done:** report one real GitHub permalink and real next recipient; where no next action exists, `STANDBY / NO_RELAY_REQUIRED`.

**Current game round:** COLONY-NEXT-01 is still in `ORG_SETUP_IMPLEMENTATION_HOLD` in registry at time of this policy edit. The Fast Lane does not implicitly authorize Source Implementation or open another Round.
