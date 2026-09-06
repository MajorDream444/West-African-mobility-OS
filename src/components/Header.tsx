import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ShieldCheck, SlidersHorizontal, Compass, Car, FileText, Wrench, Globe, ArrowRight, FileSpreadsheet } from 'lucide-react';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  currentView: 'portal' | 'dashboard';
  onViewChange: (view: 'portal' | 'dashboard') => void;
  activeSection: string;
  onSectionClick: (section: string) => void;
  onOpenSheets?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  currentView,
  onViewChange,
  activeSection,
  onSectionClick,
  onOpenSheets,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  return (
    <header className="sticky top-0 z-40 bg-[#0c131c]/95 backdrop-blur-md border-b border-[#1c2736]">
      {/* Top Banner: Canonical Governance Status */}
      <div className="bg-[#131d2a] border-b border-[#1c2a3d] px-4 py-1.5 text-xs text-[#9fb1c5] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#b58a35]/20 text-[#e0b555] border border-[#b58a35]/40 tracking-wider uppercase">
            Phase 0 Status
          </span>
          <span>Supplier Discovery & Evidence Sprint • Non-Binding EOI (DEC-001)</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-[#788a9e]">
          <span>Corridor: Nouakchott ⇄ Zouérat ⇄ Nouadhibou</span>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline">Node ID: MR-MOBILITY-CANONICAL-v0.1</span>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Identity */}
        <div 
          onClick={() => { onViewChange('portal'); onSectionClick('hero'); }}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1d2a3a] to-[#121c27] border border-[#b58a35]/50 flex items-center justify-center text-[#e0b555] shadow-sm group-hover:border-[#b58a35] transition-colors">
            <Compass className="w-5 h-5 text-[#b58a35]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base sm:text-lg text-[#f0f4f8] tracking-tight group-hover:text-white transition-colors">
                {t.portalName}
              </span>
            </div>
            <p className="text-[11px] text-[#7e91a6] hidden sm:block">
              West Africa Mobility OS Node
            </p>
          </div>
        </div>

        {/* Navigation Links for Public Portal */}
        {currentView === 'portal' && (
          <nav className="hidden xl:flex items-center gap-1 text-xs font-medium text-[#8fa4bb]">
            <button
              onClick={() => onSectionClick('catalog-section')}
              className={`px-2.5 py-1.5 rounded-md transition-colors ${
                activeSection === 'catalog-section' ? 'text-[#f0f4f8] bg-[#162231]' : 'hover:text-[#e2ecf5] hover:bg-[#121c27]'
              }`}
            >
              {t.nav.vehicles}
            </button>
            <button
              onClick={() => onSectionClick('fleet-section')}
              className={`px-2.5 py-1.5 rounded-md transition-colors ${
                activeSection === 'fleet-section' ? 'text-[#f0f4f8] bg-[#162231]' : 'hover:text-[#e2ecf5] hover:bg-[#121c27]'
              }`}
            >
              {t.nav.fleet}
            </button>
            <button
              onClick={() => onSectionClick('ordering-section')}
              className={`px-2.5 py-1.5 rounded-md transition-colors ${
                activeSection === 'ordering-section' ? 'text-[#f0f4f8] bg-[#162231]' : 'hover:text-[#e2ecf5] hover:bg-[#121c27]'
              }`}
            >
              {t.nav.ordering}
            </button>
            <button
              onClick={() => onSectionClick('workshops-section')}
              className={`px-2.5 py-1.5 rounded-md transition-colors ${
                activeSection === 'workshops-section' ? 'text-[#f0f4f8] bg-[#162231]' : 'hover:text-[#e2ecf5] hover:bg-[#121c27]'
              }`}
            >
              {t.nav.workshops}
            </button>
            <button
              onClick={() => onSectionClick('workforce-section')}
              className={`px-2.5 py-1.5 rounded-md transition-colors ${
                activeSection === 'workforce-section' ? 'text-[#f0f4f8] bg-[#162231]' : 'hover:text-[#e2ecf5] hover:bg-[#121c27]'
              }`}
            >
              {t.nav.workforce}
            </button>
            <button
              onClick={() => onSectionClick('corridor-section')}
              className={`px-2.5 py-1.5 rounded-md transition-colors ${
                activeSection === 'corridor-section' ? 'text-[#f0f4f8] bg-[#162231]' : 'hover:text-[#e2ecf5] hover:bg-[#121c27]'
              }`}
            >
              {t.nav.corridor}
            </button>
            <button
              onClick={() => onSectionClick('disclosures-section')}
              className={`px-2.5 py-1.5 rounded-md transition-colors ${
                activeSection === 'disclosures-section' ? 'text-[#f0f4f8] bg-[#162231]' : 'hover:text-[#e2ecf5] hover:bg-[#121c27]'
              }`}
            >
              {t.nav.governance}
            </button>
            <button
              onClick={() => onSectionClick('intake-section')}
              className="ml-1 px-3 py-1.5 rounded-md bg-[#b58a35]/15 text-[#e0b555] border border-[#b58a35]/40 hover:bg-[#b58a35]/25 transition-colors font-semibold"
            >
              {t.nav.intake || 'Intake Funnels'}
            </button>
          </nav>
        )}

        {/* Right actions: Language toggle + Portal/Dashboard switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector */}
          <div className="flex items-center bg-[#131d2a] border border-[#202f43] rounded-lg p-0.5 text-xs font-medium">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 rounded transition-colors ${
                currentLanguage === 'en' ? 'bg-[#203147] text-[#f0f4f8]' : 'text-[#7e91a6] hover:text-[#c4d6e8]'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('fr')}
              className={`px-2 py-1 rounded transition-colors ${
                currentLanguage === 'fr' ? 'bg-[#203147] text-[#f0f4f8]' : 'text-[#7e91a6] hover:text-[#c4d6e8]'
              }`}
            >
              FR
            </button>
            <button
              onClick={() => onLanguageChange('ar')}
              className={`px-2 py-1 rounded transition-colors ${
                currentLanguage === 'ar' ? 'bg-[#203147] text-[#f0f4f8]' : 'text-[#7e91a6] hover:text-[#c4d6e8]'
              }`}
            >
              العربية
            </button>
          </div>

          {/* Google Sheets Quick Launcher */}
          <button
            onClick={() => {
              if (onOpenSheets) {
                onOpenSheets();
              } else {
                onViewChange('dashboard');
              }
            }}
            title="Google Sheets Live CRM Hub"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0f9d58]/15 hover:bg-[#0f9d58]/25 text-[#34a853] border border-[#0f9d58]/35 text-xs font-semibold transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Google Sheets</span>
          </button>

          {/* Mode Switcher: Portal vs Dashboard */}
          <button
            onClick={() => onViewChange(currentView === 'portal' ? 'dashboard' : 'portal')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm ${
              currentView === 'dashboard'
                ? 'bg-[#1b2b3e] text-[#9fc7f5] border border-[#304d70] hover:bg-[#233852]'
                : 'bg-gradient-to-r from-[#b58a35] to-[#9c752c] text-[#0c131c] font-bold hover:brightness-110'
            }`}
          >
            {currentView === 'portal' ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t.nav.dashboard}</span>
              </>
            ) : (
              <>
                <Car className="w-3.5 h-3.5" />
                <span>{t.nav.switchToPortal}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
