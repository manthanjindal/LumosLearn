import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const NotFound: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <div className="mx-auto h-32 w-32 rounded-full bg-[#219176] flex items-center justify-center text-[#145968]">
            <span className="text-6xl font-bold">404</span>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t('notFound.title')}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          {t('notFound.description')}
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-[#219176] hover:bg-[#219176] transition-colors duration-200"
        >
          {t('nav.home')}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;