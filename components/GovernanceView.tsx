
import React from 'react';

const GovernanceView: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-4xl mb-12">
        <h2 className="text-4xl font-serif mb-6">Corporate Governance & Ethics</h2>
        <p className="text-slate-400 text-lg">
          Lumina Capital is committed to the highest standards of transparency, integrity, and accountability. 
          Our governance framework ensures sustainable value creation for our global partners.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="glass-panel p-8 rounded-3xl border-l-4 border-l-blue-500">
          <h3 className="text-xl font-bold mb-4 text-white">Board of Directors</h3>
          <div className="space-y-6">
            {[
              { name: 'Dr. Sarah Chen', role: 'Executive Chairwoman', desc: 'Former World Bank Lead Strategist' },
              { name: 'Marcus Thorne', role: 'Chief Risk Officer', desc: '25 years in Alternative Asset Management' },
              { name: 'Elena Rodriguez', role: 'Head of ESG Governance', desc: 'Pioneer in Sustainable Infrastructure' }
            ].map((member, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-bold text-slate-100">{member.name}</span>
                <span className="text-xs text-blue-400 uppercase tracking-widest mb-1">{member.role}</span>
                <span className="text-sm text-slate-500">{member.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-8 rounded-3xl border-l-4 border-l-emerald-500">
          <h3 className="text-xl font-bold mb-4 text-white">ESG Commitment</h3>
          <p className="text-slate-400 text-sm mb-6">
            Our 2024 ESG roadmap targets carbon-neutral mining operations and the integration of sustainable power 
            in all engineering projects.
          </p>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-xl">
              <span className="text-sm text-slate-200">Environmental Score</span>
              <span className="text-emerald-400 font-bold">AAA</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-xl">
              <span className="text-sm text-slate-200">Social Responsibility</span>
              <span className="text-blue-400 font-bold">Top 5%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-xl">
              <span className="text-sm text-slate-200">Audit Compliance</span>
              <span className="text-white font-bold">100%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel p-8 rounded-3xl mb-12">
        <h3 className="text-xl font-bold mb-6 text-white text-center">Regulatory Frameworks</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {['SEC Compliance', 'FINMA Regulated', 'ESG-III Certified', 'ISO 27001'].map((cert) => (
            <div key={cert} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                <span className="text-lg">🛡️</span>
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase text-center">{cert}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GovernanceView;
