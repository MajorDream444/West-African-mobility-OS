# Foundry Agent Workflow

**Status:** `PROPOSAL`
**Parent:** [`MOBILITY-VENTURE-FOUNDRY.md`](../../MOBILITY-VENTURE-FOUNDRY.md) §8
**Interfaces:** Major-AI-OS / MAIM (human doctrine) · HAMAL_MOB_PLAYBOOKS (operating doctrine) · MobStack (execution engine) · this repository (first industry implementation)

---

## What we are adapting, and what we are not

The G-Stack pattern is useful for one specific reason: it treats AI as an **opinionated operating team** rather than a blank chatbot. Work moves `Think → Plan → Build → Review → Test → Ship → Reflect`, with specialist roles — founder review, engineering planning, design review, QA, security, release, investigation, retrospective — and **each stage produces artifacts the next stage consumes**.

That operating pattern is what we adapt. Its software is not.

What we build instead is ours, and it is assembled from four **separate** layers that must not be spoken of as one:

| Layer | Develops | Home |
|---|---|---|
| **MAIM** | The person — confidence, context, direction, experimentation, AI literacy, builder mindset | Major-AI-OS |
| **HAMAL** | The operating system — context, agents, skills, tools, playbooks, rubrics, MOBS | HAMAL_MOB_PLAYBOOKS |
| **MobStack** | Execution — runs the approved HAMAL workflows, applies gates, emits receipts | Mobstack |
| **Industry OS** | Application — this corridor's evidence, decisions, claims, counterparties, pilots | this repository |

There is no combined "HAMAL Major AI Mindset layer." MAIM and HAMAL are coordinated and distinct: **MAIM develops the builder; HAMAL encodes the operating wisdom; MobStack executes the method; the Industry OS proves it in the real world.** That distinction should read identically in all four repositories.

Why the doctrine layer is decisive: a skill is a documented method, while a playbook decides *why, when, with what tools, in what order, for what outcome, and how quality is judged*. G-Stack contributes a stage sequence. HAMAL contributes the doctrine that makes each stage produce business value rather than output. Without it, a foundry agent workflow is a very well-organised way to generate documents nobody uses.

**MobStack is built as an original system, not a fork.** Architectural patterns are borrowed with clear attribution; the constitution, lifecycle, commands, schemas, and operating philosophy are native to MAIM and HAMAL. A wholesale fork would import software-shipping assumptions that do not fit venture formation, carry someone else's vocabulary, create upstream maintenance pressure, and leave MobStack permanently reading as "modified G-Stack."

G-Stack helps teams ship software. **MobStack helps people build defensible ventures and acquire the capacity to own them.** That is the departure.

---

## Stage mapping

| G-Stack pattern | Foundry adaptation | Produces | Consumed by |
|---|---|---|---|
| Office Hours | **Founder and opportunity interrogation** | Signal note, founder record extract | V1 thesis |
| CEO Review | **Venture thesis and ownership review** | Venture charter, ownership pathway proposal | G2 panel |
| Engineering Review | **Operations, data, and technical architecture** | Operating design, shared-services plan, data-rights draft | G3 panel |
| Design Review | **Customer journey and local-market review** | Journey map, language and access review, inclusion check | G3 panel |
| Security Review | **Evidence, privacy, financial, and relationship audit** | Risk register, consent design, lane check, language-gate pass | G3 panel |
| Build | **Controlled business or product experiment** | Operating cell, SOPs, credentialed crew, live tenant | G4 panel |
| QA | **Field validation with real customers** | Work-order evidence, quality metrics, defect log | G4 panel |
| Ship | **Limited commercial pilot** | Pilot charter with stop-loss, live customers | G5 panel |
| Canary | **Small fleet, workshop, or geography test** | Bounded pilot results, realised unit economics | G5 panel |
| Review | **Performance and governance audit** | Scorecard contribution, governance findings | Quarterly review |
| Retrospective | **Cohort learning and playbook improvement** | Lessons, playbook deltas, curriculum changes | Next cohort |
| Documentation | **Country replication package** | Node playbook, localised sprint, evidence bar | `country-envoy-onboarding` |

