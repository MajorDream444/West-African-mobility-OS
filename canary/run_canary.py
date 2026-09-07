#!/usr/bin/env python3
"""
MobStack canary validation — West African Mobility OS as first workload.

Assignment: MajorDream444/West-African-mobility-OS#3
Validates the MobStack execution rail against the six required criteria,
using real corridor evidence as the workload.

This harness tests the SPECIFICATION (schemas + declared gates). MobStack
Stage A ships no runtime, and its own tests/README states so explicitly.
A criterion that cannot be tested is reported as CANNOT-VALIDATE, never
as a pass.

Usage: python3 canary/run_canary.py --mobstack <path> [--json]
"""
import argparse, csv, json, pathlib, re, sys

try:
    from jsonschema import Draft202012Validator
except ImportError:
    sys.exit("jsonschema required: pip install jsonschema")

REPO = pathlib.Path(__file__).resolve().parent.parent
CANON = REPO / "Mauritania_Mobility_Intelligence_Canonical_Package"
EVIDENCE_CLASSES = {"VERIFIED", "REPORTED", "ASSUMPTION", "PROPOSAL", "OPEN", "CONFLICT"}

results = []


def record(cid, name, status, detail, evidence=""):
    results.append({"criterion": cid, "name": name, "status": status,
                    "detail": detail, "evidence": evidence})


def load_schemas(ms):
    out = {}
    for p in sorted((ms / "schemas").glob("*.json")):
        out[p.stem.replace(".schema", "")] = json.loads(p.read_text())
    return out


# ---------------------------------------------------------------- criterion 1
def c1_evidence_classes(ms, schemas):
    """Preserves all six evidence classes, including CONFLICT."""
    enum_holders = []
    for name, s in schemas.items():
        for enum in re.findall(r'"enum"\s*:\s*\[([^\]]*)\]', json.dumps(s)):
            vals = {v.strip().strip('"') for v in enum.split(",")}
            if vals & EVIDENCE_CLASSES:
                enum_holders.append(name)
    if enum_holders:
        record(1, "Six evidence classes preserved", "PASS",
               f"Classes constrained by schema(s): {sorted(set(enum_holders))}")
        return
    # Is there any claim/evidence schema at all?
    has_claim = any(k in schemas for k in ("claim", "evidence", "assertion"))
    prose = (ms / "CONSTITUTION.md").read_text()
    mentions = sorted(c for c in EVIDENCE_CLASSES if c in prose)
    record(1, "Six evidence classes preserved", "FAIL",
           "No schema constrains an evidence class. MobStack ships no claim/evidence "
           f"schema (claim schema present: {has_claim}). The classes exist only as "
           "prose in CONSTITUTION.md rule 3, in lowercase narrative form, so no "
           "artifact can be machine-checked for a valid class and CONFLICT cannot "
           "be distinguished from an unlabelled assertion.",
           f"CONSTITUTION.md literal tokens found: {mentions or 'none'}")


# ---------------------------------------------------------------- criterion 2
def c2_id_integrity(ms, schemas):
    """Prevents duplicate or redefined claim and decision IDs."""
    # Corridor side: are the real registers actually clean?
    claim_ids = []
    with open(CANON / "data" / "claims-register.csv") as fh:
        for row in csv.DictReader(fh):
            if row.get("claim_id"):
                claim_ids.append(row["claim_id"].strip())
    dec_ids = re.findall(r"\bDEC-\d+\b",
                         (CANON / "docs" / "00-governance" / "DECISION-REGISTER.md").read_text())
    dupes = {i for i in claim_ids if claim_ids.count(i) > 1}
    dec_dupes = {i for i in dec_ids if dec_ids.count(i) > 1}
    corridor_clean = not dupes and not dec_dupes

    id_patterns = [s.get("properties", {}).get("id", {}).get("pattern")
                   for s in schemas.values()]
    has_uniqueness = any("uniqueItems" in json.dumps(s) and "id" in json.dumps(s)
                         for s in schemas.values())
    record(2, "No duplicate or redefined claim/decision IDs", "FAIL",
           "MobStack cannot enforce this: with no claim or decision schema there is "
           "no identifier namespace to check, and JSON Schema alone cannot express "
           "cross-document uniqueness. Enforcement must live in a registry validator, "
           "which Stage A does not ship.",
           f"Corridor registers verified clean independently: {len(claim_ids)} claims, "
           f"{len(set(dec_ids))} decisions, duplicates={sorted(dupes | dec_dupes) or 'none'} "
           f"(corridor_clean={corridor_clean}); schema id patterns declared: "
           f"{[p for p in id_patterns if p]}")


