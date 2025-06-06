import React, { createContext, useContext, useState, useEffect } from 'react';
import { LocalStorage } from '../utils/localStorage';

interface Progress {
    [lessonId: string]: {
    completed: boolean;
    score: number;
    lastAccessed?: string;
    notes?: string[];
  };
}

interface UserProgressContextType {
  progress: Progress;
  updateProgress: (lessonId: string, data: any) => void;
  markLessonComplete: (lessonId: string, score: number) => void;
  getLessonProgress: (lessonId: string) => any;
  addNote: (lessonId: string, note: string) => void;
  resetProgress: () => void;
}

const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

export const UserProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<Progress>(LocalStorage.getProgress());

  useEffect(() => {
    const storedProgress = LocalStorage.getProgress();
    setProgress(storedProgress);
  }, []);

  const updateProgress = (lessonId: string, data: any) => {
    const updatedProgress = {
      ...progress,
      [lessonId]: {
        ...progress[lessonId],
        ...data,
        lastAccessed: new Date().toISOString()
      }
    };
    setProgress(updatedProgress);
    LocalStorage.setProgress(updatedProgress);
  };

  const markLessonComplete = (lessonId: string, score: number) => {
    updateProgress(lessonId, {
      completed: true,
      score,
      lastAccessed: new Date().toISOString()
    });
  };

  const getLessonProgress = (lessonId: string) => {
    return progress[lessonId] || { completed: false, score: 0 };
  };

  const addNote = (lessonId: string, note: string) => {
    const currentProgress = progress[lessonId] || { completed: false, score: 0, notes: [] };
    const updatedNotes = [...(currentProgress.notes || []), note];
    updateProgress(lessonId, { notes: updatedNotes });
  };

  const resetProgress = () => {
    setProgress({});
    LocalStorage.setProgress({});
  };

  return (
    <UserProgressContext.Provider value={{
      progress,
      updateProgress,
      markLessonComplete,
      getLessonProgress,
      addNote,
      resetProgress
    }}>
      {children}
    </UserProgressContext.Provider>
  );
};

export const useUserProgress = () => {
  const context = useContext(UserProgressContext);
  if (context === undefined) {
    throw new Error('useUserProgress must be used within a UserProgressProvider');
  }
  return context;
};