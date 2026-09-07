import type { MechanicRegistration, WorkshopRegistration } from '../types';

export const MECHANIC_CANDIDATES: MechanicRegistration[] = [{
  id: 'DEMO-MECH-001',
  type: 'mechanic',
  fullName: 'Moussa Example',
  phone: '+222 00 00 00 01',
  email: 'mechanic@example.com',
  city: 'Candidate location',
  yearsExperience: 0,
  currentWorkshop: 'Example Workshop',
  specialties: ['Awaiting field evidence'],
  languages: ['French'],
  certifications: 'Not verified',
  toolsOwned: 'Not verified',
  hasDiagnosticExperience: false,
  trainingCohortInterest: false,
  pathwayStage: 'Apprentice',
  readinessRating: 'Screening Needed',
  createdAt: '2026-09-06 00:00',
  status: 'Fictional demonstration record — not screened',
  nextAction: 'Collect a real consented registration and supporting evidence.'
}];

export const MAPPED_WORKSHOPS: WorkshopRegistration[] = [{
  id: 'DEMO-WS-001',
  type: 'workshop',
  businessName: 'Example Workshop',
  ownerName: 'Fatima Example',
  phone: '+222 00 00 00 02',
  email: 'workshop@example.com',
  location: 'Candidate location',
  bayCount: 0,
  liftCount: 0,
  hasThreePhasePower: false,
  diagnosticToolsOwned: 'Not verified',
  electricalCapability: false,
  hybridEvReadiness: false,
  partsStorageSpace: 'Not verified',
  technicianCount: 0,
  languagesSpoken: ['French'],
  fleetServiceCapability: false,
  trainingInterest: false,
  readinessScore: 0,
  createdAt: '2026-09-06 00:00',
  status: 'Fictional demonstration record — not assessed',
  nextAction: 'Complete a real consented workshop assessment.'
}];
