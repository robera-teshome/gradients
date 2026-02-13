
import React from 'react';
import { SectorData } from '../types';

interface SectorCardProps {
  sector: SectorData;
  isSelected: boolean;
  onClick: () => void;
}

const SectorCard: React.FC<SectorCardProps> = ({ sector, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative p-6 rounded-2xl text-left transition-all duration-300 group ${
        isSelected 
          ? 'ring-2 ring-blue-500 scale-[1.02] bg-slate-800/80 shadow-2xl shadow-blue-900/20' 
          : 'bg-slate-900/50 hover:bg-slate-800/60 border border-slate-800 hover:border-slate-700'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-4xl filter group-hover:scale-110 transition-transform">
          {sector.icon}
        </span>
        <div className={`px-2 py-1 rounded text-xs font-bold ${
          sector.marketTrend === 'up' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
        }`}>
          {sector.marketTrend === 'up' ? '↑ GAINING' : '→ STABLE'}
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-2 text-slate-100">{sector.title}</h3>
      <p className="text-sm text-slate-400 mb-6 line-clamp-2">
        {sector.description}
      </p>
      
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Projected ROI</p>
          <p className="text-2xl font-bold text-white">+{sector.projectedProfit}%</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Portfolio Share</p>
          <p className="text-lg font-medium text-slate-300">{sector.allocation}%</p>
        </div>
      </div>

      <div 
        className="absolute bottom-0 left-0 h-1 transition-all duration-300 rounded-full" 
        style={{ width: isSelected ? '100%' : '0%', backgroundColor: sector.color }}
      />
    </button>
  );
};

export default SectorCard;
