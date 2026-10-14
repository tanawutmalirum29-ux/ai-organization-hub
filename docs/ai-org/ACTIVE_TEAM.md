# Ant Kingdom — Live AI Organization / CEO Succession

**Registry version:** `GOV-V2-COLONY-NEXT-01-007`  
**Status:** `9 ACK-BACKED ACTIVE + 1 CEO PENDING_ACK` / `GLOBAL MAX 10` / `IMPLEMENTATION_HOLD` / `RELEASE_HOLD`  
**Single source of organizational role state:** [TEAM-REGISTRY.json](TEAM-REGISTRY.json)  
**Owner new CEO instruction:** [CEO succession Issue #28](https://github.com/tanawutmalirum29-ux/appointment-CEO/issues/28)  
**Game mission (previously planned, not implemented):** [ant-project Master Issue #93](https://github.com/tanawutmalirum29-ux/ant-project/issues/93)  
**Rules:** [Global ten-AI cap](../TEAM-CAPACITY-AND-MANAGEMENT-CONTRIBUTORS.md), [FAST-LANE-GOVERNANCE](../FAST-LANE-GOVERNANCE.md), [Role Start](../ROLE-START-HERE.md), [Chat Naming](../CHAT-NAMING.md), [Release Signatures](../RELEASE-SIGNATURES.md).

**No new AI role is automatically created in ChatGPT by GitHub.** The new CEO role is only `PENDING_ACK` until the receiving chat posts its own verified ACK on Issue #28. The old CEO's role was retired with a separate governance receipt; the four formerly acknowledged but unregistered Leads were retired with their ACK history preserved. Their actual ChatGPT conversations remain visible unless the Owner stops using them; GitHub writes cannot close chats.

## Global headcount — one organization, hard maximum TEN

| Role ID / suggested chat name | Status | Personal Issue | Actual scope |
| --- | --- | --- | --- |
| `CEO` (replacement `CEO-V2-20261014-02`) | **PENDING_ACK — reserved seat #10, no merge/staffing authority yet** | [#28](https://github.com/tanawutmalirum29-ux/appointment-CEO/issues/28) | Owner strategy, Round approval after gates, sole `ant-project/main` merge |
| `DCEO-DELIVERY` | ACTIVE / verified | [#6](https://github.com/tanawutmalirum29-ux/appointment-CEO/issues/6) | Integration, cross-domain coordination, QA receipts, sign LAST |
| `DCEO-SYS` | ACTIVE / verified | [#9](https://github.com/tanawutmalirum29-ux/appointment-CEO/issues/9) | Simulation, persistence, task AI |
| `DCEO-EXP` | ACTIVE / verified | [#10](https://github.com/tanawutmalirum29-ux/appointment-CEO/issues/10) | Save/UI, UX and controls |
| `DCEO-PLAT` | ACTIVE / verified | [#11](https://github.com/tanawutmalirum29-ux/appointment-CEO/issues/11) | Automated CI, signatures, branch cleanup |
| `DCEO-QA` | ACTIVE / verified | [#12](https://github.com/tanawutmalirum29-ux/appointment-CEO/issues/12) | Independent quality gate / QA_HOLD |
| `SYS-DIR1` | ACTIVE / verified | [#16](https://github.com/tanawutmalirum29-ux/appointment-CEO/issues/16) | Scoped implementation and SYS review |
| `EXP-DIR` | ACTIVE / verified | [#18](https://github.com/tanawutmalirum29-ux/appointment-CEO/issues/18) | Scoped UI implementation and review |
| `PLAT-DIR` | ACTIVE / verified | [#17](https://github.com/tanawutmalirum29-ux/appointment-CEO/issues/17) | Scoped Platform implementation and review |
| `QA-DIR` | ACTIVE / verified | [#19](https://github.com/tanawutmalirum29-ux/appointment-CEO/issues/19) | Independent regression/testing implementation, separate QA evaluation |

**Exactly nine other operational seats remain**; when new CEO ACK is validated, total becomes ten. `PENDING_ACK` does NOT mean the new CEO has actually accepted or acquired tools. No Team Lead, Engineer, Assistant, Steward, replacement Deputy, duplicate CEO or secret parallel specialist can be newly appointed. The earlier 22-slot envelope is superseded, not additional capacity.

## Archived (no operational authority; historical ACK retained)

| Former role | Evidence | Archive reason |
| --- | --- | --- |
| former `CEO-V2-20261014-01` | [Issue #5 retirement](https://github.com/tanawutmalirum29-ux/appointment-CEO/issues/5#issuecomment-6159595827) | Owner requested replacement CEO, sole CEO seat transfers to successor pending ACK |
| `SYS-TL1` | [#21 retired](https://github.com/tanawutmalirum29-ux/appointment-CEO/issues/21#issuecomment-6159584526) | Replaced proposed Leader layer with hands-on existing SYS management |
| `EXP-TL1` | [#22 retired](https://github.com/tanawutmalirum29-ux/appointment-CEO/issues/22#issuecomment-6159586456) | Existing EXP management does work |
| `PLAT-TL1` | [#23 retired](https://github.com/tanawutmalirum29-ux/appointment-CEO/issues/23#issuecomment-6159588353) | Existing PLAT management does work |
| `QA-TL1` | [#24 retired](https://github.com/tanawutmalirum29-ux/appointment-CEO/issues/24#issuecomment-6159590181) | Existing QA management does work |

Old chats cannot be deleted or disabled using the GitHub Connector; if opened they should read their RETIRED receipts and avoid continuing tasks. This records **organizational authority**, not a claim that ChatGPT history has been erased.

## Work flow and project status

- **SAVE/LOAD (P0)**: `DCEO-SYS + SYS-DIR1` code with independent reviewer; `DCEO-EXP + EXP-DIR` compact UI.
- **SMARTER ANT AI (P1)**: `DCEO-SYS + SYS-DIR1`, coordinated with existing EXP roles.
- **PLATFORM & RELEASE (P1)**: `DCEO-PLAT + PLAT-DIR` CI, frozen-SHA signing gate and safe branch cleanup automation.
- **INDEPENDENT QA (binding gate)**: `DCEO-QA + QA-DIR`; production implementers do NOT certify their own release changes.
- **DCEO-DELIVERY** coordinates contracts, exclusive shared-source changes, domain handoffs and final signature. CEO decides final merge after current gate actually exists and passes.
- **No gameplay Implementation yet**; Owner's new mission authorizes planning, then CEO/Delivery must record explicit Task-level implementation release after scope/CI/QA-readiness checks, never by bare appointment.

**Communications:** Fast Lane allows direct technically relevant cross-team or genuine urgent requests using real Task/Issue links; scope-changing code still requires owning authority. Owner only forwards prepared AI-to-AI three-line messages when contacting another ChatGPT conversation. **Suggested chat name is simply exact `ROLE_ID`**, without `ANT |` prefix.
