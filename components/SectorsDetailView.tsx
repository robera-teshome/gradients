
import React from 'react';
import { SECTORS, HISTORICAL_PERFORMANCE } from '../constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { InvestmentSector } from '../types';
import ProfitCalculator from './ProfitCalculator';

interface SectorsDetailViewProps {
  selectedId: InvestmentSector;
  onSelect: (id: InvestmentSector) => void;
  onAuditClick: () => void;
}

const SectorsDetailView: React.FC<SectorsDetailViewProps> = ({ selectedId, onSelect, onAuditClick }) => {
  const currentSector = SECTORS.find(s => s.id === selectedId) || SECTORS[0];
  const performanceData = HISTORICAL_PERFORMANCE[currentSector.id];

  // Mock quarterly data based on sector's annual figures for the ledger
  const segmentReports = [
    { q: 'Q3 2024', rev: `$${(parseFloat(currentSector.financials.revenue.replace('$', '')) / 4).toFixed(1)}M`, prof: `$${(parseFloat(currentSector.financials.profit.replace('$', '')) / 4).toFixed(1)}M`, status: 'Audited' },
    { q: 'Q2 2024', rev: `$${(parseFloat(currentSector.financials.revenue.replace('$', '')) / 4.2).toFixed(1)}M`, prof: `$${(parseFloat(currentSector.financials.profit.replace('$', '')) / 4.2).toFixed(1)}M`, status: 'Audited' },
    { q: 'Q1 2024', rev: `$${(parseFloat(currentSector.financials.revenue.replace('$', '')) / 4.5).toFixed(1)}M`, prof: `$${(parseFloat(currentSector.financials.profit.replace('$', '')) / 4.5).toFixed(1)}M`, status: 'Audited' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12">
      {/* Navigation for Sectors */}
      <div className="flex bg-slate-900/40 p-1.5 rounded-2xl border border-slate-800 gap-1 overflow-x-auto">
        {SECTORS.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              selectedId === s.id 
                ? 'bg-white text-black shadow-lg' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-12">
          {/* Hero Identity */}
          <div className="flex items-center gap-6">
            <span className="text-7xl filter drop-shadow-2xl">{currentSector.icon}</span>
            <div>
              <h2 className="text-5xl font-serif text-white mb-2">{currentSector.title}</h2>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Allocation: {currentSector.allocation}%</p>
              </div>
            </div>
          </div>

          {/* Overview & High-level metrics */}
          <div className="glass-panel rounded-3xl p-8 relative overflow-hidden border-slate-700/50">
            <div 
              className="absolute -top-24 -right-24 w-64 h-64 blur-[100px] opacity-20 rounded-full"
              style={{ backgroundColor: currentSector.color }}
            />
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-6">Vertical Overview</h3>
            <p className="text-xl text-slate-200 leading-relaxed font-light italic mb-8">
              "{currentSector.fullDetail}"
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { label: 'Market Cap', value: currentSector.financials.valuation },
                { label: 'Annual Revenue', value: currentSector.financials.revenue },
                { label: 'Growth rate', value: currentSector.financials.growth },
                { label: 'Risk Profile', value: 'Moderate' }
              ].map((item, i) => (
                <div key={i} className="bg-slate-800/20 p-4 rounded-2xl border border-slate-700/30">
                  <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">{item.label}</p>
                  <p className="text-lg font-bold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ROI Analytics Chart */}
          <div className="glass-panel rounded-3xl p-8 border-slate-700/50">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em]">6-Month ROI Analytics</h3>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="w-3 h-0.5" style={{ backgroundColor: currentSector.color }}></span>
                    Net Yield %
                 </div>
              </div>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id={`colorValue-${currentSector.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={currentSector.color} stopOpacity={0.4}/>
                      <stop offset="95%" stopColor={currentSector.color} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="month" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="roi" 
                    stroke={currentSector.color} 
                    fillOpacity={1} 
                    fill={`url(#colorValue-${currentSector.id})`} 
                    strokeWidth={4}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Segment ROI Estimator */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-white">Projected Wealth Growth</h3>
              <div className="h-px flex-1 bg-slate-800"></div>
            </div>
            <ProfitCalculator fixedSectorId={currentSector.id} compact={true} />
          </section>

          {/* Segment Financial Report Table */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Segment Financial Ledger</h3>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">USD Millions</span>
            </div>
            <div className="glass-panel rounded-2xl overflow-hidden border-slate-700/50">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-800/40 border-b border-slate-800">
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Reporting Period</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Segment Revenue</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Segment Profit</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {segmentReports.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-800/20 transition-colors">
                      <td className="px-6 py-4 text-xs font-bold text-white">{row.q}</td>
                      <td className="px-6 py-4 text-xs text-slate-300">{row.rev}</td>
                      <td className="px-6 py-4 text-xs text-green-400 font-semibold">{row.prof}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-[9px] font-bold rounded border border-green-500/20">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Sidebar / Strategic Summary */}
        <div className="space-y-8">
           <div className="glass-panel rounded-3xl p-8 border-slate-700/50 bg-gradient-to-br from-slate-900/60 to-transparent">
              <h3 className="text-xl font-bold text-white mb-6">Financial Summary</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-slate-800 pb-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Target Annual Profit</p>
                    <p className="text-4xl font-bold text-green-400">+{currentSector.projectedProfit}%</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-1 rounded font-black border border-green-500/20 uppercase tracking-tighter">OUTPERFORM</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4 pt-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Segment Profit (LTM)</span>
                    <span className="text-white font-bold">{currentSector.financials.profit}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Revenue Contribution</span>
                    <span className="text-white font-bold">{currentSector.financials.revenue}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Asset Backing</span>
                    <span className="text-white font-bold">Tangible / Diversified</span>
                  </div>
                </div>

                <div className="pt-6 space-y-3">
                  <button className="w-full bg-white text-black text-xs font-bold py-3.5 rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                    Official Report PDF
                    <span className="text-sm">📊</span>
                  </button>
                  <button 
                    onClick={onAuditClick}
                    className="w-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold py-3.5 rounded-xl hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                  >
                    Verification Portal
                    <span className="text-sm">🛡️</span>
                  </button>
                </div>
              </div>
           </div>

           <div className="glass-panel rounded-3xl p-8 border-slate-700/50">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Strategic Outlook</h3>
              <ul className="space-y-4">
                {[
                  "Proprietary cost optimization engine",
                  "Market-first strategic advantages",
                  "Institutional-grade asset verification",
                  "Resilient 10-year growth roadmap"
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="text-blue-500 mt-1">•</span>
                    {point}
                  </li>
                ))}
              </ul>
           </div>

           <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">Investor Notice</p>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Audited financials for {currentSector.title} are updated bi-weekly. Private placement memorandum available upon request for accredited investors.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SectorsDetailView;
