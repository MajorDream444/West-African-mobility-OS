# Data Rights Policy

**Status:** `PROPOSAL`
**Parent:** [`MOBILITY-VENTURE-FOUNDRY.md`](../../MOBILITY-VENTURE-FOUNDRY.md) §3.2–3.4, §6
**Applies to:** HAMAL, every foundry venture, every operating cell, every agent, and every application built from this repository

---

## Why this document exists before the platform does

The corridor's data layer is a genuine African-owned asset — the workshop registry, the technician credential record, the vehicle service history, the parts and quality data. It is also the single easiest thing in this entire programme to turn into extraction.

The pattern is well known: a platform provides useful infrastructure to small local businesses, accumulates their customer relationships and operating data as a byproduct, and eventually holds more value than the businesses it serves. Nobody decides to do this. It happens by default, one reasonable-seeming permission at a time.

**This policy is written first so that the default is set before the incentive arrives.**

---

## 1. The rights map

| Data | Belongs to | Platform's right |
|---|---|---|
| Customer identity and contacts | The venture | Process on the venture's instruction only. No independent use. No marketing. No transfer. |
| Customer service history | The customer, held by the venture | Process; surface to the customer on request; move with the vehicle on transfer at the owner's instruction |
| Vehicle record and VIN history | The current vehicle owner | Maintain; export to the owner on request |
| Technician credential and assessment | The technician | Maintain; verify to third parties **only with that technician's consent** |
| Technician performance record | The technician, generated in the venture's work | Use for the technician's own progression; aggregate only under §3 |
| Venture commercial terms and pricing | The venture | **None.** Not visible to the foundry, other tenants, or country nodes. |
| Venture aggregate quality metrics | The venture | Aggregate under §3 for benchmarks and the corridor scorecard |
| Workshop registry entry | The workshop | Publish only with explicit, revocable, listed consent |
| Parts and procurement volumes | The venture | Pool quantities under §3; requesting venture's customers and pricing never exposed |
| Contribution ledger entries | The participant | Maintain; the participant may inspect, dispute, and export at any time |
| Claims register | The programme | Public within the programme; external use gated by the language gate |

**Anything not listed here is not granted.** Silence is a refusal, not a permission.

---

## 2. Consent

Consent must be **informed, specific, revocable, and recorded** before collection — not after, and not inferred from the fact that someone accepted service.

**Informed** means explained in a language the person reads or speaks fluently — Arabic, French, English, Hassaniya, Wolof, or Pulaar as appropriate — in plain terms, including what happens if they say no. Where literacy is a constraint, verbal consent with a recorded explanation is valid; a signature on an unread document is not.

**Specific** means per purpose. Consent to a service record is not consent to a benchmark, a marketing list, a public registry listing, a credential disclosure, or a research dataset.

**Revocable** means revocable in practice: a stated channel, a defined turnaround, and no service penalty for revoking anything that is not operationally required to deliver the service they asked for.

**Recorded** means an entry in the consent registry (Tier 0) with subject, purpose, scope, language, date, method, and the identity of the person who took it.

**Saying no is free.** No participant is refused training, no technician is refused work, and no customer is refused service for declining any optional data use. Where a data use genuinely is required to deliver the service, that is stated as such and limited to what is genuinely required.

**Children and vulnerable participants:** apprentices under the age of majority require guardian consent in addition to their own, and their records carry restricted disclosure by default.

---

## 3. Derived and aggregate use

Aggregate analysis is where good intentions leak. Four hard rules:

