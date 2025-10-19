import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal, Mic, MicOff, BookOpen, HelpCircle, ClipboardList, GraduationCap, CalendarCheck, MessageSquare } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { sendChatMessage, checkBackendHealth } from '../utils/api';
import GlassCard from '../components/ui/GlassCard';

// Add these types at the top of the file for TypeScript support
declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionType;
    webkitSpeechRecognition?: new () => SpeechRecognitionType;
  }
}

// Minimal SpeechRecognition types to avoid any
type SpeechRecognitionResultEvent = {
  results: Array<{ 0: { transcript: string } }>;
};

type SpeechRecognitionType = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionResultEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface HistoryItem {
  id: string;
  prompt: string;
  time: string;
}

const getSpeechRecognition = () => {
  const Ctor = (window.SpeechRecognition || window.webkitSpeechRecognition) as
    | (new () => SpeechRecognitionType)
    | undefined;
  return Ctor ? new Ctor() : null;
};

const AITutor: React.FC = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: t('aiTutor.greeting'),
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isBackendAvailable, setIsBackendAvailable] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionType | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const quickPrompts: { label: string; text: string; icon: React.ReactNode }[] = [
    { label: 'Homework help', text: 'Help me with this homework problem:', icon: <BookOpen className="w-4 h-4" /> },
    { label: 'Explain topic', text: 'Explain this topic like I\'m new to it:', icon: <HelpCircle className="w-4 h-4" /> },
    { label: 'Study plan', text: 'Create a 2-week study plan for:', icon: <ClipboardList className="w-4 h-4" /> },
    { label: 'Quiz me', text: 'Quiz me with 5 questions on:', icon: <GraduationCap className="w-4 h-4" /> },
    { label: 'Make schedule', text: 'Make a daily schedule to learn:', icon: <CalendarCheck className="w-4 h-4" /> },
  ];

  const featureTiles: { title: string; desc: string; icon: React.ReactNode }[] = [
    { title: 'Explain concepts', desc: 'Clear, step-by-step explanations with examples.', icon: <HelpCircle className="w-5 h-5" /> },
    { title: 'Generate quizzes', desc: 'Short quizzes to check your understanding.', icon: <GraduationCap className="w-5 h-5" /> },
    { title: 'Study plans', desc: 'Structured plans tailored to your time.', icon: <ClipboardList className="w-5 h-5" /> },
    { title: 'Writing help', desc: 'Outlines, drafts, and edits for essays.', icon: <BookOpen className="w-5 h-5" /> },
  ];

  // Check backend health on component mount
  useEffect(() => {
    const checkHealth = async () => {
      const isHealthy = await checkBackendHealth();
      setIsBackendAvailable(isHealthy);
    };
    checkHealth();
  }, []);

  useEffect(() => {
    recognitionRef.current = getSpeechRecognition();
    if (recognitionRef.current) {
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.onresult = (event: SpeechRecognitionResultEvent) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      recognitionRef.current.onerror = () => {
        setIsListening(false);
        // no-op: we simply stop listening on error
      };
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  // Load history from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('ai_history');
      if (raw) setHistory(JSON.parse(raw));
    } catch {
      /* ignore localStorage read errors */
    }
  }, []);

  const saveHistory = (next: HistoryItem[]) => {
    setHistory(next);
    try {
      localStorage.setItem('ai_history', JSON.stringify(next.slice(0, 20)));
    } catch {
      /* ignore localStorage write errors */
    }
  };

  const addToHistory = (promptText: string) => {
    const item: HistoryItem = { id: Date.now().toString(), prompt: promptText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    const next = [item, ...history];
    saveHistory(next);
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleSendMessage = async (overrideText?: string) => {
    const textToSend = (overrideText ?? input).trim();
    if (!textToSend || !isBackendAvailable) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    addToHistory(userMessage.text);
    
    try {
      // Get AI response using the API utility
      const response = await sendChatMessage(
        textToSend,
        messages
          .filter((msg, idx) => !(idx === 0 && msg.sender === 'bot')) // Remove initial bot greeting
          .map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            content: msg.text
          }))
      );
      
      // Add AI message
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: t('aiTutor.error'),
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleQuickPrompt = (text: string) => {
    setInput(text + ' ');
  };

  // Auto-load suggested prompt from localStorage and auto-send
  useEffect(() => {
    try {
      const suggested = localStorage.getItem('ai_suggested_prompt');
      if (suggested) {
        localStorage.removeItem('ai_suggested_prompt');
        setInput(suggested);
        // slight delay to allow input to paint
        setTimeout(() => handleSendMessage(suggested), 100);
      }
    } catch {
      /* ignore localStorage read errors */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header removed per request */}

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {quickPrompts.map((qp, idx) => (
          <button key={idx} onClick={() => handleQuickPrompt(qp.text)} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/90 hover:bg-white/10 transition flex items-center gap-2">
            {qp.icon}
            <span className="text-sm">{qp.label}</span>
          </button>
        ))}
      </div>
      
      {/* Connection error banner removed per request; logic retained */}

      {/* Main layout: Chat (left) + Features/History (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat area */}
        <GlassCard tone="mono" variant="bordered" className="lg:col-span-2 h-[640px] p-0">
          <div className="h-full flex flex-col">
          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-xl border border-white/10 ${
                      message.sender === 'user'
                        ? 'bg-white/10 text-white'
                        : 'bg-white/5 text-white'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    <span className={`text-xs mt-1 block text-white/50`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-4 rounded-xl bg-white/5">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input area with quick tips */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <button
                onClick={isListening ? stopListening : startListening}
                disabled={isLoading || !isBackendAvailable}
                className={`p-3 rounded-lg border border-white/10 text-white ${
                  isListening ? 'bg-white/10' : 'bg-white/5 hover:bg-white/10'
                }`}
                title={isListening ? t('aiTutor.stopListening') : t('aiTutor.speak')}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={t('aiTutor.placeholder')}
                className="flex-1 p-3 bg-white/5 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 border border-white/10"
                disabled={isLoading || !isBackendAvailable}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !input.trim() || !isBackendAvailable}
                className="p-3 rounded-lg bg-white/10 text-white hover:bg-white/20 border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Send"
              >
                <SendHorizontal size={18} />
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {['Explain this', 'Summarize text', 'Give an example', 'List key points'].map((tip, i) => (
                <button key={i} onClick={() => handleQuickPrompt(tip + ':')} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 text-xs">
                  {tip}
                </button>
              ))}
            </div>
          </div>
          </div>
        </GlassCard>

        {/* Right rail: features + history */}
        <div className="space-y-6">
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Suggested features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featureTiles.map((f, idx) => (
                <GlassCard key={idx} tone="mono" variant="bordered" className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">{f.icon}</div>
                    <div>
                      <div className="text-white font-medium">{f.title}</div>
                      <div className="text-white/60 text-sm">{f.desc}</div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Recent</h3>
            <div className="space-y-2">
              {history.length === 0 && (
                <div className="text-white/50 text-sm">No recent prompts yet.</div>
              )}
              {history.slice(0, 6).map(h => (
                <button key={h.id} onClick={() => setInput(h.prompt)} className="w-full text-left px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white/80">
                  <div className="text-sm truncate">{h.prompt}</div>
                  <div className="text-xs text-white/40">{h.time}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITutor;