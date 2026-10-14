# Lean staffing — allocate once, appoint within capacity

**Current rule:** [FAST-LANE-GOVERNANCE](FAST-LANE-GOVERNANCE.md). Any AI may ask for another helper, but a request never opens a new ChatGPT conversation or creates an approved slot by itself.

- **Inside CEO-approved capacity:** the relevant direct manager may immediately issue the individual Appointment Issues for its allocated Leads, **two core Engineers per Lead**, or separately budgeted Assistants. Both core Engineers may be appointed in parallel. Each person needs one real ACK; managers do **not** await per-level registry sync or repeated CEO reauthorization.
- **New capacity outside the envelope:** requester may send `STAFFING_REQUEST` **directly to CEO** on an existing task or one staffing Issue, with need, count, manager, budget/impact and relevant scope. Copy the affected direct manager and Delivery in that GitHub thread. CEO gives **one** `CAPACITY_APPROVED / DENIED / REVISION_REQUIRED` decision; the actual direct manager issues the appointment.
- **After appointment:** Owner forwards prepared recipient-specific message; recipient reads Charter/tools and posts real ACK. Verified issue receipts grant operational role within slot, with Delivery/Roster Steward synchronizing the JSON roster in batches. No silent ACTIVE without real ACK, no automatic assistants, no quota exception without CEO decision.
- **Independent QA is not a staffing approver.** Additional people do not bypass code ownership, scope approval, QA or release gate. Existing appointments and capacity remain unchanged under the new policy.

Each `STAFFING_REQUEST` may fit one comment: `role requesting | desired helper ID/type and count | why | supervisor | capacity source or extra capacity requested | evidence URL`. No serial relay through every ancestor merely to obtain a budget decision.
