# Command / consultation / escalation protocol V2

## Invariant: adjacent-hop only
At any instant, an active AI has one direct supervisor in the live `ant-project/docs/ai-org/TEAM-REGISTRY.json`. Only the supervisor issues executable orders to that AI. Manager-to-subordinate and subordinate-to-manager traffic advances **exactly one edge** in each relayed message; peer instructions are invalid. A common-ancestor router can forward a request to another branch, but may not directly command another branch's Engineer.

**Correct command** CEO→DCEO-DELIVERY→DCEO-EXP→VIS-DIR→VIS-TL1→VIS-E2.
**INVALID_ORDER** CEO→VIS-E2. The Engineer stops, sends `ORDER_ROUTE_CORRECTION` to VIS-TL1, and work begins only after each actual intermediate manager has processed and forwarded a Task Issue and target's ACK. The CEO's original intention may stay attached as a proposal URL; it never overrides missing approvals.

## ACCESS_REQUEST or TECH_CONSULT
A SIM Engineer requests an EXP team's SVG/performance review. SIM-E→SIM-LEAD→SIM-DIR→DCEO-SYS→DCEO-DELIVERY (their nearest common ancestor)→DCEO-EXP→VIS-DIR→VIS-TL2. Approval at a hop is sufficient ONLY for that hop's scope; if the resource is outside manager's authority, forward the same Request ID upward one step. Receiving side grants narrow READ_ONLY access/consultation and routes the result back; it is not authorization to change foreign source.

A public repository file can be read without special GitHub ACL; this rule controls permission to consume other team's effort, restricted documents, change task ownership, or access sensitive evidence. No fabricated credentials or permission claim.

## Required request fields
`request_id`, `type`, `origin_role_id`, `round`, `direct_parent`, `issue_url`, `purpose`, `requested_data_or_action`, `scope/read_or_write`, `risk`, `expires_at`, `current_hop_decision`, `next_adjacent_recipient`, `receipt_url`. Each hop appends decision/authority and keeps the same Request ID. A direct report sends up only, not CEO by shortcut.

If denied, log reason. If urgent, add `URGENT_BLOCKER` to shared Issue for visibility but route the actual fix normally. Quality Deputy raises binding `QA_HOLD` to Delivery, which routes down to the correct domain deputy→Director→Lead→Engineer; QA cannot order another Engineer directly.
