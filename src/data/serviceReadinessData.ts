import { ServiceReadinessDetail } from '../types';

export const SERVICE_READINESS_DETAILS: Record<string, ServiceReadinessDetail> = {
  "candidate-model-a": {
    vehicleId: "candidate-model-a",
    partsScore: 8,
    diagnosticsScore: 9,
    manualsScore: 9,
    warrantyScore: 8,
    leadTechniciansScore: 8,
    workshopScore: 9,
    recoveryScore: 8,
    remoteSupportScore: 8,
    hybridEvScore: 9,
    overallReadiness: 82,
    blockingGaps: [
      "Customs single-window clearance protocol requires physical dry-run with broker (CLM-003)",
      "Spare parts warehousing lease agreement in Tevragh-Zeina pending signature"
    ],
    verifiedCapabilities: [
      "Dual-cyclone high-capacity desert sand pre-filtration confirmed by factory testing",
      "Arabic and French language infotainment verified natively supported",
      "OEM VDS diagnostic scanner software package includes full engine and 4WD ECU parameters"
    ]
  },
  "candidate-model-b": {
    vehicleId: "candidate-model-b",
    partsScore: 8,
    diagnosticsScore: 8,
    manualsScore: 8,
    warrantyScore: 7,
    leadTechniciansScore: 8,
    workshopScore: 8,
    recoveryScore: 9,
    remoteSupportScore: 7,
    hybridEvScore: 8,
    overallReadiness: 79,
    blockingGaps: [
      "ZF 8-speed electronic automatic transmission diagnostic module requires local technician certification",
      "High-sulfur commercial petrol tolerance validation report pending from factory lab"
    ],
    verifiedCapabilities: [
      "Heavy-duty ladder-frame chassis with proven solid rear axle durability",
      "Factory tropicalization package includes auxiliary transmission cooler and reinforced fan shroud",
      "Dual mechanical differential locks tested in Saharan sand conditions"
    ]
  },
  "candidate-model-c": {
    vehicleId: "candidate-model-c",
    partsScore: 9,
    diagnosticsScore: 9,
    manualsScore: 8,
    warrantyScore: 8,
    leadTechniciansScore: 8,
    workshopScore: 9,
    recoveryScore: 7,
    remoteSupportScore: 8,
    hybridEvScore: 8,
    overallReadiness: 84,
    blockingGaps: [
      "Local bank installment financing protocol required for consumer buyer segment"
    ],
    verifiedCapabilities: [
      "Powertrain shares 85% component commonality with Candidate Model A (parts pooling efficiency)",
      "Dual independent rear AC blowers engineered for rapid cabin cooling at 50°C ambient",
      "High safety crash test rating with multi-airbag passenger protection"
    ]
  },
  "candidate-model-d": {
    vehicleId: "candidate-model-d",
    partsScore: 7,
    diagnosticsScore: 8,
    manualsScore: 8,
    warrantyScore: 8,
    leadTechniciansScore: 7,
    workshopScore: 8,
    recoveryScore: 6,
    remoteSupportScore: 7,
    hybridEvScore: 7,
    overallReadiness: 74,
    blockingGaps: [
      "Low ground clearance (165mm) requires driver operational guidelines for unpaved urban sectors",
      "Replacement windshield inventory required due to gravel road chipping risks"
    ],
    verifiedCapabilities: [
      "High-efficiency 1.5T engine achieves 6.1 L/100km on paved intercity highways",
      "Triple-stage HEPA cabin air filtration isolates interior from dust storms",
      "Full ADAS driver assistance suite with forward collision braking"
    ]
  },
  "candidate-model-e": {
    vehicleId: "candidate-model-e",
    partsScore: 9,
    diagnosticsScore: 9,
    manualsScore: 9,
    warrantyScore: 8,
    leadTechniciansScore: 9,
    workshopScore: 9,
    recoveryScore: 9,
    remoteSupportScore: 8,
    hybridEvScore: 8,
    overallReadiness: 88,
    blockingGaps: [
      "Mining roll-over protection structure (ROPS) certification pending third-party inspection",
      "Consigned maintenance parts package agreement with Akjoujt mining contractor depot"
    ],
    verifiedCapabilities: [
      "Commercial vehicle tariff concession (15% vs 20% passenger tariff) confirmed",
      "Simple manual gearbox and mechanical transfer case repairable by local mechanics",
      "Heavy-duty 1-ton payload suspension with reinforced steel cargo bed liner"
    ]
  },
  "candidate-model-f": {
    vehicleId: "candidate-model-f",
    partsScore: 8,
    diagnosticsScore: 8,
    manualsScore: 7,
    warrantyScore: 7,
    leadTechniciansScore: 8,
    workshopScore: 8,
    recoveryScore: 7,
    remoteSupportScore: 8,
    hybridEvScore: 7,
    overallReadiness: 78,
    blockingGaps: [
      "Ministry of Transport passenger transport regulatory approval for 15-seat configuration",
      "Rear passenger AC ducting flow balancing validation"
    ],
    verifiedCapabilities: [
      "Dual versatility: available as 15-passenger shuttle or 8.5m³ freight delivery van",
      "Rear-wheel drive commercial axle handles heavy luggage and regional cargo loads",
      "Straightforward mechanical turbo diesel engine with low maintenance complexity"
    ]
  },
  "candidate-model-g": {
    vehicleId: "candidate-model-g",
    partsScore: 6,
    diagnosticsScore: 7,
    manualsScore: 7,
    warrantyScore: 8,
    leadTechniciansScore: 6,
    workshopScore: 7,
    recoveryScore: 6,
    remoteSupportScore: 8,
    hybridEvScore: 7,
    overallReadiness: 68,
    blockingGaps: [
      "Gating: Technicians must complete certified 1000V high-voltage safety course prior to customer delivery",
      "Insulated high-voltage tools and safety rescue equipment must be installed at partner workshop",
      "Confirmation of green vehicle customs tariff treatment"
    ],
    verifiedCapabilities: [
      "Super hybrid efficiency delivers 1,100 km range on single tank and charge",
      "Blade Battery passes extreme mechanical puncture tests without thermal runaway",
      "3.3kW V2L external power discharge provides mobile power for equipment or homes"
    ]
  },
  "candidate-model-h": {
    vehicleId: "candidate-model-h",
    partsScore: 5,
    diagnosticsScore: 6,
    manualsScore: 6,
    warrantyScore: 8,
    leadTechniciansScore: 4,
    workshopScore: 5,
    recoveryScore: 5,
    remoteSupportScore: 7,
    hybridEvScore: 5,
    overallReadiness: 54,
    blockingGaps: [
      "Dedicated charging depot and stable electrical grid connection required at municipal facility",
      "Emergency service high-voltage crash extraction protocol not yet trained in Nouakchott",
      "Battery degradation risk under unshaded 45°C+ heat requires shaded parking infrastructure"
    ],
    verifiedCapabilities: [
      "Ultra-low operational running cost (~$0.02/km) dramatically reduces municipal fleet operating expenditure",
      "Zero tailpipe emissions ideal for airport terminals and harbor facilities",
      "Integrated CCS2 DC fast charging compatible with standard 60kW commercial chargers"
    ]
  },
  "candidate-model-i": {
    vehicleId: "candidate-model-i",
    partsScore: 9,
    diagnosticsScore: 9,
    manualsScore: 8,
    warrantyScore: 8,
    leadTechniciansScore: 8,
    workshopScore: 9,
    recoveryScore: 8,
    remoteSupportScore: 8,
    hybridEvScore: 8,
    overallReadiness: 85,
    blockingGaps: [
      "Customs Argus minimum valuation practices confirmation for imported used vehicles (CLM-004)",
      "Pre-shipment SGS / Bureau Veritas certificate verification procedure"
    ],
    verifiedCapabilities: [
      "120-point comprehensive pre-owned mechanical and electrical certification log provided",
      "Compliant with Mauritanian vehicle age limit laws (< 8 years from manufacture)",
      "Backed by 2-year / 60,000 km supplier warranty on major mechanical assemblies"
    ]
  },
  "candidate-model-j": {
    vehicleId: "candidate-model-j",
    partsScore: 8,
    diagnosticsScore: 8,
    manualsScore: 8,
    warrantyScore: 8,
    leadTechniciansScore: 8,
    workshopScore: 8,
    recoveryScore: 8,
    remoteSupportScore: 8,
    hybridEvScore: 8,
    overallReadiness: 81,
    blockingGaps: [
      "CVT transmission heat endurance in sustained loose sand driving requires field monitoring protocol",
      "Local stock of front suspension ball joints and tie-rod ends"
    ],
    verifiedCapabilities: [
      "High ground clearance (196mm) enables confident traversal of unpaved urban access routes",
      "High global production volume ensures affordable, widespread component availability",
      "Compact footprint suited to congested downtown Nouakchott traffic and tight parking"
    ]
  }
};
