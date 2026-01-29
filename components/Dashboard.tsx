import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Cpu, 
  Database, 
  Network, 
  Zap, 
  ShieldAlert, 
  History, 
  ShieldCheck, 
  Search, 
  ListFilter, 
  Terminal,
  Gauge,
  Wifi,
  Thermometer,
  Lock,
  Globe,
  TrendingUp
} from 'lucide-react';
import { MOCK_DEVICES } from '../constants';

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
  <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm hover:border-slate-700 transition-all group overflow-hidden relative">
    <div className="absolute -right-4 -top-4 opacity-[0.03] scale-150 group-hover:scale-125 transition-transform duration-700">
      {icon}
    </div>
    <div className="flex justify-between items-start relative z-10">
      <div>
        <p className="text-slate-500 text-[10px] font-bold mb-1 uppercase tracking-widest">{title}</p>
        <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
        {subtitle && <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1 font-medium"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> {subtitle}</p>}
      </div>
      <div className={`${color} p-3 rounded-xl shadow-inner`}>{icon}</div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-16">
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 mb-2">
             <Globe className="w-4 h-4 text-emerald-400" />
             <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em]">NetGenius AI – Enterprise Network Automation & Monitoring Platform</span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Executive Dashboard & Live NOC</h2>
          <p className="text-slate-400 font-medium italic">Strategic infrastructure overview and SLA monitoring powered by Enterprise Core v2.0.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">National Security Aligned 🇵🇰</span>
          </div>
          <button className="px-5 py-2.5 bg-slate-800 text-slate-100 rounded-xl hover:bg-slate-700 transition-colors text-sm font-bold border border-slate-700 shadow-xl flex items-center gap-2">
            <History className="w-4 h-4" />
            Audit Logs
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Network Availability" value="99.98%" icon={<Zap className="w-6 h-6 text-emerald-400" />} color="bg-emerald-400/10" subtitle="Last 30 Days (SLA Met)" />
        <StatCard title="Total Sites" value="04" icon={<Globe className="w-6 h-6 text-blue-400" />} color="bg-blue-400/10" subtitle="Islamabad, Lahore, Karachi, Hybrid" />
        <StatCard title="SLA Breaches" value="0" icon={<ShieldAlert className="w-6 h-6 text-emerald-400" />} color="bg-emerald-400/10" subtitle="Critical Incidents: 0" />
        <StatCard title="SaaS Optimization" value="15.4%" icon={<TrendingUp className="w-6 h-6 text-purple-400" />} color="bg-purple-400/10" subtitle="Resource Cost Reduction" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
               <Activity className="w-12 h-12 text-slate-800/30" />
            </div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
              Real-time Throughput (Gbps)
            </h3>
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficData}>
                  <defs>
                    <linearGradient id="colorIngress" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="time" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#f8fafc', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="ingress" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorIngress)" />
                  <Area type="monotone" dataKey="egress" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-emerald-400" /> Operational Metrics
                </h3>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 rounded-md border border-emerald-500/20">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest">v3 AES SECURE</span>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'CPU Utilization', value: 72, threshold: 85, unit: '%' },
                  { label: 'Core RAM Use', value: 45, threshold: 80, unit: '%' },
                  { label: 'Primary ISP Load', value: 89, threshold: 90, unit: '%' },
                  { label: 'Policy Sync Level', value: 100, threshold: 100, unit: '%' },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                      <span className="text-slate-500">{item.label}</span>
                      <span className={item.value > item.threshold ? 'text-red-400' : 'text-slate-300'}>
                        {item.value}{item.unit}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          item.value >= item.threshold ? 'bg-red-500' : 
                          item.value > item.threshold * 0.8 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.min(100, (item.value / item.threshold) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Wifi className="w-4 h-4 text-blue-400" /> Global Branch Latency
              </h3>
              <div className="space-y-4">
                {[
                  { site: 'Main Campus', val: 12, status: 'Optimal' },
                  { site: 'DR Site (Karachi)', val: 24, status: 'Optimal' },
                  { site: 'Regional (Lahore)', val: 18, status: 'Optimal' },
                  { site: 'Quetta Branch', val: 156, status: 'Degraded' },
                ].map((site, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-slate-800 last:border-0">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-200">{site.site}</span>
                      <span className="text-[10px] text-slate-500 font-medium">Link: Fiber-P2P</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-slate-200">{site.val} ms</span>
                      <p className={`text-[8px] font-bold uppercase tracking-widest ${
                        site.status === 'Optimal' ? 'text-emerald-400' : 'text-amber-400'
                      }`}>{site.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
              <Database className="w-5 h-5 text-blue-400" />
              Critical Asset Health
            </h3>
            <div className="space-y-6">
              {MOCK_DEVICES.slice(0, 4).map((device) => (
                <div key={device.id} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-200 tracking-tight">{device.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{device.ipAddress}</span>
                    </div>
                    <span className={`font-mono text-xs font-bold px-2 py-1 rounded-md ${device.healthScore > 90 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                      {device.healthScore}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${device.healthScore > 90 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'}`}
                      style={{ width: `${device.healthScore}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all text-xs font-bold uppercase tracking-widest border border-slate-700">Go to Asset Manager</button>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-emerald-600 rounded-2xl p-6 text-white shadow-2xl relative overflow-hidden group border border-white/10">
            <div className="absolute top-0 right-0 p-4 rotate-12 group-hover:rotate-0 transition-transform duration-500">
               <Zap className="w-20 h-20 text-white/10" />
            </div>
            <h4 className="text-lg font-bold mb-2 tracking-tight">AI Optimization Suggestion</h4>
            <p className="text-sm text-indigo-100 mb-6 opacity-80 leading-relaxed">Redundant OSPF routes detected in Seg-C. Consolidating could save 12% CPU overhead and improve convergence time.</p>
            <button className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold text-sm hover:shadow-xl transition-all active:scale-95">Optimize Seg-C Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;