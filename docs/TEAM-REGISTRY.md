# Central AI Team Registry — appointment-CEO (authoritative)

**Latest operational rule:** [Fast Lane](FAST-LANE-GOVERNANCE.md). One Issue + one ACK, batched registry updates, direct relevant technical/urgent requests across teams. The JSON `ACTIVE` claim must remain backed by actual ACK permalink; operational ACK verification may precede a batch merge. The registry is an authoritative **persisted snapshot**, not a per-person onboarding approval gate.

**Organizational records, appointments, charter and release-signature dashboard are owned by THIS repository (`appointment-CEO`), not the game repository.** `ant-project` remains the source of truth for game code, work Issues/PRs, CI runs and concrete release evidence.

## Canonical files on main
- [Team Registry JSON](ai-org/TEAM-REGISTRY.json) — machine-readable current slots, actual appointments, parent roles and statuses
- [Active Team Chart](ai-org/ACTIVE_TEAM.md) — visible hierarchy and responsibilities, status `ACTIVE/STANDBY/PENDING_ACK`
- [Release Signature Board](ai-org/RELEASE-SIGNATURES.md) — signers and same-SHA completion state (not equivalent to an implemented signature verifier)
- [Activation and Handoff](ai-org/GOVERNANCE-V2-HANDOFF.md) — role transition and actual chat ACK
- [Roster Validator](../tools/check-ai-org.mjs) and [automatic CI](../.github/workflows/org-registry-verify.yml) — validate unique role IDs, parent graph, ACK fields, status and dashboard consistency; **not** independent AI identity/authentication

Each real `appointments[]` entry has unique `role_id`, a single `parent_role_id` (CEO root alone is null), appointing role, approved staffing slot, appointment GitHub Issue, real `APPOINTMENT_ACK` comment URL, task scope/responsibility, owned paths, `ACTIVE/STANDBY` or pending status. No orphan role, duplicate, false acknowledgement or parent cycle. `role_slots[]` are a **template**, not automatically active ChatGPT chats.

## Synchronization protocol (no CEO overload)
1. CEO authorizes round capacity and directly appoints Delivery. Each supervising role appoints only its own immediate reports within the approved limit.
2. Each actual new AI chat must receive the Owner's short relay and post GitHub `APPOINTMENT_ACK` to be `ACTIVE`.
3. Appointing manager records actual Issue + ACK **directly to Delivery/Roster Steward on the existing governance Issue**. Steward batches updates to JSON and visible chart, verifies actual ACKs/unique parent/capacity and logs one versioned PR for the appointment wave. **No registry-sync PR is needed between preapproved consecutive appointments.**
4. Normal roster updates may use an approved separate branch/PR within **appointment-CEO**. The authoritative snapshot is on **appointment-CEO/main** after merge; if an interim `org/registry` branch is approved, link its version clearly as *pending*. Do not require merging a game source PR to update organizational metadata.
5. CEO receives summarized staffing deltas and decisions outside capacity; it does **not** directly issue every Engineer appointment. The roster is not the Release QA receipt.

## Limitations
Shared GitHub credentials cannot uniquely authenticate separate AI chats. The V2 roster structural CI is included, but a true automated final `SIGNATURE_READY` verifier, permissions and branch rules are separate future release gate work; do not claim those exist merely because a sample signature board is present. Historical 17-chat rules in `ant-project/docs/ai-org` remain archival, and old completed task closures do not cancel past AI titles.
