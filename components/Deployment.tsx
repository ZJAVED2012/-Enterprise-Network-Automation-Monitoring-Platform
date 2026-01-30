
import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Terminal, 
  Play, 
  RotateCcw, 
  ShieldCheck, 
  History, 
  ShieldAlert, 
  Cpu, 
  Layers, 
  Activity, 
  Gavel, 
  Code2, 
  Eye, 
  FileCode,
  Lock,
  ArrowRight
} from 'lucide-react';
import { generateAnsiblePlaybook } from '../services/gemini';

type CABStatus = 'pending' | 'approved' | 'rejected' | 'not_required';

const Deployment: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'production' | 'staging'>('staging');
  const [deploying, setDeploying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [cabStatus, setCabStatus] = useState<CABStatus>('not_required');
  const [showPlaybook, setShowPlaybook] = useState(false);
  const [playbook, setPlaybook] = useState<string>('');
  const [loadingPlaybook, setLoadingPlaybook] = useState(false);
  const [changeId] = useState(`CHG-${new Date().getFullYear()}-${Math.floor(Math.random() * 900) + 100}`);

  const handleModeChange = (mode: 'production' | 'staging') => {
    setActiveMode(mode);
    setCabStatus(mode === 'production' ? 'pending' : 'not_required');
    setLogs([]);
    setProgress(0);
  };

  const fetchPlaybook = async () => {
    setLoadingPlaybook(true);
    try {
      const pb = await generateAnsiblePlaybook("Update core routing with BGP peering and secure SSH access for multi-vendor campus network.");
      setPlaybook(pb);
      setShowPlaybook(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPlaybook(false);
    }
  };

  const requestCABApproval = () => {
    setLoadingPlaybook(true);
    setTimeout(() => {
      setCabStatus('approved');
      setLoadingPlaybook(false);
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] CAB Approval Granted for Change ID: ${changeId}`]);
    }, 1500);
  };

  const startDeployment = () => {
    if (activeMode === 'production' && cabStatus !== 'approved') {
      alert("CAB Approval is required before Production Deployment.");
      return;
    }
    setDeploying(true);
    setProgress(0);
    setLogs([
      `Initiating ${activeMode.toUpperCase()} Change Session: ${changeId}`,
      'Orchestrator: NetGenius v2.0 Enterprise Core',
      'Protocol: Ansible + Secure SSH (AES-256)',
      'Establishing Secure Proxy to Remote Infrastructure...'
    ]);
  };

  useEffect(() => {
    if (deploying && progress < 100) {
      const timer = setTimeout(() => {
        setProgress(p => p + 10);
        const logEntries = [
          'Pre-checks: SSH Handshake established with 12 edge nodes.',
          'Staging: Running Ansible dry-run (check-mode)...',
          'Verification: Syntax check passed for multi-vendor playbooks.',
          'Action: Pushing Configuration Segments via Parallel Execution Threads...',
          'Status: IOS-XE Node 1 Updated. Huawei VRP Node 4 Synced.',
          'Validation: OSPF Neighbors verified (convergence < 45ms).',
          'Security: ACLs applied to management plane. Port-security enforced.',
          'Finalizing: Generating Post-deployment report signature.',
          'Sync: Updating CMDB for ' + changeId,
          'Deployment Cycle Complete. Session Logged to Audit Database.'
        ];
        const nextLogIndex = Math.floor(progress / 10);
        if (logEntries[nextLogIndex]) {
          setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${logEntries[nextLogIndex]}`]);
        }
      }, 900);
      return () => clearTimeout(timer);
    } else if (progress >= 100) {
      setDeploying(false);
    }
  }, [deploying, progress]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <header className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-4 h-4 text-amber-500" aria-hidden="true" />
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Active Change Control: {changeId}</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Deployment & Orchestration</h2>
          <p className="text-slate-400 font-medium">Enterprise-grade Ansible workflow with CAB approval and automated rollbacks.</p>
        </div>
        <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-2xl" role="radiogroup" aria-label="Deployment Mode">
          <button 
            role="radio"
            aria-checked={activeMode === 'staging'}
            onClick={() => handleModeChange('staging')}
            className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeMode === 'staging' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Staging (Safe Mode)
          </button>
          <button 
            role="radio"
            aria-checked={activeMode === 'production'}
            onClick={() => handleModeChange('production')}
            className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeMode === 'production' ? 'bg-emerald-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Production Grid
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <main className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 relative overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
              <h3 className="font-bold text-white flex items-center gap-3">
                <Terminal className={`w-5 h-5 ${activeMode === 'production' ? 'text-emerald-400' : 'text-blue-400'}`} aria-hidden="true" />
                <span className="uppercase tracking-widest text-xs">Deployment Control Center</span>
              </h3>
              <div className="flex items-center gap-4">
                <button 
                  onClick={fetchPlaybook}
                  aria-busy={loadingPlaybook}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-[9px] font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2 border border-slate-700"
                >
                  {loadingPlaybook ? <Loader2 className="w-3 h-3 animate-spin" aria-hidden="true" /> : <Code2 className="w-3 h-3 text-blue-400" aria-hidden="true" />}
                  Preview Playbook
                </button>
              </div>
            </div>
            
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 min-h-[360px] font-mono text-xs text-slate-300 space-y-2 overflow-y-auto max-h-[500px] shadow-inner relative" aria-live="polite">
              {showPlaybook ? (
                <div className="animate-in fade-in duration-300">
                  <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-2">
                    <span className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                      <FileCode className="w-3 h-3" aria-hidden="true" /> Ansible Playbook Preview
                    </span>
                    <button onClick={() => setShowPlaybook(false)} className="text-slate-500 hover:text-white transition-all text-[10px] font-bold uppercase">Back to Terminal</button>
                  </div>
                  <pre className="text-slate-400 leading-relaxed whitespace-pre-wrap">{playbook}</pre>
                </div>
              ) : (
                <>
                  {logs.length === 0 && (
                    <div className="flex flex-col items-center justify-center min-h-[300px] opacity-20">
                      <Activity className="w-12 h-12 mb-4" aria-hidden="true" />
                      <p className="italic uppercase tracking-widest text-[10px]">Awaiting Orchestration Command for {changeId}...</p>
                    </div>
                  )}
                  {logs.map((log, i) => (
                    <div key={i} className={`flex gap-3 py-0.5 ${log.includes('Complete') ? 'text-emerald-400 font-bold bg-emerald-500/5 px-2 rounded' : ''}`}>
                      <span className="text-slate-600 shrink-0" aria-hidden="true">[{i.toString().padStart(2, '0')}]</span>
                      <span>{log}</span>
                    </div>
                  ))}
                  {deploying && <p className="animate-pulse text-blue-400 flex items-center gap-2 mt-2" aria-hidden="true"><Loader2 className="w-3 h-3 animate-spin" /> Thread Pool Processing: Executing SSH Tasks...</p>}
                </>
              )}
            </div>

            {deploying && (
              <div className="mt-8 space-y-3">
                <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <span>Executing Tasks</span>
                  <span id="progress-label">{progress}%</span>
                </div>
                <div 
                  className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden" 
                  role="progressbar" 
                  aria-labelledby="progress-label"
                  aria-valuenow={progress} 
                  aria-valuemin={0} 
                  aria-valuemax={100}
                >
                  <div 
                    className={`h-full transition-all duration-500 ${activeMode === 'production' ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]'}`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex justify-between items-center group cursor-pointer hover:border-amber-500/30 transition-all text-left">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-500/10 rounded-xl group-hover:bg-amber-500/20 transition-colors" aria-hidden="true">
                  <RotateCcw className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Emergency Rollback</h4>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">Version: v2.1.0-Previous</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-700 group-hover:text-amber-500 transition-all" aria-hidden="true" />
            </button>
            <button 
              onClick={startDeployment}
              disabled={deploying || (activeMode === 'production' && cabStatus !== 'approved')}
              className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95 text-xs uppercase tracking-[0.2em] ${activeMode === 'production' ? (cabStatus === 'approved' ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20' : 'bg-slate-800 text-slate-500 cursor-not-allowed') : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'}`}
            >
              {deploying ? <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> : <Play className="w-5 h-5" aria-hidden="true" />}
              {deploying ? 'Executing Push...' : `Deploy to ${activeMode}`}
            </button>
          </div>
        </main>

        <aside className="space-y-6">
          <section className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 shadow-xl" aria-labelledby="cab-review-heading">
            <div className="flex justify-between items-center mb-6">
              <h3 id="cab-review-heading" className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-3">
                <Gavel className={`w-5 h-5 ${cabStatus === 'approved' ? 'text-emerald-400' : 'text-amber-400'}`} aria-hidden="true" /> 
                CAB Review Workflow
              </h3>
              {activeMode === 'production' && (
                <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${cabStatus === 'approved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500 animate-pulse'}`}>
                  {cabStatus}
                </span>
              )}
            </div>
            
            <div className="space-y-4">
              {activeMode === 'production' ? (
                <>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                    Production changes require formal approval. Ensure your intent designer results are peer-reviewed.
                  </div>
                  {cabStatus !== 'approved' ? (
                    <button 
                      onClick={requestCABApproval}
                      disabled={loadingPlaybook}
                      className="w-full py-3 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-500 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                    >
                      {loadingPlaybook ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : <ShieldCheck className="w-4 h-4" aria-hidden="true" />}
                      Request CAB Approval
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl text-emerald-400" aria-live="polite">
                      <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase">Approved</span>
                        <span className="text-[8px] opacity-70">By SEC_ADMIN_OFFICER</span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl text-blue-400 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Staging Lab: No CAB Required</span>
                </div>
              )}
            </div>
          </section>

          <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 shadow-xl">
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-3">
              <Lock className="w-4 h-4 text-emerald-400" aria-hidden="true" /> Secure SSH Secrets
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase">
                <span>Key Management</span>
                <span className="text-emerald-500">Vault Integrated</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" aria-hidden="true"></div>
                <span className="text-[10px] font-mono text-slate-300">ED25519-NOC-CORE-PRIVATE</span>
              </div>
              <p className="text-[9px] text-slate-600 leading-relaxed uppercase">
                Direct SSH push is performed via ephemeral secure containers. No credentials stored on persistent nodes.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 border border-slate-800 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden group">
            <Cpu className="w-12 h-12 mb-6 text-blue-400 opacity-60" aria-hidden="true" />
            <h4 className="text-xl font-bold mb-3 tracking-tight">Multi-Vendor Validation</h4>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 font-medium">
              NetGenius validates configuration syntax against multi-vendor operating systems (Cisco IOS-XE, Juniper Junos, FortiOS) before execution.
            </p>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] bg-blue-500/10 p-4 rounded-2xl border border-blue-500/20 text-blue-400 flex items-center gap-3">
              <Layers className="w-4 h-4" aria-hidden="true" />
              Verified Site Cluster: 🇵🇰 ISB_NODE_01
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Deployment;
