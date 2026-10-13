# Authoritative team graph in game repository

Canonical live artifacts are stored in `ant-project`: `docs/ai-org/TEAM-REGISTRY.json` (machine-readable) and `docs/ai-org/ACTIVE_TEAM.md` (easy-to-read org chart); optional `docs/ai-org/RELEASE-SIGNATURES.md` is a signoff dashboard, not the roster.

Every entry must include `role_id` unique, `parent_role_id` unique (CEO parent null), title, domain, appointed_by, approved slot, `appointment_issue_url`, `ack_comment_url`, `status` (PROPOSED/PENDING_ACK/ACTIVE/STANDBY/INACTIVE), `responsibilities`, approved paths, current Issue/PR and successor link. Graph has no cycles and exactly one CEO root. Do not mark an unacknowledged AI ACTIVE.

**Update without burdening CEO:** each immediate parent posts `ORG_DELTA` to its own superior on an appointment/transfer; DCEO-DELIVERY appoints/assigns a roster steward to update both JSON and Markdown at every approved change. Steward owns only governance files, not Gameplay. CEO sees a short versioned change summary, and authorizes only additional *capacity* outside approved plan.

If `main` changes require CEO approval, maintain rapid live registry on a dedicated protected `org/registry` branch, linked from the game repo `main`. Its source-of-truth SHA and status must be visible; use reviewed PRs/snapshots to reconcile to `main` without forcing CEO to review every role. **Don't quietly update main** and don't treat a roster row as actual spawned chat or as Quality signature.

Historical 17-role org instructions remain archival. On activation each new role must have an actual user-relayed appointment and reply `APPOINTMENT_ACK` before marked ACTIVE. Tasks CLOSED ≠ role terminated.
