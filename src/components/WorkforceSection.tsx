import React, { useState } from 'react';
import { Language, MechanicCandidate } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { MECHANIC_CANDIDATES } from '../data/canonicalData';
import { GraduationCap, Award, Cpu, Wrench, Building, Users, Globe2, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

interface WorkforceSectionProps {
  currentLanguage: Language;
  onOpenIntakeWithTab?: (tab: string) => void;
}

export const WorkforceSection: React.FC<WorkforceSectionProps> = ({
  currentLanguage,
  onOpenIntakeWithTab,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [activePathwayStage, setActivePathwayStage] = useState<number>(1);
  const [searchMechanic, setSearchMechanic] = useState<string>('');

  const stages = [
    {
      num: 1,
      name: t.workforce.stage1,
      description: t.workforce.stage1Desc,
      icon: <GraduationCap className="w-5 h-5 text-[#60a5fa]" />,
      timeframe: "Months 1-6",
      qualification: "Vocational school graduate or garage apprentice with 1+ years bench experience",
      coreCompetency: "Workshop safety, electrical safety, fast lube, oil/filter service, mechanical brake pads"
    },
    {
      num: 2,
      name: t.workforce.stage2,
      description: t.workforce.stage2Desc,
      icon: <Award className="w-5 h-5 text-[#34d399]" />,
      timeframe: "Months 7-18",
      qualification: "Certified Technician",
      coreCompetency: "Electronic fuel injection, common rail turbo diesel pressure systems, A/C refrigerant recovery"
    },
    {
      num: 3,
      name: t.workforce.stage3,
      description: t.workforce.stage3Desc,
      icon: <Cpu className="w-5 h-5 text-[#e0b555]" />,
      timeframe: "Years 2-3",
      qualification: "Lead Diagnostic Technician",
      coreCompetency: "CAN-bus multiplex protocol tracing, oscilloscope digital waveform diagnostics, ECU flashing & pairing"
    },
    {
      num: 4,
      name: t.workforce.stage4,
      description: t.workforce.stage4Desc,
      icon: <Wrench className="w-5 h-5 text-[#f472b6]" />,
      timeframe: "Years 3-4",
      qualification: "Mobile Service Entrepreneur",
      coreCompetency: "Independent mobile recovery van operations, on-site fleet preventative maintenance, customer billing"
    },
    {
      num: 5,
      name: t.workforce.stage5,
      description: t.workforce.stage5Desc,
      icon: <Building className="w-5 h-5 text-[#c084fc]" />,
      timeframe: "Years 4-5",
      qualification: "Accredited Workshop Operator",
      coreCompetency: "Managing multi-bay service center, warranty claim processing, inventory warehousing, parts logistics"
    },
    {
      num: 6,
      name: t.workforce.stage6,
      description: t.workforce.stage6Desc,
      icon: <Users className="w-5 h-5 text-[#fbbf24]" />,
      timeframe: "Years 5-7",
      qualification: "Equity Partner & Franchise Owner",
      coreCompetency: "Co-ownership in regional service center franchises, profit-sharing, regional parts depot ownership"
    },
    {
      num: 7,
      name: t.workforce.stage7,
      description: t.workforce.stage7Desc,
      icon: <Globe2 className="w-5 h-5 text-[#38bdf8]" />,
      timeframe: "Year 7+",
      qualification: "National / Regional Technical Leader",
      coreCompetency: "Directing sovereign vocational academies, training cohorts across Mauritania and Senegal corridors"
    }
  ];

  const filteredMechanics = MECHANIC_CANDIDATES.filter(m => 
    m.fullName.toLowerCase().includes(searchMechanic.toLowerCase()) ||
    m.city.toLowerCase().includes(searchMechanic.toLowerCase()) ||
    m.specialties.some(s => s.toLowerCase().includes(searchMechanic.toLowerCase()))
  );

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded text-xs font-semibold bg-[#b58a35]/20 text-[#e0b555] border border-[#b58a35]/40 tracking-wide uppercase">
            Workforce Capacity Building
          </span>
          <span className="text-xs text-[#7e91a6]">
            Proposed registry priority (DEC-008)
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#f0f4f8] tracking-tight">
          {t.workforce.title}
        </h1>
        <p className="text-base text-[#8fa4bb] mt-3 leading-relaxed">
          {t.workforce.subtitle}
        </p>
      </div>

      {/* 7-Stage Progression Pathway */}
      <div className="mb-14 bg-[#0d151f] border border-[#1d2a3a] rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl font-bold text-[#f0f4f8]">
              {t.workforce.pathwayHeading}
            </h2>
            <p className="text-xs text-[#7e91a6] mt-1">
              From apprentice to sovereign technical equity partner. Click a stage to review competencies.
            </p>
          </div>
          <button
            onClick={() => onOpenIntakeWithTab && onOpenIntakeWithTab('mechanic')}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#b58a35] to-[#9c752c] text-[#0c131c] font-bold text-xs hover:brightness-110 transition-all flex items-center gap-1.5 shrink-0"
          >
            <span>Apply to Join Cohort</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Pathway Stage Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-8">
          {stages.map((st) => (
            <button
              key={st.num}
              onClick={() => setActivePathwayStage(st.num)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[95px] ${
                activePathwayStage === st.num
                  ? 'bg-[#182638] border-[#b58a35] text-white shadow-md'
                  : 'bg-[#111c29] border-[#1c2b3d] text-[#8ca1b8] hover:bg-[#152333]'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-[10px] font-bold text-[#e0b555]">Stage {st.num}</span>
                {st.icon}
              </div>
              <div className="text-xs font-semibold leading-tight line-clamp-2">
                {st.name.split('. ')[1] || st.name}
              </div>
            </button>
          ))}
        </div>

        {/* Active Stage Detailed Card */}
        {(() => {
          const st = stages.find(s => s.num === activePathwayStage) || stages[0];
          return (
            <div className="bg-[#121c29] border border-[#213348] rounded-xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-[#1c2c3e]">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#1a293b] border border-[#263c55]">
                    {st.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#f0f4f8]">{st.name}</h3>
                    <span className="text-xs text-[#e0b555] font-semibold">{st.qualification}</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#1a2a3c] text-[#8fa4bb] border border-[#23384f] w-fit">
                  {st.timeframe}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div>
                  <h4 className="font-semibold text-[#8fa4bb] mb-1.5 uppercase text-[11px] tracking-wider">
                    Core Technical Competencies:
                  </h4>
                  <p className="text-[#d0dbe6] leading-relaxed bg-[#0b121a] p-3 rounded-lg border border-[#1a2839]">
                    {st.coreCompetency}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#8fa4bb] mb-1.5 uppercase text-[11px] tracking-wider">
                    Economic & Career Outcome:
                  </h4>
                  <p className="text-[#d0dbe6] leading-relaxed bg-[#0b121a] p-3 rounded-lg border border-[#1a2839]">
                    {st.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* 20-Mechanic Train-the-Trainer Cohort Feature */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">
        {/* Left 2 Cols: Cohort Details & Screened Roster */}
        <div className="lg:col-span-2 bg-[#0e1622] border border-[#1e2e42] rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#3b82f6]/20 text-[#60a5fa] border border-[#3b82f6]/30 uppercase tracking-wider">
                  Phase 0 Demonstration Roster
                </span>
                <span className="text-xs text-[#7e91a6]">Candidate count awaiting evidence</span>
              </div>
              <h3 className="text-xl font-bold text-[#f0f4f8]">
                {t.workforce.cohortCardTitle}
              </h3>
              <p className="text-xs text-[#8ca1b8] mt-1">
                Demonstration workflow only. No technician screening, academy, instructor, schedule, or OEM participation is confirmed.
              </p>
            </div>
            <input
              type="text"
              placeholder="Search candidate name or skill..."
              value={searchMechanic}
              onChange={(e) => setSearchMechanic(e.target.value)}
              className="px-3 py-1.5 bg-[#121c27] border border-[#202f43] rounded-lg text-xs text-[#f0f4f8] placeholder-[#5f748a] focus:outline-none focus:border-[#b58a35] transition-colors w-full sm:w-60"
            />
          </div>

          {/* Fictional demonstration mechanics only */}
          <div className="overflow-x-auto max-h-[460px] overflow-y-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-[11px] text-[#7e91a6] bg-[#121c2a] border-b border-[#1b2a3d] sticky top-0 uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-2.5">Candidate</th>
                  <th className="px-3 py-2.5">Location</th>
                  <th className="px-3 py-2.5">Exp</th>
                  <th className="px-3 py-2.5">Specialties</th>
                  <th className="px-3 py-2.5">OBD Tool</th>
                  <th className="px-3 py-2.5">Stage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#162231]">
                {filteredMechanics.slice(0, 10).map((m) => (
                  <tr key={m.id} className="hover:bg-[#131f2d] transition-colors">
                    <td className="px-3 py-2.5">
                      <div className="font-semibold text-[#f0f4f8]">{m.fullName}</div>
                      <div className="text-[10px] text-[#7e91a6]">{m.currentWorkshop}</div>
                    </td>
                    <td className="px-3 py-2.5 text-[#8ca1b8]">{m.city}</td>
                    <td className="px-3 py-2.5 font-bold text-[#e0b555]">{m.yearsExperience} yrs</td>
                    <td className="px-3 py-2.5">
                      <div className="flex flex-wrap gap-1">
                        {m.specialties.map((s, idx) => (
                          <span key={idx} className="text-[9px] bg-[#162434] text-[#9fc7f5] px-1.5 py-0.2 rounded border border-[#21364d]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                        m.hasDiagnosticExperience
                          ? 'bg-[#10b981]/15 text-[#34d399] border border-[#10b981]/30'
                          : 'bg-[#64748b]/15 text-[#94a3b8]'
                      }`}>
                        {m.hasDiagnosticExperience ? 'Yes' : 'Basic'}
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="text-[10px] font-semibold text-[#e0b555] bg-[#b58a35]/10 px-1.5 py-0.5 rounded border border-[#b58a35]/30">
                        {m.pathwayStage}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pt-3 text-right">
            <span className="text-[11px] text-[#7e91a6]">
              Showing top 10 of {filteredMechanics.length} candidates. Complete 20-candidate dossier accessible in Operator Demo.
            </span>
          </div>
        </div>

        {/* Right Col: Academy Specifications & Intake CTA */}
        <div className="bg-[#101824] border border-[#1e2e42] rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#e0b555]" />
              <span className="text-xs font-bold text-[#e0b555] uppercase tracking-wider">
                14-Day OEM Master Academy
              </span>
            </div>
            <h4 className="text-base font-bold text-[#f0f4f8] mb-3">
              Direct Knowledge Transfer from China
            </h4>
            <p className="text-xs text-[#8ca1b8] leading-relaxed mb-4">
              {t.workforce.cohortCardDesc}
            </p>

            <div className="space-y-2.5 mb-6 text-xs">
              <div className="flex items-start gap-2 text-[#cad6e3]">
                <CheckCircle2 className="w-4 h-4 text-[#34d399] shrink-0 mt-0.5" />
                <span>Bilingual Chinese/French Master Diagnostic Engineers on-site</span>
              </div>
              <div className="flex items-start gap-2 text-[#cad6e3]">
                <CheckCircle2 className="w-4 h-4 text-[#34d399] shrink-0 mt-0.5" />
                <span>Hands-on training directly on demonstration vehicles</span>
              </div>
              <div className="flex items-start gap-2 text-[#cad6e3]">
                <CheckCircle2 className="w-4 h-4 text-[#34d399] shrink-0 mt-0.5" />
                <span>Arabic/French multilingual diagnostic tablet allocation</span>
              </div>
              <div className="flex items-start gap-2 text-[#cad6e3]">
                <CheckCircle2 className="w-4 h-4 text-[#34d399] shrink-0 mt-0.5" />
                <span>High-voltage safety certification for hybrid candidates</span>
              </div>
            </div>
          </div>

          <div className="bg-[#14202e] border border-[#22354c] rounded-xl p-4">
            <div className="text-xs font-bold text-[#f0f4f8] mb-1">
              Want to join the next intake?
            </div>
            <p className="text-[11px] text-[#7e91a6] mb-3">
              Registration is free and open to experienced garage technicians and vocational apprentices.
            </p>
            <button
              onClick={() => onOpenIntakeWithTab && onOpenIntakeWithTab('mechanic')}
              className="w-full py-2 px-3 rounded-lg bg-[#b58a35] text-[#0c131c] font-bold text-xs hover:brightness-110 transition-colors shadow-sm text-center"
            >
              Submit Mechanic Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
