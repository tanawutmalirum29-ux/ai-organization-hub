# Create a new round (example only; do NOT pre-book message IDs)

A new CEO starts with a unique Owner-provided `ROUND_ID` (e.g. `COLONY-NEXT-02`) and creates the GitHub branch `round/colony-next-02` **from main**. On that branch only, create:

```text
workspace/
  round.json
  roster.json
  messages/
    000001.json        # Owner→new CEO bootstrap message
    000002.json        # new CEO→Owner actual acceptance
    000003.json        # example next appointment, ONLY after live GitHub check
```

**workspace/round.json**
```json
{
  "round_id": "COLONY-NEXT-02",
  "game_repository": "tanawutmalirum29-ux/ant-project",
  "state": "ACTIVE",
  "owner_mandate": "OWNER_APPOINTMENT",
  "base_governance_ref": "main"
}
```

**workspace/roster.json**
```json
{
  "round_id": "COLONY-NEXT-02",
  "roles": [
    {
      "role_id": "CEO",
      "appointment_id": "COLONY-NEXT-02-CEO-01",
      "parent_role": "OWNER",
      "status": "ACTIVE"
    }
  ]
}
```

**workspace/messages/000001.json** must follow [the full ledger envelope](../MESSAGE-PROTOCOL.md), with `sequence=1`, `from_role=OWNER`, `from_appointment_id=OWNER`, `to_role=CEO`, and `to_appointment_id` matching roster. `relay_text` stores the exact bootstrap appointment forwarded by Owner. If Owner forgot a unique round ID or initial message number, ask Owner before bootstrap rather than guessing.

Before sending any new message, read the latest `workspace/messages/` directory on the **specific round branch**, check prior receipts and event keys, append the next file, and give Owner the exact copy block. See the automatic validator and its helpful error output.

Never create `workspace/` on governance `main`. Do not merge a round branch into governance `main`.

## Staffing beyond ten and four-Engineer division

```text
CEO
└── DIR-A
    ├── TL-A1
    │   ├── E-A1-1
    │   ├── E-A1-2
    │   └── E-A1-3
    └── TL-A2
        └── E-A2-1
```

Four Engineers need two TLs (3+1 above, or 2+2). If more than ten AI chats are needed across the organization, appoint additional departments/teams under their proper parents. There is no global headcount cap, but one TL never has a fourth Engineer and one DIR never has a third TL.
