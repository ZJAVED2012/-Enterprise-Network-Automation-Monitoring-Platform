
import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, ShieldAlert, Loader2, Waves, X, User as UserIcon } from 'lucide-react';
import { connectNOCVoice, encode } from '../services/gemini';

const VoiceNOC: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'listening' | 'speaking'>('idle');
  const [transcription, setTranscription] = useState('');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sessionRef = useRef<any>(null);

  const startSession = async () => {
    setStatus('connecting');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      audioContextRef.current = inputCtx;

      const session = await connectNOCVoice({
        onopen: () => {
          setIsActive(true);
          setStatus('listening');
          
          const source = inputCtx.createMediaStreamSource(stream);
          const processor = inputCtx.createScriptProcessor(4096, 1, 1);
          
          processor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            const int16 = new Int16Array(inputData.length);
            for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
            
            session.sendRealtimeInput({
              media: {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000'
              }
            });
          };
          
          source.connect(processor);
          processor.connect(inputCtx.destination);
        },
        onmessage: async (msg: any) => {
          if (msg.serverContent?.outputTranscription) {
            setTranscription(prev => prev + msg.serverContent.outputTranscription.text);
          }
        },
        onclose: () => stopSession(),
        onerror: () => stopSession()
      });
      
      sessionRef.current = session;
    } catch (err) {
      console.error(err);
      setStatus('idle');
    }
  };

  const stopSession = () => {
    setIsActive(false);
    setStatus('idle');
    sessionRef.current?.close();
    streamRef.current?.getTracks().forEach(t => t.stop());
    audioContextRef.current?.close();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-[40px] p-10 shadow-2xl relative overflow-hidden text-center">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500"></div>
        
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>

        <div className="mb-10">
          <div className="bg-emerald-500/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20 relative">
            <div className={`absolute inset-0 rounded-full bg-emerald-500/20 ${isActive ? 'animate-ping' : ''}`}></div>
            <Mic className={`w-10 h-10 ${isActive ? 'text-emerald-400' : 'text-slate-600'}`} />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">NOC Voice Command</h2>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">Enterprise Live Engine Active</p>
        </div>

        <div className="h-32 bg-slate-950 rounded-3xl border border-slate-800 p-6 flex items-center justify-center mb-10 overflow-hidden relative">
          {status === 'idle' && <p className="text-slate-600 font-medium italic">"Query core switch status..."</p>}
          {status === 'connecting' && <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />}
          {isActive && (
            <div className="flex gap-1 items-center">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-1.5 bg-emerald-500 rounded-full animate-pulse" style={{ height: `${Math.random() * 40 + 10}px`, animationDelay: `${i * 0.1}s` }}></div>
              ))}
            </div>
          )}
          <p className="absolute bottom-2 left-0 w-full text-[9px] text-slate-700 font-mono text-center uppercase">Secure Stream: 128-bit Encrypted</p>
        </div>

        <div className="flex flex-col gap-4">
          {!isActive ? (
            <button 
              onClick={startSession}
              className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-2xl shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
            >
              <Mic className="w-5 h-5" />
              Activate Voice Node
            </button>
          ) : (
            <button 
              onClick={stopSession}
              className="w-full py-5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl shadow-xl shadow-red-500/20 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
            >
              <MicOff className="w-5 h-5" />
              Disconnect Stream
            </button>
          )}
          
          <div className="flex items-center justify-center gap-2 text-slate-500">
            <ShieldAlert className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">NOC Compliance: Verified Agent</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceNOC;
