import { describe, expect, it } from 'vitest';
import { PRICING_CLAIM_IDS, publicationGate } from '../scripts/generate-canonical-data.mjs';
import { PUBLICATION_GATE } from '../src/generated/canonicalGovernance';

describe('publication gate', () => {
  it('blocks public prices for unresolved conflicts', () => {
    const claims = PRICING_CLAIM_IDS.map((claim_id) => ({ classification: 'VERIFIED', status: 'active', claim_id }));
    claims[2].classification = 'CONFLICT';
    const gate = publicationGate(claims);
    expect(gate.publicPricesAllowed).toBe(false);
    expect(gate.blockingClaimIds).toEqual(['CLM-012']);
  });
  it('blocks public prices for a pricing assumption even without a conflict', () => {
    const claims = PRICING_CLAIM_IDS.map((claim_id) => ({ classification: 'VERIFIED', status: 'active', claim_id }));
    claims[1].classification = 'ASSUMPTION';
    const gate = publicationGate(claims);
    expect(gate.publicPricesAllowed).toBe(false);
    expect(gate.blockingClaimIds).toEqual(['CLM-011']);
  });
  it('does not block pricing for an unrelated assumption', () => {
    const claims = PRICING_CLAIM_IDS.map((claim_id) => ({ classification: 'VERIFIED', status: 'active', claim_id }));
    claims.push({ classification: 'ASSUMPTION', status: 'testing', claim_id: 'CLM-999' });
    expect(publicationGate(claims).publicPricesAllowed).toBe(true);
  });
  it('keeps the current canonical publication state blocked', () => {
    expect(PUBLICATION_GATE.publicationBlocked).toBe(true);
    expect(PUBLICATION_GATE.blockingClaimIds).toEqual(expect.arrayContaining(['CLM-012', 'CLM-013']));
  });
});
