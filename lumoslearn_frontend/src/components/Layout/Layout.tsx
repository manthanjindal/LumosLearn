import React from 'react';
import { useLocation } from 'react-router-dom';
import EnhancedNavbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();


  return (
    
    <div className={`min-h-screen flex flex-col relative z-10 text-white`}>
      {/* Subtle grain overlay for texture (hide on home for pitch-black look) */}
      {location.pathname !== '/' && location.pathname !== '/lessons' && (
        <div className="grain-overlay" aria-hidden="true" />
      )}
      <EnhancedNavbar />
      <main className="flex-grow bg-transparent text-white transition-colors duration-200 relative z-10 pt-20">
        {children}
      </main>

    </div>
  );
};

export default Layout;