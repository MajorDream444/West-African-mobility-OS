# MobStack Canary Validation

**Assignment:** [West-African-mobility-OS#3](https://github.com/MajorDream444/West-African-mobility-OS/issues/3) · coordination notice [Mobstack#3](https://github.com/MajorDream444/Mobstack/issues/3)
**Workload:** West African Mobility OS (this repository), `6e2fb60`
**Rail under test:** MobStack `main` @ `2fd0ab8`
**Run date:** 8 September 2026
**Result:** 0 pass · 2 pass-with-defect · 4 fail, of 6 criteria

> **Historical record only.** This result evaluates workload commit `6e2fb60` against MobStack `2fd0ab8`. It did not test the later combined `main` at `fdb70b3` or the Issue #7 corrective work. The historical findings below are preserved as recorded; current reconciliation and release disposition must be taken from the post-merge review and its corrective PR.

Current reconciliation record: [`POST-MERGE-RECONCILIATION.md`](POST-MERGE-RECONCILIATION.md).

---

## What this is

MobStack's first canary workload. This repository stays canonical for mobility evidence; the rail is tested *against* it. **No mobility claim is copied into MobStack**, per the assignment.

Run it:

```bash
pip install jsonschema
python3 canary/run_canary.py --mobstack /path/to/Mobstack
```

Exit code is non-zero while any criterion fails. Machine-readable output: `--json`, archived per run as `results-<date>.json`.

## Scope limit, stated plainly

MobStack Stage A ships **no runtime**. Its own `tests/README.md` says so: *"Executable tests will be added when the runtime language and package boundary are selected. This is a specification, not a claim of implemented enforcement."*

That is honest, and it bounds this validation. What is tested here is whether the **specification** — schemas plus declared gates — is *capable* of enforcing each criterion. A criterion that cannot be tested is reported as a failure to enforce, never as a pass. **No criterion is credited on intent.**

---

## Results

| # | Criterion | Result |
|---|---|---|
| 1 | Preserves all six evidence classes, including CONFLICT | **FAIL** |
| 2 | Prevents duplicate or redefined claim and decision IDs | **FAIL** |
| 3 | Blocks unsupported prices, deposits, partnerships, mandates, supplier authority | **FAIL** |
| 4 | Separates synthetic demonstration data from operating evidence | **FAIL** |
| 5 | Records named human decisions for Pass, Hold, Redirect, Stop | **PASS-WITH-DEFECT** |
| 6 | Emits source-linked handoffs and receipts | **PASS-WITH-DEFECT** |

### 1 · Evidence classes — FAIL

MobStack ships no claim or evidence schema. The six classes appear only as prose in `CONSTITUTION.md` rule 3 (*"facts, reports, assumptions, proposals, open questions, and conflicts"*) — lowercase narrative, not an enforceable enum. The only literal token found anywhere in the constitution is `PROPOSAL`, and that is its own status header.

Consequence: no artifact can be machine-checked for a valid class, and **CONFLICT cannot be distinguished from an unlabelled assertion.** CONFLICT is the class that matters most here — it is the one that must block external use while permitting internal planning, and it is the state two live corridor claims are currently in.

### 2 · Identifier integrity — FAIL

No claim or decision schema means no identifier namespace to police. JSON Schema also cannot express cross-document uniqueness at all; this requires a registry validator, which Stage A does not ship.

Verified independently during this run: the corridor registers are **clean** — 36 claims, 20 decisions, zero duplicates. So the rail is untested against the defect rather than proven against it. A fixture must be written that *deliberately* reuses an ID.

### 3 · Blocking gates — FAIL

`workflows/venture-foundry/workflow.json` requires five gates — `truth-gate`, `language-gate`, `authority-gate`, `capital-gate`, `ownership-gate`. `gates/` contains a README and **zero gate instances**. All five are named and none is defined.

`gate.schema.json` itself is sound. Nothing has been written against it. A gate that is named but undefined blocks nothing.

### 4 · Synthetic vs operating data — FAIL

No schema carries a provenance field. Searched every schema for `synthetic`, `seeded`, `demonstration`, `provenance`, `isReal`, `dataSource` — none present. Every artifact is representationally identical whether its content came from seeded demonstration data or real field evidence.

**This is the failure that already occurred once**, in the AI Studio prototype, and is the reason the canary exists. The rail cannot currently detect it.

### 5 · Human decisions — PASS-WITH-DEFECT

The strongest area of Stage A. `outcomes` is a closed `const` of exactly `PASS/HOLD/REDIRECT/STOP` in the gate schema and a closed `enum` in the receipt schema; `decisionAuthority` and `decidedBy` are required; `receiptRequired` is `const: true`. "Pass with conditions" is structurally unrepresentable, which is precisely right.

Two soft spots, both probed and reproduced:
- `decidedBy` has no `minLength`, so `""` validates as a named human.
- The receipt's gate item omits `additionalProperties: false`, so `decidedByAgent: "claude"` is silently accepted — an agent recorded where a human is required.

### 6 · Source linking — PASS-WITH-DEFECT

Both schemas require `sourceCommit`, so the link is structurally present. But the constraint is **asymmetric**: `handoff.sourceCommit` is pattern-checked as `^[a-f0-9]{7,40}$` while `receipt.sourceCommit` has no pattern. Probed: a receipt with `"sourceCommit": "not-a-commit"` validates cleanly.

That defeats commit pinning for exactly the artifact meant to be the durable audit record.

---

## Recommended remediation, in order

Ordered by what unblocks the most downstream enforcement, not by effort.

1. **Add `claim.schema.json`** with a closed enum of the six classes and the thirteen required fields from `SOURCE-OF-TRUTH.md`. Unblocks criteria 1 and 2.
2. **Add a provenance field** — `dataSource: OPERATING | SYNTHETIC | SEEDED` — required on every artifact schema, defaulting to nothing. Criterion 4.
3. **Write the five gate instances** against the existing `gate.schema.json`. Criterion 3.
4. **Add a registry validator** for cross-document ID uniqueness; JSON Schema cannot do it. Criterion 2.
5. **Tighten two schemas**: `minLength: 1` on `decidedBy`; `additionalProperties: false` on the receipt gate item; the handoff's commit pattern on `receipt.sourceCommit`. Criteria 5 and 6.
6. **Write the failing fixtures first** — a reused ID, a price from an `ASSUMPTION` input, a deposit without a capital gate, a synthetic workshop presented as operational. Each must fail before its fix and pass after.

Until items 1–4 land, MobStack should not be described as enforcing evidence discipline. It currently specifies it.

## Note on a prior red-team finding

The red-team cited "reused decision IDs" as an existing defect. Checked directly across both runs: it **does not reproduce** in the canonical registers, which are clean. It refers to prototype output, not this repository. A fixture built against a defect that is not present would prove nothing — recommendation 6 therefore calls for a *deliberately* corrupt fixture instead.

---

*Findings are `VERIFIED` against the two commits named above and reproducible by re-running the harness. They describe MobStack Stage A only and carry no implication about later versions.*
