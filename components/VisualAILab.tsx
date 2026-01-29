
import React, { useState, useRef } from 'react';
import { ImageIcon, Wand2, Search, Upload, Camera, Loader2, Download, Maximize2, Layers, AlertCircle, Trash2 } from 'lucide-react';
import { generateVisual, analyzeVisual, editVisual } from '../services/gemini';

const VisualAILab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'generate' | 'analyze' | 'edit'>('generate');
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<"1K" | "2K" | "4K">("1K");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [analysisText, setAnalysisText] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onGenerate = async () => {
    setLoading(true);
    try {
      const url = await generateVisual(prompt, size, aspectRatio);
      setResultImage(url);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const onAnalyze = async () => {
    if (!uploadedImage) return;
    setLoading(true);
    try {
      const text = await analyzeVisual(uploadedImage, prompt || "Analyze this image for network hardware and cabling compliance.");
      setAnalysisText(text);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const onEdit = async () => {
    if (!uploadedImage) return;
    setLoading(true);
    try {
      const url = await editVisual(uploadedImage, prompt);
      setResultImage(url);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">AI Visual Lab</h2>
          <p className="text-slate-400">Generate diagrams, analyze hardware photos, and edit visualizations.</p>
        </div>
        <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl">
          {(['generate', 'analyze', 'edit'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setPrompt(''); setResultImage(null); setAnalysisText(null); }}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
            <h3 className="text-white font-bold flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-emerald-400" />
              {activeTab === 'generate' ? 'Topology & Concept Generation' : activeTab === 'analyze' ? 'Hardware Understanding' : 'Image Editing'}
            </h3>

            {(activeTab === 'analyze' || activeTab === 'edit') && (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`w-full aspect-video border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all hover:border-emerald-500/50 hover:bg-emerald-500/5 ${uploadedImage ? 'border-emerald-500/50 bg-slate-950' : 'border-slate-800 bg-slate-950/50'}`}
              >
                {uploadedImage ? (
                  <img src={uploadedImage} alt="Uploaded" className="w-full h-full object-contain rounded-xl" />
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-slate-700 mb-2" />
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Upload Hardware/Diagram Photo</p>
                  </>
                )}
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
              </div>
            )}

            <div className="space-y-4">
              <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder={activeTab === 'generate' ? "Describe the network diagram or concept (e.g., 'A professional 3D isometric view of a multi-tier data center topology')." : activeTab === 'analyze' ? "Ask about the photo (e.g., 'Identify all hardware and list cabling risks')." : "What should I change? (e.g., 'Add a secondary redundant router' or 'Change the theme to midnight blue')."}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-6 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all min-h-[120px] resize-none text-sm"
              />

              {activeTab === 'generate' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Image Size</label>
                    <select value={size} onChange={e => setSize(e.target.value as any)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none">
                      <option value="1K">1K High Def</option>
                      <option value="2K">2K Professional</option>
                      <option value="4K">4K Ultra Quality</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Aspect Ratio</label>
                    <select value={aspectRatio} onChange={e => setAspectRatio(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none">
                      <option value="1:1">1:1 Square</option>
                      <option value="16:9">16:9 Landscape</option>
                      <option value="9:16">9:16 Portrait</option>
                      <option value="4:3">4:3 Standard</option>
                    </select>
                  </div>
                </div>
              )}

              <button
                disabled={loading || (activeTab !== 'generate' && !uploadedImage)}
                onClick={activeTab === 'generate' ? onGenerate : activeTab === 'analyze' ? onAnalyze : onEdit}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-800 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-emerald-500/20"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : activeTab === 'generate' ? <ImageIcon className="w-5 h-5" /> : activeTab === 'analyze' ? <Search className="w-5 h-5" /> : <Wand2 className="w-5 h-5" />}
                {loading ? 'Processing...' : activeTab === 'generate' ? 'Generate Visualization' : activeTab === 'analyze' ? 'Run Analysis' : 'Apply Edits'}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {(resultImage || analysisText) ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 min-h-[500px] flex flex-col shadow-2xl animate-in zoom-in-95 duration-500">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
                <h3 className="text-white font-bold flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-400" />
                  Output Results
                </h3>
                <div className="flex gap-2">
                  {resultImage && (
                    <button onClick={() => window.open(resultImage)} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-all">
                      <Download className="w-4 h-4" />
                    </button>
                  )}
                  <button onClick={() => { setResultImage(null); setAnalysisText(null); }} className="p-2 bg-slate-800 hover:bg-red-500/20 rounded-lg text-slate-400 hover:text-red-400 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {resultImage && (
                <div className="flex-1 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center p-4">
                  <img src={resultImage} alt="Result" className="max-w-full max-h-full object-contain shadow-2xl rounded-xl" />
                </div>
              )}

              {analysisText && (
                <div className="flex-1 overflow-y-auto max-h-[500px] p-6 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {analysisText}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 min-h-[500px] flex flex-col items-center justify-center text-center opacity-40">
              <ImageIcon className="w-16 h-16 mb-4 text-slate-700" />
              <p className="text-lg font-bold text-slate-400">Waiting for Engine Input</p>
              <p className="text-sm max-w-[250px] mt-2 leading-relaxed text-slate-500">Generate, analyze or edit visual assets to populate this view.</p>
            </div>
          )}

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 flex gap-4 items-start">
            <AlertCircle className="w-6 h-6 text-emerald-400 shrink-0" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Pro Tip: Multi-Site Mode</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Try uploading a photo of your network rack and asking for a "Compliance Audit" to see AI-driven hardware identification.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualAILab;
