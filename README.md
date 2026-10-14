# AI Organization Charter — reusable policy main (V4)

> **`main` = immutable organizational rule/template baseline for CEO generations.**
> No live team roster, mission workspace, relay ledger, game code or task backlog belongs on `main`. Every new CEO generation uses its **own temporary `round/<round-slug>` branch**. This Owner-authorized policy revision is the only purpose of the current governance change.

## Repository boundaries / authority

- **Governance:** [appointment-CEO](https://github.com/tanawutmalirum29-ux/appointment-CEO). `main` contains stable rules, role descriptions, relay templates and validation only. **CEO, DIR, TL and Engineer MUST NOT commit, merge, force-push, delete or open a PR targeting governance `main`**. Only the Owner's specifically designated governance editor may update it on explicit Owner instruction. Do not touch other generations' round branches.
- **Per-round organization:** one branch `round/<round-slug>` in appointment-CEO, created from the current governance `main` by the **newly appointed CEO**. Only this branch stores `workspace/round.json`, `workspace/roster.json`, and numbered `workspace/messages/000001.json`, etc. A branch may only be used by its own generation. No round-to-main merge, ever.
- **Actual game:** [ant-project](https://github.com/tanawutmalirum29-ux/ant-project). Game code, QA, game issues/PRs and integration branches are managed **in the game repo only**, after an explicit NEW Owner mission. No automatic resurrection of cancelled work.
- These restrictions are governance instructions, not GitHub account isolation. GitHub protection/permissions must be configured by the Owner separately to technically prevent unauthorized writes.

## Organization and scalable staffing

`OWNER → CEO → DIR-A/B/... → TL-A1/A2/... → E-A1-1/E-A1-2/E-A1-3/...`. Four levels: CEO, DIR, TL and Engineer. **There is no global maximum number of AI chats**. Staff roles only when Owner-approved work needs them.

- A Director has at most **two** Team Leads: `DIR-A → TL-A1, TL-A2`.
- A TL may appoint up to **three** Engineers: `TL-A1 → E-A1-1, E-A1-2, E-A1-3`.
- **Four Engineers must be split between two TLs** under that DIR: **2+2 or 3+1**, never `E-A1-4`. Example: `TL-A1` owns three and `TL-A2` owns `E-A2-1`.
- Multiple departments are allowed as workload requires; naming can extend past A-Z (`DIR-AA`, `TL-AA1`, `E-AA1-3`). No global headcount limit; each per-role bound and unique appointment still applies.

**NEW CEO = NEW organization.** All staffed DIR/TL/Engineer chats must be freshly appointed as separate conversations for that CEO generation. Never inherit old chat acceptances, identities, authorizations or tasks. CEO starts organization setup, then needs a separate explicit Owner development mandate. The mandatory Owner-forwarded acceptance chain is `CEO → DIR → TL → Engineer` where actual staffing warrants it. No AI can silently create or message another ChatGPT conversation.

## Absolute handoff rule

**Every actionable AI-to-AI, AI-to-Owner or Owner-to-AI relay must be numbered and recorded in GitHub before Owner is asked to forward it.** See [MESSAGE-PROTOCOL.md](MESSAGE-PROTOCOL.md).

- Every outbound message includes `ROUND_ID`, `MESSAGE_ID` (`<ROUND_ID>-M000001`, then `...M000002`), `FROM_ROLE`, `TO_ROLE`, each side's `APPOINTMENT_ID`, `TASK_REF`, `IN_REPLY_TO`, and an **exact copy-ready message**. A new sequence is assigned by checking the current round branch's actual GitHub ledger and writing the next numbered file; never guess/reuse/reserve an unsaved number.
- The receiver **verifies the actual ledger**, same round, its own bound role/appointment identity, correct recipient, valid parent/authority, and whether the message already has a processed receipt. **Wrong receiver, stale generation, forged/unrecorded number or duplicate = REJECT WITHOUT WORK**. Never run tools or change code for invalid instructions.
- After appointment ACK, task completion, QA verdict, blocker, refusal, delegation or release status: **always output a new numbered return relay, ready to copy and send to the exact next recipient**. A summary or GitHub comment without copy-ready relay is NOT sufficient. Even a completed task is not communicated to another AI chat automatically.
- No GitHub connection or inability to write/read ledger? State `HANDOFF_BLOCKED`, give evidence, do not fabricate a number or claim delivery. The Owner may ask the designated round coordinator to record it.

## Release and cleanup

A **mission closes only after game changes have passed acceptance/QA, reached `ant-project/main` with Owner authorization, and the exact final SHA has been verified**. Then close remaining task Issues/PRs, clean merged/abandoned temporary **game** branches, remove disposable artifacts where supported, and archive a small release/evidence summary **in the game repository** before clearing the round. Do not delete open/unmerged work or historical evidence prematurely. GitHub Issues generally are **closed** (rather than silently deleted), and completed PR history remains.

After the Owner explicitly signs off closure and the relay ledger has no pending deliveries, delete that completed `appointment-CEO/round/<slug>` branch **if supported and authorized**, leaving governance `main` as the only current branch when no other round is active. Deletion is NOT a merge into governance `main`. Never delete another active round. No hidden cleanup claims when tools cannot delete refs.

## Policies and ready-to-copy templates

- [Message numbering, identities, validation, and cleanup SOP](MESSAGE-PROTOCOL.md)
- [CEO](roles/CEO.md) · [DIR](roles/DIR.md) · [TL](roles/TL.md) · [Engineer](roles/ENGINEER.md)
- [Owner → CEO](appointments/OWNER-TO-CEO.md) · [CEO → DIR](appointments/CEO-TO-DIR.md) · [DIR → TL](appointments/DIR-TO-TL.md) · [TL → Engineer](appointments/TL-TO-ENGINEER.md)
- [Round schema and initial example](examples/README.md); [ledger validator](scripts/validate-governance.mjs)

Historical closed Governance V2/V3 Issues, commits and cancelled `ant-project` tasks (including former #93–#105) do not establish current appointments or override this policy.
