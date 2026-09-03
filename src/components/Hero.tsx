import React, { useState } from 'react';
import { Zap, Gauge, Navigation, Sparkles, ChevronDown, ArrowRight, ShieldCheck, Play, Flame } from 'lucide-react';
import { CAR_MODELS } from '../data/cars';
import { soundEngine } from '../utils/audio';

interface HeroProps {
  onOpenConfigurator: (modelId?: string) => void;
  onOpenTestDrive: (modelId?: string) => void;
  onExploreModels: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenConfigurator,
  onOpenTestDrive,
  onExploreModels
}) => {
  const flagship = CAR_MODELS[0]; // Spectre GT
  const [driveMode, setDriveMode] = useState<'track' | 'stealth' | 'hyper'>('hyper');
  const [launching, setLaunching] = useState(false);

  const handleLaunch = () => {
    soundEngine.playHyperRev();
    setLaunching(true);
    setTimeout(() => {
      setLaunching(false);
    }, 2400);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      
      {/* Background Ambience & Lighting Gradients */}
      <div className="absolute inset-0 bg-radial-gradient from-cyan-950/30 via-[#040711] to-[#020409] pointer-events-none"></div>
      
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern [background-size:32px_32px] opacity-20 pointer-events-none"></div>

      {/* Futuristic Aura Lighting based on Drive Mode */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[500px] rounded-full blur-[120px] transition-all duration-1000 pointer-events-none opacity-40 ${
          driveMode === 'hyper'
            ? 'bg-cyan-500'
            : driveMode === 'track'
            ? 'bg-rose-600'
            : 'bg-emerald-500'
        } ${launching ? 'scale-125 opacity-70' : 'scale-100'}`}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center z-10">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono uppercase tracking-widest shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>Next-Gen Solid State Architecture</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>2027 Production Fleet</span>
          </div>
        </div>

        {/* Hero Title */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase max-w-5xl leading-[1.05]">
          Pure Electric <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-200 to-blue-500 drop-shadow-[0_0_35px_rgba(0,240,255,0.4)]">
            Velocity & Power
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-xl text-slate-300 font-light max-w-2xl leading-relaxed">
          {flagship.tagline}. Tri-motor architecture delivering <span className="text-cyan-400 font-medium">1,450 horsepower</span> with uncompromised autonomous luxury.
        </p>

        {/* Drive Mode Selector Switch */}
        <div className="mt-6 flex items-center p-1 rounded-xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-3 hidden sm:inline">Drive Mode:</span>
          {(['hyper', 'track', 'stealth'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => {
                soundEngine.playClick();
                setDriveMode(mode);
              }}
              className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-lg transition-all ${
                driveMode === mode
                  ? mode === 'track'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                    : mode === 'stealth'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                    : 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Hero Car Showcase Graphic / Stage */}
        <div className="relative mt-8 sm:mt-12 w-full max-w-5xl mx-auto flex items-center justify-center">
          
          {/* Circular Ground Stage Grid */}
          <div className="absolute -bottom-6 w-3/4 h-24 bg-gradient-to-t from-cyan-500/20 to-transparent rounded-[100%] blur-xl pointer-events-none"></div>
          <div className="absolute -bottom-2 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"></div>

          {/* Car Image with Hover Lighting and Launch Effect */}
          <div className={`relative group transition-all duration-700 ${launching ? '-translate-y-4 scale-105 filter drop-shadow-[0_0_50px_rgba(0,240,255,0.8)]' : ''}`}>
            
            {/* Speed Streak Lines on Launch */}
            {launching && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 overflow-hidden">
                <div className="w-full h-1 bg-cyan-400/80 shadow-[0_0_20px_#00F0FF] animate-laser-sweep"></div>
                <div className="w-full h-0.5 bg-white shadow-[0_0_20px_#fff] -mt-8 animate-laser-sweep"></div>
              </div>
            )}

            <img
              src={flagship.heroImage}
              alt="Aether Spectre GT Electric Hypercar"
              className="w-full max-w-4xl max-h-[460px] object-cover rounded-2xl shadow-2xl border border-slate-800/80 group-hover:border-cyan-500/40 transition-all duration-500"
            />

            {/* Overlay Gradient for contrast */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#040711] via-transparent to-transparent opacity-60 pointer-events-none"></div>

            {/* Launch Control Interactive Trigger */}
            <button
              onClick={handleLaunch}
              disabled={launching}
              className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 px-4 py-2 rounded-xl bg-slate-950/80 backdrop-blur-md border border-cyan-400/40 hover:border-cyan-400 text-cyan-300 hover:text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all cursor-pointer z-20 group"
            >
              {launching ? (
                <>
                  <Flame className="w-4 h-4 text-rose-500 animate-bounce" />
                  <span>Launch Engaged (1.78s)</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span>Launch Control Test</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Key Performance Stats Grid */}
        <div className="mt-8 sm:mt-12 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md hover:border-cyan-500/30 transition-all group">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
              <span>0-60 MPH</span>
              <Gauge className="w-4 h-4 text-cyan-400 group-hover:rotate-45 transition-transform" />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-display font-black text-white group-hover:text-cyan-400 transition-colors">
              {flagship.specs.acceleration}
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Launch Mode</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md hover:border-cyan-500/30 transition-all group">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
              <span>Peak Power</span>
              <Zap className="w-4 h-4 text-cyan-400 group-hover:scale-125 transition-transform" />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-display font-black text-white group-hover:text-cyan-400 transition-colors">
              {flagship.specs.power}
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Tri-Motor AWD</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md hover:border-cyan-500/30 transition-all group">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
              <span>Max Range</span>
              <Navigation className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-display font-black text-white group-hover:text-cyan-400 transition-colors">
              {flagship.specs.range}
            </div>
            <span className="text-[10px] text-slate-400 font-mono">EPA Est. Solid-State</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md hover:border-cyan-500/30 transition-all group">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
              <span>Top Speed</span>
              <Sparkles className="w-4 h-4 text-cyan-400 group-hover:rotate-90 transition-transform" />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-display font-black text-white group-hover:text-cyan-400 transition-colors">
              {flagship.specs.topSpeed}
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Aero-Track Spec</span>
          </div>
        </div>

        {/* Primary CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={() => {
              soundEngine.playHyperRev();
              onOpenConfigurator(flagship.id);
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-display font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.7)] flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Custom 3D Configurator</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenTestDrive(flagship.id);
            }}
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400/60 text-slate-200 hover:text-cyan-300 font-display font-semibold text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Book VIP Experience</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              onExploreModels();
            }}
            className="w-full sm:w-auto px-6 py-4 rounded-xl text-slate-400 hover:text-white text-sm font-medium tracking-wider uppercase transition-colors"
          >
            View Full Fleet
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 flex flex-col items-center gap-1 text-slate-500 text-xs font-mono uppercase tracking-widest animate-bounce">
          <span>Scroll to explore</span>
          <ChevronDown className="w-4 h-4 text-cyan-400" />
        </div>

      </div>
    </section>
  );
};
