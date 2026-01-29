
import React, { useState, useEffect } from 'react';
import { Rocket, CheckCircle2, AlertCircle, Loader2, Terminal, Play, RotateCcw, ShieldCheck, History } from 'lucide-react';

const Deployment: React.FC = () => {
  const [deploying, setDeploying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const startDeployment = () => {
    setDeploying(true);
    setProgress(0);
    setLogs(['Initiating AI-Driven ZTP Engine...', 'Establishing Secure SSH/API Channels...']);
  };

  useEffect(() => {
    if (deploying && progress < 100) {
      const timer = setTimeout(() => {
        setProgress(p => p + 10);
        const logEntries = [
          'Pre-checks successful: No conflicts detected.',
          'Backing up existing configurations...',
          'Pushing VLAN/Routing Segment 1...',
          'Verifying OSPF Neighbor relationships...',
          'Applying SNMPv3 AES encryption...',
          'Updating local discovery database...',
          'Verifying policy compliance...',
          'Deployment finalized. Syncing with NOC.'
        ];
        const nextLogIndex = Math.floor(progress / 10);
        if (logEntries[nextLogIndex]) {
          setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${logEntries[nextLogIndex]}`]);
        }
      }, 800);
      return () => clearTimeout(timer);
    } else if (progress >= 100) {
      setDeploying(false);
    }
  }, [deploying, progress]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Deployment Manager</h2>
          <p className="text-slate-400">One-click Zero-Touch Provisioning (ZTP) & Ansible orchestration.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 text-slate-400 rounded-xl font-bold border border-slate-700">
            <History className="w-4 h-4" />
            Config History
          </button>
          <button 
            onClick={startDeployment}
            disabled={deploying}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-800 text-white rounded-xl font-bold transition-all shadow-xl shadow-emerald-500/20"
          >
            {deploying ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
            {deploying ? 'Deploying...' : 'Deploy Production Config'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-white flex items-center gap-2 uppercase tracking-widest text-xs">
                <Terminal className="w-4 h-4 text-emerald-400" />
                Live Execution Console
              </h3>
              <span className="text-xs font-mono text-slate-500">Node: NETGEN-AI-DEPLOY-01</span>
            </div>
            
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 min-h-[300px] font-mono text-xs text-slate-300 space-y-2 overflow-y-auto max-h-[400px]">
              {logs.length === 0 && <p className="text-slate-600 italic">No active deployment session.</p>}
              {logs.map((log, i) => (
                <p key={i} className={log.includes('finalized') ? 'text-emerald-400 font-bold' : ''}>{log}</p>
              ))}
              {deploying && <p className="animate-pulse text-blue-400">Processing...</p>}
            </div>

            {deploying && (
              <div className="mt-8 space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-500/10 rounded-xl">
                <RotateCcw className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h4 className="font-bold text-white">Emergency Rollback</h4>
                <p className="text-sm text-slate-400">Revert all devices to last known-good state (v1.3.2)</p>
              </div>
            </div>
            <button className="px-6 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/20 rounded-xl font-bold text-xs uppercase tracking-widest transition-all">
              Initiate Rollback
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Pre-Flight Checks
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Device Connectivity', ok: true },
                { label: 'Auth & Privileges', ok: true },
                { label: 'Config Validation', ok: true },
                { label: 'Resource Check', ok: true },
                { label: 'Audit Log Ready', ok: true }
              ].map((check, i) => (
                <div key={i} className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">{check.label}</span>
                  {check.ok ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-red-500" />}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-600 to-blue-700 rounded-3xl p-8 text-white shadow-2xl">
            <Rocket className="w-12 h-12 mb-6 opacity-40" />
            <h4 className="text-xl font-bold mb-2">Zero-Touch Engine</h4>
            <p className="text-sm text-emerald-100 opacity-80 leading-relaxed mb-6">
              Our AI ZTP orchestrator enables massive parallel configuration of 100+ devices in minutes.
            </p>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] bg-white/10 p-3 rounded-xl border border-white/10">
              Active Mode: Production
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deployment;
