
import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { SECTORS, HISTORICAL_PERFORMANCE, AUDIT_LOGS } from '../constants';
import { InvestmentSector } from '../types';

const AuditView: React.FC = () => {
  // Fix: Replaced InvestmentSector.Engineering (which doesn't exist) with InvestmentSector.Mining
  const [activeSector, setActiveSector] = useState<InvestmentSector>(InvestmentSector.Mining);
  const sectorData = SECTORS.find(s => s.id === activeSector)!;
  const performanceData = HISTORICAL_PERFORMANCE[activeSector];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-serif mb-2">Performance Audit Portal</h2>
          <p className="text-slate-400">Verified historical metrics and compliance logs</p>
        </div>
        
        <div className="flex bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 gap-1 overflow-x-auto max-w-full">
          {SECTORS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSector(s.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeSector === s.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Performance Chart */}
          <div className="glass-panel p-8 rounded-3xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8">
                <span className="text-4xl opacity-20">{sectorData.icon}</span>
             </div>
             <h3 className="text-xl font-bold mb-8 text-white">Verified Monthly ROI Trend (%)</h3>
             <div className="h-[350px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={performanceData}>
                   <defs>
                     <linearGradient id="colorRoi" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor={sectorData.color} stopOpacity={0.3}/>
                       <stop offset="95%" stopColor={sectorData.color} stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                   <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                   <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                   <Tooltip 
                     contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                     itemStyle={{ color: '#f8fafc' }}
                   />
                   <Area 
                     type="monotone" 
                     dataKey="roi" 
                     stroke={sectorData.color} 
                     fillOpacity={1} 
                     fill="url(#colorRoi)" 
                     strokeWidth={3}
                     name="Net ROI %"
                   />
                 </AreaChart>
               </ResponsiveContainer>
             </div>
          </div>

          {/* Key Performance Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Avg Volatility', value: '0.42%', change: '-0.05%' },
              { label: 'Sharpe Ratio', value: '2.84', change: '+0.12' },
              { label: 'Alpha Generated', value: '+4.2%', change: '+1.1%' },
              { label: 'Max Drawdown', value: '-2.1%', change: '0.00%' },
            ].map((kpi, i) => (
              <div key={i} className="glass-panel p-6 rounded-2xl border-slate-800/50">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{kpi.label}</p>
                <p className="text-xl font-bold text-white mb-2">{kpi.value}</p>
                <span className={`text-[10px] font-bold ${kpi.change.startsWith('+') ? 'text-green-400' : 'text-slate-400'}`}>
                  {kpi.change} vs Prev Q
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
           {/* Compliance Status */}
           <div className="glass-panel p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-6 text-white">Compliance Status</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Audit Status</span>
                  <span className="px-3 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold rounded-full border border-green-500/20">PASSED</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Next Review</span>
                  <span className="text-sm text-white font-medium">Aug 12, 2024</span>
                </div>
                <div className="h-px w-full bg-slate-800" />
                <div className="space-y-4">
                  <p className="text-xs font-bold text-slate-500 uppercase">Verification Certificates</p>
                  <div className="flex gap-2">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700">📜</div>
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700">📄</div>
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700">🔒</div>
                  </div>
                </div>
              </div>
           </div>

           {/* Sector Risk Breakdown */}
           <div className="glass-panel p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-6 text-white">Risk Profile</h3>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <XAxis dataKey="month" hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                    />
                    <Bar dataKey="volatility" fill="#ef4444" radius={[4, 4, 0, 0]} name="Volatility Index" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[10px] text-slate-500 mt-4 text-center">Relative monthly volatility audited via Lumina Oracle Systems</p>
           </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="glass-panel rounded-3xl overflow-hidden mb-12">
        <div className="px-8 py-6 border-b border-slate-800 flex justify-between items-center">
           <h3 className="text-xl font-bold text-white">Verification History</h3>
           <button className="text-xs font-bold text-blue-400 hover:text-blue-300 uppercase tracking-widest">Download Full Audit Log</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-800/30">
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Log ID</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verification Date</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Activity</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sector</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Auditor</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {AUDIT_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="px-8 py-4 text-xs font-mono text-slate-500">{log.id}</td>
                  <td className="px-8 py-4 text-xs text-slate-300">{log.date}</td>
                  <td className="px-8 py-4 text-xs font-bold text-white">{log.action}</td>
                  <td className="px-8 py-4 text-xs text-slate-400">{log.sector}</td>
                  <td className="px-8 py-4 text-xs text-slate-300">{log.verifiedBy}</td>
                  <td className="px-8 py-4">
                    <span className="px-2 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold rounded border border-green-500/20">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditView;
