
import React from 'react';
import { CalendarDays, CheckCircle2, Circle, Clock, Rocket, Zap, Users, Code } from 'lucide-react';

const Roadmap: React.FC = () => {
  const milestones = [
    { 
      week: 'Week 1', 
      title: 'Core Foundation', 
      tasks: ['Database Schema Design', 'Multi-vendor API Integration', 'Basic Auth & RBAC'], 
      status: 'done' 
    },
    { 
      week: 'Week 2', 
      title: 'AI Intelligence Integration', 
      tasks: ['Gemini 3 Pro Fine-tuning', 'Prompt Engineering Library', 'Config Translation Engine'], 
      status: 'active' 
    },
    { 
      week: 'Week 3', 
      title: 'Automation Layer', 
      tasks: ['Ansible Playbook Generation', 'ZTP Orchestrator Pilot', 'Pre/Post Deployment Checks'], 
      status: 'pending' 
    },
    { 
      week: 'Week 4', 
      title: 'Compliance & Launch', 
      tasks: ['NIST Audit Reports Module', 'Govt Tender Templates', 'Official MVP Launch'], 
      status: 'pending' 
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          30-Day MVP Roadmap
        </h2>
        <p className="text-slate-400 text-lg">A strategic timeline from design concept to a production-ready pilot.</p>
      </div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-slate-800"></div>
        
        <div className="space-y-12">
          {milestones.map((m, i) => (
            <div key={i} className="relative pl-24 group">
              <div className={`absolute left-[26px] top-0 w-3 h-3 rounded-full border-2 bg-slate-950 transition-all ${
                m.status === 'done' ? 'border-emerald-500 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]' :
                m.status === 'active' ? 'border-blue-500 animate-pulse' : 'border-slate-700'
              }`}></div>
              
              <div className={`p-8 rounded-3xl border transition-all ${
                m.status === 'active' ? 'bg-slate-900 border-blue-500/30 shadow-2xl' : 'bg-slate-900/50 border-slate-800'
              }`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                      m.status === 'done' ? 'text-emerald-400' : m.status === 'active' ? 'text-blue-400' : 'text-slate-500'
                    }`}>
                      {m.week}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1">{m.title}</h3>
                  </div>
                  {m.status === 'done' ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  ) : m.status === 'active' ? (
                    <Clock className="w-6 h-6 text-blue-500 animate-spin-slow" />
                  ) : (
                    <Circle className="w-6 h-6 text-slate-700" />
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {m.tasks.map((t, j) => (
                    <div key={j} className="flex items-center gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 font-medium">
                      <Zap className={`w-3 h-3 ${m.status === 'done' ? 'text-emerald-500' : 'text-slate-600'}`} />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl flex items-center gap-6">
          <div className="p-4 bg-emerald-500/10 rounded-2xl">
            <Users className="w-10 h-10 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-1">Development Team</h4>
            <p className="text-sm text-slate-400">1 Fullstack, 1 Network Engineer, 1 AI Specialist.</p>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl flex items-center gap-6">
          <div className="p-4 bg-blue-500/10 rounded-2xl">
            <Rocket className="w-10 h-10 text-blue-400" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-1">Beta Access</h4>
            <p className="text-sm text-slate-400">Join our waitlist for the first pilot at local universities.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
