# All-level Assistant/AI staffing — request, approval and actual activation

**Anyone, including lowest-level Engineer or Assistant, may ASK for a helper.** ASK ≠ role creation. No recursive auto-spawning.

1. Requester creates `STAFFING_REQUEST` GitHub comment/Issue with: requester role ID, parent role, Round, new proposed Assistant ID/type, measurable task/risk, time/oversight cost, authorized files, count, expiry, no collision evidence, link to CEO-approved capacity slot (if any).
2. Sends it **only to immediate manager**. Manager decides if request is inside preapproved staffing envelope, otherwise forwards it to own manager, unchanged Request ID. Repeat through DCEO-DELIVERY → CEO.
3. **Staffing is an organizational approval, not code/game QA.** Do NOT send a staffing request to DCEO-QA for gameplay inspection; it travels via its existing line and the Delivery operations channel to CEO. CEO approves `CAPACITY_APPROVED`, `DENIED` or `REVISION_REQUIRED` and may alter overall staffing budget without inspecting game.
4. CEO's decision returns **one hop down** along the requester's chain. The **immediate parent of the new helper**, not CEO, issues `APPOINTMENT_ISSUED` for this specific subordinate in a named GitHub Issue and short Owner-relayed chat instruction.
5. The human Owner opens/uses a distinct AI conversation and relays. Only after `APPOINTMENT_ACK` verified by direct parent and registry steward may role be `ACTIVE`. No tool in this repository can autonomously create a ChatGPT agent/chat from GitHub.
6. The direct manager remains accountable for helper output/QA. A helper may itself request a helper by same process, with a new capacity check. Assistant does not count as one of Lead's two **core Engineer** positions and cannot merge `main`.
7. Direct supervisors may appoint people within existing **CEO-preapproved slots** without repeated CEO decisions. Every real appointment/retirement/status shift is an `ORG_DELTA` up adjacent chain to Delivery roster steward, then a roster update and summarized CEO notification.

**Roster must include** unique role ID, parent role, appointment authority, approval/Issue URL, actual ACK permalink, task scope, active status, capacity and history; do not claim Active when a chat has not acknowledged. No unlimited staff by default; CEO sets concurrency/round slots and may approve exceptions.
