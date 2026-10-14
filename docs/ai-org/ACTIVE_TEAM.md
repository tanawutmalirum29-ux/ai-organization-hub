# Ant Kingdom — Team Map / Current command chain
**Current state: COLONY-NEXT-01 / SIX_ACTUAL_ACKS / DIRECTOR_SETUP_ONLY / IMPLEMENTATION_HOLD.** CEO, DCEO-DELIVERY and all four Domain Deputies have personal ACK evidence in governance Issues #5/#6/#9–#12. Only direct parent → one Director per domain may be appointed next; no Director is yet ACKed or ACTIVE. ROYAL-01 game main remains `7d2458a13154716b09649903d1b26c86c8848845`. No COLONY-NEXT-01 game implementation authorized.

**Registry version:** `GOV-V2-COLONY-NEXT-01-002` (CEO, Delivery and SYS/EXP/PLAT/QA Deputies personally ACKed; next Director appointments unissued)

**ชื่อแชทของทุก Role:** `<ROLE_ID>` จากคำสั่งแต่งตั้งจริง; ดู [Chat Naming](../CHAT-NAMING.md). AI ต้องเสนอชื่อทันทีที่ ACK แต่ไม่มีคำสั่ง Rename ChatGPT โดยตรงใน GitHub Connector.

**เริ่มงาน AI ใหม่:** [คู่มือ Role Start](../ROLE-START-HERE.md) · [ทักษะแต่ละบทบาท](../ROLE-SKILLS-AND-SCOPE.md) · [วิธีส่งต่องาน](../TASK-STATE-AND-HANDOFF.md) · [Owner Relay](../RELAY-TEMPLATES.md). ทุก AI ต้อง ACK เครื่องมือและขอบเขตก่อนรับงานจริง.

**Machine-readable live roster:** [TEAM-REGISTRY.json](TEAM-REGISTRY.json) · [Signed Release Board](RELEASE-SIGNATURES.md) · [Governance V2 charter](../V2-GOVERNANCE.md)

## Approved chain / staffing blueprint (CEO + DELIVERY + FOUR DEPUTIES have verified ACKs; downstream roles are proposals)
```mermaid
flowchart TD
  Owner["Project Owner - goals / relay"] --> CEO["AI CEO - mandate / capacity / main gate"] --> D["DCEO-DELIVERY - final signer"]
  D --> SYS["DCEO-SYS - simulation/combat"]
  D --> EXP["DCEO-EXP - UI/graphics"]
  D --> PLAT["DCEO-PLAT - CI/performance"]
  D --> QA["DCEO-QA - independent QA/HOLD"]
  SYS --> SD["SYS Directors -> Leads -> 2 Engineers"]
  EXP --> ED["EXP Directors -> Leads -> 2 Engineers"]
  PLAT --> PD["PLAT Directors -> Leads -> 2 Engineers"]
  QA --> QD["QA Directors -> Leads -> 2 Engineers"]
```

**Schematic only:** each of the four Director nodes represents a **separate position class in its own domain**, not an individual appointment. Every real Director/Lead/Engineer/Assistant must have exactly one `parent_role_id` in the JSON when appointed. Route instructions **one supervisor/subordinate edge at a time**; cross-team consults go up to nearest common ancestor and back down, not peer-to-peer orders.

**AI ใหม่ได้เพียง Repo URL ยังรู้ Role ไม่ได้:** ผู้จัดการตรงต้องส่ง [Activation Packet](../ACTIVATION-PACKET.md) ที่มี Role ID, Parent และ Issue แต่งตั้ง; Task จริงใช้ [Task Issue Contract](../TASK-ISSUE-CONTRACT.md). โปรดอ่าน [Readiness Drills](../READINESS-DRILLS.md) และตรวจ Tool Access ก่อนเปิดทำงาน.

## Skill/Authority cards — ทุก Role ต้องอ่านก่อน ACK

| Slot | Role Charter | Mandatory Skill Check | Next Recipient หลังงาน |
| --- | --- | --- | --- |
| CEO | [CEO](../../roles/CEO.md) | PR metadata, staffing, Release Gate | Project Owner |
| DCEO-DELIVERY | [Delivery](../../roles/DEPUTY-DELIVERY.md) | Integration/sha/signature | CEO |
| DCEO-SYS | [Domain Deputy](../../roles/DEPUTY-DOMAIN.md) | Simulation & gameplay invariants | DCEO-DELIVERY |
| DCEO-EXP | [Domain Deputy](../../roles/DEPUTY-DOMAIN.md) | HUD/render/mobile/Thai | DCEO-DELIVERY |
| DCEO-PLAT | [Domain Deputy](../../roles/DEPUTY-DOMAIN.md) | CI/build/performance | DCEO-DELIVERY |
| DCEO-QA | [Independent QA](../../roles/DEPUTY-QUALITY.md) | Independent tests/artifacts/HOLD | DCEO-DELIVERY |
| Directors/Leads/Engineers | [Directors](../../roles/DEPARTMENT-DIRECTOR.md) · [Leads](../../roles/TEAM-LEAD.md) · [Engineers](../../roles/ENGINEER.md) | [Skills & Scope](../ROLE-SKILLS-AND-SCOPE.md) | **หัวหน้าตรงในทะเบียนจริง** |
| Assistant/Roster Steward | [Assistant](../../roles/ASSISTANT.md) · [Roster](../../roles/ROSTER-STEWARD.md) | Approved task/organization schema | **ผู้จัดการตรงในทะเบียนจริง** |

