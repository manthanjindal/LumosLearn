import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={`min-h-screen flex flex-col`}>
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-vscode-bg text-gray-900 dark:text-vscode-text transition-colors duration-200">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;