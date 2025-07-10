import React from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle, BookOpen, HelpCircle, Settings } from 'lucide-react';
import EnhancedNavbar from './Navbar';
import FloatingActionButton from '../ui/FloatingActionButton';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const floatingActions = [
    {
      icon: MessageCircle,
      label: 'AI Tutor',
      onClick: () => window.location.href = '/ai-tutor',
      color: 'blue' as const
    },
    {
      icon: BookOpen,
      label: 'Quick Lesson',
      onClick: () => window.location.href = '/lessons',
      color: 'green' as const
    },
    {
      icon: HelpCircle,
      label: 'Help',
      onClick: () => console.log('Help clicked'),
      color: 'orange' as const
    },
    {
      icon: Settings,
      label: 'Settings',
      onClick: () => console.log('Settings clicked'),
      color: 'purple' as const
    }
  ];

  return (
    <div className={`min-h-screen flex flex-col relative z-10 text-white`}>
      <EnhancedNavbar />
      <main className="flex-grow bg-transparent text-white transition-colors duration-200 relative z-10 pt-20">
        {children}
      </main>
      
      {/* Show FAB on all pages except login/register */}
      {!location.pathname.includes('/login') && !location.pathname.includes('/register') && (
        <FloatingActionButton actions={floatingActions} />
      )}
    </div>
  );
};

export default Layout;