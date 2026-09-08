import { describe, expect, it } from 'vitest';
import { parseEconomicDependencies, resolveEconomicOutputGates } from '../scripts/generate-canonical-data.mjs';
import { ECONOMIC_OUTPUT_GATES } from '../src/generated/canonicalGovernance';
import { economicOutputGate } from '../src/data/publicationGate';

const claims = (overrides: Record<string, string> = {}) => [
  { claim_id: 'CLM-001', classification: overrides['CLM-001'] ?? 'VERIFIED' },
  { claim_id: 'CLM-002', classification: overrides['CLM-002'] ?? 'VERIFIED' },
  { claim_id: 'CLM-999', classification: overrides['CLM-999'] ?? 'ASSUMPTION' }
];

const dependencies = parseEconomicDependencies(`output_id,output_label,input_id,input_label,claim_ids
vehicle_price,Vehicle price,vehicle_price,Supplier price,CLM-001
landed_cost,Landed cost,vehicle_price,Supplier price,CLM-001
landed_cost,Landed cost,freight,Freight,CLM-002
`);

describe('register-driven economic output gates', () => {
  it.each(['ASSUMPTION', 'CONFLICT', 'OPEN'])('blocks a dependent output for %s evidence', (classification) => {
    const gates = resolveEconomicOutputGates(claims({ 'CLM-002': classification }), dependencies);
    expect(gates.landed_cost.allowed).toBe(false);
    expect(gates.landed_cost.blockingClaimIds).toContain('CLM-002');
  });

  it('does not globally block an output for an unrelated assumption', () => {
    expect(resolveEconomicOutputGates(claims(), dependencies).vehicle_price.allowed).toBe(true);
  });

  it('fails closed for a missing supporting claim', () => {
    const gates = resolveEconomicOutputGates(claims().filter((claim) => claim.claim_id !== 'CLM-002'), dependencies);
    expect(gates.landed_cost.allowed).toBe(false);
    expect(gates.landed_cost.unknownClaimIds).toEqual(['CLM-002']);
  });

  it('fails closed when an economic input has no declared evidence dependency', () => {
    const undeclared = parseEconomicDependencies(`output_id,output_label,input_id,input_label,claim_ids
landed_cost,Landed cost,new_fee,New fee,
`);
    expect(resolveEconomicOutputGates(claims(), undeclared).landed_cost.undeclaredInputIds).toEqual(['new_fee']);
  });

  it('fails closed when an output references an unknown claim', () => {
    const unknown = parseEconomicDependencies(`output_id,output_label,input_id,input_label,claim_ids
landed_cost,Landed cost,new_fee,New fee,CLM-777
`);
    expect(resolveEconomicOutputGates(claims(), unknown).landed_cost.unknownClaimIds).toEqual(['CLM-777']);
  });

  it('automatically gates a newly registered economic claim without a code-list change', () => {
    const expanded = parseEconomicDependencies(`output_id,output_label,input_id,input_label,claim_ids
landed_cost,Landed cost,freight,Freight,CLM-001
landed_cost,Landed cost,new_fee,New fee,CLM-002
`);
    expect(resolveEconomicOutputGates(claims({ 'CLM-002': 'ASSUMPTION' }), expanded).landed_cost.allowed).toBe(false);
  });

  it('fails closed for an unregistered economic output', () => {
    expect(economicOutputGate('future_calculator_output').allowed).toBe(false);
  });

  it('keeps every current canonical economic output blocked until its OPEN evidence is verified', () => {
    expect(Object.keys(ECONOMIC_OUTPUT_GATES)).toHaveLength(9);
    expect(Object.values(ECONOMIC_OUTPUT_GATES).every((gate) => gate.publicationBlocked)).toBe(true);
  });

  it('declares every required economic input category in the generated register', () => {
    const inputIds = new Set(Object.values(ECONOMIC_OUTPUT_GATES).flatMap((gate) => gate.dependencies.map((dependency) => dependency.input_id)));
    expect(inputIds).toEqual(new Set([
      'vehicle_price', 'freight', 'insurance', 'customs_duty', 'statistical_fee',
      'minimum_flat_rate_tax', 'used_vehicle_valuation', 'port_handling',
      'inland_transport', 'inspection', 'contingency', 'vat', 'margin',
      'savings_benchmark', 'currency_rate'
    ]));
  });
});
