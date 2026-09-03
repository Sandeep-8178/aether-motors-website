import React, { useState } from 'react';
import { ShieldCheck, Leaf, ArrowRight, Check, Send } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    soundEngine.playStartup();
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 1000);
  };

  return (
    <footer className="relative bg-[#020409] text-slate-400 border-t border-slate-900 pt-16 pb-12 overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[300px] bg-cyan-950/20 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Top Feature Banners: Warranty & Net Zero */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-display font-bold text-base uppercase tracking-wider">
                8-Year / 150,000-Mile Aether Guarantee
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Complete coverage of quantum solid-state battery pack with minimum 85% capacity retention guarantee and 24/7 VIP roadside concierge.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 shrink-0">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-display font-bold text-base uppercase tracking-wider">
                100% Net-Zero Carbon Manufacturing
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Manufactured using 100% geothermal and solar microgrids with closed-loop aluminum and rare-earth element recycling.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-cyan-500/20 border border-cyan-400/40">
                <svg viewBox="0 0 100 100" className="w-5 h-5 fill-none stroke-current text-cyan-400 stroke-[6]">
                  <polygon points="50,12 88,82 50,64 12,82" />
                  <line x1="50" y1="12" x2="50" y2="64" />
                </svg>
              </div>
              <span className="font-display font-black text-xl tracking-[0.25em] text-white">
                AETHER MOTORS
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Pioneering the intersection of pure electric velocity, neural autonomous driving, and bespoke automotive craftsmanship.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <span className="text-xs font-mono uppercase text-slate-300 block mb-2">
                Aether Insider Dispatch
              </span>

              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    placeholder="Enter email for private drops..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-display font-bold text-xs uppercase transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center justify-center"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30">
                  <Check className="w-4 h-4 text-cyan-400" />
                  <span>Subscribed to VIP dispatch announcements.</span>
                </div>
              )}
            </div>
          </div>

          {/* Links Column 1: Fleet */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-200 block">Fleet Models</span>
            <ul className="space-y-2 text-xs font-mono">
              <li><a href="#showroom" className="hover:text-cyan-400 transition-colors">Spectre GT Hypercar</a></li>
              <li><a href="#showroom" className="hover:text-cyan-400 transition-colors">Valkyrie Grand Sedan</a></li>
              <li><a href="#showroom" className="hover:text-cyan-400 transition-colors">Aegis Cyber SUV</a></li>
              <li><a href="#showroom" className="hover:text-cyan-400 transition-colors">Pulse Roadster</a></li>
              <li><a href="#configurator" className="hover:text-cyan-400 transition-colors">3D Custom Studio</a></li>
            </ul>
          </div>

          {/* Links Column 2: Technology */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-200 block">Innovation</span>
            <ul className="space-y-2 text-xs font-mono">
              <li><a href="#technology" className="hover:text-cyan-400 transition-colors">Solid-State Quantum Cell</a></li>
              <li><a href="#technology" className="hover:text-cyan-400 transition-colors">Neural Pilot 4.0 Pro</a></li>
              <li><a href="#technology" className="hover:text-cyan-400 transition-colors">Active Aerodynamic Matrix</a></li>
              <li><a href="#technology" className="hover:text-cyan-400 transition-colors">Megawatt Fast Charging</a></li>
              <li><a href="#network" className="hover:text-cyan-400 transition-colors">Supercharger Map</a></li>
            </ul>
          </div>

          {/* Links Column 3: Ownership */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-200 block">Ownership & Care</span>
            <ul className="space-y-2 text-xs font-mono">
              <li><a href="#finance" className="hover:text-cyan-400 transition-colors">Financing & Lease</a></li>
              <li><a href="#network" className="hover:text-cyan-400 transition-colors">Experience Centers</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">VIP Concierge Service</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Warranty & Roadside</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Investor Relations</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal Copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-4">
          <div>
            © 2026 Aether Motors Inc. All rights reserved. Apex Dynamics division.
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">Energy & Emissions Transparency</a>
            <a href="#" className="hover:text-slate-300">EPA Compliance</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
