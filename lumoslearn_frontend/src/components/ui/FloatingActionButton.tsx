import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MessageCircle, BookOpen, Settings, HelpCircle, X } from 'lucide-react';

interface FloatingAction {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  color?: 'purple' | 'blue' | 'green' | 'orange' | 'pink';
}

interface FloatingActionButtonProps {
  actions: FloatingAction[];
  className?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  actions,
  className = '',
  position = 'bottom-right'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  };

  const colorStyles = {
    purple: 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/30',
    blue: 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/30',
    green: 'bg-green-600 hover:bg-green-700 shadow-green-500/30',
    orange: 'bg-orange-600 hover:bg-orange-700 shadow-orange-500/30',
    pink: 'bg-pink-600 hover:bg-pink-700 shadow-pink-500/30'
  };

  const getActionDirection = () => {
    if (position.includes('bottom')) return 'up';
    return 'down';
  };

  const getActionAlignment = () => {
    if (position.includes('right')) return 'right';
    return 'left';
  };

  const direction = getActionDirection();
  const alignment = getActionAlignment();

  return (
    <div className={`fixed ${positionClasses[position]} z-50 ${className}`}>
      <div className="relative">
        {/* Action Items */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={`absolute ${direction === 'up' ? 'bottom-16' : 'top-16'} 
                         ${alignment === 'right' ? 'right-0' : 'left-0'} 
                         flex flex-col gap-3`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {actions.map((action, index) => (
                <motion.button
                  key={action.label}
                  className={`
                    w-12 h-12 rounded-full shadow-lg 
                    ${colorStyles[action.color || 'purple']}
                    flex items-center justify-center
                    hover:scale-110 transition-all duration-200
                    group relative
                  `}
                  initial={{ 
                    opacity: 0, 
                    scale: 0,
                    x: alignment === 'right' ? 20 : -20
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: 0
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0,
                    x: alignment === 'right' ? 20 : -20
                  }}
                  transition={{ 
                    duration: 0.2, 
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                  onClick={() => {
                    action.onClick();
                    setIsOpen(false);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <action.icon className="w-5 h-5 text-white" />
                  
                  {/* Tooltip */}
                  <motion.div
                    className={`
                      absolute ${alignment === 'right' ? 'right-14' : 'left-14'} 
                      top-1/2 transform -translate-y-1/2
                      bg-black/90 text-white text-sm px-3 py-2 rounded-lg
                      opacity-0 group-hover:opacity-100 transition-opacity duration-200
                      whitespace-nowrap pointer-events-none
                    `}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                  >
                    {action.label}
                    {/* Arrow */}
                    <div 
                      className={`
                        absolute top-1/2 transform -translate-y-1/2
                        ${alignment === 'right' ? 'left-full' : 'right-full'}
                        border-4 border-transparent 
                        ${alignment === 'right' ? 'border-l-black/90' : 'border-r-black/90'}
                      `} 
                    />
                  </motion.div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB */}
        <motion.button
          className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full 
                     shadow-lg shadow-purple-500/30 flex items-center justify-center
                     hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300
                     relative overflow-hidden group"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Background Animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Icon */}
          <motion.div
            className="relative z-10"
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Plus className="w-6 h-6 text-white" />
            )}
          </motion.div>

          {/* Ripple Effect */}
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            whileTap={{ scale: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        {/* Backdrop */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-black/10 backdrop-blur-sm -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Example usage component
export const DefaultFloatingActions: React.FC = () => {
  const actions: FloatingAction[] = [
    {
      icon: MessageCircle,
      label: 'AI Tutor',
      onClick: () => console.log('AI Tutor clicked'),
      color: 'blue'
    },
    {
      icon: BookOpen,
      label: 'Quick Lesson',
      onClick: () => console.log('Quick Lesson clicked'),
      color: 'green'
    },
    {
      icon: HelpCircle,
      label: 'Help',
      onClick: () => console.log('Help clicked'),
      color: 'orange'
    },
    {
      icon: Settings,
      label: 'Settings',
      onClick: () => console.log('Settings clicked'),
      color: 'purple'
    }
  ];

  return <FloatingActionButton actions={actions} />;
};

export default FloatingActionButton;
