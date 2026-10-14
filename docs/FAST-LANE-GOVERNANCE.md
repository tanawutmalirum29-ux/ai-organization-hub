# Governance V2 Fast Lane — simple appointments and direct work coordination

**Latest Owner staffing rule:** [Adaptive team capacity](TEAM-CAPACITY-AND-MANAGEMENT-CONTRIBUTORS.md) supersedes old references to fixed pairs of core Engineers. Every active working team is **at most 10 actual contributors including its Lead and managers when hands-on**, with a task-dependent count. Manager AI may execute scoped technical work but may not self-review or substitute for independent QA. Separate teams are allowed for larger projects; do not treat a 22-slot organizational envelope as one team.

**OWNER POLICY, effective after this document is merged into `appointment-CEO/main`.** This page OVERRIDES older rules that require adjacent-hop relays for every inquiry or an individual registry-merge approval between appointments. It does not reopen work or bypass scope, CI, independent QA, release signatures or the CEO-only `ant-project/main` merge.

## 1. Fast appointment: ONE Issue, ONE real ACK, batch registry sync

1. An **authorized appointing manager** (the new role's direct parent) creates **one individual GitHub Appointment Issue** in `appointment-CEO`: `role_id`, `parent_role_id`, charter or domain, approved slot/round, permissions/scope, and `suggested_chat_title: <role_id>`. The Issue doubles as the receipt and single source for the appointment. Do not create a second acceptance Issue or ask each ancestor to reapprove the already allocated slot.
2. Owner only relays the manager's prepared **three-line message** to the new ChatGPT conversation. The receiving AI reads the Issue, checks actual access/skills and posts **one `APPOINTMENT_ACK` comment** with `role_id`, `parent_role_id`, `SKILL_READY / SKILL_GAP` and tool limitations. If the Issue already includes the actual person's scope, no repeated onboarding form is needed.
3. After the direct manager verifies the actual ACK and approved staffing slot, this role is **ACK_VERIFIED / OPERATIONALLY_ACTIVE** in GitHub evidence; it may perform authorized work or appoint its own allocated subordinates **immediately**, even while the shared JSON roster update is pending. **No separate `REGISTRY_SYNCED` unlock message or repeated upstream authorization for each depth.** Roster Steward/Delivery records the new roles in a **batched PR**, such as after a wave of appointments, and resolves any duplicates/conflicts before release. **Do not mark `ACTIVE` in JSON without a verified ACK.**
4. If Role ID is duplicate, proposed parent unauthorized, capacity unapproved, Issue/ACK absent or tools unavailable for the proposed task: mark `PENDING_ACK / STAFFING_BLOCKED / CAPABILITY_BLOCKED` appropriately. Do not use a chat title or AI's statement as proof of ACK. Unconfirmed recipients cannot be assumed to exist or be instructed.
5. Existing real ACKs/Issue URLs **remain valid**. Adopting this policy does not ask already appointed people to ACK again, cancel old work, or grant new capacity. For teams needing multiple Engineers, an authorized Lead may issue the genuinely needed appointment Issues in parallel when slots are already approved; zero or one Engineer is valid for small work, and the working-team cap includes hands-on managers. An ACK verifies that person; it does not start unassigned gameplay work.

## 2. Direct contact allowed — distinguish request from code authority

**Every AI still has ONE accountable direct manager, but can communicate with another already appointed role directly when there is a real technical reason.** No fixed number of hops, no common-ancestor relay for the cases below. Owner still copy/pastes between chats; GitHub comments alone never notify another ChatGPT conversation.

| Kind | Direct recipient | May start immediately | Required evidence / authority |
| --- | --- | --- | --- |
| `TECH_CONSULT` / `INFO_REQUEST` | Any relevant active specialist, Lead, Director or Deputy | Yes: read, diagnose, explain, exchange existing evidence | Existing Issue/PR permalink + concrete question; no new Issue, special approval or chain; notify own manager only if work priority changes |
| `CROSS_TEAM_REVIEW` | Actual owner of affected files/tests / QA specialist | Yes: review and advice | Link evidence, scope, affected component, expected output. For substantial review time, recipient informs own manager |
| `DIRECT_SCOPED_TASK` | Relevant active implementer, including cross-team/skip-level | Only if **existing approved Task scope/path** covers it AND its owning manager/Domain delegate confirms the assignee on the same Issue | Named owner, allowlist, priority, PR target, acceptance tests, reviewer and GitHub receipt; **request is not a new permission** |
| `URGENT_INCIDENT` | Any directly relevant active responder at any level | Immediate diagnostics and containment **within existing authority**; out-of-scope writes wait for owning authority's expedited approval | Real blocker/outage/regression/security/data-loss risk, Issue link, severity, exact impacted path, next checkpoint; ping affected manager + Delivery as FYI |
| `STAFFING_REQUEST` | Direct manager, or **CEO directly** if additional capacity is needed | No new AI before budget approval and real ACK | Brief reason + count + current slot + affected manager FYI; CEO decides capacity once, appointed manager activates person |

Examples: `SYS-E1 → PLAT-E1` directly asks about failing Actions and a CI link; `QA-E1 → SYS-E2` directly provides exact reproducible bug evidence; `DCEO-QA → relevant Engineer` can immediately alert about `QA_HOLD` while Delivery retains release control. `CEO → SYS-E1` may directly notify a reproducible urgent blocker or request a fix **inside an already approved Task**; it cannot silently expand Engineer ownership.

## 3. Five guardrails that may NEVER be bypassed

1. **Authority for new code scope:** the actual component/file owner (typically assignee's Team Lead/Director or authorized Domain delegate) must explicitly approve new paths, API/interface modifications, conflicting work, or branch targets. A direct chat request is **not** a grant to edit or merge.
2. **Release:** independent DCEO-QA can HOLD, relevant domain signatures must match the same immutable 40-char candidate SHA, **DCEO-DELIVERY signs LAST**, only the **CEO merges `ant-project/main`**, and absence of the automated final signoff verifier remains `GATE_NOT_CONFIGURED / RELEASE_HOLD` under current release policy. No urgency exception.
3. **No fictional tooling:** `SKILL_READY` is a self-assessment, not a new tool. Do not claim CI/Browser/Deploy/PASS without evidence. No technical tasks are offloaded onto Owner.
4. **Traceable handoff:** one live GitHub Task/Incident/PR link is sufficient for an entire consultation thread; record `from_role → to_role | request_type | why this recipient | scope | decision/action | permalink`. Recipient replies/acknowledges directly, copies affected owner on the existing issue when significant. **No new multi-hop Issue chain**.
5. **No silent reassignment:** one accountable manager for each AI, one explicit owner per writable path/task, and no unauthorized extra Engineer/Assistant slots. For cross-team code execution, record the accepting owner and reviewing manager in the Task; unresolved ownership collision = HOLD.

## 4. Owner relay (still at most three lines)

```text
<ROUND> <ROLE_ID> → <RELEVANT_ROLE_ID> | TECH_CONSULT / CROSS_TEAM_REVIEW / URGENT_INCIDENT / APPOINTMENT_ISSUED
GitHub: <real task or appointment Issue / PR permalink>
Next recipient: <RELEVANT_ROLE_ID> | <one concrete question or authorized action, reason/urgency>
```

**No user relays required** for informational messages that can remain within one existing ChatGPT conversation. When two chats must coordinate, source AI writes the complete short message with actual next recipient and permanent GitHub reference; Owner only forwards it. Do not multiply handoffs to make the chart appear followed.

## 5. Migration of the existing COLONY-NEXT-01 team

Keep all currently recorded real appointments, parents and ACKs intact. Pending Lead Issues remain `PENDING_ACK` until each Lead responds. Once a Lead's manager verifies its first real ACK and staffing allocation, the Lead can appoint its two allocated Engineers **without waiting for a separate roster sync or another upstream relayed unlock**. Roster Steward/Delivery batch-updates `docs/ai-org/TEAM-REGISTRY.json` and `ACTIVE_TEAM.md` from those verifiable Issues. **No new gameplay Implementation authority is created by merging this policy**: preserve any current `IMPLEMENTATION_HOLD` until separately lifted by the Round's authorized work owner and release gates.

**Historical policy:** prior no-skip and per-hop staffing rules are superseded by this document only for communication, approved appointment waves and cross-team coordination. Strict release and per-file implementation authority remain unchanged.
