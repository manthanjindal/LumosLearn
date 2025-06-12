import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * New landing / home page for LumosLearn.
 * • Snappy hero + GIF
 * • Live-updating user/retention badge
 * • Guest CTA buttons
 * • Voice-Tutor, Quiz-Gen, Playground highlights
 * • Bilingual toggle
 */
const Home: React.FC = () => {
  // ⚡ TODO: swap these mocks for a Firebase listener.
  const [users, setUsers] = useState(1420);
  const [retention, setRetention] = useState(32);

  // Fake ticker so the number animates during demo.
  useEffect(() => {
    const id = setInterval(() => setUsers(u => u + 1), 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="bg-[#0D1117] text-white min-h-screen flex flex-col">
      {/* Language toggle */}
      <div className="fixed top-4 right-4 z-50">
        <LangToggle />
      </div>

      {/* Live-metrics badge */}
      <div className="fixed bottom-4 left-4 z-40 bg-indigo-700/70 backdrop-blur-lg px-4 py-2 rounded-xl text-xs font-medium space-y-0.5">
        <p>{users.toLocaleString()} learners</p>
        <p>{retention}% 7-day retention</p>
      </div>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center flex-1 px-4 pt-24">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl">
          Free <span className="text-emerald-400">AI Tutor</span> in Hindi & English
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-xl text-indigo-200">
          Learn Computer Science and Python in minutes—gamified, bilingual, and always free.
        </p>

        <div className="mt-8 flex gap-4 flex-wrap items-center justify-center">
          <Link
            to="/lessons"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition"
          >
            Start Learning Free
          </Link>
          <Link
            to="/ai-tutor"
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            Try the AI Tutor
          </Link>
        </div>

        {/* Demo GIF */}
        <img
          src="/hero-demo.gif"
          alt="Demo: lesson, chatbot, XP pop-up"
          className="mt-12 w-full max-w-4xl rounded-2xl shadow-2xl ring-4 ring-indigo-600/30"
        />
      </section>

      {/* Feature highlights */}
      <section className="py-20 bg-indigo-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
          <Feature emoji="🎤" title="Voice Tutor" desc="Ask questions out loud and hear answers back—great for on-the-go learning." />
          <Feature emoji="📝" title="Instant Quizzes" desc="Finish any micro-lesson and get AI-generated MCQs that grant XP." />
          <Feature emoji="💻" title="Code Playground" desc="Run Python in the browser and get instant AI feedback." />
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-[#0D1117]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 px-6">
          <img src="/flow.svg" alt="User journey" className="w-full md:w-1/2" />
          <ol className="list-decimal list-inside space-y-6 text-lg md:text-xl">
            <li>Pick a lesson or ask the AI Tutor.</li>
            <li>Practice with voice Q&A, quizzes, and live coding.</li>
            <li>Earn XP, keep your streak, and climb the leaderboard.</li>
          </ol>
        </div>
      </section>

      <footer className="py-10 bg-[#020617] text-center text-sm text-indigo-300">
        © {new Date().getFullYear()} LumosLearn · Built with ❤️ in India
      </footer>
    </main>
  );
};

/* ---------- helpers ---------- */
const LangToggle: React.FC = () => {
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');
  return (
    <button
      onClick={() => setLang(l => (l === 'EN' ? 'HI' : 'EN'))}
      className="rounded-full bg-indigo-700 hover:bg-indigo-600 px-4 py-2 text-sm font-semibold shadow transition"
    >
      {lang === 'EN' ? 'हिन्दी' : 'EN'}
    </button>
  );
};

interface FeatureProps {
  emoji: string;
  title: string;
  desc: string;
}

const Feature: React.FC<FeatureProps> = ({ emoji, title, desc }) => (
  <div className="bg-indigo-700/70 backdrop-blur-lg p-6 rounded-2xl shadow-xl">
    <span className="text-4xl">{emoji}</span>
    <h3 className="text-2xl font-bold mt-4 mb-2">{title}</h3>
    <p className="text-indigo-200 leading-relaxed">{desc}</p>
  </div>
);

export default Home;
