# Google AI Studio One-Shot MVP Prompt

Copy the complete prompt below into Google AI Studio after connecting this repository.

---

You are the lead product designer and full-stack engineer for **West African Mobility OS**.

Build a polished, functional, responsive MVP directly in this connected GitHub repository.

## 1. Read the repository before writing code

First inspect and follow:

- `README.md`
- `VISION.md`
- `Mauritania_Mobility_Intelligence_Canonical_Package/AGENTS.md`
- `Mauritania_Mobility_Intelligence_Canonical_Package/docs/00-governance/SOURCE-OF-TRUTH.md`
- `Mauritania_Mobility_Intelligence_Canonical_Package/docs/00-governance/DECISION-REGISTER.md`
- `Mauritania_Mobility_Intelligence_Canonical_Package/docs/01-supplier/CHINA-SUPPLIER-EOI-RFP.md`
- `Mauritania_Mobility_Intelligence_Canonical_Package/docs/02-field/DIALLO-20-QUESTION-EVIDENCE-SPRINT.md`
- `Mauritania_Mobility_Intelligence_Canonical_Package/docs/03-research/MAURITANIA-MARKET-BASELINE-v0.1.md`
- `Mauritania_Mobility_Intelligence_Canonical_Package/docs/04-product/PORTAL-DASHBOARD-AND-CRM-BRIEF.md`
- `Mauritania_Mobility_Intelligence_Canonical_Package/docs/05-playbook/COUNTRY-ENVOY-REPLICATION-PLAYBOOK.md`
- `Mauritania_Mobility_Intelligence_Canonical_Package/data/claims-register.csv`

The repository is canonical. Do not rewrite governance, roles, facts, prices, relationships, or commitments.

## 2. Constitutional thesis

The product must make this unmistakable:

> This is not a Chinese vehicle dealership staffed by Africans. It is an African-owned commercial and entrepreneurial ecosystem that selectively uses Chinese products, technology, finance, training, and expertise to accelerate total local capacity.

Vehicles are the practical entry point. The larger system develops African entrepreneurs, technicians, workshops, parts operators, fleet managers, data stewards, financiers, and country builders.

## 3. MVP goal

Create one application with two clearly separated experiences:

### A. Public market-validation portal

A credible public-facing experience for:

- Individual vehicle buyers
- Institutional and fleet buyers
- Mechanics and apprentices
- Workshops and service partners
- Government, development, and strategic partners

### B. Private operator dashboard

A protected demonstration workspace for Major Dream Williams and authorized operators to review:

- Demand
- Supplier proposals
- Candidate vehicles
- Mechanics and workshops
- Evidence and claims
- Decisions and tasks
- Service readiness
- Landed-cost scenarios

This is a demonstration MVP using realistic seeded mock data. It is not a live dealership, transaction platform, government portal, or investment offering.

## 4. Technical implementation

If an application stack already exists, preserve and extend it.

If no application stack exists, create:

- React
- TypeScript
- Vite
- Tailwind CSS
- Accessible component primitives
- Lucide icons
- Recharts only where a chart materially helps
- React Router
- Local typed mock data
- LocalStorage only for demo form submissions and interface state
- No external database required
- No API keys required
- No real authentication required

Provide:

- Clean component architecture
- Typed data models
- Responsive layouts
- Empty, loading, success, and error states where relevant
- Form validation
- Accessible labels and keyboard behavior
- A complete README section with install, run, build, and demo instructions
- `.env.example` only if truly needed
- No broken links, missing routes, placeholder pages, or console errors

Use a simulated role switch for the private demonstration. Do not claim that it provides production security.

## 5. Brand and experience

Create a premium African infrastructure and mobility identity.

Visual direction:

- Deep indigo/navy
- Warm sand and stone
- Restrained gold accent
- Small amount of Senegal green and Mauritania green where useful
- High-contrast typography
- Editorial photography placeholders or tasteful CSS/image treatments
- Map and corridor motifs
- Spacious, institutional layouts
- Strong mobile experience
- Subtle transitions