**The artifact chain is the mechanism.** A stage that produces no artifact the next stage consumes is theatre. If a review cannot name what it hands forward, it should not be run.

---

## The founder's actual experience

A founder entering the foundry does not open an empty chat. They enter:

```mermaid
flowchart TD
    A["Founder enters with a signal"] --> B["Interrogation agent<br/>structured questioning against the signal bar"]
    B --> C["Corridor data injected<br/>claims register · workshop registry · landed cost · track catalog"]
    C --> D["Thesis agent<br/>drafts charter · flags unlabelled claims"]
    D --> E["Language gate<br/>blocks exclusivity · price · mandate errors"]
    E --> F["Gate pack assembled<br/>completeness scored"]
    F --> G["HUMAN PANEL DECIDES"]
    G -->|Pass| H["Next stage · artifacts carried forward"]
    G -->|Hold / Redirect / Stop| I["Recorded with rationale · lesson archived"]
```

The founder gets specialist agents, templates, tests, operating standards, and **real corridor data** — not generic startup advice. That is the difference between a foundry and a prompt library.

---

## Agent roster

### Inherited gates (already specified, unchanged)
`corridor-language-gate` and `corridor-evidence-clerk` run across every stage of this workflow. Nothing leaves any stage without passing the language gate; nothing enters the record without the evidence clerk. See [`HAMAL-AGENT-SKILL-ARCHITECTURE.md`](../../Mauritania_Mobility_Intelligence_Canonical_Package/docs/06-agents/HAMAL-AGENT-SKILL-ARCHITECTURE.md).

### Foundry additions

| Skill | Stage | Does | Never does |
|---|---|---|---|
| `founder-interrogator` | Office Hours | Structured questioning of signal and founder readiness against the published bar; separates observation from assertion | Judge the person |
| `venture-gate-assembler` | All gates | Assembles the pack, scores artifact completeness, flags unlabelled claims and missing sources | Vote, or score the decision |
| `founder-ledger-clerk` | Continuous | Maintains the contribution ledger; refuses unsourced entries; reconciles before any S6 instrument | Create ownership |
| `cohort-inclusion-monitor` | Continuous | Tracks and publishes coverage gaps by gender, age, geography, access, disability | Set quotas silently |
| `data-rights-auditor` | Engineering + Security review | Verifies consent basis for every derived use; blocks cross-tenant reads outside the four mechanisms | Grant an exception |
| `pilot-canary-watch` | Canary | Monitors pilot metrics against the pre-set stop-loss; raises when a bound is crossed | Stop the pilot itself |
| `retro-compiler` | Retrospective | Compiles cohort lessons into playbook and curriculum deltas | Decide what changes |

**Every skill's "never" column is load-bearing.** Agents enforce discipline, structure evidence, and prevent language errors. Every gate they raise is a prompt for a human judgement, not a substitute for one.

---

## MOB assignment

Mapping the foundry's work onto the twelve MOBS in the MobStack doctrine, so no output is an orphan and no agent is without a Mob:

| MOB | Foundry ownership |
|---|---|
| **Maestros** | Workflow orchestration, gate scheduling, artifact routing, HAMAL sync |
| **Artisans** | Quality metrics, benchmarks, corridor scorecard, landed-cost modelling |
| **Visionaries** | Corridor thesis, node sequencing, industry portability beyond mobility |
| **Strategists** | Venture tracks, demand evidence, pricing, market expansion |
| **Vanguards** | Data rights, consent, security, permissions, the language gate |
| **Guardians** | Public trust, disclosure discipline, incident and crisis response |
| **Provocateurs** | Cohort recruitment, corridor visibility, demand aggregation |
| **Dreamweavers** | Narrative, local content, founder storytelling, brand |
| **Innovators** | Product, diagnostics tooling, prototypes, platform features |
| **Revolutionaries** | Structural change — ownership models, driver-to-owner, cooperative forms |
| **Luminaries** | Curriculum, mentorship, train-the-trainer, S7 succession |
| **Avant-Garde** | EV and energy transition signals, regional and technology frontier |

---

## Repository interface

Four repositories, four distinct jobs. Keeping them distinct is what prevents doctrine drift.

