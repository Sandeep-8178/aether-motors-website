import React, { useState, useMemo } from 'react';
import { CAR_MODELS } from '../data/cars';
import { DollarSign, Calculator, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface FinanceCalculatorProps {
  onOpenConfigurator: (modelId: string) => void;
}

export const FinanceCalculator: React.FC<FinanceCalculatorProps> = ({ onOpenConfigurator }) => {
  const [financeType, setFinanceType] = useState<'loan' | 'lease'>('loan');
  const [selectedModelId, setSelectedModelId] = useState<string>(CAR_MODELS[0].id);
  const [vehiclePrice, setVehiclePrice] = useState<number>(CAR_MODELS[0].basePrice);
  const [downPayment, setDownPayment] = useState<number>(25000);
  const [tradeInValue, setTradeInValue] = useState<number>(0);
  const [termMonths, setTermMonths] = useState<number>(60);
  const [apr, setApr] = useState<number>(4.49);

  // When model changes, update vehicle price
  const handleModelChange = (modelId: string) => {
    soundEngine.playClick();
    setSelectedModelId(modelId);
    const m = CAR_MODELS.find((item) => item.id === modelId);
    if (m) {
      setVehiclePrice(m.basePrice);
    }
  };

  // Calculations
  const principal = useMemo(() => {
    return Math.max(0, vehiclePrice - downPayment - tradeInValue);
  }, [vehiclePrice, downPayment, tradeInValue]);

  const monthlyPayment = useMemo(() => {
    if (financeType === 'loan') {
      if (principal === 0) return 0;
      const r = apr / 100 / 12;
      const n = termMonths;
      const payment = (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
      return Math.round(payment);
    } else {
      // Lease calculation (36 or 48 months typically)
      const residualValue = vehiclePrice * (termMonths === 24 ? 0.65 : termMonths === 36 ? 0.58 : 0.50);
      const depreciation = (vehiclePrice - downPayment - residualValue) / termMonths;
      const moneyFactor = apr / 2400;
      const financeFee = (vehiclePrice + residualValue) * moneyFactor;
      return Math.max(200, Math.round(depreciation + financeFee));
    }
  }, [financeType, principal, vehiclePrice, downPayment, termMonths, apr]);

  const totalInterest = useMemo(() => {
    if (financeType === 'loan') {
      return Math.max(0, monthlyPayment * termMonths - principal);
    } else {
      return Math.round(monthlyPayment * termMonths * 0.18);
    }
  }, [financeType, monthlyPayment, termMonths, principal]);

  const totalCost = useMemo(() => {
    return downPayment + tradeInValue + monthlyPayment * termMonths;
  }, [downPayment, tradeInValue, monthlyPayment, termMonths]);

  return (
    <section id="finance" className="relative py-24 bg-[#030610] text-slate-100 border-t border-slate-900 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Transparent Ownership</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
            Financing & Lease Studio
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Customize terms, down payments, and trade-in credits with competitive 800V EV incentive programs.
          </p>

          {/* Mode Switcher */}
          <div className="mt-6 inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => {
                soundEngine.playClick();
                setFinanceType('loan');
              }}
              className={`px-6 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                financeType === 'loan'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Purchase Loan
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setFinanceType('lease');
                if (termMonths > 48) setTermMonths(36);
              }}
              className={`px-6 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                financeType === 'lease'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Aether Flex Lease
            </button>
          </div>
        </div>

        {/* Calculator Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sliders & Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl">
            
            {/* Model Selector */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                Select Vehicle Model
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {CAR_MODELS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handleModelChange(m.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedModelId === m.id
                        ? 'border-cyan-400 bg-cyan-950/30 text-white font-bold'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-display uppercase">{m.name}</div>
                    <div className="text-[10px] font-mono text-cyan-400 mt-0.5">
                      \${m.basePrice.toLocaleString()}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Vehicle Price Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Configured Vehicle MSRP</span>
                <span className="text-sm font-mono font-bold text-white">
                  \${vehiclePrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={100000}
                max={250000}
                step={1000}
                value={vehiclePrice}
                onChange={(e) => setVehiclePrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Down Payment Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Cash Down Payment</span>
                <span className="text-sm font-mono font-bold text-cyan-300">
                  \${downPayment.toLocaleString()} ({Math.round((downPayment / vehiclePrice) * 100)}%)
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={80000}
                step={1000}
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Trade-In Credit */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Estimated Trade-In Value</span>
                <span className="text-sm font-mono font-bold text-slate-200">
                  \${tradeInValue.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={60000}
                step={1000}
                value={tradeInValue}
                onChange={(e) => setTradeInValue(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Term Months Selector */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                Term Duration
              </label>
              <div className="grid grid-cols-5 gap-2">
                {(financeType === 'loan' ? [24, 36, 48, 60, 72] : [24, 36, 48]).map((months) => (
                  <button
                    key={months}
                    onClick={() => {
                      soundEngine.playClick();
                      setTermMonths(months);
                    }}
                    className={`py-2 rounded-xl text-xs font-mono uppercase tracking-wider border transition-all ${
                      termMonths === months
                        ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 font-bold'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white'
                    }`}
                  >
                    {months} Mo
                  </button>
                ))}
              </div>
            </div>

            {/* APR Rate Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Interest Rate (APR)</span>
                <span className="text-sm font-mono font-bold text-white">{apr}% APR</span>
              </div>
              <input
                type="range"
                min={1.9}
                max={9.9}
                step={0.1}
                value={apr}
                onChange={(e) => setApr(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

          </div>

          {/* Right Summary Card (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-slate-950 border border-cyan-500/30 shadow-[0_0_40px_rgba(0,0,0,0.8)] space-y-6">
            
            <div>
              <span className="text-xs font-mono uppercase text-slate-400 tracking-widest block">
                Estimated Monthly Payment
              </span>
              <div className="text-4xl sm:text-5xl font-display font-black text-white mt-1 flex items-baseline gap-1">
                <span className="text-cyan-400">\$</span>{monthlyPayment.toLocaleString()}
                <span className="text-sm font-mono text-slate-400 font-normal">/mo</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400 mt-1 block">
                Based on {termMonths} month term at {apr}% APR
              </span>
            </div>

            {/* Breakdown Visual Bar */}
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase text-slate-400 flex justify-between">
                <span>Payment Composition</span>
                <span className="text-cyan-300 font-bold">Total: \${totalCost.toLocaleString()}</span>
              </div>

              <div className="h-3 rounded-full bg-slate-800 overflow-hidden flex">
                <div
                  style={{ width: `${Math.min(100, Math.round((principal / totalCost) * 100))}%` }}
                  className="bg-cyan-400"
                  title="Principal"
                ></div>
                <div
                  style={{ width: `${Math.min(100, Math.round((downPayment / totalCost) * 100))}%` }}
                  className="bg-blue-600"
                  title="Down Payment"
                ></div>
                <div
                  style={{ width: `${Math.min(100, Math.round((totalInterest / totalCost) * 100))}%` }}
                  className="bg-purple-500"
                  title="Interest"
                ></div>
              </div>

              <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span> Principal (\${principal.toLocaleString()})
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span> Down (\${downPayment.toLocaleString()})
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span> Interest (\${totalInterest.toLocaleString()})
                </span>
              </div>
            </div>

            {/* Detailed Ledger List */}
            <div className="space-y-2.5 pt-4 border-t border-slate-800/80 text-xs font-mono">
              <div className="flex justify-between text-slate-300">
                <span>Financed Loan Principal:</span>
                <span className="text-white font-bold">\${principal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Total Lifetime Interest:</span>
                <span className="text-purple-300 font-bold">\${totalInterest.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Est. Federal/State EV Incentive:</span>
                <span className="text-emerald-400 font-bold">- \$7,500</span>
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={() => {
                soundEngine.playHyperRev();
                onOpenConfigurator(selectedModelId);
              }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-display font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.7)] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <DollarSign className="w-4 h-4" />
              <span>Apply Calculation to 3D Customizer</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
