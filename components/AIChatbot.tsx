
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Loader2, Sparkles, Bot, User, Volume2 } from 'lucide-react';
import { chatWithGemini, textToSpeech } from '../services/gemini';

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Welcome to the NetGenius NOC Assistant. How can I help you optimize your infrastructure today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const onSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await chatWithGemini(userMsg);
      setMessages(prev => [...prev, { role: 'bot', text: response || "I encountered an error." }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'bot', text: "Error connecting to AI Node." }]);
    } finally {
      setLoading(false);
    }
  };

  const speak = (text: string) => {
    textToSpeech(text).catch(console.error);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="w-[400px] h-[600px] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden mb-4 animate-in slide-in-from-bottom-8 duration-300">
          <div className="p-6 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-emerald-500/20">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">NOC Assistant</h3>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">AI Engine Active</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 text-slate-500 hover:text-white transition-all">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-900/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`p-2.5 rounded-xl shrink-0 ${m.role === 'bot' ? 'bg-slate-800 text-emerald-400' : 'bg-emerald-500 text-slate-950'}`}>
                  {m.role === 'bot' ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <div className={`group relative p-4 rounded-2xl text-sm leading-relaxed max-w-[80%] ${m.role === 'bot' ? 'bg-slate-800/50 text-slate-200 rounded-tl-none' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-tr-none font-medium'}`}>
                  {m.text}
                  {m.role === 'bot' && (
                    <button 
                      onClick={() => speak(m.text)}
                      className="absolute -right-8 bottom-0 p-1.5 opacity-0 group-hover:opacity-100 transition-all text-slate-500 hover:text-emerald-400"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-4">
                <div className="p-2.5 rounded-xl bg-slate-800 text-emerald-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/50 text-slate-500 text-xs italic animate-pulse">
                  NOC Engine is thinking...
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-slate-950 border-t border-slate-800">
            <div className="flex gap-3">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && onSend()}
                placeholder="Ask technical questions..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/40 transition-all"
              />
              <button 
                onClick={onSend}
                disabled={loading || !input.trim()}
                className="p-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-800 text-white rounded-xl transition-all shadow-lg shadow-emerald-500/10"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-2xl hover:scale-110 active:scale-95 ${isOpen ? 'bg-slate-800 text-white border border-slate-700 rotate-90' : 'bg-emerald-500 text-slate-950 shadow-emerald-500/30'}`}
      >
        {isOpen ? <X className="w-8 h-8" /> : <MessageSquare className="w-8 h-8" />}
      </button>
    </div>
  );
};

export default AIChatbot;
