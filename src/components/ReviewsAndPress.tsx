import React from 'react';
import { CUSTOMER_REVIEWS, PRESS_ACCOLADES } from '../data/cars';
import { Star, Award, CheckCircle, Quote, Sparkles } from 'lucide-react';

export const ReviewsAndPress: React.FC = () => {
  return (
    <section className="relative py-24 bg-[#030610] text-slate-100 border-t border-slate-900 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Press Accolades Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Global Critical Acclaim</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
            Industry Recognition
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Validated by the world's most demanding automotive journalists and track test drivers.
          </p>
        </div>

        {/* Press Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {PRESS_ACCOLADES.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-900/30 border border-slate-800/80 hover:border-cyan-500/40 backdrop-blur-xl flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display font-black text-xl text-white tracking-wider">
                    {item.outlet}
                  </span>
                  <Award className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
                </div>
                <Quote className="w-6 h-6 text-slate-700 mb-2" />
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800">
                <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-[10px] font-mono uppercase text-cyan-300 block text-center">
                  {item.award}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Owner Testimonials Header */}
        <div className="border-t border-slate-900 pt-16 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-400">
              Verified Owner Experiences
            </span>
            <h3 className="text-2xl sm:text-4xl font-display font-black text-white uppercase mt-1">
              From The Driver's Seat
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </span>
            <span>4.98 / 5.0 Average Fleet Rating</span>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 backdrop-blur-md flex flex-col justify-between space-y-4 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
                    {rev.model}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white font-display mb-2">
                  "{rev.title}"
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>{rev.author}</span>
                    {rev.verifiedOwner && (
                      <span title="Verified Owner">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500">{rev.date}</span>
                </div>

                <span className="text-[10px] text-emerald-400 font-medium">Verified Owner</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
