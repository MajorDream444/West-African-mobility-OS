import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { VehicleCatalog } from '../src/components/VehicleCatalog';
import { DisclosuresSection } from '../src/components/DisclosuresSection';
import { LandedCostCalculator } from '../src/components/LandedCostCalculator';
import type { EconomicOutputGate } from '../src/data/publicationGate';

const gate = (allowed: boolean): EconomicOutputGate => ({
  outputId: 'test_output',
  outputLabel: 'Test output',
  allowed,
  publicationBlocked: !allowed,
  blockingClaimIds: allowed ? [] : ['CLM-999'],
  unknownClaimIds: [],
  undeclaredInputIds: [],
  reason: allowed ? 'All declared evidence dependencies are verified.' : 'Evidence dependency is not verified.'
});

describe('economic gate component rendering', () => {
  it.each([
    [false, 'Public pricing blocked'],
    [true, 'Public pricing evidence approved']
  ])('renders the catalog state when allowed is %s', (allowed, heading) => {
    const html = renderToStaticMarkup(
      <VehicleCatalog currentLanguage="en" onSelectVehicle={() => undefined} onExpressInterest={() => undefined} priceGate={gate(allowed)} />
    );
    expect(html).toContain(heading);
  });

  it.each([
    [false, 'Publication Blocked'],
    [true, 'Evidence Verified']
  ])('renders the disclosure ticker from the landed-pricing gate when allowed is %s', (allowed, status) => {
    const html = renderToStaticMarkup(
      <DisclosuresSection currentLanguage="en" onOpenDashboard={() => undefined} landedPricingGate={gate(allowed)} />
    );
    expect(html).toContain(status);
  });

  it('does not render calculator inputs or outputs while landed cost is blocked', () => {
    const html = renderToStaticMarkup(<LandedCostCalculator currentLanguage="en" landedCostGate={gate(false)} />);
    expect(html).toContain('Landed-cost publication blocked');
    expect(html).not.toContain('$24,500 USD');
  });

  it('renders calculator inputs and outputs when landed-cost evidence is verified', () => {
    const html = renderToStaticMarkup(<LandedCostCalculator currentLanguage="en" landedCostGate={gate(true)} />);
    expect(html).toContain('$24,500 USD');
    expect(html).not.toContain('Landed-cost publication blocked');
  });
});
