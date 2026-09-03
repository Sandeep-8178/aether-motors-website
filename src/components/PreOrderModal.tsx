import React, { useState } from 'react';
import { CarModel, PaintColor, WheelOption, InteriorOption, AmbientLightingOption } from '../types';
import { X, CheckCircle2, ShieldCheck, Lock, CreditCard } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface PreOrderConfig {
  model: CarModel;
  color: PaintColor;
  wheel: WheelOption;
  interior: InteriorOption;
  ambient: AmbientLightingOption;
  packages: string[];
  totalPrice: number;
  monthlyPrice: number;
}

interface PreOrderModalProps {
  config: PreOrderConfig | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PreOrderModal: React.FC<PreOrderModalProps> = ({ config, isOpen, onClose }) => {
  const [confirmed, setConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Eleanor Sterling',
    email: 'eleanor@hypervelocity.io',
    city: 'San Francisco, CA',
    cardNumber: '•••• •••• •••• 4242',
  });
  const [orderRef, setOrderRef] = useState('');

  if (!isOpen || !config) return null;

  const handleConfirmOrder = () => {
    soundEngine.playStartup();
    setOrderRef(`AETH-ORD-${Math.floor(100000 + Math.random() * 900000)}`);
    setConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl overflow-y-auto animate-fadeIn">
      
      <div className="relative w-full max-w-xl rounded-3xl bg-slate-950 border border-cyan-500/30 shadow-[0_0_60px_rgba(0,240,255,0.2)] overflow-hidden my-auto">
        
        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Factory Build Reservation</span>
          </div>
          <h2 className="text-2xl font-display font-black text-white uppercase tracking-tight">
            Reserve Your {config.model.name}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Estimated Delivery: <span className="text-white font-medium">Q1 2027</span>  •  Priority Production Allocation
          </p>
        </div>

        {!confirmed ? (
          <div className="p-6 space-y-5">
            
            {/* Build Summary Card */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5 text-xs font-mono">
              <div className="flex justify-between text-white font-bold border-b border-slate-800 pb-2">
                <span>Model: {config.model.name}</span>
                <span className="text-cyan-400">\${config.totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Exterior:</span>
                <span className="text-slate-200">{config.color.name}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Wheels:</span>
                <span className="text-slate-200">{config.wheel.name}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Interior:</span>
                <span className="text-slate-200">{config.interior.name}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Packages:</span>
                <span className="text-slate-200">{config.packages.length} Selected</span>
              </div>
            </div>

            {/* Deposit Breakdown */}
            <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-cyan-300 font-bold uppercase block">Refundable Order Deposit</span>
                <span className="text-[11px] text-slate-400">100% refundable anytime prior to final build lock</span>
              </div>
              <div className="text-xl font-display font-black text-cyan-300">
                \$2,500
              </div>
            </div>

            {/* Reservation Form */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Email for Build Updates</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Payment Method</label>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-cyan-400" /> {formData.cardNumber}
                  </span>
                  <span className="text-emerald-400 text-[10px]">256-BIT ENCRYPTED</span>
                </div>
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirmOrder}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 text-slate-950 font-display font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Authorize \$2,500 Deposit & Reserve Build</span>
            </button>
          </div>
        ) : (
          <div className="p-6 text-center space-y-5 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(0,240,255,0.5)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase text-cyan-400 tracking-widest">Build Allocation Locked</span>
              <h3 className="text-2xl font-display font-black text-white uppercase mt-1">
                Welcome to Aether Ownership
              </h3>
              <p className="text-xs text-slate-300 mt-2">
                Your reservation number is <span className="text-cyan-300 font-mono font-bold">{orderRef}</span>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left text-xs font-mono space-y-2">
              <div className="text-slate-400">Receipt sent to: <span className="text-white">{formData.email}</span></div>
              <div className="text-slate-400">Total Vehicle Config: <span className="text-white">\${config.totalPrice.toLocaleString()}</span></div>
              <div className="text-slate-400">Deposit Processed: <span className="text-emerald-400 font-bold">\$2,500 (Paid)</span></div>
              <div className="text-slate-400">Aether VIP Concierge Contact: <span className="text-cyan-300">vip@aethermotors.com</span></div>
            </div>

            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-cyan-500 text-slate-950 font-display font-bold text-xs uppercase tracking-wider"
            >
              Return to Website
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
