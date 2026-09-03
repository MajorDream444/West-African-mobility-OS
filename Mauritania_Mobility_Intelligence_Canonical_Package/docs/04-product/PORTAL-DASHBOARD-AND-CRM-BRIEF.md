# Portal, Dashboard, and CRM Brief

## Product thesis

The public portal is a market-validation surface. The private dashboard is the evidence and coordination system. Together they form a Mauritania Mobility Intelligence Node that can later be replicated in other countries.

## Public portal outcomes

- Capture qualified individual buyer interest
- Capture institutional and fleet demand
- Recruit mechanics and apprentices
- Map workshops and service partners
- Display only supplier-approved candidate vehicles
- Explain the order and delivery process accurately
- Build trust without claiming unearned authorization

## Primary public action

`Find Your Vehicle`

Supporting actions:

- `Request Fleet Information`
- `Join the Automotive Workforce`

## Initial pages

1. Home
2. Vehicle discovery
3. Vehicle detail
4. Personal buyer inquiry
5. Fleet and institutional inquiry
6. Mechanic and apprenticeship registration
7. Workshop and service-partner registration
8. How ordering works
9. Service, parts, and warranty readiness
10. About, status, and governance disclosures

## Private dashboard modules

- Leads and buyer qualification
- Organizations and fleets
- Supplier entities and contacts
- Vehicle model proposals
- Supplier quotations and validity
- Landed-cost scenarios
- Reservations and orders
- Mechanics and training cohorts
- Workshops and capability assessments
- Parts and diagnostic readiness
- Claims and evidence register
- Decisions and approvals
- Tasks, owners, and deadlines
- Source documents and provenance

## Minimum data entities

`Person, Organization, Relationship, Supplier, VehicleModel, SupplierQuote, LandedCostScenario, BuyerInterest, FleetInterest, Reservation, Order, Workshop, Technician, TrainingCohort, Part, WarrantyTerm, EvidenceItem, Claim, Decision, Task`

## Evidence-aware behavior

Every externally visible vehicle, price, delivery estimate, warranty term, partnership, and authorization must trace to an approved evidence item. The system should block publication when the relevant claim is open, expired, contradicted, or unapproved.

## CRM recommendation

Start with the application’s own database as the canonical operational store. Airtable may be used as a temporary intake or operator view, but it should not become the only source of truth if the system is expected to manage quotations, evidence, permissions, reservations, orders, and audit history.

## AI Studio one-shot boundary

The first one-shot prototype should demonstrate:

- Public multilingual landing page
- Candidate vehicle catalogue with clearly marked indicative status
- Four structured intake forms
- Private summary dashboard using seeded mock data
- Claims and evidence status
- Supplier proposal comparison
- Buyer funnel from interest to qualified reservation
- No real payments, deposits, external messages, or production writes

The repository remains canonical. Generated prototypes must not redefine roles, facts, prices, or commitments outside the registers.

