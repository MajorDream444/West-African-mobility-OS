# HAMAL Agent and Skill Architecture v1.0

**Prepared for:** Major Dream Williams
**Date:** 6 September 2026
**Status:** `PROPOSAL`
**Purpose:** Define the agent skills required to run the corridor as a repeatable system rather than a set of one-off documents.

---

## The design principle

The corridor's defensibility is **evidence discipline at speed**. Anyone can source vehicles. Almost nobody can maintain a claims register, a landed-cost model, a workshop registry, a supplier scorecard, and a publication gate across two countries, three languages, and a dozen counterparties — and still move fast.

That is what the skills are for. Each one encodes a rule that is currently held only in `AGENTS.md` and in your head, and it stops being enforced the moment you are not personally in the loop.

**Build order matters.** The gate skills come first, because they prevent damage. The production skills come second, because they create output. The scale skills come last, because they only matter once there is something to replicate.

---

## Tier 1 — Gate skills (build first; they prevent irreversible harm)

### 1. `corridor-language-gate`
**Triggers on:** any outbound material — supplier emails, briefings, portal copy, decks, letters, WhatsApp messages to Brother Ling, anything Diallo sends onward.

**Does:** scans for the specific failure modes in `AGENTS.md` before anything leaves. Flags: exclusivity or distributorship language without a written authorization on file; "our government partner" / implied mandate; export price presented as landed or retail price; interest registrations described as orders; deposit or return language; Marine Foundation described as a commercial participant; any number not traceable to a labelled claim.

**Why first:** this is the one class of error that cannot be walked back. A single email calling the program an "exclusive West Africa distributor" damages the OEM relationship, the Caetano relationship, and your credibility simultaneously — and it is a five-word mistake anyone on the team can make in a hurry.

---

### 2. `corridor-evidence-clerk`
**Triggers on:** any new fact arriving from any source — a supplier reply, a field photo, a customs quote, a press article, a WhatsApp voice note.

**Does:** classifies the claim (`VERIFIED` / `REPORTED` / `ASSUMPTION` / `PROPOSAL` / `OPEN`); writes a properly formed row into `data/claims-register.csv` with all thirteen required fields; runs the precedence test against existing claims; flags conflicts rather than silently overwriting; preserves superseded statements as historical truth; assigns a validation owner and a dated next action.

**Why first:** the register is the asset. Without automatic write discipline it decays into a stale CSV within a month, and every document downstream starts drifting from evidence.

---

## Tier 2 — Production skills (build second; they generate the deliverables)

### 3. `corridor-landed-cost`
**Does:** maintains the landed-cost model. Given an HS line, condition (new/used), CIF, and destination, computes duty, statistical fee, PCS, IMF, VAT, port, broker, transport, registration, inspection, and insurance; produces retail price at target margin; flags every input still carrying an `ASSUMPTION` label; refuses to output a "customer-facing price" until the customs-broker opinion is on file.

**Encodes the rule that matters:** used vehicles in Mauritania are valued on a *minimum importation value*, not invoice — so a model built on invoice price is wrong for the certified-used lane by construction.

---

### 4. `supplier-response-scorer`
**Does:** takes an incoming Chinese supplier response and scores it against the fifteen-item EOI/RFP requirement set (price, Incoterm, MOQ, lead time, warranty and territorial applicability, spare-parts package, diagnostics and software, manuals, training and remote support, marketing permissions, dealer qualifications, financing, homologation, export documents, known Mauritania restrictions). Produces a comparison matrix, a completeness percentage, and — critically — an **authority assessment**: is this respondent an OEM, an authorised export agent, or an independent trader, and what evidence supports that?

**Encodes the rule that matters:** the warranty follows the authority. A gray-market response and an OEM response can look identical on price and completely different on risk.

---

### 5. `field-evidence-intake`
**Does:** converts unstructured field material from Diallo — photos of lots, interview notes, voice memos, broker quotes, WhatsApp threads, in French, Arabic, or English — into structured register entries mapped to the twenty evidence-sprint questions. Reports coverage per question, flags where an answer is asserted without a source, and generates the next dated action list.

**Encodes the rule that matters:** an honest "unknown, here's who will find out and by when" scores higher than a confident unsourced answer. The skill should reward the former explicitly, so the incentive Diallo faces is to report accurately rather than impressively.

---

### 6. `workshop-registry-builder`
**Does:** builds and maintains the geolocated workshop, technician, auto-electrician, diagnostic-specialist, and parts-seller registry for Nouakchott and Dakar. Captures capability grade, tooling, brands serviced, diagnostic equipment, certification status, consent to be listed, and upskilling readiness for petrol / hybrid / EV platforms.

**Why this one is strategically outsized:** no such register exists in either country. Building it answers evidence-sprint questions 15 and 16, creates a genuine African-owned data asset, and is the credential that makes any OEM or institutional conversation serious. It is the least contested, highest-value thing the corridor can build in Phase 0.

---

## Tier 3 — Governance and scale skills (build once there is something to govern)

### 7. `anti-extraction-audit`
**Does:** runs the sourcebook's ten-question test against any proposed activity, deal, or supplier term, and maintains the quarterly corridor scorecard — margin retained in-country, technicians certified, local trainers certifying unaided, customer records owned by the OpCo, ladder participants by rung, equity actually vested, diagnostics without remote assistance, first-time-fix rate. Publishes unconditionally, including when results are poor.

### 8. `country-envoy-onboarding`
**Does:** instantiates the replication playbook for a new country lead — the role ladder, the twenty-question sprint localised to that market, the reporting cadence, the protocol rules, and the evidence bar for each promotion. Turns "how we developed Diallo" into a repeatable system rather than a one-off relationship.

### 9. `buyer-interview-synthesizer`
**Does:** turns the 25 buyer interviews into weighted attribute rankings per segment (affluent private, mining, government, NGO/contractor, family, taxi, diaspora), separating stated preference from revealed willingness to pay, and flagging sample size honestly.

### 10. `corridor-brief-composer`
**Does:** generates the audience-specific briefings already scoped in the NotebookLM prompt pack — Brother Ling / Chinese suppliers, Diallo, Chairman Tameo, investors — from the current state of the claims register, so every briefing is automatically consistent with current evidence and automatically passes the language gate.

---

## Build sequence

| Wave | Skills | Rationale |
|---|---|---|
| **Wave 1 — now** | `corridor-language-gate`, `corridor-evidence-clerk` | Prevent irreversible damage; protect the register |
| **Wave 2 — with the sprint** | `field-evidence-intake`, `corridor-landed-cost` | The sprint and the supplier round are both live |
| **Wave 3 — supplier round** | `supplier-response-scorer`, `workshop-registry-builder` | Responses arrive; the registry is the Phase 0 asset |
| **Wave 4 — post-pilot** | `anti-extraction-audit`, `corridor-brief-composer` | Governance needs something to measure |
| **Wave 5 — replication** | `country-envoy-onboarding`, `buyer-interview-synthesizer` | Only useful once one country works |

---

## What these are not

None of these skills makes a commercial decision. They enforce discipline, structure evidence, and prevent language errors. **Every gate they raise is a prompt for a human judgement, not a substitute for one** — and the decision of whether to proceed past a hard gate stays with you.

---

*Prepared under the evidence discipline in `AGENTS.md`.*
