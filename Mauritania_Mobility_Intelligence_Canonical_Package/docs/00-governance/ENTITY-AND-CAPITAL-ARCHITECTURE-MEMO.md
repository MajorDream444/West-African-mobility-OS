# Entity and Capital Architecture Memo v1.0

**Covers:** Deep-research questions Q6, Q7, Q10
**Prepared for:** Major Dream Williams
**Date:** 6 September 2026
**Status:** `PROPOSAL` throughout, subject to legal opinion in every named jurisdiction
**Decision use:** Structuring discussion and counsel scoping.

> This memo is program design, not legal or financial advice. I am not a lawyer or a financial adviser. Every structure below requires an opinion from qualified counsel in Mauritania, Senegal, the holding jurisdiction, and each jurisdiction where any investor is solicited or resident, before it is used.

---

## 1. The structuring fact everything else follows from

`VERIFIED` **Mauritania and Senegal are in different monetary, banking, and legal zones.**

| | Mauritania | Senegal |
|---|---|---|
| Currency | Ouguiya (MRU) | CFA franc (XOF) |
| Central bank | Banque Centrale de Mauritanie | BCEAO (regional) |
| Monetary union | None | UEMOA / WAEMU |
| Securities regulator | National | CREPMF (regional, UEMOA) |
| Business law | `OPEN` — OHADA membership must be confirmed by counsel, not assumed | OHADA member |

**Consequence:** a "corridor" is not one legal object. Any instrument, licence, deposit arrangement, or investor offering that spans both countries is **two regulatory problems**, plus one more for every diaspora jurisdiction touched. Structures must be designed country-first and only then linked, never designed regionally and pushed down.

`VERIFIED` Mauritania's practical company formation is fast: APIM operates as a one-stop shop with registration in **one to two days** (U.S. ITA). Importers must enrol in the **Central Importers Register**, hold an NIF above a value threshold, and declare through **ASYCUDA World**. Ministry of Trade import authorization is required in principle though not enforced at clearance.

---

## 2. Proposed entity map

Seven functions with genuinely different risk profiles are currently bundled in one idea. They should be separated. Each box below is a `PROPOSAL`.

```
                    ┌─────────────────────────────────┐
                    │   CORRIDOR VENTURE COMPANY      │
                    │   (holding jurisdiction TBD)    │
                    │   • Owns brand, IP, playbook    │
                    │   • Owns HAMAL licence          │
                    │   • Sets governance standards   │
                    │   • Holds minority in OpCos     │
                    └────────────┬────────────────────┘
                                 │  licence + standards, NOT control
        ┌────────────────────────┼────────────────────────┐
        │                        │                        │
┌───────▼────────┐      ┌────────▼─────────┐     ┌────────▼─────────┐
│ MAURITANIA     │      │  SENEGAL         │     │  HAMAL TECH      │
│ OPERATING CO   │      │  SERVICE/HUB CO  │     │  (separate)      │
│ MRU · locally  │      │  XOF · locally   │     │  • Software only │
│ majority-owned │      │  majority-owned  │     │  • Licences to   │
│ • Sales        │      │  • Training      │     │    OpCos         │
│ • Import       │      │  • Parts         │     │  • Never holds   │
│ • Workshop     │      │  • QA / certif.  │     │    inventory or  │
│ • Customer     │      │  • Regional      │     │    customer cash │
│   relationship │      │    re-export     │     └──────────────────┘
└───────┬────────┘      └──────────────────┘
        │ operates, does not own
┌───────▼──────────────────────────────────────┐
│  RING-FENCED ASSET SPVs (one per asset class)│
│  • Demonstration fleet    • Taxi fleet       │
│  • Parts inventory        • Workshop equip.  │
│  Each: own books, own investors, own risk    │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│  MARINE FOUNDATION — PARALLEL, NOT IN CHAIN  │
│  Education · convening · scholarships ·      │
│  apprenticeships · impact measurement        │
│  NO inventory, NO deposits, NO fleet         │
│  ownership, NO guarantees, NO trading risk   │
└──────────────────────────────────────────────┘
```

### Why each separation exists

| Separation | Risk it isolates |
|---|---|
| Corridor company ≠ country OpCo | IP and replication playbook survive the failure of any one country |
| Country OpCo ≠ asset SPV | A taxi-fleet investor does not bear inventory or warranty risk, and vice versa |
| Asset SPV ≠ asset SPV | Parts obsolescence does not contaminate fleet residuals |
| HAMAL ≠ everything | Software company holding customer cash or inventory acquires licensing and balance-sheet risk it should never have |
| Marine Foundation ≠ commercial chain | Charitable/educational status, donor trust, and government relationships are destroyed by commercial liability |
| Mauritania OpCo ≠ Senegal OpCo | Two currencies, two regulators; a single entity would be transacting cross-border FX as a matter of routine |