| Repository | Canonical responsibility | Must not become |
|---|---|---|
| **Major-AI-OS** | MAIM worldview, founder mindset, education, communication, brand, human-development doctrine | A mobility operations database |
| **HAMAL_MOB_PLAYBOOKS** | Reusable context, playbooks, SOPs, MOBS, industry systems, rubrics, audits, agent doctrine | A live application runtime |
| **Mobstack** | Installable agent execution engine: loads context, runs skills, applies gates, produces evidence-backed artifacts | A duplicate playbook library |
| **West-African-mobility-OS** (this repo) | First industry implementation: mobility evidence, decisions, claims, counterparties, pilots, registries, application code | The universal HAMAL framework |

### Direction of authority and direction of learning

These are **two different directions**, and conflating them was an error in the first draft of this document.

```mermaid
flowchart TD
    A["Major-AI-OS<br/>Human doctrine"] --> C["MobStack<br/>Execution engine"]
    B["HAMAL MOB PLAYBOOKS<br/>Operating doctrine"] --> C
    C --> D["West African Mobility OS<br/>First implementation"]
    D --> E["Field evidence and lessons"]
    E -->|"Reviewed pull requests"| B
```

- **Authority and policy flow downward.** MAIM and HAMAL doctrine bind MobStack; MobStack binds the Industry OS.
- **Field evidence and lessons flow upward**, and only as *proposals*, through a reviewed pull request.
- **Field experience cannot automatically modify universal doctrine.** One experimental corridor decision must never silently become a universal rule binding every future industry.
- **MobStack executes rules; it does not originate the founder philosophy.**
- **The Mobility OS owns mobility facts; it does not redefine HAMAL.**

**Precedence when documents conflict:** for mobility-specific facts, claims, counterparties, and corridor decisions, this repository's `AGENTS.md` and `SOURCE-OF-TRUTH.md` are authoritative. For universal doctrine — founder philosophy, playbook structure, agent doctrine, rubric standards — HAMAL is authoritative and this repository conforms. A conflict is recorded and escalated upward, never resolved by whoever edited last.

**Porting note:** the foundry stage map and agent roster above are written to be lifted into MobStack as an execution *pattern*, and the generalisable doctrine into HAMAL_MOB_PLAYBOOKS as a *proposal* — see [`UPSTREAM-CANDIDATES.md`](./UPSTREAM-CANDIDATES.md) for what qualifies and when. Neither may be copied upstream word-for-word before the corridor proves which parts are genuinely universal. This session has read-only access to both repositories, so neither has been modified.

---

## Cross-surface operating model

The same unified model runs across Claude Cowork, Claude Code, Codex, Google AI Studio, and the HAMAL skills:

| Surface | Role in the foundry |
|---|---|
| **Claude Cowork** | Operator surface — cohort management, gate packs, briefings, founder interrogation |
| **Claude Code** | Repository surface — canonical documents, registers, evidence discipline, platform code |
| **Codex** | Implementation surface — hardening prototypes into production platform services |
| **Google AI Studio** | Prototype surface — one-shot MVP and demonstration builds. **Not automatic canonical authority:** its output passes a truth gate before entering canonical code |
| **Claude Design** | Experience design, brand expression, interfaces, diagrams, presentation systems |
| **NotebookLM** | Source-grounded critique, briefings, second-brain analysis |
| **MobStack** | Cross-agent execution, handoffs, gates, receipts, and workflow enforcement |
| **HAMAL skills** | Enforcement surface — gates, clerks, auditors running continuously across all of the above |

**One rule holds across all five:** no execution without context. Every surface reads this repository's constitution, `AGENTS.md`, and `SOURCE-OF-TRUTH.md` before acting. An agent without context is a chatbot; an agent with context, playbooks, tools, and rubrics is a digital employee.

---

## Every run leaves a trace

Adopted from HAMAL operating doctrine — every meaningful run must leave behind:

- a commit
- a changelog note
- a memory update
- a Mob assignment
- a suggested next action
- a link back to source material
- a handoff
- a lesson

No orphan outputs. No anonymous tools. No agent without a Mob. No workflow without a playbook. No memory without source. No automation without safety boundaries.

---

*This workflow is `PROPOSAL` status. The agent roster describes skills to be built, not skills currently operating.*
