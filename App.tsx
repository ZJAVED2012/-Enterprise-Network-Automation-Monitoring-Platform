
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
import Auth from './components/Auth';
import { ViewState, User } from './types';
import { Bell, Info, ShieldCheck, Globe, Zap, User as UserIcon, LogOut, Mic } from 'lucide-react';
import { TRANSLATIONS } from './constants';

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
    
    // Check for saved session
    const savedUser = localStorage.getItem('netgenius_session');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
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
      setHasKey(true);
    }
  };

  const isAuthorized = (view: ViewState): boolean => {
    if (!user) return false;
    if (user.role === 'Super Admin') return true;

    switch (view) {
      case 'architect':
      case 'deployment':
        return user.role === 'Network Admin';
      case 'compliance':
      case 'reports':
      case 'architecture':
        return user.role === 'Auditor' || user.role === 'Network Admin';
      case 'inventory':
      case 'ai_lab':
        return user.role !== 'Auditor';
      case 'dashboard':
      default:
        return true;
    }
  };

  const renderView = () => {
    if (!isAuthorized(currentView)) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in fade-in duration-500">
          <div className="bg-red-500/10 p-6 rounded-3xl border border-red-500/20">
            <Zap className="w-12 h-12 text-red-500 mb-4 mx-auto" />
            <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Access Denied</h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Your current role (<span className="text-red-400 font-bold uppercase">{user?.role}</span>) does not have sufficient clearance to access this module.
            </p>
          </div>
          <button 
            onClick={() => setCurrentView('dashboard')}
            className="px-6 py-3 bg-slate-900 border border-slate-800 text-slate-300 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all"
          >
            Return to Dashboard
          </button>
        </div>
      );
    }

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
      case 'compliance':
        return <Compliance />;
      case 'architecture':
        return <Architecture />;
      case 'roadmap':
        return <Roadmap />;
      case 'billing':
        return <Billing />;
      case 'settings':
        return (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold text-white mb-8">Platform Administration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <UserIcon className="w-4 h-4" /> Account Node
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-slate-800">
                    <span className="text-slate-500 text-sm">Identity</span>
                    <span className="text-slate-100 font-bold">{user?.name}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-800">
                    <span className="text-slate-500 text-sm">Permission Level</span>
                    <span className="text-emerald-400 font-bold uppercase text-[10px] tracking-widest">{user?.role}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-slate-500 text-sm">License Tier</span>
                    <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase rounded border border-emerald-500/20">Enterprise Pro v2.0</span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Zap className="w-4 h-4" /> AI Engine Core
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-slate-800">
                    <span className="text-slate-500 text-sm">Model Primary</span>
                    <span className="text-slate-100 font-bold font-mono text-xs">Gemini 3 Pro Stable</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-slate-500 text-sm">Visual Forensic</span>
                    <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Active (v2.5)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  if (!hasKey) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 p-12 rounded-3xl max-w-md w-full text-center space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
          <div className="bg-emerald-500/10 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
            <ShieldCheck className="w-12 h-12 text-emerald-400" />
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-white tracking-tight">Enterprise License Required</h2>
            <p className="text-slate-400 text-sm leading-relaxed px-4">
              To activate the <strong>NetGenius AI Enterprise Core</strong> and Tier-1 multi-modal modules, please select your authorized license key.
            </p>
          </div>
          <div className="space-y-4">
            <button 
              onClick={handleKeyActivation}
              className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-2xl transition-all shadow-xl shadow-emerald-500/20 active:scale-95 text-sm uppercase tracking-widest"
            >
              Verify System Key
            </button>
            <a 
              href="https://ai.google.dev/gemini-api/docs/billing" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[10px] font-bold text-slate-500 hover:text-emerald-400 uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
            >
              <Globe className="w-3 h-3" />
              Licensing Guidelines
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-slate-950 flex selection:bg-emerald-500/30 ${isUrdu ? 'rtl font-urdu text-right' : ''}`}>
      {/* Fixed: Pass isUrdu and onLanguageToggle props to Sidebar component */}
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        isUrdu={isUrdu} 
        onLanguageToggle={() => setIsUrdu(!isUrdu)} 
      />
      
      <main className={`flex-1 p-10 relative ${isUrdu ? 'mr-64' : 'ml-64'}`}>
        <div className="mb-10 flex items-center justify-between bg-emerald-500 text-slate-950 px-6 py-3 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="flex items-center gap-3">
            <Zap className="w-4 h-4 animate-bounce" />
            <span>{t.system_status}: NetGenius v2.0 Global Orchestrator Ready. All multi-modal nodes are stable.</span>
          </div>
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
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 border border-slate-700 flex items-center justify-center overflow-hidden shadow-xl group-hover:border-emerald-500/50 transition-all cursor-pointer">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}&backgroundColor=1e293b`} alt="User" />
                </div>
                <button 
                  onClick={handleLogout}
                  className="absolute -bottom-1 -right-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-slate-500 hover:text-red-400 transition-all shadow-lg"
                  title="Logout Session"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          {renderView()}
        </div>

        <AIChatbot />
        {isVoiceOpen && <VoiceNOC onClose={() => setIsVoiceOpen(false)} />}

        <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-emerald-500/[0.02] blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      </main>
    </div>
  );
};

export default App;
