// home.old.tsx





import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Book, Code, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Home: React.FC = () => {
  const { translate } = useLanguage();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex flex-col justify-center bg-gradient-to-br from-indigo-700 via-purple-700 to-fuchsia-700 overflow-hidden animate-gradient-move pt-16">
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 pointer-events-none z-0" style={{background: 'radial-gradient(circle at 60% 40%, rgba(255,255,255,0.08) 0, transparent 70%)'}}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center md:space-x-16">
          {/* Mascot/Illustration Placeholder */}
          <div className="hidden md:flex md:w-1/3 justify-center items-center">
            <div className="w-40 h-40 rounded-full bg-white/20 backdrop-blur-md border-4 border-white/30 flex items-center justify-center shadow-2xl animate-bounce-slow">
              <span className="text-6xl">🦉</span>
            </div>
              </div>
          <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
            <h1 className="text-[2.8rem] md:text-[3.36rem] font-extrabold mb-4 leading-tight text-white drop-shadow-lg animate-fade-in font-montserrat md:ml-4">
              {translate('home.title')}
              </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in delay-100 font-manrope">
              {translate('home.subtitle')}
              </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start animate-fade-in delay-200">
                <Link
                to="/lessons"
                className="px-10 py-4 bg-gradient-to-r from-purple-500 via-indigo-500 to-fuchsia-500 text-white font-bold rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-transform duration-150 text-center tracking-wide border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                >
                {translate('home.cta')}
                </Link>
              </div>
            </div>
          <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
            <div className="w-full max-w-xl">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 border border-white/20 shadow-2xl relative animate-fade-in delay-300 cursor-pointer">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-400/30 rounded-full blur-2xl"></div>
                <div className="flex items-center mb-6">
                  <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                </div>
                <div className="flex flex-col space-y-6">
                  <div className="bg-white/20 p-5 rounded-lg">
                    <p className="text-base md:text-lg">print("Hello, LumosLearn!")</p>
                  </div>
                  <div className="bg-white/20 p-5 rounded-lg">
                    <p className="text-base md:text-lg">{"def hello_world():"}</p>
                    <p className="text-base md:text-lg ml-4">{"return 'Welcome to AI learning!'"}</p>
                    </div>
                  <div className="bg-purple-500/40 p-5 rounded-lg">
                    <p className="text-base md:text-lg">{'>>> Hello, LumosLearn!'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats & Testimonials */}
      <section className="py-8 bg-transparent">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-24">
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold text-purple-500">100+</span>
            <span className="text-gray-700 dark:text-gray-200">{translate('home.stats.learners')}</span>
            </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold text-purple-500">4.9/5</span>
            <span className="text-gray-700 dark:text-gray-200">{translate('home.stats.rating')}</span>
            </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold text-purple-500">100+</span>
            <span className="text-gray-700 dark:text-gray-200">{translate('home.stats.lessons')}</span>
            </div>
            </div>
        <div className="mt-8 max-w-2xl mx-auto text-center">
          <div className="bg-white/30 dark:bg-gray-800/60 rounded-xl p-6 shadow-lg">
            <p className="text-lg italic text-gray-800 dark:text-gray-200">{translate('home.testimonial')}</p>
            <span className="block mt-2 text-purple-600 font-semibold">{translate('home.testimonialAuthor')}</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              {translate('home.features.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {translate('home.features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border-2 border-purple-200 dark:border-purple-700 transition-transform duration-200 hover:scale-105 hover:shadow-xl relative">
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-6 shadow-md">
                <Brain className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                {translate('home.features.aiTutor.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {translate('home.features.aiTutor.description')}
              </p>
              <Link
                to="/ai-tutor"
                className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-200"
              >
                {translate('home.features.aiTutor.cta')}
              </Link>
              <span className="absolute top-4 right-4 bg-purple-500 text-white text-xs px-2 py-1 rounded-full shadow-md animate-pulse">
                {translate('home.features.new')}
              </span>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border-2 border-blue-200 dark:border-blue-700 transition-transform duration-200 hover:scale-105 hover:shadow-xl">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-6 shadow-md">
                <Book className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                {translate('home.features.lessons.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {translate('home.features.lessons.description')}
              </p>
              <Link
                to="/lessons"
                className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
              >
                {translate('home.features.lessons.cta')}
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border-2 border-green-200 dark:border-green-700 transition-transform duration-200 hover:scale-105 hover:shadow-xl">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-6 shadow-md">
                <Code className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                {translate('home.features.python.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {translate('home.features.python.description')}
              </p>
              <Link
                to="/python"
                className="text-green-600 dark:text-green-400 font-medium hover:text-green-700 dark:hover:text-green-300 transition-colors duration-200"
              >
                {translate('home.features.python.cta')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="py-16 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/30 dark:bg-gray-800/80 rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row backdrop-blur-md border border-white/20">
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                {translate('home.community.title')}
                </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {translate('home.community.description')}
                </p>
                <a
                  href="https://discord.gg/gfs9FZF8MC"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-[#7c3aed] text-white font-medium rounded-lg shadow-md hover:bg-[#6d28d9] focus:bg-[#a78bfa] transition-colors duration-200 backdrop-blur-md border border-white/20"
                >
                  <Users className="w-5 h-5 mr-2" />
                {translate('home.community.joinDiscord')}
                <span className="ml-3 bg-white/20 text-xs px-2 py-1 rounded-full">
                  {translate('home.community.joinNow')}
                </span>
                </a>
              </div>
            <div className="md:w-1/2 bg-gradient-to-br from-indigo-600/80 to-purple-700/80 p-8 md:p-12 text-white flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">{translate('home.community.benefits.title')}</h3>
              <ul className="space-y-3">
                {['coding', 'networking', 'resources', 'events'].map((benefit) => (
                  <li key={benefit} className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center mr-3">
                    <span className="text-xs">✓</span>
                    </div>
                    <p>{translate(`home.community.benefits.${benefit}`)}</p>
                  </li>
                ))}
                </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;