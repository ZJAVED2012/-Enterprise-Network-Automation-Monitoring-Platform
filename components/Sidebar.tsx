
import React from 'react';
import { NAV_ITEMS, TRANSLATIONS } from '../constants';
import { ViewState } from '../types';
import { Network, ShieldCheck, Languages } from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
  isUrdu: boolean;
  onLanguageToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, isUrdu, onLanguageToggle }) => {
  const t = isUrdu ? TRANSLATIONS.ur : TRANSLATIONS.en;

  return (
    <nav className="w-64 h-full bg-slate-900 border-r border-slate-800 flex flex-col fixed left-0 top-0 z-50" aria-label="Main Navigation">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="bg-emerald-500/10 p-2 rounded-lg" aria-hidden="true">
          <Network className="w-8 h-8 text-emerald-400" />
        </div>
        <div>
          <h1 className="font-bold text-lg text-white leading-tight">NetGenius AI</h1>
          <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest block mt-1">Enterprise Platform</span>
        </div>
      </div>
      
      <div className="flex-1 mt-6 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as ViewState)}
            aria-current={currentView === item.id ? 'page' : undefined}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
              currentView === item.id
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
            }`}
          >
            <div className={`${currentView === item.id ? 'text-white' : 'text-slate-500'}`} aria-hidden="true">
              {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: 'w-5 h-5' })}
            </div>
            <span className={`font-medium text-sm ${isUrdu ? 'font-urdu' : ''}`}>
              {(t as any)[item.id] || item.label}
            </span>
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-slate-800 space-y-5 bg-slate-950/20">
        <button 
          onClick={onLanguageToggle}
          aria-label={isUrdu ? "Switch to English" : "Switch to Urdu"}
          className="w-full flex items-center justify-center gap-2 py-2 bg-slate-800/50 border border-slate-700/30 rounded-xl text-[10px] font-bold text-slate-400 hover:text-white transition-all"
        >
          <Languages className="w-4 h-4 text-blue-400" aria-hidden="true" />
          {isUrdu ? "English Mode" : "Urdu Mode / اردو"}
        </button>

        <div className="px-2 pt-2 border-t border-slate-800/50">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500/80" aria-hidden="true" />
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Platform Architect</span>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-extrabold text-slate-100 tracking-tight">{t.credit.split(':')[0]}:</p>
            <p className="text-[13px] font-black text-emerald-400 leading-none">Mr. Zeeshan Javed</p>
            <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider mt-1.5 leading-tight">
              AI System Architect &<br/>Network Automation Specialist
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
