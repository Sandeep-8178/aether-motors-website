import React, { useState } from 'react';
import { CAR_MODELS, SHOWROOMS } from '../data/cars';
import { X, Shield, Calendar, Clock, MapPin, User, CheckCircle2, QrCode } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface TestDriveModalProps {
  initialModelId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const TestDriveModal: React.FC<TestDriveModalProps> = ({
  initialModelId = 'spectre-gt',
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedModel, setSelectedModel] = useState<string>(initialModelId);
  const [experienceType, setExperienceType] = useState<'track' | 'vip-showroom' | 'concierge-delivery'>('track');
  const [selectedCity, setSelectedCity] = useState<string>(SHOWROOMS[0].city);
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-18');
  const [selectedTime, setSelectedTime] = useState<string>('02:00 PM');
  
  // Guest Details
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    licenseNumber: '',
  });

  const [bookingRef, setBookingRef] = useState<string>('');

  if (!isOpen) return null;

  const currentCar = CAR_MODELS.find((m) => m.id === selectedModel) || CAR_MODELS[0];

  const handleNext = () => {
    soundEngine.playClick();
    if (step === 3) {
      // Generate booking reference
      const ref = `AETH-VIP-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingRef(ref);
      soundEngine.playStartup();
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    soundEngine.playClick();
    setStep((prev) => prev - 1);
  };

  const isFormValid =
    formData.firstName.trim() !== '' &&
    formData.lastName.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.licenseNumber.trim() !== '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl overflow-y-auto animate-fadeIn">
      
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-950 border border-cyan-500/30 shadow-[0_0_60px_rgba(0,240,255,0.2)] overflow-hidden my-auto">
        
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

        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-1">
            <Shield className="w-3.5 h-3.5" />
            <span>VIP Concierge Reservation</span>
          </div>
          <h2 className="text-2xl font-display font-black text-white uppercase tracking-tight">
            Book a VIP Test Drive Experience
          </h2>

          {/* Progress Indicator */}
          <div className="flex items-center gap-2 mt-4">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  step >= s ? 'bg-cyan-400' : 'bg-slate-800'
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* STEP 1: VEHICLE & EXPERIENCE TYPE */}
        {step === 1 && (
          <div className="p-6 space-y-5 animate-fadeIn">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                1. Select Vehicle Model
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {CAR_MODELS.map((car) => (
                  <button
                    key={car.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedModel(car.id);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      selectedModel === car.id
                        ? 'border-cyan-400 bg-cyan-950/30 text-white'
                        : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold font-display uppercase">{car.name}</div>
                    <div className="text-[10px] font-mono text-cyan-400 mt-0.5">
                      {car.specs.power}  •  {car.specs.acceleration}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                2. Select Drive Experience Format
              </label>
              <div className="space-y-2">
                {[
                  {
                    id: 'track' as const,
                    title: 'Closed-Circuit Private Track Session',
                    desc: 'Professional racing instructor co-pilot, 0-60 launch control testing, and dynamic skidpad handling.',
                  },
                  {
                    id: 'vip-showroom' as const,
                    title: 'Showroom VIP Road Experience',
                    desc: 'Extended 90-minute scenic highway & city test drive departing from an Aether Experience Lounge.',
                  },
                  {
                    id: 'concierge-delivery' as const,
                    title: '24-Hour At-Home Private Test Drive',
                    desc: 'Delivered directly to your residence or private office by an Aether concierge.',
                  },
                ].map((exp) => (
                  <button
                    key={exp.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setExperienceType(exp.id);
                    }}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all ${
                      experienceType === exp.id
                        ? 'border-cyan-400 bg-cyan-950/30'
                        : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{exp.title}</div>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{exp.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: LOCATION, DATE & TIME */}
        {step === 2 && (
          <div className="p-6 space-y-5 animate-fadeIn">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                Select Experience Center Location
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SHOWROOMS.map((sh) => (
                  <button
                    key={sh.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedCity(sh.city);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      selectedCity === sh.city
                        ? 'border-cyan-400 bg-cyan-950/30'
                        : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{sh.city}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">{sh.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min="2026-09-10"
                  max="2026-12-31"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" /> Preferred Slot
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {['10:00 AM', '01:30 PM', '04:00 PM', '06:30 PM'].map((slot) => (
                    <button
                      key={slot}
                      onClick={() => {
                        soundEngine.playClick();
                        setSelectedTime(slot);
                      }}
                      className={`p-2 rounded-xl text-xs font-mono transition-all border ${
                        selectedTime === slot
                          ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 font-bold'
                          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: GUEST INFORMATION & LICENSE */}
        {step === 3 && (
          <div className="p-6 space-y-4 animate-fadeIn">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">First Name *</label>
                <input
                  type="text"
                  placeholder="Alexander"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">Last Name *</label>
                <input
                  type="text"
                  placeholder="Morgan"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">Email Address *</label>
                <input
                  type="email"
                  placeholder="alexander@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 019-2834"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                Driver License Number (Required for Track/Road Insurance) *
              </label>
              <input
                type="text"
                placeholder="DL-984720194"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono uppercase focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-[11px] text-cyan-300 font-mono">
              ✓ Full comprehensive prototype track insurance is included free of charge with all Aether drive bookings.
            </div>
          </div>
        )}

        {/* STEP 4: DIGITAL VIP PASS CONFIRMATION */}
        {step === 4 && (
          <div className="p-6 text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(0,240,255,0.5)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">Reservation Confirmed</span>
              <h3 className="text-2xl font-display font-black text-white uppercase mt-1">
                Your VIP Test Pass is Ready
              </h3>
            </div>

            {/* Generated Digital VIP Ticket Card */}
            <div className="max-w-md mx-auto p-5 rounded-3xl bg-slate-900 border border-cyan-400/40 text-left space-y-4 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase">AETHER MOTORS VIP PASS</span>
                  <div className="text-lg font-display font-black text-white">{currentCar.name}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 block">PASS REF</span>
                  <span className="text-xs font-mono text-cyan-300 font-bold">{bookingRef}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-slate-500 block">DRIVER</span>
                  <span className="text-slate-200 font-bold">{formData.firstName} {formData.lastName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">LOCATION</span>
                  <span className="text-slate-200 font-bold">{selectedCity}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">DATE & TIME</span>
                  <span className="text-slate-200 font-bold">{selectedDate} @ {selectedTime}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">FORMAT</span>
                  <span className="text-cyan-300 font-bold uppercase">{experienceType.replace('-', ' ')}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <QrCode className="w-10 h-10 text-cyan-400" />
                  <span className="text-[10px] font-mono text-slate-400">Scan at showroom check-in</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono">
                  ACTIVE
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              A copy of your VIP pass and driving instructions have been dispatched to <span className="text-cyan-300">{formData.email}</span>.
            </p>
          </div>
        )}

        {/* Modal Actions Footer */}
        <div className="p-6 bg-slate-900/80 border-t border-slate-800 flex justify-between gap-3">
          {step > 1 && step < 4 ? (
            <button
              onClick={handleBack}
              className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white font-mono text-xs uppercase"
            >
              Back
            </button>
          ) : (
            <div></div>
          )}

          {step < 3 && (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-display font-bold text-xs uppercase tracking-wider"
            >
              Continue
            </button>
          )}

          {step === 3 && (
            <button
              onClick={handleNext}
              disabled={!isFormValid}
              className={`px-8 py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider transition-all ${
                isFormValid
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.5)] cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              Confirm VIP Pass
            </button>
          )}

          {step === 4 && (
            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-cyan-500 text-slate-950 font-display font-bold text-xs uppercase tracking-wider"
            >
              Done
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
