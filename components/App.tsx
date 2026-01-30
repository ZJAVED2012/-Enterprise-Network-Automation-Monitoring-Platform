
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
import { Bell, Info, ShieldCheck, Globe, Zap, User as UserIcon, LogOut, Mic, AlertCircle } from 'lucide-react';
import { TRANSLATIONS } from './constants';
import { onKeyError } from '../services/gemini';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isUrdu, setIsUrdu] = useState(false);
  const [apiStatus, setApiStatus] = useState<'verified' | 'simulation'>('simulation');

  useEffect(() => {
    const checkKeySelection = async () => {
      if (typeof (window as any).aistudio !== 'undefined' && (window as any).aistudio.hasSelectedApiKey) {
        const isSelected = await (window as any).aistudio.hasSelectedApiKey();
        if (isSelected) setApiStatus('verified');
      }
    };
    checkKeySelection();
    
    // If an API error occurs, we gracefully stay in simulation mode instead of locking the app
    const unsubscribe = onKeyError(() => {
      setApiStatus('simulation');
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
      case 'settings': return <div className="text-slate-400 p-10 bg-slate-900 border border-slate-800 rounded-3xl font-mono text-sm">/sys/settings: Platform configuration modules are currently locked for SuperAdmin roles only. Current Build: v2.0.1 Enterprise.</div>;
      default: return <Dashboard />;
    }
  };

  if (!user) return <Auth onLogin={handleLogin} />;

  return (
    <div className={`min-h-screen bg-slate-950 flex selection:bg-emerald-500/30 ${isUrdu ? 'rtl font-urdu text-right' : ''}`}>
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        isUrdu={isUrdu} 
        onLanguageToggle={() => setIsUrdu(!isUrdu)} 
      />
      
      <main className={`flex-1 p-10 relative ${isUrdu ? 'mr-64' : 'ml-64'}`}>
        <div className={`mb-10 flex items-center justify-between px-6 py-3 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] shadow-lg transition-all ${apiStatus === 'verified' ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/20' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
          <div className="flex items-center gap-3">
            <Zap className={`w-4 h-4 ${apiStatus === 'verified' ? 'animate-bounce' : ''}`} />
            <span>
              {t.system_status}: NetGenius v2.0 Global Orchestrator Ready. 
              {apiStatus === 'simulation' ? " [SIMULATION MODE - NO KEY DETECTED]" : " [LIVE NODE ACTIVE]"}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {apiStatus === 'simulation' && (
              <div className="flex items-center gap-1.5 text-amber-500 font-black">
                <AlertCircle className="w-3.5 h-3.5" />
                DEMO ONLY
              </div>
            )}
            {isUrdu && <span className="font-urdu text-[12px]">آپریشنل نوڈ آن لائن ہے</span>}
          </div>
        </div>

        <div className={`flex justify-between items-center mb-10 pb-6 border-b border-slate-900/50 ${isUrdu ? 'flex-row-reverse' : ''}`}>
          <div className="flex items-center gap-4">
             <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-slate-500 text-xs font-bold flex items-center gap-2 uppercase tracking-widest">
                <Info className="w-4 h-4 text-emerald-400" />
                {t.node}: <span className="text-emerald-400 font-mono uppercase">Node_Pak_01</span>
             </div>
             <button onClick={() => setIsVoiceOpen(true)} className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-xl text-blue-400 text-[10px] font-bold uppercase hover:bg-blue-500/20 transition-all">
                <Mic className="w-4 h-4" />
                {isUrdu ? 'وائس اسسٹنٹ' : 'Voice Assistant'}
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
