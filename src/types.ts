export type Language = 'en' | 'fr' | 'ar';

export type EvidenceClassification = 'VERIFIED' | 'REPORTED' | 'ASSUMPTION' | 'PROPOSAL' | 'OPEN';

export type OperatorRole = 'major' | 'diallo' | 'ling' | 'auditor';

export interface Claim {
  claim_id: string;
  statement: string;
  classification: EvidenceClassification;
  source: string;
  source_date: string;
  source_owner: string;
  geography: string;
  lane: string;
  confidence: 'high' | 'medium' | 'low';
  status: 'active' | 'open' | 'testing' | 'verified' | 'contradicted' | 'superseded';
  validation_owner: string;
  next_action: string;
  last_reviewed: string;
  superseded_by?: string;
  historical_context?: string;
  public_visibility: boolean;
}

export interface Decision {
  id: string;
  date: string;
  decision: string;
  status: 'Current' | 'Under Review' | 'Superseded';
  rationale: string;
  affected_surfaces: string;
  owner: string;
}

export interface VehicleModel {
  id: string;
  candidateCode: string; // e.g. "Candidate Model A"
  genericName: string;   // e.g. "Desert SUV Concept"
  brand: string;         // e.g. "Jetour (Chery Group)" or "Candidate Supplier A"
  model: string;
  trim: string;
  year: number;
  category: 'suv_4x4' | 'rugged_mining' | 'pickup_commercial' | 'family' | 'sedan' | 'van_commercial' | 'hybrid' | 'ev' | 'certified_used';
  categoryLabel: {
    en: string;
    fr: string;
    ar: string;
  };
  drivetrain: string;    // e.g. "Intelligent 4WD", "Part-Time 4x4", "AWD", "RWD"
  powertrain: string;
  engine: string;
  powerHp: number;
  torqueNm: number;
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid (HEV/PHEV)' | 'Battery Electric (BEV)';
  fuelCapacity: string;
  groundClearanceMm: number;
  seatingCapacity: number;
  pipelineStage: 'Supplier proposed' | 'Evidence review' | 'Cost review' | 'Service review' | 'Approved for validation' | 'Paused' | 'Rejected';
  evidenceClassification: EvidenceClassification;
  sandAndHeatSuitability: {
    score: number; // 1-10
    airFiltration: string;
    coolingRating: string;
    desertTerrainCapability: string;
  };
  indicativeFobUsd: {
    min: number;
    max: number;
    awaitingQuotation?: boolean;
  };
  dutyRatePct: number; // e.g. 0.20
  vatRatePct: number;  // 0.16
  estimatedFreightUsd: number;
  localPortAndDocUsd: number;
  availabilityStatus: 'Supplier RFP Shortlist' | 'Technical Screening' | 'In Discussion' | 'Awaiting Supplier Quotation';
  leadTimeWeeks: string;
  warrantyYears: number;
  warrantyKm: number;
  multilingualInfotainment: ('Arabic' | 'French' | 'English')[];
  image: string;
  serviceReadinessScore: number; // 0-100
  whatIsKnown: {
    en: string[];
    fr: string[];
    ar: string[];
  };
  whatIsStillOpen: {
    en: string[];
    fr: string[];
    ar: string[];
  };
  description: {
    en: string;
    fr: string;
    ar: string;
  };
  recommendedMauritaniaUseCase: {
    en: string;
    fr: string;
    ar: string;
  };
}

export interface SupplierProposal {
  id: string;
  supplierCode: string;
  manufacturer: string;
  representativeChannel: string;
  status: 'Active EOI Response' | 'Under Review' | 'Pre-Screening' | 'Clarification Requested';
  modelsOffered: string[];
  exportPriceRange: string;
  currency: string;
  incoterm: 'FOB Ningbo' | 'FOB Shanghai' | 'FOB Qingdao' | 'FOB Tianjin' | 'FOB Shenzhen' | 'CIF Nouakchott (indicative)';
  minimumOrderQuantity: number;
  productionLeadTime: string;
  warrantyOffer: string;
  sparePartsPackageQuote: string;
  diagnosticToolsOffer: string;
  trainingReadiness: string;
  remoteSupport: string;
  homologationDocs: string;
  quoteValidity: string;
  evidenceStatus: EvidenceClassification;
  notes: string;
}

export interface DialloSprintQuestion {
  number: number;
  category: 'A. Legal & Capital' | 'B. Import & Customs' | 'C. Demand & Buyers' | 'D. Service & Workforce' | 'E. Powertrain & Plan';
  title: string;
  description: string;
  targetResponse: string;
  assignedTo: string;
  confidence: 'confirmed' | 'probable' | 'unknown';
  status: 'Complete' | 'In Progress' | 'Pending Verification';
  lastUpdated: string;
  evidenceRef?: string;
}

export type CRMStage = 
  | 'New interest' 
  | 'Contacted' 
  | 'Qualified' 
  | 'Landed-cost review' 
  | 'Service-readiness review' 
  | 'Future reservation eligible' 
  | 'Closed / not proceeding';