The product should feel locally grounded, modern, trustworthy, and commercially serious.

Do not use:

- Charity aesthetics
- Foreign-savior framing
- Generic robots
- Fake government seals
- Invented OEM or partner logos
- Supercar fantasy imagery
- Unsupported flags, approvals, or certifications
- Language portraying Africans as disposable workers

## 6. Navigation

### Public navigation

- Home
- Explore Vehicles
- Fleet & Institutions
- Workforce
- Workshops
- How It Works
- Corridor Vision
- Status & Disclosures
- Operator Demo

### Private navigation

- Command Center
- Demand CRM
- Organizations & Fleets
- Vehicle Pipeline
- Supplier Proposals
- Landed Cost
- Workforce
- Workshops
- Service Readiness
- Evidence & Claims
- Decisions
- Tasks
- Country Nodes

## 7. Public pages

### Home

Build a compelling hero around:

**Mobility that builds local capacity.**

Supporting copy should explain that West African Mobility OS connects vehicle discovery with service readiness, technical education, local enterprise, and evidence-led market development.

Primary calls to action:

- Find Your Vehicle
- Request Fleet Information
- Join the Automotive Workforce
- Register Your Workshop

Include:

- Mauritania as the controlled first market-development node
- Senegal as a proposed complementary mobility, training, and service hub
- A corridor model that may later expand through verified country nodes
- A visual ecosystem section connecting vehicles, parts, mechanics, workshops, fleets, data, and ownership
- A clear “Current status” panel showing that the project is in supplier discovery and evidence validation

### Explore Vehicles

Create a filterable catalogue with 10 clearly fictional or generic candidate records across:

- Rugged SUV / 4x4
- Family crossover
- Sedan
- Pickup
- Van / light commercial
- Hybrid
- EV demonstration candidate
- Certified used vehicle

Do not present invented brands as real supplier commitments. Use labels such as:

- Candidate Model A
- Desert SUV Concept
- Urban Hybrid Candidate
- Fleet Pickup Candidate

Each card must show:

- Category
- Powertrain
- Intended use
- Seat count
- Drivetrain
- Status badge
- Evidence classification
- Indicative export-price placeholder or “Awaiting supplier quotation”
- Service-readiness score
- “Register Interest” action

Add a comparison drawer for up to three vehicles.

### Vehicle detail

Include:

- Use-case summary
- Specifications
- What is known
- What is still open
- Indicative landed-cost breakdown
- Warranty and parts status
- Technician and diagnostic readiness
- Evidence sources
- Non-binding interest form

Clearly label all mock data.

### Fleet & Institutions

Provide fleet pathways for:

- Mining
- Construction
- Logistics
- Government/public projects
- Banks and corporate users
- NGOs and international organizations
- Taxi and managed mobility

Include a structured fleet inquiry form capturing organization, role, use case, fleet size range, geography, operating conditions, acquisition timing, financing interest, service expectations, and contact permission.

Do not describe submission as an order or contract.

### Workforce

Present mechanics and apprentices as future entrepreneurs and capacity builders.

Show pathways:

- Apprentice
- Certified technician
- Lead diagnostic technician
- Workshop operator
- Mobile-service entrepreneur
- Trainer
- Country technical leader

Include a registration form capturing current skills, languages, location, experience, certifications, specialties, tools, training interests, availability, and consent.

Include the progression:

`learn -> certify -> perform -> generate revenue -> manage assets -> earn ownership -> train others`

### Workshops

Explain the service-network vision and allow workshops to register:

- Location
- Ownership
- Lifts/bays
- Tools
- Diagnostics
- Electrical capability
- Hybrid/EV readiness
- Parts storage
- Languages
- Technician count
- Fleet-service capability
- Training interest

### How It Works

Show the controlled loop:

1. Suppliers propose candidate models and support packages.
2. Operators review evidence and commercial terms.
3. Approved candidates appear publicly.
4. Buyers and fleets register non-binding interest.
5. Operators qualify demand.
6. Landed cost and service readiness are reviewed.
7. A controlled readiness decision is made.
8. Future orders occur only after legal and commercial gates are complete.

