import React, { useState } from 'react';
import { VehicleModel, Language } from '../types';
import { CANDIDATE_VEHICLES } from '../data/canonicalData';
import { TRANSLATIONS } from '../data/translations';
import { publicationGate } from '../data/publicationGate';
import { Search, Filter, Compass, Thermometer, ShieldAlert, ArrowUpRight, Gauge, Check } from 'lucide-react';

interface VehicleCatalogProps {
  currentLanguage: Language;
  onSelectVehicle: (vehicle: VehicleModel) => void;
  onExpressInterest: (vehicleId: string) => void;
}

export const VehicleCatalog: React.FC<VehicleCatalogProps> = ({
  currentLanguage,
  onSelectVehicle,
  onExpressInterest,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredVehicles = CANDIDATE_VEHICLES.filter((vehicle) => {
    const matchesCategory = selectedCategory === 'all' || vehicle.category === selectedCategory;
    const matchesSearch =
      vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.powertrain.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', label: t.catalog.allCategories },
    { id: 'suv_4x4', label: t.catalog.suv_4x4 },
    { id: 'rugged_mining', label: t.catalog.rugged_mining },
    { id: 'pickup_commercial', label: t.catalog.pickup_commercial },
    { id: 'family', label: t.catalog.family },
    { id: 'hybrid_ev', label: t.catalog.hybrid },
  ];

  return (
    <section id="catalog-section" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-[#b58a35]/20 text-[#e0b555] border border-[#b58a35]/40 tracking-wider uppercase">
              Candidate-model request • DEC-002
            </span>
            <span className="text-xs text-[#7e91a6]">10 Candidate Models Target</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f0f4f8] tracking-tight">
            {t.catalog.title}
          </h2>
          <p className="text-sm text-[#8fa4bb] mt-1.5">
            {t.catalog.subtitle}
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#6e8297] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t.catalog.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#121c27] border border-[#202f43] rounded-lg text-xs text-[#f0f4f8] placeholder-[#5f748a] focus:outline-none focus:border-[#b58a35] transition-colors"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#b58a35] text-[#0c131c] font-bold shadow-sm'
                : 'bg-[#121c27] text-[#869ab1] hover:text-[#d3e3f2] hover:bg-[#182535] border border-[#1b2736]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of Vehicles */}
      {filteredVehicles.length === 0 ? (
        <div className="text-center py-16 bg-[#101823] rounded-2xl border border-[#1d2a3a]">
          <p className="text-sm text-[#7e91a6]">Aucun véhicule ne correspond aux critères de recherche.</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="mt-3 text-xs text-[#b58a35] hover:underline"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => {
            return (
              <div
                key={vehicle.id}
                className="bg-[#101925] border border-[#1c293b] rounded-xl overflow-hidden hover:border-[#2d425f] transition-all flex flex-col group"
              >
                {/* Image & Badges */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-[#0a0f16]">
                  <img
                    src={vehicle.image}
                    alt={vehicle.model}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  {/* Status Overlay */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0c131c]/90 text-[#e0b555] border border-[#b58a35]/40 backdrop-blur-md">
                      {vehicle.brand}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-[#14202f]/90 text-[#a0b7cf] border border-[#223348] backdrop-blur-md">
                      {vehicle.categoryLabel[currentLanguage]}
                    </span>
                  </div>

                  <div className="absolute top-2.5 right-2.5 bg-[#0c131c]/90 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-semibold text-[#8eb0d4] border border-[#22344a] flex items-center gap-1">
                    <Thermometer className="w-3 h-3 text-[#b58a35]" />
                    <span>Désert: {vehicle.sandAndHeatSuitability.score}/10</span>
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-[#0c131c]/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-[#e0a841] border border-[#b58a35]/20 truncate">
                    {t.catalog.indicativeBadge}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-base sm:text-lg text-[#f0f4f8] group-hover:text-white transition-colors">
                        {vehicle.model}
                      </h3>
                      <span className="text-[11px] font-medium text-[#7d92a8] shrink-0 mt-0.5">
                        {vehicle.year}
                      </span>
                    </div>
                    <p className="text-xs text-[#7e94ac] line-clamp-2 leading-relaxed">
                      {vehicle.description[currentLanguage]}
                    </p>
                  </div>

                  {/* Key Metrics Strip */}
                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-[#182332] text-xs">
                    <div>
                      <span className="text-[10px] text-[#6b7e93] block">Puissance</span>
                      <span className="font-semibold text-white">{vehicle.powerHp} ch</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#6b7e93] block">Garde au sol</span>
                      <span className="font-semibold text-white">{vehicle.groundClearanceMm} mm</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#6b7e93] block">Carburant</span>
                      <span className="font-semibold text-white">{vehicle.fuelType}</span>
                    </div>
                  </div>

                  {/* Canonical publication gate */}
                  <div className="bg-[#131d2a] p-3 rounded-lg border border-[#1c2a3c] space-y-1.5">
                    <div className="text-xs font-semibold text-[#fbbf24]">Public pricing blocked</div>
                    <div className="text-[11px] text-[#8fa4bb]">{publicationGate.reason} Blocking claims: {publicationGate.blockingClaimIds.join(', ')}.</div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => onSelectVehicle(vehicle)}
                      className="w-full py-2 px-3 rounded-lg bg-[#182536] hover:bg-[#203147] text-[#ccdbe9] hover:text-white text-xs font-semibold border border-[#24364e] transition-colors flex items-center justify-center gap-1"
                    >
                      <span>{t.catalog.viewDetails}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onExpressInterest(vehicle.id)}
                      className="w-full py-2 px-3 rounded-lg bg-[#b58a35] hover:bg-[#c99b40] text-[#0c131c] text-xs font-bold transition-colors flex items-center justify-center gap-1 shadow-sm"
                    >
                      <span>{t.catalog.expressInterest}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
