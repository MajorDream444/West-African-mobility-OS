import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Compass, MapPin, Network, ShieldCheck, Cpu, ArrowRight, Layers, Building2 } from 'lucide-react';

interface CorridorVisionSectionProps {
  currentLanguage: Language;
  onExploreVehicles?: () => void;
  onSwitchToDashboard?: (tab: string) => void;
}

export const CorridorVisionSection: React.FC<CorridorVisionSectionProps> = ({
  currentLanguage,
  onExploreVehicles,
  onSwitchToDashboard,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded text-xs font-semibold bg-[#b58a35]/20 text-[#e0b555] border border-[#b58a35]/40 tracking-wide uppercase">
            Sovereign Regional Architecture
          </span>
          <span className="text-xs text-[#7e91a6]">
            Mauritania • Senegal Corridor
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#f0f4f8] tracking-tight">
          {t.corridor.title}
        </h1>
        <p className="text-base text-[#8fa4bb] mt-3 leading-relaxed">
          {t.corridor.subtitle}
        </p>
      </div>

      {/* Constitutional Thesis Callout Box */}
      <div className="mb-12 bg-gradient-to-br from-[#131e2c] via-[#0f1722] to-[#0c131c] border-2 border-[#b58a35]/50 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#b58a35]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#b58a35]/20 border border-[#b58a35]/40 text-[#e0b555] text-xs font-bold uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>{t.thesis.title}</span>
          </div>
          <blockquote className="text-lg sm:text-xl md:text-2xl font-semibold text-[#f0f4f8] leading-relaxed italic">
            "{t.thesis.quote}"
          </blockquote>
          <p className="mt-4 text-xs sm:text-sm font-medium text-[#b58a35]">
            {t.thesis.attribution}
          </p>
        </div>
      </div>

      {/* Two Country Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Node 1: Mauritania Controlled Node */}
        <div className="bg-[#101925] border border-[#203147] rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#b58a35]/60 transition-all group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[#b58a35]/20 border border-[#b58a35]/40 flex items-center justify-center font-bold text-[#e0b555] text-sm">
                  MR
                </span>
                <div>
                  <h3 className="text-lg font-bold text-[#f0f4f8]">
                    {t.corridor.nodeMauritaniaTitle}
                  </h3>
                  <span className="text-[11px] text-[#34d399] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
                    Active Controlled Evidence Sprint
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#8ca1b8] leading-relaxed mb-6">
              {t.corridor.nodeMauritaniaDesc}
            </p>

            <div className="space-y-3 mb-6 text-xs">
              <div className="bg-[#0b121a] p-3 rounded-xl border border-[#172535]">
                <span className="font-semibold text-[#f0f4f8] block mb-0.5">Primary Entry Hub:</span>
                <span className="text-[#7e91a6]">Port Autonome de Nouakchott (PANPA) single-window customs clearance</span>
              </div>
              <div className="bg-[#0b121a] p-3 rounded-xl border border-[#172535]">
                <span className="font-semibold text-[#f0f4f8] block mb-0.5">Key Operational Corridors:</span>
                <span className="text-[#7e91a6]">Nouakchott (Urban) • Zouérat & Akjoujt (Mining) • Rosso (Agricultural) • Nouadhibou (Fisheries)</span>
              </div>
              <div className="bg-[#0b121a] p-3 rounded-xl border border-[#172535]">
                <span className="font-semibold text-[#f0f4f8] block mb-0.5">Ground Verification Lead:</span>
                <span className="text-[#e0b555]">Diallo (Proposed Mauritania Market Lead, ref: DEC-004)</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#182637] flex items-center justify-between">
            <span className="text-xs font-bold text-[#f0f4f8]">Node Readiness Score:</span>
            <span className="text-sm font-extrabold text-[#34d399]">78 / 100</span>
          </div>
        </div>

        {/* Node 2: Senegal Complementary Hub */}
        <div className="bg-[#101925] border border-[#203147] rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#60a5fa]/60 transition-all group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[#3b82f6]/20 border border-[#3b82f6]/40 flex items-center justify-center font-bold text-[#60a5fa] text-sm">
                  SN
                </span>
                <div>
                  <h3 className="text-lg font-bold text-[#f0f4f8]">
                    {t.corridor.nodeSenegalTitle}
                  </h3>
                  <span className="text-[11px] text-[#e0b555] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e0b555]" />
                    Proposed Regional Horizon Hub
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#8ca1b8] leading-relaxed mb-6">
              {t.corridor.nodeSenegalDesc}
            </p>

            <div className="space-y-3 mb-6 text-xs">
              <div className="bg-[#0b121a] p-3 rounded-xl border border-[#172535]">
                <span className="font-semibold text-[#f0f4f8] block mb-0.5">Regional Value-Add:</span>
                <span className="text-[#7e91a6]">Technical training university linkages, high-voltage battery rebuild, cross-border parts pooling</span>
              </div>
              <div className="bg-[#0b121a] p-3 rounded-xl border border-[#172535]">
                <span className="font-semibold text-[#f0f4f8] block mb-0.5">Corridor Connection:</span>
                <span className="text-[#7e91a6]">Rosso Ferry & Bridge crossing connecting Nouakchott to Saint-Louis & Dakar</span>
              </div>
              <div className="bg-[#0b121a] p-3 rounded-xl border border-[#172535]">
                <span className="font-semibold text-[#f0f4f8] block mb-0.5">Governance Status:</span>
                <span className="text-[#60a5fa]">Evidence-gated scoping under VISION.md (ref: CLM-012)</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#182637] flex items-center justify-between">
            <span className="text-xs font-bold text-[#f0f4f8]">Node Readiness Score:</span>
            <span className="text-sm font-extrabold text-[#e0b555]">42 / 100</span>
          </div>
        </div>
      </div>

      {/* Technology & Governance Layers: HAMAL & Dual-Lane */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* HAMAL Decentralized Intelligence */}
        <div className="bg-[#0d141e] border border-[#1a293b] rounded-2xl p-6 sm:p-7">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-[#172436] border border-[#253952] text-[#60a5fa]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#f0f4f8]">
                {t.corridor.hamalTitle}
              </h4>
              <span className="text-[10px] text-[#7e91a6] font-mono">
                Hanzo • Art Mob AGInts • Lux Framework
              </span>
            </div>
          </div>
          <p className="text-xs text-[#8ca1b8] leading-relaxed mb-4">
            {t.corridor.hamalDesc}
          </p>
          <div className="space-y-2 text-[11px] text-[#cad6e3]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#60a5fa]" />
              <span>Immutable vehicle provenance and ownership title tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#60a5fa]" />
              <span>Diagnostic scanner telemetry and service milestone log</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#60a5fa]" />
              <span>Mechanic cohort certification and skill level verification</span>
            </div>
          </div>
        </div>

        {/* Dual-Lane Governance Architecture */}
        <div className="bg-[#0d141e] border border-[#1a293b] rounded-2xl p-6 sm:p-7">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-[#172436] border border-[#253952] text-[#e0b555]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#f0f4f8]">
                {t.corridor.governanceDualLaneTitle}
              </h4>
              <span className="text-[10px] text-[#7e91a6] font-mono">
                Constitutional Separation (DEC-006)
              </span>
            </div>
          </div>
          <p className="text-xs text-[#8ca1b8] leading-relaxed mb-4">
            {t.corridor.governanceDualLaneDesc}
          </p>
          <div className="space-y-2 text-[11px] text-[#cad6e3]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e0b555]" />
              <span><strong>Marine Foundation:</strong> Non-profit educational convener, workforce training curriculum, and research.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e0b555]" />
              <span><strong>Commercial Operating SPV:</strong> Ring-fenced commercial entity carrying import liability, contracts, and banking.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e0b555]" />
              <span>Protects philanthropic mission while enabling rigorous capital execution.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