### Corridor Vision

Explain:

- African-owned ecosystem
- Mauritania market-entry node
- Senegal complementary service and mobility node
- Country-leader development
- Marine Foundation's education and convening lane
- Future commercial venture and ring-fenced SPVs
- HAMAL as the proposed intelligence and provenance layer

Spell **HAMAL** exactly. HAMAL represents Hanzo, Art Mob AGInts, and Lux.

### Status & Disclosures

Display a visible status matrix:

- Supplier discovery: Active
- Candidate models: Under review
- Final landed prices: Not established
- OEM authorization: Not represented
- Government mandate: Not represented
- Deposits: Not accepted
- Public investment: Not offered
- Commercial SPV: Proposed
- Mauritania evidence sprint: Active
- Senegal partnerships: Proposed / evidence required

Explain the five evidence labels: VERIFIED, REPORTED, ASSUMPTION, PROPOSAL, OPEN.

## 8. Private dashboard

Use seeded data to make every view functional.

### Command Center

Show:

- Qualified individual interests
- Fleet opportunities
- Candidate vehicles
- Supplier proposals
- Mechanic candidates
- Workshops mapped
- Open evidence gaps
- Decisions awaiting review
- Overdue tasks
- Service-readiness average

Use scenario numbers clearly labeled **Demo data**.

Add:

- Buyer funnel
- Service-readiness radar or compact chart
- Evidence classification distribution
- Priority action list
- Recent activity

### Demand CRM

Create a filterable table and detail drawer with stages:

- New interest
- Contacted
- Qualified
- Landed-cost review
- Service-readiness review
- Future reservation eligible
- Closed / not proceeding

Do not use “order” for early-stage records.

### Organizations & Fleets

Show demo organizations across mining, logistics, banks, NGOs, government/public projects, taxi operators, and corporate buyers. Mark all organizations as fictional demonstration records.

### Vehicle Pipeline

Use stages:

- Supplier proposed
- Evidence review
- Cost review
- Service review
- Approved for validation
- Paused
- Rejected

Allow operators to inspect the evidence and blocking gates for each vehicle.

### Supplier Proposals

Compare fictional supplier responses across:

- Export price
- Currency
- Incoterm
- MOQ
- Lead time
- Warranty
- Parts package
- Diagnostics
- Training
- Remote support
- Homologation documents
- Quote validity
- Evidence status

No supplier should be portrayed as appointed or authorized for Mauritania.

### Landed Cost

Build an interactive scenario calculator with editable demo inputs:

- Export price
- Inland China logistics
- Ocean freight
- Insurance
- Customs duty
- Taxes
- Port charges
- Inspection
- Registration
- Local preparation
- Parts reserve
- Warranty reserve
- Currency contingency

Show export price, landed cost, road-ready cost, and scenario confidence separately.

Display a warning that the calculator is illustrative and requires local customs, tax, and legal verification.

### Workforce and Workshops

Provide searchable tables, profiles, assessment status, skills, language capability, training pathway, readiness, and next actions.

### Service Readiness

Score each candidate vehicle across:

- Parts
- Diagnostics
- Manuals
- Warranty
- Lead technicians
- Workshop capability
- Recovery/roadside support
- Remote technical support
- Hybrid/EV capability where applicable

Explain every score; do not hide the components behind a single unexplained percentage.

### Evidence & Claims

This is a core feature.

Create:

- Claims table
- Classification filters
- Source, source date, owner, geography, commercial lane, confidence, status, validation owner, next action, and last-reviewed fields
- Claim detail drawer
- Evidence links/placeholders
- Conflict history
- Current-truth indicator
- Public/private visibility
- “Publication blocked” state

Demonstrate the lifecycle:

`source recorded -> claim classified -> conflict checked -> authority resolved -> current truth updated -> historical truth preserved -> downstream surfaces protected`

