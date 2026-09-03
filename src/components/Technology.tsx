import React, { useState } from 'react';
import { Cpu, BatteryCharging, Wind, Eye, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const Technology: React.FC = () => {
  const [activeTech, setActiveTech] = useState<number>(0);

  const techPillars = [
    {
      id: 'battery',
      icon: BatteryCharging,
      title: 'Quantum Solid-State Battery',
      tagline: '800V/1000V Architecture  •  12-Minute Megawatt Charge',
      image: 'https://images.unsplash.com/photo-1558441719-8b489c652690?auto=format&fit=crop&w=1000&q=80',
      description: 'Our proprietary silicon-quantum electrolyte replaces liquid flammables with ultra-dense ceramic matrices. The result is 450 Wh/kg specific energy density, immune to thermal runaway and degradation across 1,000,000 miles.',
      metrics: [
        { label: 'Energy Density', value: '450 Wh/kg' },
        { label: 'Charge Time (10-80%)', value: '12 Mins' },
        { label: 'Cycle Life', value: '1,000,000+ Mi' },
        { label: 'Operating Temp', value: '-40°C to 65°C' }
      ],
      points: [
        'Non-flammable solid ceramic matrix eliminates thermal risk',
        'Direct structural integration inside carbon fiber monocoque',
        'Cold-climate internal induction heating prevents winter range loss',
        'Bi-directional vehicle-to-grid (V2G) power generation up to 22 kW'
      ]
    },
    {
      id: 'neural-pilot',
      icon: Cpu,
      title: 'Aether Neural Pilot 4.0 Pro',
      tagline: 'Dual 2,000 TOPS Neural Co-Processor  •  Level 4 Autonomy',
      image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1000&q=80',
      description: 'Triple flush-mounted Solid-State LiDAR, 12 HDR 8K optical cameras, and 4D imaging radar synthesize a millimeter-accurate 3D voxel representation of the world 120 times every second.',
      metrics: [
        { label: 'AI Compute', value: '2,000 TOPS' },
        { label: 'Sensor Range', value: '350 Meters' },
        { label: 'LiDAR Resolution', value: '0.03° Ang.' },
        { label: 'Reaction Latency', value: '< 2.4 ms' }
      ],
      points: [
        'Level 4 autonomous hands-free highway cruising & urban navigation',
        'Predictive road condition preview with real-time active suspension tuning',
        'Automated Valet summon and robotic inductive charger docking',
        'Over-the-air continuous neural net learning from 100M+ fleet miles'
      ]
    },
    {
      id: 'aerodynamics',
      icon: Wind,
      title: 'Active Aero Venturi Matrix',
      tagline: 'Record-Breaking 0.19 Cd  •  1,200kg Downforce',
      image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1000&q=80',
      description: 'Active aerodynamics that adapt in real time to your driving style. In Eco-Cruise, front air shutters close and the rear diffuser flattens to glide at 0.19 Cd. In Apex Track mode, venturi tunnels open for ground-effect suction.',
      metrics: [
        { label: 'Drag Coeff (Min)', value: '0.19 Cd' },
        { label: 'Peak Downforce', value: '1,200 kg' },
        { label: 'Aero Flap Response', value: '45 ms' },
        { label: 'Cornering Grip', value: '1.42 G' }
      ],
      points: [
        'Retractable dual-stage carbon rear wing with active airbrake',
        'Underbody ground-effect venturi channels with vacuum suction',
        'Aero-blade active wheel shutters for minimal turbulence',
        'Front splitter vortex generators reducing front-axle lift to zero'
      ]
    },
    {
      id: 'cockpit-os',
      icon: Eye,
      title: 'Biometric Holographic Cockpit',
      tagline: 'Curved 4K OLED Cluster  •  Full-Windshield AR HUD',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80',
      description: 'The cabin is an extension of your senses. A full-windshield Augmented Reality HUD projects navigation lines, apex turn-in points, and night-vision pedestrian highlights directly onto the road ahead.',
      metrics: [
        { label: 'AR HUD Field', value: '65° Windshield' },
        { label: 'Display Resolution', value: '8K Ultra Retina' },
        { label: 'Acoustic Isolation', value: '< 36 dB @ 70mph' },
        { label: 'Speakers', value: '26 Spatial 3D' }
      ],
      points: [
        'Eye-tracking and biometric gesture controls for zero-distraction command',
        'Zero-gravity heated and ventilated seats with pneumatic Shiatsu massage',
        'Active acoustic road noise cancellation with micro-speakers in headrests',
        'Electrochromic smart glass roof with instant solar opacity control'
      ]
    }
  ];

  const current = techPillars[activeTech];

  return (
    <section id="technology" className="relative py-24 bg-[#040711] text-slate-100 border-t border-slate-900 overflow-hidden">
      
      {/* Glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Generation Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
            Innovation Architecture
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            From solid-state quantum battery cells to 2,000 TOPS neural processing, discover the technology powering the electric revolution.
          </p>
        </div>

        {/* Tech Pillar Selector Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {techPillars.map((p, idx) => {
            const Icon = p.icon;
            const isSelected = activeTech === idx;
            return (
              <button
                key={p.id}
                onClick={() => {
                  soundEngine.playChange();
                  setActiveTech(idx);
                }}
                className={`p-4 rounded-2xl border text-left transition-all group flex flex-col justify-between ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/25 shadow-[0_0_25px_rgba(0,240,255,0.25)]'
                    : 'border-slate-800/80 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                <div className={`p-2.5 rounded-xl w-fit ${
                  isSelected ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-400 group-hover:text-cyan-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="mt-4">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">PILLAR 0{idx + 1}</span>
                  <div className={`text-sm font-bold font-display uppercase tracking-wide mt-0.5 ${
                    isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'
                  }`}>
                    {p.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Tech Pillar Detailed Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 rounded-3xl bg-slate-900/30 border border-slate-800/80 backdrop-blur-xl items-center">
          
          {/* Left Column: Text & Features (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase text-cyan-400 tracking-[0.25em]">
                {current.tagline}
              </span>
              <h3 className="text-2xl sm:text-4xl font-display font-black text-white uppercase mt-1">
                {current.title}
              </h3>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {current.description}
            </p>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {current.metrics.map((m, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">{m.label}</span>
                  <span className="text-lg font-mono font-bold text-cyan-300 mt-0.5 block">{m.value}</span>
                </div>
              ))}
            </div>

            {/* Bullet Points */}
            <div className="space-y-2.5 pt-2">
              {current.points.map((pt, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Image Graphic (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_0_30px_rgba(0,0,0,0.8)] aspect-[4/3]">
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
              
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                <div className="text-[11px] font-mono text-slate-300">
                  Verified with 150,000+ Simulated Stress Test Hours
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
