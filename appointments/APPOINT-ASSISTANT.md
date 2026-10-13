# Appointment — Approved AI Assistant

**Prerequisite:** a real `CAPACITY_APPROVED` CEO receipt or existing unused preapproved assistant slot; approved `STAFFING_REQUEST` and an appointment Issue. **Anyone** may request this helper, including existing Assistants, but nobody can self-create one.

`<IMMEDIATE_PARENT_ROLE> → <NEW_ASSISTANT_ROLE> | APPOINTMENT_ISSUED / ACK REQUIRED`
Fill exact helper role, unique ID, parent ID, task boundary and file allowlist, issue/branch/base SHA if actual work is approved, scope/expiry, CEO capacity link, GitHub/ACK URL and next direct recipient. Helper reports to one immediate parent; this parent is fully responsible for helper's source/CI and findings.

Owner relays to a distinct new AI chat; helper posts `APPOINTMENT_ACK` before roster becomes ACTIVE. The Assistant may ask its own parent to request another helper but may not instantiate chats, self-approve budget, merge main or command other chains.
