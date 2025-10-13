import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-white hover:bg-gray-700/50 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={26} /> : <Moon size={26} />}
    </button>
  );
};

export default ThemeToggle; 