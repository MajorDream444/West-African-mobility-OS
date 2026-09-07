import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CANONICAL_CLAIMS, HISTORICAL_CLAIM_CORRECTION, CANONICAL_DECISIONS } from '../data/canonicalData';
import { publicationGate } from '../data/publicationGate';
import { ShieldAlert, FileText, CheckCircle2, History, AlertTriangle, ArrowRight, Eye, ShieldCheck, Scale } from 'lucide-react';

interface DisclosuresSectionProps {
  currentLanguage: Language;
  onOpenDashboard: (tab?: string) => void;
}

export const DisclosuresSection: React.FC<DisclosuresSectionProps> = ({
  currentLanguage,
  onOpenDashboard,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [filterClass, setFilterClass] = useState<string>('all');

  const statusItems = [
    { label: t.statusTicker.activeStatus, value: "Phase 0 Evidence Sprint", status: "Active" },
    { label: "Supplier Discovery", value: t.statusTicker.candidateModels, status: "Active" },
    { label: "Landed Pricing", value: `Blocked by ${publicationGate.blockingClaimIds.join(', ')}`, status: "Publication Blocked" },
    { label: "OEM Authorization", value: t.statusTicker.oemAuth, status: "Transparent" },
    { label: "Customer Deposits", value: t.statusTicker.deposits, status: "Gated (Zero Deposit)" },
    { label: "Commercial Authority", value: "Evaluation Only • No Sovereign Mandate", status: "Strict" }
  ];

  const classifications = [
    {
      code: "VERIFIED",
      color: "bg-[#10b981]/20 text-[#34d399] border-[#10b981]/40",
      label: t.disclosures.verified,
      description: t.disclosures.verifiedDesc,
      count: CANONICAL_CLAIMS.filter(c => c.classification === 'VERIFIED').length
    },
    {
      code: "REPORTED",
      color: "bg-[#3b82f6]/20 text-[#60a5fa] border-[#3b82f6]/40",
      label: t.disclosures.reported,
      description: t.disclosures.reportedDesc,
      count: CANONICAL_CLAIMS.filter(c => c.classification === 'REPORTED').length
    },
    {
      code: "ASSUMPTION",
      color: "bg-[#f59e0b]/20 text-[#fbbf24] border-[#f59e0b]/40",
      label: t.disclosures.assumption,
      description: t.disclosures.assumptionDesc,
      count: CANONICAL_CLAIMS.filter(c => c.classification === 'ASSUMPTION').length
    },
    {
      code: "PROPOSAL",
      color: "bg-[#8b5cf6]/20 text-[#c084fc] border-[#8b5cf6]/40",
      label: t.disclosures.proposal,
      description: t.disclosures.proposalDesc,
      count: CANONICAL_CLAIMS.filter(c => c.classification === 'PROPOSAL').length
    },
    {
      code: "OPEN",
      color: "bg-[#ec4899]/20 text-[#f472b6] border-[#ec4899]/40",
      label: t.disclosures.open,
      description: t.disclosures.openDesc,
      count: CANONICAL_CLAIMS.filter(c => c.classification === 'OPEN').length
    },
    {
      code: "CONFLICT",
      color: "bg-[#ef4444]/20 text-[#f87171] border-[#ef4444]/40",
      label: "Conflict",
      description: "Credible sources disagree; external use is blocked until resolution.",
      count: CANONICAL_CLAIMS.filter(c => c.classification === 'CONFLICT').length
    }
  ];

  const publicClaims = CANONICAL_CLAIMS.filter(c => 
    c.public_visibility && (filterClass === 'all' || c.classification === filterClass)
  );

  return (
    <section id="governance-section" className="py-14 sm:py-20 bg-[#0a0f16] border-t border-[#182332]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#b58a35]/20 text-[#e0b555] border border-[#b58a35]/40 tracking-wider uppercase mb-2">
            Canonical Source-of-Truth Protocol
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f0f4f8] tracking-tight">
            {t.disclosures.title}
          </h2>
          <p className="text-sm text-[#8fa4bb] mt-2 leading-relaxed">
            {t.disclosures.subtitle}
          </p>
        </div>

        {/* Phase 0 Operational Status Matrix */}
        <div className="bg-[#0e1622] border border-[#1d2b3d] rounded-2xl p-6 sm:p-8 mb-10">
          <h3 className="text-base font-bold text-[#f0f4f8] mb-4 flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#e0b555]" />
            <span>{t.disclosures.statusMatrixHeading}</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {statusItems.map((item, idx) => (
              <div key={idx} className="bg-[#121c2a] border border-[#1b2a3c] rounded-xl p-3.5 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-[#8ca1b8]">{item.label}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#182637] text-[#e0b555] font-mono border border-[#23384f]">
                    {item.status}
                  </span>
                </div>
                <div className="text-xs font-bold text-[#f0f4f8]">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CRITICAL: Preserved Canonical Claim Correction Card */}
        <div className="bg-[#141b26] border-2 border-[#f59e0b]/50 rounded-2xl p-6 sm:p-8 mb-10 shadow-lg">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-4 pb-3 border-b border-[#243346]">
            <div className="flex items-center gap-2 text-[#fbbf24]">
              <History className="w-5 h-5" />
              <h3 className="text-base font-bold text-[#f0f4f8]">
                {t.disclosures.claimCorrectionHeading}
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#f59e0b]/15 text-[#fbbf24] border border-[#f59e0b]/30 font-bold uppercase tracking-wider">
              {HISTORICAL_CLAIM_CORRECTION.status}
            </span>
          </div>
          
          <p className="text-xs text-[#9fb1c5] mb-6 leading-relaxed">
            {t.disclosures.claimCorrectionDesc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Historical Reported Statement */}
            <div className="bg-[#0e1520] border border-[#233245] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-[#f87171] uppercase tracking-wider">
                  Historical Statement (August 2026)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#ef4444]/15 text-[#f87171] border border-[#ef4444]/30">
                  {HISTORICAL_CLAIM_CORRECTION.historicalClassification}
                </span>
              </div>
              <blockquote className="text-sm font-semibold text-[#f0f4f8] italic mb-2">
                "{HISTORICAL_CLAIM_CORRECTION.historicalStatement}"
              </blockquote>
              <div className="text-[11px] text-[#7e91a6]">
                <strong>Source:</strong> {HISTORICAL_CLAIM_CORRECTION.historicalSource}
              </div>
            </div>

            {/* Current Binding Decision */}
            <div className="bg-[#0e1520] border border-[#b58a35]/60 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-[#34d399] uppercase tracking-wider">
                  Current Operative Decision (DEC-002)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#10b981]/15 text-[#34d399] border border-[#10b981]/30 font-bold">
                  CURRENT DECISION
                </span>
              </div>
              <blockquote className="text-sm font-semibold text-[#f0f4f8] mb-2">
                "{HISTORICAL_CLAIM_CORRECTION.currentDecision}"
              </blockquote>
              <div className="text-[11px] text-[#b58a35]">
                <strong>Authority:</strong> {HISTORICAL_CLAIM_CORRECTION.currentAuthority}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#1e2e42] text-[11px] text-[#8ca1b8]">
            <strong>Governance Rationale:</strong> {HISTORICAL_CLAIM_CORRECTION.rationale}
          </div>
        </div>

        {/* The 6 Evidence Classifications Legend */}
        <div className="bg-[#0e1622] border border-[#1d2b3d] rounded-2xl p-6 sm:p-8 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base font-bold text-[#f0f4f8]">
                {t.disclosures.classificationsHeading}
              </h3>
              <p className="text-xs text-[#7e91a6] mt-0.5">
                Every commercial fact, cost estimate, and partner communication is epistemic-tagged.
              </p>
            </div>
            <button
              onClick={() => onOpenDashboard('evidence')}
              className="px-4 py-2 rounded-lg bg-[#1a293b] text-[#9fc7f5] hover:bg-[#233852] border border-[#274060] text-xs font-semibold transition-colors flex items-center gap-1.5 w-fit"
            >
              <span>View Full {CANONICAL_CLAIMS.length}-Claim Evidence Register</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
            {classifications.map((c) => (
              <div key={c.code} className="bg-[#121c29] border border-[#1c2c3e] rounded-xl p-3.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${c.color}`}>
                      {c.code}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#8ca1b8]">{c.count}</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#f0f4f8] mb-1">{c.label}</h4>
                  <p className="text-[11px] text-[#7e91a6] leading-relaxed">{c.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
            <button
              onClick={() => setFilterClass('all')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                filterClass === 'all'
                  ? 'bg-[#b58a35] text-[#0c131c] font-bold'
                  : 'bg-[#14202e] text-[#7e91a6] hover:text-white border border-[#1d2d40]'
              }`}
            >
              All Public Claims ({CANONICAL_CLAIMS.filter(c => c.public_visibility).length})
            </button>
            {['VERIFIED', 'REPORTED', 'ASSUMPTION', 'PROPOSAL', 'OPEN', 'CONFLICT'].map((cl) => (
              <button
                key={cl}
                onClick={() => setFilterClass(cl)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  filterClass === cl
                    ? 'bg-[#b58a35] text-[#0c131c] font-bold'
                    : 'bg-[#14202e] text-[#7e91a6] hover:text-white border border-[#1d2d40]'
                }`}
              >
                {cl}
              </button>
            ))}
          </div>

          {/* Public Claims List */}
          <div className="space-y-3">
            {publicClaims.map((claim) => (
              <div key={claim.claim_id} className="bg-[#121c2a] border border-[#1b2a3d] rounded-xl p-4 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#e0b555]">{claim.claim_id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      claim.classification === 'VERIFIED'
                        ? 'bg-[#10b981]/20 text-[#34d399] border-[#10b981]/40'
                        : claim.classification === 'REPORTED'
                        ? 'bg-[#3b82f6]/20 text-[#60a5fa] border-[#3b82f6]/40'
                        : claim.classification === 'ASSUMPTION'
                        ? 'bg-[#f59e0b]/20 text-[#fbbf24] border-[#f59e0b]/40'
                        : claim.classification === 'PROPOSAL'
                        ? 'bg-[#8b5cf6]/20 text-[#c084fc] border-[#8b5cf6]/40'
                        : claim.classification === 'CONFLICT'
                        ? 'bg-[#ef4444]/20 text-[#f87171] border-[#ef4444]/40'
                        : 'bg-[#ec4899]/20 text-[#f472b6] border-[#ec4899]/40'
                    }`}>
                      {claim.classification}
                    </span>
                    <span className="text-[11px] text-[#7e91a6]">Lane: {claim.lane}</span>
                  </div>
                  <span className="text-[11px] text-[#586e85]">Last reviewed: {claim.last_reviewed}</span>
                </div>

                <p className="text-[#e2ecf5] font-medium leading-relaxed mb-2">
                  {claim.statement}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#7e91a6] pt-2 border-t border-[#182535]">
                  <span><strong>Source:</strong> {claim.source}</span>
                  <span><strong>Owner:</strong> {claim.source_owner}</span>
                  <span><strong>Action:</strong> {claim.next_action}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
