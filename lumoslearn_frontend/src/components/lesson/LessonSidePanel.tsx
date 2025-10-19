import React, { useMemo, useRef, useState } from 'react';
import GlassCard from '../ui/GlassCard';
import { Bot, Lightbulb, Play, Pause, Move, X, Music, Video, SkipBack, SkipForward, ListMusic } from 'lucide-react';
// no router usage needed here
import LumiFloat from './LumiFloat';

import type { FlashLesson } from '../../types/lesson';

type PanelProps = {
  topic?: string;
  lessonTitle?: string;
  lesson?: FlashLesson;
};

const extractYouTubeId = (url: string): string | null => {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtube.com')) {
      if (u.pathname === '/watch') return u.searchParams.get('v');
      if (u.pathname.startsWith('/embed/')) return u.pathname.split('/').pop() || null;
      if (u.pathname.startsWith('/shorts/')) return u.pathname.split('/').pop() || null;
    }
    if (u.hostname === 'youtu.be') {
      return u.pathname.split('/').pop() || null;
    }
    return null;
  } catch {
    return null;
  }
};

const DraggableFloat: React.FC<{
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  contentVariant?: 'video' | 'auto' | 'portrait';
  width?: number;
  height?: number;
}> = ({ title, onClose, children, contentVariant = 'video', width, height }) => {
  const [pos, setPos] = useState<{x:number;y:number}>(() => {
    try {
      const raw = localStorage.getItem('ll_float_pos');
      if (raw) return JSON.parse(raw);
    } catch {
      /* ignore localStorage read errors */
    }
    return { x: 60, y: 80 };
  });
  const [dragging, setDragging] = useState(false);
  const [minimized, setMinimized] = useState<boolean>(() => {
    try { return localStorage.getItem('ll_float_min') === '1'; } catch {
      /* ignore localStorage read errors */
      return false;
    }
  });
  const dragRef = useRef<HTMLDivElement | null>(null);
  const offset = useRef({ x: 0, y: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    const rect = dragRef.current?.getBoundingClientRect();
    offset.current = { x: e.clientX - (rect?.left || 0), y: e.clientY - (rect?.top || 0) };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const nx = e.clientX - offset.current.x;
    const ny = e.clientY - offset.current.y;
    const next = { x: Math.max(8, Math.min(window.innerWidth - 280, nx)), y: Math.max(8, Math.min(window.innerHeight - 180, ny)) };
    setPos(next);
    try { localStorage.setItem('ll_float_pos', JSON.stringify(next)); } catch {
      /* ignore localStorage write errors */
    }
  };
  const onPointerUp = (e: React.PointerEvent) => {
    setDragging(false);
    (e.target as Element).releasePointerCapture?.(e.pointerId);
  };

  return (
    <div
      ref={dragRef}
      className={`fixed z-50 rounded-xl overflow-hidden border border-white/20 bg-black/70 backdrop-blur-lg shadow-2xl ${minimized ? 'w-[220px] h-[44px]' : ''}`}
      style={{ left: pos.x, top: pos.y }}
    >
      <div
        className="cursor-grab active:cursor-grabbing flex items-center justify-between gap-2 px-3 py-2 bg-white/10"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div className="flex items-center gap-2 text-white/80 text-sm">
          <Move className="w-4 h-4" />
          {title}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { const v = !minimized; setMinimized(v); try { localStorage.setItem('ll_float_min', v ? '1' : '0'); } catch { /* ignore */ } }}
            className="text-white/70 hover:text-white"
            title={minimized ? 'Restore' : 'Minimize'}
          >
            {minimized ? <Play className="w-4 h-4"/> : <MinusIcon/>}
          </button>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      {!minimized && (
        <div
          className={`${contentVariant === 'video' ? 'aspect-video' : contentVariant === 'portrait' ? '' : ''} bg-black`}
          style={{ width: width ?? (contentVariant === 'portrait' ? 280 : 260), height: height ?? (contentVariant === 'portrait' ? 476 : contentVariant === 'video' ? undefined : 260) }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

const LessonSidePanel: React.FC<PanelProps> = ({ topic, lessonTitle, lesson }) => {
  // no navigate needed
  const [showFloat, setShowFloat] = useState(false);
  const [mode, setMode] = useState<'music' | 'video' | null>(null);
  const ambientPlaylist = useMemo(() => [
    'https://youtu.be/6me17gGZYRg?si=dWrDUQOZDXDcee6T',
    'https://youtu.be/t87ySaPrwjY?si=n7NlN5liPMKOctZC',
    'https://youtu.be/gi8mof8WvU0?si=EXbqCZIToUuDOhtE',
    'https://youtu.be/xkfGWLVn0xE?si=FLjT56MDn1i13bNs',
    'https://youtu.be/xkfGWLVn0xE?si=aCRDu6Vviyx7f4DH',
    'https://youtu.be/V7aD_4HdXj8?si=04KQjLF16Znk-6yw',
    'https://youtu.be/DYPPtz9vFzY?si=9pKdVSEBICM7RZ_v',
  ].map((u, i) => ({ url: u, id: extractYouTubeId(u), label: `Lo-fi Track ${i + 1}` })), []);
  const [trackIdx, setTrackIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const iframeRef = React.useRef<HTMLIFrameElement | null>(null);
  const currentTrack = ambientPlaylist[trackIdx];
  const subwayUrl = 'https://youtu.be/QPW3XwBoQlw?si=f72ONJqPKMwg0wBP';
  const subwayId = useMemo(() => extractYouTubeId(subwayUrl), []);
  const videoId = useMemo(() => {
    if (mode === 'music') return currentTrack?.id || null;
    if (mode === 'video') return subwayId || null;
    return null;
  }, [mode, currentTrack, subwayId]);

  const ytCmd = (func: 'playVideo' | 'pauseVideo') => {
    try {
      const win = iframeRef.current?.contentWindow;
      if (!win) return;
      win.postMessage(JSON.stringify({ event: 'command', func, args: [] }), '*');
    } catch {
      /* ignore postMessage errors */
    }
  };

  const facts = useMemo(() => {
    // Keep it genuinely fun and short — capped at 2
    const funGeneric = [
      'The first “AI” term was coined in 1956 at a summer workshop — with 10 people and big dreams.',
      'Computers can “dream” too — some AIs generate surreal images from noise.'
    ];
    if (!topic) return funGeneric.slice(0, 2);
    const t = topic.toLowerCase();
    if (t.includes('ai')) return [
      'Your phone uses mini AIs all the time — from face unlock to photo filters.',
      'AI once beat world champs in Go — a game humans thought computers couldn’t master.'
    ];
    if (t.includes('machine')) return [
      'ML can find cat pics in millions of photos — even if you never typed “cat”.',
      'Spam filters are OG machine learning — saving inboxes since the 90s.'
    ];
    if (t.includes('deep')) return [
      'Deep nets take “baby steps” layer by layer — then suddenly get really smart.',
      'Neural nets once learned to write Shakespeare-ish text. To be, or not to be… plausible!'
    ];
    return funGeneric.slice(0, 2);
  }, [topic]);

  const [showChat, setShowChat] = useState(false);
  const askLumi = (prompt?: string) => {
    if (prompt) {
      try { localStorage.setItem('ai_suggested_prompt', prompt); } catch { /* ignore */ }
    }
    setShowChat(true);
  };

  return (
    <div className="hidden md:block w-[320px] shrink-0">
      <div className="sticky top-6 space-y-4">
        {/* Ask Lumi */}
        <GlassCard tone="mono" variant="bordered" className="p-4">
          <div className="text-white font-semibold mb-3 flex items-center gap-2">
            <Bot className="w-5 h-5"/> Ask Lumi
          </div>
          <div className="grid grid-cols-1 gap-2">
            <button onClick={() => askLumi(`Summarize: ${lessonTitle || 'this lesson'} in simple terms.`)} className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm">Summarize this lesson</button>
            <button onClick={() => askLumi(`Quiz me on ${topic || 'this topic'} with 5 questions.`)} className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm">Quiz me (5 Qs)</button>
            <button onClick={() => askLumi(`Explain ${topic || 'this concept'} like I'm 12.`)} className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm">Explain like I’m 12</button>
          </div>
          <div className="mt-2 text-white/50 text-xs">Opens a floating chat with Lumi.</div>
        </GlassCard>

        {/* Fun facts */}
        <GlassCard tone="mono" variant="bordered" className="p-4">
          <div className="text-white font-semibold mb-2 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-300"/> Fun facts
          </div>
          <ul className="list-disc list-inside text-white/80 space-y-1 text-sm">
            {facts.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </GlassCard>

        {/* Removed Watch-outs per request */}

        {/* Ambient / Video controls */}
        <GlassCard tone="mono" variant="bordered" className="p-4">
          <div className="text-white font-semibold mb-3">Focus goodies</div>
          <div className="flex items-center gap-2 mb-3">
            <button onClick={() => { setMode('music'); setShowFloat(true); }} className="flex-1 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm inline-flex items-center gap-2">
              <Music className="w-4 h-4"/> Ambient music
            </button>
            <button onClick={() => { setMode('video'); setShowFloat(true); setIsPlaying(true); }} className="flex-1 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm inline-flex items-center gap-2">
              <Video className="w-4 h-4"/> Subway Surfers (portrait)
            </button>
          </div>
          <div className="space-y-2">
            <div className="text-white/60 text-xs uppercase tracking-wide flex items-center gap-2">
              <ListMusic className="w-3 h-3"/> Ambient Playlist
            </div>
            <div className="max-h-40 overflow-auto rounded-lg border border-white/10">
              {ambientPlaylist.map((t, i) => (
                <button
                  key={t.id || `${i}`}
                  onClick={() => { setTrackIdx(i); setMode('music'); setShowFloat(true); }}
                  className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between ${i===trackIdx ? 'bg-white/10 text-white' : 'bg-transparent text-white/80 hover:bg-white/5'}`}
                >
                  <span>{t.label}</span>
                  {i===trackIdx && <Play className="w-4 h-4"/>}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => { setTrackIdx(i => (i-1+ambientPlaylist.length)%ambientPlaylist.length); setMode('music'); setShowFloat(true); setIsPlaying(true); }} className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm inline-flex items-center gap-2">
                <SkipBack className="w-4 h-4"/> Prev
              </button>
              <button onClick={() => { setTrackIdx(i => (i+1)%ambientPlaylist.length); setMode('music'); setShowFloat(true); setIsPlaying(true); }} className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm inline-flex items-center gap-2">
                <SkipForward className="w-4 h-4"/> Next
              </button>
              <a href="/ai-tutor" className="ml-auto text-white/60 hover:text-white text-xs">Need help focusing?</a>
            </div>
          </div>
        </GlassCard>
      </div>

      {showFloat && (
        <DraggableFloat
          title={mode === 'music' ? (currentTrack?.label || 'Ambient player') : 'Subway Surfers'}
          onClose={() => { setShowFloat(false); setIsPlaying(false); ytCmd('pauseVideo'); }}
          contentVariant={mode === 'music' ? 'auto' : 'portrait'}
        >
          {mode === 'music' ? (
            <div className="relative w-[260px] h-[260px]">
              <style>{`
                @keyframes ll_spin_slow { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
              `}</style>
              {/* Thumbnail background */}
              <div
                className="absolute inset-0 rounded-b-xl overflow-hidden"
                style={{ backgroundImage: videoId ? `url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
              {/* Vinyl disc */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="relative rounded-full border border-white/20 shadow-2xl"
                  style={{ width: 180, height: 180, background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15), rgba(0,0,0,0.6) 60%)', animation: isPlaying ? 'll_spin_slow 12s linear infinite' : 'none' }}
                >
                  {/* Vinyl grooves */}
                  <div className="absolute inset-0 rounded-full" style={{ boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.06), inset 0 0 0 6px rgba(255,255,255,0.04), inset 0 0 0 10px rgba(255,255,255,0.02)'}} />
                  {/* Label */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 text-black text-xs font-semibold flex items-center justify-center" style={{ width: 42, height: 42 }}>
                    Lo-fi
                  </div>
                </div>
              </div>
              {/* Controls overlay */}
              <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-3">
                <button
                  onClick={() => { setTrackIdx(i => (i-1+ambientPlaylist.length)%ambientPlaylist.length); setIsPlaying(true); }}
                  className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 border border-white/20"
                  title="Previous"
                >
                  <SkipBack className="w-4 h-4"/>
                </button>
                <button
                  onClick={() => { if (isPlaying) { ytCmd('pauseVideo'); setIsPlaying(false); } else { ytCmd('playVideo'); setIsPlaying(true); } }}
                  className="p-3 rounded-full bg-black/60 text-white hover:bg-black/80 border border-white/20"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-5 h-5"/> : <Play className="w-5 h-5"/>}
                </button>
                <button
                  onClick={() => { setTrackIdx(i => (i+1)%ambientPlaylist.length); setIsPlaying(true); }}
                  className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 border border-white/20"
                  title="Next"
                >
                  <SkipForward className="w-4 h-4"/>
                </button>
              </div>
              {/* Hidden YouTube iframe for audio control */}
              {videoId && (
                <iframe
                  ref={iframeRef}
                  className="absolute w-[1px] h-[1px] opacity-0 pointer-events-none"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&rel=0&playsinline=1&enablejsapi=1`}
                  title="Ambient Audio"
                  allow="autoplay; encrypted-media"
                />
              )}
            </div>
          ) : (
            videoId ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&playsinline=1&mute=1`}
                title="Subway Surfers"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/70 text-sm p-3 text-center">
                Subway Surfers video coming soon.
              </div>
            )
          )}
        </DraggableFloat>
      )}
      {showChat && (
        <DraggableFloat
          title="Ask Lumi"
          onClose={() => setShowChat(false)}
          contentVariant="auto"
          width={360}
          height={520}
        >
          <div className="w-[360px] h-[520px]">
            {lesson ? (
              <LumiFloat lesson={lesson} />
            ) : (
              <div className="w-full h-full text-white/70 p-4 text-sm">Lumi needs the full lesson to start. Please open a lesson to continue.</div>
            )}
          </div>
        </DraggableFloat>
      )}
    </div>
  );
};

export default LessonSidePanel;

// small inline minus icon
function MinusIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
