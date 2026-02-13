
import React, { useState } from 'react';
import { SECTORS } from './constants';
import { InvestmentSector, ViewTab } from './types';
import SectorCard from './components/SectorCard';
import SectorDeepDive from './components/SectorDeepDive';
import FinancialDashboard from './components/FinancialDashboard';
import GovernanceView from './components/GovernanceView';
import InsightsDashboard from './components/InsightsDashboard';
import SectorsDetailView from './components/SectorsDetailView';
import AuditView from './components/AuditView';
import ProfitCalculator from './components/ProfitCalculator';

const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    {/* Hexagon Border */}
    <path 
      d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z" 
      fill="none" 
      stroke="#e67e22" 
      strokeWidth="6" 
      strokeLinejoin="round"
    />
    {/* Stylized G (Green) */}
    <path 
      d="M75 40 Q75 25 50 25 Q25 25 25 45 Q25 65 50 65 Q65 65 70 55" 
      fill="none" 
      stroke="#1a9e55" 
      strokeWidth="10" 
      strokeLinecap="round"
    />
    {/* Stylized E middle bar (Orange) */}
    <path 
      d="M45 45 H70" 
      stroke="#e67e22" 
      strokeWidth="10" 
      strokeLinecap="round"
    />
  </svg>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ViewTab>('portfolio');
  const [selectedSectorId, setSelectedSectorId] = useState<InvestmentSector>(InvestmentSector.Mining);
  
  const selectedSector = SECTORS.find(s => s.id === selectedSectorId)!;

  const handleSectorCardClick = (id: InvestmentSector) => {
    setSelectedSectorId(id);
    setActiveTab('sectors');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'portfolio':
        return (
          <div className="animate-in fade-in duration-500">
            {/* Hero Section */}
            <section className="mb-20">
              <div className="max-w-4xl">
                <div className="flex items-center gap-6 mb-8">
                   <Logo className="w-24 h-24" />
                   <h1 className="text-6xl lg:text-8xl font-serif leading-none tracking-tight">
                    <span className="brand-green">GRADIENT</span> <br/>
                    <span className="brand-orange text-4xl lg:text-5xl uppercase tracking-[0.3em] font-sans font-bold">Energy Group</span>
                  </h1>
                </div>
                <p className="text-xl text-slate-400 leading-relaxed mb-8 max-w-2xl">
                  Strategic Diversification, Sustainable Growth, and Trusted Banking Partnerships. 
                  A diversified holding company driving excellence in high-growth physical and digital sectors.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="glass-panel px-6 py-4 rounded-2xl flex flex-col border-l-4 border-l-[#1a9e55]">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">FCY Mobilization</span>
                    <span className="text-2xl font-bold text-white">$4.5 Million</span>
                  </div>
                  <div className="glass-panel px-6 py-4 rounded-2xl flex flex-col border-l-4 border-l-[#e67e22]">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Operational Cities</span>
                    <span className="text-2xl font-bold text-white">12+ Cities</span>
                  </div>
                  <div className="glass-panel px-6 py-4 rounded-2xl flex flex-col border-l-4 border-l-[#1a9e55]">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Sector ROI Avg</span>
                    <span className="text-2xl font-bold text-white">72.4%</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Investment Sectors Grid */}
            <section className="mb-20">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Operational Footprints</h2>
                  <p className="text-slate-500 text-sm">Diversified sectors spanning Mining, Energy, Bitcoin, and Infrastructure</p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-full border border-green-500/20">Active Growth Mode</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {SECTORS.map((sector) => (
                  <SectorCard 
                    key={sector.id} 
                    sector={sector} 
                    isSelected={selectedSectorId === sector.id}
                    onClick={() => handleSectorCardClick(sector.id)}
                  />
                ))}
              </div>

              <SectorDeepDive sector={selectedSector} />
            </section>
          </div>
        );

      case 'sectors':
        return (
          <SectorsDetailView 
            selectedId={selectedSectorId} 
            onSelect={setSelectedSectorId}
            onAuditClick={() => setActiveTab('financials')} 
          />
        );

      case 'financials':
        return (
          <div className="animate-in fade-in duration-500 space-y-20">
            <section>
              <div className="mb-8">
                <h2 className="text-4xl font-serif mb-2 text-white">Financial Mobilization</h2>
                <p className="text-slate-500">Consolidated revenue streams and capital requirements across all holdings</p>
              </div>
              
              <FinancialDashboard />

              <div className="mt-12">
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-2">ROI Projection Estimator</h3>
                  <p className="text-slate-500 text-sm">Simulate your portfolio growth based on Gradient's project-specific ROI models</p>
                </div>
                <ProfitCalculator />
              </div>

              <div className="mt-12 glass-panel rounded-3xl overflow-hidden overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-800/50 border-b border-slate-700">
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Financing Need</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Project Name</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Required Capital</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Projected Return</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Priority</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {[
                      { need: 'Need A', name: 'Fincha Hydro Power Rehab', cap: 'ETB 480 Million', roi: '130%', status: 'High' },
                      { need: 'Need B', name: 'Bitcoin Mining Infra', cap: 'ETB 1.8 Billion', roi: '74%', status: 'Growth' },
                      { need: 'Need C', name: 'Lithium Mining Expansion', cap: 'ETB 240 Million', roi: '78%', status: 'Strategic' },
                      { need: 'Need D', name: 'Beryllium Mining Infra', cap: 'ETB 240 Billion', roi: '75%', status: 'Resource' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4 font-bold text-white">{row.need}</td>
                        <td className="px-6 py-4 text-slate-300">{row.name}</td>
                        <td className="px-6 py-4 brand-green font-semibold">{row.cap}</td>
                        <td className="px-6 py-4 text-white font-bold">{row.roi}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold rounded border border-green-500/20 uppercase">
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="pt-20 border-t border-slate-800/50">
               <AuditView />
            </section>
          </div>
        );

      case 'governance':
        return <GovernanceView />;

      case 'insights':
        return <InsightsDashboard />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-200 selection:bg-green-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b border-slate-800/50 h-20 px-6 lg:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('portfolio')}>
          <Logo className="w-12 h-12" />
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tighter text-white leading-none">GRADIENT</span>
            <span className="text-[10px] font-bold tracking-[0.2em] brand-orange uppercase">Energy Group</span>
          </div>
        </div>
        
        <div className="hidden md:flex gap-8 text-sm font-medium">
          {(['portfolio', 'sectors', 'financials', 'governance', 'insights'] as ViewTab[]).map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`transition-all duration-300 capitalize relative py-2 ${
                activeTab === tab ? 'text-green-400' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab === 'sectors' ? 'Sector Reports' : tab === 'financials' ? 'Banking & FCY' : tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 rounded-full animate-in fade-in zoom-in duration-300 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
              )}
            </button>
          ))}
        </div>

        <button className="bg-brand-orange text-white px-6 py-2.5 rounded-full text-sm font-bold hover:brightness-110 transition-all">
          Partner Login
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="pt-32 pb-20 px-6 lg:px-12 max-w-7xl mx-auto">
        {renderContent()}

        {/* Footer CTA */}
        <section className="mt-20 rounded-3xl bg-gradient-to-br from-[#064e3b] to-[#7c2d12] p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4">Let's Grow Together</h2>
          <p className="text-green-100 mb-8 max-w-xl mx-auto">
            Join Gradient Energy Group as a strategic banking or equity partner in our high-potential 
            ventures across East Africa's most promising sectors.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-green-900 px-8 py-3 rounded-full font-bold hover:shadow-xl hover:scale-105 transition-all">
              Join Our Venture
            </button>
            <button className="bg-brand-orange/20 border border-brand-orange/30 text-white px-8 py-3 rounded-full font-bold hover:bg-brand-orange/40 transition-all">
              View Growth Roadmap
            </button>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-slate-800/50 bg-[#020305]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <Logo className="w-8 h-8" />
            <span className="font-bold tracking-tight text-white uppercase">Gradient <span className="brand-orange">Energy Group</span></span>
          </div>
          <div className="text-slate-500 text-sm">
            © 2024 Gradient Energy Group. A Diversified Holding Company.
          </div>
          <div className="flex gap-6 text-slate-500 text-sm">
            <a href="#" className="hover:text-white transition-colors">Investors</a>
            <a href="#" className="hover:text-white transition-colors">Sustainability</a>
            <a href="#" className="hover:text-white transition-colors">Compliance</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
