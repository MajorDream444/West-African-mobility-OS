# AI Studio Import Manifest

**Import status:** `UNMODIFIED PROTOTYPE IMPORT`  
**Import date:** 2026-09-06  
**Source:** local AI Studio prototype export supplied for controlled reconciliation
**Import branch:** `ai-studio/mvp-one-shot`

## Purpose

This commit preserves the original AI Studio application as generated, before evidence remediation. Its application files are historical prototype evidence, not canonical claims, verified operations, production configuration, or authority to publish.

## Imported manifest

### Root configuration

- `bun.lock`
- `firebase-applet-config.json`
- `index.html`
- `metadata.json`
- `package.json`
- `tsconfig.json`

### Application source

- `src/App.tsx`
- `src/types.ts`
- `src/components/CorridorVisionSection.tsx`
- `src/components/DashboardView.tsx`
- `src/components/DisclosuresSection.tsx`
- `src/components/FleetSection.tsx`
- `src/components/GoogleSheetsManager.tsx`
- `src/components/Header.tsx`
- `src/components/HowOrderingWorks.tsx`
- `src/components/IntakeForms.tsx`
- `src/components/LandedCostCalculator.tsx`
- `src/components/VehicleCatalog.tsx`
- `src/components/VehicleComparisonModal.tsx`
- `src/components/WorkforceSection.tsx`
- `src/components/WorkshopsSection.tsx`
- `src/data/canonicalData.ts`
- `src/data/crmData.ts`
- `src/data/governanceData.ts`
- `src/data/serviceReadinessData.ts`
- `src/data/translations.ts`
- `src/data/vehicles.ts`
- `src/data/workforceData.ts`
- `src/services/googleAuth.ts`
- `src/services/googleSheets.ts`

## Excluded source material

- The source folder's nested canonical package was not copied because the tracked repository already contains the approved canonical package.
- Temporary hidden `.hm` files were not imported.
- No dependency directory, generated build output, credentials, or environment-value file was imported.

## Known governance conflicts

The unmodified prototype:

1. Independently authors `CLM-*` and `DEC-*` records in `src/data/governanceData.ts`.
2. Reuses canonical IDs for different statements.
3. Omits the `CONFLICT` evidence class.
4. Presents unsupported supplier, buyer, fleet, mechanic, workshop, pricing, tariff, warranty, escrow, and completion data.
5. Uses realistic personal and institutional identifiers in demonstration records.
6. Presents unsupported completion and readiness states.
7. Exposes landed-cost estimates while canonical tariff inputs remain conflicted.
8. Uses role switching as a visual simulation without authentication.
9. Uses browser LocalStorage as if it were an operational store.

## Relationship to the canonical package

The canonical registers under `Mauritania_Mobility_Intelligence_Canonical_Package/` govern the application. This imported prototype does not amend those registers and must not be deployed or externally demonstrated from this branch. The remediation branch will replace independently authored governance data with validated generated data derived from the canonical registers.
