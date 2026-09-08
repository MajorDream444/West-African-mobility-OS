import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { VehicleCatalog } from '../src/components/VehicleCatalog';
import { PUBLICATION_GATE } from '../src/generated/canonicalGovernance';

describe('vehicle catalog publication state', () => {
  it('renders the heading that matches the generated publication gate', () => {
    const html = renderToStaticMarkup(
      <VehicleCatalog currentLanguage="en" onSelectVehicle={() => undefined} onExpressInterest={() => undefined} />
    );
    const expectedHeading = PUBLICATION_GATE.publicationBlocked
      ? 'Public pricing blocked'
      : 'Public pricing evidence approved';
    expect(html).toContain(expectedHeading);
  });
});
