import type { ServiceReadinessDetail } from '../types';
import { CANDIDATE_VEHICLES } from './vehicles';

const awaiting = 'Awaiting manufacturer documentation and local service evidence.';

export const SERVICE_READINESS_DETAILS: Record<string, ServiceReadinessDetail> = Object.fromEntries(
  CANDIDATE_VEHICLES.map((vehicle) => [vehicle.id, {
    vehicleId: vehicle.id,
    partsScore: 0,
    diagnosticsScore: 0,
    manualsScore: 0,
    warrantyScore: 0,
    leadTechniciansScore: 0,
    workshopScore: 0,
    recoveryScore: 0,
    remoteSupportScore: 0,
    hybridEvScore: 0,
    overallReadiness: 0,
    blockingGaps: [awaiting],
    verifiedCapabilities: [awaiting]
  }])
);
