# Owner Zero-Click — Autonomous CI/QA Governance

**Direct tech/incident messages:** [Fast Lane](FAST-LANE-GOVERNANCE.md). เมื่อ CI ขัดข้องหรือ QA เจอบั๊กจริง ติดต่อ PLAT Specialist หรือ Engineer เจ้าของ Source ได้โดยตรงพร้อม Issue/Log ไม่ต้องผ่านหัวหน้าทุกชั้น. สำหรับงานแก้โค้ดนอก Scope ต้องให้เจ้าของ Scope อนุมัติ, และ QA HOLD/Release Signature เป็นเงื่อนไขบังคับเหมือนเดิม.

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

## Accountability by role — V2 authoritative routing
**This section replaces legacy ROYAL-01 Integration Director→CEO / Director→CEO routing. Every message moves one direct parent/child hop.** No alternate parallel Integration Director reporting to CEO is active under V2.

| Role | Technical duties it owns | Exactly who receives the result |
| --- | --- | --- |
| Engineer / approved Assistant | Implement owned paths, test, open scoped Draft PR, attach actual SHA and CI evidence | **Its direct manager** (Engineer→Team Lead; Assistant→its actual parent) |
| Team Lead | Review two Core Engineers' PRs, actual CI/results and assign rework, issue `TEAM_ACCEPTED` | **Its Department Director** |
| Department Director | Combine accepted Team work, run/check integrated relevant QA, `DEPARTMENT_ACCEPTED` or HOLD | **Its registered Domain Deputy** |
| DCEO-SYS / EXP / PLAT | Technical review and QA of affected Domain on frozen final Candidate SHA; sign/HOLD | **DCEO-DELIVERY** |
| DCEO-QA | Independently verify complete candidate and issue binding `INDEPENDENT_QA_SIGNED` / `QA_HOLD` | **DCEO-DELIVERY** |
| DCEO-DELIVERY | Integrate all Domains, collect exact-SHA signatures + independent QA and sign **last** | **AI CEO** — one final Release request |
| AI CEO | Product scope and capacity, verify complete signoff gate and CI/HEAD, sole `ant-project/main` merge | **Project Owner**, informational Release result; sends rework only to Delivery |

A Product QA failure in another Domain goes `DCEO-QA→DCEO-DELIVERY→DCEO-<DOMAIN>→Director→Lead→Engineer`, never Quality→Engineer directly. If a task changes the source SHA, recheck and re-sign as required. [Mandatory onboarding](ROLE-START-HERE.md), [Skill scopes](ROLE-SKILLS-AND-SCOPE.md), [After-task routing](TASK-STATE-AND-HANDOFF.md), [Actual Task contract](TASK-ISSUE-CONTRACT.md).

An AI role may not claim that another chat received an order until Owner actually relays it and/or the recipient acknowledges it.

## CI design mandatory from the next round
1. **Plan automation before coding** in the Parent Issue: designate workflow ownership, trigger branches/path filters, Git SHA provenance, focused smoke gates, Full QA gates, artifacts and backstop owner (AI role; never Project Owner).
2. **Automatic triggers:** enable appropriate PR and/or scoped `push` triggers for engineer/team/integration refs, with explicit branch constraints and appropriate workflow file ownership approval. No manual `workflow_dispatch` requirement for Owner. A workflow merely containing `workflow_dispatch` is insufficient.
3. **Fast iteration:** lightweight syntax, unit/focused regression and build/smoke run on pushes or PR updates. Do not force expensive full-browser/long-simulation suites on every tiny engineer commit unless risk demands it.
4. **Acceptance/release checkpoints:** on integrated Team/Department/Release candidate SHA, automatically run the full relevant test/build, Browser QA and gameplay/simulation/performance checks prescribed in the Parent Issue and Quality Gates. No new push after signoff without fresh checks.
5. **Provenance:** report GitHub run URL, `GITHUB_SHA`, actual checkout SHA, production-source SHA when using a QA-only harness, workflow SHA, conclusion, logs, artifact IDs and gate counts. Branch names and old PASS results are not sufficient.
6. **QA-only harness separation:** an isolated QA branch may modify workflow/test harness files ONLY with authorized QA ownership and a documented exact production base SHA and scoped compare. It may validate unchanged product source but does not replace verification of the final integrated product SHA. Never silently merge disposable harness changes into production.
7. **Failure handling:** if a workflow does not start, has YAML errors, fails for infrastructure, or reports a genuine product regression, the responsible AI diagnoses it and repairs only its authorized files or directly asks the technically relevant owning Lead/PLAT specialist for the missing scope/CI capability, keeping its accountable manager informed of impacts. A harness failure is not automatically a gameplay failure, and a passing smoke test is not full QA.
8. **No shortcuts:** `CI NOT_RUN`, `CI NOT_VERIFIED`, missing artifacts, wrong HEAD, unavailable runner, DNS/network failure, or unresolved coverage = **QA HOLD**. Never invent `PASS`, weaken tests to greenwash results, retarget PR to main as a trigger workaround, or bypass signed Team/Department/Integration acceptance.
9. **If automation cannot be implemented within current permissions:** report `BLOCKED` with the missing capability and directly consult the relevant Platform owner or its accountable manager using an existing Issue/PR link. Never offload shell, screenshots, CI clicks or file transfers to Owner. CEO can decide new capacity directly on a tagged staffing request with manager/Delivery FYI. The Domain Deputy and direct Team/Department parent must assign scoped workflow ownership; direct Engineer incident notices are allowed; new write scope still needs the owning manager's approval.

## Reporting template to Owner, max 3 lines
```text
<ROUND> <ROLE-ID> | READY/BLOCKED/CHANGES_REQUESTED | PR #... | CI PASS/FAIL/NOT_VERIFIED | Head <short-SHA>
GitHub report: https://github.com/tanawutmalirum29-ux/ant-project/issues/<n>#issuecomment-<id>
Next recipient: <IMMEDIATE-PARENT-OR-CHILD-ROLE-ID> | <one next action by recipient, or OWNER information only>
```

**When to apply:** starting with the next planned work round and immediately to any in-progress task where Owner's Zero-Click directive supersedes prior manual instructions. This document is a governance policy; it does not by itself create GitHub Actions triggers, start an AI chat, or authorize a release merge.
