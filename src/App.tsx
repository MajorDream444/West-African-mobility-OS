import React, { useState, useEffect } from 'react';
import { Language, VehicleModel, CRMLead } from './types';
import { SEEDED_CRM_LEADS, CANDIDATE_VEHICLES } from './data/canonicalData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { VehicleCatalog } from './components/VehicleCatalog';
import { FleetSection } from './components/FleetSection';
import { HowOrderingWorks } from './components/HowOrderingWorks';
import { WorkshopsSection } from './components/WorkshopsSection';
import { WorkforceSection } from './components/WorkforceSection';
import { CorridorVisionSection } from './components/CorridorVisionSection';
import { IntakeForms } from './components/IntakeForms';
import { DisclosuresSection } from './components/DisclosuresSection';
import { DashboardView } from './components/DashboardView';
import { VehicleDetailModal } from './components/VehicleDetailModal';
import { Footer } from './components/Footer';
import { appendLeadToSheet } from './services/googleSheets';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'portal' | 'dashboard'>('portal');
  const [dashboardTab, setDashboardTab] = useState<string>('overview');
  const [currentLanguage, setCurrentLanguage] = useState<Language>('fr');
  const [activeSection, setActiveSection] = useState<string>('catalog-section');
  const [intakeTab, setIntakeTab] = useState<'personal' | 'fleet' | 'mechanic' | 'workshop'>('personal');
  const [activeSpreadsheetId, setActiveSpreadsheetId] = useState<string | null>(() => {
    return localStorage.getItem('wamos_active_sheet_id');
  });

  // Leads storage initialized from canonical seed + localStorage
  const [leads, setLeads] = useState<CRMLead[]>(() => {
    const saved = localStorage.getItem('mauritania_mobility_leads');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved leads', e);
      }
    }
    return SEEDED_CRM_LEADS;
  });

  // Modal and pre-selection state
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleModel | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [preselectedVehicleId, setPreselectedVehicleId] = useState<string | undefined>(undefined);

  // Sync leads to localStorage
  useEffect(() => {
    localStorage.setItem('mauritania_mobility_leads', JSON.stringify(leads));
  }, [leads]);

  // Handle RTL for Arabic
  useEffect(() => {
    if (currentLanguage === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = currentLanguage;
    }
  }, [currentLanguage]);

  const handleSelectVehicle = (vehicle: VehicleModel) => {
    setSelectedVehicle(vehicle);
    setIsDetailOpen(true);
  };

  const handleExpressInterest = (vehicleId: string) => {
    setPreselectedVehicleId(vehicleId);
    setIntakeTab('personal');
    scrollToSection('intake-section');
  };

  const handleLeadSubmitted = (newLead: CRMLead) => {
    setLeads((prev) => [newLead, ...prev]);
    if (activeSpreadsheetId) {
      appendLeadToSheet(activeSpreadsheetId, newLead).catch((err) => {
        console.warn('Could not auto-append lead to connected Google Sheet:', err);
      });
    }
  };

  const handleUpdateLeadStatus = (leadId: string, newStage: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, crmStage: newStage as any } : l))
    );
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (currentView !== 'portal') {
      setCurrentView('portal');
      setTimeout(() => {
        const elem = document.getElementById(sectionId);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const elem = document.getElementById(sectionId);
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openDashboardWithTab = (tabName: string) => {
    setDashboardTab(tabName);
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen bg-[#0c131c] text-[#f0f4f8] ${currentLanguage === 'ar' ? 'font-cairo' : 'font-sans'}`}>
      {/* Top Universal Navigation Header */}
      <Header
        currentView={currentView}
        onViewChange={(view) => {
          setCurrentView(view);
          if (view === 'dashboard') {
            setDashboardTab('overview');
          }
        }}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
        onOpenSheets={() => openDashboardWithTab('sheets')}
      />

      {/* Main Content Area */}
      {currentView === 'portal' ? (
        <main>
          {/* Hero Section */}
          <HeroSection
            currentLanguage={currentLanguage}
            onExploreVehicles={() => scrollToSection('catalog-section')}
            onStartInquiry={() => {
              setIntakeTab('personal');
              scrollToSection('intake-section');
            }}
            onOpenDashboard={() => openDashboardWithTab('overview')}
          />

          {/* 1. Candidate Vehicle Catalogue */}
          <div id="catalog-section">
            <VehicleCatalog
              currentLanguage={currentLanguage}
              onSelectVehicle={handleSelectVehicle}
              onExpressInterest={handleExpressInterest}
            />
          </div>

          {/* 2. Institutional Fleet Solutions & Mining Corridors */}
          <div id="fleet-section">
            <FleetSection
              currentLanguage={currentLanguage}
              onOpenIntakeWithTab={(tab) => {
                setIntakeTab(tab as any);
                scrollToSection('intake-section');
              }}
              onSelectVehicleId={(vId) => {
                const found = CANDIDATE_VEHICLES.find(v => v.id === vId);
                if (found) {
                  handleSelectVehicle(found as any);
                }
              }}
            />
          </div>

          {/* 3. How Ordering Works (8-Step Zero-Deposit Mandate Loop) */}
          <div id="ordering-section">
            <HowOrderingWorks
              currentLanguage={currentLanguage}
              onCtaClick={() => {
                setIntakeTab('personal');
                scrollToSection('intake-section');
              }}
            />
          </div>

          {/* 4. Mapped Partner Workshops & Accreditation Standards */}
          <div id="workshops-section">
            <WorkshopsSection
              currentLanguage={currentLanguage}
              onOpenIntakeWithTab={(tab) => {
                setIntakeTab(tab as any);
                scrollToSection('intake-section');
              }}
            />
          </div>

          {/* 5. Workforce & 7-Stage Mechanic Progression Pathway */}
          <div id="workforce-section">
            <WorkforceSection
              currentLanguage={currentLanguage}
              onOpenIntakeWithTab={(tab) => {
                setIntakeTab(tab as any);
                scrollToSection('intake-section');
              }}
            />
          </div>

          {/* 6. Regional Corridor Vision (Mauritania Controlled Node & Senegal Complementary Hub) */}
          <div id="corridor-section">
            <CorridorVisionSection
              currentLanguage={currentLanguage}
              onExploreVehicles={() => scrollToSection('catalog-section')}
              onSwitchToDashboard={(tab) => openDashboardWithTab(tab)}
            />
          </div>

          {/* 7. Four Structured Intake Funnels */}
          <div id="intake-section">
            <IntakeForms
              currentLanguage={currentLanguage}
              initialTab={intakeTab}
              preselectedVehicleId={preselectedVehicleId}
              onLeadSubmitted={handleLeadSubmitted}
            />
          </div>

          {/* 8. Canonical Disclosures & Standards */}
          <div id="disclosures-section">
            <DisclosuresSection
              currentLanguage={currentLanguage}
              onOpenDashboard={() => openDashboardWithTab('claims')}
            />
          </div>

          {/* Footer */}
          <Footer
            currentLanguage={currentLanguage}
            onSelectLanguage={setCurrentLanguage}
            onOpenDashboard={() => openDashboardWithTab('overview')}
          />

          {/* Vehicle Detailed Specifications & Interactive Landed-Cost Modal */}
          <VehicleDetailModal
            vehicle={selectedVehicle}
            isOpen={isDetailOpen}
            onClose={() => {
              setIsDetailOpen(false);
              setSelectedVehicle(null);
            }}
            currentLanguage={currentLanguage}
            onSelectForInquiry={handleExpressInterest}
          />
        </main>
      ) : (
        <main>
          <DashboardView
            currentLanguage={currentLanguage}
            leads={leads}
            initialTab={dashboardTab}
            onBackToPortal={() => setCurrentView('portal')}
            onUpdateLeadStatus={handleUpdateLeadStatus}
            activeSpreadsheetId={activeSpreadsheetId}
            onSpreadsheetConnected={(id) => setActiveSpreadsheetId(id)}
          />
        </main>
      )}
    </div>
  );
};

export default App;
