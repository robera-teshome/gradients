
import React, { useEffect, useState } from 'react';
import { SectorData, AIAnalysisResponse } from '../types';
import { getPortfolioInsights } from '../services/geminiService';

interface SectorDeepDiveProps {
  sector: SectorData;
}

const SectorDeepDive: React.FC<SectorDeepDiveProps> = ({ sector }) => {
  const [insight, setInsight] = useState<AIAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInsight = async () => {
      setLoading(true);
      const data = await getPortfolioInsights([sector.id]);
      setInsight(data);
      setLoading(false);
    };
    fetchInsight();
  }, [sector]);

  return (
    <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-panel rounded-3xl p-8 relative overflow-hidden">
          <div 
            className="absolute top-0 right-0 w-64 h-64 blur-3xl opacity-10 rounded-full"
            style={{ backgroundColor: sector.color }}
          />
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-4">
            <span className="text-4xl">{sector.icon}</span>
            {sector.title} Strategy
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            {sector.fullDetail}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Financing Need', value: sector.financials.financingNeed || 'N/A' },
              { label: 'Market Outlook', value: 'High Growth' },
              { label: 'Target Yield', value: `+${sector.projectedProfit}%` },
              { label: 'Status', value: 'Scalable' }
            ].map((stat, i) => (
              <div key={i} className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
                <p className="text-[10px] uppercase text-slate-500 font-bold mb-1">{stat.label}</p>
                <p className="text-sm font-bold text-white line-clamp-1">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-8 border-green-900/20">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="text-green-500">🤖</span>
            AI Portfolio Advisor
          </h3>
          
          {loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-4 bg-slate-700 rounded w-3/4"></div>
              <div className="h-4 bg-slate-700 rounded w-full"></div>
              <div className="h-4 bg-slate-700 rounded w-5/6"></div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Market Sentiment</p>
                <p className="text-sm text-slate-300 italic">"{insight?.executiveSummary}"</p>
              </div>
              
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Growth Levers</p>
                <ul className="space-y-2">
                  {insight?.recommendations.map((rec, i) => (
                    <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-green-900/10 rounded-lg border border-green-900/20">
                <p className="text-[10px] font-bold text-green-400 uppercase tracking-widest mb-1">Asset Verification</p>
                <p className="text-xs text-green-200/70">Verified reliable supplier of FCY with low-risk credit history.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectorDeepDive;
