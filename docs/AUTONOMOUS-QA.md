# Owner Zero-Click — Autonomous CI/QA Governance

**Authority:** Project Owner direction confirmed by AI CEO on 2026-10-14 (ICT).  
**Applies to:** all future Ant Kingdom development rounds, all active departments and integration/release teams.  
**Canonical evidence:** [ROYAL-01 Owner policy & actual auto-triggered run](https://github.com/tanawutmalirum29-ux/ant-project/issues/75#issuecomment-6156237286).

## Owner duties — product only
Project Owner sets direction, priorities and scope; approves exceptions/decisions when necessary; relays **short, explicitly addressed AI-to-AI messages** between separate chats. That is all.

**No technical work can be delegated to Owner.** Never require Owner to:
- Click GitHub Actions **Run workflow** / rerun jobs or otherwise execute CI.
- Clone/checkout a repository, run shell/Node/tests, open Codespaces, install tools, edit workflow YAML, or debug infrastructure.
- Download, upload, share, relay or manually transport ZIP/JSON/screenshots/artifacts/logs between AI chats.
- Perform CI triage, browser inspection or PR reconciliation on behalf of a Team Lead/Director.
- Merge code into `ant-project/main`; this remains the CEO's exclusively authorized process responsibility.

AI chats do **not** autonomously communicate with one another. The only human relay is a short message with role, actual GitHub report URL, status and next recipient; reports/artifacts stay on GitHub.

## Accountability by role
| Role | Autonomous responsibilities | Send results to |
| --- | --- | --- |
| Engineer | Scope audit, source implementation, focused tests, documentation and Draft PR; inspect own checks/logs | Own Team Lead |
| Team Lead | Review both Engineers, arrange CI triggers without Owner, inspect logs/artifacts and independently verify Team QA; decide `TEAM_ACCEPTED` or `CHANGES REQUESTED` | Department Director |
| Department Director | Integrate accepted Team changes, handle authorized QA-only workflows, execute/verifiably trigger combined Full QA, inspect artifacts and issue `DEPARTMENT_ACCEPTED` / `REWORK` | Integration Director if designated; otherwise CEO |
| Integration Director, when appointed | Cross-department compatibility, integration CI and release-candidate validation | CEO |
| AI CEO | Define gates and role boundaries, review evidence, exact integrated HEAD + Owner scope, accept/reject final release; **only CEO** may merge `ant-project/main` | Owner (short status) |

An AI role may not claim that another chat received an order until Owner actually relays it and/or the recipient acknowledges it.

## CI design mandatory from the next round
1. **Plan automation before coding** in the Parent Issue: designate workflow ownership, trigger branches/path filters, Git SHA provenance, focused smoke gates, Full QA gates, artifacts and backstop owner (AI role; never Project Owner).
2. **Automatic triggers:** enable appropriate PR and/or scoped `push` triggers for engineer/team/integration refs, with explicit branch constraints and appropriate workflow file ownership approval. No manual `workflow_dispatch` requirement for Owner. A workflow merely containing `workflow_dispatch` is insufficient.
3. **Fast iteration:** lightweight syntax, unit/focused regression and build/smoke run on pushes or PR updates. Do not force expensive full-browser/long-simulation suites on every tiny engineer commit unless risk demands it.
4. **Acceptance/release checkpoints:** on integrated Team/Department/Release candidate SHA, automatically run the full relevant test/build, Browser QA and gameplay/simulation/performance checks prescribed in the Parent Issue and Quality Gates. No new push after signoff without fresh checks.
5. **Provenance:** report GitHub run URL, `GITHUB_SHA`, actual checkout SHA, production-source SHA when using a QA-only harness, workflow SHA, conclusion, logs, artifact IDs and gate counts. Branch names and old PASS results are not sufficient.
6. **QA-only harness separation:** an isolated QA branch may modify workflow/test harness files ONLY with authorized QA ownership and a documented exact production base SHA and scoped compare. It may validate unchanged product source but does not replace verification of the final integrated product SHA. Never silently merge disposable harness changes into production.
7. **Failure handling:** if a workflow does not start, has YAML errors, fails for infrastructure, or reports a genuine product regression, the responsible AI diagnoses it and repairs only its authorized files or escalates to its lead/Director/CEO for a scope decision. A harness failure is not automatically a gameplay failure, and a passing smoke test is not full QA.
8. **No shortcuts:** `CI NOT_RUN`, `CI NOT_VERIFIED`, missing artifacts, wrong HEAD, unavailable runner, DNS/network failure, or unresolved coverage = **QA HOLD**. Never invent `PASS`, weaken tests to greenwash results, retarget PR to main as a trigger workaround, or bypass signed Team/Department/Integration acceptance.
9. **If automation cannot be implemented within current permissions:** report `BLOCKED` with the missing capability, attempted alternatives and a minimal technical decision to the appropriate AI supervisor. Never offload shell, screenshots, CI clicks or file transfers to Owner. CEO may approve scoped workflow ownership or a different AI-managed trigger design without expanding Gameplay scope.

## Reporting template to Owner, max 3 lines
```text
<ROUND> <ROLE-ID> | READY/BLOCKED/CHANGES_REQUESTED | PR #... | CI PASS/FAIL/NOT_VERIFIED | Head <short-SHA>
GitHub report: https://github.com/tanawutmalirum29-ux/ant-project/issues/<n>#issuecomment-<id>
Next recipient: <ROLE-ID> | Blocker: none/<technical issue to be handled by AI team>
```

**When to apply:** starting with the next planned work round and immediately to any in-progress task where Owner's Zero-Click directive supersedes prior manual instructions. This document is a governance policy; it does not by itself create GitHub Actions triggers, start an AI chat, or authorize a release merge.
