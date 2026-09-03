import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Configurator } from './components/Configurator';
import { Showroom } from './components/Showroom';
import { ComparisonTool } from './components/ComparisonTool';
import { Technology } from './components/Technology';
import { FinanceCalculator } from './components/FinanceCalculator';
import { NetworkMap } from './components/NetworkMap';
import { ReviewsAndPress } from './components/ReviewsAndPress';
import { Footer } from './components/Footer';
import { TestDriveModal } from './components/TestDriveModal';
import { PreOrderModal } from './components/PreOrderModal';
import { CarModel, PaintColor, WheelOption, InteriorOption, AmbientLightingOption } from './types';
import { soundEngine } from './utils/audio';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('showroom');
  const [testDriveOpen, setTestDriveOpen] = useState(false);
  const [testDriveModelId, setTestDriveModelId] = useState<string>('spectre-gt');
  
  const [preOrderOpen, setPreOrderOpen] = useState(false);
  const [preOrderConfig, setPreOrderConfig] = useState<{
    model: CarModel;
    color: PaintColor;
    wheel: WheelOption;
    interior: InteriorOption;
    ambient: AmbientLightingOption;
    packages: string[];
    totalPrice: number;
    monthlyPrice: number;
  } | null>(null);

  const [comparisonList, setComparisonList] = useState<string[]>(['spectre-gt', 'valkyrie']);

  // Handle scroll section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['showroom', 'configurator', 'comparison', 'technology', 'finance', 'network'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Modal Triggers
  const handleOpenTestDrive = (modelId?: string) => {
    if (modelId) setTestDriveModelId(modelId);
    setTestDriveOpen(true);
  };

  const handleOpenConfigurator = (modelId?: string) => {
    const el = document.getElementById('configurator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreModels = () => {
    const el = document.getElementById('showroom');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleCompare = (modelId: string) => {
    if (comparisonList.includes(modelId)) {
      if (comparisonList.length > 1) {
        setComparisonList(comparisonList.filter((id) => id !== modelId));
      }
    } else {
      if (comparisonList.length < 3) {
        setComparisonList([...comparisonList, modelId]);
      } else {
        setComparisonList([comparisonList[1], comparisonList[2], modelId]);
      }
    }
    // Scroll to comparison section
    const compEl = document.getElementById('comparison');
    if (compEl) {
      compEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenPreOrder = (config: {
    model: CarModel;
    color: PaintColor;
    wheel: WheelOption;
    interior: InteriorOption;
    ambient: AmbientLightingOption;
    packages: string[];
    totalPrice: number;
    monthlyPrice: number;
  }) => {
    setPreOrderConfig(config);
    setPreOrderOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#040711] text-slate-100 flex flex-col selection:bg-cyan-400 selection:text-black">
      
      {/* Navbar */}
      <Navbar
        onOpenTestDrive={handleOpenTestDrive}
        onOpenConfigurator={handleOpenConfigurator}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* Cinematic Hero */}
        <Hero
          onOpenConfigurator={handleOpenConfigurator}
          onOpenTestDrive={handleOpenTestDrive}
          onExploreModels={handleExploreModels}
        />

        {/* 3D Configurator Studio */}
        <Configurator
          onOpenPreOrder={handleOpenPreOrder}
          onOpenTestDrive={handleOpenTestDrive}
        />

        {/* Vehicle Fleet Showroom */}
        <Showroom
          onOpenConfigurator={handleOpenConfigurator}
          onOpenTestDrive={handleOpenTestDrive}
          comparisonList={comparisonList}
          onToggleCompare={handleToggleCompare}
        />

        {/* Specs Comparison Tool */}
        <ComparisonTool
          selectedIds={comparisonList}
          onToggleModel={handleToggleCompare}
          onOpenConfigurator={handleOpenConfigurator}
        />

        {/* Innovation & Engineering Deep Dive */}
        <Technology />

        {/* Financing & Lease Calculator */}
        <FinanceCalculator
          onOpenConfigurator={handleOpenConfigurator}
        />

        {/* Supercharger & Showroom Network Map */}
        <NetworkMap
          onOpenTestDrive={handleOpenTestDrive}
        />

        {/* Critical Reviews & Press Awards */}
        <ReviewsAndPress />

      </main>

      {/* Footer & Sustainability */}
      <Footer />

      {/* VIP Test Drive Modal Wizard */}
      <TestDriveModal
        initialModelId={testDriveModelId}
        isOpen={testDriveOpen}
        onClose={() => setTestDriveOpen(false)}
      />

      {/* Instant Reservation Modal */}
      <PreOrderModal
        config={preOrderConfig}
        isOpen={preOrderOpen}
        onClose={() => setPreOrderOpen(false)}
      />

    </div>
  );
};

export default App;
