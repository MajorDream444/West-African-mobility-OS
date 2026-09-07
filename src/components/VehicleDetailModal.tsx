import React from 'react';
import type { Language, VehicleModel } from '../types';
import { publicationGate } from '../data/publicationGate';

interface VehicleDetailModalProps {
  vehicle: VehicleModel | null;
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
  onSelectForInquiry: (vehicleId: string) => void;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({ vehicle, isOpen, onClose, currentLanguage, onSelectForInquiry }) => {
  if (!isOpen || !vehicle) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label={vehicle.model} className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#293e56] bg-[#101925] p-6">
        <div className="flex items-start justify-between gap-4">
          <div><div className="text-xs font-bold text-[#e0b555]">{vehicle.candidateCode} • {vehicle.evidenceClassification}</div><h2 className="mt-1 text-2xl font-bold text-white">{vehicle.model}</h2></div>
          <button onClick={onClose} className="rounded border border-[#334a65] px-3 py-1 text-sm">Close</button>
        </div>
        <p className="mt-5 text-sm text-[#a9bbcd]">{vehicle.description[currentLanguage]}</p>
        <div className="mt-5 rounded-xl border border-amber-500/40 bg-amber-950/30 p-4">
          <div className="font-bold text-amber-300">Awaiting manufacturer documentation</div>
          <p className="mt-1 text-xs text-[#a9bbcd]">No specification, quotation, warranty, readiness score or landed cost is represented. {publicationGate.reason}</p>
        </div>
        <button onClick={() => { onSelectForInquiry(vehicle.id); onClose(); }} className="mt-6 rounded-lg bg-[#b58a35] px-4 py-2 text-sm font-bold text-[#0c131c]">Register non-binding demonstration interest</button>
      </div>
    </div>
  );
};
