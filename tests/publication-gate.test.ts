import { describe, expect, it } from 'vitest';
import { publicationGate } from '../scripts/generate-canonical-data.mjs';
import { PUBLICATION_GATE } from '../src/generated/canonicalGovernance';

describe('publication gate', () => {
  it('blocks public prices for unresolved conflicts', () => {
    const gate = publicationGate([{ classification: 'CONFLICT', status: 'open', claim_id: 'CLM-012' }]);
    expect(gate.publicPricesAllowed).toBe(false);
    expect(gate.blockingClaimIds).toEqual(['CLM-012']);
  });
  it('keeps the current canonical publication state blocked', () => {
    expect(PUBLICATION_GATE.publicationBlocked).toBe(true);
    expect(PUBLICATION_GATE.blockingClaimIds).toEqual(expect.arrayContaining(['CLM-012', 'CLM-013']));
  });
});
