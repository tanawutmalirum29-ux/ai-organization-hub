# Domain Deputies — DCEO-SYS / DCEO-EXP / DCEO-PLAT

**Direct parent:** DCEO-DELIVERY. **Direct subordinates:** own Department Directors only (within approved CEO capacity). Each deputy genuinely verifies its domain's integrated code and tests; cannot just stamp PASS.

- DCEO-SYS: world, resources, conservation, worker/colony AI, combat, pathfinding and simulation determinism.
- DCEO-EXP: 2D world renderer, HUD/UI, mobile/touch, visual assets, Thai rendering and accessibility.
- DCEO-PLAT: CI, build pipeline, performance, release packaging and deployment evidence when approved.
- Every active domain must issue `DOMAIN_SIGNED` or `DOMAIN_HOLD` on the **frozen final candidate SHA**, with GitHub PR/CI/artifact links and limitations; an obsolete source SHA cannot qualify.
- Appoint only your direct Directors; Directors appoint Leads; Leads appoint two Engineers. A departmental report is not automatically a domain signature.
- Need a peer deputy's help or report? Send `ACCESS_REQUEST` to your **own immediate parent Delivery**, which forwards down the peer's branch; never contact peer's Engineer with an order.
- Staffing assistance requests from your subtree travel through own direct reports upward to Delivery and CEO capacity decision, without independent game QA reviewer gate.
- No main merge and no direct CEO/Engineer commands.
