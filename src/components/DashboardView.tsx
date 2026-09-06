import React, { useState } from 'react';
import { 
  Claim, Decision, SupplierProposal, DialloSprintQuestion, CRMLead, Language, 
  VehicleCandidate, TaskItem, CountryNode 
} from '../types';
import { 
  CANONICAL_CLAIMS, CANONICAL_DECISIONS, SUPPLIER_PROPOSALS, 
  DIALLO_SPRINT_QUESTIONS, CANDIDATE_VEHICLES, MECHANIC_CANDIDATES, 
  MAPPED_WORKSHOPS, SYSTEM_TASKS, COUNTRY_NODES, HISTORICAL_CLAIM_CORRECTION 
} from '../data/canonicalData';
import { LandedCostCalculator } from './LandedCostCalculator';
import { VehicleComparisonModal } from './VehicleComparisonModal';
import { GoogleSheetsManager } from './GoogleSheetsManager';
import { 
  ShieldCheck, FileText, Building, Users, CheckCircle, Clock, AlertCircle, 
  Search, Filter, Plus, Download, ArrowLeft, ArrowUpRight, BarChart3, Database, 
  Wrench, Calculator, Compass, LayoutDashboard, History, Sparkles, CheckCircle2, 
  Eye, HelpCircle, Layers, MapPin, DollarSign, ChevronRight, X, FileSpreadsheet
} from 'lucide-react';

