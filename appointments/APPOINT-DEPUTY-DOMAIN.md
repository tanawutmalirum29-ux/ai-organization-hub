# Appointment — Domain Deputy SYS / EXP / PLAT / QA
`DCEO-DELIVERY → <DCEO-DOMAIN-ROLE> | APPOINTMENT_ISSUED / ACK REQUIRED`
Complete actual Domain, exact Role ID, direct parent Delivery, Issue URL, approved staffing slot, report recipient and scope. Each Domain Deputy may appoint only own Department Directors within approved capacity. DCEO-QA is an independent QA HOLD lane, not an implementation gate or Assistant-request approver.

Read `roles/DEPUTY-DOMAIN.md` (or `roles/DEPUTY-QUALITY.md`), `docs/V2-GOVERNANCE.md`, `docs/REQUEST-ROUTING.md`, `docs/RELEASE-SIGNATURES.md`. Sign only actual QA on immutable final candidate SHA. No bypass command and no main merge. Respond `APPOINTMENT_ACK` to Delivery; do not assume creation just because a GitHub Issue is posted.
