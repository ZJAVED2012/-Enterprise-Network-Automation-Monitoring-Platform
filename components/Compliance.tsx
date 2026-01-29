
import React from 'react';
import { ShieldCheck, Lock, Globe, Activity, CheckCircle2, AlertTriangle, FileCheck, ShieldAlert, Search } from 'lucide-react';

const Compliance: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Compliance & Security Hub</h2>
          <p className="text-slate-400">Automated policy audits for NIST 800-53, ISO 27001, and PTA/PEC standards.</p>
        </div>
        <div className="px-6 py-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl font-bold text-sm flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 shadow-[0_0_15px_rgba(16,185,129,0.3)]" />
          System Security Posture: 94.2% (Tier-1 Pass)
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'NIST 800-53', score: 91, status: 'Compliant', icon: <Lock className="w-5 h-5 text-blue-400" /> },
          { title: 'ISO 27001', score: 96, status: 'Compliant', icon: <ShieldCheck className="w-5 h-5 text-emerald-400" /> },
          { title: 'Local PTA Regs', score: 100, status: 'Compliant', icon: <Globe className="w-5 h-5 text-purple-400" /> }
        ].map((card, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:scale-125 transition-transform duration-700">
              {card.icon}
            </div>
            <div className="flex justify-between items-center mb-4">
              <div className="p-2.5 bg-slate-800 rounded-xl">{card.icon}</div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest px-2 py-1 bg-emerald-500/10 rounded">{card.status}</span>
            </div>
            <h4 className="text-white font-bold mb-4">{card.title}</h4>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: `${card.score}%` }}></div>
            </div>
            <div className="flex justify-between items-center mt-3">
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Index: {card.score}/100</p>
              <FileCheck className="w-4 h-4 text-slate-700" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="px-8 py-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Live Security Violation Feed</h3>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold text-slate-500 uppercase">Scanner: Active</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-900/50">
                <th className="px-8 py-5">Vulnerability Class</th>
                <th className="px-8 py-5">Origin Node</th>
                <th className="px-8 py-5">Severity Index</th>
                <th className="px-8 py-5">Audit Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-xs">
              {[
                { type: 'Telnet Enabled (v1)', node: 'ISB-ACCESS-SW-04', sev: 'Critical', action: 'Auto-Disabled', color: 'text-red-400' },
                { type: 'Default SNMP Community', node: 'LHR-CORE-RT-01', sev: 'Medium', action: 'Flagged/Encrypted', color: 'text-amber-400' },
                { type: 'SSH Root Access', node: 'KHI-SEC-FW-02', sev: 'High', action: 'Restricted to NOC', color: 'text-orange-400' },
                { type: 'Unsigned Firmware', node: 'WIFI-WLC-01', sev: 'Low', action: 'Update Queued', color: 'text-blue-400' },
              ].map((row, i) => (
                <tr key={i} className="group hover:bg-slate-800/30 transition-colors">
                  <td className="px-8 py-4 text-slate-200 font-mono tracking-tight">{row.type}</td>
                  <td className="px-8 py-4 text-slate-400">{row.node}</td>
                  <td className="px-8 py-4">
                    <span className={`${row.color} font-bold uppercase tracking-tighter bg-${row.color.split('-')[1]}-500/10 px-2 py-0.5 rounded`}>
                      {row.sev}
                    </span>
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {row.action}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 border border-slate-800 p-10 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl">
        <div className="space-y-4 max-w-xl">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-indigo-400" />
            Automated Audit Readiness
          </h3>
          <p className="text-slate-400 leading-relaxed text-sm">
            NetGenius AI continuously maps configuration states against the <strong>ISO 27001</strong> framework. Generate institution-wide audit reports for Vice Chancellors or Directors in seconds.
          </p>
        </div>
        <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-indigo-600/20 active:scale-95 flex items-center gap-3 whitespace-nowrap">
          <Search className="w-5 h-5" />
          Request Full Compliance Scan
        </button>
      </div>
    </div>
  );
};

export default Compliance;