export interface PersonalInquiry {
  id: string;
  type: 'personal';
  fullName: string;
  phone: string;
  email: string;
  city: string;
  selectedVehicleId?: string;
  vehiclePreference?: string;
  budgetRange: string;
  primaryUsage: string;
  purchaseTimeline: string;
  depositReadiness: string;
  createdAt: string;
  crmStage: CRMStage;
  status: string;
  notes?: string;
}

export interface FleetInquiry {
  id: string;
  type: 'fleet';
  orgName: string;
  contactName: string;
  contactTitle: string;
  phone: string;
  email: string;
  sector: 'Mining' | 'Construction' | 'Logistics' | 'Government / Public' | 'Banking & Corporate' | 'NGO & International' | 'Taxi & Managed Mobility';
  fleetSizeEstimate: string;
  deliveryLocation: string;
  operatingConditions: string;
  acquisitionTiming: string;
  financingInterest: boolean;
  serviceExpectations: string;
  createdAt: string;
  crmStage: CRMStage;
  status: string;
  notes?: string;
}

export interface MechanicRegistration {
  id: string;
  type: 'mechanic';
  fullName: string;
  phone: string;
  email?: string;
  city: string;
  yearsExperience: number;
  currentWorkshop: string;
  specialties: string[];
  languages: string[];
  certifications: string;
  toolsOwned: string;
  hasDiagnosticExperience: boolean;
  trainingCohortInterest: boolean;
  pathwayStage: 'Apprentice' | 'Certified Technician' | 'Lead Diagnostic Technician' | 'Workshop Operator' | 'Mobile-Service Entrepreneur' | 'Trainer' | 'Country Technical Leader';
  readinessRating: 'High' | 'Medium' | 'Screening Needed';
  createdAt: string;
  status: string;
  nextAction: string;
}

export interface WorkshopRegistration {
  id: string;
  type: 'workshop';
  businessName: string;
  ownerName: string;
  phone: string;
  email: string;
  location: string;
  bayCount: number;
  liftCount: number;
  hasThreePhasePower: boolean;
  diagnosticToolsOwned: string;
  electricalCapability: boolean;
  hybridEvReadiness: boolean;
  partsStorageSpace: string;
  technicianCount: number;
  languagesSpoken: string[];
  fleetServiceCapability: boolean;
  trainingInterest: boolean;
  readinessScore: number; // 0-100
  createdAt: string;
  status: string;
  nextAction: string;
}

export type CRMLead = PersonalInquiry | FleetInquiry | MechanicRegistration | WorkshopRegistration;

export type MechanicCandidate = MechanicRegistration;
export type WorkshopLead = WorkshopRegistration;
export type VehicleCandidate = VehicleModel;

export interface TaskItem {
  id: string;
  title: string;
  stream: 
    | 'Brother Ling / Supplier' 
    | 'Diallo Evidence Sprint' 
    | 'Market & Buyer Research' 
    | 'Import & Landed-Cost' 
    | 'Workshop & Mechanic Mapping' 
    | 'Service & Parts Readiness' 
    | 'MVP Validation';
  owner: string;
  deadline: string;
  status: 'To Do' | 'In Progress' | 'Completed' | 'Blocked';
  priority: 'Critical' | 'High' | 'Medium';
  deliverable: string;
}

export interface Organization {
  id: string;
  name: string;
  sector: 'Mining' | 'Construction' | 'Logistics' | 'Banking & Corporate' | 'NGO & International' | 'Government / Public' | 'Taxi & Managed Mobility';
  city: string;
  estimatedFleetSize: number;
  currentVehicles: string;
  dutyCycle: string;
  decisionMaker: string;
  procurementCycle: string;
  serviceExpectation: string;
  interestLevel: 'High' | 'Medium' | 'Exploring';
  isFictionalDemo: true;
}

export interface ServiceReadinessDetail {
  vehicleId: string;
  partsScore: number;          // /10
  diagnosticsScore: number;    // /10
  manualsScore: number;        // /10
  warrantyScore: number;       // /10
  leadTechniciansScore: number;// /10
  workshopScore: number;       // /10
  recoveryScore: number;       // /10
  remoteSupportScore: number;  // /10
  hybridEvScore: number;       // /10
  overallReadiness: number;    // 0-100%
  blockingGaps: string[];
  verifiedCapabilities: string[];
}

export interface CountryNode {
  code: 'MR' | 'SN';
  name: string;
  role: 'Active Controlled Evidence Node' | 'Proposed Complementary Mobility & Training Hub';
  status: 'Active Evidence Sprint' | 'Proposed / Evidence Required';
  leadEnvoy: string;
  focus: string;
  readinessScore: number;
  dimensions: {
    name: string;
    score: number;
    status: string;
  }[];
  keyMilestones: {
    title: string;
    completed: boolean;
  }[];
  governanceNotes: string;
}

export interface HistoricalClaimCorrection {
  id: string;
  claimId: string;
  topic: string;
  historicalStatement: string;
  historicalClassification: EvidenceClassification;
  historicalSource: string;
  currentDecision: string;
  currentDecisionId: string;
  currentAuthority: string;
  rationale: string;
  status: 'PRESERVED_HISTORICAL_RECORD';
}
