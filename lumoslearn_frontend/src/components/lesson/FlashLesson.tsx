import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle, Sparkles, Trophy, Zap, Lock, Volume2, PauseCircle, Square } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import ProgressRing from '../ui/ProgressRing';
import type { FlashLesson, FlashCard, QuizCard } from '../../types/lesson';
import { useSpeechSynthesis } from '../../utils/tts';
import { playPerfect, playVictory } from '../../utils/sound';

interface Props {
  lesson: FlashLesson;
  onComplete?: (scorePct: number) => void;
  onNextLesson?: () => void; // navigate to next lesson
}

const cardVariants = {
  enter: { x: 100, opacity: 0, scale: 0.9 },
  center: { x: 0, opacity: 1, scale: 1 },
  exit: { x: -100, opacity: 0, scale: 0.9 }
};

// Render simple rich text: paragraphs and bullet lists
const renderRichText = (body: string) => {
  const blocks = body.split(/\n\n+/);
  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        const lines = block.split('\n');
        const isBulleted = lines.every(l => l.trim().startsWith('•') || l.trim().startsWith('-') || l.trim().startsWith('*'));
        if (isBulleted) {
          return (
            <ul key={i} className="list-disc list-inside space-y-2 text-white/90">
              {lines.map((l, idx) => (
                <li key={idx}>{l.replace(/^\s*[•*-]\s?/, '')}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-white/90 text-lg leading-8">
            {block}
          </p>
        );
      })}
    </div>
  );
};

const celebrationVariants = {
  hidden: { scale: 0, rotate: -180, opacity: 0 },
  visible: { 
    scale: [0, 1.2, 1], 
    rotate: [0, 10, -10, 0],
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' as const }
  }
};

const Confetti: React.FC<{count?: number, durationSec?: number}> = ({ count = 80, durationSec = 3 }) => {
  const colors = ['#ffffff', '#c7d2fe', '#fbcfe8', '#bbf7d0', '#bae6fd', '#fde68a'];
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50" aria-hidden>
      <style>{`
        @keyframes ll_fall { 
          0% { transform: translateY(-10%) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0.9; }
        }
      `}</style>
      {Array.from({ length: count }).map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.6;
        const dur = durationSec + Math.random() * 1.5;
        const size = 6 + Math.random() * 8;
        const bg = colors[i % colors.length];
        const borderRadius = Math.random() > 0.5 ? '2px' : '9999px';
        return (
          <span
            key={i}
            className="absolute block"
            style={{
              top: '-2rem',
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: bg,
              borderRadius,
              animation: `ll_fall ${dur}s ease-out ${delay}s forwards`,
              filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.15))'
            }}
          />
        );
      })}
    </div>
  );
};

