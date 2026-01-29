
import React, { useState } from 'react';
import { Wifi, Radio, Users, ShieldCheck, Map, Search, Loader2, Sparkles, Zap, Maximize2, Info } from 'lucide-react';

const WirelessPlanner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [areaSize, setAreaSize] = useState('5000');
  const [userCount, setUserCount] = useState('500');
  const [result, setResult] = useState<any>(null);

  const calculatePlan = () => {
    setLoading(true);
    setTimeout(() => {
      setResult({
        apCount: Math.ceil(parseInt(userCount) / 50),
        frequency: "Dual-Band WiFi-6E (6GHz)",
        coverage: "98.2%",
        recommendation: "High-density deployment with load-balancing enabled."
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Wireless Capacity Planner</h2>
          <p className="text-slate-400">Project high-density WiFi coverage for Auditoriums, Campuses, and Ministry Offices.</p>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 px-5 py-2 rounded-xl text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
          <Radio className="w-4 h-4 animate-pulse" />
          Spectral Analysis: Active
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <Wifi className="w-32 h-32 text-white" />
          </div>
          
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-3">
            <Maximize2 className="w-4 h-4 text-emerald-400" />
            Environment Specifications
          </h3>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Floor Area (Sq. Ft)</label>
              <input 
                type="number" 
                value={areaSize}
                onChange={e => setAreaSize(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/40" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Concurrent Users</label>
              <input 
                type="number" 
                value={userCount}
                onChange={e => setUserCount(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/40" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Environment Type</label>
            <select className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-500/40">
              <option>University Auditorium (High Density)</option>
              <option>Open Campus / Ground</option>
              <option>Multi-Story Govt Office</option>
              <option>Data Center Row</option>
            </select>
          </div>

          <button 
            onClick={calculatePlan}
            disabled={loading}
            className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 rounded-2xl font-bold text-slate-950 text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3 transition-all"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            Generate AI Spectral Plan
          </button>
        </div>

        <div className="space-y-8">
          {result ? (
            <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 shadow-2xl animate-in zoom-in-95 duration-500">
               <div className="flex justify-between items-center mb-10 pb-4 border-b border-slate-800">
                 <h3 className="text-white font-bold flex items-center gap-3">
                   <Zap className="w-5 h-5 text-amber-400" />
                   AI Coverage Result
                 </h3>
                 <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Optimal Design</span>
               </div>

               <div className="grid grid-cols-2 gap-4 mb-8">
                 <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800">
                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Recommended APs</p>
                   <p className="text-3xl font-bold text-white tracking-tight">{result.apCount}</p>
                 </div>
                 <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800">
                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Frequency Node</p>
                   <p className="text-sm font-bold text-blue-400">WiFi-6E (6GHz Ready)</p>
                 </div>
               </div>

               <div className="p-6 bg-slate-950 rounded-3xl border border-slate-800 mb-8">
                  <p className="text-xs font-medium text-slate-300 leading-relaxed italic">
                    "AI Analysis: For {userCount} concurrent users in a {areaSize} sq. ft auditorium, {result.apCount} Tri-band access points are required to avoid spectral collision. Recommend using 160MHz channel width on 6GHz for backhaul."
                  </p>
               </div>

               <button className="w-full py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl text-white font-bold text-[10px] uppercase tracking-widest border border-slate-700 flex items-center justify-center gap-3">
                  <Search className="w-4 h-4" />
                  Request Full Heatmap (AI Lab)
               </button>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 min-h-[400px] flex flex-col items-center justify-center text-center opacity-30">
               <Map className="w-16 h-16 mb-4 text-slate-700" />
               <p className="text-lg font-bold text-slate-400">Plan Buffer Empty</p>
               <p className="text-xs max-w-[250px] mt-2 leading-relaxed text-slate-500 font-medium">Input your environment specs to project hardware requirements for high-density wireless zones.</p>
            </div>
          )}

          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 flex gap-4">
            <Info className="w-6 h-6 text-emerald-500 shrink-0" />
            <div className="space-y-1">
              <h4 className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Enterprise Tip</h4>
              <p className="text-[10px] text-slate-400 leading-relaxed uppercase">High-density deployments require WPA3-Enterprise (802.1X) for university radius integration. NetGenius AI automatically generates these security policies.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WirelessPlanner;
