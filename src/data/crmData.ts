import type { FleetInquiry, Organization, PersonalInquiry } from '../types';

export const INDIVIDUAL_LEADS: PersonalInquiry[] = [{
  id: 'DEMO-BUY-001',
  type: 'personal',
  fullName: 'Amina Example',
  phone: '+222 00 00 00 00',
  email: 'amina@example.com',
  city: 'Candidate location',
  selectedVehicleId: 'DEMO-VEH-001',
  vehiclePreference: 'Demonstration Candidate A',
  budgetRange: 'Not collected in demonstration seed',
  primaryUsage: 'Demonstration workflow only',
  purchaseTimeline: 'No purchase represented',
  depositReadiness: 'Not requested; deposits are blocked',
  createdAt: '2026-09-06 00:00',
  crmStage: 'New interest',
  status: 'Fictional demonstration record',
  notes: 'Synthetic data. No real person, buyer intent, payment readiness, or transaction.'
}];

export const FLEET_INQUIRIES: FleetInquiry[] = [{
  id: 'DEMO-FLEET-001',
  type: 'fleet',
  orgName: 'Example Mobility Cooperative',
  contactName: 'Ibrahima Example',
  contactTitle: 'Demonstration Contact',
  phone: '+221 00 000 00 00',
  email: 'fleet@example.com',
  sector: 'Logistics',
  fleetSizeEstimate: 'Not validated',
  deliveryLocation: 'Candidate location',
  operatingConditions: 'Demonstration workflow only',
  acquisitionTiming: 'No acquisition represented',
  financingInterest: false,
  serviceExpectations: 'Awaiting field evidence',
  createdAt: '2026-09-06 00:00',
  crmStage: 'New interest',
  status: 'Fictional demonstration record',
  notes: 'Synthetic data. No real institution, fleet demand, financing, or procurement authority.'
}];

export const DEMO_ORGANIZATIONS: Organization[] = [{
  id: 'DEMO-ORG-001',
  name: 'Example Regional Logistics Cooperative',
  sector: 'Logistics',
  city: 'Candidate location',
  estimatedFleetSize: 0,
  currentVehicles: 'Not validated',
  dutyCycle: 'Demonstration workflow only',
  decisionMaker: 'Fictional contact',
  procurementCycle: 'No procurement represented',
  serviceExpectation: 'Awaiting field evidence',
  interestLevel: 'Exploring',
  isFictionalDemo: true
}];
