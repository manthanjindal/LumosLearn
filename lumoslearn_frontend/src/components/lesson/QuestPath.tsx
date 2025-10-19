import React from 'react';
import { Lock, CheckCircle2, BookOpen, Gift } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

export type QuestNodeState = 'locked' | 'unlocked' | 'completed' | 'milestone';

export type QuestNode = {
  id: string;
  title?: string;
  state: QuestNodeState;
};

type Props = {
  nodes: QuestNode[];
  onOpen: (id: string) => void;
};

const Badge: React.FC<{ state: QuestNodeState }> = ({ state }) => {
  if (state === 'completed') return <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center shadow"><CheckCircle2 className="w-5 h-5"/></div>;
  if (state === 'unlocked') return <div className="w-8 h-8 rounded-full bg-yellow-400 text-white flex items-center justify-center shadow"><BookOpen className="w-5 h-5"/></div>;
  if (state === 'milestone') return <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shadow"><Gift className="w-5 h-5"/></div>;
  return <div className="w-8 h-8 rounded-full bg-white/20 text-white/60 flex items-center justify-center border border-white/20"><Lock className="w-5 h-5"/></div>;
};

// Simple zig-zag path layout; circles staggered left/right like a quest track
const QuestPath: React.FC<Props> = ({ nodes, onOpen }) => {
  return (
    <div className="relative w-full">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-white/10 to-white/5 rounded-full" />
      <div className="space-y-8 py-6">
        {nodes.map((n, idx) => {
          const side = idx % 2 === 0 ? 'justify-start' : 'justify-end';
          const canOpen = n.state === 'unlocked' || n.state === 'completed' || n.state === 'milestone';
          return (
            <div key={n.id} className={`flex ${side}`}>
              <button
                onClick={() => canOpen && onOpen(n.id)}
                disabled={!canOpen}
                className={`group relative ${idx % 2 === 0 ? 'pl-10' : 'pr-10'} inline-flex items-center gap-3 disabled:opacity-50`}
              >
                {idx % 2 === 0 && (
                  <div className="w-24">
                    {n.title && <div className="text-white/80 text-xs truncate">{n.title}</div>}
                  </div>
                )}
                <Badge state={n.state} />
                {idx % 2 === 1 && (
                  <div className="w-24 text-right">
                    {n.title && <div className="text-white/80 text-xs truncate">{n.title}</div>}
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>
      {/* Legend */}
      <GlassCard tone="mono" variant="bordered" className="mt-4 p-3">
        <div className="flex items-center gap-4 text-xs text-white/70">
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-green-500"/> Completed</div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-yellow-400"/> Unlocked</div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-amber-500"/> Milestone</div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-white/20"/> Locked</div>
        </div>
      </GlassCard>
    </div>
  );
};

export default QuestPath;
