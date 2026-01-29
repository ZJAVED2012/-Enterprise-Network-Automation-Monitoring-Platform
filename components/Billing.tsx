
import React from 'react';
import { CreditCard, ShieldCheck, Zap, Globe, Download, CheckCircle2, AlertTriangle, Briefcase } from 'lucide-react';

const Billing: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Enterprise Licensing</h2>
          <p className="text-slate-400">Manage institutional subscriptions and AI node usage.</p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 px-5 py-2.5 rounded-xl text-emerald-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          License Status: Valid
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Briefcase className="w-32 h-32 text-white" />
            </div>
            <div className="flex justify-between items-start mb-10 relative z-10">
              <div>
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.2em] bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Active Plan</span>
                <h3 className="text-3xl font-black text-white mt-4">NetGenius Enterprise Pro</h3>
                <p className="text-slate-500 text-sm mt-2">Unlimited Node Support | Government Tier Support</p>
              </div>
              <div className="text-right">
                <p className="text-slate-400 text-[10px] font-bold uppercase">Next Renewal</p>
                <p className="text-xl font-bold text-white">Dec 12, 2025</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              {[
                { label: 'Managed Nodes', val: '1,402 / 5,000' },
                { label: 'AI Token Quota', val: '8.2M / 10M' },
                { label: 'Cloud Storage', val: '452GB / 1TB' }
              ].map((stat, i) => (
                <div key={i} className="bg-slate-950/50 border border-slate-800 p-5 rounded-2xl">
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-lg font-bold text-white">{stat.val}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2">
              <Download className="w-4 h-4" /> Billing History
            </h3>
            <div className="space-y-4">
              {[
                { inv: 'INV-2024-001', date: 'Oct 01, 2024', status: 'Paid', amt: 'PKR 1,250,000' },
                { inv: 'INV-2023-012', date: 'Sep 01, 2023', status: 'Paid', amt: 'PKR 1,250,000' },
              ].map((inv, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-slate-950 border border-slate-800 rounded-2xl group hover:border-emerald-500/30 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-slate-900 rounded-lg"><CreditCard className="w-4 h-4 text-slate-500" /></div>
                    <div>
                      <p className="text-xs font-bold text-slate-200">{inv.inv}</p>
                      <p className="text-[10px] text-slate-500">{inv.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-white">{inv.amt}</p>
                    <span className="text-[9px] font-bold text-emerald-500 uppercase">Success</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 border border-slate-800 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10"><Zap className="w-12 h-12" /></div>
             <h4 className="text-xl font-bold mb-4 tracking-tight">Technical Credit</h4>
             <div className="space-y-4">
               <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                 <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Lead Architect</p>
                 <p className="text-sm font-bold text-white">Mr. Zeeshan Javed</p>
                 <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">Network Automation Expert</p>
               </div>
               <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                 <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">System Support</p>
                 <p className="text-sm font-bold text-white">24/7 National NOC</p>
                 <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">+92-XXX-XXXXXXX</p>
               </div>
             </div>
             <button className="w-full mt-6 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold text-xs uppercase tracking-widest transition-all">
                Upgrade Capacity
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
