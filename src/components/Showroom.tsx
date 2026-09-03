import React, { useState } from 'react';
import { CAR_MODELS } from '../data/cars';
import { CarModel, CarCategory } from '../types';
import { ModelDetailModal } from './ModelDetailModal';
import { Zap, Gauge, Navigation, Sparkles, SlidersHorizontal, ArrowRight, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface ShowroomProps {
  onOpenConfigurator: (modelId: string) => void;
  onOpenTestDrive: (modelId: string) => void;
  comparisonList: string[];
  onToggleCompare: (modelId: string) => void;
}

export const Showroom: React.FC<ShowroomProps> = ({
  onOpenConfigurator,
  onOpenTestDrive,
  comparisonList,
  onToggleCompare
}) => {
  const [activeCategory, setActiveCategory] = useState<CarCategory>('all');
  const [detailedModel, setDetailedModel] = useState<CarModel | null>(null);

  const categories: { id: CarCategory; label: string }[] = [
    { id: 'all', label: 'All Fleet Models' },
    { id: 'hypercar', label: 'Hypercars' },
    { id: 'sedan', label: 'Grand Sedans' },
    { id: 'suv', label: 'Cyber SUVs' },
    { id: 'roadster', label: 'Roadsters' },
  ];

  const filteredModels = activeCategory === 'all'
    ? CAR_MODELS
    : CAR_MODELS.filter((m) => m.category === activeCategory);

  return (
    <section id="showroom" className="relative py-24 bg-[#040711] text-slate-100 overflow-hidden">
      
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-950/20 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Electric Showroom</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
            The 2027 Production Fleet
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Engineered with zero compromises. Select any vehicle to explore technical blueprints or customize in the 3D studio.
          </p>

          {/* Category Filter Tabs */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md gap-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveCategory(cat.id);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                  activeCategory === cat.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Model Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredModels.map((car) => {
            const isComparing = comparisonList.includes(car.id);
            return (
              <div
                key={car.id}
                className="group relative rounded-3xl bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-500 overflow-hidden flex flex-col justify-between backdrop-blur-sm shadow-xl hover:shadow-[0_0_35px_rgba(0,240,255,0.15)]"
              >
                {/* Image Showcase */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                  {/* Top Badge: Category & Series */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[10px] font-mono uppercase text-cyan-400">
                      {car.series}
                    </span>
                  </div>

                  {/* Compare Checkbox Button */}
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      onToggleCompare(car.id);
                    }}
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full backdrop-blur-md border text-[10px] font-mono uppercase transition-all flex items-center gap-1.5 ${
                      isComparing
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-[0_0_15px_rgba(0,240,255,0.5)]'
                        : 'bg-slate-950/70 border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400'
                    }`}
                  >
                    {isComparing ? <CheckCircle2 className="w-3.5 h-3.5" /> : <SlidersHorizontal className="w-3.5 h-3.5" />}
                    <span>{isComparing ? 'Comparing' : 'Compare'}</span>
                  </button>

                  {/* Bottom Image Overlay: Model Name & Price */}
                  <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
                        {car.name}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-1">{car.tagline}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-mono text-slate-400 uppercase">From</span>
                      <div className="text-lg sm:text-xl font-display font-black text-white">
                        <span className="text-cyan-400">\$</span>{car.basePrice.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Specs Matrix */}
                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-4 gap-2 text-center p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 font-mono text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block">0-60</span>
                      <span className="text-white font-bold flex items-center justify-center gap-0.5 mt-0.5">
                        <Gauge className="w-3 h-3 text-cyan-400" /> {car.specs.acceleration}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 block">POWER</span>
                      <span className="text-white font-bold flex items-center justify-center gap-0.5 mt-0.5">
                        <Zap className="w-3 h-3 text-cyan-400" /> {car.specs.power}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 block">RANGE</span>
                      <span className="text-cyan-300 font-bold flex items-center justify-center gap-0.5 mt-0.5">
                        <Navigation className="w-3 h-3 text-cyan-400" /> {car.specs.range}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 block">TOP SPD</span>
                      <span className="text-white font-bold flex items-center justify-center gap-0.5 mt-0.5">
                        {car.specs.topSpeed}
                      </span>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => {
                        soundEngine.playClick();
                        setDetailedModel(car);
                      }}
                      className="w-full py-3 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400/40 text-slate-200 hover:text-white text-xs font-mono uppercase tracking-wider transition-all"
                    >
                      Blueprint & Specs
                    </button>

                    <button
                      onClick={() => {
                        soundEngine.playHyperRev();
                        onOpenConfigurator(car.id);
                      }}
                      className="w-full py-3 px-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 text-xs font-display font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] flex items-center justify-center gap-1 transition-all cursor-pointer"
                    >
                      <span>3D Studio</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Model Deep Dive Modal */}
      {detailedModel && (
        <ModelDetailModal
          model={detailedModel}
          onClose={() => setDetailedModel(null)}
          onOpenConfigurator={onOpenConfigurator}
          onOpenTestDrive={onOpenTestDrive}
        />
      )}
    </section>
  );
};
