import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { MessageSquare } from 'lucide-react';

const Footer: React.FC = () => {
  const { translate } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner py-6 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              &copy; {currentYear} LumosLearn. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center justify-center mb-4 md:mb-0">
            <a
              href="https://discord.gg/gfs9FZF8MC" 
              target="_blank"
              rel="noreferrer"
              className="flex items-center px-4 py-2 rounded-md text-white bg-[#7c3aed] hover:bg-[#6d28d9] focus:bg-[#a78bfa] transition-colors duration-200"
            >
              <MessageSquare size={18} className="mr-2" />
              {translate('home.joinDiscord')}
            </a>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-[#219176] dark:hover:text-[#145968] transition-colors duration-200">
              {translate('footer.terms')}
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-[#219176] dark:hover:text-[#145968] transition-colors duration-200">
              {translate('footer.privacy')}
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-[#219176] dark:hover:text-[#145968] transition-colors duration-200">
              {translate('footer.contact')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;