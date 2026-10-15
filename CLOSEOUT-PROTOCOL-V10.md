# V10 — CCCC → DB → OWNER C → Completed + next CEO full appointment

**Binding for NEW V10 rounds** and subsequent CEO appointments. This is a post-mission *administrative courier sequence*, not new game work and not a request for OWNER to approve technical decisions. Older retired rounds and past ledgers remain unmodified.

## Trigger: CEO has genuinely completed one mission

After the game PR is **actually merged into game/main**, CEO checks exact merged main SHA, independent QA, successful CI for the deployed commit, closes the round through its normal final `ROUND_CLOSED` M and roster CLOSED, and triages all unfinished issues into explicit **future work** or closes them completed. No game merge occurs from this protocol.

### BEFORE any DB permission: protect history permanently

The governance round branch is about to be deleted. A branch-only `workspace/messages`, read receipts, Owner conversation journals, signed plans and issue references can become unrecoverable when its ref is deleted. **Do not emit `DB` until an immutable, actually verified archive of the round is saved on `appointment-CEO/main`** under `archives/<OLD_ROUND_ID>/`. Archive the **full round workspace tree**, not only a summary: messages, roster, round.json, receipts, chats, plans, retirements, activity and recovery packets where present, with public-repo privacy redaction of sensitive user details *before* publishing any protected data. Archive filenames and contents must be copied byte-for-byte for already public/approved artifacts; any redaction is documented in the manifest and source confidential bytes remain in separately approved private storage, never claimed to be publicly preserved.

Required `archives/<OLD_ROUND_ID>/MANIFEST.json` at minimum:
```json
{
  "schema_version": "V10-CLEANUP-1",
  "round_id": "ACTUAL_OLD_ROUND_ID",
  "source_round_branch": "round/actual_old_round_id",
  "source_round_commit_sha": "<REAL_40_HEX>",
  "game_main_sha": "<REAL_40_HEX>",
  "round_state": "CLOSED",
  "closure_message_id": "<ACTUAL_ROUND_CLOSED_M_ID>",
  "governance_archive_paths": ["archives/<ACTUAL_OLD_ROUND_ID>/workspace/round.json"],
  "message_count": 1,
  "workspace_file_count": 1,
  "sha256_by_path": {"archives/<ACTUAL_OLD_ROUND_ID>/workspace/round.json": "<ACTUAL_SHA256>"},
  "redacted_paths": [],
  "private_archive_reference": null,
  "game_release_evidence_url": "https://github.com/tanawutmalirum29-ux/ant-project/issues/<ACTUAL_ISSUE_NUMBER>",
  "qa_ci_urls": ["https://github.com/tanawutmalirum29-ux/ant-project/actions/runs/<ACTUAL_ID>"],
  "future_issues": [],
  "prepared_by_ceo_appointment_id": "<ACTUAL_CEO_ID>"
}
```
Exact file count/hashes must be verified **against the source branch** at the pinned SHA and **against the copies** on main. No modifying/deleting previous archives. Keep canonical template files on main unaffected. If archive exceeds platform limits, create a durable verified archive in an explicitly approved private archive repository and link it from an immutable manifest on governance/main; **do not emit DB before verified preservation**. Saving only the commit SHA or a PR link is **not** a backup, because the unreferenced git objects may be garbage-collected after branch deletion.

Once full archive, game release, future-issue triage, and clean round closure have been verified, CEO sends exactly:

```text
CCCC
DB
```

`CCCC` means **mission completely shipped + archived + round closed**. `DB` means **OWNER is authorized to manually delete all non-main branches in BOTH repos**. Never use these strings before verification. CEO does not delete branches without OWNER's cleanup instruction; no need to relay anything else to the retired team.

## OWNER manual branch cleanup

OWNER visits BOTH:
- `tanawutmalirum29-ux/appointment-CEO` (governance)
- `tanawutmalirum29-ux/ant-project` (game)

Delete **all branches except `main`** in each repository, including old feature, integration, QA and now-archived round branches. `main` must not be deleted, rebased or reset. Before deletion, ensure no open PR depends on a branch being deleted and every relevant non-main feature is merged to game/main or explicitly deferred as a *new future task* in an Issue. No deleting branches with sole copies of needed game code, tests, chats or evidence.

Once OWNER actually performs the deletions, OWNER sends **literal `C`** to the **same just-finished CEO chat**. At this stage `C` is *the cleanup-check trigger*, not a game approval, not an authorization to merge, and not the advisor's proposal acknowledgement.

## CEO reaction to OWNER C — verify live, not from memory

The previous CEO is retired **for game implementation**, but its chat retains **only a narrow administrative closeout verification/handoff permission**. It must not revive its engineers or change game code.

On this specific `C` the CEO must re-read BOTH repositories' **live GitHub branch lists, paginating until complete**, not cached local refs:

1. Both repos have **exactly one branch: `main`** — no other refs matching branches, including stale release/feature/round refs. Tags may remain; this command is about branches, not tags.
2. Both `main` branches are real, unarchived repo defaults; verify exact latest main commit SHA and release evidence. Game/main contains the merged validated feature. Any main updates since DB must undergo a fresh impact check and CI proof.
3. There are **no open pull requests** in either repo. Open Issues can remain **only if explicitly triaged and labeled for a future mission** (e.g. `future-work`, `backlog`, `next-mission`), with clear scope/reproduction for unresolved tests. A blocker for the released game is not a future task by simply relabeling it; address release blockers before `Completed`.
4. Governance archive `archives/<ROUND_ID>/MANIFEST.json`, all manifest paths/hashes and release evidence persist on **governance/main**. Do not accept merely an archive existing on the deleted branch.
5. Game and governance main CI/checks relevant to the current head **pass**, or an explicitly allowed nonblocking known failure is tracked in a future Issue under an objective, documented waiver with separate verified minimum release smoke checks. Never report failing release-critical QA as game ready.

If any check fails, reply **`B`** (or **`ER`** when GitHub cannot be inspected), save details to a **governance/main** Issue or approved handoff record, and **do not** say Completed, generate a new appointment, or create a fresh round branch. OWNER can correct cleanup, send `C` again, and get a fresh verification.

If all checks succeed, produce **exactly**:

```text
Completed

<ONE FULL FIRST-TIME APPOINTMENT FOR NEW CEO>
```

This is the requested sole **post-cleanup full-text exception** to short-chat communications. Use the canonical [OWNER→CEO V10 first appointment template](appointments/OWNER-TO-CEO.md), filling a **fresh unused** `ROUND_ID`, corresponding `CEO-01`, actual game/main SHA, governance/main SHA, current links, valid start gate and explicit prohibition on reusing retired chats. CEO must construct the new ID deterministically or uniquely and check it against both repos' branches, prior archived round IDs and handoff records. Store this *prepared* appointment as an audit-only draft on **governance/main** (for example a new Issue referencing prior archive), not as a new live `round/` branch, because cleanup is required to leave **only main**. The outgoing CEO **writes the full appointment as text for OWNER to copy into a new ChatGPT CEO chat**; it does not claim a new CEO is already appointed or its first M saved.

**After the appointment is delivered into that new chat**, and only then, new CEO initializes a new round and V10 workflow with only two temporary advisers. Old CEO terminates administrative duties and stops. OWNER is not an approval authority for the release decision or staffing.

## No automatic cross-chat actions

CEO cannot know OWNER deleted branches until OWNER sends C and actual live GitHub checks succeed. OWNER must still manually copy the full new CEO appointment into a new chat. This protocol authorizes generation of an appointment **without asking OWNER for additional decisions**, not silently opening another ChatGPT chat.