**ทุกแชทต้องตรวจ GitHub Tool/CI/Skill ที่ใช้ได้จริงด้วยตัวเอง, โพสต์ APPOINTMENT_ACK, และใช้ [ข้อความส่งต่องาน](../RELAY-TEMPLATES.md).** รายการนี้เป็นสัญญา Skill ของตำแหน่ง **ไม่ใช่หลักฐานว่าบุคคลใหม่ได้รับงานหรือเครื่องมือแล้ว**. หลังงานจบ ถ้าไม่มีคำสั่งใหม่ → STANDBY.

## Actual appointments — recipient ACKs verified from GitHub
| Role ID | Immediate parent | Actual ACK | Current organizational authority |
| --- | --- | --- | --- |
| `CEO` | Project Owner (`null` root) | [#5](https://github.com/tanawutmalirum29-ux/appointment-CEO/issues/5#issuecomment-6157635338) | `ACTIVE / STRATEGY_ONLY` |
| `DCEO-DELIVERY` | `CEO` | [#6](https://github.com/tanawutmalirum29-ux/appointment-CEO/issues/6#issuecomment-6157936418), [CEO acceptance](https://github.com/tanawutmalirum29-ux/appointment-CEO/issues/6#issuecomment-6157968920) | `ACTIVE / ORG_SETUP_ONLY` |
| `DCEO-SYS` | `DCEO-DELIVERY` | [#9](https://github.com/tanawutmalirum29-ux/appointment-CEO/issues/9#issuecomment-6158081984) | `ACTIVE / DIRECTOR_APPOINTMENT_ONLY / IMPLEMENTATION_HOLD` |
| `DCEO-EXP` | `DCEO-DELIVERY` | [#10](https://github.com/tanawutmalirum29-ux/appointment-CEO/issues/10#issuecomment-6158081848) | `ACTIVE / DIRECTOR_APPOINTMENT_ONLY / IMPLEMENTATION_HOLD` |
| `DCEO-PLAT` | `DCEO-DELIVERY` | [#11](https://github.com/tanawutmalirum29-ux/appointment-CEO/issues/11#issuecomment-6158090772) | `ACTIVE / DIRECTOR_APPOINTMENT_ONLY / IMPLEMENTATION_HOLD` |
| `DCEO-QA` | `DCEO-DELIVERY` | [#12](https://github.com/tanawutmalirum29-ux/appointment-CEO/issues/12#issuecomment-6158094709) | `ACTIVE / DIRECTOR_APPOINTMENT_ONLY / IMPLEMENTATION_HOLD` |

**Staffing budget:** `CAP-COLONY-NEXT-01-22` permits at most **22 distinct role chats** (CEO 1 + Delivery 1 + Deputies 4 + Directors 4 + Leads 4 + Core Engineers 8). Exactly **6 real personal ACKs** recorded above. Exactly **16 downstream slots remain unappointed**, consisting of four Directors, four Leads and eight Engineers. No extra Assistant/Steward chat approved.

**Next one-hop staffing:** `DCEO-SYS → one SYS Director`, `DCEO-EXP → one EXP Director`, `DCEO-PLAT → one PLAT Director`, `DCEO-QA → one QA Director` **only** after Delivery's accepted ACK directive and registry reconciliation. Each Deputy creates the Director's separate personal Issue + ready Owner relay. Owner relays each to a separate receiving chat; its real ACK must be validated and roster synchronized before the Director appoints its own Lead. No Deputy can appoint a Lead or Engineer, no role can claim a chat is active merely because an Issue exists.

**State and release limits:** `role_slots[].slot_status=TEMPLATE_ONLY_NOT_APPOINTED` remains the original slot blueprint by structural-CI contract; actual roles are in `appointments[]`. `pending_appointment_issues[]` is currently empty because all four issued Deputy roles have real ACK. No product Task, code, Browser QA, Source CI, signature, cleanup, Release or `ant-project/main` mutation from this organizational update; `SIGNATURE_READY=NOT_IMPLEMENTED`, `IMPLEMENTATION_HOLD` and `RELEASE_HOLD`.

## Rules for the Roster Steward
1. Owner/CEO approves governance and round staffing envelope. CEO appoints Delivery; Delivery appoints domain Deputies; Deputies appoint Directors; Directors appoint Leads; Leads appoint two core Engineers. Helper only after permitted capacity.
2. Real chat receives appointment via Owner's short relay and posts `APPOINTMENT_ACK` with Issue permalink. Only then add a row with `ACTIVE`. A proposed role slot is NOT an activated person.
3. Every direct parent reports `ORG_DELTA` **up one edge**; the Delivery-appointed steward edits both this page and `TEAM-REGISTRY.json` together; inspect unique IDs, parent links, cycles, scope ownership and current Task Issues before saving. Show the **registry_version**, actual changed roles and signed update URL.
4. Every signed candidate SHA belongs on separate [Release Signature Board](RELEASE-SIGNATURES.md); a roster row is not a release signature. Signatures are invalid if release HEAD changes.
5. For rapid roster maintenance, Delivery may propose a separate `org/registry` branch **in appointment-CEO**, linked from this repository's `main`. Do not treat it as the live source until explicitly adopted; do not write organizational records into `ant-project/main`. All game-development source, Issues/PR and CI continue in `ant-project`.
