import type { VehicleModel } from '../types';

const categories: VehicleModel['category'][] = [
  'suv_4x4', 'rugged_mining', 'pickup_commercial', 'family', 'sedan',
  'van_commercial', 'hybrid', 'ev', 'suv_4x4', 'pickup_commercial'
];

const letters = 'ABCDEFGHIJ'.split('');
const awaiting = {
  en: ['Awaiting manufacturer documentation.'],
  fr: ['En attente de la documentation du constructeur.'],
  ar: ['في انتظار وثائق الشركة المصنعة.']
};

export const CANDIDATE_VEHICLES: VehicleModel[] = letters.map((letter, index) => ({
  id: `DEMO-VEH-${String(index + 1).padStart(3, '0')}`,
  candidateCode: `Candidate Model ${letter}`,
  genericName: `Demonstration Candidate ${letter}`,
  brand: 'Fictional Candidate Supplier',
  model: `Demo Model ${letter}`,
  trim: 'Awaiting manufacturer documentation',
  year: 2026,
  category: categories[index],
  categoryLabel: { en: 'Candidate vehicle', fr: 'Véhicule candidat', ar: 'مركبة مرشحة' },
  drivetrain: 'Awaiting manufacturer documentation',
  powertrain: 'Awaiting manufacturer documentation',
  engine: 'Awaiting manufacturer documentation',
  powerHp: 0,
  torqueNm: 0,
  fuelType: index === 7 ? 'Battery Electric (BEV)' : index === 6 ? 'Hybrid (HEV/PHEV)' : 'Petrol',
  fuelCapacity: 'Awaiting manufacturer documentation',
  groundClearanceMm: 0,
  seatingCapacity: 0,
  pipelineStage: 'Evidence review',
  evidenceClassification: 'OPEN',
  sandAndHeatSuitability: {
    score: 0,
    airFiltration: 'Awaiting manufacturer documentation',
    coolingRating: 'Awaiting manufacturer documentation',
    desertTerrainCapability: 'Awaiting manufacturer documentation'
  },
  indicativeFobUsd: { min: 0, max: 0, awaitingQuotation: true },
  dutyRatePct: 0,
  vatRatePct: 0,
  estimatedFreightUsd: 0,
  localPortAndDocUsd: 0,
  availabilityStatus: 'Awaiting Supplier Quotation',
  leadTimeWeeks: 'Awaiting manufacturer documentation',
  warrantyYears: 0,
  warrantyKm: 0,
  multilingualInfotainment: [],
  image: `https://placehold.co/1000x650/101925/e0b555?text=DEMO+Candidate+${letter}`,
  serviceReadinessScore: 0,
  whatIsKnown: {
    en: ['Candidate slot only. No supplier, specification, price, warranty, or authorization is represented.'],
    fr: ["Emplacement candidat uniquement. Aucun fournisseur, prix, garantie ou autorisation n'est représenté."],
    ar: ['فئة مرشحة فقط. لا يتم تمثيل أي مورد أو سعر أو ضمان أو تفويض.']
  },
  whatIsStillOpen: awaiting,
  description: {
    en: 'Fictional demonstration candidate used to test the ten-model discovery workflow.',
    fr: 'Candidat fictif utilisé pour tester le processus de découverte de dix modèles.',
    ar: 'مرشح تجريبي خيالي لاختبار مسار اكتشاف عشرة نماذج.'
  },
  recommendedMauritaniaUseCase: {
    en: 'Awaiting field evidence.',
    fr: 'En attente de preuves de terrain.',
    ar: 'في انتظار الأدلة الميدانية.'
  }
}));
