import React, { useState } from 'react';
import { Language, FleetInquiry } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { DEMO_ORGANIZATIONS, FLEET_INQUIRIES } from '../data/canonicalData';
import { Pickaxe, Building2, Truck, Landmark, HeartHandshake, CarTaxiFront, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';

interface FleetSectionProps {
  currentLanguage: Language;
  onOpenIntakeWithTab?: (tab: string) => void;
  onSelectVehicleId?: (vehicleId: string) => void;
}

export const FleetSection: React.FC<FleetSectionProps> = ({
  currentLanguage,
  onOpenIntakeWithTab,
  onSelectVehicleId,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [activeSectorFilter, setActiveSectorFilter] = useState<string>('all');

  const sectorCards = [
    {
      id: "Mining",
      icon: <Pickaxe className="w-5 h-5 text-[#e0b555]" />,
      title: t.fleet.miningTitle,
      description: t.fleet.miningDesc,
      recommendedModels: [
        { name: "Candidate Model B (Heavy Overland 4x4)", id: "candidate-model-b" },
        { name: "Candidate Model E (Fleet Pickup 4x4)", id: "candidate-model-e" }
      ],
      keyDutyCycle: "Akjoujt & Zouérat high-silica dust, 48°C+ summer heat, 24/7 quarry hauling",
      partsRequirement: "Dedicated on-site spares consignment & 24/7 lead mechanic dispatch"
    },
    {
      id: "Construction",
      icon: <Building2 className="w-5 h-5 text-[#60a5fa]" />,
      title: t.fleet.constructionTitle,
      description: t.fleet.constructionDesc,
      recommendedModels: [
        { name: "Candidate Model E (Fleet Pickup 4x4)", id: "candidate-model-e" },
        { name: "Candidate Model F (Light Commercial Van)", id: "candidate-model-f" }
      ],
      keyDutyCycle: "Nouakchott port extension, asphalt paving, heavy equipment towing",
      partsRequirement: "High-priority rapid maintenance bay access in Ksar workshop"
    },
    {
      id: "Logistics",
      icon: <Truck className="w-5 h-5 text-[#34d399]" />,
      title: t.fleet.logisticsTitle,
      description: t.fleet.logisticsDesc,
      recommendedModels: [
        { name: "Candidate Model F (Light Commercial Van)", id: "candidate-model-f" },
        { name: "Candidate Model E (Fleet Pickup)", id: "candidate-model-e" }
      ],
      keyDutyCycle: "Intercity freight between Nouakchott, Rosso, and Nouadhibou (80k km/yr)",
      partsRequirement: "Guaranteed 3-year wear parts pricing index and scheduled maintenance"
    },
    {
      id: "Banking & Corporate",
      icon: <Landmark className="w-5 h-5 text-[#c084fc]" />,
      title: t.fleet.banksTitle,
      description: t.fleet.banksDesc,
      recommendedModels: [
        { name: "Candidate Model C (Family Crossover 7-Seat)", id: "candidate-model-c" },
        { name: "Candidate Model D (Executive Sedan)", id: "candidate-model-d" }
      ],
      keyDutyCycle: "Executive banking director transit, protocol and regional branch inspection",
      partsRequirement: "White-glove concierge servicing with replacement loaner vehicle"
    },
    {
      id: "NGO & International",
      icon: <HeartHandshake className="w-5 h-5 text-[#f472b6]" />,
      title: t.fleet.ngoTitle,
      description: t.fleet.ngoDesc,
      recommendedModels: [
        { name: "Candidate Model B (Heavy Overland 4x4)", id: "candidate-model-b" },
        { name: "Candidate Model A (Desert SUV Concept)", id: "candidate-model-a" }
      ],
      keyDutyCycle: "Hodh Ech Chargui (Néma/Bassikounou) remote refugee camp logistics",
      partsRequirement: "Awaiting verified import treatment and service documentation"
    },
    {
      id: "Taxi & Managed Mobility",
      icon: <CarTaxiFront className="w-5 h-5 text-[#fbbf24]" />,
      title: t.fleet.taxiTitle,
      description: t.fleet.taxiDesc,
      recommendedModels: [
        { name: "Candidate Model G (Urban Hybrid DM-i)", id: "candidate-model-g" },
        { name: "Candidate Model J (Compact Utility)", id: "candidate-model-j" }
      ],
      keyDutyCycle: "Nouakchott high-density urban transit (300+ km daily in stop-and-go heat)",
      partsRequirement: "Fast-turnaround express maintenance bays with fixed per-km service pricing"
    }
  ];

  const filteredOrgs = DEMO_ORGANIZATIONS.filter(org => 
    activeSectorFilter === 'all' || org.sector === activeSectorFilter
  );

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded text-xs font-semibold bg-[#b58a35]/20 text-[#e0b555] border border-[#b58a35]/40 tracking-wide uppercase">
            Institutional Procurement
          </span>
          <span className="text-xs text-[#7e91a6]">
            Phase 0 Demonstration Architecture
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#f0f4f8] tracking-tight">
          {t.fleet.title}
        </h1>
        <p className="text-base text-[#8fa4bb] mt-3 leading-relaxed">
          {t.fleet.subtitle}
        </p>
      </div>

      {/* Sector Cards Grid */}
      <div className="mb-14">
        <h2 className="text-xl font-bold text-[#f0f4f8] mb-6 flex items-center gap-2">
          <span>{t.fleet.sectorsHeading}</span>
          <span className="text-xs font-normal text-[#7e91a6]">
            (6 Targeted Economic Verticals)
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectorCards.map((sector) => (
            <div
              key={sector.id}
              className="bg-[#101925] border border-[#1d2b3c] rounded-xl p-5 flex flex-col justify-between hover:border-[#2b415c] transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-lg bg-[#152333] border border-[#20344d]">
                    {sector.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-[#8ca1b8] bg-[#14202e] px-2 py-0.5 rounded border border-[#1b2b3d]">
                    {sector.id}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#f0f4f8] group-hover:text-white transition-colors mb-2">
                  {sector.title}
                </h3>
                <p className="text-xs text-[#8ca1b8] leading-relaxed mb-4">
                  {sector.description}
                </p>

                {/* Duty Cycle Box */}
                <div className="bg-[#0b121a] border border-[#182535] rounded-lg p-2.5 mb-3 text-[11px]">
                  <span className="text-[#e0b555] font-semibold block mb-0.5">Operating Conditions:</span>
                  <span className="text-[#7e91a6]">{sector.keyDutyCycle}</span>
                </div>

                {/* Service SLA Requirement */}
                <div className="bg-[#0b121a] border border-[#182535] rounded-lg p-2.5 mb-4 text-[11px]">
                  <span className="text-[#60a5fa] font-semibold block mb-0.5">After-Sales SLA:</span>
                  <span className="text-[#7e91a6]">{sector.partsRequirement}</span>
                </div>
              </div>

              {/* Recommended Candidate Vehicles */}
              <div>
                <div className="text-[11px] font-semibold text-[#9fb1c5] mb-1.5">Candidate Match:</div>
                <div className="space-y-1">
                  {sector.recommendedModels.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => onSelectVehicleId && onSelectVehicleId(m.id)}
                      className="w-full text-left text-[11px] px-2 py-1 rounded bg-[#131f2d] text-[#b58a35] hover:bg-[#1a2c42] hover:text-[#e0b555] flex items-center justify-between transition-colors border border-[#1c2e42]"
                    >
                      <span className="truncate">{m.name}</span>
                      <ChevronRight className="w-3 h-3 shrink-0 ml-1" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seeded Demonstration Organizations & Inquiry Callout */}
      <div className="bg-[#0e1622] border border-[#1e2e42] rounded-2xl p-6 sm:p-8 mb-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#1b2a3d] mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#3b82f6]/20 text-[#60a5fa] border border-[#3b82f6]/30 uppercase tracking-wider">
                Fictional Demonstration Organizations
              </span>
              <span className="text-xs text-[#7e91a6]">7 Sample Enterprise Profiles</span>
            </div>
            <h3 className="text-xl font-bold text-[#f0f4f8]">
              Active Institutional Fleet Dialogue Samples
            </h3>
            <p className="text-xs text-[#8ca1b8] mt-1">
              Simulated commercial procurement profiles illustrating vehicle requirements across Mauritania.
            </p>
          </div>
          <button
            onClick={() => onOpenIntakeWithTab && onOpenIntakeWithTab('fleet')}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#b58a35] to-[#9c752c] text-[#0c131c] font-bold text-xs hover:brightness-110 transition-all shrink-0 shadow-sm flex items-center gap-2"
          >
            <span>Request Structured Fleet Consultation</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Sector Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
          <button
            onClick={() => setActiveSectorFilter('all')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              activeSectorFilter === 'all'
                ? 'bg-[#b58a35] text-[#0c131c] font-bold'
                : 'bg-[#14202e] text-[#7e91a6] hover:text-white border border-[#1d2d40]'
            }`}
          >
            All Sectors ({DEMO_ORGANIZATIONS.length})
          </button>
          {['Mining', 'Construction', 'Logistics', 'Banking & Corporate', 'NGO & International', 'Government / Public', 'Taxi & Managed Mobility'].map((sec) => (
            <button
              key={sec}
              onClick={() => setActiveSectorFilter(sec)}
              className={`whitespace-nowrap px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                activeSectorFilter === sec
                  ? 'bg-[#b58a35] text-[#0c131c] font-bold'
                  : 'bg-[#14202e] text-[#7e91a6] hover:text-white border border-[#1d2d40]'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        {/* Organizations Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-[11px] text-[#7e91a6] bg-[#121c2a] border-b border-[#1b2a3d] uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Organization</th>
                <th className="px-4 py-3">Sector</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Fleet Size</th>
                <th className="px-4 py-3">Current Benchmark</th>
                <th className="px-4 py-3">Decision Maker</th>
                <th className="px-4 py-3">Service Expectation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#172332]">
              {filteredOrgs.map((org) => (
                <tr key={org.id} className="hover:bg-[#131f2d] transition-colors">
                  <td className="px-4 py-3 font-semibold text-[#f0f4f8]">
                    {org.name}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-[#1a2838] text-[#9fb1c5] border border-[#23374d]">
                      {org.sector}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#8ca1b8]">{org.city}</td>
                  <td className="px-4 py-3 font-bold text-[#e0b555]">{org.estimatedFleetSize} units</td>
                  <td className="px-4 py-3 text-[#7e91a6]">{org.currentVehicles}</td>
                  <td className="px-4 py-3 text-[#d0dbe6]">{org.decisionMaker}</td>
                  <td className="px-4 py-3 text-[#8ca1b8] max-w-xs truncate" title={org.serviceExpectation}>
                    {org.serviceExpectation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
