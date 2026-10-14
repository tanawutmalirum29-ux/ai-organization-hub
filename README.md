# AI Appointment Charter — Ant Kingdom

**Purpose of this repository: appointment role descriptions and ready-to-forward appointment message templates ONLY.** It is NOT an AI employee registry, development backlog, project status dashboard, game source repository, QA gate, or approval workflow. The old COLONY-NEXT-01/Save-Load/Ant-AI/CI backlog has been cancelled as outstanding work by the Owner; former archived Git history is not current policy.

## OWNER EDITING RULE — REQUIRED FOR ALL AI

**Only the Owner-authorized editor operating in the specific ChatGPT conversation that prepared THIS V3 policy may change the `appointment-CEO` repository.** Every other CEO, DIR, TL, Engineer or AI chat has **READ-ONLY POLICY** here: no create/update/delete file, issue, comment, pull request, branch, workflow, settings, or merge in this repository, even to acknowledge an appointment. A generic "manager" title is NOT permission to edit. When changes are needed, report the request to Owner; the Owner asks the designated editing conversation to make it. This is a behavioral rule; GitHub does not identify a ChatGPT conversation as a separate security principal. Anyone with the same real GitHub credentials could technically write without additional access restrictions.

The work/game repository `tanawutmalirum29-ux/ant-project` is separate: authorized developers may use it for real coding tasks/PRs according to the project Owner's current assignment. The restriction above specifically protects `appointment-CEO`.

## Exact organizational hierarchy (FOUR role levels only)

```text
OWNER (not an AI role)
└── CEO
    ├── DIR-A
    │   ├── TL-A1
    │   │   ├── E-A1-1
    │   │   └── E-A1-2
    │   └── TL-A2
    │       ├── E-A2-1
    │       └── E-A2-2
    ├── DIR-B
    │   ├── TL-B1
    │   │   ├── E-B1-1
    │   │   └── E-B1-2
    │   └── TL-B2
    │       ├── E-B2-1
    │       └── E-B2-2
    └── DIR-C
        ├── TL-C1
        │   ├── E-C1-1
        │   └── E-C1-2
        └── TL-C2
            ├── E-C2-1
            └── E-C2-2
```

**This tree is an EXAMPLE of naming/parentage, NOT a command to instantiate all listed AI chats.** A/B/C are placeholders for departments defined by CEO when work exists. Every DIR can appoint **up to TWO TLs**, and every TL can appoint **up to TWO Engineers**. The hierarchy is identical in each department (including C); there are no specially childless departments. Empty positions stay unfilled, not silently staffed.

**Global Owner limit: max 10 distinct staffed AI chats in the ENTIRE organization, including CEO and every DIR/TL/Engineer, across all departments.** The illustrated full three-department tree exceeds ten and MUST NOT be activated all at once. Big jobs NEVER waive the cap. Choose needed departments/teams and consolidate roles; any additional appointment requires an actual vacant global place and Owner authorization.

## Short unique chat/role IDs

- CEO: `CEO`.
- Director of department A: `DIR-A` (B: `DIR-B`, etc.).
- TL 1 under DIR-A: `TL-A1`; TL 2: `TL-A2`. B follows `TL-B1` / `TL-B2`.
- Engineer 1 under TL-A1: `E-A1-1`; second: `E-A1-2`. Engineers under TL-B2: `E-B2-1`, `E-B2-2`.
- A role ID identifies **one unique direct parent**. Do not abbreviate an Engineer simply to `E-A1` where it might mean either a Lead or Engineer. Suggested ChatGPT title is exact Role ID only (no `ANT |` prefix).

## Appointment in only TWO conversational actions (NO GITHUB REGISTRY)

1. **Appointing manager sends one personalized appointment message** from an appropriate template in `appointments/` to Owner; Owner forwards it into the new/selected AI chat. Message provides unique role ID, appointing manager, job scope, available global seat, charter link and expected reporting.
2. **The recipient replies `รับแต่งตั้ง: <ROLE_ID>` in its chat**, confirms its immediate manager and actual technical tools/limits. No GitHub appointment Issue, GitHub `APPOINTMENT_ACK` comment, `TEAM-REGISTRY.json`, `ORG_DELTA`, roster synchronization, repeated ancestor approval, or mandatory per-role PR.

Appointment order: **OWNER → CEO → DIR → TL → Engineer**. The DIRECT manager appoints its immediate child only, after checking the actual ten-person total. No placeholder template is proof that an AI chat exists. Owner only forwards inter-chat messages, not manually runs developer CI.

## Duties / handoff

| Role | Appoints | Responsible for | Formal deliverable to |
| --- | --- | --- | --- |
| [CEO](roles/CEO.md) | DIRs as genuinely needed, under global cap | Overall planning, assigning department scope, cross-department decisions and game release | Owner |
| [DIR](roles/DIR.md) | Up to 2 TL within own department | Review/accept BOTH own TL teams' work and integrate department output; never accept another DIR's team as its own | CEO |
| [TL](roles/TL.md) | Up to 2 Engineers within own team | Divide code paths among own Engineers, independently review and integrate work | Own DIR |
| [Engineer](roles/ENGINEER.md) | Nobody | Write real scoped code, tests and PRs, fix review feedback | Own TL |

Engineer → **own TL** → **own DIR** → CEO for normal acceptance. Related specialists can ask each other directly for technical help or genuine urgent blockers, without authorizing cross-team writes just by asking. CEO/DIR/TL can personally implement scoped work when needed, but a code author must have a **different qualified reviewer**, and game QA/release cannot be self-certified.

## Read-only role instructions / appointment templates

- Charters: [CEO](roles/CEO.md), [DIR](roles/DIR.md), [TL](roles/TL.md), [Engineer](roles/ENGINEER.md).
- Messages: [Owner → CEO](appointments/OWNER-TO-CEO.md), [CEO → DIR](appointments/CEO-TO-DIR.md), [DIR → TL](appointments/DIR-TO-TL.md), [TL → Engineer](appointments/TL-TO-ENGINEER.md).

## Cancellation and history

All remaining unfinished work in ant-project master planning Issues **#93–#105** was cancelled by Owner; closing these tickets means `NOT_PLANNED`, NOT `COMPLETED`. This repository no longer contains operational plans, roster JSON, QA/Release tooling, old charter hierarchy, CI workflows, or dynamic project staffing transactions. Historical Git commits and closed issues may remain as archive but do not govern the new organization. No active ChatGPT chats are created or deactivated by this README.
