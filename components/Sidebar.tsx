
import React from 'react';
import { NAV_ITEMS } from '../constants';
import { ViewState } from '../types';
import { Network, UserCheck } from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  return (
    <div className="w-64 h-full bg-slate-900 border-r border-slate-800 flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="bg-emerald-500/10 p-2 rounded-lg">
          <Network className="w-8 h-8 text-emerald-400" />
        </div>
        <div>
          <h1 className="font-bold text-lg text-white leading-tight">NetGenius AI</h1>
          <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest block mt-1">Enterprise Platform</span>
        </div>
      </div>
      
      <nav className="flex-1 mt-6 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as ViewState)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
              currentView === item.id
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
            }`}
          >
            <div className={`${currentView === item.id ? 'text-white' : 'text-slate-500'}`}>
              {/* Fix: specify the props type for cloneElement to allow className assignment */}
              {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: 'w-5 h-5' })}
            </div>
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-4">
        <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">SYSTEM STATUS</span>
          </div>
          <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest leading-relaxed">
            AI Nodes: Active<br/>
            NOC Sync: Online
          </p>
        </div>

        <div className="px-2">
          <div className="flex items-center gap-2 mb-1">
            <UserCheck className="w-3 h-3 text-slate-500" />
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Architect</span>
          </div>
          <p className="text-[10px] font-bold text-slate-200 leading-tight">Mr. Zeeshan Javed</p>
          <p className="text-[8px] text-slate-500 font-medium leading-tight mt-0.5">
            AI System Architect &<br/>Network Automation Specialist
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
