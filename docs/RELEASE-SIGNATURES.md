# QA Signatures and release gate — CEO checks receipts, not gameplay

## Release-level order (single immutable HEAD)
Engineer delivery → Team Lead `TEAM_ACCEPTED` → Director `DEPARTMENT_ACCEPTED` → required domain Deputy(ies) `DOMAIN_SIGNED` → DCEO-QA `INDEPENDENT_QA_SIGNED` (or binding `QA_HOLD`) → DCEO-DELIVERY **signs LAST** as `DELIVERY_SIGNED` → CEO sees `SIGNATURE_READY` and authorizes merge or HOLD.

At Team/Department stage underlying feature SHA may differ. **Before final domain signatures**, integration is frozen at ONE full 40-character `candidate_sha`. Every final Domain/QA/Delivery signature refers to that *same* SHA. A changed release PR head invalidates these receipts; rerun affected QA and re-sign. Delivery cannot waive an independent QA HOLD or invent no-impact.

## Before development
CEO approves in Parent Issue the full `required_signers` by impacted domains: normally DCEO-SYS, DCEO-EXP and/or DCEO-PLAT as needed, **always DCEO-QA and DCEO-DELIVERY**. Any `NO_IMPACT_AT_SHA` requires signed verified diff rationale if policy requires unrelated domains. Delivery is the last signer and the only role that sends final ready request directly to CEO.

## Immutable signed comment schema
`role_id`, `direct_parent_role_id`, `round_id`, `candidate_sha` (40 hex), `domain`, `verdict` SIGNED/HOLD/NO_IMPACT, `scope_files`, `source_pr_url`, `ci_run_urls` with actually verified successful checkout/source SHA, `artifact_urls`, `known_limits`, `registry_version`, `signed_at_utc`, `github_permanent_comment_url`. A completed Job is not enough if the HEAD differs.

## Machine-checkable acceptance (implementation required in future)
Dedicated Platform/Delivery AI configures a GitHub Actions `SIGNATURE_READY` verifier for final candidate PR. It must compare `required_signers` against unique receipts, check role/direct-parent/roster relationships, all same full SHA, real GitHub URL/CI success/evidence, expiry/staleness, and no `HOLD`. Missing/contradictory/changed SHA ⇒ `SIGNATURE_HOLD`. A green code CI alone **cannot** substitute for signatures.

**CEO's only final check**: Owner-authorized scope; machine `SIGNATURE_READY`; immutable Release PR head/main base, known limitations and no holds. CEO performs lease-protected one-time merge into `main` and verifies merge SHA. No manual browser/testing/decoding logs by CEO or Owner. Return missing-signature request to Delivery, not Engineer.

**Limitations:** All ChatGPT roles using one GitHub login cannot cryptographically attest identity; the verifier checks structural completeness, not actual separate signer authentication. For strong protection use distinct actors/permissions and branch rules, if available. This is a SPECIFICATION, not a claim the workflow has been deployed.
