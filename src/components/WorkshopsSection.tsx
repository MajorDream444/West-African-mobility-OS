import React, { useState } from 'react';
import { Language, WorkshopLead } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { MAPPED_WORKSHOPS } from '../data/canonicalData';
import { Wrench, ShieldCheck, Zap, Laptop, Box, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react';

interface WorkshopsSectionProps {
  currentLanguage: Language;
  onOpenIntakeWithTab?: (tab: string) => void;
}

export const WorkshopsSection: React.FC<WorkshopsSectionProps> = ({
  currentLanguage,
  onOpenIntakeWithTab,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [cityFilter, setCityFilter] = useState<string>('all');

  const standards = [
    {
      icon: <Wrench className="w-5 h-5 text-[#e0b555]" />,
      title: "Certified Hydraulic Lifting Bays",
      description: t.workshops.criterion1,
      metric: "Min. 4-6 bays, certified 2-post & 4-post lifts"
    },
    {
      icon: <Zap className="w-5 h-5 text-[#60a5fa]" />,
      title: "Industrial 3-Phase Power Feed",
      description: t.workshops.criterion2,
      metric: "Dedicated 3-phase connection + standby generator"
    },
    {
      icon: <Laptop className="w-5 h-5 text-[#34d399]" />,
      title: "Multilingual Diagnostic Tablets",
      description: t.workshops.criterion3,
      metric: "OEM VDS & universal OBD with Arabic & French"
    },
    {
      icon: <Box className="w-5 h-5 text-[#f472b6]" />,
      title: "Climate-Controlled Spares Depot",
      description: t.workshops.criterion4,
      metric: "Dust-sealed warehouse with computerized barcode inventory"
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#c084fc]" />,
      title: "Certified Electronic & AC Technicians",
      description: t.workshops.criterion5,
      metric: "Minimum 2 certified master mechanics per 4 bays"
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-[#fbbf24]" />,
      title: "High-Voltage EV/Hybrid Safety Tools",
      description: t.workshops.criterion6,
      metric: "1000V insulated hand tools, rescue hooks, rubber matting"
    }
  ];

  const filteredWorkshops = MAPPED_WORKSHOPS.filter(w => {
    const loc = w.location || (w as any).city || '';
    return cityFilter === 'all' || loc.toLowerCase().includes(cityFilter.toLowerCase());
  });

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded text-xs font-semibold bg-[#b58a35]/20 text-[#e0b555] border border-[#b58a35]/40 tracking-wide uppercase">
            Service Network Infrastructure
          </span>
          <span className="text-xs text-[#7e91a6]">
            10 Mapped Corridor Facilities
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#f0f4f8] tracking-tight">
          {t.workshops.title}
        </h1>
        <p className="text-base text-[#8fa4bb] mt-3 leading-relaxed">
          {t.workshops.subtitle}
        </p>
      </div>

      {/* Accreditation Standards Grid */}
      <div className="mb-14">
        <h2 className="text-xl font-bold text-[#f0f4f8] mb-6">
          {t.workshops.criteriaHeading}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {standards.map((std, idx) => (
            <div
              key={idx}
              className="bg-[#101925] border border-[#1d2b3c] rounded-xl p-5 flex flex-col justify-between hover:border-[#2b415c] transition-all"
            >
              <div>
                <div className="p-2.5 rounded-lg bg-[#152333] border border-[#20344d] w-fit mb-3">
                  {std.icon}
                </div>
                <h3 className="text-base font-bold text-[#f0f4f8] mb-2">
                  {std.title}
                </h3>
                <p className="text-xs text-[#8ca1b8] leading-relaxed mb-4">
                  {std.description}
                </p>
              </div>
              <div className="bg-[#0b121a] border border-[#182535] rounded-lg px-3 py-2 text-[11px] text-[#e0b555] font-medium">
                {std.metric}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 10 Mapped Corridor Workshops Directory */}
      <div className="bg-[#0e1622] border border-[#1e2e42] rounded-2xl p-6 sm:p-8 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1b2a3d] mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#10b981]/20 text-[#34d399] border border-[#10b981]/30 uppercase tracking-wider">
                Phase 0 Facility Audit
              </span>
              <span className="text-xs text-[#7e91a6]">10 Corridor Garages Mapped</span>
            </div>
            <h3 className="text-xl font-bold text-[#f0f4f8]">
              Authorized Service Network Directory
            </h3>
            <p className="text-xs text-[#8ca1b8] mt-1">
              Screened partner garages across Nouakchott, Nouadhibou, Rosso, and Atar.
            </p>
          </div>
          <button
            onClick={() => onOpenIntakeWithTab && onOpenIntakeWithTab('workshop')}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#b58a35] to-[#9c752c] text-[#0c131c] font-bold text-xs hover:brightness-110 transition-all flex items-center gap-1.5 shrink-0"
          >
            <span>Register Your Garage</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* City Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
          <button
            onClick={() => setCityFilter('all')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              cityFilter === 'all'
                ? 'bg-[#b58a35] text-[#0c131c] font-bold'
                : 'bg-[#14202e] text-[#7e91a6] hover:text-white border border-[#1d2d40]'
            }`}
          >
            All Cities ({MAPPED_WORKSHOPS.length})
          </button>
          {['Nouakchott', 'Nouadhibou', 'Rosso', 'Atar'].map((city) => (
            <button
              key={city}
              onClick={() => setCityFilter(city)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                cityFilter === city
                  ? 'bg-[#b58a35] text-[#0c131c] font-bold'
                  : 'bg-[#14202e] text-[#7e91a6] hover:text-white border border-[#1d2d40]'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Workshops Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-[11px] text-[#7e91a6] bg-[#121c2a] border-b border-[#1b2a3d] uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Facility Name</th>
                <th className="px-4 py-3">City & District</th>
                <th className="px-4 py-3">Managing Director</th>
                <th className="px-4 py-3 text-center">Bays</th>
                <th className="px-4 py-3 text-center">Lifts</th>
                <th className="px-4 py-3">3-Phase Power</th>
                <th className="px-4 py-3">Audit Readiness</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#162231]">
              {filteredWorkshops.map((w) => {
                const name = w.businessName || (w as any).workshopName;
                const loc = w.location || (w as any).city;
                const has3p = w.hasThreePhasePower ?? (w as any).threePhase ?? true;
                const tools = w.diagnosticToolsOwned || (w as any).diagnosticTools;
                return (
                  <tr key={w.id} className="hover:bg-[#131f2d] transition-colors">
                    <td className="px-4 py-3 font-semibold text-[#f0f4f8]">
                      {name}
                      <span className="block text-[10px] text-[#7e91a6]">{tools}</span>
                    </td>
                    <td className="px-4 py-3 text-[#8ca1b8]">{loc}</td>
                    <td className="px-4 py-3 text-[#d0dbe6]">{w.ownerName}</td>
                    <td className="px-4 py-3 text-center font-bold text-[#e0b555]">{w.bayCount}</td>
                    <td className="px-4 py-3 text-center font-bold text-[#60a5fa]">{w.liftCount}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                        has3p
                          ? 'bg-[#10b981]/15 text-[#34d399] border border-[#10b981]/30'
                          : 'bg-[#ef4444]/15 text-[#f87171] border border-[#ef4444]/30'
                      }`}>
                        {has3p ? 'Yes (3-Phase)' : 'Single Phase'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#f0f4f8]">{w.readinessScore}%</span>
                        <div className="w-16 h-1.5 bg-[#1b2b3d] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#b58a35] to-[#34d399]"
                            style={{ width: `${w.readinessScore}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-[#10b981]/20 text-[#34d399] border border-[#10b981]/40">
                        {w.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
