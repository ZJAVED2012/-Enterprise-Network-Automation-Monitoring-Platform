
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
import Compliance from './components/Compliance';
import AIChatbot from './components/AIChatbot';
import VoiceNOC from './components/VoiceNOC';
import Billing from './components/Billing';
import WirelessPlanner from './components/WirelessPlanner';
import Auth from './components/Auth';
import { ViewState, User } from './types';
import { Bell, Info, ShieldCheck, Globe, Zap, User as UserIcon, LogOut, Mic } from 'lucide-react';
import { TRANSLATIONS } from './constants';
import { onKeyError } from './services/gemini';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [hasKey, setHasKey] = useState<boolean>(true);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isUrdu, setIsUrdu] = useState(false);

  useEffect(() => {
    const checkKeySelection = async () => {
      if (typeof (window as any).aistudio !== 'undefined' && (window as any).aistudio.hasSelectedApiKey) {
        const isSelected = await (window as any).aistudio.hasSelectedApiKey();
        setHasKey(isSelected);
      }
    };
    checkKeySelection();
    
    // Subscribe to key errors (403 Permission Denied / 404 Entity not found)
    const unsubscribe = onKeyError(() => {
      console.warn("API Auth Error detected. Resetting license state.");
      setHasKey(false);
    });

    const savedUser = localStorage.getItem('netgenius_session');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const t = isUrdu ? TRANSLATIONS.ur : TRANSLATIONS.en;

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('netgenius_session', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('netgenius_session');
    setCurrentView('dashboard');
  };

  const handleKeyActivation = async () => {
    if (typeof (window as any).aistudio !== 'undefined' && (window as any).aistudio.openSelectKey) {
      await (window as any).aistudio.openSelectKey();
      // Assume success and refresh state
      const isSelected = await (window as any).aistudio.hasSelectedApiKey();
      setHasKey(isSelected);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'architect': return <Architect />;
      case 'inventory': return <Inventory />;
      case 'deployment': return <Deployment />;
      case 'ai_lab': return <VisualAILab />;
      case 'reports': return <Reports />;
      case 'compliance': return <Compliance />;
      case 'architecture': return <Architecture />;
      case 'roadmap': return <Roadmap />;
      case 'billing': return <Billing />;
      case 'wireless_planner': return <WirelessPlanner />;
      case 'settings': return <div className="text-slate-400 p-10 bg-slate-900 border border-slate-800 rounded-3xl">Advanced Platform Settings Coming Soon. Current Build: v2.0.1 Enterprise.</div>;
      default: return <Dashboard />;
    }
  };

  if (!user) return <Auth onLogin={handleLogin} />;

  if (!hasKey) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 p-12 rounded-3xl max-w-md w-full text-center space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
          <div className="bg-emerald-500/10 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
            <ShieldCheck className="w-12 h-12 text-emerald-400" />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white tracking-tight">License Key Activation</h2>
            <p className="text-slate-400 text-sm leading-relaxed px-4">
              To activate the <strong>NetGenius AI Enterprise Core</strong> and Tier-1 multi-modal modules, please select your authorized Google Cloud API key.
            </p>
          </div>
          <div className="space-y-4">
            <button 
              onClick={handleKeyActivation} 
              className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-2xl shadow-xl shadow-emerald-500/20 uppercase tracking-widest text-xs transition-all active:scale-95"
            >
              Verify System Key
            </button>
            <p className="text-[9px] text-slate-600 uppercase font-bold">Billing must be enabled on the selected project for high-tier model access.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-slate-950 flex selection:bg-emerald-500/30 ${isUrdu ? 'rtl font-urdu text-right' : ''}`}>
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        isUrdu={isUrdu} 
        onLanguageToggle={() => setIsUrdu(!isUrdu)} 
      />
      
      <main className={`flex-1 p-10 relative ${isUrdu ? 'mr-64' : 'ml-64'}`}>
        <div className="mb-10 flex items-center justify-between bg-emerald-500 text-slate-950 px-6 py-3 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20">
          <div className="flex items-center gap-3">
            <Zap className="w-4 h-4 animate-bounce" />
            <span>{t.system_status}: NetGenius v2.0 Global Orchestrator Ready. Live Voice Node Active.</span>
          </div>
          {isUrdu && <span className="font-urdu text-[12px]">آپریشنل نوڈ آن لائن ہے</span>}
        </div>

        <div className={`flex justify-between items-center mb-10 pb-6 border-b border-slate-900/50 ${isUrdu ? 'flex-row-reverse' : ''}`}>
          <div className="flex items-center gap-4">
             <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-slate-500 text-xs font-bold flex items-center gap-2 uppercase tracking-widest">
                <Info className="w-4 h-4 text-emerald-400" />
                {t.node}: <span className="text-emerald-400 font-mono">SECURE_NOC_NODE_01</span>
             </div>
             <button onClick={() => setIsVoiceOpen(true)} className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-xl text-blue-400 text-[10px] font-bold uppercase hover:bg-blue-500/20 transition-all">
                <Mic className="w-4 h-4" />
                {isUrdu ? 'وائس اسسٹنٹ' : 'Live Voice Assistant'}
             </button>
          </div>
          
          <div className={`flex items-center gap-6 ${isUrdu ? 'flex-row-reverse' : ''}`}>
            <div className="relative group">
              <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 transition-all cursor-pointer">
                <Bell className="w-5 h-5 text-slate-400 group-hover:text-emerald-400" />
              </div>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-950 animate-pulse"></span>
            </div>
            <div className="h-8 w-[1px] bg-slate-800"></div>
            <div className={`flex items-center gap-4 group ${isUrdu ? 'flex-row-reverse' : ''}`}>
              <div className={isUrdu ? 'text-left' : 'text-right'}>
                <p className="text-sm font-bold text-slate-100 group-hover:text-emerald-400 transition-colors tracking-tight leading-none uppercase">{user.name}</p>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1.5">{user.role}</p>
              </div>
              <div className="relative">
                <div className="w-11 h-11 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden shadow-xl group-hover:border-emerald-500/50 transition-all">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}&backgroundColor=1e293b`} alt="User" />
                </div>
                <button onClick={handleLogout} className="absolute -bottom-1 -right-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-slate-500 hover:text-red-400 transition-all shadow-md"><LogOut className="w-3 h-3" /></button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10">{renderView()}</div>
        <AIChatbot />
        {isVoiceOpen && <VoiceNOC onClose={() => setIsVoiceOpen(false)} />}
      </main>
    </div>
  );
};

export default App;
