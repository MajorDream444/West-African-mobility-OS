import { describe, expect, it } from 'vitest';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { assertNoCanonicalRedefinitions, canonicalRedefinitions, parseClaims, parseDecisions } from '../scripts/generate-canonical-data.mjs';

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
  it('detects canonical claim and decision redefinitions in application source', () => {
    const ids = new Set(['CLM-001', 'DEC-001']);
    const source = `const claim = { claim_id: 'CLM-001' }; const decision = { id: "DEC-001" };`;
    expect(canonicalRedefinitions(source, ids)).toEqual(['CLM-001', 'DEC-001']);
  });
  it('allows reserved demonstration IDs and canonical references', () => {
    const ids = new Set(['CLM-001', 'DEC-001']);
    const source = `const demo = { id: 'DEMO-FINDING-001' }; const reference = find('CLM-001');`;
    expect(canonicalRedefinitions(source, ids)).toEqual([]);
  });
  it('fails the filesystem scan when application code redefines a canonical ID', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'canonical-redefinition-'));
    try {
      await writeFile(join(directory, 'bad.ts'), `export const duplicate = { claim_id: 'CLM-001' };`);
      await expect(assertNoCanonicalRedefinitions([{ claim_id: 'CLM-001' }], [], directory)).rejects.toThrow(/Canonical ID CLM-001 is redefined/);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });
});