1. **Minimum cohort.** No aggregate is published or shared where any individual venture, workshop, or technician is identifiable, directly or by elimination. Small-market re-identification is real: in a city with four EV-capable workshops, "the average of the other three" identifies the fourth.
2. **Purpose limitation.** Aggregates serve the stated purpose — benchmarking, scorecard, curriculum improvement, procurement pooling. Not competitive intelligence against a tenant, not partner marketing, not investor material that exposes tenant-level detail.
3. **Opt-out without penalty.** Any venture or technician may withdraw from benchmarking. They lose the benchmark; they lose nothing else.
4. **No model training on tenant data without separate, specific consent.** Including for HAMAL's own agents. If corridor data is used to train or fine-tune a model, that is a distinct purpose requiring distinct consent, a recorded governance decision, and a stated benefit to the data subjects.

---

## 4. Portability and exit

**The exit right is the anti-extraction guarantee.** It is not conditional on good standing, settled invoices, or amicable departure.

Every venture may export, in machine-readable form, at any time, without cost or approval: customer records and contacts, service and work-order history, vehicle records, parts and pricing configuration, staff credential references, and quality-metric history.

Every participant may export, at any time, permanently, including after leaving: credential record with assessor and date, training record, performance record, and contribution-ledger entries.

Every vehicle owner may export their vehicle's full service history at any time.

**Exit does not delete.** A departing venture's records are exported and then retained only as required for warranty, safety, legal, and audit obligations, minimised to those purposes, with the retention basis recorded.

**Verification duty:** the export path is tested at least annually and the test result published. An untested export right is a promise, not a right.

---

## 5. Security and access

- Least privilege by default; access granted by role and scope, never by seniority.
- Every access to customer-identifying data is logged, and the log is available to the tenant.
- Cross-tenant access only via the four enumerated mechanisms in [`SHARED-SERVICES-ARCHITECTURE.md`](./SHARED-SERVICES-ARCHITECTURE.md).
- Foundry staff, including programme leadership, hold no standing access to tenant customer data. There is no "founder override."
- Breach: contain, assess, notify affected subjects and tenants promptly in their language, record in the governance register, publish in the quarterly scorecard.

---

## 6. Jurisdiction

Mauritanian and Senegalese data-protection law, sectoral regulation, and any applicable regional instrument govern, and are **`OPEN` pending local legal review in each country**. This policy sets a floor of practice; it does not substitute for that review. Where local law requires more, local law wins. Where local law requires less, this policy still applies.

Cross-border transfer — including any hosting outside the country of collection — requires a recorded lawful basis, subject notification, and a governance decision. **Data localisation is assessed per country, not assumed.**

---

## 7. Prohibited uses

The platform, its operators, and its agents may not:

1. Use a venture's customer data to compete with that venture, or to route its customers elsewhere.
2. Sell, rent, or broker customer, technician, or workshop data.
3. Condition platform access on granting rights beyond §1.
4. Publish a workshop, technician, or business in any registry without that party's specific, revocable consent.
5. Use participant performance data in a way not disclosed to that participant.
6. Retain data after an export request beyond the minimised legal, safety, warranty, and audit basis.
7. Train models on tenant or participant data absent §3.4 consent.
8. Represent aggregate or derived figures externally without the language gate and the claims register — a dashboard number is a claim like any other.
9. Use consent obtained for one venture to justify processing for another.
10. Treat silence, continued use, or an unread document as consent.

---

## 8. Enforcement

- The `data-rights-auditor` skill blocks cross-tenant reads outside the enumerated mechanisms and flags derived uses lacking a consent basis. It raises the gate; a named human resolves it.
- Compliance is audited quarterly and published in the anti-extraction scorecard, including failures.
- A participant, venture, workshop, or customer may raise a data-rights complaint to a named contact, with a defined response time and an escalation path that does not run only through the person complained about.
- A breach of §7 by a venture is grounds for suspension of platform access. A breach of §7 by the platform is grounds for a governance decision, publication, and remediation — held to the same standard, not a lower one.

---

*This policy is `PROPOSAL` status and requires legal review in Mauritania and Senegal before any real personal data is collected. Until that review is complete and recorded, collection is limited to the minimum required for the evidence sprint, under explicit consent, and no cross-tenant or derived use occurs.*
