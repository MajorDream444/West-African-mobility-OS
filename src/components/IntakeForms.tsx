import React, { useState, useEffect } from 'react';
import { Language, CRMLead, PersonalInquiry, FleetInquiry, MechanicRegistration, WorkshopRegistration } from '../types';
import { CANDIDATE_VEHICLES } from '../data/canonicalData';
import { TRANSLATIONS } from '../data/translations';
import { User, Building2, Wrench, Warehouse, CheckCircle2, ShieldAlert, Send } from 'lucide-react';

interface IntakeFormsProps {
  currentLanguage: Language;
  preselectedVehicleId?: string;
  initialTab?: 'personal' | 'fleet' | 'mechanic' | 'workshop';
  onLeadSubmitted: (lead: CRMLead) => void;
}

export const IntakeForms: React.FC<IntakeFormsProps> = ({
  currentLanguage,
  preselectedVehicleId,
  initialTab = 'personal',
  onLeadSubmitted,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [activeTab, setActiveTab] = useState<'personal' | 'fleet' | 'mechanic' | 'workshop'>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form 1: Personal Buyer State
  const [personalForm, setPersonalForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'Nouakchott (Tevragh-Zeina)',
    selectedVehicleId: preselectedVehicleId || CANDIDATE_VEHICLES[0].id,
    budgetRange: '$25,000 - $35,000 USD',
    primaryUsage: 'Conduite urbaine et déplacements régionaux',
    purchaseTimeline: 'D\'ici 60 jours',
    depositReadiness: 'Non demandé — les dépôts sont bloqués',
    notes: '',
  });

  // Form 2: Fleet & Institutional State
  const [fleetForm, setFleetForm] = useState({
    orgName: '',
    contactName: '',
    contactTitle: '',
    phone: '',
    email: '',
    sector: 'Mines & Ressources Naturelles',
    fleetSizeEstimate: '5 à 10 unités',
    deliveryLocation: 'Nouakchott / Base Opérationnelle',
    dutyCycleRequirements: 'Pistes non goudronnées, forte charge, haute température',
    tenderTimeline: 'Cycle Budgétaire Q4 2026',
    notes: '',
  });

  // Form 3: Mechanic State
  const [mechanicForm, setMechanicForm] = useState({
    fullName: '',
    phone: '',
    city: 'Nouakchott',
    yearsExperience: 5,
    currentWorkshop: '',
    specialties: 'Diagnostic Électronique, Injection, Climatisation',
    hasDiagnosticExperience: true,
    trainingCohortInterest: true,
  });

  // Form 4: Workshop State
  const [workshopForm, setWorkshopForm] = useState({
    businessName: '',
    ownerName: '',
    phone: '',
    email: '',
    location: 'Nouakchott',
    bayCount: 4,
    liftCount: 2,
    hasThreePhasePower: true,
    diagnosticToolsOwned: 'Launch X431, Autel MaxiSys',
    partsStorageSpace: '50 m² sécurisé',
  });

  useEffect(() => {
    if (preselectedVehicleId) {
      setPersonalForm((prev) => ({ ...prev, selectedVehicleId: preselectedVehicleId }));
      setActiveTab('personal');
    }
  }, [preselectedVehicleId]);

  const handlePersonalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const newLead: PersonalInquiry = {
        id: `DEMO-BUY-${Date.now().toString().slice(-6)}`,
        type: 'personal',
        fullName: personalForm.fullName,
        phone: personalForm.phone,
        email: personalForm.email,
        city: personalForm.city,
        selectedVehicleId: personalForm.selectedVehicleId,
        budgetRange: personalForm.budgetRange,
        primaryUsage: personalForm.primaryUsage,
        purchaseTimeline: personalForm.purchaseTimeline,
        depositReadiness: personalForm.depositReadiness,
        createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
        crmStage: 'New interest',
        status: 'New',
        notes: personalForm.notes,
      };
      onLeadSubmitted(newLead);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const handleFleetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const newLead: FleetInquiry = {
        id: `DEMO-FLEET-${Date.now().toString().slice(-6)}`,
        type: 'fleet',
        orgName: fleetForm.orgName,
        contactName: fleetForm.contactName,
        contactTitle: fleetForm.contactTitle,
        phone: fleetForm.phone,
        email: fleetForm.email,
        sector: (fleetForm.sector as FleetInquiry['sector']) || 'Mining',
        fleetSizeEstimate: fleetForm.fleetSizeEstimate,
        deliveryLocation: fleetForm.deliveryLocation,
        operatingConditions: fleetForm.dutyCycleRequirements,
        acquisitionTiming: fleetForm.tenderTimeline,
        financingInterest: false,
        serviceExpectations: 'Dedicated on-site spare parts and certified maintenance support',
        createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
        crmStage: 'New interest',
        status: 'New',
        notes: fleetForm.notes,
      };
      onLeadSubmitted(newLead);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const handleMechanicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const newLead: MechanicRegistration = {
        id: `DEMO-MECH-${Date.now().toString().slice(-6)}`,
        type: 'mechanic',
        fullName: mechanicForm.fullName,
        phone: mechanicForm.phone,
        city: mechanicForm.city,
        yearsExperience: Number(mechanicForm.yearsExperience),
        currentWorkshop: mechanicForm.currentWorkshop,
        specialties: mechanicForm.specialties.split(',').map((s) => s.trim()),
        languages: ['French', 'Hassaniya'],
        certifications: 'Vocational Technical Certificate',
        toolsOwned: 'Standard Hand & Pneumatic Tools',
        hasDiagnosticExperience: mechanicForm.hasDiagnosticExperience,
        trainingCohortInterest: mechanicForm.trainingCohortInterest,
        pathwayStage: 'Apprentice',
        readinessRating: 'Screening Needed',
        createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
        status: 'Browser-only demonstration submission — not screened',
        nextAction: 'Human review and consent verification required',
      };
      onLeadSubmitted(newLead);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const handleWorkshopSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const newLead: WorkshopRegistration = {
        id: `DEMO-WS-${Date.now().toString().slice(-6)}`,
        type: 'workshop',
        businessName: workshopForm.businessName,
        ownerName: workshopForm.ownerName,
        phone: workshopForm.phone,
        email: workshopForm.email,
        location: workshopForm.location,
        bayCount: Number(workshopForm.bayCount),
        liftCount: Number(workshopForm.liftCount),
        hasThreePhasePower: workshopForm.hasThreePhasePower,
        diagnosticToolsOwned: workshopForm.diagnosticToolsOwned,
        electricalCapability: false,
        hybridEvReadiness: false,
        partsStorageSpace: workshopForm.partsStorageSpace || 'Not verified',
        technicianCount: 0,
        languagesSpoken: ['French', 'Arabic', 'Hassaniya'],
        fleetServiceCapability: false,
        trainingInterest: false,
        readinessScore: 0,
        createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
        status: 'Browser-only demonstration submission — not assessed',
        nextAction: 'Human review and consent verification required',
      };
      onLeadSubmitted(newLead);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <section id="intake-section" className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#111924] border border-[#1e2d3f] rounded-2xl p-6 sm:p-8 shadow-xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-[#b58a35]/20 text-[#e5be62] border border-[#b58a35]/40 tracking-wider uppercase mb-2">
            Collecte & Qualification Marché • Phase 0
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f0f4f8] tracking-tight">
            {t.forms.title}
          </h2>
          <p className="text-sm text-[#8fa4bb] mt-2">
            {t.forms.subtitle}
          </p>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8 bg-[#0c131c] p-1.5 rounded-xl border border-[#1b2737]">
          <button
            onClick={() => { setActiveTab('personal'); setSubmitted(false); }}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'personal'
                ? 'bg-[#b58a35] text-[#0c131c] shadow'
                : 'text-[#8599af] hover:text-white hover:bg-[#15202d]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>{t.forms.tabPersonal}</span>
          </button>
          <button
            onClick={() => { setActiveTab('fleet'); setSubmitted(false); }}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'fleet'
                ? 'bg-[#b58a35] text-[#0c131c] shadow'
                : 'text-[#8599af] hover:text-white hover:bg-[#15202d]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>{t.forms.tabFleet}</span>
          </button>
          <button
            onClick={() => { setActiveTab('mechanic'); setSubmitted(false); }}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'mechanic'
                ? 'bg-[#b58a35] text-[#0c131c] shadow'
                : 'text-[#8599af] hover:text-white hover:bg-[#15202d]'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>{t.forms.tabMechanic}</span>
          </button>
          <button
            onClick={() => { setActiveTab('workshop'); setSubmitted(false); }}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'workshop'
                ? 'bg-[#b58a35] text-[#0c131c] shadow'
                : 'text-[#8599af] hover:text-white hover:bg-[#15202d]'
            }`}
          >
            <Warehouse className="w-3.5 h-3.5" />
            <span>{t.forms.tabWorkshop}</span>
          </button>
        </div>

        {/* Success Feedback */}
        {submitted ? (
          <div className="text-center py-10 px-4 bg-[#14202e] border border-[#23384f] rounded-xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#b58a35]/20 border border-[#b58a35] flex items-center justify-center text-[#e5be62] mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">
              {t.forms.successTitle}
            </h3>
            <p className="text-xs text-[#9eb2c7] max-w-md mx-auto leading-relaxed">
              {t.forms.successBody}
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-2 px-4 py-2 rounded-lg bg-[#1c2a3c] hover:bg-[#253950] text-xs font-semibold text-white transition-colors"
            >
              {t.forms.submitAnother}
            </button>
          </div>
        ) : (
          <div>
            {/* 1. PERSONAL INQUIRY FORM */}
            {activeTab === 'personal' && (
              <form onSubmit={handlePersonalSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#8fa4bb] mb-1 font-medium">{t.forms.fullName} *</label>
                    <input
                      type="text"
                      required
                      placeholder="ex: Cheikh Ould Sid'Ahmed"
                      value={personalForm.fullName}
                      onChange={(e) => setPersonalForm({ ...personalForm, fullName: e.target.value })}
                      className="w-full p-2.5 bg-[#0c131c] border border-[#202f43] rounded-lg text-white focus:outline-none focus:border-[#b58a35]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8fa4bb] mb-1 font-medium">{t.forms.phone} *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+222 46 XX XX XX"
                      value={personalForm.phone}
                      onChange={(e) => setPersonalForm({ ...personalForm, phone: e.target.value })}
                      className="w-full p-2.5 bg-[#0c131c] border border-[#202f43] rounded-lg text-white focus:outline-none focus:border-[#b58a35]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8fa4bb] mb-1 font-medium">{t.forms.email}</label>
                    <input
                      type="email"
                      placeholder="nom@exemple.mr"
                      value={personalForm.email}
                      onChange={(e) => setPersonalForm({ ...personalForm, email: e.target.value })}
                      className="w-full p-2.5 bg-[#0c131c] border border-[#202f43] rounded-lg text-white focus:outline-none focus:border-[#b58a35]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8fa4bb] mb-1 font-medium">{t.forms.city}</label>
                    <input
                      type="text"
                      value={personalForm.city}
                      onChange={(e) => setPersonalForm({ ...personalForm, city: e.target.value })}
                      className="w-full p-2.5 bg-[#0c131c] border border-[#202f43] rounded-lg text-white focus:outline-none focus:border-[#b58a35]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-[#8fa4bb] mb-1 font-medium">Modèle de Véhicule Visé</label>
                    <select
                      value={personalForm.selectedVehicleId}
                      onChange={(e) => setPersonalForm({ ...personalForm, selectedVehicleId: e.target.value })}
                      className="w-full p-2.5 bg-[#0c131c] border border-[#202f43] rounded-lg text-white focus:outline-none focus:border-[#b58a35]"
                    >
                      {CANDIDATE_VEHICLES.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.brand} - {v.model} ({v.trim})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#8fa4bb] mb-1 font-medium">{t.forms.budget}</label>
                    <select
                      value={personalForm.budgetRange}
                      onChange={(e) => setPersonalForm({ ...personalForm, budgetRange: e.target.value })}
                      className="w-full p-2.5 bg-[#0c131c] border border-[#202f43] rounded-lg text-white focus:outline-none focus:border-[#b58a35]"
                    >
                      <option value="Moins de $20,000 USD">Moins de $20,000 USD (&lt; 800,000 MRU)</option>
                      <option value="$20,000 - $30,000 USD">$20,000 - $30,000 USD (~1,000,000 MRU)</option>
                      <option value="$30,000 - $45,000 USD">$30,000 - $45,000 USD (~1,500,000 MRU)</option>
                      <option value="Plus de $45,000 USD">Plus de $45,000 USD (Haut de gamme)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#8fa4bb] mb-1 font-medium">{t.forms.timeline}</label>
                    <select
                      value={personalForm.purchaseTimeline}
                      onChange={(e) => setPersonalForm({ ...personalForm, purchaseTimeline: e.target.value })}
                      className="w-full p-2.5 bg-[#0c131c] border border-[#202f43] rounded-lg text-white focus:outline-none focus:border-[#b58a35]"
                    >
                      <option value="Immédiat (dès véhicule de démonstration disponible)">Dès véhicule de démonstration visible à Nouakchott</option>
                      <option value="D'ici 30 à 60 jours">D'ici 30 à 60 jours</option>
                      <option value="3 à 6 mois">3 à 6 mois</option>
                      <option value="Simple veille de marché">Simple veille de marché</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#8fa4bb] mb-1 font-medium">Payment information</label>
                    <select
                      value={personalForm.depositReadiness}
                      onChange={(e) => setPersonalForm({ ...personalForm, depositReadiness: e.target.value })}
                      className="w-full p-2.5 bg-[#0c131c] border border-[#202f43] rounded-lg text-white focus:outline-none focus:border-[#b58a35]"
                    >
                      <option value="Non demandé — les dépôts sont bloqués">Non demandé — aucun paiement ou dépôt accepté</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#8fa4bb] mb-1 font-medium">Exigences Spécifiques ou Commentaires</label>
                  <textarea
                    rows={2}
                    placeholder="Options souhaitées, filtre sable, suspension renforcée..."
                    value={personalForm.notes}
                    onChange={(e) => setPersonalForm({ ...personalForm, notes: e.target.value })}
                    className="w-full p-2.5 bg-[#0c131c] border border-[#202f43] rounded-lg text-white focus:outline-none focus:border-[#b58a35]"
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-[#b58a35] to-[#9c752c] text-[#0c131c] font-bold text-xs hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? t.forms.submitting : t.forms.submitButton}</span>
                  </button>
                </div>
              </form>
            )}

            {/* 2. FLEET & INSTITUTIONAL INQUIRY FORM */}
            {activeTab === 'fleet' && (
              <form onSubmit={handleFleetSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#8fa4bb] mb-1 font-medium">{t.forms.orgName} *</label>
                    <input
                      type="text"
                      required
                      placeholder="ex: Société d'Exploitation Minière..."
                      value={fleetForm.orgName}
                      onChange={(e) => setFleetForm({ ...fleetForm, orgName: e.target.value })}
                      className="w-full p-2.5 bg-[#0c131c] border border-[#202f43] rounded-lg text-white focus:outline-none focus:border-[#b58a35]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8fa4bb] mb-1 font-medium">{t.forms.sector}</label>
                    <select
                      value={fleetForm.sector}
                      onChange={(e) => setFleetForm({ ...fleetForm, sector: e.target.value })}
                      className="w-full p-2.5 bg-[#0c131c] border border-[#202f43] rounded-lg text-white focus:outline-none focus:border-[#b58a35]"
                    >
                      <option value="Mines & Métaux (Fer, Or, Cuivre)">Mines & Métaux (Fer, Or, Cuivre)</option>
                      <option value="BTP & Construction d'Infrastructures">BTP & Construction d'Infrastructures</option>
                      <option value="Administration Publique & Projets d'État">Administration Publique & Projets d'État</option>
                      <option value="ONG / Agence Internationale / ONU">ONG / Agence Internationale / ONU</option>
                      <option value="Logistique, Énergie & Télécoms">Logistique, Énergie & Télécoms</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#8fa4bb] mb-1 font-medium">Nom du Responsable Flotte *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nom et Prénom"
                      value={fleetForm.contactName}
                      onChange={(e) => setFleetForm({ ...fleetForm, contactName: e.target.value })}
                      className="w-full p-2.5 bg-[#0c131c] border border-[#202f43] rounded-lg text-white focus:outline-none focus:border-[#b58a35]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8fa4bb] mb-1 font-medium">{t.forms.contactTitle}</label>
                    <input
                      type="text"
                      placeholder="Directeur Général / Responsable Logistique"
                      value={fleetForm.contactTitle}
                      onChange={(e) => setFleetForm({ ...fleetForm, contactTitle: e.target.value })}
                      className="w-full p-2.5 bg-[#0c131c] border border-[#202f43] rounded-lg text-white focus:outline-none focus:border-[#b58a35]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8fa4bb] mb-1 font-medium">{t.forms.phone} *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+222 45 XX XX XX"
                      value={fleetForm.phone}
                      onChange={(e) => setFleetForm({ ...fleetForm, phone: e.target.value })}
                      className="w-full p-2.5 bg-[#0c131c] border border-[#202f43] rounded-lg text-white focus:outline-none focus:border-[#b58a35]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8fa4bb] mb-1 font-medium">{t.forms.email} *</label>
                    <input
                      type="email"
                      required
                      placeholder="direction@entreprise.mr"
                      value={fleetForm.email}
                      onChange={(e) => setFleetForm({ ...fleetForm, email: e.target.value })}
                      className="w-full p-2.5 bg-[#0c131c] border border-[#202f43] rounded-lg text-white focus:outline-none focus:border-[#b58a35]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-[#8fa4bb] mb-1 font-medium">{t.forms.fleetSize}</label>
                    <select
                      value={fleetForm.fleetSizeEstimate}
                      onChange={(e) => setFleetForm({ ...fleetForm, fleetSizeEstimate: e.target.value })}
                      className="w-full p-2.5 bg-[#0c131c] border border-[#202f43] rounded-lg text-white focus:outline-none focus:border-[#b58a35]"
                    >
                      <option value="2 à 5 véhicules (Lot test)">2 à 5 véhicules (Lot test)</option>
                      <option value="6 à 15 véhicules">6 à 15 véhicules</option>
                      <option value="16 à 30 véhicules">16 à 30 véhicules</option>
                      <option value="Plus de 30 véhicules">Plus de 30 véhicules</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#8fa4bb] mb-1 font-medium">{t.forms.deliveryLocation}</label>
                    <input
                      type="text"
                      placeholder="ex: Zouérat / Akjoujt / Nouakchott"
                      value={fleetForm.deliveryLocation}
                      onChange={(e) => setFleetForm({ ...fleetForm, deliveryLocation: e.target.value })}
                      className="w-full p-2.5 bg-[#0c131c] border border-[#202f43] rounded-lg text-white focus:outline-none focus:border-[#b58a35]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8fa4bb] mb-1 font-medium">Délai d'Appel d'Offres</label>
                    <select
                      value={fleetForm.tenderTimeline}
                      onChange={(e) => setFleetForm({ ...fleetForm, tenderTimeline: e.target.value })}
                      className="w-full p-2.5 bg-[#0c131c] border border-[#202f43] rounded-lg text-white focus:outline-none focus:border-[#b58a35]"
                    >
                      <option value="Immédiat (T4 2026)">Immédiat (T4 2026)</option>
                      <option value="Budget 2027 (T1-T2 2027)">Budget 2027 (T1-T2 2027)</option>
                      <option value="Demande d'informations préalables">Demande d'informations préalables</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#8fa4bb] mb-1 font-medium">{t.forms.dutyCycle}</label>
                  <textarea
                    rows={2}
                    placeholder="Contraintes d'exploitation, autonomie requise, service après-vente sur site demandé..."
                    value={fleetForm.dutyCycleRequirements}
                    onChange={(e) => setFleetForm({ ...fleetForm, dutyCycleRequirements: e.target.value })}
                    className="w-full p-2.5 bg-[#0c131c] border border-[#202f43] rounded-lg text-white focus:outline-none focus:border-[#b58a35]"
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-[#b58a35] to-[#9c752c] text-[#0c131c] font-bold text-xs hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? t.forms.submitting : "Enregistrer la Demande Flotte"}</span>
                  </button>
                </div>
              </form>
            )}

            {/* 3. MECHANIC & COHORT REGISTRATION FORM */}
            {activeTab === 'mechanic' && (
              <form onSubmit={handleMechanicSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#8fa4bb] mb-1 font-medium">{t.forms.fullName} *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nom et Prénom du Technicien"
                      value={mechanicForm.fullName}
                      onChange={(e) => setMechanicForm({ ...mechanicForm, fullName: e.target.value })}
                      className="w-full p-2.5 bg-[#0c131c] border border-[#202f43] rounded-lg text-white focus:outline-none focus:border-[#b58a35]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8fa4bb] mb-1 font-medium">{t.forms.phone} *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+222 36 XX XX XX"
                      value={mechanicForm.phone}
                      onChange={(e) => setMechanicForm({ ...mechanicForm, phone: e.target.value })}
                      className="w-full p-2.5 bg-[#0c131c] border border-[#202f43] rounded-lg text-white focus:outline-none focus:border-[#b58a35]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8fa4bb] mb-1 font-medium">{t.forms.experienceYears}</label>
                    <input
                      type="number"
                      min={1}
                      max={40}
                      value={mechanicForm.yearsExperience}
                      onChange={(e) => setMechanicForm({ ...mechanicForm, yearsExperience: Number(e.target.value) })}
                      className="w-full p-2.5 bg-[#0c131c] border border-[#202f43] rounded-lg text-white focus:outline-none focus:border-[#b58a35]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8fa4bb] mb-1 font-medium">{t.forms.currentWorkshop}</label>
                    <input
                      type="text"
                      placeholder="Garage ou atelier indépendant"
                      value={mechanicForm.currentWorkshop}
                      onChange={(e) => setMechanicForm({ ...mechanicForm, currentWorkshop: e.target.value })}
                      className="w-full p-2.5 bg-[#0c131c] border border-[#202f43] rounded-lg text-white focus:outline-none focus:border-[#b58a35]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#8fa4bb] mb-1 font-medium">{t.forms.specialties}</label>
                  <input
                    type="text"
                    placeholder="Moteurs essence, Diesel Common-Rail, Électricité, Diagnostic valise..."
                    value={mechanicForm.specialties}
                    onChange={(e) => setMechanicForm({ ...mechanicForm, specialties: e.target.value })}
                    className="w-full p-2.5 bg-[#0c131c] border border-[#202f43] rounded-lg text-white focus:outline-none focus:border-[#b58a35]"
                  />
                </div>

                <div className="bg-[#0c131c] p-3 rounded-lg border border-[#1d2b3c] space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={mechanicForm.hasDiagnosticExperience}
                      onChange={(e) => setMechanicForm({ ...mechanicForm, hasDiagnosticExperience: e.target.checked })}
                      className="accent-[#b58a35]"
                    />
                    <span className="text-[#a4b8cd] font-medium">
                      {t.forms.diagnosticExperience}
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={mechanicForm.trainingCohortInterest}
                      onChange={(e) => setMechanicForm({ ...mechanicForm, trainingCohortInterest: e.target.checked })}
                      className="accent-[#b58a35]"
                    />
                    <span className="text-[#a4b8cd] font-medium">
                      {t.forms.cohortInterest}
                    </span>
                  </label>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-[#b58a35] to-[#9c752c] text-[#0c131c] font-bold text-xs hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? t.forms.submitting : "Déposer ma Candidature Technicien"}</span>
                  </button>
                </div>
              </form>
            )}

            {/* 4. WORKSHOP PARTNER REGISTRATION FORM */}
            {activeTab === 'workshop' && (
              <form onSubmit={handleWorkshopSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#8fa4bb] mb-1 font-medium">{t.forms.workshopName} *</label>
                    <input
                      type="text"
                      required
                      placeholder="ex: Centre Auto Al-Baraka"
                      value={workshopForm.businessName}
                      onChange={(e) => setWorkshopForm({ ...workshopForm, businessName: e.target.value })}
                      className="w-full p-2.5 bg-[#0c131c] border border-[#202f43] rounded-lg text-white focus:outline-none focus:border-[#b58a35]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8fa4bb] mb-1 font-medium">{t.forms.ownerName} *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nom du Gérant / Propriétaire"
                      value={workshopForm.ownerName}
                      onChange={(e) => setWorkshopForm({ ...workshopForm, ownerName: e.target.value })}
                      className="w-full p-2.5 bg-[#0c131c] border border-[#202f43] rounded-lg text-white focus:outline-none focus:border-[#b58a35]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8fa4bb] mb-1 font-medium">{t.forms.phone} *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+222 22 XX XX XX"
                      value={workshopForm.phone}
                      onChange={(e) => setWorkshopForm({ ...workshopForm, phone: e.target.value })}
                      className="w-full p-2.5 bg-[#0c131c] border border-[#202f43] rounded-lg text-white focus:outline-none focus:border-[#b58a35]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8fa4bb] mb-1 font-medium">{t.forms.email}</label>
                    <input
                      type="email"
                      placeholder="contact@garage.mr"
                      value={workshopForm.email}
                      onChange={(e) => setWorkshopForm({ ...workshopForm, email: e.target.value })}
                      className="w-full p-2.5 bg-[#0c131c] border border-[#202f43] rounded-lg text-white focus:outline-none focus:border-[#b58a35]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-[#8fa4bb] mb-1 font-medium">{t.forms.bayCount}</label>
                    <input
                      type="number"
                      min={1}
                      value={workshopForm.bayCount}
                      onChange={(e) => setWorkshopForm({ ...workshopForm, bayCount: Number(e.target.value) })}
                      className="w-full p-2.5 bg-[#0c131c] border border-[#202f43] rounded-lg text-white focus:outline-none focus:border-[#b58a35]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8fa4bb] mb-1 font-medium">{t.forms.liftCount}</label>
                    <input
                      type="number"
                      min={0}
                      value={workshopForm.liftCount}
                      onChange={(e) => setWorkshopForm({ ...workshopForm, liftCount: Number(e.target.value) })}
                      className="w-full p-2.5 bg-[#0c131c] border border-[#202f43] rounded-lg text-white focus:outline-none focus:border-[#b58a35]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8fa4bb] mb-1 font-medium">Localisation</label>
                    <input
                      type="text"
                      placeholder="ex: Nouakchott (Ksar ou Tevragh-Zeina)"
                      value={workshopForm.location}
                      onChange={(e) => setWorkshopForm({ ...workshopForm, location: e.target.value })}
                      className="w-full p-2.5 bg-[#0c131c] border border-[#202f43] rounded-lg text-white focus:outline-none focus:border-[#b58a35]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#8fa4bb] mb-1 font-medium">{t.forms.diagnosticTools}</label>
                  <input
                    type="text"
                    value={workshopForm.diagnosticToolsOwned}
                    onChange={(e) => setWorkshopForm({ ...workshopForm, diagnosticToolsOwned: e.target.value })}
                    className="w-full p-2.5 bg-[#0c131c] border border-[#202f43] rounded-lg text-white focus:outline-none focus:border-[#b58a35]"
                  />
                </div>

                <div className="bg-[#0c131c] p-3 rounded-lg border border-[#1d2b3c]">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={workshopForm.hasThreePhasePower}
                      onChange={(e) => setWorkshopForm({ ...workshopForm, hasThreePhasePower: e.target.checked })}
                      className="accent-[#b58a35]"
                    />
                    <span className="text-[#a4b8cd] font-medium">
                      {t.forms.threePhase}
                    </span>
                  </label>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-[#b58a35] to-[#9c752c] text-[#0c131c] font-bold text-xs hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? t.forms.submitting : "Enregistrer l'Atelier Partenaire"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
