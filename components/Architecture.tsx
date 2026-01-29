
import React from 'react';
import { Database, Code2, ShieldCheck, Share2, Layers, Cpu, Server, Key, Network, Globe } from 'lucide-react';

const Architecture: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Technical System Architecture</h2>
          <p className="text-slate-400">Deep-dive into the NetGenius backend, ER diagrams, and automation logic.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs font-bold text-emerald-400 flex items-center gap-2 uppercase tracking-widest">
            <Globe className="w-4 h-4" />
            Air-Gap Ready (ISO Version)
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 text-slate-200 rounded-xl font-bold border border-slate-700 hover:bg-slate-700 transition-all text-xs uppercase tracking-widest">
            <Share2 className="w-4 h-4" />
            Export Schema
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500"></div>
            <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-3">
              <Layers className="w-5 h-5 text-blue-400" />
              Entity Relationship (ER) Diagram
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              {/* Connector lines (simplified visual representation) */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-32 bg-slate-800 hidden md:block"></div>
              
              {/* Table User */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-lg hover:border-blue-500/50 transition-all group">
                <div className="bg-blue-500/10 px-4 py-2 border-b border-slate-800 flex justify-between">
                  <span className="text-xs font-bold text-blue-400 font-mono">users</span>
                  <Key className="w-3 h-3 text-blue-400" />
                </div>
                <div className="p-4 space-y-2 font-mono text-[10px]">
                  <div className="flex justify-between"><span className="text-slate-100 font-bold">id</span> <span className="text-slate-600">UUID (PK)</span></div>
                  <div className="flex justify-between"><span className="text-slate-100">name</span> <span className="text-slate-600">VARCHAR</span></div>
                  <div className="flex justify-between"><span className="text-slate-100">email</span> <span className="text-slate-600">VARCHAR (UNIQUE)</span></div>
                  <div className="flex justify-between"><span className="text-slate-100">role</span> <span className="text-slate-600">ENUM (Admin, NOC, Auditor)</span></div>
                  <div className="flex justify-between"><span className="text-slate-100">status</span> <span className="text-slate-600">BOOLEAN</span></div>
                </div>
              </div>

              {/* Table Devices */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-lg hover:border-emerald-500/50 transition-all">
                <div className="bg-emerald-500/10 px-4 py-2 border-b border-slate-800 flex justify-between">
                  <span className="text-xs font-bold text-emerald-400 font-mono">devices</span>
                  <Key className="w-3 h-3 text-emerald-400" />
                </div>
                <div className="p-4 space-y-2 font-mono text-[10px]">
                  <div className="flex justify-between"><span className="text-slate-100 font-bold">id</span> <span className="text-slate-600">UUID (PK)</span></div>
                  <div className="flex justify-between"><span className="text-slate-100">hostname</span> <span className="text-slate-600">VARCHAR</span></div>
                  <div className="flex justify-between"><span className="text-slate-100">ip_address</span> <span className="text-slate-600">INET</span></div>
                  <div className="flex justify-between"><span className="text-slate-100">vendor</span> <span className="text-slate-600">ENUM</span></div>
                  <div className="flex justify-between"><span className="text-slate-100">site_id</span> <span className="text-slate-600">UUID (FK)</span></div>
                </div>
              </div>

              {/* Table Sites */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-lg hover:border-purple-500/50 transition-all">
                <div className="bg-purple-500/10 px-4 py-2 border-b border-slate-800 flex justify-between">
                  <span className="text-xs font-bold text-purple-400 font-mono">sites</span>
                  <Key className="w-3 h-3 text-purple-400" />
                </div>
                <div className="p-4 space-y-2 font-mono text-[10px]">
                  <div className="flex justify-between"><span className="text-slate-100 font-bold">id</span> <span className="text-slate-600">UUID (PK)</span></div>
                  <div className="flex justify-between"><span className="text-slate-100">name</span> <span className="text-slate-600">VARCHAR</span></div>
                  <div className="flex justify-between"><span className="text-slate-100">location</span> <span className="text-slate-600">VARCHAR</span></div>
                  <div className="flex justify-between"><span className="text-slate-100">isp_primary</span> <span className="text-slate-600">VARCHAR</span></div>
                </div>
              </div>

              {/* Table Audit Logs */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-lg hover:border-red-500/50 transition-all border-dashed">
                <div className="bg-red-500/10 px-4 py-2 border-b border-slate-800 flex justify-between">
                  <span className="text-xs font-bold text-red-400 font-mono text-shadow-sm">audit_logs (Govt Core)</span>
                  <ShieldCheck className="w-3 h-3 text-red-400" />
                </div>
                <div className="p-4 space-y-2 font-mono text-[10px]">
                  <div className="flex justify-between"><span className="text-slate-100 font-bold">id</span> <span className="text-slate-600">UUID (PK)</span></div>
                  <div className="flex justify-between"><span className="text-slate-100">user_id</span> <span className="text-slate-600">UUID (FK)</span></div>
                  <div className="flex justify-between"><span className="text-slate-100">action</span> <span className="text-slate-600">TEXT</span></div>
                  <div className="flex justify-between"><span className="text-slate-100">target_id</span> <span className="text-slate-600">UUID</span></div>
                  <div className="flex justify-between"><span className="text-slate-100">timestamp</span> <span className="text-slate-600">TIMESTAMPTZ</span></div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-slate-950/50 rounded-xl border border-slate-800 text-xs text-slate-500 leading-relaxed italic">
              AI Logic Engine interacts with 'configurations' and 'devices' to ensure consistency. Audit logs are immutable and air-gap compatible.
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-3">
              <Code2 className="w-5 h-5 text-emerald-400" />
              Core API Flow (v1 - Sellable MVP)
            </h3>
            <div className="space-y-4">
              {[
                { method: 'GET', path: '/api/v1/infrastructure/discovery', desc: 'Auto-detect vendor devices using SNMP/LLDP' },
                { method: 'POST', path: '/api/v1/ai/generate-config', desc: 'Gemini-powered intent-to-CLI translation' },
                { method: 'POST', path: '/api/v1/deploy/push', desc: 'Trigger Ansible-orchestrated configuration push' },
                { method: 'GET', path: '/api/v1/monitor/live', desc: 'Stream live telemetry data (Prometheus/Grafana)' },
                { method: 'GET', path: '/api/v1/reports/audit', desc: 'Generate immutable Govt-grade audit PDF' },
              ].map((api, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-slate-950 rounded-xl border border-slate-800 group hover:border-emerald-500/30 transition-all">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold font-mono min-w-[50px] text-center ${
                    api.method === 'GET' ? 'bg-blue-500/20 text-blue-400' :
                    api.method === 'POST' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-purple-500/20 text-purple-400'
                  }`}>
                    {api.method}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-mono text-slate-200 group-hover:text-white">{api.path}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5 font-medium">{api.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Cpu className="w-4 h-4" /> Production Tech Stack
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Frontend UI', val: 'React 19 + Tailwind', color: 'text-blue-400' },
                { label: 'SaaS Backend', val: 'FastAPI (Python)', color: 'text-emerald-400' },
                { label: 'AI Brain', val: 'Gemini 3 Pro', color: 'text-purple-400' },
                { label: 'Automation Engine', val: 'Ansible / Netmiko', color: 'text-amber-400' },
                { label: 'Storage Layer', val: 'PostgreSQL + Redis', color: 'text-indigo-400' },
                { label: 'NOC Telemetry', val: 'Prometheus Stack', color: 'text-red-400' },
              ].map((tech, i) => (
                <div key={i} className="flex justify-between items-center py-2.5 border-b border-slate-800 last:border-0 group">
                  <span className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">{tech.label}</span>
                  <span className={`text-xs font-bold ${tech.color}`}>{tech.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
            <Server className="w-12 h-12 mb-6 text-emerald-400 opacity-60" />
            <h4 className="text-xl font-bold mb-3 tracking-tight">Pakistan Local Advantage</h4>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              No permanent foreign cloud dependency. Fully air-gapped deployment for local high-security data centers.
            </p>
            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 mb-6">
               <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1">Deployment Mode</p>
               <p className="text-xs text-white font-mono">ON-PREM ISO AVAILABLE</p>
            </div>
            <button className="w-full py-3 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-widest hover:shadow-xl transition-all active:scale-95">
              Request On-Prem Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Architecture;
