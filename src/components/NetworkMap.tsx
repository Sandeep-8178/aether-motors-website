import React, { useState } from 'react';
import { SHOWROOMS } from '../data/cars';
import { MapPin, Zap, Phone, Clock, Search, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface NetworkMapProps {
  onOpenTestDrive: (modelId?: string) => void;
}

export const NetworkMap: React.FC<NetworkMapProps> = ({ onOpenTestDrive }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(SHOWROOMS[0]);

  const filteredLocations = SHOWROOMS.filter(
    (loc) =>
      loc.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="network" className="relative py-24 bg-[#040711] text-slate-100 border-t border-slate-900 overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] bg-cyan-950/20 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Global Presence & Charging Infrastructure</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
            Showroom & Supercharger Network
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Access over 45,000+ Megawatt Ultra-Fast Superchargers worldwide and experience bespoke tailoring at our flagship ateliers.
          </p>
        </div>

        {/* Network Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Map Canvas / Visualizer (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* World Network Graphic Stage */}
            <div className="relative aspect-[16/10] rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden p-6 flex flex-col justify-between shadow-2xl">
              
              {/* World Map Grid SVG Background */}
              <div className="absolute inset-0 bg-grid-pattern [background-size:24px_24px] opacity-25"></div>
              
              {/* Global Ambient Continents Nodes */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                <svg viewBox="0 0 1000 500" className="w-full h-full fill-slate-800 stroke-slate-700 stroke-[1]">
                  {/* Subtle stylized world continent outlines */}
                  <circle cx="250" cy="200" r="140" className="fill-slate-900/60 stroke-cyan-500/20" />
                  <circle cx="550" cy="180" r="160" className="fill-slate-900/60 stroke-cyan-500/20" />
                  <circle cx="800" cy="240" r="130" className="fill-slate-900/60 stroke-cyan-500/20" />
                </svg>
              </div>

              {/* Top Map HUD */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-cyan-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>GLOBAL NETWORK STATUS: 99.98% OPERATIONAL</span>
                </div>
                <span className="text-xs font-mono text-slate-400 hidden sm:inline">350kW+ QUANTUM HUBS</span>
              </div>

              {/* Pinpoint Nodes on the visual stage */}
              <div className="relative z-10 grid grid-cols-3 sm:grid-cols-6 gap-2 my-auto">
                {SHOWROOMS.map((sh) => {
                  const isSelected = selectedLocation.id === sh.id;
                  return (
                    <button
                      key={sh.id}
                      onClick={() => {
                        soundEngine.playClick();
                        setSelectedLocation(sh);
                      }}
                      className={`p-2.5 rounded-xl border text-center transition-all group ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-500/20 text-white shadow-[0_0_15px_rgba(0,240,255,0.4)] scale-105'
                          : 'border-slate-800 bg-slate-900/70 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <MapPin className={`w-4 h-4 mx-auto mb-1 ${isSelected ? 'text-cyan-400 animate-bounce' : 'text-slate-500'}`} />
                      <div className="text-[11px] font-bold font-display uppercase tracking-wide truncate">
                        {sh.city.split(',')[0]}
                      </div>
                      <div className="text-[9px] font-mono text-emerald-400 mt-0.5">
                        {sh.stallsAvailable}/{sh.totalStalls} Free
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Map Info Footer */}
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-slate-400 border-t border-slate-800/80 pt-3 gap-2">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>Selected: <strong className="text-white">{selectedLocation.name}</strong></span>
                </span>
                <span className="text-emerald-400">
                  {selectedLocation.stallsAvailable} Megachargers Available Right Now
                </span>
              </div>

            </div>

            {/* Network Statistics Ribbon */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Megachargers Worldwide</span>
                <span className="text-2xl font-display font-black text-white mt-1 block">45,000+</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Peak Charge Power</span>
                <span className="text-2xl font-display font-black text-cyan-300 mt-1 block">450 kW</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Experience Centers</span>
                <span className="text-2xl font-display font-black text-white mt-1 block">180+ Cities</span>
              </div>
            </div>

          </div>

          {/* Right Column: Search & Location Details (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search city, country or lounge..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
              />
            </div>

            {/* Selected Location Card */}
            <div className="p-6 rounded-3xl bg-slate-900/40 border border-cyan-500/30 backdrop-blur-xl space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-mono uppercase">
                    {selectedLocation.type.replace('-', ' ')}
                  </span>
                  <span className="text-xs font-mono text-emerald-400">
                    ● {selectedLocation.stallsAvailable}/{selectedLocation.totalStalls} Stalls Open
                  </span>
                </div>
                <h3 className="text-xl font-display font-black text-white">
                  {selectedLocation.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{selectedLocation.address}</span>
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{selectedLocation.hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{selectedLocation.phone}</span>
                </div>
              </div>

              {/* Amenities */}
              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                  Lounge & Hub Amenities
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedLocation.amenities.map((am, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300">
                      ✓ {am}
                    </span>
                  ))}
                </div>
              </div>

              {/* Book Drive at This Location */}
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onOpenTestDrive();
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 text-slate-950 font-display font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all cursor-pointer"
              >
                Book VIP Test Drive at {selectedLocation.city.split(',')[0]}
              </button>
            </div>

            {/* Quick List of Other Locations */}
            <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
              {filteredLocations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedLocation(loc);
                  }}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between text-xs font-mono ${
                    selectedLocation.id === loc.id
                      ? 'border-cyan-400 bg-cyan-950/20 text-white'
                      : 'border-slate-800/80 bg-slate-950/40 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-medium truncate">{loc.city} — {loc.name}</div>
                  <span className="text-cyan-400 font-bold text-[10px] shrink-0 ml-2">VIEW</span>
                </button>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
