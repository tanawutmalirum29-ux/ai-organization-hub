# Migration to Governance V2 — activation checklist (POLICY ADOPTED; NO ACTIVE APPOINTMENTS)
This page is a handoff for the new AI CEO and Delivery deputy when Owner authorizes changing the org. **Nothing here reopens ROYAL-01 or assigns gameplay work. The canonical governance/appointments/roster/signature board are all in `appointment-CEO/main`; the game repo is for code, tasks, PR and test evidence only.**

## เงื่อนไขก่อนปล่อย Role ใหม่

**เจ้าของโครงการไม่ต้องเลือก Role/แต่ง Issue เอง.** หัวหน้าที่แต่งตั้งต้องกรอก [Activation Packet](../ACTIVATION-PACKET.md) จริงก่อนส่งข้อความ Owner และสร้าง [Task Issue](../TASK-ISSUE-CONTRACT.md) แยกหลัง ACK. ทดสอบด้วย [Readiness Drills](../READINESS-DRILLS.md); ห้ามสมมติว่าแชทปลายทางมีสกิลหรืออ่านกฎโดยอัตโนมัติ. ประวัติ ROYAL-01 ไม่ใช่การแต่งตั้ง V2.

## Adopt a single charter
**Before any actual appointment:** send the AI [Role Start](../ROLE-START-HERE.md), [Skills](../ROLE-SKILLS-AND-SCOPE.md), [After Task](../TASK-STATE-AND-HANDOFF.md) and [3-line Relay](../RELAY-TEMPLATES.md). It must post SKILL_READY or SKILL_GAP and real ACK; after every task the AI writes the next adjacent-hop message. No automatic inter-chat delivery.
1. Confirm that [Governance V2 charter](../V2-GOVERNANCE.md), [Team Chart](ACTIVE_TEAM.md), [Registry](TEAM-REGISTRY.json), [Release Signatures](RELEASE-SIGNATURES.md) and appointment templates are present in **appointment-CEO/main**. Legacy fixed 17-AI files in `ant-project` are archival and not a live command chain.
2. CEO defines only required domains/deputy counts and budget per Round; appoints Delivery via its individual template. Delivery appoints domain deputies inside slots; each successive supervisor appoints its own direct reports; never CEO→VIS-E.
3. Delivery and its roster steward initialize `TEAM-REGISTRY.json` only with **real chat ACKs**. Each appointment: Role ID, parent, Issue, scope, budget slot, ACK permalink, status. Issue alone ≠ spawned AI. Publish updated `ACTIVE_TEAM.md` tree.
4. Configure automatic CI: fast change-level smoke, full integrated risk-appropriate QA, then separately automated Release-signature structure verifier. **No Owner GitHub clicks**.
5. For every feature/task request, route one edge per message. For cross-team work requests, go up to the common ancestor and down. For all-level Assistant requests, go up to CEO staffing/capacity decision **without DCEO-QA gameplay inspection**, then authorize direct-parent appointment.
6. Domain deputies sign actual candidate SHA after personal QA, independent QA may HOLD; Delivery signs **last**, CEO only checks receipt/ready status and merges main. The same 40-character SHA must appear in final required signatures.
7. If final PR has no required verifier/QA controls installed, label `GATE_NOT_CONFIGURED` and keep hold; do not claim green based solely on a Markdown signature list. Source/CI checks and Issue signoff remain required until automation is installed.

Do not change `ant-project/main` to activate a governance policy; no V2 staff are ACTIVE until actual Owner/CEO transition and GitHub ACKs. This charter being merged into governance `main` does not start a gameplay round.
