import React from 'react';
import type { Language } from '../types';

interface FooterProps {
  currentLanguage: Language;
  onSelectLanguage: (language: Language) => void;
  onOpenDashboard: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLanguage, onSelectLanguage, onOpenDashboard }) => (
  <footer className="border-t border-[#1c293b] bg-[#090e14] px-4 py-10 text-center text-xs text-[#8297ac]">
    <p>West African Mobility OS • Internal demonstration • No payments, orders, appointments, mandates or authorizations</p>
    <div className="mt-4 flex justify-center gap-2">
      {(['en', 'fr', 'ar'] as Language[]).map((language) => <button key={language} onClick={() => onSelectLanguage(language)} aria-pressed={currentLanguage === language} className="rounded border border-[#26394f] px-2 py-1">{language.toUpperCase()}</button>)}
      <button onClick={onOpenDashboard} className="rounded border border-[#26394f] px-2 py-1">Simulated dashboard</button>
    </div>
  </footer>
);
