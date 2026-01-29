
import React, { useState } from 'react';
import { PROPOSAL_TEMPLATES } from '../constants';
import { FileText, Download, Printer, Share2, Sparkles, UserCheck, Briefcase, Gavel, ShieldCheck, Globe } from 'lucide-react';

const Reports: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const getTenderResponse = () => (
    <div className="prose prose-invert prose-sm max-w-none font-sans text-slate-300">
      <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-white m-0 flex items-center gap-2">
          <Gavel className="w-6 h-6 text-amber-500" />
          Technical Bid: v1.2
        </h1>
        <div className="flex items-center gap-2 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Confidential 🇵🇰</span>
        </div>
      </div>
      
      <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-8">SUBMITTED TO: PROCUREMENT COMMITTEE / SECRETARY IT</p>
      
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 mb-8">
        <h3 className="text-emerald-400 font-bold text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" /> Technical Compliance Statement
        </h3>
        <p className="text-sm italic text-slate-200 leading-relaxed">
          "The proposed solution is an AI-driven, vendor-neutral network automation and monitoring platform capable of secure deployment, real-time monitoring, audit logging, and compliance reporting, suitable for government and educational institutions."
        </p>
      </div>

      <h3 className="text-white font-bold mb-2 mt-6">Section 1: Local Advantage & Air-Gap Mode</h3>
      <p className="mb-4">
        Unlike international SaaS offerings, NetGenius AI provides a <strong>Local Advantage</strong>. The system is locally deployable (On-Prem) and does not require permanent foreign cloud dependency, ensuring total data sovereignty for national infrastructure.
      </p>
      
      <h3 className="text-white font-bold mb-2">Section 2: Technical Specifications</h3>
      <ul className="list-disc pl-5 space-y-2 mb-6">
        <li><strong>Scalability:</strong> Support for up to 10,000+ nodes across distributed sites (Branches/Campuses).</li>
        <li><strong>Interoperability:</strong> Native support for Cisco (IOS/XE), Fortinet, MikroTik CCR, and Juniper.</li>
        <li><strong>Security:</strong> NIST 800-53 Level 4 compliant with immutable audit logs.</li>
        <li><strong>AI Capabilities:</strong> Intent-driven config generation using secure LLM nodes.</li>
      </ul>

      <h3 className="text-white font-bold mb-2">Section 3: Maintenance & Support (AMC)</h3>
      <p className="mb-6">
        We offer a 24/7 localized support team based in Islamabad and Lahore, ensuring a 4-hour MTTR (Mean Time To Repair) for critical infrastructure issues. 
      </p>
      
      <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 mt-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Financial Estimator</p>
            <p className="text-xl font-bold text-white">PKR 25,000,000/-</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">License Tier</p>
            <p className="text-xs font-bold text-emerald-400">ENTERPRISE (UNLIMITED SITES)</p>
          </div>
        </div>
        <p className="text-[10px] text-slate-500 italic">Inclusive of 1-year AMC and 24/7 onsite/remote support.</p>
      </div>
    </div>
  );

  const getDefaultProposal = (title: string) => (
    <div className="prose prose-invert prose-sm max-w-none font-sans text-slate-300">
      <h1 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">
        {title}
      </h1>
      <p className="font-bold text-emerald-400 mb-6">Strategic Objective:</p>
      <p className="mb-4">To deploy an AI-powered centralized platform that automates network configuration, deployment, monitoring, and compliance across the institution — reducing downtime, human error, and operational cost.</p>
      
      <h3 className="text-white font-bold mb-2 mt-6">Key Benefits:</h3>
      <ul className="list-disc pl-5 space-y-2 mb-6">
        <li>70% reduction in manual configuration tasks.</li>
        <li>Zero-touch deployment capabilities for remote sites.</li>
        <li>Vendor-independent solution supporting Cisco, Juniper, Fortinet, and MikroTik.</li>
        <li>24/7 AI monitoring with real-time anomaly detection.</li>
        <li>Full audit trails for configuration changes (Change Management).</li>
      </ul>

      <h3 className="text-white font-bold mb-2">Implementation Roadmap:</h3>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Phase 1</span>
          <p className="font-bold text-white text-xs">Discovery & Audit</p>
        </div>
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Phase 2</span>
          <p className="font-bold text-white text-xs">Automation Pilot</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Proposals & Reporting</h2>
          <p className="text-slate-400">Generate professional IT proposals and compliance reports for leadership.</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs font-bold text-blue-400 flex items-center gap-2 uppercase tracking-widest">
              <Globe className="w-4 h-4" />
              Pak-Centric GTM Strategy
           </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-slate-200 rounded-xl font-bold border border-slate-700 hover:bg-slate-700 transition-all">
            <Printer className="w-4 h-4" />
            Print Archive
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            AI Proposal Templates
          </h3>
          <div className="space-y-4">
            {PROPOSAL_TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => setSelected(tmpl.id)}
                className={`w-full p-6 text-left rounded-2xl border transition-all group ${
                  selected === tmpl.id 
                    ? 'bg-emerald-500/10 border-emerald-500 shadow-lg shadow-emerald-500/10 scale-[1.02]' 
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${selected === tmpl.id ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'}`}>
                    {tmpl.id === 'tender' ? <Gavel className="w-5 h-5" /> : <Briefcase className="w-5 h-5" />}
                  </div>
                  {selected === tmpl.id && <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Selected</span>}
                </div>
                <h4 className="font-bold text-white mb-1 tracking-tight">{tmpl.title}</h4>
                <p className="text-xs text-slate-400 font-medium mb-3 tracking-wide">Target: {tmpl.target}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{tmpl.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden flex flex-col min-h-[600px] shadow-2xl">
          {selected ? (
            <>
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <FileText className="w-32 h-32" />
              </div>
              <div className="flex-1 space-y-8 relative z-10">
                <div className="flex justify-between items-center pb-6 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-5 h-5 text-emerald-400" />
                    <span className="font-bold text-emerald-400 uppercase tracking-widest text-xs">Previewing Official Document</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-slate-950 p-10 rounded-2xl border border-slate-800/50 shadow-inner overflow-y-auto max-h-[500px] custom-scrollbar">
                  {selected === 'tender' 
                    ? getTenderResponse() 
                    : getDefaultProposal(PROPOSAL_TEMPLATES.find(t => t.id === selected)?.title || '')
                  }
                </div>
              </div>
              <button className="mt-8 w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-xl shadow-emerald-500/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                <FileText className="w-4 h-4" />
                Generate Official PDF Proposal
              </button>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
              <FileText className="w-16 h-16 mb-4" />
              <p className="text-lg font-bold">Select a template to begin</p>
              <p className="text-sm max-w-[200px] mt-2 leading-relaxed">AI will customize the content based on institutional requirements and active inventory telemetry.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
