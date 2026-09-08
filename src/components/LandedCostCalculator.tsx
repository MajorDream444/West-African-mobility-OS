import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CANDIDATE_VEHICLES } from '../data/canonicalData';
import { publicationGate } from '../data/publicationGate';
import { Calculator, DollarSign, ArrowRight, Info, AlertTriangle, ShieldCheck, RefreshCw } from 'lucide-react';

interface LandedCostCalculatorProps {
  currentLanguage: Language;
}

export const LandedCostCalculator: React.FC<LandedCostCalculatorProps> = ({ currentLanguage }) => {
  const t = TRANSLATIONS[currentLanguage];

  if (!publicationGate.publicPricesAllowed) {
    return (
      <section className="rounded-2xl border border-amber-500/40 bg-[#101925] p-8">
        <h2 className="text-xl font-bold text-amber-300">Landed-cost publication blocked</h2>
        <p className="mt-3 text-sm text-[#9fb1c5]">{publicationGate.reason}</p>
        <p className="mt-2 text-xs text-[#7e91a6]">Resolve {publicationGate.blockingClaimIds.join(', ')} through the canonical evidence process before displaying or calculating public prices.</p>
      </section>
    );
  }

  // Selected base vehicle or custom
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(CANDIDATE_VEHICLES[0].id);

  // Inputs
  const [fobPrice, setFobPrice] = useState<number>(24500);
  const [shippingFreight, setShippingFreight] = useState<number>(2200);
  const [insuranceRate, setInsuranceRate] = useState<number>(1.5); // %
  const [customsDutyRate, setCustomsDutyRate] = useState<number>(10); // % (EV 0%, Hybrid 10%, ICE 20%)
  const [vatRate, setVatRate] = useState<number>(16); // %
  const [portHandlingPanpa, setPortHandlingPanpa] = useState<number>(450); // USD
  const [inlandTransport, setInlandTransport] = useState<number>(250); // USD
  const [preDeliveryInspection, setPreDeliveryInspection] = useState<number>(300); // USD
  const [contingencyBuffer, setContingencyBuffer] = useState<number>(500); // USD
  const [targetMargin, setTargetMargin] = useState<number>(18); // %

  // Sync with selected vehicle
  const handleVehicleSelect = (id: string) => {
    setSelectedVehicleId(id);
    const v = CANDIDATE_VEHICLES.find(veh => veh.id === id);
    if (v) {
      setFobPrice(Math.round((v.indicativeFobUsd.min + v.indicativeFobUsd.max) / 2));
      setCustomsDutyRate(Math.round(v.dutyRatePct * 100));
      if (v.fuelType === 'Battery Electric (BEV)') {
        setCustomsDutyRate(0);
      } else if (v.fuelType.includes('Hybrid') || v.powertrain.includes('EREV')) {
        setCustomsDutyRate(10);
      } else {
        setCustomsDutyRate(20);
      }
    }
  };

  // Calculations
  const insuranceAmount = (fobPrice * insuranceRate) / 100;
  const cifNouakchott = fobPrice + shippingFreight + insuranceAmount;
  const customsDutyAmount = (cifNouakchott * customsDutyRate) / 100;
  const taxableBase = cifNouakchott + customsDutyAmount;
  const vatAmount = (taxableBase * vatRate) / 100;
  const localPortAndClearance = portHandlingPanpa + inlandTransport + preDeliveryInspection + contingencyBuffer;
  const totalLandedCostUsd = cifNouakchott + customsDutyAmount + vatAmount + localPortAndClearance;
  const suggestedRetailUsd = totalLandedCostUsd * (1 + targetMargin / 100);

  return (
    <div className="bg-[#0e1622] border border-[#1e2e42] rounded-2xl p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1b2a3d] mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#b58a35]/20 text-[#e0b555] border border-[#b58a35]/40 uppercase tracking-wider">
              {t.calculator.badge}
            </span>
            <span className="text-xs text-[#7e91a6]">PANPA Nouakchott Port of Entry</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#f0f4f8]">
            {t.calculator.title}
          </h2>
          <p className="text-xs text-[#8ca1b8] mt-1">
            {t.calculator.subtitle}
          </p>
        </div>

        {/* Quick Vehicle Select */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#7e91a6] font-medium">Model Preset:</span>
          <select
            value={selectedVehicleId}
            onChange={(e) => handleVehicleSelect(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-[#14202e] border border-[#23354c] text-xs text-[#f0f4f8] focus:outline-none focus:border-[#b58a35]"
          >
            {CANDIDATE_VEHICLES.map((v) => (
              <option key={v.id} value={v.id}>
                {v.model} ({v.powertrain}) - FOB ${v.indicativeFobUsd.min.toLocaleString()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Inputs (Left) vs Output Waterfall (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Sliders & Controls */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="text-xs font-bold text-[#e0b555] uppercase tracking-wider mb-2">
            Cost Parameters & Port Fees
          </h3>

          {/* FOB Price */}
          <div className="bg-[#121c2a] border border-[#1c2c3e] rounded-xl p-3.5">
            <div className="flex justify-between items-center text-xs mb-1">
              <label className="font-semibold text-[#cad6e3]">{t.calculator.fobPrice}</label>
              <span className="font-mono font-bold text-[#e0b555]">${fobPrice.toLocaleString()} USD</span>
            </div>
            <input
              type="range"
              min="10000"
              max="65000"
              step="500"
              value={fobPrice}
              onChange={(e) => setFobPrice(Number(e.target.value))}
              className="w-full accent-[#b58a35] h-1.5 bg-[#1a2838] rounded-lg cursor-pointer"
            />
          </div>

          {/* Freight & Insurance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[#121c2a] border border-[#1c2c3e] rounded-xl p-3">
              <div className="flex justify-between items-center text-xs mb-1">
                <label className="font-semibold text-[#cad6e3]">{t.calculator.freight}</label>
                <span className="font-mono text-[#8fa4bb]">${shippingFreight}</span>
              </div>
              <input
                type="range"
                min="1400"
                max="3500"
                step="50"
                value={shippingFreight}
                onChange={(e) => setShippingFreight(Number(e.target.value))}
                className="w-full accent-[#b58a35] h-1.5 bg-[#1a2838] rounded-lg cursor-pointer"
              />
            </div>

            <div className="bg-[#121c2a] border border-[#1c2c3e] rounded-xl p-3">
              <div className="flex justify-between items-center text-xs mb-1">
                <label className="font-semibold text-[#cad6e3]">{t.calculator.insurance}</label>
                <span className="font-mono text-[#8fa4bb]">{insuranceRate}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3.0"
                step="0.1"
                value={insuranceRate}
                onChange={(e) => setInsuranceRate(Number(e.target.value))}
                className="w-full accent-[#b58a35] h-1.5 bg-[#1a2838] rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Customs Duty & VAT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[#121c2a] border border-[#1c2c3e] rounded-xl p-3">
              <div className="flex justify-between items-center text-xs mb-1">
                <label className="font-semibold text-[#cad6e3]">{t.calculator.customsDuty}</label>
                <span className="font-mono text-[#e0b555]">{customsDutyRate}%</span>
              </div>
              <div className="flex gap-1 mt-1">
                {[0, 10, 20].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setCustomsDutyRate(rate)}
                    className={`flex-1 py-1 rounded text-[10px] font-semibold border ${
                      customsDutyRate === rate
                        ? 'bg-[#b58a35] text-[#0c131c] border-[#b58a35]'
                        : 'bg-[#182637] text-[#8ca1b8] border-[#22354a]'
                    }`}
                  >
                    {rate === 0 ? '0% (EV)' : rate === 10 ? '10% (Hybrid)' : '20% (ICE)'}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#121c2a] border border-[#1c2c3e] rounded-xl p-3">
              <div className="flex justify-between items-center text-xs mb-1">
                <label className="font-semibold text-[#cad6e3]">{t.calculator.vat}</label>
                <span className="font-mono text-[#8fa4bb]">{vatRate}% (Standard)</span>
              </div>
              <div className="text-[11px] text-[#7e91a6] mt-1.5">
                Applied on CIF + Customs Duty
              </div>
            </div>
          </div>

          {/* Port Handling, Inland Transport & PDI */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-[#121c2a] border border-[#1c2c3e] rounded-xl p-2.5">
              <label className="text-[10px] text-[#7e91a6] block">{t.calculator.portHandling}</label>
              <div className="text-xs font-bold text-[#cad6e3] mt-0.5">${portHandlingPanpa}</div>
            </div>
            <div className="bg-[#121c2a] border border-[#1c2c3e] rounded-xl p-2.5">
              <label className="text-[10px] text-[#7e91a6] block">{t.calculator.inlandTransport}</label>
              <div className="text-xs font-bold text-[#cad6e3] mt-0.5">${inlandTransport}</div>
            </div>
            <div className="bg-[#121c2a] border border-[#1c2c3e] rounded-xl p-2.5">
              <label className="text-[10px] text-[#7e91a6] block">{t.calculator.inspectionPdi}</label>
              <div className="text-xs font-bold text-[#cad6e3] mt-0.5">${preDeliveryInspection}</div>
            </div>
          </div>

          {/* Retail Margin & Benchmark Slider */}
          <div className="bg-[#121c2a] border border-[#1c2c3e] rounded-xl p-3.5">
            <div className="flex justify-between items-center text-xs mb-1">
              <label className="font-semibold text-[#cad6e3]">Distributor Margin Markup</label>
              <span className="font-mono font-bold text-[#34d399]">{targetMargin}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="30"
              step="1"
              value={targetMargin}
              onChange={(e) => setTargetMargin(Number(e.target.value))}
              className="w-full accent-[#34d399] h-1.5 bg-[#1a2838] rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Right Column: Waterfall & Final Landed Breakdown */}
        <div className="lg:col-span-6 bg-[#111a26] border border-[#213348] rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-[#f0f4f8] uppercase tracking-wider mb-4 pb-2 border-b border-[#1b2b3d] flex items-center justify-between">
              <span>Landed Cost Waterfall</span>
            </h3>

            {/* Waterfall Line Items */}
            <div className="space-y-2 text-xs mb-6">
              <div className="flex justify-between py-1 text-[#8fa4bb]">
                <span>1. Factory FOB (China Port)</span>
                <span className="font-mono font-semibold text-[#cad6e3]">${fobPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 text-[#8fa4bb]">
                <span>2. Ocean Freight + Marine Insurance</span>
                <span className="font-mono font-semibold text-[#cad6e3]">${(shippingFreight + insuranceAmount).toFixed(0)}</span>
              </div>
              <div className="flex justify-between py-1 font-semibold text-[#e0b555] bg-[#162332] px-2 rounded">
                <span>CIF Port Autonome de Nouakchott</span>
                <span className="font-mono">${cifNouakchott.toFixed(0)}</span>
              </div>
              <div className="flex justify-between py-1 text-[#8fa4bb]">
                <span>3. Customs Duty ({customsDutyRate}%)</span>
                <span className="font-mono font-semibold text-[#cad6e3]">${customsDutyAmount.toFixed(0)}</span>
              </div>
              <div className="flex justify-between py-1 text-[#8fa4bb]">
                <span>4. Value-Added Tax (VAT 16%)</span>
                <span className="font-mono font-semibold text-[#cad6e3]">${vatAmount.toFixed(0)}</span>
              </div>
              <div className="flex justify-between py-1 text-[#8fa4bb]">
                <span>5. Port Handling, Transit & PDI</span>
                <span className="font-mono font-semibold text-[#cad6e3]">${localPortAndClearance}</span>
              </div>
            </div>

            {/* Total Landed Cost Summary Box */}
            <div className="bg-[#0b121a] border border-[#1b2b3e] rounded-xl p-4 mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-xs font-bold text-[#8fa4bb] uppercase tracking-wider">
                  {t.calculator.totalLandedCost}
                </span>
                <div className="text-right">
                  <span className="text-xl font-extrabold text-[#f0f4f8]">
                    ${Math.round(totalLandedCostUsd).toLocaleString()} USD
                  </span>
                </div>
              </div>
            </div>

            {/* Target Retail Price & Benchmark Comparison */}
            <div className="bg-gradient-to-br from-[#152335] to-[#101b2a] border border-[#2b415c] rounded-xl p-4 mb-4">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xs font-bold text-[#34d399] uppercase tracking-wider">
                  {t.calculator.suggestedRetail} ({targetMargin}% Margin)
                </span>
                <div className="text-right">
                  <span className="text-xl font-black text-white">
                    ${Math.round(suggestedRetailUsd).toLocaleString()} USD
                  </span>
                </div>
              </div>

              {/* Benchmark comparison is not published without verified evidence. */}
              <div className="pt-2 border-t border-[#20344d] flex items-center justify-between text-xs">
                <span className="text-[#8fa4bb]">Comparative savings claim:</span>
                <span className="font-bold text-amber-300">Awaiting verified market evidence</span>
              </div>
            </div>
          </div>

          {/* Disclaimer Footer */}
          <div className="pt-3 border-t border-[#1b293a] flex items-start gap-2 text-[11px] text-[#71859a]">
            <Info className="w-4 h-4 shrink-0 text-[#b58a35] mt-0.5" />
            <p className="leading-tight">
              {t.calculator.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
