import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, Globe } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, translate } = useLanguage();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
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
            {user && (
              <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-vscode-highlight transition-colors duration-200">
                {translate('nav.dashboard')}
              </Link>
            )}
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <button 
              onClick={toggleLanguage}
              className="p-2 rounded-md hover:bg-vscode-highlight transition-colors duration-200"
              aria-label="Toggle language"
            >
              <Globe size={20} />
              <span className="ml-1 text-sm font-medium">{language.toUpperCase()}</span>
            </button>
            
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-vscode-highlight transition-colors duration-200"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-vscode-button hover:bg-vscode-button-hover transition-colors duration-200"
              >
                {translate('nav.logout')}
              </button>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md text-sm font-medium text-vscode-button border border-vscode-button hover:bg-vscode-highlight transition-colors duration-200"
                >
                  {translate('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-vscode-button hover:bg-vscode-button-hover transition-colors duration-200"
                >
                  {translate('nav.register')}
                </Link>
              </div>
            )}
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
            {user && (
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-vscode-highlight transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {translate('nav.dashboard')}
              </Link>
            )}
          </div>
          <div className="px-4 py-3 border-t dark:border-vscode-border">
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <button 
                  onClick={toggleLanguage}
                  className="p-2 rounded-md hover:bg-vscode-highlight transition-colors duration-200"
                >
                  <Globe size={20} />
                  <span className="ml-1 text-sm font-medium">{language.toUpperCase()}</span>
                </button>
                
                <button 
                  onClick={toggleTheme}
                  className="p-2 rounded-md hover:bg-vscode-highlight transition-colors duration-200"
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
              
              {user ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-vscode-button hover:bg-vscode-button-hover transition-colors duration-200"
                >
                  {translate('nav.logout')}
                </button>
              ) : (
                <div className="flex space-x-2">
                  <Link
                    to="/login"
                    className="px-3 py-2 rounded-md text-sm font-medium text-vscode-button border border-vscode-button hover:bg-vscode-highlight transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {translate('nav.login')}
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-md text-sm font-medium text-white bg-vscode-button hover:bg-vscode-button-hover transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {translate('nav.register')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;