import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Menu, X, Globe } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface ToggleSwitchProps {
  isToggled: boolean;
  onToggle: () => void;
  IconOn: React.ElementType;
  IconOff: React.ElementType;
  labelOn: string;
  labelOff: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isToggled, onToggle, IconOn, IconOff, labelOn, labelOff }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex items-center h-8 w-24 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
        isToggled ? 'bg-indigo-600' : 'bg-gray-400'
      }`}
    >
      <span className="sr-only">Toggle</span>
      <span
        className={`absolute left-1 transition-transform duration-300 ease-in-out transform ${
          isToggled ? 'translate-x-16' : 'translate-x-0'
        } h-6 w-6 rounded-full bg-white shadow-lg flex items-center justify-center`}
      >
        {isToggled ? <IconOn className="h-4 w-4 text-indigo-600" /> : <IconOff className="h-4 w-4 text-gray-600" />}
      </span>
      <div className="w-full flex justify-around text-white text-xs font-semibold">
        <span>{labelOff}</span>
        <span>{labelOn}</span>
      </div>
    </button>
  );
};

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, translate } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <nav className="bg-white dark:bg-vscode-sidebar border-b dark:border-vscode-border sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-vscode-button to-vscode-button-hover flex items-center justify-center text-white font-bold text-xl">
                L
              </div>
              <span className="ml-2 text-xl font-bold text-vscode-button dark:text-vscode-button-hover">
                LumosLearn
              </span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-vscode-highlight transition-colors duration-200">
              {translate('nav.home')}
            </Link>
            <Link to="/lessons" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-vscode-highlight transition-colors duration-200">
              {translate('nav.lessons')}
            </Link>
            <Link to="/ai-tutor" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-vscode-highlight transition-colors duration-200">
              {translate('nav.aiTutor')}
            </Link>
            <Link to="/python" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-vscode-highlight transition-colors duration-200">
              {translate('nav.pythonModule')}
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <ToggleSwitch
              isToggled={language === 'hi'}
              onToggle={toggleLanguage}
              IconOn={Globe}
              IconOff={Globe}
              labelOn="HI"
              labelOff="EN"
            />
            <ToggleSwitch
              isToggled={theme === 'dark'}
              onToggle={toggleTheme}
              IconOn={Moon}
              IconOff={Sun}
              labelOn=""
              labelOff=""
            />
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-vscode-highlight transition-colors duration-200"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-vscode-sidebar border-t dark:border-vscode-border transition-all duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-vscode-highlight transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              {translate('nav.home')}
            </Link>
            <Link
              to="/lessons"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-vscode-highlight transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              {translate('nav.lessons')}
            </Link>
            <Link
              to="/ai-tutor"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-vscode-highlight transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              {translate('nav.aiTutor')}
            </Link>
            <Link
              to="/python"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-vscode-highlight transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              {translate('nav.pythonModule')}
            </Link>
          </div>
          <div className="px-4 py-3 border-t dark:border-vscode-border">
            <div className="flex items-center justify-around">
               <ToggleSwitch
                isToggled={language === 'hi'}
                onToggle={() => { toggleLanguage(); setIsMenuOpen(false); }}
                IconOn={Globe}
                IconOff={Globe}
                labelOn="HI"
                labelOff="EN"
              />
              <ToggleSwitch
                isToggled={theme === 'dark'}
                onToggle={() => { toggleTheme(); setIsMenuOpen(false); }}
                IconOn={Moon}
                IconOff={Sun}
                labelOn=""
                labelOff=""
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;