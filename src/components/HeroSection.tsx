import React from 'react';
import type { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { publicationGate } from '../data/publicationGate';

interface HeroSectionProps {
  currentLanguage: Language;
  onExploreVehicles: () => void;
  onStartInquiry: () => void;
  onOpenDashboard: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ currentLanguage, onExploreVehicles, onStartInquiry, onOpenDashboard }) => {
  const t = TRANSLATIONS[currentLanguage];
  return (
    <section id="hero" className="border-b border-[#1c293b] bg-gradient-to-br from-[#142131] to-[#0c131c] px-4 py-20 text-center">
      <div className="mx-auto max-w-4xl">
        <span className="rounded-full border border-[#b58a35]/40 bg-[#b58a35]/10 px-3 py-1 text-xs font-bold text-[#e0b555]">{t.hero.tag}</span>
        <h1 className="mt-6 text-4xl font-black text-white sm:text-6xl">{t.hero.headline}</h1>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[#a9bbcd]">{t.hero.subheadline}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={onExploreVehicles} className="rounded-lg bg-[#b58a35] px-5 py-3 text-sm font-bold text-[#0c131c]">{t.hero.ctaVehicles}</button>
          <button onClick={onStartInquiry} className="rounded-lg border border-[#334a65] px-5 py-3 text-sm font-semibold text-white">Non-binding demo intake</button>
          <button onClick={onOpenDashboard} className="rounded-lg border border-[#334a65] px-5 py-3 text-sm font-semibold text-white">Open simulated dashboard</button>
        </div>
        <p className="mt-6 text-xs text-[#8297ac]">{t.hero.disclaimer}</p>
        {publicationGate.publicationBlocked && <p className="mt-3 font-semibold text-amber-300">Publication blocked by {publicationGate.blockingClaimIds.join(', ')}.</p>}
      </div>
    </section>
  );
};
