# Governance V2 — current readiness, not historic template status

**Fast Lane:** [policy](FAST-LANE-GOVERNANCE.md). Always read the [live Registry](ai-org/TEAM-REGISTRY.json) and each actual appointment Issue/ACK; do not infer current staffing from an archived onboarding check.

| Gate | How to check |
| --- | --- |
| Person really exists | Owner relayed appointment to distinct AI chat; real `APPOINTMENT_ACK` comment appears on its individual Issue |
| Manager can appoint next child | Verified actual ACK + approved capacity slot; **no per-level `REGISTRY_SYNCED` unlock** |
| Registry accuracy | Delivery/Roster Steward batch merges verified issue/ACK evidence; never marks unacknowledged person ACTIVE; checks parent/cycles and duplicate Role ID |
| Direct technical contact | Relevant active recipient + real Issue/PR, no admin hop; read-only consultation/review can start immediately |
| Scoped cross-team code | Owning Lead/Director/Domain delegate approves newly requested write paths; retain CI + PR reviewer |
| Urgent incident | Real severity/reproducer and affected responder; immediate in-scope mitigation, direct manager/Delivery FYI when scope/release affected |
| Gameplay implementation | Explicit authorized `TASK_ASSIGNED` / permitted paths; `IMPLEMENTATION_HOLD` continues until lifted |
| Release | Full immutable candidate SHA, required domain/independent QA signatures, Delivery LAST, CEO-only merge, actually configured automated Release verifier |
| Owner burden | Define goals and forward AI-written short messages only; no manual GitHub, Actions, tests or artifacts |

**Verified at policy-drafting checkpoint:** live COLONY-NEXT-01 registry had **10 ACTIVE roles** (CEO, Delivery, 4 deputies, 4 Directors). Four Lead appointment Issues #21–#24 were issued and marked PENDING_ACK at that time; each requires its own actual ACK. **These counts are not live monitors** — always refresh current Issues and JSON. The round remained `ORG_SETUP_IMPLEMENTATION_HOLD`.

**Not verified by this policy:** final Release signature automated gate, actual chat-specific tool availability, readiness of any still-unacknowledged new AI, new Gameplay Implementation. No CI badge on governance can prove those.
