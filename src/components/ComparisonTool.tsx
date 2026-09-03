import React from 'react';
import { CAR_MODELS } from '../data/cars';
import { CarModel } from '../types';
import { SlidersHorizontal, Plus, X, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface ComparisonToolProps {
  selectedIds: string[];
  onToggleModel: (modelId: string) => void;
  onOpenConfigurator: (modelId: string) => void;
}

export const ComparisonTool: React.FC<ComparisonToolProps> = ({
  selectedIds,
  onToggleModel,
  onOpenConfigurator
}) => {
  // Ensure we have at least 2 models default for comparison
  const comparedModels: CarModel[] = selectedIds.length > 0
    ? CAR_MODELS.filter((m) => selectedIds.includes(m.id))
    : [CAR_MODELS[0], CAR_MODELS[1]];

  const availableToAdd = CAR_MODELS.filter((m) => !comparedModels.find((cm) => cm.id === m.id));

  // Determine best stats for highlighting
  const bestAcc = Math.min(...comparedModels.map((m) => m.specs.accelerationNum));
  const bestRange = Math.max(...comparedModels.map((m) => m.specs.rangeNum));
  const bestPower = Math.max(...comparedModels.map((m) => m.specs.powerNum));
  const bestSpeed = Math.max(...comparedModels.map((m) => m.specs.topSpeedNum));

  return (
    <section id="comparison" className="relative py-24 bg-[#030610] text-slate-100 border-t border-slate-900 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-3">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Side-by-Side Comparison</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tight">
              Compare Specifications
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Select vehicles to evaluate performance, electric range, autonomous hardware, and architecture head-to-head.
            </p>
          </div>

          {/* Quick Model Add Pills */}
          {availableToAdd.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-slate-400 uppercase">Add model:</span>
              {availableToAdd.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    soundEngine.playClick();
                    onToggleModel(m.id);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1 transition-all"
                >
                  <Plus className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{m.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Comparison Table Container */}
        <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/30 backdrop-blur-xl">
          <table className="w-full text-left border-collapse min-w-[700px]">
            
            {/* Table Header: Car Previews */}
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/70">
                <th className="p-6 w-1/4 align-bottom text-xs font-mono uppercase text-slate-500">
                  Vehicle Metric
                </th>
                {comparedModels.map((car) => (
                  <th key={car.id} className="p-6 w-1/3 align-bottom text-left">
                    <div className="space-y-3">
                      <div className="relative h-32 w-full rounded-2xl overflow-hidden border border-slate-800">
                        <img
                          src={car.image}
                          alt={car.name}
                          className="w-full h-full object-cover"
                        />
                        {comparedModels.length > 1 && (
                          <button
                            onClick={() => {
                              soundEngine.playClick();
                              onToggleModel(car.id);
                            }}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-950/80 text-slate-400 hover:text-white hover:bg-rose-500/80 transition-colors"
                            title="Remove from comparison"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div>
                        <span className="text-[10px] font-mono uppercase text-cyan-400">{car.series}</span>
                        <div className="text-xl font-display font-black text-white">{car.name}</div>
                        <div className="text-sm font-mono text-cyan-300 font-bold mt-0.5">
                          \${car.basePrice.toLocaleString()}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          soundEngine.playHyperRev();
                          onOpenConfigurator(car.id);
                        }}
                        className="w-full py-2 px-3 rounded-lg bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-400/40 text-xs font-mono uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-1"
                      >
                        <span>Build {car.name}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Metrics Rows */}
            <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
              
              {/* Acceleration */}
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="p-4 text-slate-400 font-semibold">0 - 60 MPH Acceleration</td>
                {comparedModels.map((car) => {
                  const isBest = car.specs.accelerationNum === bestAcc;
                  return (
                    <td key={car.id} className="p-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-base font-bold ${isBest ? 'text-cyan-300' : 'text-slate-200'}`}>
                          {car.specs.acceleration}
                        </span>
                        {isBest && (
                          <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] border border-cyan-400/30">
                            LEADER
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Peak Power */}
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="p-4 text-slate-400 font-semibold">Peak Horsepower</td>
                {comparedModels.map((car) => {
                  const isBest = car.specs.powerNum === bestPower;
                  return (
                    <td key={car.id} className="p-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-base font-bold ${isBest ? 'text-cyan-300' : 'text-slate-200'}`}>
                          {car.specs.power}
                        </span>
                        {isBest && (
                          <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] border border-cyan-400/30">
                            MAX OUTPUT
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Range */}
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="p-4 text-slate-400 font-semibold">EPA Estimated Range</td>
                {comparedModels.map((car) => {
                  const isBest = car.specs.rangeNum === bestRange;
                  return (
                    <td key={car.id} className="p-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-base font-bold ${isBest ? 'text-cyan-300' : 'text-slate-200'}`}>
                          {car.specs.range}
                        </span>
                        {isBest && (
                          <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] border border-cyan-400/30">
                            LONGEST RANGE
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Top Speed */}
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="p-4 text-slate-400 font-semibold">Top Track Speed</td>
                {comparedModels.map((car) => {
                  const isBest = car.specs.topSpeedNum === bestSpeed;
                  return (
                    <td key={car.id} className="p-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-base font-bold ${isBest ? 'text-cyan-300' : 'text-slate-200'}`}>
                          {car.specs.topSpeed}
                        </span>
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Charging Speed */}
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="p-4 text-slate-400 font-semibold">10-80% Ultra Fast Charge</td>
                {comparedModels.map((car) => (
                  <td key={car.id} className="p-4 text-slate-200">
                    {car.specs.chargingSpeed}
                  </td>
                ))}
              </tr>

              {/* Drivetrain */}
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="p-4 text-slate-400 font-semibold">Drivetrain Architecture</td>
                {comparedModels.map((car) => (
                  <td key={car.id} className="p-4 text-slate-200">
                    {car.specs.driveType}
                  </td>
                ))}
              </tr>

              {/* Battery Capacity */}
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="p-4 text-slate-400 font-semibold">Battery Chemistry & Capacity</td>
                {comparedModels.map((car) => (
                  <td key={car.id} className="p-4 text-slate-200">
                    {car.specs.batteryCapacity}
                  </td>
                ))}
              </tr>

              {/* Drag Coefficient */}
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="p-4 text-slate-400 font-semibold">Aerodynamic Drag Coefficient</td>
                {comparedModels.map((car) => (
                  <td key={car.id} className="p-4 text-cyan-300">
                    {car.specs.dragCoefficient}
                  </td>
                ))}
              </tr>

              {/* Seating & Cargo */}
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="p-4 text-slate-400 font-semibold">Seating & Luggage Volume</td>
                {comparedModels.map((car) => (
                  <td key={car.id} className="p-4 text-slate-200">
                    {car.specs.seating} Seats  •  {car.specs.cargoVolume}
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};
