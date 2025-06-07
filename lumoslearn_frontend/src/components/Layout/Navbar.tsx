import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Languages } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Navbar: React.FC = () => {
  const { language, setLanguage, translate } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const navClass = `
    sticky top-0 z-50 transition-all duration-300
    ${isScrolled ? 'bg-gray-900/60 backdrop-blur-xl border-b border-gray-700/50' : 'bg-transparent'}
  `;

  return (
    <nav className={navClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-black font-bold text-xl">
                L
              </div>
              <span className="ml-3 text-2xl font-bold text-white">
                LumosLearn
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6 text-white">
            <Link to="/" className="text-sm font-medium hover:text-[#38BDF8] transition-colors">
              {translate('nav.home')}
            </Link>
            <Link to="/lessons" className="text-sm font-medium hover:text-[#38BDF8] transition-colors">
              {translate('nav.lessons')}
            </Link>
            <Link to="/ai-tutor" className="text-sm font-medium hover:text-[#38BDF8] transition-colors">
              {translate('nav.aiTutor')}
            </Link>
            <Link to="/python" className="text-sm font-medium hover:text-[#38BDF8] transition-colors">
              {translate('nav.pythonModule')}
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button onClick={toggleLanguage} className="p-2 rounded-full text-white hover:bg-gray-700/50">
              <Languages size={26} />
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-white hover:bg-gray-700/50 transition-colors"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700/50" onClick={() => setIsMenuOpen(false)}>
              {translate('nav.home')}
            </Link>
            <Link to="/lessons" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700/50" onClick={() => setIsMenuOpen(false)}>
              {translate('nav.lessons')}
            </Link>
            <Link to="/ai-tutor" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700/50" onClick={() => setIsMenuOpen(false)}>
              {translate('nav.aiTutor')}
            </Link>
            <Link to="/python" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700/50" onClick={() => setIsMenuOpen(false)}>
              {translate('nav.pythonModule')}
            </Link>
          </div>
          <div className="py-4 border-t border-gray-700">
            <div className="flex items-center justify-center space-x-4">
              <button onClick={toggleLanguage} className="p-2 rounded-full text-white hover:bg-gray-700/50">
                <Languages size={28} />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;