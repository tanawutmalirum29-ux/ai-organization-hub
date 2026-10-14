# Fast appointment packet — one Issue, one ACK

**HARD STOP / OWNER LATEST POLICY:** [Global 10-AI cap](TEAM-CAPACITY-AND-MANAGEMENT-CONTRIBUTORS.md) applies to the ENTIRE organization, NOT per team, no huge-project exception. **STAFFING_FREEZE** until CEO/Delivery resolves ten registered ACTIVE roles and four real unregistered Lead ACKs (#21–#24). This packet **does not** authorize new AI conversations, appointments or helpers even if old 22 slots were approved.

**Latest rule:** [FAST-LANE-GOVERNANCE](FAST-LANE-GOVERNANCE.md). Appointment is separate from a new Gameplay Task. `suggested_chat_title = <ROLE_ID>` per [Chat Naming](CHAT-NAMING.md), never `ANT | ...`.

## Manager: one Issue, no intermediate unlock chain

**ONLY when GLOBAL STAFFING FREEZE has been lifted and a real global seat is free:** Create **one individual Issue in `appointment-CEO`** containing only required identity and authority:
```text
role_id: <unique ID>                 parent_role_id: <actual manager>
approved_capacity_slot: <real slot/CEO mandate>
domain_and_scope: <purpose and prohibited code paths>
charter: <role charter link>         round: <round or STANDBY>
suggested_chat_title: <role_id>
status: PENDING_ACK
```
Use the Issue itself as the approval and ACK location. One direct manager confirms the slot; **no second approval Issue, no additional ancestor signoff, no forced per-person registry PR**. Managers may prepare multiple children in the allocated slots simultaneously.

Manager gives Owner a ready-to-forward **three-line** message:
```text
<ROUND> <PARENT> → <NEW-ROLE-ID> | APPOINTMENT_ISSUED / PENDING_ACK
GitHub appointment: <real Issue URL>
Next recipient: <NEW-ROLE-ID> | อ่านใบแต่งตั้ง/Role Charter ตรวจเครื่องมือ ลง APPOINTMENT_ACK แล้วแจ้งผู้แต่งตั้ง
```

## New AI: one ACK in that same Issue

Read Issue, [Role Start](ROLE-START-HERE.md), [Role Skills](ROLE-SKILLS-AND-SCOPE.md) and the applicable Role Charter. Propose chat name `<ROLE_ID>` in first reply. Check GitHub tools actually available. Post **one** `APPOINTMENT_ACK` with `role_id`, `parent_role_id`, `SKILL_READY / SKILL_GAP`, real tool availability and any limits, plus `suggested_chat_title`. Return the true comment permalink and next recipient (normally appointing manager). No fake ACK if GitHub writing fails.

After that manager verifies real Issue/ACK and capacity, the new chat may perform **authorized existing tasks** and appoint its own preapproved subordinates **while the batch roster update is pending**. Roster Steward/Delivery batches JSON updates; **only write ACTIVE into JSON after real ACK**. The final release checks the latest synced roster. A recipient with no Issue/Role ID returns `NEEDS_APPOINTMENT`. No approval to bypass a current `IMPLEMENTATION_HOLD`.