const FlashLessonView: React.FC<Props> = ({ lesson, onComplete, onNextLesson }) => {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | undefined>>({});
  const [showResult, setShowResult] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [streak, setStreak] = useState(0);
  const [confettiOn, setConfettiOn] = useState(false);
  const [quizConfettiOn, setQuizConfettiOn] = useState(false);
  const [submittedQuizIds, setSubmittedQuizIds] = useState<Record<string, boolean>>({});
  const tts = useSpeechSynthesis();

  const cards = lesson.cards;
  const total = cards.length;
  const progress = Math.round(((index + 1) / total) * 100);

  const isQuiz = (c: FlashCard): c is QuizCard => c.kind === 'quiz';

  useEffect(() => {
    // Play subtle sound on card flip (optional - add sound hook here)
    if (index > 0) {
      // playSound('cardFlip')
    }
  }, [index]);

  const handleNext = () => {
    if (index < total - 1) {
      setIndex(index + 1);
      // Small celebration animation
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 600);
    } else {
      handleFinish();
    }
    tts.stop();
  };
  
  const handlePrev = () => { 
    if (index > 0) setIndex(index - 1); 
    tts.stop();
  };

  const handleSelect = (cardId: string, qIdx: number, optionIdx: number) => {
    const currentCard = cards[index];
    if (!isQuiz(currentCard)) return;
    
    const question = currentCard.questions[qIdx];
    const isCorrect = optionIdx === question.answer;
    
    setAnswers(prev => ({ ...prev, [`${cardId}:${qIdx}`]: optionIdx }));
    
    // Update streak
    if (isCorrect) {
      setStreak(s => s + 1);
      // playSound('correct')
    } else {
      setStreak(0);
      // playSound('incorrect')
    }
  };

  const allAnsweredForCard = (qc: QuizCard) => {
    return qc.questions.every((_, qi) => answers[`${qc.id}:${qi}`] !== undefined);
  };

  const submitQuizForCard = (qc: QuizCard) => {
    if (!allAnsweredForCard(qc)) return;
    setSubmittedQuizIds(prev => ({ ...prev, [qc.id]: true }));
    // If all answers for this quiz card are correct, fire a celebratory confetti burst
    const allCorrect = qc.questions.every((q, qi) => answers[`${qc.id}:${qi}`] === q.answer);
    if (allCorrect) {
      setQuizConfettiOn(true);
      setTimeout(() => setQuizConfettiOn(false), 2500);
      playPerfect();
    }
  };

  const scorePct = useMemo(() => {
    let correct = 0; let count = 0;
    for (const c of cards) {
      if (isQuiz(c)) {
        c.questions.forEach((q, qi) => {
          count++;
          const sel = answers[`${c.id}:${qi}`];
          if (sel === q.answer) correct++;
        });
      }
    }
    return count === 0 ? 100 : Math.round((correct / count) * 100);
  }, [answers, cards]);

  const handleFinish = () => {
    setShowResult(true);
    // Confetti only on lesson completion
    setConfettiOn(true);
    setTimeout(() => setConfettiOn(false), 4500);
    if (scorePct >= 50) {
      playVictory();
    }
    onComplete?.(scorePct);
  };

  const currentCard = cards[index];
  const isLastCard = index === total - 1;
  const isCurrentQuiz = isQuiz(currentCard);
  const isCurrentQuizSubmitted = isCurrentQuiz && submittedQuizIds[currentCard.id];

  return (
    <div className="w-full relative">
      {confettiOn && <Confetti count={240} durationSec={4.5} />}
      {quizConfettiOn && <Confetti count={120} durationSec={2.5} />}        
      {/* Celebration sparks */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            variants={celebrationVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute top-0 right-0 z-20"
          >
            <Sparkles className="w-12 h-12 text-yellow-400" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header with progress */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <ProgressRing progress={Math.max(progress, 5)} size={72} strokeWidth={6} color="green" />
          <div>
            <div className="text-white font-bold text-lg">{lesson.title}</div>
            <div className="text-white/60 text-sm">Card {index + 1} of {total}</div>
            {streak > 1 && (
              <div className="flex items-center gap-1 text-orange-400 text-sm font-semibold mt-1">
                <Zap className="w-4 h-4" /> {streak} streak! 🔥
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* TTS Controls */}
          <button
            onClick={() => {
              const c = currentCard;
              let text = '';
              if (c.kind === 'info') {
                text = `${c.title ? c.title + '. ' : ''}${c.body.replace(/\n+/g, ' ')}`;
              } else {
                const qs = c.questions.map(q => `${q.question}. Options: ${q.options.join(', ')}.`).join(' ');
                text = `${c.title ? c.title + '. ' : ''}${qs}`;
              }
              tts.speak(text, { rate: 1 });
            }}
            className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20"
            title="Listen to this card"
          >
            <Volume2 className="w-5 h-5"/>
          </button>
          <button onClick={tts.pause} className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10" title="Pause">
            <PauseCircle className="w-5 h-5"/>
          </button>
          <button onClick={tts.stop} className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10" title="Stop">
            <Square className="w-5 h-5"/>
          </button>
          <button 
            onClick={handlePrev} 
            disabled={index===0} 
            className="px-4 py-2 rounded-lg bg-white/5 text-white/80 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="w-5 h-5"/>
          </button>
          <button 
            onClick={handleNext} 
            disabled={isCurrentQuiz && !isCurrentQuizSubmitted}
            className={`px-4 py-2 rounded-lg transition font-medium ${
              isCurrentQuiz && !isCurrentQuizSubmitted
                ? 'bg-white/5 text-white/40 cursor-not-allowed'
                : 'bg-white/15 text-white hover:bg-white/25'
            }`}
          >
            {isLastCard ? 'Finish' : 'Next'} <ChevronRight className="w-5 h-5 inline"/>
          </button>
        </div>
      </div>

      {/* Card stack with animation */}
      <div className="relative min-h-[320px]">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentCard.id} 
            variants={cardVariants} 
            initial="enter" 
            animate="center" 
            exit="exit" 
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <GlassCard tone="mono" variant="bordered" className="p-8 relative overflow-hidden">
              {currentCard.kind === 'info' && (
                <div>
                  {currentCard.title && (
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                      {currentCard.title}
                    </h3>
                  )}
                  <div className="h-1.5 w-24 rounded-full bg-gradient-to-r from-white/40 to-white/10 mb-4" />
                  {renderRichText(currentCard.body)}
                </div>
              )}

              {isQuiz(currentCard) && (
                <div>
                  {currentCard.title && (
                    <div className="mb-6 flex items-center gap-3">
                      <h3 className="text-2xl font-bold text-white">{currentCard.title}</h3>
                      {/* Perfect badge shows if all answers on this quiz are correct */}
                      {currentCard.questions.every((q, qi) => answers[`${currentCard.id}:${qi}`] === q.answer) && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-500/20 text-green-300 border border-green-500/40">
                          Perfect!
                        </span>
                      )}
                    </div>
                  )}
                  {currentCard.questions.map((q, qi) => {
                    const sel = answers[`${currentCard.id}:${qi}`];
                    const isAnswered = sel !== undefined;
                    const isCorrect = sel === q.answer;
                    
                    return (
                      <div key={qi} className="mb-6">
                        <div className="text-white font-semibold text-lg mb-3">{q.question}</div>
                        <div className="grid grid-cols-1 gap-3">
                          {q.options.map((opt, oi) => {
                            const isSelected = sel === oi;
                            const isThisCorrect = oi === q.answer;

                            let btnClass = 'text-left px-4 py-3 rounded-xl border transition-all transform hover:scale-[1.02]';

                            if (!isAnswered) {
                              btnClass += ' border-white/20 bg-white/5 hover:bg-white/10 text-white';
                            } else if (isSelected && isCorrect) {
                              btnClass += ' border-green-500 bg-green-500/20 text-green-300 font-semibold';
                            } else if (isSelected && !isCorrect) {
                              btnClass += ' border-red-500 bg-red-500/20 text-red-300';
                            } else if (isThisCorrect) {
                              btnClass += ' border-green-500 bg-green-500/10 text-green-300';
                            } else {
                              btnClass += ' border-white/10 bg-white/5 text-white/60';
                            }

                            return (
                              <button
                                key={oi}
                                onClick={() => !isAnswered && handleSelect(currentCard.id, qi, oi)}
                                disabled={isAnswered}
                                className={btnClass}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{opt}</span>
                                  {isAnswered && isSelected && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-400"/>}
                                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-400"/>}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                  <div className="mt-4 flex items-center justify-end">
                    <button
                      onClick={() => submitQuizForCard(currentCard)}
                      disabled={!allAnsweredForCard(currentCard) || submittedQuizIds[currentCard.id]}
                      className={`px-4 py-2 rounded-lg border-2 transition ${
                        allAnsweredForCard(currentCard) && !submittedQuizIds[currentCard.id]
                          ? 'border-white/30 bg-white/10 text-white hover:bg-white/20'
                          : 'border-white/10 bg-white/5 text-white/40 cursor-not-allowed'
                      }`}
                    >
                      {submittedQuizIds[currentCard.id] ? 'Submitted' : 'Submit quiz'}
                    </button>
                  </div>
                </div>
              )}
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Result display */}
      {showResult && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-6 rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 text-white"
        >
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              {scorePct >= 50 ? <Trophy className="w-8 h-8 text-white"/> : <XCircle className="w-8 h-8 text-white"/>}
            </div>
            <div className="flex-1">
              <div className="text-2xl font-bold mb-2">
                {scorePct >= 50 ? '🎉 Awesome! Lesson Unlocked!' : '💪 Keep Going!'}
              </div>
              <div className="text-white/80 mb-3">
                Your score: <span className="font-bold text-xl">{scorePct}%</span>
              </div>
              <div className="text-white/70">
                {scorePct >= 50 
                  ? 'You crushed it! The next lesson is now unlocked. Ready to keep learning?' 
                  : 'Score 50%+ to unlock the next lesson. Quick tip: skim the info cards and retry the quiz.'}
              </div>
              <div className="mt-4">
                {scorePct >= 50 ? (
                  <button
                    onClick={onNextLesson}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 bg-gradient-to-r from-green-500/30 to-blue-500/30 border-white/40 hover:from-green-500/40 hover:to-blue-500/40 text-white font-semibold transition shadow-lg"
                  >
                    Next Lesson
                    <ChevronRight className="w-5 h-5"/>
                  </button>
                ) : (
                  <button
                    disabled
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-white/10 bg-white/5 text-white/40 cursor-not-allowed"
                  >
                    <Lock className="w-5 h-5"/>
                    Next Lesson (Locked)
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FlashLessonView;