---

## 3. The Marine Foundation firewall — stated as testable rules

The sourcebook states what the Foundation must not do. Converting that into enforceable rules:

**The Foundation may:** run training curricula and certification; convene government, institutional, and community relationships; award scholarships and apprenticeships; measure and publish social impact; hold the training brand; receive grants and donations for education.

**The Foundation must not:** finance or hold vehicle inventory; accept customer deposits or preorders; own commercial fleets by default; import or trade vehicles; guarantee returns, repayment, or delivery; carry ordinary commercial liability; imply government mandates without written authority.

**Four bright-line tests, checkable by anyone:**

1. **Cash test** — no customer, buyer, or investor money ever passes through a Foundation account. If it does, the firewall has already failed.
2. **Balance-sheet test** — no vehicle, part, or inventory item appears as a Foundation asset.
3. **Signature test** — no Foundation officer signs a commercial supply, sales, financing, or guarantee document in a Foundation capacity.
4. **Language test** — no external material describes the Foundation as a partner, guarantor, or participant in the commercial venture. "Provides training and convening support" is the ceiling.

`PROPOSAL` Any commercial use of Foundation relationships or name requires a written, dated authorization naming the specific use and its expiry. Add this as a decision-register entry.

---

## 4. Ownership: how "African-owned" is made real rather than asserted

The corridor's constitutional claim is that this is an African-owned ecosystem using Chinese capability. That claim survives only if ownership is structural.

`PROPOSAL` **Design rules:**

1. **Country OpCos are majority locally owned from formation**, not converted to local ownership later. Retro-fitting local ownership after value accrues is where these structures usually fail their own stated intent.
2. **The corridor company holds a minority position plus a licence**, deriving return from IP licensing and services rather than from control.
3. **Asset SPVs open to local and diaspora participation only after the securities question is answered** (§5), and only per asset class.
4. **A defined pool of OpCo equity is reserved for the ownership ladder** at formation, so it is not negotiated from a position of weakness later.

### The ownership ladder needs legal content

The sourcebook's ladder — *learn → certify → perform → generate revenue → manage assets → earn ownership → train others* — is currently a sequence without instruments. Proposed content:

| Rung | Qualifying event | Instrument | Vesting | Forfeiture |
|---|---|---|---|---|
| Learn | Enrolment | None | — | — |
| Certify | Pass technical certification | Certificate; wage band | — | Lapses if recertification missed |
| Perform | 6 months at first-time-fix threshold | Performance bonus | Paid | None |
| Generate revenue | Named revenue responsibility | Profit share, % of unit margin | Quarterly | Ends with role |
| Manage assets | Runs a workshop cell or fleet block | Phantom equity in that cell | 3 years | Pro-rata retention on early exit |
| Earn ownership | Capital contribution + performance | Real equity in OpCo or SPV | 4 years | **Accrued portion retained** |
| Train others | Certifies next cohort unaided | Trainer equity uplift | On certification | None |

`PROPOSAL` **Two rules make this non-extractive:** accrued equity is *retained*, never reset for partial performance; and no rung requires the participant to take personal recourse debt to advance.

---

## 5. Investor and diaspora participation — the exposure, and the sequencing answer

`OPEN` This is the program's largest legal exposure and nothing here should be acted on without counsel.

### What could go wrong, specifically

| Activity | Risk |
|---|---|
| Public page inviting investment | May constitute solicitation in jurisdictions where the program holds no licence; the internet does not respect territorial scope |
| Selling SPV interests to Mauritanian or Senegalese individuals | May be a public offer of securities requiring prospectus/approval (Mauritania national regime; CREPMF in UEMOA) |
| Selling to diaspora in France, Spain, US, Gulf | Adds each investor's home regime, plus cross-border marketing rules |
| Taking customer preorder deposits | Consumer protection, refund obligations, delivery failure, currency movement; in some framings, receiving funds from the public |
| Promising returns from fleet income | Return-promise language converts a commercial arrangement into an investment product in most regimes |
| Holding customer or investor cash in an operating account | Custody and segregation obligations |

### The sequencing answer

`PROPOSAL` **Do not solve the capital question yet. Solve the commercial loop first.**

