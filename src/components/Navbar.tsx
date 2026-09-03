import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Shield, ChevronRight } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface NavbarProps {
  onOpenTestDrive: (modelId?: string) => void;
  onOpenConfigurator: (modelId?: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTestDrive,
  onOpenConfigurator,
  activeSection
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const isEnabled = soundEngine.toggleSound();
    setSoundActive(isEnabled);
  };

  const navLinks = [
    { name: 'Showroom', href: '#showroom' },
    { name: '3D Studio', href: '#configurator' },
    { name: 'Compare', href: '#comparison' },
    { name: 'Innovation', href: '#technology' },
    { name: 'Finance', href: '#finance' },
    { name: 'Network', href: '#network' },
  ];

  const handleNavClick = (href: string) => {
    soundEngine.playClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#040711]/85 backdrop-blur-xl border-b border-cyan-500/15 py-3 shadow-2xl shadow-cyan-950/20'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              soundEngine.playClick();
            }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/10 border border-cyan-400/40 group-hover:border-cyan-400 transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.2)] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.5)]">
              {/* Futuristic Polygon Emblem */}
              <svg viewBox="0 0 100 100" className="w-6 h-6 fill-none stroke-current text-cyan-400 stroke-[6]">
                <polygon points="50,12 88,82 50,64 12,82" />
                <line x1="50" y1="12" x2="50" y2="64" />
              </svg>
              <div className="absolute inset-0 rounded-xl bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            
            <div className="flex flex-col">
              <span className="font-display font-black tracking-[0.25em] text-lg sm:text-xl text-white flex items-center gap-1.5">
                AETHER <span className="text-cyan-400 font-light text-xs tracking-[0.3em] uppercase hidden sm:inline px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-400/20">Hyper-EV</span>
              </span>
              <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-slate-400 -mt-1">
                Apex Dynamics
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-4 py-1.5 text-xs font-medium tracking-wider uppercase rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs & Sound Engine */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              title={soundActive ? 'Mute Sound Effects' : 'Enable Futuristic Audio'}
              className={`p-2 rounded-lg border transition-all duration-300 flex items-center gap-1.5 text-xs font-mono ${
                soundActive
                  ? 'border-cyan-400/60 bg-cyan-500/20 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {soundActive ? <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden xl:inline text-[10px] tracking-wider uppercase">{soundActive ? 'Audio ON' : 'Audio'}</span>
            </button>

            {/* Test Drive Button */}
            <button
              onClick={() => {
                soundEngine.playClick();
                onOpenTestDrive();
              }}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-lg border border-slate-700 hover:border-cyan-400/50 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-cyan-300 transition-all duration-300"
            >
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>Test Drive</span>
            </button>

            {/* Build & Price CTA */}
            <button
              onClick={() => {
                soundEngine.playHyperRev();
                onOpenConfigurator();
              }}
              className="relative group overflow-hidden px-4 sm:px-5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-display font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.7)]"
            >
              <span className="relative z-10 flex items-center gap-1">
                Configure <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => {
                soundEngine.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 rounded-lg border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/40"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-[#040711]/95 backdrop-blur-2xl pt-24 px-6 pb-8 flex flex-col justify-between animate-fadeIn">
          <div className="space-y-3">
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400 mb-2">Explore Fleet & Tech</p>
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="w-full text-left py-3 px-4 rounded-xl text-lg font-display font-medium text-slate-200 hover:text-cyan-400 hover:bg-slate-900/80 border border-transparent hover:border-cyan-400/20 transition-all flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            ))}
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-800">
            <button
              onClick={() => {
                soundEngine.playClick();
                setMobileMenuOpen(false);
                onOpenTestDrive();
              }}
              className="w-full py-3 rounded-xl border border-cyan-400/40 bg-cyan-500/10 text-cyan-300 font-semibold text-sm tracking-wider uppercase flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4" /> Book VIP Test Drive
            </button>
            <button
              onClick={() => {
                soundEngine.playHyperRev();
                setMobileMenuOpen(false);
                onOpenConfigurator();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-display font-bold text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2"
            >
              Launch 3D Configurator
            </button>
          </div>
        </div>
      )}
    </>
  );
};
