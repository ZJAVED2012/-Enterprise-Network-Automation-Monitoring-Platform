
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Architect from './components/Architect';
import Inventory from './components/Inventory';
import Reports from './components/Reports';
import Architecture from './components/Architecture';
import Roadmap from './components/Roadmap';
import Deployment from './components/Deployment';
import VisualAILab from './components/VisualAILab';
import AIChatbot from './components/AIChatbot';
import { ViewState } from './types';
import { Bell, Info, ShieldCheck, Globe, Zap, User } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [hasKey, setHasKey] = useState<boolean>(true); // Initial state assumes access, validated by check

  useEffect(() => {
    // Guidelines mandate API key selection for Pro series models
    const checkKeySelection = async () => {
      if (typeof (window as any).aistudio !== 'undefined' && (window as any).aistudio.hasSelectedApiKey) {
        const isSelected = await (window as any).aistudio.hasSelectedApiKey();
        setHasKey(isSelected);
      }
    };
    checkKeySelection();
  }, []);

  const handleKeyActivation = async () => {
    if (typeof (window as any).aistudio !== 'undefined' && (window as any).aistudio.openSelectKey) {
      await (window as any).aistudio.openSelectKey();
      // Proceed immediately to application state to avoid race conditions
      setHasKey(true);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'architect':
        return <Architect />;
      case 'inventory':
        return <Inventory />;
      case 'deployment':
        return <Deployment />;
      case 'ai_lab':
        return <VisualAILab />;
      case 'reports':
        return <Reports />;
      case 'architecture':
        return <Architecture />;
      case 'roadmap':
        return <Roadmap />;
      case 'settings':
        return (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold text-white mb-8">Platform Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <User className="w-4 h-4" /> Account Information
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-slate-800">
                    <span className="text-slate-500 text-sm">Organization</span>
                    <span className="text-slate-100 font-bold">University Block A</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-800">
                    <span className="text-slate-500 text-sm">License Tier</span>
                    <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase rounded border border-emerald-500/20">Enterprise Pro</span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Zap className="w-4 h-4" /> AI Integration
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-slate-800">
                    <span className="text-slate-500 text-sm">LLM Engine</span>
                    <span className="text-slate-100 font-bold font-mono">Gemini 3 Pro</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-slate-500 text-sm">Low-Latency Mode</span>
                    <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Active (Flash-Lite)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'compliance':
        return (
          <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
             <div className="flex justify-between items-center">
                <div>
                   <h2 className="text-3xl font-bold text-white mb-2">Compliance & Security Hub</h2>
                   <p className="text-slate-400">Automated policy audits for NIST 800-53, ISO 27001, and University Standards.</p>
                </div>
                <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl font-bold text-sm">
                   Overall Health: 94.2% (Pass)
                </div>
             </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  // Block application access until a valid license key is selected via internal bridge
  if (!hasKey) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 p-12 rounded-3xl max-w-md w-full text-center space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
          <div className="bg-emerald-500/10 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
            <ShieldCheck className="w-12 h-12 text-emerald-400" />
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-white tracking-tight">Pro License Required</h2>
            <p className="text-slate-400 text-sm leading-relaxed px-2">
              To utilize the multi-modal NetGenius Pro engine and visual lab, activate your session with a paid GCP API key.
            </p>
          </div>
          <div className="space-y-4">
            <button 
              onClick={handleKeyActivation}
              className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-2xl transition-all shadow-xl shadow-emerald-500/20 active:scale-95 text-sm uppercase tracking-widest"
            >
              Select Paid API Key
            </button>
            <a 
              href="https://ai.google.dev/gemini-api/docs/billing" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[10px] font-bold text-slate-500 hover:text-emerald-400 uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
            >
              <Globe className="w-3 h-3" />
              View Billing Guidelines
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex selection:bg-emerald-500/30">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-1 ml-64 p-10 relative">
        <div className="mb-8 flex items-center justify-between bg-emerald-500 text-slate-950 px-6 py-2.5 rounded-2xl font-bold text-xs uppercase tracking-widest animate-pulse shadow-lg shadow-emerald-500/20 group cursor-pointer transition-transform hover:scale-[1.005]">
          <div className="flex items-center gap-3">
            <Zap className="w-4 h-4 animate-bounce" />
            <span className="opacity-90">Commercial Engine Update:</span>
            <span className="bg-slate-950 text-emerald-400 px-2 py-0.5 rounded text-[10px]">v3.5 Multi-Modal</span>
            Nano Banana & Pro Image Engines are now ONLINE.
          </div>
        </div>

        <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-900/50">
          <div className="flex items-center gap-4">
             <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-slate-500 text-xs font-bold flex items-center gap-2 uppercase tracking-tighter">
                <Info className="w-4 h-4 text-emerald-400" />
                Context: <span className="text-emerald-400 font-mono">NETGEN_PRO_MULTI_MODAL</span>
             </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 transition-all">
                <Bell className="w-5 h-5 text-slate-400 cursor-pointer group-hover:text-emerald-400" />
              </div>
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-950"></span>
            </div>
            
            <div className="h-8 w-[1px] bg-slate-800"></div>
            
            <div className="flex items-center gap-4 cursor-pointer group">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-100 group-hover:text-emerald-400 transition-colors tracking-tight">Dr. Sarah Ahmad</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mt-1">Chief Architect / Admin</p>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center text-white font-bold border-2 border-slate-900 shadow-xl overflow-hidden group-hover:scale-105 transition-transform">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah`} alt="Avatar" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          {renderView()}
        </div>

        <AIChatbot />

        <div className="fixed top-0 right-0 w-[700px] h-[700px] bg-emerald-500/[0.03] blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      </main>
    </div>
  );
};

export default App;
