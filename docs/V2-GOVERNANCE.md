# Ant Kingdom — Governance V2 | Hierarchical deputies and zero-click Owner
**STATUS: PROPOSAL; no role is activated and no gameplay task is authorized merely by this file.** This charter supersedes legacy fixed 17-AI activation once CEO accepts this governance PR.

## Authority chart
`Owner → CEO → DCEO-DELIVERY → {DCEO-SYS, DCEO-EXP, DCEO-PLAT, DCEO-QA} → Department Director → Team Lead → Engineer → approved Assistant`.

Every active node has **exactly ONE direct manager** (`parent_role_id`) and sends commands/requests to adjacent edges only. No CEO→VIS-E or cross-team direct orders. All roles can propose helpers, but cannot self-create assistants. The user must still relay appointment to a separate AI chat and receive a real acknowledgment.

| Role | Who appoints | Duties | Acceptance |
| --- | --- | --- | --- |
| CEO | Owner | Once per round defines goals, domain risk and capacity; ONLY role authorized to merge `ant-project/main` | Inspect receipt completeness/immutable SHA, not game code/QA again |
| DCEO-DELIVERY | CEO | Cross-domain coordination, integrator, final release compiler, roster steward owner | **Signs LAST** after all technical deputy signatures; sends single CEO merge request |
| DCEO-SYS | Delivery | Simulation/world/resources, worker AI, combat/pathfinding | Domain QA, `DOMAIN_SIGNED`/`HOLD` |
| DCEO-EXP | Delivery | HUD/UX, renderer, visual art, Thai and mobile accessibility | Domain QA, `DOMAIN_SIGNED`/`HOLD` |
| DCEO-PLAT | Delivery | CI/build/deploy contract, performance/infrastructure | Domain QA, `DOMAIN_SIGNED`/`HOLD` |
| DCEO-QA | Delivery | Independent regression and final browser/gameplay verification, never gameplay coding just to force PASS | `INDEPENDENT_QA_SIGNED` or blocking `QA_HOLD` |
| Department Director | Own domain deputy | Designs teams and integrates/checks their work | `DEPARTMENT_ACCEPTED` |
| Team Lead | Own Director | Appoints and reviews exactly **two core Engineers** per active Team, plus separately authorized helpers | `TEAM_ACCEPTED` |
| Engineer | Own Lead | Writes source within authorized paths, tests, sends PR+evidence | `ENGINEER_DELIVERED` |
| Assistant | Own immediate manager after CEO capacity approval | Narrow assigned help, reviewed by its direct manager | `ASSISTANT_DELIVERED`; no release authority |

Domains are **activated by risk and round**, not mandatory fixed headcount. Delivery and independent QA are mandatory for releases; domain deputies irrelevant to a round may have explicit no-impact handling, not fabricated PASS. One Team Lead normally oversees two core Engineers; Assistants are **not** extra core Engineers. Any role, even an Assistant, may request an Assistant via the staffing chain; no hardcoded finite depth but no automatic grant. CEO approves capacity envelopes; direct parents issue actual appointments within approved slots.

## Who does the real work
Engineer → Lead verifies actual diff/CI → Director integrates and tests → relevant domain deputies each independently verify the **same final release SHA** → Quality deputy independently tests and may HOLD → Delivery verifies all signatures and integrated CI then signs LAST → CEO verifies automated signoff-ready check and releases or returns HOLD to Delivery. CEO does not open/screenshoot game for repeated QA or fix low-level bugs. Signature on a HEAD is immediately stale if candidate SHA changes; no silent waiver of QA HOLD.

## Orders and requests
**No skip-level commands, including emergencies.** Example proper path: CEO→Delivery→DCEO-EXP→VIS-DIR→VIS-TL1→VIS-E2. A direct CEO→VIS-E message is `INVALID_ORDER` and must be rerouted through each parent with a new Task/Issue ACK before implementation. Do not retroactively accept unauthorized work solely because CEO wrote the comment.

Cross-team evidence requests: requester→direct parent (approve if in scope)→...→lowest common ancestor→down recipient branch; response returns along same edges. Merely reading public docs technically requires no approval; directing another AI's reviewer time, private evidence or new write scope **does**. An authorized supervisor may resolve a request at its level; only out-of-authority cases go higher. No automatic CEO involvement.

Staffing: any requester→one parent at a time→Delivery→CEO capacity decision **without DCEO-QA gameplay inspection**→return down chain→direct parent appoints new assistant and gets GitHub `APPOINTMENT_ACK`. No request creates a real new chat; Owner relays short instruction only. Every issued/ACKed appointment becomes a tracked `ORG_DELTA`. Delivery's Roster Steward maintains the graph in the GAME repo, notifying CEO of approved capacity deltas without forcing CEO to appoint individual Engineers.

## Static rules vs implementation
This repo records policy, not real GitHub ACLs. Shared GitHub credentials mean a ROLE_ID comment is an **organizational claim**, not cryptographic proof of distinct AI identities. Add separate GitHub actors/branch protection/required CI for stronger enforcement when supported. Future Release signature verifier must check exact SHA, required roles, links to tested artifacts and unchanged HEAD. This policy alone does **not** install such a verifier or initialize AI chats.

See [routing](REQUEST-ROUTING.md), [staffing](STAFFING.md), [release attestations](RELEASE-SIGNATURES.md), [roster](TEAM-REGISTRY.md) and [Owner zero-click](AUTONOMOUS-QA.md).
