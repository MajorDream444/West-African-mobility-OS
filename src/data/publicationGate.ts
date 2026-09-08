import { ECONOMIC_OUTPUT_GATES, PUBLICATION_GATE } from '../generated/canonicalGovernance';

export interface EconomicOutputGate {
  outputId: string;
  outputLabel: string;
  allowed: boolean;
  publicationBlocked: boolean;
  blockingClaimIds: readonly string[];
  unknownClaimIds: readonly string[];
  undeclaredInputIds: readonly string[];
  reason: string;
}

export type EconomicOutputId = keyof typeof ECONOMIC_OUTPUT_GATES;

const unknownOutputGate = (outputId: string): EconomicOutputGate => ({
  outputId,
  outputLabel: outputId,
  allowed: false,
  publicationBlocked: true,
  blockingClaimIds: [],
  unknownClaimIds: [],
  undeclaredInputIds: ['output_not_registered'],
  reason: `Publication blocked: economic output ${outputId} is not declared in the canonical dependency register.`
});

export const economicOutputGate = (outputId: string): EconomicOutputGate =>
  (ECONOMIC_OUTPUT_GATES as Record<string, EconomicOutputGate>)[outputId] ?? unknownOutputGate(outputId);

export const publicationGate = PUBLICATION_GATE;
export const publicPricesAllowed = PUBLICATION_GATE.publicPricesAllowed;
export const publicationBlocked = PUBLICATION_GATE.publicationBlocked;