# ---------------------------------------------------------------- criterion 3
def c3_blocking_gates(ms, schemas):
    """Blocks unsupported prices, deposits, partnerships, mandates, supplier authority."""
    wf = json.loads((ms / "workflows" / "venture-foundry" / "workflow.json").read_text())
    required = wf.get("requiredGates", [])
    gate_files = [p for p in (ms / "gates").rglob("*.json")]
    validator = Draft202012Validator(schemas["gate"])
    defined, invalid = [], []
    for p in gate_files:
        try:
            inst = json.loads(p.read_text())
        except Exception as e:
            invalid.append((p.name, str(e)))
            continue
        errs = list(validator.iter_errors(inst))
        (defined if not errs else invalid).append(
            inst.get("id", p.name) if not errs else (p.name, errs[0].message))
    missing = [g for g in required if g not in defined]
    if not missing:
        record(3, "Blocks prices, deposits, partnerships, mandates, authority", "PASS",
               f"All required gates defined and schema-valid: {defined}")
    else:
        record(3, "Blocks prices, deposits, partnerships, mandates, authority", "FAIL",
               f"workflow.json requires {len(required)} gates but {len(missing)} have no "
               f"schema-valid definition: {missing}. gates/ contains "
               f"{len(gate_files)} instance file(s). A gate that is named but "
               "undefined blocks nothing.",
               f"defined={defined or 'none'} invalid={invalid or 'none'}")


# ---------------------------------------------------------------- criterion 4
def c4_synthetic_separation(ms, schemas):
    """Separates synthetic demonstration data from operating evidence."""
    blob = json.dumps(schemas).lower()
    markers = [w for w in ("synthetic", "seeded", "demonstration", "provenance",
                           "isreal", "datasource", "fixture") if w in blob]
    if markers:
        record(4, "Synthetic data separated from operating evidence", "PASS",
               f"Provenance markers present in schemas: {markers}")
    else:
        record(4, "Synthetic data separated from operating evidence", "FAIL",
               "No schema carries a synthetic/operational provenance field. Every "
               "artifact — receipt, handoff, agent, skill — is representationally "
               "identical whether its content came from seeded demonstration data or "
               "from real field evidence. This is the failure mode that already "
               "occurred once in a prototype build, and the rail cannot currently "
               "detect it.",
               "searched all schemas for: synthetic|seeded|demonstration|provenance|isReal|dataSource")


# ---------------------------------------------------------------- criterion 5
def c5_human_decisions(ms, schemas):
    """Records named human decisions for Pass, Hold, Redirect, Stop."""
    gate, receipt = schemas["gate"], schemas["receipt"]
    outcomes_ok = gate["properties"]["outcomes"].get("const") == ["PASS", "HOLD", "REDIRECT", "STOP"]
    authority_ok = "decisionAuthority" in gate.get("required", [])
    receipt_ok = receipt["properties"]["receiptRequired"]["const"] is True if "receiptRequired" in receipt.get("properties", {}) else gate["properties"]["receiptRequired"].get("const") is True
    g = receipt["properties"]["gates"]["items"]
    decided_by_required = "decidedBy" in g.get("required", [])
    enum_ok = g["properties"]["outcome"].get("enum") == ["PASS", "HOLD", "REDIRECT", "STOP"]

    # Probe: does an empty decidedBy slip through?
    v = Draft202012Validator(receipt["properties"]["gates"])
    empty_name_passes = not list(v.iter_errors([{"id": "truth-gate", "outcome": "PASS", "decidedBy": ""}]))
    extra_field_passes = not list(v.iter_errors(
        [{"id": "g", "outcome": "PASS", "decidedBy": "x", "decidedByAgent": "claude"}]))

    core = outcomes_ok and authority_ok and decided_by_required and enum_ok and receipt_ok
    if core and not empty_name_passes and not extra_field_passes:
        status, extra = "PASS", ""
    else:
        status = "PASS-WITH-DEFECT"
        extra = ("Two soft spots: decidedBy has no minLength so an empty string "
                 f"validates as a named human (empty_accepted={empty_name_passes}); and the "
                 "receipt gate item omits additionalProperties:false, so an unrecognised "
                 f"field such as decidedByAgent is silently accepted (extra_field_accepted={extra_field_passes}).")
    record(5, "Named human decisions for PASS/HOLD/REDIRECT/STOP", status,
           "Outcome vocabulary is correctly closed in both gate and receipt schemas, "
           "decisionAuthority and decidedBy are required, and receiptRequired is const true. "
           "This is the strongest criterion in Stage A. " + extra,
           f"outcomes_const={outcomes_ok} authority_required={authority_ok} "
           f"decidedBy_required={decided_by_required} outcome_enum_closed={enum_ok}")


