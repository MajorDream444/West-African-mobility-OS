# MVP Evidence Remediation

**Status:** `VERIFIED` implementation record  
**Branch:** `codex/mvp-evidence-reconciliation`  
**Date:** 2026-09-08

## Controlled baseline

- `VERIFIED`: The remediation branch contains the separately committed governance approval and untouched AI Studio import.
- `VERIFIED`: Remote Mobility `main` at reconciliation was `6e2fb6013ce8431697919aef82127944e10a52fb`; it was merged into this remediation branch only.
- `REPORTED`: GitHub issues 3 in MobStack, HAMAL Mob Playbooks and West African Mobility OS, plus Major-AI-OS issue 31, synchronize the authority model supplied by Major Dream Williams.
- `VERIFIED`: MobStack `main` resolves locally to `2fd0ab8394cd907053e176dcbab44b196e6050ca`.
- `PROPOSAL`: Treat this branch as the first MobStack canary candidate after human review; it is not merged, deployed or publicly released.

## Implemented remediation

1. Canonical claims CSV and decision Markdown are parsed, validated and generated into typed application data.
2. Required fields, allowed evidence classes and duplicate claim/decision IDs fail generation.
3. Source scanning fails generation if application code redefines a canonical `CLM-*` or `DEC-*` ID.
4. `CONFLICT` is supported and unresolved conflicts create an explicit publication-blocked state.
5. Public FOB, landed-cost and savings output is suppressed while `CLM-012` and `CLM-013` remain unresolved.
6. Canonical decision language is generated directly from the register; superseded `CLM-008` remains visible as historical truth.
7. Candidate vehicles remain ten generic discovery slots. Specifications, prices, warranty and readiness are marked awaiting documentation.
8. Suppliers, leads, fleets, mechanics, workshops, organizations and tasks are quarantined as fictional `DEMO-*` records with reserved example contact data.
9. Diallo is labelled “Proposed Mauritania Market-Development Lead”; Senegal is a proposed complementary service, parts, training and quality-assurance hub.
10. Deposit, escrow, completion, pre-screening, academy, OEM, savings and external-sync representations were removed or explicitly blocked.
11. LocalStorage is labelled browser-only demonstration persistence and role switching is labelled simulation, not authentication.
12. Google/Firebase authentication and write services were removed from the remediation runtime.

## Verification evidence

| Check | Result |
|---|---|
| Governance generation | `VERIFIED`: 36 claims, 21 decisions; publication blocked |
| Lint/static validation | `VERIFIED`: passed |
| Type check | `VERIFIED`: passed |
| Unit/schema/gate tests | `VERIFIED`: 5 files, 11 tests passed |
| Production build | `VERIFIED`: passed |
| Route smoke | `VERIFIED`: `/` and `/internal-demo` returned HTTP 200 from local preview |
| Multilingual tests | `VERIFIED`: French, Arabic and English structures passed |
| Arabic RTL | `VERIFIED`: Arabic maps to `dir=rtl`; French and English map to `ltr` |

## Readiness judgment

- Internal demonstration: `PROPOSAL — SAFE WITH LABELS`. Use locally with the demonstration banner and no real data.
- Controlled stakeholder demonstration: `PROPOSAL — CONDITIONALLY SAFE`. A human presenter must state that prices, partnerships, authorizations, financing, deposits, training and operating readiness are unconfirmed or blocked.
- Public release: `OPEN — NOT SAFE`. Publication gates and production controls remain incomplete.
