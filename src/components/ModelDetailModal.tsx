import React, { useState } from 'react';
import { CarModel } from '../types';
import { X, Zap, Gauge, Navigation, Shield, Award, CheckCircle, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface ModelDetailModalProps {
  model: CarModel | null;
  onClose: () => void;
  onOpenConfigurator: (modelId: string) => void;
  onOpenTestDrive: (modelId: string) => void;
}

export const ModelDetailModal: React.FC<ModelDetailModalProps> = ({
  model,
  onClose,
  onOpenConfigurator,
  onOpenTestDrive,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'blueprint' | 'specs'>('overview');

  if (!model) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto animate-fadeIn">
      
      <div className="relative w-full max-w-4xl rounded-3xl bg-slate-950 border border-cyan-500/30 shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden my-auto">
        
        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Hero Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={model.heroImage}
            alt={model.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-400">
                {model.series}  •  {model.category}
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
                {model.name}
              </h2>
              <p className="text-sm text-slate-300 max-w-lg mt-1">{model.tagline}</p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Starting MSRP</span>
              <div className="text-2xl sm:text-3xl font-display font-black text-white">
                <span className="text-cyan-400">\$</span>{model.basePrice.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-800 px-6 bg-slate-900/50">
          {[
            { id: 'overview' as const, label: 'Overview & Highlights' },
            { id: 'blueprint' as const, label: 'Interactive Architecture Blueprint' },
            { id: 'specs' as const, label: 'Full Technical Specs' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundEngine.playClick();
                setActiveTab(tab.id);
              }}
              className={`py-3.5 px-4 text-xs font-mono uppercase tracking-wider border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-cyan-400 text-cyan-300 font-bold bg-cyan-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 max-h-[50vh] overflow-y-auto space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <p className="text-sm text-slate-300 leading-relaxed">
                {model.description}
              </p>

              {/* Key Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
                    <Gauge className="w-4 h-4 text-cyan-400" /> 0-60 MPH
                  </div>
                  <div className="text-2xl font-display font-black text-white mt-1">
                    {model.specs.acceleration}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-cyan-400" /> Peak Power
                  </div>
                  <div className="text-2xl font-display font-black text-white mt-1">
                    {model.specs.power}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
                    <Navigation className="w-4 h-4 text-cyan-400" /> Max Range
                  </div>
                  <div className="text-2xl font-display font-black text-white mt-1">
                    {model.specs.range}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-cyan-400" /> Charge Time
                  </div>
                  <div className="text-2xl font-display font-black text-white mt-1">
                    {model.specs.chargingSpeed}
                  </div>
                </div>
              </div>

              {/* Engineering Highlights */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4" /> Signature Engineering Features
                </h4>
                <div className="space-y-2">
                  {model.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 text-xs text-slate-200">
                      <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BLUEPRINT */}
          {activeTab === 'blueprint' && (
            <div className="space-y-4">
              <div className="relative aspect-[16/9] rounded-2xl bg-slate-900 border border-cyan-500/30 overflow-hidden flex items-center justify-center p-4">
                <img
                  src={model.image}
                  alt="Chassis Blueprint"
                  className="w-full h-full object-cover filter contrast-125 opacity-40"
                />

                {/* Interactive Blueprint Annotations */}
                {model.blueprintPoints.map((pt, idx) => (
                  <div
                    key={idx}
                    className="absolute group cursor-pointer"
                    style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                  >
                    <div className="relative">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400 text-slate-950 font-bold text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="absolute -inset-1 rounded-full bg-cyan-400 opacity-40 animate-ping"></span>
                    </div>

                    {/* Tooltip on hover */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 rounded-xl bg-slate-950 border border-cyan-400 text-left opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 shadow-2xl">
                      <div className="text-xs font-bold text-cyan-300">{pt.title}</div>
                      <div className="text-[10px] text-slate-300 mt-0.5 leading-tight">{pt.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {model.blueprintPoints.map((pt, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-xs flex gap-2.5">
                    <span className="w-5 h-5 rounded-md bg-cyan-500/20 text-cyan-300 font-mono font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="font-bold text-white">{pt.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{pt.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FULL TECHNICAL SPEC SHEET */}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="text-cyan-400 font-bold uppercase tracking-wider text-[11px] border-b border-slate-800 pb-1.5">
                  Powertrain & Dynamics
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/40">
                  <span className="text-slate-400">Drivetrain Architecture:</span>
                  <span className="text-white font-semibold">{model.specs.driveType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/40">
                  <span className="text-slate-400">Horsepower Output:</span>
                  <span className="text-white font-semibold">{model.specs.power}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/40">
                  <span className="text-slate-400">Peak Torque:</span>
                  <span className="text-white font-semibold">{model.specs.torque}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/40">
                  <span className="text-slate-400">0-60 MPH Sprint:</span>
                  <span className="text-cyan-300 font-bold">{model.specs.acceleration}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Top Velocity:</span>
                  <span className="text-white font-semibold">{model.specs.topSpeed}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="text-cyan-400 font-bold uppercase tracking-wider text-[11px] border-b border-slate-800 pb-1.5">
                  Battery, Aerodynamics & Dimensions
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/40">
                  <span className="text-slate-400">Battery Chemistry:</span>
                  <span className="text-white font-semibold">{model.specs.batteryCapacity}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/40">
                  <span className="text-slate-400">DC Megawatt Fast Charge:</span>
                  <span className="text-cyan-300 font-bold">{model.specs.chargingSpeed}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/40">
                  <span className="text-slate-400">Drag Coefficient:</span>
                  <span className="text-white font-semibold">{model.specs.dragCoefficient}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/40">
                  <span className="text-slate-400">Curb Weight:</span>
                  <span className="text-white font-semibold">{model.specs.curbWeight}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Cargo & Seating:</span>
                  <span className="text-white font-semibold">{model.specs.cargoVolume} ({model.specs.seating} Seats)</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer CTAs */}
        <div className="p-6 bg-slate-900/80 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
              onOpenTestDrive(model.id);
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-cyan-300 font-mono text-xs uppercase tracking-wider transition-all"
          >
            Book VIP Test Drive
          </button>

          <button
            onClick={() => {
              soundEngine.playHyperRev();
              onClose();
              onOpenConfigurator(model.id);
            }}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-display font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Open in 3D Configurator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