interface DashboardViewProps {
  currentLanguage: Language;
  leads: CRMLead[];
  onBackToPortal: () => void;
  initialTab?: string;
  onUpdateLeadStatus?: (leadId: string, newStatus: string) => void;
  activeSpreadsheetId?: string | null;
  onSpreadsheetConnected?: (sheetId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentLanguage,
  leads,
  onBackToPortal,
  initialTab = 'overview',
  onUpdateLeadStatus,
  activeSpreadsheetId,
  onSpreadsheetConnected,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'claims' | 'suppliers' | 'calculator' | 'sprint' | 'workforce' | 'crm' | 'decisions' | 'sheets'
  >((initialTab as any) || 'overview');
  
  // Claims state
  const [claims, setClaims] = useState<Claim[]>(CANONICAL_CLAIMS);
  const [claimFilter, setClaimFilter] = useState<string>('all');
  const [claimLaneFilter, setClaimLaneFilter] = useState<string>('all');
  const [claimSearch, setClaimSearch] = useState<string>('');
  const [newClaimOpen, setNewClaimOpen] = useState<boolean>(false);
  const [selectedClaimDetail, setSelectedClaimDetail] = useState<Claim | null>(null);
  const [newClaim, setNewClaim] = useState({
    statement: '',
    classification: 'REPORTED' as Claim['classification'],
    source: '',
    source_owner: 'Diallo',
    lane: 'Automotive' as Claim['lane'],
    confidence: 'medium' as Claim['confidence'],
    status: 'open' as Claim['status'],
    next_action: '',
  });

  // Sprint questions state
  const [sprintQuestions, setSprintQuestions] = useState<DialloSprintQuestion[]>(DIALLO_SPRINT_QUESTIONS);
  const [sprintCategoryFilter, setSprintCategoryFilter] = useState<string>('all');
  const [activeSprintDetail, setActiveSprintDetail] = useState<DialloSprintQuestion | null>(null);
  const [simulatedFindingInput, setSimulatedFindingInput] = useState<string>('');

  // CRM filter & search
  const [crmTypeFilter, setCrmTypeFilter] = useState<string>('all');
  const [crmStageFilter, setCrmStageFilter] = useState<string>('all');
  const [crmSearch, setCrmSearch] = useState<string>('');
  const [selectedLeadDetail, setSelectedLeadDetail] = useState<CRMLead | null>(null);

  // Workforce filter
  const [workforceTab, setWorkforceTab] = useState<'mechanics' | 'workshops' | 'cohort'>('mechanics');
  const [mechanicSearch, setMechanicSearch] = useState<string>('');
  const [workshopCityFilter, setWorkshopCityFilter] = useState<string>('all');

  // Supplier & Vehicle comparison
  const [comparisonVehicleA, setComparisonVehicleA] = useState<VehicleCandidate | null>(null);
  const [comparisonVehicleB, setComparisonVehicleB] = useState<VehicleCandidate | null>(null);
  const [isComparisonOpen, setIsComparisonOpen] = useState<boolean>(false);

  // Filtered Claims
  const filteredClaims = claims.filter((c) => {
    const matchesClass = claimFilter === 'all' || c.classification === claimFilter;
    const matchesLane = claimLaneFilter === 'all' || c.lane === claimLaneFilter;
    const matchesSearch = claimSearch === '' || 
      c.statement.toLowerCase().includes(claimSearch.toLowerCase()) || 
      c.claim_id.toLowerCase().includes(claimSearch.toLowerCase()) ||
      c.source.toLowerCase().includes(claimSearch.toLowerCase());
    return matchesClass && matchesLane && matchesSearch;
  });

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesType = crmTypeFilter === 'all' || lead.type === crmTypeFilter;
    const matchesStage = crmStageFilter === 'all' || (lead as any).crmStage === crmStageFilter;
    const searchString = JSON.stringify(lead).toLowerCase();
    const matchesSearch = searchString.includes(crmSearch.toLowerCase());
    return matchesType && matchesStage && matchesSearch;
  });

  const handleAddClaim = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Claim = {
      claim_id: `CLM-0${claims.length + 1 > 9 ? claims.length + 1 : '0' + (claims.length + 1)}`,
      statement: newClaim.statement,
      classification: newClaim.classification,
      source: newClaim.source || 'Field Observation',
      source_date: new Date().toISOString().slice(0, 10),
      source_owner: newClaim.source_owner,
      geography: 'Mauritania',
      lane: newClaim.lane,
      confidence: newClaim.confidence,
      status: newClaim.status,
      validation_owner: 'Diallo',
      next_action: newClaim.next_action,
      last_reviewed: new Date().toISOString().slice(0, 10),
      public_visibility: true,
    };
    setClaims([created, ...claims]);
    setNewClaimOpen(false);
    setNewClaim({
      statement: '',
      classification: 'REPORTED',
      source: '',
      source_owner: 'Diallo',
      lane: 'Automotive',
      confidence: 'medium',
      status: 'open',
      next_action: '',
    });
  };

  const handleToggleSprintStatus = (num: number) => {
    setSprintQuestions((prev) =>
      prev.map((q) => {
        if (q.number !== num) return q;
        const nextStatus =
          q.status === 'Complete'
            ? 'In Progress'
            : q.status === 'In Progress'
            ? 'Pending Verification'
            : 'Complete';
        return { ...q, status: nextStatus };
      })
    );
  };

  const handleAttachFindingToQuestion = () => {
    if (!activeSprintDetail || !simulatedFindingInput.trim()) return;
    setSprintQuestions((prev) =>
      prev.map((q) => {
        if (q.number !== activeSprintDetail.number) return q;
        return {
          ...q,
          targetResponse: `${q.targetResponse} [Added Note: ${simulatedFindingInput.trim()}]`,
          lastUpdated: new Date().toISOString().slice(0, 10),
          status: 'Complete' as const
        };
      })
    );
    setSimulatedFindingInput('');
    setActiveSprintDetail(null);
  };

  const exportClaimsCsv = () => {
    const headers = ['Claim ID', 'Statement', 'Classification', 'Lane', 'Source', 'Owner', 'Confidence', 'Status', 'Next Action'];
    const rows = claims.map(c => [
      c.claim_id,
      `"${c.statement.replace(/"/g, '""')}"`,
      c.classification,
      c.lane,
      `"${c.source.replace(/"/g, '""')}"`,
      c.source_owner,
      c.confidence,
      c.status,
      `"${c.next_action.replace(/"/g, '""')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `mauritania_mobility_claims_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportCrmCsv = () => {
    const headers = ['ID', 'Type', 'Name/Entity', 'Phone', 'Email', 'City/Location', 'Stage', 'Status', 'Date'];
    const rows = leads.map((l) => {
      const name = l.type === 'personal' || l.type === 'mechanic' ? l.fullName : l.type === 'fleet' ? l.orgName : l.businessName;
      const phone = l.phone;
      const email = 'email' in l ? l.email : 'N/A';
      const city = 'city' in l ? l.city : 'location' in l ? l.location : 'N/A';
      const stage = (l as any).crmStage || 'New interest';
      return [l.id, l.type, `"${name}"`, phone, email, `"${city}"`, `"${stage}"`, l.status, l.createdAt].join(',');
    });
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `mauritania_mobility_crm_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openComparisonWith = (v1: VehicleCandidate, v2: VehicleCandidate) => {
    setComparisonVehicleA(v1);
    setComparisonVehicleB(v2);
    setIsComparisonOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0f16] text-[#e2ecf5] pb-16">
      {/* Top Navigation & Status Bar */}
      <div className="bg-[#101824] border-b border-[#1c2a3d] px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToPortal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#192738] text-xs font-semibold text-[#8ea4bb] hover:text-white hover:bg-[#23374e] transition-colors border border-[#23374e]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Portal</span>
          </button>
          <div className="h-4 w-px bg-[#203146] hidden sm:block" />
          <h1 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-[#e0b555]" />
            <span>Private Demonstration Operating Dashboard</span>
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-[#b58a35]/20 text-[#e0b555] border border-[#b58a35]/40">
            Phase 0 • Evidence Sprint Active
          </span>
          <span className="text-[11px] text-[#7e94ac] hidden md:inline">
            Executive Leads: Major Dream Williams & Diallo
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#1c2a3d] pb-3 mb-6 overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', label: 'Executive Overview', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
            { id: 'claims', label: `Claims Register (${claims.length})`, icon: <ShieldCheck className="w-3.5 h-3.5" /> },
            { id: 'suppliers', label: `Suppliers & Vehicles (10)`, icon: <Building className="w-3.5 h-3.5" /> },
            { id: 'calculator', label: 'Landed-Cost Simulator', icon: <Calculator className="w-3.5 h-3.5" /> },
            { id: 'sprint', label: `Diallo 20-Q Sprint (${sprintQuestions.filter(q => q.status === 'Complete').length}/20)`, icon: <Clock className="w-3.5 h-3.5" /> },
            { id: 'workforce', label: 'Workforce & Service Network', icon: <Wrench className="w-3.5 h-3.5" /> },
            { id: 'crm', label: `Demand Pipeline (${leads.length})`, icon: <Users className="w-3.5 h-3.5" /> },
            { id: 'sheets', label: 'Google Sheets CRM Hub', icon: <FileSpreadsheet className="w-3.5 h-3.5 text-[#34a853]" /> },
            { id: 'decisions', label: `Decisions Register (6)`, icon: <FileText className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#b58a35] text-[#0c131c] shadow-sm'
                  : 'bg-[#121c27] text-[#869ab1] hover:text-white border border-[#1b2736]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: EXECUTIVE OVERVIEW */}
        {/* ========================================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Constitutional Principle Banner */}
            <div className="bg-gradient-to-r from-[#141e2b] via-[#101722] to-[#0c131c] border-2 border-[#b58a35]/40 rounded-2xl p-5 sm:p-6 shadow-lg">
              <div className="flex items-center gap-2 text-[#e0b555] text-xs font-bold uppercase tracking-wider mb-2">
                <Compass className="w-4 h-4" />
                <span>Constitutional Operating Thesis</span>
              </div>
              <p className="text-sm sm:text-base font-semibold text-[#f0f4f8] leading-relaxed italic">
                "This is not a Chinese vehicle dealership staffed by Africans. It is an African-owned commercial and entrepreneurial ecosystem that selectively uses Chinese products, technology, finance, training, and expertise to accelerate total local capacity."
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[#7e91a6]">
                <span><strong>Governing Baseline:</strong> AGENTS.md & VISION.md</span>
                <span><strong>Phase Target:</strong> 10-14 Day Diallo Evidence Sprint</span>
                <span><strong>Status:</strong> Pre-Commitment Market Verification</span>
              </div>
            </div>

            {/* High-Level Metric Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="bg-[#111925] border border-[#1d2a3c] rounded-xl p-3.5">
                <span className="text-[10px] text-[#71859a] uppercase font-semibold block mb-1">Total Claims</span>
                <div className="text-xl font-bold text-white">{claims.length}</div>
                <span className="text-[10px] text-[#34d399]">14 Documented</span>
              </div>
              <div className="bg-[#111925] border border-[#1d2a3c] rounded-xl p-3.5">
                <span className="text-[10px] text-[#71859a] uppercase font-semibold block mb-1">Candidate Models</span>
                <div className="text-xl font-bold text-white">10</div>
                <span className="text-[10px] text-[#e0b555]">6 Priority Segments</span>
              </div>
              <div className="bg-[#111925] border border-[#1d2a3c] rounded-xl p-3.5">
                <span className="text-[10px] text-[#71859a] uppercase font-semibold block mb-1">Mechanics Screened</span>
                <div className="text-xl font-bold text-white">20</div>
                <span className="text-[10px] text-[#34d399]">Cohort Ready</span>
              </div>
              <div className="bg-[#111925] border border-[#1d2a3c] rounded-xl p-3.5">
                <span className="text-[10px] text-[#71859a] uppercase font-semibold block mb-1">Garages Mapped</span>
                <div className="text-xl font-bold text-white">10</div>
                <span className="text-[10px] text-[#60a5fa]">4 Corridor Cities</span>
              </div>
              <div className="bg-[#111925] border border-[#1d2a3c] rounded-xl p-3.5">
                <span className="text-[10px] text-[#71859a] uppercase font-semibold block mb-1">Diallo 20-Q Sprint</span>
                <div className="text-xl font-bold text-white">
                  {sprintQuestions.filter(q => q.status === 'Complete').length} / 20
                </div>
                <span className="text-[10px] text-[#34d399]">Field Verification</span>
              </div>
              <div className="bg-[#111925] border border-[#1d2a3c] rounded-xl p-3.5">
                <span className="text-[10px] text-[#71859a] uppercase font-semibold block mb-1">Total Leads In Funnel</span>
                <div className="text-xl font-bold text-white">{leads.length}</div>
                <span className="text-[10px] text-[#e0b555]">Non-Binding</span>
              </div>
            </div>

            {/* Country Nodes Status Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {COUNTRY_NODES.map((node) => (
                <div key={node.code} className="bg-[#111925] border border-[#1d2a3c] rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded bg-[#172535] border border-[#23384f] flex items-center justify-center font-bold text-[#e0b555] text-xs">
                          {node.code}
                        </span>
                        <div>
                          <h4 className="font-bold text-sm text-white">{node.name} - {node.role}</h4>
                          <span className="text-[10px] text-[#7e91a6] font-mono">{node.status}</span>
                        </div>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-semibold border ${
                        node.status === 'Active Evidence Sprint'
                          ? 'bg-[#10b981]/20 text-[#34d399] border-[#10b981]/40'
                          : 'bg-[#3b82f6]/20 text-[#60a5fa] border-[#3b82f6]/40'
                      }`}>
                        {node.status}
                      </span>
                    </div>

                    <p className="text-xs text-[#8da2b8] leading-relaxed mb-4">
                      {node.focus}
                    </p>

                    <div className="space-y-1.5 text-xs text-[#cad6e3]">
                      <div className="flex justify-between py-1 border-b border-[#182535]">
                        <span className="text-[#7e91a6]">Field Lead:</span>
                        <span className="font-semibold text-[#f0f4f8]">{node.leadEnvoy}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#182535]">
                        <span className="text-[#7e91a6]">Readiness Score:</span>
                        <span className="font-medium text-[#8da2b8]">{node.readinessScore}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 mt-4 border-t border-[#182535] flex items-center justify-between">
                    <span className="text-xs text-[#7e91a6]">Readiness Score:</span>
                    <span className="font-bold text-sm text-[#e0b555]">{node.readinessScore} / 100</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Operational Task List Stream */}
            <div className="bg-[#111925] border border-[#1d2a3c] rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#e0b555]" />
                    <span>Active Cross-Functional Operational Tasks</span>
                  </h3>
                  <p className="text-xs text-[#7e91a6]">
                    Sprint deliverables across suppliers, customs, fleet demand, and mechanics.
                  </p>
                </div>
                <span className="text-xs text-[#e0b555] font-mono">{SYSTEM_TASKS.length} Deliverables</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="text-[11px] text-[#7e91a6] bg-[#14202f] border-b border-[#1c2a3d] uppercase tracking-wider">
                    <tr>
                      <th className="px-3 py-2.5">ID</th>
                      <th className="px-3 py-2.5">Task Description</th>
                      <th className="px-3 py-2.5">Stream</th>
                      <th className="px-3 py-2.5">Owner</th>
                      <th className="px-3 py-2.5">Deadline</th>
                      <th className="px-3 py-2.5">Priority</th>
                      <th className="px-3 py-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#182535]">
                    {SYSTEM_TASKS.map((task: TaskItem) => (
                      <tr key={task.id} className="hover:bg-[#152334]/50 transition-colors">
                        <td className="px-3 py-2.5 font-mono font-bold text-[#b58a35]">{task.id}</td>
                        <td className="px-3 py-2.5 font-semibold text-white max-w-sm">{task.title}</td>
                        <td className="px-3 py-2.5 text-[#8fa4bb]">{task.stream}</td>
                        <td className="px-3 py-2.5 text-[#e0b555] font-medium">{task.owner}</td>
                        <td className="px-3 py-2.5 text-[#7e91a6] font-mono">{task.deadline}</td>
                        <td className="px-3 py-2.5">
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                            task.priority === 'Critical'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}>
                            {task.priority}
                          </span>
                        </td>
                        <td className="px-3 py-2.5">
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                            task.status === 'Completed'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : task.status === 'In Progress'
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              : 'bg-slate-500/20 text-slate-300'
                          }`}>
                            {task.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: CLAIMS & EVIDENCE REGISTER */}
        {/* ========================================================================= */}
        {activeTab === 'claims' && (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#111925] p-3.5 rounded-xl border border-[#1d2a3c]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-[#7d90a4]">Filter:</span>
                <select
                  value={claimFilter}
                  onChange={(e) => setClaimFilter(e.target.value)}
                  className="bg-[#0c131c] border border-[#202f43] rounded px-2.5 py-1 text-xs text-white focus:outline-none"
                >
                  <option value="all">All Classifications ({claims.length})</option>
                  <option value="VERIFIED">VERIFIED</option>
                  <option value="REPORTED">REPORTED</option>
                  <option value="ASSUMPTION">ASSUMPTION</option>
                  <option value="PROPOSAL">PROPOSAL</option>
                  <option value="OPEN">OPEN</option>
                </select>

                <select
                  value={claimLaneFilter}
                  onChange={(e) => setClaimLaneFilter(e.target.value)}
                  className="bg-[#0c131c] border border-[#202f43] rounded px-2.5 py-1 text-xs text-white focus:outline-none"
                >
                  <option value="all">All Functional Lanes</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Mining">Mining</option>
                  <option value="Foundation">Foundation</option>
                  <option value="Dual-Use">Dual-Use</option>
                </select>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[#677b8f] absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search claim text or ID..."
                    value={claimSearch}
                    onChange={(e) => setClaimSearch(e.target.value)}
                    className="pl-8 pr-3 py-1 bg-[#0c131c] border border-[#202f43] rounded text-xs text-white placeholder-[#5a6e82] focus:outline-none w-48"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={exportClaimsCsv}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#182637] text-xs font-semibold text-[#c4d7eb] hover:bg-[#22364e] border border-[#24374d] transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={() => setNewClaimOpen(!newClaimOpen)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#b58a35] text-[#0c131c] font-bold text-xs hover:bg-[#c99b40] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Claim</span>
                </button>
              </div>
            </div>

            {/* Modal/Inline form to add a new claim */}
            {newClaimOpen && (
              <form onSubmit={handleAddClaim} className="bg-[#14202e] border border-[#b58a35]/40 rounded-xl p-4 space-y-3 text-xs">
                <h4 className="font-bold text-sm text-white">Record New Commercial Evidence Claim</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#879bb0] mb-1">Claim Statement *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Mining contractors require 48h emergency spare part delivery SLA"
                      value={newClaim.statement}
                      onChange={(e) => setNewClaim({ ...newClaim, statement: e.target.value })}
                      className="w-full p-2 bg-[#0c131c] border border-[#202f43] rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[#879bb0] mb-1">Evidence Classification *</label>
                    <select
                      value={newClaim.classification}
                      onChange={(e) => setNewClaim({ ...newClaim, classification: e.target.value as any })}
                      className="w-full p-2 bg-[#0c131c] border border-[#202f43] rounded text-white"
                    >
                      <option value="REPORTED">REPORTED (Stated by participant, unverified)</option>
                      <option value="ASSUMPTION">ASSUMPTION (Working modeling hypothesis)</option>
                      <option value="VERIFIED">VERIFIED (Independent written documentary proof)</option>
                      <option value="PROPOSAL">PROPOSAL (Supplier or partner proposal)</option>
                      <option value="OPEN">OPEN (Unresolved sprint inquiry)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#879bb0] mb-1">Source & Authority</label>
                    <input
                      type="text"
                      placeholder="e.g., Interview Diallo - Zouérat Operations Director"
                      value={newClaim.source}
                      onChange={(e) => setNewClaim({ ...newClaim, source: e.target.value })}
                      className="w-full p-2 bg-[#0c131c] border border-[#202f43] rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[#879bb0] mb-1">Next Action Required</label>
                    <input
                      type="text"
                      placeholder="e.g., Request signed letter of intent"
                      value={newClaim.next_action}
                      onChange={(e) => setNewClaim({ ...newClaim, next_action: e.target.value })}
                      className="w-full p-2 bg-[#0c131c] border border-[#202f43] rounded text-white"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setNewClaimOpen(false)}
                    className="px-3 py-1.5 rounded bg-[#1c2a3c] text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded bg-[#b58a35] text-[#0c131c] font-bold"
                  >
                    Save Claim to Register
                  </button>
                </div>
              </form>
            )}

            {/* Claims Table */}
            <div className="bg-[#111925] border border-[#1d2a3c] rounded-xl overflow-x-auto">
              <table className="w-full text-left text-xs text-[#c2d3e5] divide-y divide-[#1c2a3d]">
                <thead className="bg-[#14202f] text-[11px] uppercase tracking-wider text-[#798e9f]">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Statement</th>
                    <th className="p-3">Classification</th>
                    <th className="p-3">Lane</th>
                    <th className="p-3">Source & Date</th>
                    <th className="p-3">Owner</th>
                    <th className="p-3">Next Action</th>
                    <th className="p-3 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#182434]">
                  {filteredClaims.map((claim) => (
                    <tr key={claim.claim_id} className="hover:bg-[#152334]/50 transition-colors">
                      <td className="p-3 font-mono font-bold text-[#b58a35] whitespace-nowrap">
                        {claim.claim_id}
                      </td>
                      <td className="p-3 font-medium text-white max-w-sm">
                        {claim.statement}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            claim.classification === 'VERIFIED'
                              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                              : claim.classification === 'REPORTED'
                              ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                              : claim.classification === 'ASSUMPTION'
                              ? 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                              : claim.classification === 'PROPOSAL'
                              ? 'bg-purple-500/15 text-purple-300 border-purple-500/30'
                              : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                          }`}
                        >
                          {claim.classification}
                        </span>
                      </td>
                      <td className="p-3 whitespace-nowrap text-[#899eb3]">
                        {claim.lane}
                      </td>
                      <td className="p-3 whitespace-nowrap text-[#899eb3]">
                        <div>{claim.source}</div>
                        <div className="text-[10px] text-[#63778a]">{claim.source_date}</div>
                      </td>
                      <td className="p-3 whitespace-nowrap text-[#a1b7cc]">
                        {claim.source_owner}
                      </td>
                      <td className="p-3 text-[#9eb4cb] max-w-xs truncate" title={claim.next_action}>
                        {claim.next_action}
                      </td>
                      <td className="p-3 text-right whitespace-nowrap">
                        <button
                          onClick={() => setSelectedClaimDetail(claim)}
                          className="px-2 py-1 rounded bg-[#182637] text-[11px] text-[#e0b555] hover:bg-[#20344d] transition-colors"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Claim Detail Modal */}
            {selectedClaimDetail && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                <div className="bg-[#111925] border border-[#233852] rounded-2xl p-6 max-w-xl w-full text-xs space-y-4">
                  <div className="flex justify-between items-start pb-3 border-b border-[#1b2b3f]">
                    <div>
                      <span className="font-mono font-bold text-[#e0b555] text-sm">{selectedClaimDetail.claim_id}</span>
                      <h3 className="font-bold text-base text-white mt-1">Claim Verification Record</h3>
                    </div>
                    <button
                      onClick={() => setSelectedClaimDetail(null)}
                      className="p-1 rounded bg-[#182638] text-[#8fa4bb] hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <label className="text-[10px] text-[#7e91a6] uppercase font-bold block mb-1">Statement:</label>
                    <p className="text-sm font-semibold text-[#f0f4f8] bg-[#0c131c] p-3 rounded-lg border border-[#1b2b3f]">
                      {selectedClaimDetail.statement}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] text-[#7e91a6] block">Classification:</span>
                      <span className="font-bold text-[#e0b555]">{selectedClaimDetail.classification}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#7e91a6] block">Confidence Level:</span>
                      <span className="font-bold text-white uppercase">{selectedClaimDetail.confidence}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#7e91a6] block">Source Authority:</span>
                      <span className="text-[#cad6e3]">{selectedClaimDetail.source}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#7e91a6] block">Source Owner:</span>
                      <span className="text-[#cad6e3]">{selectedClaimDetail.source_owner}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-[#7e91a6] uppercase font-bold block mb-1">Next Action Required:</label>
                    <p className="text-xs text-[#cad6e3] bg-[#0c131c] p-2.5 rounded border border-[#1b2b3f]">
                      {selectedClaimDetail.next_action}
                    </p>
                  </div>
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => setSelectedClaimDetail(null)}
                      className="px-4 py-2 rounded-lg bg-[#b58a35] text-[#0c131c] font-bold"
                    >
                      Close Record
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: SUPPLIERS & 10 VEHICLE EVALUATIONS */}
        {/* ========================================================================= */}
        {activeTab === 'suppliers' && (
          <div className="space-y-6">
            {/* Brother Ling EOI Package Tracker Banner */}
            <div className="bg-[#121c29] border border-[#213348] rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#b58a35]/20 text-[#e0b555] border border-[#b58a35]/40 uppercase tracking-wider">
                    Brother Ling Supplier EOI
                  </span>
                  <span className="text-xs text-[#7e91a6]">Documented Scope: 10 Candidate Models (DEC-002)</span>
                </div>
                <h3 className="text-base font-bold text-white">Chinese Manufacturer Engagement Matrix</h3>
                <p className="text-xs text-[#8ca1b8] mt-0.5">
                  Pre-qualifying OEM export capabilities, tropical cooling packages, diagnostic pass-through, and parts consignments.
                </p>
              </div>
              <button
                onClick={() => openComparisonWith(CANDIDATE_VEHICLES[0], CANDIDATE_VEHICLES[1])}
                className="px-4 py-2 rounded-lg bg-[#b58a35] text-[#0c131c] font-bold text-xs hover:brightness-110 transition-all shrink-0"
              >
                Compare Side-by-Side
              </button>
            </div>

            {/* Supplier Proposals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SUPPLIER_PROPOSALS.map((sup) => (
                <div
                  key={sup.id}
                  className="bg-[#111925] border border-[#1e2d40] rounded-xl p-5 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono text-[#b58a35] font-semibold">{sup.id}</span>
                      <h4 className="font-bold text-sm text-white">{sup.manufacturer}</h4>
                      <span className="text-xs text-[#7e94ac] block">{sup.representativeChannel}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#b58a35]/15 text-[#e5be62] border border-[#b58a35]/30">
                      {sup.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-[#182435]">
                    <div>
                      <span className="text-[10px] text-[#677a8e] block">Models Quoted</span>
                      <span className="font-medium text-white">{sup.modelsOffered.join(', ')}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#677a8e] block">Export FOB Pricing</span>
                      <span className="font-bold text-[#e5be62]">{sup.exportPriceRange}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#677a8e] block">MOQ Requirement</span>
                      <span className="font-medium text-white">{sup.minimumOrderQuantity} units</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#677a8e] block">Lead Time</span>
                      <span className="font-medium text-white">{sup.productionLeadTime}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div>
                      <span className="text-[#b58a35] font-semibold block">Warranty Terms:</span>
                      <p className="text-[#96adc4] text-[11px]">{sup.warrantyOffer}</p>
                    </div>
                    <div>
                      <span className="text-[#b58a35] font-semibold block">Diagnostics & Spares:</span>
                      <p className="text-[#96adc4] text-[11px]">{sup.trainingReadiness} • {sup.diagnosticToolsOffer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 10 Candidate Vehicle Technical Spec Dossier */}
            <div>
              <h3 className="text-base font-bold text-white mb-4">
                10 Candidate Vehicle Models Technical Evaluation
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {CANDIDATE_VEHICLES.map((v) => (
                  <div
                    key={v.id}
                    className="bg-[#111925] border border-[#1e2d40] rounded-xl p-3.5 flex flex-col justify-between hover:border-[#b58a35]/50 transition-all"
                  >
                    <div>
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="font-mono text-[10px] text-[#e0b555] font-bold">{v.candidateCode}</span>
                        <span className="text-[10px] text-[#8fa4bb]">{v.powertrain.split(' ')[0]}</span>
                      </div>
                      <h4 className="font-bold text-xs text-white line-clamp-1 mb-1">{v.model}</h4>
                      <span className="text-[10px] text-[#7e91a6] block mb-2">{v.categoryLabel[currentLanguage] || v.genericName}</span>
                      
                      <div className="space-y-1 text-[11px] bg-[#0c131c] p-2 rounded border border-[#172332] mb-3">
                        <div className="flex justify-between">
                          <span className="text-[#7e91a6]">FOB:</span>
                          <span className="font-bold text-[#e0b555]">${v.indicativeFobUsd.min.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#7e91a6]">Landed:</span>
                          <span className="font-bold text-white">${Math.round(v.indicativeFobUsd.min * 1.35).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#7e91a6]">Benchmark:</span>
                          <span className="text-[#7e91a6]">${(v.category === 'suv_4x4' ? 68000 : 42000).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => openComparisonWith(v, CANDIDATE_VEHICLES[(CANDIDATE_VEHICLES.indexOf(v) + 1) % CANDIDATE_VEHICLES.length])}
                      className="w-full py-1.5 rounded bg-[#162436] text-[#b58a35] hover:bg-[#1d3047] text-[11px] font-semibold transition-colors text-center border border-[#20354e]"
                    >
                      Compare Specs
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: LANDED COST SIMULATOR */}
        {/* ========================================================================= */}
        {activeTab === 'calculator' && (
          <div>
            <LandedCostCalculator currentLanguage={currentLanguage} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: DIALLO 20-QUESTION SPRINT TRACKER */}
        {/* ========================================================================= */}
        {activeTab === 'sprint' && (
          <div className="space-y-4">
            <div className="bg-[#111925] border border-[#1d2a3c] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-base text-white">
                  Diallo 20-Question Evidence Sprint Tracker
                </h3>
                <p className="text-xs text-[#7e94ac]">
                  Gated operational inquiries resolving customs, logistics, banking, and workforce before commercial orders.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-[#e0b555]">
                  Progress: {Math.round((sprintQuestions.filter(q => q.status === 'Complete').length / sprintQuestions.length) * 100)}%
                </span>
                <div className="w-32 h-2 bg-[#172535] rounded-full overflow-hidden border border-[#233950]">
                  <div
                    className="h-full bg-gradient-to-r from-[#b58a35] to-[#34d399]"
                    style={{ width: `${(sprintQuestions.filter(q => q.status === 'Complete').length / sprintQuestions.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
              <button
                onClick={() => setSprintCategoryFilter('all')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  sprintCategoryFilter === 'all'
                    ? 'bg-[#b58a35] text-[#0c131c] font-bold'
                    : 'bg-[#14202e] text-[#7e91a6] hover:text-white border border-[#1d2d40]'
                }`}
              >
                All Categories (20)
              </button>
              {['A. Legal & Capital', 'B. Import & Customs', 'C. Demand & Buyers', 'D. Service & Workforce', 'E. Powertrain & Plan'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSprintCategoryFilter(cat)}
                  className={`whitespace-nowrap px-3 py-1 rounded-md font-medium transition-colors ${
                    sprintCategoryFilter === cat
                      ? 'bg-[#b58a35] text-[#0c131c] font-bold'
                      : 'bg-[#14202e] text-[#7e91a6] hover:text-white border border-[#1d2d40]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Questions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sprintQuestions
                .filter(q => sprintCategoryFilter === 'all' || q.category === sprintCategoryFilter)
                .map((q) => (
                <div
                  key={q.number}
                  className="bg-[#111925] border border-[#1e2d40] rounded-xl p-4 space-y-3 flex flex-col justify-between hover:border-[#2b415c] transition-colors"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#b58a35]">
                        Q{q.number} • {q.category}
                      </span>
                      <button
                        onClick={() => handleToggleSprintStatus(q.number)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                          q.status === 'Complete'
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                            : q.status === 'In Progress'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                            : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                        }`}
                      >
                        {q.status}
                      </button>
                    </div>
                    <h4 className="font-bold text-sm text-white">{q.title}</h4>
                    <p className="text-xs text-[#8da2b8] leading-relaxed">{q.description}</p>
                  </div>

                  <div className="bg-[#14202f] p-2.5 rounded border border-[#1e2f44] text-[11px] space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[#b58a35] font-semibold">Evidence Outcome / Current Status:</span>
                      <button
                        onClick={() => setActiveSprintDetail(q)}
                        className="text-[10px] text-[#60a5fa] hover:underline"
                      >
                        + Attach Note
                      </button>
                    </div>
                    <p className="text-[#a4bbd0] leading-relaxed">{q.targetResponse}</p>
                    <div className="flex justify-between text-[10px] text-[#697e93] pt-1">
                      <span>Owner: {q.assignedTo}</span>
                      <span>Verified: {q.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Evidence Note Input Modal */}
            {activeSprintDetail && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                <div className="bg-[#111925] border border-[#233852] rounded-2xl p-6 max-w-lg w-full text-xs space-y-4">
                  <div className="flex justify-between items-start pb-3 border-b border-[#1b2b3f]">
                    <div>
                      <span className="font-mono text-[#e0b555] font-bold">Q{activeSprintDetail.number} Evidence Upload</span>
                      <h4 className="text-sm font-bold text-white mt-0.5">{activeSprintDetail.title}</h4>
                    </div>
                    <button
                      onClick={() => setActiveSprintDetail(null)}
                      className="p-1 rounded bg-[#182638] text-[#8fa4bb] hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <label className="text-[10px] text-[#7e91a6] uppercase font-bold block mb-1">
                      Add Field Finding or Document Reference:
                    </label>
                    <textarea
                      rows={3}
                      value={simulatedFindingInput}
                      onChange={(e) => setSimulatedFindingInput(e.target.value)}
                      placeholder="e.g. Confirmed with Customs Directorate that zero-duty tariff applies under classification..."
                      className="w-full p-2.5 bg-[#0c131c] border border-[#202f43] rounded-lg text-white placeholder-[#5a6e82] focus:outline-none focus:border-[#b58a35]"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setActiveSprintDetail(null)}
                      className="px-3 py-1.5 rounded bg-[#1c2a3c] text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAttachFindingToQuestion}
                      className="px-3 py-1.5 rounded bg-[#b58a35] text-[#0c131c] font-bold"
                    >
                      Attach Finding & Mark Complete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: WORKFORCE & SERVICE NETWORK */}
        {/* ========================================================================= */}
        {activeTab === 'workforce' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-[#1d2b3c] pb-3">
              <button
                onClick={() => setWorkforceTab('mechanics')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  workforceTab === 'mechanics'
                    ? 'bg-[#b58a35] text-[#0c131c]'
                    : 'bg-[#121c27] text-[#7e91a6] hover:text-white border border-[#1c2a3d]'
                }`}
              >
                20 Screened Mechanics
              </button>
              <button
                onClick={() => setWorkforceTab('workshops')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  workforceTab === 'workshops'
                    ? 'bg-[#b58a35] text-[#0c131c]'
                    : 'bg-[#121c27] text-[#7e91a6] hover:text-white border border-[#1c2a3d]'
                }`}
              >
                10 Mapped Corridor Garages
              </button>
              <button
                onClick={() => setWorkforceTab('cohort')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  workforceTab === 'cohort'
                    ? 'bg-[#b58a35] text-[#0c131c]'
                    : 'bg-[#121c27] text-[#7e91a6] hover:text-white border border-[#1c2a3d]'
                }`}
              >
                14-Day OEM Academy Curriculum
              </button>
            </div>

            {/* Sub-view: 20 Mechanics Table */}
            {workforceTab === 'mechanics' && (
              <div className="bg-[#111925] border border-[#1d2a3c] rounded-xl overflow-x-auto">
                <table className="w-full text-left text-xs text-[#c2d3e5] divide-y divide-[#1c2a3d]">
                  <thead className="bg-[#14202f] text-[11px] uppercase tracking-wider text-[#798e9f]">
                    <tr>
                      <th className="p-3">ID</th>
                      <th className="p-3">Candidate Name</th>
                      <th className="p-3">Location</th>
                      <th className="p-3">Experience</th>
                      <th className="p-3">Current Workshop</th>
                      <th className="p-3">Specialties</th>
                      <th className="p-3">Diagnostic Level</th>
                      <th className="p-3">Pathway Stage</th>
                      <th className="p-3">Next Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#182434]">
                    {MECHANIC_CANDIDATES.map((m) => (
                      <tr key={m.id} className="hover:bg-[#152334]/50 transition-colors">
                        <td className="p-3 font-mono font-bold text-[#b58a35]">{m.id}</td>
                        <td className="p-3 font-semibold text-white">{m.fullName}</td>
                        <td className="p-3 text-[#8ca1b8]">{m.city}</td>
                        <td className="p-3 font-bold text-[#e0b555]">{m.yearsExperience} yrs</td>
                        <td className="p-3 text-[#8ca1b8]">{m.currentWorkshop}</td>
                        <td className="p-3">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {m.specialties.map((s, idx) => (
                              <span key={idx} className="text-[9px] bg-[#172535] text-[#9fc7f5] px-1.5 py-0.2 rounded">
                                {s}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-3">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                            m.hasDiagnosticExperience
                              ? 'bg-[#10b981]/20 text-[#34d399] border border-[#10b981]/30'
                              : 'bg-[#64748b]/20 text-[#94a3b8]'
                          }`}>
                            {m.hasDiagnosticExperience ? 'Advanced OBD' : 'Mechanical'}
                          </span>
                        </td>
                        <td className="p-3 text-[#e0b555] font-semibold">{m.pathwayStage}</td>
                        <td className="p-3 text-[#7e91a6] max-w-xs truncate" title={m.nextAction}>
                          {m.nextAction}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Sub-view: 10 Workshops Table */}
            {workforceTab === 'workshops' && (
              <div className="bg-[#111925] border border-[#1d2a3c] rounded-xl overflow-x-auto">
                <table className="w-full text-left text-xs text-[#c2d3e5] divide-y divide-[#1c2a3d]">
                  <thead className="bg-[#14202f] text-[11px] uppercase tracking-wider text-[#798e9f]">
                    <tr>
                      <th className="p-3">ID</th>
                      <th className="p-3">Facility Name</th>
                      <th className="p-3">Location</th>
                      <th className="p-3">Managing Director</th>
                      <th className="p-3 text-center">Bays</th>
                      <th className="p-3 text-center">Lifts</th>
                      <th className="p-3">3-Phase</th>
                      <th className="p-3">Audit Score</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#182434]">
                    {MAPPED_WORKSHOPS.map((w) => (
                      <tr key={w.id} className="hover:bg-[#152334]/50 transition-colors">
                        <td className="p-3 font-mono font-bold text-[#b58a35]">{w.id}</td>
                        <td className="p-3 font-semibold text-white">
                          {w.businessName}
                          <span className="block text-[10px] text-[#7e91a6]">{w.diagnosticToolsOwned}</span>
                        </td>
                        <td className="p-3 text-[#8ca1b8]">{w.location}</td>
                        <td className="p-3 text-[#cad6e3]">{w.ownerName}</td>
                        <td className="p-3 text-center font-bold text-[#e0b555]">{w.bayCount}</td>
                        <td className="p-3 text-center font-bold text-[#60a5fa]">{w.liftCount}</td>
                        <td className="p-3">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                            w.hasThreePhasePower
                              ? 'bg-[#10b981]/20 text-[#34d399]'
                              : 'bg-[#ef4444]/20 text-[#f87171]'
                          }`}>
                            {w.hasThreePhasePower ? '3-Phase Yes' : 'Single Phase'}
                          </span>
                        </td>
                        <td className="p-3 font-bold text-[#34d399]">{w.readinessScore}%</td>
                        <td className="p-3">
                          <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-[#10b981]/20 text-[#34d399] border border-[#10b981]/40">
                            {w.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Sub-view: 14-Day Academy Curriculum */}
            {workforceTab === 'cohort' && (
              <div className="bg-[#111925] border border-[#1d2a3c] rounded-xl p-6">
                <h4 className="font-bold text-sm text-white mb-4">
                  14-Day OEM Master Diagnostic Academy Schedule (Nouakchott)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { days: "Days 1-3", title: "Safety & High-Voltage Architecture", instructor: "OEM Senior Engineer", desc: "1000V de-energization, lockout/tagout, hybrid battery conditioning, inverter diagnostic protocols." },
                    { days: "Days 4-7", title: "Electronic Fuel & Common Rail Diesel", instructor: "Bosch & OEM Diagnostic Lead", desc: "Rail pressure testing, piezo injector calibration, turbo boost map tracing in high-temperature desert conditions." },
                    { days: "Days 8-10", title: "CAN-Bus & Multiplex Network Tracing", instructor: "OEM Software Engineer", desc: "Oscilloscope digital waveform analysis, gateway fault isolation, bilingual French/Arabic diagnostic tablet operation." },
                    { days: "Days 11-14", title: "Field Road Trials & Final Certification", instructor: "Diallo & Master Trainer", desc: "Desert sand-track testing, cooling system load testing, written and practical certification examination." }
                  ].map((block, idx) => (
                    <div key={idx} className="bg-[#14202f] border border-[#1f3148] rounded-xl p-4">
                      <span className="text-[10px] font-bold text-[#e0b555] block mb-1">{block.days}</span>
                      <h5 className="font-bold text-xs text-white mb-1">{block.title}</h5>
                      <span className="text-[10px] text-[#60a5fa] block mb-2">{block.instructor}</span>
                      <p className="text-[11px] text-[#8ea4bb] leading-relaxed">{block.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: CRM & DEMAND PIPELINE */}
        {/* ========================================================================= */}
        {activeTab === 'crm' && (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#111925] p-3.5 rounded-xl border border-[#1d2a3c]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-[#7d90a4]">Intake Type:</span>
                <select
                  value={crmTypeFilter}
                  onChange={(e) => setCrmTypeFilter(e.target.value)}
                  className="bg-[#0c131c] border border-[#202f43] rounded px-2.5 py-1 text-xs text-white focus:outline-none"
                >
                  <option value="all">All Profiles ({leads.length})</option>
                  <option value="personal">Individual Buyers</option>
                  <option value="fleet">Fleet & Institutional</option>
                  <option value="mechanic">Mechanic Candidates</option>
                  <option value="workshop">Partner Garages</option>
                </select>

                <select
                  value={crmStageFilter}
                  onChange={(e) => setCrmStageFilter(e.target.value)}
                  className="bg-[#0c131c] border border-[#202f43] rounded px-2.5 py-1 text-xs text-white focus:outline-none"
                >
                  <option value="all">All Pipeline Stages</option>
                  <option value="New interest">New interest</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Landed-cost review">Landed-cost review</option>
                  <option value="Service-readiness review">Service-readiness review</option>
                  <option value="Future reservation eligible">Future reservation eligible</option>
                  <option value="Closed / not proceeding">Closed / not proceeding</option>
                </select>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[#677b8f] absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search name, phone, notes..."
                    value={crmSearch}
                    onChange={(e) => setCrmSearch(e.target.value)}
                    className="pl-8 pr-3 py-1 bg-[#0c131c] border border-[#202f43] rounded text-xs text-white placeholder-[#5a6e82] focus:outline-none w-48"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('sheets')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0f9d58]/20 hover:bg-[#0f9d58]/30 text-xs font-semibold text-[#34a853] border border-[#0f9d58]/40 transition-colors"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Google Sheets Sync</span>
                </button>

                <button
                  onClick={exportCrmCsv}
                  className="flex items-center gap-1 px-3 py-1.5 rounded bg-[#182637] hover:bg-[#22364e] text-xs font-medium text-[#c4d7eb] border border-[#24374d] transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            <div className="bg-[#111925] border border-[#1d2a3c] rounded-xl overflow-x-auto">
              <table className="w-full text-left text-xs text-[#c2d3e5] divide-y divide-[#1c2a3d]">
                <thead className="bg-[#14202f] text-[11px] uppercase tracking-wider text-[#798e9f]">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Name / Entity</th>
                    <th className="p-3">Contact</th>
                    <th className="p-3">Location</th>
                    <th className="p-3">Pipeline Stage</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#182434]">
                  {filteredLeads.map((lead) => {
                    const name =
                      lead.type === 'personal' || lead.type === 'mechanic'
                        ? lead.fullName
                        : lead.type === 'fleet'
                        ? lead.orgName
                        : lead.businessName;
                    const stage = (lead as any).crmStage || 'New interest';

                    return (
                      <tr key={lead.id} className="hover:bg-[#152334]/50 transition-colors">
                        <td className="p-3 font-mono font-bold text-[#b58a35] whitespace-nowrap">
                          {lead.id}
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#1a293b] text-[#9bb3ce] border border-[#253952]">
                            {lead.type.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-3 font-semibold text-white whitespace-nowrap">
                          {name}
                        </td>
                        <td className="p-3 whitespace-nowrap text-[#9bb0c5]">
                          <div>{lead.phone}</div>
                          {'email' in lead && <div className="text-[10px] text-[#6c8094]">{lead.email}</div>}
                        </td>
                        <td className="p-3 whitespace-nowrap text-[#8ba2b9]">
                          {'city' in lead ? lead.city : 'location' in lead ? lead.location : 'N/A'}
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <select
                            value={stage}
                            onChange={(e) => onUpdateLeadStatus && onUpdateLeadStatus(lead.id, e.target.value)}
                            className="bg-[#0e1622] border border-[#21354c] rounded px-2 py-0.5 text-[11px] text-[#e0b555] font-medium focus:outline-none"
                          >
                            <option value="New interest">New interest</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Qualified">Qualified</option>
                            <option value="Landed-cost review">Landed-cost review</option>
                            <option value="Service-readiness review">Service-readiness review</option>
                            <option value="Future reservation eligible">Future reservation eligible</option>
                            <option value="Closed / not proceeding">Closed / not proceeding</option>
                          </select>
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#b58a35]/20 text-[#e5be62] border border-[#b58a35]/40">
                            {lead.status}
                          </span>
                        </td>
                        <td className="p-3 text-right whitespace-nowrap">
                          <button
                            onClick={() => setSelectedLeadDetail(lead)}
                            className="px-2 py-1 rounded bg-[#182637] text-[11px] text-[#e0b555] hover:bg-[#20344d] transition-colors"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Lead Detail Modal */}
            {selectedLeadDetail && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                <div className="bg-[#111925] border border-[#233852] rounded-2xl p-6 max-w-lg w-full text-xs space-y-4">
                  <div className="flex justify-between items-start pb-3 border-b border-[#1b2b3f]">
                    <div>
                      <span className="font-mono text-[#e0b555] font-bold">{selectedLeadDetail.id}</span>
                      <h4 className="text-base font-bold text-white mt-0.5">Lead File & Activity Dossier</h4>
                    </div>
                    <button
                      onClick={() => setSelectedLeadDetail(null)}
                      className="p-1 rounded bg-[#182638] text-[#8fa4bb] hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2 bg-[#0c131c] p-3 rounded-lg border border-[#1b2b3f]">
                    <div className="flex justify-between">
                      <span className="text-[#7e91a6]">Entity / Name:</span>
                      <span className="font-bold text-white">
                        {selectedLeadDetail.type === 'personal' || selectedLeadDetail.type === 'mechanic'
                          ? selectedLeadDetail.fullName
                          : selectedLeadDetail.type === 'fleet'
                          ? selectedLeadDetail.orgName
                          : selectedLeadDetail.businessName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7e91a6]">Type:</span>
                      <span className="font-semibold text-[#e0b555] uppercase">{selectedLeadDetail.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7e91a6]">Phone:</span>
                      <span className="text-[#cad6e3]">{selectedLeadDetail.phone}</span>
                    </div>
                    {'email' in selectedLeadDetail && (
                      <div className="flex justify-between">
                        <span className="text-[#7e91a6]">Email:</span>
                        <span className="text-[#cad6e3]">{selectedLeadDetail.email}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="text-[10px] text-[#7e91a6] uppercase font-bold block mb-1">Notes & Context:</label>
                    <p className="text-xs text-[#cad6e3] bg-[#0c131c] p-2.5 rounded border border-[#1b2b3f]">
                      {(selectedLeadDetail as any).notes || (selectedLeadDetail as any).dutyCycleRequirements || 'No additional notes provided.'}
                    </p>
                  </div>
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => setSelectedLeadDetail(null)}
                      className="px-4 py-2 rounded-lg bg-[#b58a35] text-[#0c131c] font-bold"
                    >
                      Close Dossier
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 8: DECISION REGISTER & GOVERNANCE */}
        {/* ========================================================================= */}
        {activeTab === 'decisions' && (
          <div className="space-y-6">
            {/* Preserved Canonical Claim Correction Card */}
            <div className="bg-[#141b26] border-2 border-[#f59e0b]/50 rounded-2xl p-5 sm:p-6 shadow-md">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#243346]">
                <div className="flex items-center gap-2 text-[#fbbf24]">
                  <History className="w-5 h-5" />
                  <h4 className="text-sm font-bold text-white">Preserved Canonical Historical Correction</h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f59e0b]/15 text-[#fbbf24] border border-[#f59e0b]/30 font-bold uppercase">
                  {HISTORICAL_CLAIM_CORRECTION.status}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-[#0e1520] p-3 rounded-lg border border-[#233245]">
                  <span className="text-[10px] font-bold text-[#f87171] uppercase block mb-1">Historical Statement (August 2026):</span>
                  <p className="text-[#f0f4f8] italic">"{HISTORICAL_CLAIM_CORRECTION.historicalStatement}"</p>
                  <span className="text-[10px] text-[#7e91a6] mt-2 block">Source: {HISTORICAL_CLAIM_CORRECTION.historicalSource}</span>
                </div>
                <div className="bg-[#0e1520] p-3 rounded-lg border border-[#b58a35]/60">
                  <span className="text-[10px] font-bold text-[#34d399] uppercase block mb-1">Current Operative Decision (DEC-002):</span>
                  <p className="text-[#f0f4f8]">"{HISTORICAL_CLAIM_CORRECTION.currentDecision}"</p>
                  <span className="text-[10px] text-[#e0b555] mt-2 block">Authority: {HISTORICAL_CLAIM_CORRECTION.currentAuthority}</span>
                </div>
              </div>
            </div>

            {/* Decisions Table */}
            <div className="bg-[#111925] border border-[#1d2a3c] rounded-xl overflow-x-auto">
              <table className="w-full text-left text-xs text-[#c2d3e5] divide-y divide-[#1c2a3d]">
                <thead className="bg-[#14202f] text-[11px] uppercase tracking-wider text-[#798e9f]">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Decision Made</th>
                    <th className="p-3">Authority</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Rationale & Governance Consequences</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#182434]">
                  {CANONICAL_DECISIONS.map((dec) => (
                    <tr key={dec.id} className="hover:bg-[#152334]/50 transition-colors">
                      <td className="p-3 font-mono font-bold text-[#b58a35] whitespace-nowrap">
                        {dec.id}
                      </td>
                      <td className="p-3 whitespace-nowrap text-[#899fb5]">
                        {dec.date}
                      </td>
                      <td className="p-3 font-semibold text-white max-w-sm">
                        {dec.decision}
                      </td>
                      <td className="p-3 text-[#e0b555] font-medium whitespace-nowrap">
                        {dec.owner}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          {dec.status}
                        </span>
                      </td>
                      <td className="p-3 text-[#9ab0c7] max-w-md">
                        {dec.rationale}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Google Sheets Live CRM & Market Intelligence Hub */}
        {activeTab === 'sheets' && (
          <GoogleSheetsManager
            currentLanguage={currentLanguage}
            leads={leads}
            onSpreadsheetConnected={onSpreadsheetConnected}
            activeSpreadsheetId={activeSpreadsheetId}
          />
        )}
      </div>

      {/* Side-by-side vehicle comparison modal */}
      {isComparisonOpen && comparisonVehicleA && comparisonVehicleB && (
        <VehicleComparisonModal
          vehicleA={comparisonVehicleA}
          vehicleB={comparisonVehicleB}
          allVehicles={CANDIDATE_VEHICLES}
          currentLanguage={currentLanguage}
          onClose={() => setIsComparisonOpen(false)}
          onSelectVehicleA={(v) => setComparisonVehicleA(v)}
          onSelectVehicleB={(v) => setComparisonVehicleB(v)}
        />
      )}
    </div>
  );
};
