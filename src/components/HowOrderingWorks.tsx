import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Search, FileCheck, Users, Wrench, Landmark, Ship, GraduationCap, CheckCircle2, ChevronRight, Lock } from 'lucide-react';

interface HowOrderingWorksProps {
  currentLanguage: Language;
  onCtaClick: () => void;
}

export const HowOrderingWorks: React.FC<HowOrderingWorksProps> = ({
  currentLanguage,
  onCtaClick,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const steps = [
    {
      num: "01",
      icon: <Search className="w-5 h-5 text-[#e0b555]" />,
      title: t.ordering.step1,
      desc: t.ordering.step1Desc,
      badge: "Completed",
      badgeColor: "bg-[#10b981]/20 text-[#34d399] border-[#10b981]/40"
    },
    {
      num: "02",
      icon: <FileCheck className="w-5 h-5 text-[#60a5fa]" />,
      title: t.ordering.step2,
      desc: t.ordering.step2Desc,
      badge: "In Progress",
      badgeColor: "bg-[#3b82f6]/20 text-[#60a5fa] border-[#3b82f6]/40"
    },
    {
      num: "03",
      icon: <Users className="w-5 h-5 text-[#34d399]" />,
      title: t.ordering.step3,
      desc: t.ordering.step3Desc,
      badge: "Active Intake",
      badgeColor: "bg-[#10b981]/20 text-[#34d399] border-[#10b981]/40"
    },
    {
      num: "04",
      icon: <Wrench className="w-5 h-5 text-[#f472b6]" />,
      title: t.ordering.step4,
      desc: t.ordering.step4Desc,
      badge: "Pre-Screened",
      badgeColor: "bg-[#ec4899]/20 text-[#f472b6] border-[#ec4899]/40"
    },
    {
      num: "05",
      icon: <Landmark className="w-5 h-5 text-[#c084fc]" />,
      title: t.ordering.step5,
      desc: t.ordering.step5Desc,
      badge: "Bank Escrow",
      badgeColor: "bg-[#a855f7]/20 text-[#c084fc] border-[#a855f7]/40"
    },
    {
      num: "06",
      icon: <Ship className="w-5 h-5 text-[#38bdf8]" />,
      title: t.ordering.step6,
      desc: t.ordering.step6Desc,
      badge: "2-Unit Demo",
      badgeColor: "bg-[#0284c7]/20 text-[#38bdf8] border-[#0284c7]/40"
    },
    {
      num: "07",
      icon: <GraduationCap className="w-5 h-5 text-[#fbbf24]" />,
      title: t.ordering.step7,
      desc: t.ordering.step7Desc,
      badge: "14-Day Cohort",
      badgeColor: "bg-[#f59e0b]/20 text-[#fbbf24] border-[#f59e0b]/40"
    },
    {
      num: "08",
      icon: <CheckCircle2 className="w-5 h-5 text-[#e0b555]" />,
      title: t.ordering.step8,
      desc: t.ordering.step8Desc,
      badge: "Phase 1 Gate",
      badgeColor: "bg-[#b58a35]/20 text-[#e0b555] border-[#b58a35]/40"
    }
  ];

  return (
    <section id="ordering-section" className="py-14 sm:py-20 bg-[#0c131c] border-y border-[#182434]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#b58a35]/20 text-[#e0b555] border border-[#b58a35]/40 tracking-wider uppercase mb-2">
            Governance & Execution Discipline
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f0f4f8] tracking-tight">
            {t.ordering.title}
          </h2>
          <p className="text-sm text-[#8fa4bb] mt-2 leading-relaxed">
            {t.ordering.subtitle}
          </p>
        </div>

        {/* 8 Controlled Loop Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-[#111925] border border-[#1d2a3c] rounded-xl p-5 flex flex-col justify-between hover:border-[#b58a35]/50 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-black text-[#e0b555] font-mono">
                    Step {step.num}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-medium border ${step.badgeColor}`}>
                    {step.badge}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#152333] border border-[#1f334a] w-fit mb-3">
                  {step.icon}
                </div>
                <h3 className="font-bold text-sm text-[#f0f4f8] mb-2 leading-snug group-hover:text-white transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-[#7e94ac] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-[#172535] flex items-center justify-between text-[11px] text-[#7e91a6]">
                <span className="flex items-center gap-1 text-[#34d399]">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Controlled Stage</span>
                </span>
                <span className="font-mono text-[10px]">#{step.num}/08</span>
              </div>
            </div>
          ))}
        </div>

        {/* Escrow Fiduciary Guarantee Card */}
        <div className="bg-[#101a27] border border-[#1f3046] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#172638] border border-[#233852] text-[#e0b555] shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#f0f4f8] mb-1">
                Zero Phase 0 Deposit Mandate (DEC-004)
              </h4>
              <p className="text-xs text-[#8ca1b8] leading-relaxed max-w-2xl">
                To protect consumer and institutional capital, no deposits or reservations are accepted during Phase 0. Future Phase 1 transactions will operate strictly through licensed Mauritanian commercial bank escrow accounts with verifiable bill-of-lading release milestones.
              </p>
            </div>
          </div>
          <button
            onClick={onCtaClick}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#b58a35] to-[#9c752c] text-[#0c131c] font-bold text-xs hover:brightness-110 transition-all shrink-0 flex items-center gap-2 shadow-sm"
          >
            <span>Register Non-Binding Interest</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
