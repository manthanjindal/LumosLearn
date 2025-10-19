import React, { useEffect, useMemo, useRef, useState } from 'react';
import GlassCard from '../ui/GlassCard';
import { sendChatMessage } from '../../utils/api';
import type { FlashLesson } from '../../types/lesson';
import { Bot, Send } from 'lucide-react';

type Msg = { role: 'user' | 'assistant'; content: string };

type Props = {
  lesson: FlashLesson;
};

const LumiFloat: React.FC<Props> = ({ lesson }) => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const lessonText = useMemo(() => {
    const parts: string[] = [];
    parts.push(`# ${lesson.title}`);
    for (const c of lesson.cards) {
      if (c.kind === 'info') {
        parts.push(`## ${c.title || 'Info'}`);
        parts.push(c.body);
      } else if (c.kind === 'quiz') {
        parts.push(`## Quiz: ${c.title || ''}`.trim());
        c.questions.forEach((q, i) => {
          parts.push(`Q${i + 1}: ${q.question}`);
          parts.push(`Options: ${q.options.join(', ')}`);
        });
      }
    }
    return parts.join('\n\n');
  }, [lesson]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send context on mount
  useEffect(() => {
    const boot = async () => {
      setIsLoading(true);
      const intro = `Context: Here is the lesson content. Store it as context. Respond briefly to confirm you're ready and tell me to choose a mode.\n\n${lessonText}`;
      const history = [] as { role: 'user' | 'model'; content: string }[];
      setMessages([{ role: 'user', content: 'Sending lesson context…' }]);
      try {
        const resp = await sendChatMessage(intro, history);
        setMessages(prev => [...prev, { role: 'assistant', content: resp || "Loaded. Choose a mode: Brainrot, Simple, or Deepen." }]);
      } catch {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Could not load lesson context. You can still pick a mode to proceed.' }]);
      } finally {
        setIsLoading(false);
      }
    };
    boot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMode = async (mode: 'brainrot' | 'simple' | 'deepen') => {
    setIsLoading(true);
    const instruction =
      mode === 'brainrot'
        ? 'Explain in brainrot Gen Z style: short lines, emojis, slang; stay accurate and helpful.'
        : mode === 'simple'
        ? 'Explain in simple language for a beginner, with clear steps and concrete examples.'
        : 'Deepen my concept: go beyond basics with analogies, edge cases, misconceptions, and practical tips.';

    const prompt = `${instruction}\n\nUse this lesson content:\n\n${lessonText}`;
    setMessages(prev => [...prev, { role: 'user', content: `Mode selected: ${mode}` }]);
    try {
      const resp = await sendChatMessage(prompt, messages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', content: m.content })));
      setMessages(prev => [...prev, { role: 'assistant', content: resp }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I ran into an issue responding. Try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full">
      <GlassCard tone="mono" variant="bordered" className="p-0 h-full flex flex-col">
        <div className="px-3 py-2 border-b border-white/10 flex items-center gap-2">
          <Bot className="w-4 h-4 text-white/80"/>
          <div className="text-white text-sm font-medium">Lumi — compact</div>
        </div>
        {/* Mode choices */}
        <div className="p-3 border-b border-white/10 flex items-center gap-2">
          <button onClick={() => sendMode('brainrot')} className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs">Explain in brainrot</button>
          <button onClick={() => sendMode('simple')} className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs">Explain simply</button>
          <button onClick={() => sendMode('deepen')} className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs">Deepen concept</button>
        </div>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-3 py-2 rounded-lg text-sm border ${m.role === 'user' ? 'bg-white/10 border-white/15 text-white' : 'bg-white/5 border-white/10 text-white/90'}`}>
                {m.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-white/60 text-xs">Thinking…</div>
          )}
          <div ref={endRef} />
        </div>
        {/* Optional free-form input (kept compact) */}
        <div className="p-2 border-t border-white/10 text-white/50 text-[11px] flex items-center gap-2">
          Tip: Pick a mode to begin. You can ask follow-ups after.
          <Send className="w-3 h-3"/>
        </div>
      </GlassCard>
    </div>
  );
};

export default LumiFloat;