**Phase 0 — now.** No deposits. No investor solicitation. No returns language. No public investment page. No "reserve your vehicle with a payment" flow. Interest registration is free and non-binding, and says so on the page. Program funded by principal capital, or by a single accredited relationship documented under counsel.

**Phase 1 — after one complete loop.** Only once a vehicle has been landed, sold, serviced, a part supplied, a warranty honoured, and cash collected does the program have anything real to offer. Then obtain the scoping opinion and choose the narrowest lawful structure.

**Phase 2 — structured participation.** Likely shape, `PROPOSAL` only: a single-country, single-asset-class SPV; a small number of professional or qualified investors under a private-placement exemption; and **Islamic finance sourced from a licensed local institution rather than replicated in-house** — murabaha (institution buys the vehicle, resells at disclosed markup, buyer pays instalments) or ijara (institution leases, title transfers at term end). Sourcing from a regulated counterparty moves the licensing burden to a party that already carries it. That is the single most useful structuring insight in this memo.

**Counsel scoping questions:**
1. Does an interest in a ring-fenced taxi-fleet SPV constitute a security in Mauritania? In UEMOA/Senegal? In each target diaspora jurisdiction?
2. What structure lawfully permits a customer preorder deposit, and what refund, escrow, and disclosure terms are mandatory?
3. Can a licensed Mauritanian or Senegalese Islamic-finance institution originate murabaha/ijara for vehicles the OpCo supplies, and what does that require of the OpCo?
4. What are the FX and repatriation rules for MRU and XOF for capital in and profit out?
5. What KYC/AML obligations attach to the OpCos and to any SPV, and who is the responsible officer?

---

## 6. Anti-extraction mechanisms, made measurable

Four mechanisms convert the sourcebook's ten-question test from principle into metric. All `PROPOSAL`.

**1. Data rights as a contract term, before there is leverage to lose.**
The workshop registry, VIN service histories, customer records, and telematics are the corridor's durable asset. Country OpCo owns them. HAMAL processes under licence. No supplier, OEM, or investor receives raw customer or service data as a condition of participation. **Put this in the first supplier agreement**, when the program still has the freedom to insist.

**2. Local-content measured as margin capture, not headcount.**
Report, per period: percentage of gross margin per vehicle and per service event booked in the country OpCo versus offshore. Headcount rises easily while margin leaves; margin share is harder to game.

**3. Knowledge-retention test after every specialist rotation.**
Measure locally certified technicians, diagnostics completed without remote assistance, first-time-fix rate, and whether a local trainer can certify the next cohort unaided. **If capability degrades when the foreign specialist leaves, transfer did not occur** — and the training programme, not the trainee, has failed.

**4. Published corridor scorecard, quarterly.**

| Metric | Why it resists gaming |
|---|---|
| % gross margin retained in-country | Cannot be inflated by hiring |
| Locally certified technicians (cumulative) | Verifiable against certificates |
| Local trainers able to certify unaided | Binary, observable |
| Customer records owned by OpCo | Binary, contractual |
| Participants on the ownership ladder, by rung | Countable |
| Equity actually vested to local participants | Cash-verifiable |
| Diagnostics without remote assistance (%) | Logged in HAMAL |
| First-time-fix rate | Logged in HAMAL |

`PROPOSAL` Publish this quarterly, including when the numbers are poor. A scorecard published only when favourable is marketing; published unconditionally, it is governance — and it is the strongest possible answer to the charge that empowerment language covers an extraction model.

---

## 7. Immediate structuring actions

| # | Action | Owner | Blocks |
|---|---|---|---|
| S-01 | Confirm Mauritania's OHADA status and obtain the Investment Code | Counsel | All entity design |
| S-02 | Choose the holding jurisdiction for the corridor company against tax, treaty, and investor-acceptability criteria | Major + counsel | Corridor co. formation |
| S-03 | Draft the Marine Foundation firewall as a board-adopted policy with the four bright-line tests | Major + Foundation | Any Foundation involvement |
| S-04 | Obtain the securities/deposit scoping opinion (§5 questions 1–5) | Counsel | All capital raising |
| S-05 | Identify licensed Islamic-finance institutions in both countries and test appetite | Diallo + Senegal counterpart | Finance vertical |
| S-06 | Add the data-rights clause to the supplier EOI/RFP template now, before responses arrive | Program team | Supplier round |
| S-07 | Reserve the ownership-ladder equity pool in the OpCo formation documents | Counsel | OpCo formation |

---

*Prepared under the evidence discipline in `AGENTS.md`. Nothing here constitutes an appointment, exclusivity grant, joint venture, financing commitment, securities offering, or legal advice.*
