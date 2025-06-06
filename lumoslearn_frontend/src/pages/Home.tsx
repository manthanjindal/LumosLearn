// home.old.tsx





import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="bg-[#0D1117] text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0D1117] z-10" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 30%, #4F46E5 0%, transparent 40%), radial-gradient(circle at 80% 70%, #8B5CF6 0%, transparent 30%)',
          }}
        />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 lg:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 animate-fade-in">
              Learn AI & Python <br /> with{' '}
              <span className="text-[#38BDF8] bg-clip-text text-transparent bg-gradient-to-r from-[#38BDF8] to-[#34D399]">
                Interactive
              </span>{' '}
              Lessons
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-xl mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
              Your journey to mastering technology starts here—bite-sized, bilingual, AI-driven learning
            </p>
            <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
              <Link
                to="/lessons"
                className="inline-block bg-gradient-to-r from-[#34D399] to-[#38BDF8] text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:scale-105 transform transition-all duration-300"
              >
                Start Learning Now
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 mt-10 lg:mt-0 relative animate-fade-in" style={{ animationDelay: '600ms' }}>
            <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 border border-gray-700 shadow-2xl w-full max-w-md mx-auto">
              <div className="flex items-center mb-4">
                <div className="w-3.5 h-3.5 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-green-500"></div>
              </div>
              <pre className="text-left text-sm md:text-base font-mono">
                <code className="text-[#9CDCFE]">
                  <span className="text-[#569CD6]">def</span>
                  <span className="text-white"> hello_world():</span>
                </code>
                <br />
                <code className="text-[#9CDCFE]">
                  {'    '}
                  <span className="text-[#C586C0]">return</span>
                  <span className="text-[#CE9178]"> "Welcome to AI learning!"</span>
                </code>
                <br />
                <br />
                <code className="text-[#4EC9B0]">
                  <span className="text-gray-500">
                    &gt;&gt;&gt; 
                  </span>
                  {' '}
                  <span className="text-[#569CD6]">print</span>
                  <span className="text-white">("Hello, LumosLearn!")</span>
                </code>
                <br />
                <code className="text-[#4EC9B0]">Hello, LumosLearn!</code>
              </pre>
            </div>
            <div className="absolute -bottom-12 -right-12 text-8xl transform -rotate-12 opacity-80">
              🦉
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <ChevronDown size={32} className="text-gray-500" />
        </div>
      </section>

      <section className="py-24 bg-[#0D1117]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-center items-center gap-16 md:gap-24 text-center">
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold">100+</span>
              <span className="text-gray-400 mt-2">Learners</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold">4.9/5</span>
              <span className="text-gray-400 mt-2">Avg. Rating</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold">100+</span>
              <span className="text-gray-400 mt-2">Micro-Lessons</span>
            </div>
          </div>
          <div className="mt-20 max-w-3xl mx-auto text-center">
            <p className="text-xl md:text-2xl italic text-gray-300">
              "LumosLearn made AI and Python so easy and fun to learn!"
            </p>
            <p className="mt-4 text-gray-500 font-semibold">— Student Review</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;