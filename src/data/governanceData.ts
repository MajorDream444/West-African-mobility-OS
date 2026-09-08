import type { CountryNode, DialloSprintQuestion, HistoricalClaimCorrection, SupplierProposal, TaskItem } from '../types';
import {
  CANONICAL_CLAIMS,
  CANONICAL_DECISIONS,
  HISTORICAL_CANONICAL_CLAIMS,
  PUBLICATION_GATE
} from '../generated/canonicalGovernance';

// Canonical claims and decisions are generated from the governed registers.
export { CANONICAL_CLAIMS, CANONICAL_DECISIONS, HISTORICAL_CANONICAL_CLAIMS, PUBLICATION_GATE };

// Historical correction is a presentation of canonical DEC-001/DEC-002, not a new claim.
export const HISTORICAL_CLAIM_CORRECTION: HistoricalClaimCorrection = {
  id: 'CORR-001',
  claimId: 'historical-ten-vehicle-loi-language',
  topic: 'Ten-Vehicle Purchase vs Ten-Model Discovery EOI Scope',
  historicalStatement: 'The LOI is for approximately 10 vehicles.',
  historicalClassification: 'REPORTED',
  historicalSource: 'Historical participant recap; retained as historical context only',
  currentDecision: CANONICAL_DECISIONS.find((decision) => decision.id === 'DEC-002')?.decision ?? '',
  currentDecisionId: 'DEC-002',
  currentAuthority: 'Canonical Decision Register',
  rationale: CANONICAL_DECISIONS.find((decision) => decision.id === 'DEC-002')?.rationale ?? '',
  status: 'PRESERVED_HISTORICAL_RECORD'
};

export const SUPPLIER_PROPOSALS: SupplierProposal[] = [{
  id: 'DEMO-SUP-001',
  supplierCode: 'DEMO-SUPPLIER',
  manufacturer: 'Fictional Candidate Supplier',
  representativeChannel: 'Demonstration only — no real relationship',
  status: 'Clarification Requested',
  modelsOffered: ['DEMO-VEH-001'],
  exportPriceRange: 'Suppressed pending evidence resolution',
  currency: 'N/A',
  incoterm: 'FOB Shanghai',
  minimumOrderQuantity: 0,
  productionLeadTime: 'Awaiting manufacturer documentation',
  warrantyOffer: 'Awaiting manufacturer documentation',
  sparePartsPackageQuote: 'Awaiting manufacturer documentation',
  diagnosticToolsOffer: 'Awaiting manufacturer documentation',
  trainingReadiness: 'Awaiting manufacturer documentation',
  remoteSupport: 'Awaiting manufacturer documentation',
  homologationDocs: 'Awaiting manufacturer documentation',
  quoteValidity: 'No quotation represented',
  evidenceStatus: 'OPEN',
  notes: 'Fictional demonstration record. No OEM, supplier, quotation, appointment, or authorization.'
}];

export const PHASE_0_TASKS: TaskItem[] = [{
  id: 'DEMO-TASK-001',
  title: 'Demonstrate evidence intake workflow',
  stream: 'MVP Validation',
  owner: 'Simulation only',
  deadline: 'Not scheduled',
  status: 'To Do',
  priority: 'High',
  deliverable: 'A clearly synthetic workflow demonstration; no operational completion represented.'
}];

export const COUNTRY_NODES: CountryNode[] = [
  {
    code: 'MR',
    name: 'Mauritania',
    role: 'Active Controlled Evidence Node',
    status: 'Active Evidence Sprint',
    leadEnvoy: 'Diallo — Proposed Mauritania Market-Development Lead',
    focus: 'Evidence gathering and controlled market validation',
    readinessScore: 0,
    dimensions: [{ name: 'Evidence readiness', score: 0, status: 'Not yet verified' }],
    keyMilestones: [{ title: 'Complete governed evidence sprint', completed: false }],
    governanceNotes: 'No mandate, appointment, demand, readiness, financing, or commercial authority is implied.'
  },
  {
    code: 'SN',
    name: 'Senegal',
    role: 'Proposed Complementary Mobility & Training Hub',
    status: 'Proposed / Evidence Required',
    leadEnvoy: 'Not appointed',
    focus: 'Proposed complementary service, parts, training and quality-assurance hub',
    readinessScore: 0,
    dimensions: [{ name: 'Evidence readiness', score: 0, status: 'Proposed' }],
    keyMilestones: [{ title: 'Validate service and parts ecosystem', completed: false }],
    governanceNotes: 'Senegal is not greenfield and no government, fleet, training, OEM, or commercial relationship is claimed.'
  }
];

const sprintTitles = [
  'Operating entity', 'Decision-makers and proposed team', 'Initial capital', 'First-order scenarios',
  'Import procedure', 'Used-vehicle rules', 'Taxes and landed cost', 'Homologation, software, and technical compliance',
  'Buyer interview list', 'Qualified individual interest', 'Institutional and fleet prospects', 'Competitor and pricing map',
  'Current Chinese-brand presence', 'Sales and demonstration location', 'Workshop map', 'Initial mechanic cohort',
  'Parts and logistics', 'Warranty, insurance, and customer protection', 'Petrol, hybrid, and EV readiness',
  'Twelve-month operating proposition'
];
const sprintCategories: DialloSprintQuestion['category'][] = [
  'A. Legal & Capital', 'A. Legal & Capital', 'A. Legal & Capital', 'A. Legal & Capital',
  'B. Import & Customs', 'B. Import & Customs', 'B. Import & Customs', 'B. Import & Customs',
  'C. Demand & Buyers', 'C. Demand & Buyers', 'C. Demand & Buyers', 'C. Demand & Buyers',
  'D. Service & Workforce', 'D. Service & Workforce', 'D. Service & Workforce', 'D. Service & Workforce',
  'D. Service & Workforce', 'D. Service & Workforce', 'E. Powertrain & Plan', 'E. Powertrain & Plan'
];

export const DIALLO_SPRINT_QUESTIONS: DialloSprintQuestion[] = sprintTitles.map((title, index) => ({
  number: index + 1,
  category: sprintCategories[index],
  title,
  description: 'Provide a direct answer, evidence or an explicit gap, source provenance, confidence, owner, and dated next action.',
  targetResponse: 'Canonical evidence-sprint response',
  assignedTo: 'Diallo — Proposed Mauritania Market-Development Lead',
  confidence: 'unknown',
  status: 'Pending Verification',
  lastUpdated: '2026-09-06'
}));
