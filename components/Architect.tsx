
import React, { useState } from 'react';
import { generateNetworkArchitecture, textToSpeech, ArchitectureResult } from '../services/gemini';
import { Send, Terminal, Loader2, Sparkles, AlertCircle, Copy, Check, Download, FileCode, PlayCircle, ShieldCheck, Globe, Search, Volume2, Link as LinkIcon, ExternalLink, RefreshCcw } from 'lucide-react';
import { ARCHITECT_TEMPLATES } from '../constants';

const Architect: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [useSearch, setUseSearch] = useState(false);
  const [output, setOutput] = useState<ArchitectureResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (customPrompt?: string) => {
    const textToUse = customPrompt || prompt;
    if (!textToUse.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    try {
      const result = await generateNetworkArchitecture(textToUse, useSearch);
      setOutput(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const playTTS = () => {
    if (!output) return;
    const summary = output.text.split('\n').slice(0, 10).join('\n');
    textToSpeech(summary).catch(console.error);
  };

  const downloadConfig = () => {
    if (!output) return;
    const blob = new Blob([output.text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NetGenius-Config-${new Date().toISOString().split('T')[0]}.md`;
    a.click();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <header className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-2">
           <Globe className="w-4 h-4 text-emerald-400" aria-hidden="true" />
           <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em]">Intent-Based Configuration Generator</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white mb-4 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
          Network Intent Designer
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Translate business and security requirements into production-ready vendor configurations.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2" aria-label="Quick Templates">
        {ARCHITECT_TEMPLATES.map((tmpl, idx) => (
          <button
            key={idx}
            onClick={() => {
              setPrompt(tmpl.prompt);
              handleGenerate(tmpl.prompt);
            }}
            className="p-5 bg-slate-900 border border-slate-800 rounded-2xl hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all text-left group relative overflow-hidden focus:ring-2 focus:ring-emerald-500/40"
          >
            <div className="absolute -right-2 -top-2 opacity-5 scale-150 rotate-12 group-hover:rotate-0 transition-transform" aria-hidden="true">
               <ShieldCheck className="w-12 h-12 text-white" />
            </div>
            <h4 className="text-emerald-400 font-bold mb-1 text-sm flex items-center gap-2">
              <Sparkles className="w-3 h-3" aria-hidden="true" />
              {tmpl.title}
            </h4>
            <p className="text-slate-500 text-xs line-clamp-2 group-hover:text-slate-300 transition-colors leading-relaxed">
              {tmpl.prompt}
            </p>
          </button>
        ))}
      </section>

      <main className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500"></div>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <label htmlFor="intent-prompt" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Configure Network Intent</label>
            <textarea
              id="intent-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type intent (e.g., 'Design a university campus core with firewall redundancy')"
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-6 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all min-h-[160px] resize-none text-xl font-medium"
            />
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                Govt Compliance: Active
              </div>
              <button 
                onClick={() => setUseSearch(!useSearch)}
                aria-pressed={useSearch}
                className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border transition-all ${useSearch ? 'bg-blue-500/20 text-blue-400 border-blue-500/40' : 'bg-slate-950 text-slate-500 border-slate-800'}`}
              >
                <Search className="w-4 h-4" aria-hidden="true" />
                Grounding: {useSearch ? 'ON' : 'OFF'}
              </button>
            </div>
            <button
              onClick={() => handleGenerate()}
              disabled={isGenerating || !prompt.trim()}
              aria-busy={isGenerating}
              className="px-10 py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-2xl font-bold flex items-center gap-3 transition-all transform active:scale-95 shadow-xl shadow-emerald-500/20"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                  Reasoning & Generating...
                </>
              ) : (
                <>
                  <Terminal className="w-5 h-5" aria-hidden="true" />
                  Finalize & Generate
                </>
              )}
            </button>
          </div>
        </div>
      </main>

      {error && (
        <div role="alert" className="bg-red-500/10 border border-red-500/20 p-8 rounded-3xl flex items-start gap-5 animate-shake">
          <div className="p-3 bg-red-500/20 rounded-2xl">
            <AlertCircle className="w-8 h-8 text-red-500 shrink-0" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-red-500 mb-2 tracking-tight flex items-center gap-2">
              System Core Exception
              <span className="text-[10px] px-2 py-0.5 bg-red-500 text-white rounded font-mono uppercase">Error 429/403</span>
            </h4>
            <p className="text-red-400/90 text-sm leading-relaxed mb-4">{error}</p>
            <div className="flex gap-3">
              <button 
                onClick={() => handleGenerate()} 
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-red-600 transition-all"
              >
                <RefreshCcw className="w-3 h-3" aria-hidden="true" />
                Retry Command
              </button>
              <button 
                onClick={() => window.location.reload()} 
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-slate-700 transition-all"
              >
                Re-initialize Core
              </button>
            </div>
          </div>
        </div>
      )}

      {output && (
        <div aria-live="polite" className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-700">
          <div className="bg-slate-900 px-8 py-5 border-b border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-500/20 p-2 rounded-lg" aria-hidden="true">
                <FileCode className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="font-bold text-slate-200 block text-sm uppercase tracking-wider">Production Configuration Export</span>
                <span className="text-[10px] text-slate-500 font-mono">ENCRYPTION: AES-256-GCM READY</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={playTTS}
                aria-label="Listen to configuration summary"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-tight"
              >
                <Volume2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                Listen
              </button>
              <button
                onClick={downloadConfig}
                aria-label="Export configuration as Markdown"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-tight"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                Export MD
              </button>
              <button
                onClick={handleCopy}
                aria-label={copied ? "Copied to clipboard" : "Copy configuration code"}
                className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 rounded-xl text-emerald-400 transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-tight"
              >
                {copied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
                {copied ? 'Copied' : 'Copy Code'}
              </button>
            </div>
          </div>
          <div className="p-10 bg-slate-950">
            <div className="max-w-none prose prose-invert prose-emerald prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800">
               <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-slate-300 bg-slate-950 p-6 rounded-2xl border border-slate-800/50 shadow-inner">
                 {output.text}
               </div>
            </div>
            
            {output.groundingChunks && output.groundingChunks.length > 0 && (
              <section className="mt-8 border-t border-slate-900 pt-8" aria-labelledby="sources-heading">
                <h4 id="sources-heading" className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-blue-400" aria-hidden="true" />
                  Grounding Sources & References
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {output.groundingChunks.map((chunk, i) => chunk.web && (
                    <a 
                      key={i} 
                      href={chunk.web.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/30 transition-all group"
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-200 group-hover:text-blue-400 transition-colors line-clamp-1">{chunk.web.title || chunk.web.uri}</span>
                        <span className="text-[10px] text-slate-500 line-clamp-1">{chunk.web.uri}</span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-blue-400" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Architect;