Seed the following correction:

- Historical reported statement: “The LOI is for approximately 10 vehicles.”
- Current decision: “The EOI requests proposals for approximately 10 candidate vehicle models; it is not a purchase commitment.”

The historical statement must remain visible while the current decision controls the public product.

### Decisions

Seed the current decisions from the canonical decision register. Add owner, rationale, affected surfaces, date, and status.

### Tasks

Create a practical Phase 0 board organized around:

- Brother Ling / supplier channel
- Diallo evidence sprint
- Market and buyer research
- Import and landed-cost validation
- Workshop and mechanic mapping
- Service and parts readiness
- MVP validation

### Country Nodes

Show:

- Mauritania: Active evidence node
- Senegal: Proposed complementary hub
- Other West African countries: Future / unvalidated

Include country readiness dimensions without inventing market facts.

## 9. Seed data rules

Create enough mock data for the application to feel alive:

- 10 candidate vehicles
- 4 fictional supplier proposals
- 18 individual buyer interests
- 7 fictional institutional/fleet interests
- 20 mechanic candidates
- 10 workshops
- 14 evidence claims
- 8 decisions
- 16 tasks
- 2 country nodes

Every seeded commercial record must be visibly labeled as demo, fictional, illustrative, reported, assumed, proposed, or open.

Do not invent real people beyond the roles explicitly documented in the repository.

## 10. Language readiness

Provide an interface language switcher for:

- English
- French
- Arabic

Implement complete navigation, key headings, actions, form labels, and disclosures for all three languages. Use RTL layout for Arabic.

It is acceptable for long educational paragraphs to use concise translations, but do not leave primary workflows untranslated.

## 11. Interaction requirements

Make the MVP genuinely interactive:

- Catalogue filters
- Vehicle comparison
- Multi-step buyer-interest form
- Fleet inquiry form
- Workforce form
- Workshop form
- Form validation and confirmation
- Demo submissions stored locally
- Dashboard filters
- Search and sorting
- Detail drawers/modals
- Landed-cost calculator
- Evidence visibility controls
- Light/dark mode if it remains visually excellent
- Responsive mobile navigation
- Operator demo role switch
- Reset demo data action

## 12. Critical language controls

Always distinguish:

- Interest from reservation
- Reservation from order
- Export price from landed cost
- Landed cost from retail price
- Reported relationship from verified mandate
- Proposed role from appointment
- Candidate model from supplier-approved offer
- Training target from created job
- Foundation activity from commercial liability
- 10 candidate models from 10 purchased vehicles

Never claim:

- Guaranteed savings or returns
- Confirmed government support
- Confirmed fleet demand
- OEM authorization
- Exclusive distribution
- Final prices
- Delivery dates
- Investment availability
- That Marine Foundation finances or owns vehicles
- That Diallo has equity, exclusivity, or formal appointment

## 13. Definition of done

The result is complete only when:

- The application runs successfully
- All routes render
- There are no TypeScript errors
- There are no console errors
- The production build succeeds
- Public and private experiences are clearly separated
- Forms work using local demo persistence
- The landed-cost calculator works
- Evidence classifications appear throughout the product
- The 10-model versus 10-vehicle correction is implemented
- English, French, and Arabic navigation/workflows work
- Arabic renders RTL
- Mobile layouts are usable
- All demo content is clearly disclosed
- No payments, real messages, production writes, or external side effects exist
- Repository governance files are preserved
- The README explains how to run and evaluate the MVP

## 14. Final handoff

After building:

1. Run the application.
2. Run lint, type-check, tests if present, and production build.
3. Fix every error you can reproduce.
4. Summarize the architecture and routes.
5. List all mock-data assumptions.
6. List security, legal, database, authentication, messaging, payment, and deployment work intentionally deferred.
7. Identify the five most important decisions Major Dream Williams should make after reviewing the prototype.
8. Do not deploy publicly unless explicitly instructed.

Build the complete MVP now. Do not stop after producing a plan or wireframe.
