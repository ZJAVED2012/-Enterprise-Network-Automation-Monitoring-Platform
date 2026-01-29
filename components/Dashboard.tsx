
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Activity, 
  CheckCircle2, 
  Zap, 
  ShieldAlert, 
  History, 
  ShieldCheck, 
  Gauge,
  Globe,
  TrendingUp,
  Cpu,
  Server,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

const trafficData = [
  { time: '00:00', ingress: 400, egress: 240 },
  { time: '04:00', ingress: 300, egress: 139 },
  { time: '08:00', ingress: 1200, egress: 980 },
  { time: '12:00', ingress: 1500, egress: 1100 },
  { time: '16:00', ingress: 1100, egress: 800 },
  { time: '20:00', ingress: 600, egress: 450 },
  { time: '23:59', ingress: 450, egress: 300 },
];

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; color: string; subtitle?: string }> = ({ title, value, icon, color, subtitle }) => (
  <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-sm hover:border-slate-700 transition-all group overflow-hidden relative">
    <div className="absolute -right-4 -top-4 opacity-[0.03] scale-150 group-hover:scale-125 transition-transform duration-700">
      {icon}
    </div>
    <div className="flex justify-between items-start relative z-10">
      <div>
        <p className="text-slate-500 text-[10px] font-bold mb-1 uppercase tracking-widest">{title}</p>
        <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
        {subtitle && <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1 font-medium"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> {subtitle}</p>}
      </div>
      <div className={`${color} p-3 rounded-2xl shadow-inner group-hover:scale-110 transition-transform`}>{icon}</div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-16">
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-[9px] font-black text-emerald-500 uppercase tracking-widest">
               <div className={`w-1.5 h-1.5 bg-emerald-500 rounded-full ${pulse ? 'animate-ping' : ''}`}></div>
               COMMERCIAL EDITION V2.0 (STABLE)
             </div>
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Enterprise Core Licensed</span>
          </div>
          <h2 className="text-4xl font-black text-white tracking-tighter">Executive Dashboard</h2>
          <p className="text-slate-400 font-medium max-w-xl">Unified orchestration for national infrastructure, university campuses, and government ministries.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-blue-500/10 px-4 py-2 rounded-xl border border-blue-500/20">
            <Globe className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-[10px] font-bold uppercase tracking-wider">National Grid Sync</span>
          </div>
          <button className="px-5 py-2.5 bg-slate-800 text-slate-100 rounded-xl hover:bg-slate-700 transition-colors text-xs font-bold border border-slate-700 shadow-xl flex items-center gap-2">
            <History className="w-4 h-4 text-emerald-400" />
            NOC Audit Logs
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Platform Uptime" value="99.999%" icon={<Zap className="w-6 h-6 text-emerald-400" />} color="bg-emerald-400/10" subtitle="Tier-4 Data Center Ready" />
        <StatCard title="Active Managed Nodes" value="1,402" icon={<Globe className="w-6 h-6 text-blue-400" />} color="bg-blue-400/10" subtitle="Across 12 Regional Clusters" />
        <StatCard title="Security Violation (24h)" value="0" icon={<ShieldAlert className="w-6 h-6 text-emerald-400" />} color="bg-emerald-400/10" subtitle="NIST Compliance Policy: PASS" />
        <StatCard title="Efficiency Gains" value="+34.2%" icon={<TrendingUp className="w-6 h-6 text-purple-400" />} color="bg-purple-400/10" subtitle="AI-Driven Power Optimization" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.02]">
               <Activity className="w-32 h-32 text-white" />
            </div>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-bold text-white flex items-center gap-3">
                <Activity className="w-5 h-5 text-emerald-400" />
                Regional Traffic Load (Tbps)
              </h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Core Ingress</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-emerald-500 rounded-full border border-emerald-500/50"></span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">User Egress</span>
                </div>
              </div>
            </div>
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficData}>
                  <defs>
                    <linearGradient id="colorIngress" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorEgress" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="time" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)' }}
                    itemStyle={{ color: '#f8fafc', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="ingress" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorIngress)" />
                  <Area type="monotone" dataKey="egress" stroke="#10b981" strokeWidth={3} strokeDasharray="6 6" fill="url(#colorEgress)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Gauge className="w-4 h-4 text-emerald-400" /> Multi-Cloud Telemetry
              </h3>
              <div className="space-y-5">
                {[
                  { label: 'Azure ExpressRoute', value: 72, unit: '%' },
                  { label: 'AWS Transit Gateway', value: 45, unit: '%' },
                  { label: 'Local NOC Storage', value: 89, unit: '%' },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                      <span className="text-slate-500">{item.label}</span>
                      <span className="text-slate-200">{item.value}{item.unit}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-1000" style={{ width: `${item.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
               <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Server className="w-4 h-4 text-blue-400" /> Node Latency Map (ms)
                </h3>
                <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">Optimal</span>
               </div>
              <div className="space-y-4">
                {[
                  { site: 'ISB_Core_DC', val: 8 },
                  { site: 'LHR_Regional_NOC', val: 18 },
                  { site: 'KHI_Port_Cluster', val: 32 },
                ].map((site, i) => (
                  <div key={i} className="flex justify-between items-center py-2.5 border-b border-slate-800 last:border-0 group">
                    <span className="text-xs font-bold text-slate-300 group-hover:text-emerald-400 transition-colors">{site.site}</span>
                    <span className="text-xs font-mono font-bold text-blue-400">{site.val} ms</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-7 shadow-xl flex flex-col h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full"></div>
            <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-3 relative z-10">
              <ShieldAlert className="w-5 h-5 text-red-500" />
              NOC Sentinel Feed
            </h3>
            <div className="space-y-4 flex-1 relative z-10">
              {[
                { time: '14:20', event: 'BGP Route Optimization', node: 'ISB-GW-01', color: 'text-emerald-400', icon: <Cpu className="w-3 h-3" /> },
                { time: '14:05', event: 'Unusual Ingress Spike', node: 'KHI-SEC-04', color: 'text-amber-400', icon: <Activity className="w-3 h-3" /> },
                { time: '13:55', event: 'Audit Policy Triggered', node: 'GOV-SEC-01', color: 'text-blue-400', icon: <ShieldCheck className="w-3 h-3" /> },
                { time: '13:42', event: 'Node LHR-RT-01 Stable', node: 'OSPF Success', color: 'text-slate-400', icon: <CheckCircle2 className="w-3 h-3" /> },
              ].map((ev, i) => (
                <div key={i} className="p-3 bg-slate-950 border border-slate-800/50 rounded-2xl flex gap-3 group hover:border-slate-700 transition-all cursor-pointer">
                  <div className={`mt-1 p-1.5 rounded-lg bg-slate-900 ${ev.color}`}>{ev.icon}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                       <span className={`text-[10px] font-black uppercase tracking-widest ${ev.color}`}>{ev.event}</span>
                       <span className="text-[9px] font-mono text-slate-600">{ev.time}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold">Target: {ev.node}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-4 bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-inner">
              Global Event Archive
            </button>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 via-blue-700 to-indigo-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 group-hover:rotate-0 transition-transform">
               <Cpu className="w-24 h-24" />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100">AI Intelligence Core</span>
            </div>
            <h4 className="text-2xl font-black mb-3 tracking-tighter">Strategic Insight</h4>
            <p className="text-sm text-blue-100 mb-6 opacity-90 leading-relaxed italic border-l-2 border-amber-300 pl-4">
              "Anomalous jitter detected in Punjab branch cluster. Recommend activating SD-WAN path optimization to prevent video conferencing degradation."
            </p>
            <button className="w-full py-4 bg-white text-indigo-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:shadow-2xl hover:bg-slate-50 transition-all active:scale-95 shadow-xl shadow-indigo-500/30">
              Apply AI Fix
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
