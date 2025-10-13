export type StoredUser = { id: string; name: string; email: string } | null;

export type StoredProgress = Record<string, {
  completed: boolean;
  score: number;
  lastAccessed?: string;
  notes?: string[];
}>;

export const LocalStorage = {
  // User data
  setUser: (user: StoredUser) => localStorage.setItem('user', JSON.stringify(user)),
  getUser: (): StoredUser => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  removeUser: () => localStorage.removeItem('user'),

  // User progress
  setProgress: (progress: StoredProgress) => localStorage.setItem('progress', JSON.stringify(progress)),
  getProgress: (): StoredProgress => {
    const progress = localStorage.getItem('progress');
    return progress ? JSON.parse(progress) : {} as StoredProgress;
  },

  // Language preference
  setLanguage: (lang: string) => localStorage.setItem('language', lang),
  getLanguage: () => localStorage.getItem('language') || 'en',

  // Theme preference
  setTheme: (theme: string) => localStorage.setItem('theme', theme),
  getTheme: () => localStorage.getItem('theme') || 'light',

  // Lesson progress
  setLessonProgress: (lessonId: string, progress: StoredProgress[string]) => {
    const allProgress = LocalStorage.getProgress();
    allProgress[lessonId] = progress;
    LocalStorage.setProgress(allProgress);
  },
  getLessonProgress: (lessonId: string): StoredProgress[string] => {
    const allProgress = LocalStorage.getProgress();
    return allProgress[lessonId] || { completed: false, score: 0 };
  },

  // Clear all data
  clearAll: () => {
    localStorage.clear();
  }
}; 