# ---------------------------------------------------------------- criterion 6
def c6_source_linked(ms, schemas):
    """Emits source-linked handoffs and receipts."""
    h, r = schemas["handoff"], schemas["receipt"]
    h_pat = h["properties"]["sourceCommit"].get("pattern")
    r_pat = r["properties"]["sourceCommit"].get("pattern")
    h_req = "sourceCommit" in h.get("required", [])
    r_req = "sourceCommit" in r.get("required", [])

    rv = Draft202012Validator(r)
    bogus = {"runId": "r1", "startedAt": "2026-09-08T00:00:00Z", "finishedAt": "2026-09-08T01:00:00Z",
             "host": "claude-code", "workload": "west-african-mobility-os",
             "sourceCommit": "not-a-commit", "doctrineRefs": ["x"], "playbookRefs": ["y"],
             "mob": "vanguards", "humanOwner": "Major Dream Williams", "actions": [],
             "artifacts": [], "gates": [], "unresolved": []}
    bogus_accepted = not list(rv.iter_errors(bogus))

    if h_pat and r_pat and h_req and r_req and not bogus_accepted:
        record(6, "Source-linked handoffs and receipts", "PASS",
               "Both artifacts require a commit-shaped sourceCommit.")
    else:
        record(6, "Source-linked handoffs and receipts", "PASS-WITH-DEFECT",
               "Both schemas require sourceCommit, so the link is structurally present. "
               "But the constraint is asymmetric: handoff.sourceCommit is pattern-checked "
               f"as a hex commit ({h_pat!r}) while receipt.sourceCommit has no pattern "
               f"({r_pat!r}). A receipt can therefore name a workload commit that is not "
               "a commit at all, which defeats pinning for exactly the artifact that is "
               "supposed to be the durable audit record.",
               f"handoff_pattern={h_pat!r} receipt_pattern={r_pat!r} "
               f"receipt_accepts_'not-a-commit'={bogus_accepted}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--mobstack", required=True)
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args()
    ms = pathlib.Path(a.mobstack).resolve()
    if not (ms / "schemas").is_dir():
        sys.exit(f"not a MobStack checkout: {ms}")
    schemas = load_schemas(ms)

    for fn in (c1_evidence_classes, c2_id_integrity, c3_blocking_gates,
               c4_synthetic_separation, c5_human_decisions, c6_source_linked):
        fn(ms, schemas)

    if a.json:
        print(json.dumps(results, indent=2))
        return 0

    print(f"\nMobStack canary validation — workload: West African Mobility OS")
    print(f"MobStack checkout: {ms}\n")
    width = max(len(r["name"]) for r in results)
    for r in results:
        print(f"  [{r['status']:>17}]  {r['criterion']}. {r['name']}")
    print()
    for r in results:
        print(f"--- {r['criterion']}. {r['name']} — {r['status']}")
        print(f"    {r['detail']}")
        if r["evidence"]:
            print(f"    evidence: {r['evidence']}")
        print()
    fails = sum(1 for r in results if r["status"] == "FAIL")
    defects = sum(1 for r in results if r["status"] == "PASS-WITH-DEFECT")
    print(f"SUMMARY: {sum(1 for r in results if r['status']=='PASS')} pass, "
          f"{defects} pass-with-defect, {fails} fail, of {len(results)} criteria.")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
