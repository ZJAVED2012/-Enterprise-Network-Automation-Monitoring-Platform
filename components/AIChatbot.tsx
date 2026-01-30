
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Loader2, Sparkles, Bot, User, Volume2, Bolt } from 'lucide-react';
import { chatWithGemini, fastChatWithGemini, textToSpeech } from '../services/gemini';

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFastMode, setIsFastMode] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Welcome to the NetGenius NOC Assistant. System stable. How can I help you optimize your infrastructure today?' }
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
      const response = isFastMode 
        ? await fastChatWithGemini(userMsg)
        : await chatWithGemini(userMsg);
      setMessages(prev => [...prev, { role: 'bot', text: response || "I encountered a communication error with the core AI node." }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'bot', text: "Error: AI Node Unreachable. Verify licensing and key selection." }]);
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
        <div 
          className="w-[400px] h-[600px] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden mb-4 animate-in slide-in-from-bottom-8 duration-300"
          role="complementary"
          aria-label="NOC Assistant Chat"
        >
          <div className="p-6 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all shadow-lg ${isFastMode ? 'bg-amber-500 text-slate-950 shadow-amber-500/20' : 'bg-emerald-500 text-slate-950 shadow-emerald-500/20'}`} aria-hidden="true">
                {isFastMode ? <Bolt className="w-6 h-6 animate-pulse" /> : <Bot className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">NOC Assistant</h3>
                <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${isFastMode ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {isFastMode ? 'Turbo (Lite-Fast) Active' : 'Strategic Engine Active'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsFastMode(!isFastMode)}
                aria-pressed={isFastMode}
                title={isFastMode ? "Switch to Strategic Mode" : "Switch to Turbo Mode (Fast)"}
                className={`p-2 rounded-lg transition-all border ${isFastMode ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'}`}
              >
                <Bolt className={`w-4 h-4 ${isFastMode ? 'fill-current' : ''}`} aria-hidden="true" />
                <span className="sr-only">Toggle Fast Mode</span>
              </button>
              <button onClick={() => setIsOpen(false)} aria-label="Close assistant" className="p-2 text-slate-500 hover:text-white transition-all">
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div 
            ref={scrollRef} 
            className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-900/50"
            role="log"
            aria-live="polite"
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`p-2.5 rounded-xl shrink-0 ${m.role === 'bot' ? 'bg-slate-800 text-emerald-400' : 'bg-emerald-500 text-slate-950'}`} aria-hidden="true">
                  {m.role === 'bot' ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <div className={`group relative p-4 rounded-2xl text-sm leading-relaxed max-w-[80%] ${m.role === 'bot' ? 'bg-slate-800/50 text-slate-200 rounded-tl-none border border-slate-800' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-tr-none font-medium'}`}>
                  {m.text}
                  {m.role === 'bot' && (
                    <button 
                      onClick={() => speak(m.text)}
                      aria-label="Play audio for this message"
                      className="absolute -right-8 bottom-0 p-1.5 opacity-0 group-hover:opacity-100 transition-all text-slate-500 hover:text-emerald-400 focus:opacity-100"
                    >
                      <Volume2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-4" aria-live="assertive">
                <div className={`p-2.5 rounded-xl bg-slate-800 ${isFastMode ? 'text-amber-400' : 'text-emerald-400'}`}>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/50 text-slate-500 text-xs italic animate-pulse">
                  {isFastMode ? 'Instant Flash-Lite analysis...' : 'Strategic NOC Engine thinking...'}
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-slate-950 border-t border-slate-800">
            <div className="flex gap-3">
              <label htmlFor="chat-input" className="sr-only">Message NOC Assistant</label>
              <input
                id="chat-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && onSend()}
                placeholder={isFastMode ? "Type rapid technical query..." : "Ask complex design questions..."}
                className={`flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 transition-all ${isFastMode ? 'focus:ring-amber-500/40' : 'focus:ring-emerald-500/40'}`}
              />
              <button 
                onClick={onSend}
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className={`p-3 disabled:bg-slate-800 text-white rounded-xl transition-all shadow-lg ${isFastMode ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/10' : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/10'}`}
              >
                <Send className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close Assistant" : "Open NOC Assistant"}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-2xl hover:scale-110 active:scale-95 border-2 ${isOpen ? 'bg-slate-800 text-white border-slate-700' : 'bg-emerald-500 text-slate-950 border-emerald-400/30 shadow-emerald-500/30'}`}
      >
        {isOpen ? <X className="w-8 h-8" aria-hidden="true" /> : (
          <div className="relative">
            <MessageSquare className="w-8 h-8" aria-hidden="true" />
            <Bolt className="w-4 h-4 absolute -top-1 -right-1 text-slate-950 bg-amber-400 rounded-full p-0.5 border border-slate-950 animate-bounce" aria-hidden="true" />
          </div>
        )}
      </button>
    </div>
  );
};

export default AIChatbot;
