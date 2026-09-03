import React, { useState, useMemo } from 'react';
import { CAR_MODELS, AMBIENT_LIGHTING } from '../data/cars';
import { ViewAngle, PaintColor, WheelOption, InteriorOption, AmbientLightingOption } from '../types';
import { CarVisualizerCanvas } from './CarVisualizerCanvas';
import { Sparkles, Check, Download, ShieldCheck, DollarSign, ChevronRight, Layers, Palette, CircleDot, Compass } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface ConfiguratorProps {
  initialModelId?: string;
  onOpenPreOrder: (config: {
    model: typeof CAR_MODELS[0];
    color: PaintColor;
    wheel: WheelOption;
    interior: InteriorOption;
    ambient: AmbientLightingOption;
    packages: string[];
    totalPrice: number;
    monthlyPrice: number;
  }) => void;
  onOpenTestDrive: (modelId: string) => void;
}

export const Configurator: React.FC<ConfiguratorProps> = ({
  initialModelId = 'spectre-gt',
  onOpenPreOrder,
  onOpenTestDrive,
}) => {
  const [selectedModelId, setSelectedModelId] = useState(initialModelId);
  const [activeTab, setActiveTab] = useState<'exterior' | 'wheels' | 'interior' | 'packages'>('exterior');
  const [viewAngle, setViewAngle] = useState<ViewAngle>('front34');

  const model = useMemo(() => {
    return CAR_MODELS.find((m) => m.id === selectedModelId) || CAR_MODELS[0];
  }, [selectedModelId]);

  const [selectedColor, setSelectedColor] = useState<PaintColor>(model.colors[0]);
  const [selectedWheel, setSelectedWheel] = useState<WheelOption>(model.wheels[0]);
  const [selectedInterior, setSelectedInterior] = useState<InteriorOption>(model.interiors[0]);
  const [selectedAmbient, setSelectedAmbient] = useState<AmbientLightingOption>(AMBIENT_LIGHTING[0]);
  const [selectedPackages, setSelectedPackages] = useState<string[]>(['track-aero']);
  const [savedNotice, setSavedNotice] = useState(false);

  // When changing model, sync defaults
  const handleModelChange = (id: string) => {
    soundEngine.playHyperRev();
    setSelectedModelId(id);
    const newModel = CAR_MODELS.find((m) => m.id === id) || CAR_MODELS[0];
    setSelectedColor(newModel.colors[0]);
    setSelectedWheel(newModel.wheels[0]);
    setSelectedInterior(newModel.interiors[0]);
  };

  // Toggle package
  const togglePackage = (pkgId: string) => {
    soundEngine.playClick();
    if (selectedPackages.includes(pkgId)) {
      setSelectedPackages(selectedPackages.filter((p) => p !== pkgId));
    } else {
      setSelectedPackages([...selectedPackages, pkgId]);
    }
  };

  // Calculate pricing
  const packageCost = useMemo(() => {
    return model.packages
      .filter((p) => selectedPackages.includes(p.id))
      .reduce((sum, p) => sum + p.price, 0);
  }, [model, selectedPackages]);

  const totalPrice = useMemo(() => {
    return model.basePrice + selectedColor.price + selectedWheel.price + selectedInterior.price + packageCost;
  }, [model, selectedColor, selectedWheel, selectedInterior, packageCost]);

  // Est monthly payment (60 months, 4.9% APR, 15% down)
  const monthlyPrice = useMemo(() => {
    const principal = totalPrice * 0.85;
    const monthlyRate = 0.049 / 12;
    const n = 60;
    const payment = (principal * (monthlyRate * Math.pow(1 + monthlyRate, n))) / (Math.pow(1 + monthlyRate, n) - 1);
    return Math.round(payment);
  }, [totalPrice]);

  const handleSaveBuild = () => {
    soundEngine.playClick();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <section id="configurator" className="relative py-24 bg-[#030610] text-slate-100 overflow-hidden border-t border-slate-900">
      
      {/* Subtle Background Glow */}
      <div className="absolute -top-40 right-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute -bottom-40 left-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive 3D Studio & Configurator</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tight">
              Design Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{model.name}</span>
            </h2>
          </div>

          {/* Model Tabs Selector */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
            {CAR_MODELS.map((m) => (
              <button
                key={m.id}
                onClick={() => handleModelChange(m.id)}
                className={`px-3.5 py-1.5 text-xs font-display font-bold uppercase tracking-wider rounded-lg transition-all ${
                  selectedModelId === m.id
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Visualizer & Camera Angles (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Visualizer Canvas */}
            <CarVisualizerCanvas
              model={model}
              color={selectedColor}
              wheel={selectedWheel}
              interior={selectedInterior}
              ambientHex={selectedAmbient.hex}
              viewAngle={viewAngle}
              activePackages={selectedPackages}
            />

            {/* Camera Angle Selector Toolbar */}
            <div className="flex items-center justify-between p-2 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2 hidden sm:inline">Camera View:</span>
              <div className="grid grid-cols-5 gap-1.5 w-full sm:w-auto">
                {[
                  { id: 'front34' as ViewAngle, label: '3/4 Front' },
                  { id: 'side' as ViewAngle, label: 'Profile' },
                  { id: 'rear' as ViewAngle, label: 'Rear' },
                  { id: 'interior' as ViewAngle, label: 'Cockpit' },
                  { id: 'aerodynamics' as ViewAngle, label: 'CFD Aero' },
                ].map((angle) => (
                  <button
                    key={angle.id}
                    onClick={() => {
                      soundEngine.playChange();
                      setViewAngle(angle.id);
                    }}
                    className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider rounded-xl transition-all ${
                      viewAngle === angle.id
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    {angle.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Model Quick Specs Ribbon */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 text-center p-3 rounded-2xl bg-slate-950/60 border border-slate-900 font-mono text-xs">
              <div className="p-2 border-r border-slate-800/80">
                <span className="text-[10px] text-slate-500 block">0-60 MPH</span>
                <span className="text-white font-bold text-sm">{model.specs.acceleration}</span>
              </div>
              <div className="p-2 border-r border-slate-800/80">
                <span className="text-[10px] text-slate-500 block">MAX RANGE</span>
                <span className="text-cyan-400 font-bold text-sm">{model.specs.range}</span>
              </div>
              <div className="p-2 border-r border-slate-800/80">
                <span className="text-[10px] text-slate-500 block">PEAK POWER</span>
                <span className="text-white font-bold text-sm">{model.specs.power}</span>
              </div>
              <div className="p-2 hidden sm:block">
                <span className="text-[10px] text-slate-500 block">TOP SPEED</span>
                <span className="text-white font-bold text-sm">{model.specs.topSpeed}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Customization Controls & Pricing (5 Cols) */}
          <div className="lg:col-span-5 space-y-5 p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl">
            
            {/* Customization Navigation Category Tabs */}
            <div className="grid grid-cols-4 gap-1 p-1 rounded-2xl bg-slate-950/80 border border-slate-800/90 text-xs font-mono uppercase">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setActiveTab('exterior');
                  if (viewAngle === 'interior') setViewAngle('front34');
                }}
                className={`py-2 px-1 rounded-xl transition-all flex flex-col items-center gap-1 ${
                  activeTab === 'exterior'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Palette className="w-4 h-4" />
                <span>Paint</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  setActiveTab('wheels');
                  if (viewAngle === 'interior') setViewAngle('side');
                }}
                className={`py-2 px-1 rounded-xl transition-all flex flex-col items-center gap-1 ${
                  activeTab === 'wheels'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <CircleDot className="w-4 h-4" />
                <span>Wheels</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  setActiveTab('interior');
                  setViewAngle('interior');
                }}
                className={`py-2 px-1 rounded-xl transition-all flex flex-col items-center gap-1 ${
                  activeTab === 'interior'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>Cabin</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  setActiveTab('packages');
                }}
                className={`py-2 px-1 rounded-xl transition-all flex flex-col items-center gap-1 ${
                  activeTab === 'packages'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Packages</span>
              </button>
            </div>

            {/* TAB CONTENT 1: EXTERIOR PAINT */}
            {activeTab === 'exterior' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-mono uppercase tracking-wider text-slate-300">Paint Finish</h3>
                  <span className="text-xs font-mono text-cyan-400">
                    {selectedColor.name} ({selectedColor.price === 0 ? 'Included' : `+\$${selectedColor.price.toLocaleString()}`})
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  {model.colors.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        soundEngine.playChange();
                        setSelectedColor(c);
                      }}
                      className={`relative p-3 rounded-2xl border text-left transition-all group ${
                        selectedColor.id === c.id
                          ? 'border-cyan-400 bg-cyan-950/20 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                          : 'border-slate-800 bg-slate-950/50 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="w-6 h-6 rounded-full border border-white/20 shadow-inner flex items-center justify-center"
                          style={{ backgroundColor: c.hex }}
                        >
                          {selectedColor.id === c.id && <Check className="w-3 h-3 text-white drop-shadow" />}
                        </span>
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                          {c.finish}
                        </span>
                      </div>
                      <div className="text-xs font-medium text-white line-clamp-1">{c.name}</div>
                      <div className="text-[10px] font-mono text-slate-400">
                        {c.price === 0 ? 'Included' : `+\$${c.price.toLocaleString()}`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: WHEELS */}
            {activeTab === 'wheels' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-mono uppercase tracking-wider text-slate-300">Wheel Rims</h3>
                  <span className="text-xs font-mono text-cyan-400">
                    {selectedWheel.size}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {model.wheels.map((w) => (
                    <button
                      key={w.id}
                      onClick={() => {
                        soundEngine.playChange();
                        setSelectedWheel(w);
                      }}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                        selectedWheel.id === w.id
                          ? 'border-cyan-400 bg-cyan-950/20 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                          : 'border-slate-800 bg-slate-950/50 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <span>{w.name}</span>
                          {selectedWheel.id === w.id && (
                            <span className="px-1.5 py-0.5 rounded bg-cyan-400/20 text-cyan-300 text-[9px] font-mono">SELECTED</span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{w.finish}</div>
                      </div>
                      <div className="text-xs font-mono text-cyan-400 font-bold">
                        {w.price === 0 ? 'Included' : `+\$${w.price.toLocaleString()}`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: INTERIOR CABIN & AMBIENT RGB */}
            {activeTab === 'interior' && (
              <div className="space-y-5 animate-fadeIn">
                
                {/* Upholstery & Trim */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-mono uppercase tracking-wider text-slate-300">Cabin Upholstery</h3>
                    <span className="text-xs font-mono text-cyan-400">
                      {selectedInterior.price === 0 ? 'Included' : `+\$${selectedInterior.price.toLocaleString()}`}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {model.interiors.map((int) => (
                      <button
                        key={int.id}
                        onClick={() => {
                          soundEngine.playChange();
                          setSelectedInterior(int);
                        }}
                        className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                          selectedInterior.id === int.id
                            ? 'border-cyan-400 bg-cyan-950/20'
                            : 'border-slate-800 bg-slate-950/50 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="w-6 h-6 rounded-full border border-white/20 shadow-inner"
                            style={{ backgroundColor: int.hex }}
                          ></span>
                          <div>
                            <div className="text-xs font-bold text-white">{int.name}</div>
                            <div className="text-[10px] text-slate-400">{int.material}</div>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-cyan-400">
                          {int.price === 0 ? 'Included' : `+\$${int.price.toLocaleString()}`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ambient LED Color Selector */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Interactive Ambient Lighting Strip: <span className="text-cyan-400">{selectedAmbient.name}</span>
                  </h4>
                  <div className="flex items-center gap-2">
                    {AMBIENT_LIGHTING.map((amb) => (
                      <button
                        key={amb.id}
                        onClick={() => {
                          soundEngine.playClick();
                          setSelectedAmbient(amb);
                        }}
                        title={amb.name}
                        className={`w-8 h-8 rounded-xl border transition-all flex items-center justify-center ${
                          selectedAmbient.id === amb.id
                            ? 'scale-110 border-white shadow-[0_0_15px]'
                            : 'border-slate-700 opacity-60 hover:opacity-100'
                        }`}
                        style={{
                          backgroundColor: amb.hex,
                          boxShadow: selectedAmbient.id === amb.id ? `0 0 15px ${amb.hex}` : 'none'
                        }}
                      >
                        {selectedAmbient.id === amb.id && <Check className="w-4 h-4 text-black drop-shadow" />}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB CONTENT 4: PACKAGES */}
            {activeTab === 'packages' && (
              <div className="space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-mono uppercase tracking-wider text-slate-300">Engineering & Tech Packages</h3>
                  <span className="text-xs font-mono text-cyan-400">
                    +\${packageCost.toLocaleString()}
                  </span>
                </div>

                {model.packages.map((pkg) => {
                  const isChecked = selectedPackages.includes(pkg.id);
                  return (
                    <button
                      key={pkg.id}
                      onClick={() => togglePackage(pkg.id)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 ${
                        isChecked
                          ? 'border-cyan-400 bg-cyan-950/20 shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                          : 'border-slate-800 bg-slate-950/50 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                            isChecked ? 'bg-cyan-400 border-cyan-400 text-black' : 'border-slate-700 bg-slate-900'
                          }`}>
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="text-xs font-bold text-white">{pkg.name}</span>
                          {pkg.badge && (
                            <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[9px] font-mono">
                              {pkg.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 pl-6 leading-relaxed">
                          {pkg.description}
                        </p>
                      </div>
                      <div className="text-xs font-mono text-cyan-400 font-bold whitespace-nowrap">
                        +\${pkg.price.toLocaleString()}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Live Pricing Breakdown Card */}
            <div className="pt-4 border-t border-slate-800/80 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Estimated Total MSRP</span>
                  <div className="text-3xl font-display font-black text-white flex items-center gap-1">
                    <span className="text-cyan-400">\$</span>{totalPrice.toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Est. Financing</span>
                  <div className="text-lg font-mono font-bold text-cyan-300">
                    \${monthlyPrice.toLocaleString()}<span className="text-xs text-slate-400 font-normal">/mo</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    soundEngine.playHyperRev();
                    onOpenPreOrder({
                      model,
                      color: selectedColor,
                      wheel: selectedWheel,
                      interior: selectedInterior,
                      ambient: selectedAmbient,
                      packages: selectedPackages,
                      totalPrice,
                      monthlyPrice,
                    });
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-display font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.7)] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <DollarSign className="w-4 h-4" />
                  <span>Reserve Build (\$2,500 Deposit)</span>
                </button>

                <button
                  onClick={handleSaveBuild}
                  className="w-full py-3.5 px-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-400/50 text-slate-300 hover:text-white font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>{savedNotice ? 'Build Sheet Exported!' : 'Save & Export Build'}</span>
                </button>
              </div>

              {/* VIP Test Drive Link */}
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onOpenTestDrive(model.id);
                }}
                className="w-full text-center text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors flex items-center justify-center gap-1 pt-1"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Prefer to drive first? Book a VIP track test in this model</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
