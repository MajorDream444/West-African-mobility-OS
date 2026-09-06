import React from 'react';
import { VehicleModel, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { X, ArrowRight, ShieldCheck, Thermometer, Wrench, DollarSign } from 'lucide-react';

interface VehicleComparisonModalProps {
  vehicles?: VehicleModel[];
  vehicleA?: VehicleModel;
  vehicleB?: VehicleModel;
  allVehicles?: VehicleModel[];
  currentLanguage: Language;
  onClose: () => void;
  onRemoveVehicle?: (id: string) => void;
  onSelectVehicle?: (vehicle: VehicleModel) => void;
  onSelectVehicleA?: (v: VehicleModel) => void;
  onSelectVehicleB?: (v: VehicleModel) => void;
}

export const VehicleComparisonModal: React.FC<VehicleComparisonModalProps> = ({
  vehicles: propVehicles,
  vehicleA,
  vehicleB,
  allVehicles = [],
  currentLanguage,
  onClose,
  onRemoveVehicle,
  onSelectVehicle,
  onSelectVehicleA,
  onSelectVehicleB,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const vehicles = propVehicles || [vehicleA, vehicleB].filter(Boolean) as VehicleModel[];

  if (vehicles.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0e1622] border border-[#203147] rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#1b2a3d] flex items-center justify-between bg-[#121c2a]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#b58a35]/20 text-[#e0b555] border border-[#b58a35]/40 uppercase tracking-wider">
                Multi-Model Evaluation
              </span>
              <span className="text-xs text-[#7e91a6]">
                {vehicles.length} / 3 {t.catalog.comparing}
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#f0f4f8] mt-1">
              {t.comparison.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#7e91a6] hover:text-white hover:bg-[#1b2b3e] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Top Vehicle Summary Cards */}
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col justify-end p-3 text-xs text-[#7e91a6] font-medium">
              <span>Comparing candidate models against Mauritania terrain, customs, and cooling specifications.</span>
            </div>
            {vehicles.map(v => (
              <div key={v.id} className="relative bg-[#14202e] border border-[#22354c] rounded-xl p-3 flex flex-col">
                {onRemoveVehicle && (
                  <button
                    onClick={() => onRemoveVehicle(v.id)}
                    className="absolute top-2 right-2 p-1 rounded-md bg-[#1d2d40] text-[#7e91a6] hover:text-red-400 hover:bg-[#253952] transition-colors"
                    title="Remove from comparison"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <img
                  src={v.image}
                  alt={v.model}
                  className="w-full h-24 object-cover rounded-lg mb-2"
                />
                <div className="text-xs font-bold text-[#e0b555]">{v.brand}</div>
                <div className="text-sm font-semibold text-[#f0f4f8] leading-tight truncate">{v.model}</div>
                <div className="text-[11px] text-[#7e91a6] mt-0.5">{v.genericName}</div>
                {onSelectVehicle && (
                  <button
                    onClick={() => { onClose(); onSelectVehicle(v); }}
                    className="mt-3 w-full py-1.5 px-2 rounded bg-[#b58a35]/20 text-[#e0b555] hover:bg-[#b58a35]/30 text-xs font-medium border border-[#b58a35]/30 transition-colors"
                  >
                    Full Details & Cost
                  </button>
                )}
              </div>
            ))}
            {/* Fill empty slots */}
            {Array.from({ length: Math.max(0, 3 - vehicles.length) }).map((_, idx) => (
              <div key={idx} className="border border-dashed border-[#1f3045] rounded-xl p-4 flex flex-col items-center justify-center text-center text-xs text-[#586e85] h-full min-h-[160px]">
                <span>+ Select another vehicle to compare</span>
              </div>
            ))}
          </div>

          {/* Comparison Rows */}
          <div className="divide-y divide-[#172332] text-xs">
            {/* Category */}
            <div className="grid grid-cols-4 gap-4 py-3 items-center">
              <div className="font-semibold text-[#8ca1b8]">{t.comparison.category}</div>
              {vehicles.map(v => (
                <div key={v.id} className="text-[#d5e2f0] capitalize">{v.category.replace('_', ' ')}</div>
              ))}
            </div>

            {/* Powertrain */}
            <div className="grid grid-cols-4 gap-4 py-3 items-center">
              <div className="font-semibold text-[#8ca1b8]">{t.comparison.powertrain}</div>
              {vehicles.map(v => (
                <div key={v.id} className="text-[#d5e2f0] font-medium">{v.powertrain}</div>
              ))}
            </div>

            {/* Drivetrain */}
            <div className="grid grid-cols-4 gap-4 py-3 items-center">
              <div className="font-semibold text-[#8ca1b8]">{t.comparison.drivetrain}</div>
              {vehicles.map(v => (
                <div key={v.id} className="text-[#d5e2f0]">{v.drivetrain}</div>
              ))}
            </div>

            {/* Engine & Power */}
            <div className="grid grid-cols-4 gap-4 py-3 items-center">
              <div className="font-semibold text-[#8ca1b8]">{t.comparison.engine}</div>
              {vehicles.map(v => (
                <div key={v.id} className="text-[#d5e2f0]">
                  <div>{v.engine}</div>
                  <div className="text-[11px] text-[#7e91a6]">{v.powerHp} hp • {v.torqueNm} Nm</div>
                </div>
              ))}
            </div>

            {/* Ground Clearance */}
            <div className="grid grid-cols-4 gap-4 py-3 items-center">
              <div className="font-semibold text-[#8ca1b8]">{t.comparison.clearance}</div>
              {vehicles.map(v => (
                <div key={v.id} className="text-[#d5e2f0] font-mono font-medium">
                  {v.groundClearanceMm} mm
                </div>
              ))}
            </div>

            {/* Seating */}
            <div className="grid grid-cols-4 gap-4 py-3 items-center">
              <div className="font-semibold text-[#8ca1b8]">{t.comparison.seating}</div>
              {vehicles.map(v => (
                <div key={v.id} className="text-[#d5e2f0]">{v.seatingCapacity} seats</div>
              ))}
            </div>

            {/* Indicative FOB */}
            <div className="grid grid-cols-4 gap-4 py-3 items-center">
              <div className="font-semibold text-[#8ca1b8]">{t.comparison.fobRange}</div>
              {vehicles.map(v => (
                <div key={v.id} className="font-mono font-bold text-[#e0b555]">
                  ${v.indicativeFobUsd.min.toLocaleString()} - ${v.indicativeFobUsd.max.toLocaleString()}
                </div>
              ))}
            </div>

            {/* Turnkey Landed Estimate */}
            <div className="grid grid-cols-4 gap-4 py-3 items-center">
              <div className="font-semibold text-[#8ca1b8]">{t.comparison.landedEstimate}</div>
              {vehicles.map(v => {
                const midFob = (v.indicativeFobUsd.min + v.indicativeFobUsd.max) / 2;
                const landed = (midFob + v.estimatedFreightUsd) * (1 + v.dutyRatePct) * (1 + v.vatRatePct) + v.localPortAndDocUsd;
                return (
                  <div key={v.id} className="font-mono font-bold text-[#38bdf8]">
                    ${Math.round(landed).toLocaleString()}
                    <span className="block text-[10px] text-[#7e91a6] font-normal">
                      ≈ {(Math.round(landed * 39.8)).toLocaleString()} MRU
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Desert Score */}
            <div className="grid grid-cols-4 gap-4 py-3 items-center">
              <div className="font-semibold text-[#8ca1b8]">{t.comparison.desertScore}</div>
              {vehicles.map(v => (
                <div key={v.id} className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-[#e0b555]">{v.sandAndHeatSuitability.score}/10</span>
                  <div className="w-16 h-1.5 bg-[#1b2b3d] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#b58a35] to-[#e0b555]"
                      style={{ width: `${v.sandAndHeatSuitability.score * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Service Readiness Score */}
            <div className="grid grid-cols-4 gap-4 py-3 items-center">
              <div className="font-semibold text-[#8ca1b8]">{t.comparison.readiness}</div>
              {vehicles.map(v => (
                <div key={v.id} className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-[#55d6a2]">{v.serviceReadinessScore}%</span>
                  <div className="w-16 h-1.5 bg-[#1b2b3d] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#55d6a2]"
                      style={{ width: `${v.serviceReadinessScore}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Warranty Coverage */}
            <div className="grid grid-cols-4 gap-4 py-3 items-center">
              <div className="font-semibold text-[#8ca1b8]">{t.comparison.warranty}</div>
              {vehicles.map(v => (
                <div key={v.id} className="text-[#9fb1c5]">{v.warrantyYears} yrs / {v.warrantyKm.toLocaleString()} km</div>
              ))}
            </div>

            {/* Infotainment Languages */}
            <div className="grid grid-cols-4 gap-4 py-3 items-center">
              <div className="font-semibold text-[#8ca1b8]">{t.comparison.languages}</div>
              {vehicles.map(v => (
                <div key={v.id} className="text-[#d5e2f0]">
                  {v.multilingualInfotainment.join(', ')}
                </div>
              ))}
            </div>

            {/* Evidence Classification */}
            <div className="grid grid-cols-4 gap-4 py-3 items-center">
              <div className="font-semibold text-[#8ca1b8]">{t.comparison.evidenceStatus}</div>
              {vehicles.map(v => (
                <div key={v.id}>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#3b82f6]/15 text-[#60a5fa] border border-[#3b82f6]/30">
                    {v.evidenceClassification}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#1b2a3d] bg-[#121c2a] flex items-center justify-between">
          <span className="text-xs text-[#7e91a6]">
            All comparisons based on manufacturer data & indicative customs tariff. No OEM exclusive relationship claimed.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#192738] text-xs font-semibold text-[#f0f4f8] hover:bg-[#22354c] transition-colors"
          >
            Close Evaluation
          </button>
        </div>
      </div>
    </div>
  );
};
