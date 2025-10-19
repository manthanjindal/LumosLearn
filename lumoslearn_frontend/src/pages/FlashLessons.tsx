import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import FlashLessonView from '../components/lesson/FlashLesson';
import LessonSidePanel from '../components/lesson/LessonSidePanel';
import { flashCurriculum, getDomainMap } from '../data/flashlessons';
import { useUserProgress } from '../contexts/UserProgressContext';
// icons imported within lesson runner path; not needed here after refactor
import QuestPath from '../components/lesson/QuestPath';

const FlashLessons: React.FC = () => {
  const { topic: routeTopic, lessonId } = useParams<{ topic?: string; lessonId?: string }>();
  const navigate = useNavigate();
  const { progress, updateProgress } = useUserProgress();

  const [currentTopic, setCurrentTopic] = useState<string>(routeTopic || Object.keys(flashCurriculum)[0]);
  const [query, setQuery] = useState<string>('');
  const lessons = useMemo(() => flashCurriculum[currentTopic] || [], [currentTopic]);
  const domainMap = useMemo(() => getDomainMap(), []);

  // unlock logic handled in per-topic QuestPath state mapping

  const activeIndex = lessonId ? lessons.findIndex(l => l.id === lessonId) : -1;

  const handleComplete = (scorePct: number) => {
    const active = lessons[activeIndex];
    if (!active) return;
    updateProgress(active.id, { score: scorePct, completed: scorePct >= 50 });
  };

  // If viewing a specific lesson
  if (activeIndex >= 0) {
    const lesson = lessons[activeIndex];
    const goToNextLesson = () => {
      const nextIdx = activeIndex + 1;
      if (nextIdx < lessons.length) {
        const next = lessons[nextIdx];
        navigate(`/lessons/${encodeURIComponent(currentTopic)}/${next.id}`);
      } else {
        // End of topic - go back to grid
        navigate(`/lessons/${encodeURIComponent(currentTopic)}`);
      }
    };
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <button 
          onClick={() => navigate(`/lessons/${encodeURIComponent(currentTopic)}`)} 
          className="mb-6 text-white/70 hover:text-white transition flex items-center gap-2"
        >
          ← Back to lessons
        </button>
        <div className="flex gap-6">
          <LessonSidePanel topic={currentTopic} lessonTitle={lesson.title} lesson={lesson} />
          <div className="flex-1 min-w-0">
            <FlashLessonView lesson={lesson} onComplete={handleComplete} onNextLesson={goToNextLesson} />
          </div>
        </div>
      </div>
    );
  }

  // If a topic (domain::subdomain) is picked but no lesson is open, show a quest-style path
  if (routeTopic && activeIndex < 0) {
    const nodes = lessons.map((l, idx) => {
      const prog = progress[l.id]?.score || 0;
      const state = idx === 0
        ? 'unlocked'
        : (progress[lessons[idx - 1].id]?.score || 0) >= 50
          ? (prog >= 50 ? 'completed' : 'unlocked')
          : 'locked';
      // add a milestone for every 3rd lesson
      const isMilestone = (idx + 1) % 3 === 0;
      return { id: l.id, title: l.title, state: isMilestone && state !== 'locked' ? 'milestone' as const : (state as any) };
    });
    const q = query.trim().toLowerCase();
    const filteredNodes = q ? nodes.filter(n => (n.title || '').toLowerCase().includes(q)) : nodes;
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <button 
          onClick={() => navigate('/lessons')} 
          className="mb-6 text-white/70 hover:text-white transition flex items-center gap-2"
        >
          ← All domains
        </button>
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <div className="text-3xl font-bold text-white mb-1">{routeTopic}</div>
            <div className="text-white/60">Follow the path and unlock lessons by scoring 50%+.</div>
          </div>
          <div className="w-full max-w-sm">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search lessons"
              className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/30"
            />
          </div>
        </div>
        <QuestPath
          nodes={filteredNodes}
          onOpen={(id) => navigate(`/lessons/${encodeURIComponent(currentTopic)}/${id}`)}
        />
      </div>
    );
  }

  // Otherwise show domain → subdomain directory and latest progress cards
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Hero */}
      <div className="text-center mb-8">
        <h1 className="display-heading text-4xl md:text-5xl text-white mb-3">Your journey starts here</h1>
      </div>

      {/* Search domains/subdomains */}
      <div className="mb-8 flex justify-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search domains or subdomains"
          className="w-full max-w-xl px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/30"
        />
      </div>
      {/* Domains and subdomains directory */}
      {(() => {
        const q = query.trim().toLowerCase();
        const filteredEntries = Object.entries(domainMap).map(([domain, subs]) => {
          if (!q) return [domain, subs] as const;
          const matchDomain = domain.toLowerCase().includes(q);
          const filteredSubs = subs.filter(sd => matchDomain || sd.toLowerCase().includes(q));
          return [domain, filteredSubs] as const;
        }).filter(([_, subs]) => subs.length > 0);
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEntries.length === 0 && (
              <div className="col-span-full text-center text-white/60">No matches found.</div>
            )}
            {filteredEntries.map(([domain, subs], i) => (
          <motion.div key={domain} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <GlassCard tone="mono" variant="bordered" className="p-6">
              <div className="text-xl font-bold text-white mb-2">{domain}</div>
              <div className="space-y-2">
                {subs.map((sd) => {
                  const topicKey = `${domain}::${sd}`;
                  const topicLessons = flashCurriculum[topicKey] || [];
                  const streakPct = Math.round(
                    topicLessons.reduce((acc, l) => acc + (progress[l.id]?.score || 0), 0) / Math.max(topicLessons.length, 1)
                  );
                  return (
                    <button
                      key={sd}
                      onClick={() => {
                        setCurrentTopic(topicKey);
                        navigate(`/lessons/${encodeURIComponent(topicKey)}`);
                      }}
                      className="w-full text-left px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 flex items-center justify-between"
                    >
                      <span>{sd}</span>
                      <span className="text-white/60 text-sm">Avg {streakPct}%</span>
                    </button>
                  );
                })}
              </div>
            </GlassCard>
          </motion.div>
            ))}
          </div>
        );
      })()}

      {/* Motivational footer */}
      <div className="mt-12 text-center">
        <p className="text-white/60 text-sm">
          💡 Tip: Complete lessons to unlock the next challenge. Keep your streak going! 🔥
        </p>
      </div>
    </div>
  );
};

export default FlashLessons;
