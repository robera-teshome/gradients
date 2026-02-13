
import React, { useState, useMemo } from 'react';
import { SECTORS } from '../constants';
import { InvestmentSector } from '../types';

interface ProfitCalculatorProps {
  fixedSectorId?: InvestmentSector;
  compact?: boolean;
}

const ProfitCalculator: React.FC<ProfitCalculatorProps> = ({ fixedSectorId, compact = false }) => {
  const [amount, setAmount] = useState<number>(100000);
  const [selectedId, setSelectedId] = useState<string>(fixedSectorId || 'balanced');

  const selectedSector = useMemo(() => {
    if (!fixedSectorId && selectedId === 'balanced') {
      const avgRoi = SECTORS.reduce((acc, s) => acc + s.projectedProfit, 0) / SECTORS.length;
      return { title: 'Balanced Portfolio', projectedProfit: avgRoi, color: '#6366f1' };
    }
    const idToFind = fixedSectorId || selectedId;
    return SECTORS.find(s => s.id === idToFind)!;
  }, [selectedId, fixedSectorId]);

  const calculateReturn = (years: number) => {
    const rate = selectedSector.projectedProfit / 100;
    const total = amount * Math.pow(1 + rate, years);
    const profit = total - amount;
    return {
      total: total.toLocaleString(undefined, { maximumFractionDigits: 0 }),
      profit: profit.toLocaleString(undefined, { maximumFractionDigits: 0 })
    };
  };

  const projections = [
    { label: '1 Year', years: 1, icon: '📈' },
    { label: '3 Years', years: 3, icon: '🚀' },
    { label: '5 Years', years: 5, icon: '💎' },
  ];

  return (
    <div className={`glass-panel rounded-3xl border-l-4 border-l-amber-500 overflow-hidden relative ${compact ? 'p-6' : 'p-8'}`}>
      <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19,3H5C3.89,3 3,3.9 3,5V19C3,20.1 3.89,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.9 20.1,3 19,3M19,19H5V5H19V19M11,7H13V9H11V7M11,11H13V13H11V11M11,15H13V17H11V15M7,7H9V9H7V7M7,11H9V13H7V11M7,15H9V17H7V15M15,7H17V9H15V7M15,11H17V13H15V11M15,15H17V17H15V15Z" />
        </svg>
      </div>

      <div className={`flex flex-col ${compact ? 'gap-6' : 'lg:flex-row gap-12 items-start'}`}>
        <div className={`w-full ${compact ? '' : 'lg:w-1/3'} space-y-6`}>
          <div>
            <h3 className={`${compact ? 'text-lg' : 'text-2xl'} font-bold text-white mb-2`}>
              {selectedSector.title} ROI Estimator
            </h3>
            <p className="text-slate-400 text-xs">Simulate returns based on {selectedSector.projectedProfit}% projected annual yield.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Principal Investment (USD)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">$</span>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-8 pr-3 text-white text-sm font-bold focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all"
                />
              </div>
            </div>

            {!fixedSectorId && (
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Strategy</label>
                <select 
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-3 text-white text-xs font-bold focus:outline-none transition-all appearance-none"
                >
                  <option value="balanced">Balanced Portfolio</option>
                  {SECTORS.map(s => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        <div className={`w-full ${compact ? '' : 'lg:w-2/3'}`}>
          <div className={`grid grid-cols-1 ${compact ? 'sm:grid-cols-3' : 'md:grid-cols-3'} gap-4`}>
            {projections.map((proj) => {
              const res = calculateReturn(proj.years);
              return (
                <div key={proj.label} className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl group hover:border-amber-500/30 transition-colors">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xl">{proj.icon}</span>
                    <span className="text-[9px] font-black uppercase text-slate-500">{proj.label}</span>
                  </div>
                  <div className="mb-2">
                    <p className="text-[9px] text-slate-500 uppercase mb-0.5">Profit</p>
                    <p className="text-lg font-bold text-green-400">+${res.profit}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-slate-500 uppercase mb-0.5">Value</p>
                    <p className="text-sm font-bold text-white">${res.total}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitCalculator;
