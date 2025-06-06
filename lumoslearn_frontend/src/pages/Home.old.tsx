import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Book, Code, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Home: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-700 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {t('home.title')}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-purple-100">
                {t('home.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/micro-lessons"
                  className="px-6 py-3 bg-white text-purple-700 font-medium rounded-lg shadow-md hover:bg-purple-50 transition-all duration-200 text-center"
                >
                  {t('home.cta')}
                </Link>
                <Link
                  to="/ai-tutor"
                  className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200 text-center"
                >
                  {t('aiTutor.title')}
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-full max-w-md">
                <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20 shadow-xl">
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex flex-col space-y-4">
                    <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                      <p className="text-sm">print("Hello, LumosLearn!")</p>
                    </div>
                    <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                      <p className="text-sm">{"def hello_world():"}</p>
                      <p className="text-sm ml-4">{"return 'Welcome to AI learning!'"}</p>
                    </div>
                    <div className="bg-purple-500 bg-opacity-40 p-3 rounded-lg">
                      <p className="text-sm">{'>>> Hello, LumosLearn!'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Learn AI and Python - Your Way
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Bite-sized lessons, interactive exercises, and a personal AI tutor to guide you through your learning journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md transition-transform duration-200 hover:transform hover:scale-105">
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-6">
                <Brain className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                {t('home.aiTutorSection')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t('home.aiTutorDesc')}
              </p>
              <Link
                to="/ai-tutor"
                className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-200"
              >
                Try AI Tutor →
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md transition-transform duration-200 hover:transform hover:scale-105">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-6">
                <Book className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                {t('home.microLessonsSection')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t('home.microLessonsDesc')}
              </p>
              <Link
                to="/micro-lessons"
                className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
              >
                Browse Lessons →
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md transition-transform duration-200 hover:transform hover:scale-105">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-6">
                <Code className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                {t('home.pythonSection')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t('home.pythonDesc')}
              </p>
              <Link
                to="/python"
                className="text-green-600 dark:text-green-400 font-medium hover:text-green-700 dark:hover:text-green-300 transition-colors duration-200"
              >
                Start Coding →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                  Join Our Learning Community
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Connect with other learners, share your progress, and get help from community experts on our Discord server.
                </p>
                <a
                  href="https://discord.gg"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200"
                >
                  <Users className="w-5 h-5 mr-2" />
                  {t('home.joinDiscord')}
                </a>
              </div>
              <div className="md:w-1/2 bg-indigo-600 p-8 md:p-12 text-white">
                <h3 className="text-2xl font-bold mb-4">Community Benefits</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center mr-3">
                      <span className="text-xs">✓</span>
                    </div>
                    <p>Get help with coding challenges and exercises</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center mr-3">
                      <span className="text-xs">✓</span>
                    </div>
                    <p>Join study groups for different topics</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center mr-3">
                      <span className="text-xs">✓</span>
                    </div>
                    <p>Share your learning journey and success stories</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center mr-3">
                      <span className="text-xs">✓</span>
                    </div>
                    <p>Get notified about new lessons and features</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 