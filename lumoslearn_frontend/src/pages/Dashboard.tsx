import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Flame, BookOpen, BarChart, Trophy, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useUserProgress } from '../contexts/UserProgressContext';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { progress } = useUserProgress();
  const navigate = useNavigate();

  // Mock data for recent lessons
  const recentLessons = [
    { id: 'intro_ai', title: 'Introduction to AI', date: '2023-05-10', progress: 100 },
    { id: 'py_basics', title: 'Python Basics', date: '2023-05-08', progress: 100 },
    { id: 'ml_intro', title: 'ML Fundamentals', date: '2023-05-06', progress: 75 },
  ];

  // Mock data for leaderboard
  const leaderboard = [
    { id: 1, name: 'Alex Johnson', xp: 1250, level: 12 },
    { id: 2, name: 'Maria Garcia', xp: 1120, level: 11 },
    { id: 3, name: 'John Smith', xp: 980, level: 9 },
    { id: 4, name: 'Sanjay Patel', xp: 870, level: 8 },
    { id: 5, name: user?.name || 'You', xp: progress.xp, level: progress.level },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
          {t('dashboard.welcome')} {user?.name}
          <span className="ml-2" role="img" aria-label="wave">
            👋
          </span>
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform duration-200 hover:transform hover:scale-105">
          <div className="p-6">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-[#219176] flex items-center justify-center">
                <Trophy className="h-6 w-6 text-[#145968]" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('dashboard.level')}</h3>
                <p className="text-3xl font-bold text-[#145968]">{progress.level}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-[#219176] rounded-full"
                  style={{ width: `${(progress.xp % 100) || 100}%` }}
                ></div>
              </div>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                {progress.xp} XP ({(progress.xp % 100) || 100}/100 to next level)
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform duration-200 hover:transform hover:scale-105">
          <div className="p-6">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-[#219176] flex items-center justify-center">
                <Flame className="h-6 w-6 text-[#145968]" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('dashboard.streak')}</h3>
                <p className="text-3xl font-bold text-[#145968]">{progress.streak}</p>
              </div>
            </div>
            <div className="mt-4 flex space-x-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <div 
                  key={i}
                  className={`flex-1 h-1.5 rounded-full ${
                    i < (progress.streak % 7) 
                      ? 'bg-[#219176]' 
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                ></div>
              ))}
            </div>
            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
              Keep learning daily to maintain your streak!
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform duration-200 hover:transform hover:scale-105">
          <div className="p-6">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-[#219176] flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-[#145968]" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Lessons Completed</h3>
                <p className="text-3xl font-bold text-[#145968]">{progress.lessonsCompleted.length}</p>
              </div>
            </div>
            <div className="mt-4">
              {progress.lessonsCompleted.length > 0 ? (
                <button
                  onClick={() => navigate('/micro-lessons')}
                  className="text-sm text-[#145968] font-medium hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200"
                >
                  View all completed lessons →
                </button>
              ) : (
                <button
                  onClick={() => navigate('/micro-lessons')}
                  className="text-sm text-[#145968] font-medium hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200"
                >
                  Start your first lesson →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Lessons */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-5 border-b dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-[#145968]" />
                {t('dashboard.recentLessons')}
              </h2>
              <button
                onClick={() => navigate('/micro-lessons')}
                className="text-sm text-[#145968] font-medium hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200"
              >
                {t('dashboard.viewAll')}
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentLessons.map(lesson => (
                  <div 
                    key={lesson.id}
                    className="flex items-center p-4 bg-gray-50 dark:bg-gray-750 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                    onClick={() => navigate(`/micro-lessons/${lesson.id}`)}
                  >
                    <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-gradient-to-br from-[#219176] to-[#145968] flex items-center justify-center text-white">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-md font-medium text-gray-900 dark:text-white">{lesson.title}</h3>
                      <div className="mt-1 flex items-center justify-between">
                        <div className="relative w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="absolute top-0 left-0 h-full bg-[#219176] rounded-full"
                            style={{ width: `${lesson.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(lesson.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {recentLessons.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">
                      You haven't completed any lessons yet.
                    </p>
                    <button
                      onClick={() => navigate('/micro-lessons')}
                      className="mt-2 px-4 py-2 bg-[#219176] text-white rounded-lg text-sm font-medium hover:bg-[#145968] transition-colors duration-200"
                    >
                      Browse Lessons
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-5 border-b dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <BarChart className="h-5 w-5 mr-2 text-[#145968]" />
                {t('dashboard.leaderboard')}
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {leaderboard.map((user, index) => (
                  <div 
                    key={user.id}
                    className={`flex items-center p-4 rounded-lg ${
                      user.name === 'You' || user.name === user?.name
                        ? 'bg-[#219176] bg-opacity-50 dark:bg-opacity-20'
                        : 'bg-gray-50 dark:bg-gray-750 hover:bg-gray-100 dark:hover:bg-gray-700'
                    } transition-colors duration-200`}
                  >
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-[#219176] to-[#145968] flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h3 className={`text-md font-medium ${
                          user.name === 'You' || user.name === user?.name
                            ? 'text-[#145968]'
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {user.name}
                          {(user.name === 'You' || user.name === user?.name) && (
                            <span className="ml-2 text-xs bg-[#219176] text-white px-2 py-0.5 rounded-full">
                              You
                            </span>
                          )}
                        </h3>
                        <div className="flex items-center">
                          <Award className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Lvl {user.level}
                          </span>
                        </div>
                      </div>
                      <div className="mt-1 flex items-center">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {user.xp} XP
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;