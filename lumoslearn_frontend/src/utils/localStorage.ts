export const LocalStorage = {
  // User data
  setUser: (user: any) => localStorage.setItem('user', JSON.stringify(user)),
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  removeUser: () => localStorage.removeItem('user'),

  // User progress
  setProgress: (progress: any) => localStorage.setItem('progress', JSON.stringify(progress)),
  getProgress: () => {
    const progress = localStorage.getItem('progress');
    return progress ? JSON.parse(progress) : {};
  },

  // Language preference
  setLanguage: (lang: string) => localStorage.setItem('language', lang),
  getLanguage: () => localStorage.getItem('language') || 'en',

  // Theme preference
  setTheme: (theme: string) => localStorage.setItem('theme', theme),
  getTheme: () => localStorage.getItem('theme') || 'light',

  // Lesson progress
  setLessonProgress: (lessonId: string, progress: any) => {
    const allProgress = LocalStorage.getProgress();
    allProgress[lessonId] = progress;
    LocalStorage.setProgress(allProgress);
  },
  getLessonProgress: (lessonId: string) => {
    const allProgress = LocalStorage.getProgress();
    return allProgress[lessonId] || { completed: false, score: 0 };
  },

  // Clear all data
  clearAll: () => {
    localStorage.clear();
  }
}; 