import { describe, expect, it } from 'vitest';
import { parseClaims, parseDecisions } from '../scripts/generate-canonical-data.mjs';

const header = 'claim_id,statement,classification,source,source_date,source_owner,geography,lane,confidence,status,validation_owner,next_action,last_reviewed';
const claim = 'CLM-001,Statement,OPEN,Source,2026-01-01,Owner,Mauritania,governance,low,open,Owner,Validate,2026-01-01';

describe('canonical evidence validation', () => {
  it('accepts all required claim fields', () => expect(parseClaims(`${header}\n${claim}\n`)).toHaveLength(1));
  it('rejects duplicate claim IDs', () => expect(() => parseClaims(`${header}\n${claim}\n${claim}\n`)).toThrow(/Duplicate claim ID/));
  it('rejects unsupported evidence classes', () => expect(() => parseClaims(`${header}\n${claim.replace(',OPEN,', ',CERTAIN,')}\n`)).toThrow(/Invalid evidence class/));
  it('rejects duplicate decision IDs', () => {
    const row = '| DEC-001 | 2026-01-01 | Exact decision | Current | Rationale |';
    expect(() => parseDecisions(`${row}\n${row}`)).toThrow(/Duplicate decision ID/);
  });
});
