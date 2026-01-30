
import React, { useState, useRef } from 'react';
import { ImageIcon, Wand2, Search, Upload, Camera, Loader2, Download, Maximize2, Layers, AlertCircle, Trash2, Video, Play, Sparkles } from 'lucide-react';
// Fix: editVisual is now available from services
import { generateVisual, analyzeVisual, editVisual, generateNetworkVideo } from '../services/gemini';

const VisualAILab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'generate' | 'analyze' | 'edit' | 'video'>('generate');
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<"1K" | "2K" | "4K">("1K");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [resultVideo, setResultVideo] = useState<string | null>(null);
  const [analysisText, setAnalysisText] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setUploadedImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onGenerate = async () => {
    setLoading(true);
    try {
      const url = await generateVisual(prompt, size, aspectRatio);
      setResultImage(url);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const onGenerateVideo = async () => {
    setLoading(true);
    try {
      const url = await generateNetworkVideo(prompt);
      setResultVideo(url);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const onAnalyze = async () => {
    if (!uploadedImage) return;
    setLoading(true);
    try {
      const text = await analyzeVisual(uploadedImage, prompt || "Analyze for cabling compliance.");
      setAnalysisText(text);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  // Fix: Handle the edit action specifically
  const onEdit = async () => {
    if (!uploadedImage) return;
    setLoading(true);
    try {
      const url = await editVisual(uploadedImage, prompt);
      setResultImage(url);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">AI Visual & Video Lab</h2>
          <p className="text-slate-400">Cinematic network animations and deep hardware analysis.</p>
        </div>
        <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl">
          {(['generate', 'analyze', 'edit', 'video'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setPrompt(''); setResultImage(null); setResultVideo(null); setAnalysisText(null); }}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              {activeTab === 'video' ? <Video className="w-24 h-24" /> : <Layers className="w-24 h-24" />}
            </div>
            
            <h3 className="text-white font-bold flex items-center gap-3 relative z-10">
              {activeTab === 'video' ? <Video className="w-5 h-5 text-blue-400" /> : <Wand2 className="w-5 h-5 text-emerald-400" />}
              {activeTab === 'generate' ? 'Topology Generation' : activeTab === 'analyze' ? 'Visual Forensics' : activeTab === 'edit' ? 'Image Refinement' : 'Future State Video (Veo 3.1)'}
            </h3>

            {(activeTab === 'analyze' || activeTab === 'edit') && (
              <div onClick={() => fileInputRef.current?.click()} className={`w-full aspect-video border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all hover:border-emerald-500/50 ${uploadedImage ? 'border-emerald-500/50 bg-slate-950' : 'border-slate-800 bg-slate-950/50'}`}>
                {uploadedImage ? <img src={uploadedImage} alt="Uploaded" className="w-full h-full object-contain rounded-xl" /> : <><Upload className="w-10 h-10 text-slate-700 mb-2" /><p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Upload Reference Asset</p></>}
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
              </div>
            )}

            <div className="space-y-4 relative z-10">
              <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder={activeTab === 'video' ? "Describe the animation (e.g., 'Flythrough of a high-density server rack with glowing fiber optics')" : "Describe your visual requirement..."}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-6 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 min-h-[140px] resize-none text-sm font-medium"
              />

              <button
                disabled={loading || (activeTab !== 'generate' && activeTab !== 'video' && !uploadedImage)}
                onClick={activeTab === 'video' ? onGenerateVideo : activeTab === 'generate' ? onGenerate : activeTab === 'analyze' ? onAnalyze : onEdit}
                className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl ${activeTab === 'video' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20' : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20'}`}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : activeTab === 'video' ? <Sparkles className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {loading ? 'AI Core Processing...' : activeTab === 'video' ? 'Synthesize Cinematic Video' : 'Finalize Rendering'}
              </button>
            </div>
          </div>
          
          {activeTab === 'video' && (
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 flex gap-4">
              <InfoIcon className="w-6 h-6 text-blue-400 shrink-0" />
              <div className="space-y-1">
                <h4 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Veo 3.1 Pro Node</h4>
                <p className="text-[10px] text-slate-400 leading-relaxed uppercase">Video generation takes 30-60 seconds. Our engine generates professional B-roll for your infrastructure presentations.</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {(resultImage || resultVideo || analysisText) ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 min-h-[500px] flex flex-col shadow-2xl animate-in zoom-in-95 duration-500">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
                <h3 className="text-white font-bold flex items-center gap-2 uppercase tracking-widest text-xs">
                  <Play className="w-4 h-4 text-blue-400" /> Output Buffer
                </h3>
                <div className="flex gap-2">
                  <button onClick={() => { setResultImage(null); setResultVideo(null); setAnalysisText(null); }} className="p-2 bg-slate-800 hover:bg-red-500/20 rounded-lg text-slate-400 hover:text-red-400 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {resultImage && <img src={resultImage} alt="Result" className="w-full h-auto shadow-2xl rounded-2xl border border-slate-800" />}
              {resultVideo && <video src={resultVideo} controls autoPlay className="w-full h-auto shadow-2xl rounded-2xl border border-slate-800" />}
              {analysisText && <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs text-slate-400 leading-relaxed whitespace-pre-wrap">{analysisText}</div>}
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 min-h-[500px] flex flex-col items-center justify-center text-center opacity-40">
              <Video className="w-16 h-16 mb-4 text-slate-700" />
              <p className="text-lg font-bold text-slate-400">Media Console Idle</p>
              <p className="text-sm max-w-[250px] mt-2 leading-relaxed text-slate-500 italic">"Design a professional network overview video for the Higher Education Commission tender..."</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Fix: Info component renamed to InfoIcon to avoid confusion if necessary, although using a separate function is fine.
const InfoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
);

export default VisualAILab;
