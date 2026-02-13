
import React, { useEffect, useState } from 'react';
import { GlobalMarketInsights } from '../types';
import { getGlobalMarketOutlook } from '../services/geminiService';

const InsightsDashboard: React.FC = () => {
  const [data, setData] = useState<GlobalMarketInsights | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const res = await getGlobalMarketOutlook();
      setData(res);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div>
          <h2 className="text-4xl font-serif mb-2">Strategic Insights</h2>
          <p className="text-slate-400">AI-Powered Macro Analysis for Institutional Partners</p>
        </div>
        <div className="px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center gap-2">
          <span className="animate-pulse w-2 h-2 rounded-full bg-amber-500"></span>
          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Live Engine</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
            <h3 className="text-xl font-bold mb-4 text-white">2024 Global Macro Outlook</h3>
            {loading ? (
              <div className="space-y-3">
                <div className="h-4 bg-slate-800 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-slate-800 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-slate-800 rounded w-4/5 animate-pulse"></div>
              </div>
            ) : (
              <p className="text-slate-300 leading-relaxed text-lg italic">
                "{data?.marketOutlook}"
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="glass-panel p-6 rounded-3xl">
                <h4 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-6">Top Alpha Opportunities</h4>
                {loading ? (
                  <div className="space-y-4">
                    <div className="h-10 bg-slate-800 rounded animate-pulse"></div>
                    <div className="h-10 bg-slate-800 rounded animate-pulse"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {data?.topOpportunities.map((op, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-2xl border border-slate-700/50">
                        <span className="text-2xl">📈</span>
                        <span className="text-slate-200 font-medium">{op}</span>
                      </div>
                    ))}
                  </div>
                )}
             </div>
             
             <div className="glass-panel p-6 rounded-3xl bg-red-900/5 border-red-900/10">
                <h4 className="text-sm font-bold text-red-400 uppercase tracking-widest mb-6">Systemic Macro Risks</h4>
                {loading ? (
                  <div className="h-20 bg-slate-800 rounded animate-pulse"></div>
                ) : (
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {data?.macroRisks}
                  </p>
                )}
             </div>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-3xl">
          <h3 className="text-xl font-bold mb-6 text-white">Market Sentiment</h3>
          <div className="space-y-8">
            {[
              { label: 'Infra Demand', val: 88, color: '#3b82f6' },
              { label: 'BTC Adoption', val: 72, color: '#f59e0b' },
              { label: 'Mining CapEx', val: 45, color: '#10b981' },
              { label: 'RE Yields', val: 64, color: '#8b5cf6' }
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-xs mb-2">
                  <span className="font-bold text-slate-400 uppercase">{s.label}</span>
                  <span className="text-white">{s.val}% Bullish</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ width: `${s.val}%`, backgroundColor: s.color }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-4 bg-slate-800/40 rounded-2xl border border-slate-700 text-center">
             <p className="text-[10px] text-slate-500 uppercase font-bold mb-2">Portfolio Correlation</p>
             <p className="text-2xl font-bold text-white">0.42 <span className="text-xs text-slate-500 font-normal">/ 1.0</span></p>
             <p className="text-[10px] text-slate-600">Highly Diversified Architecture</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsDashboard;
