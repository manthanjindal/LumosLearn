import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

const NotificationItem: React.FC<{
  notification: Notification;
  onRemove: (id: string) => void;
}> = ({ notification, onRemove }) => {
  const { id, type, title, message, action } = notification;

  const typeConfig = {
    success: {
      icon: CheckCircle,
      bgClass: 'bg-green-500/10 border-green-500/30',
      iconClass: 'text-green-400',
      titleClass: 'text-green-100'
    },
    error: {
      icon: AlertCircle,
      bgClass: 'bg-red-500/10 border-red-500/30',
      iconClass: 'text-red-400',
      titleClass: 'text-red-100'
    },
    warning: {
      icon: AlertTriangle,
      bgClass: 'bg-yellow-500/10 border-yellow-500/30',
      iconClass: 'text-yellow-400',
      titleClass: 'text-yellow-100'
    },
    info: {
      icon: Info,
      bgClass: 'bg-blue-500/10 border-blue-500/30',
      iconClass: 'text-blue-400',
      titleClass: 'text-blue-100'
    }
  };

  const config = typeConfig[type];
  const IconComponent = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 300, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.5 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`
        relative overflow-hidden rounded-lg border backdrop-blur-md p-4 shadow-lg
        ${config.bgClass} max-w-sm w-full
      `}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="relative flex items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0">
          <IconComponent className={`w-5 h-5 ${config.iconClass}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium ${config.titleClass}`}>
            {title}
          </p>
          {message && (
            <p className="mt-1 text-sm text-gray-300">
              {message}
            </p>
          )}
          
          {/* Action button */}
          {action && (
            <button
              onClick={action.onClick}
              className={`
                mt-2 text-xs font-medium px-2 py-1 rounded
                ${config.iconClass} hover:bg-white/10 transition-colors
              `}
            >
              {action.label}
            </button>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={() => onRemove(id)}
          className="flex-shrink-0 p-1 hover:bg-white/10 rounded transition-colors"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Progress bar */}
      <motion.div
        className={`absolute bottom-0 left-0 h-1 ${config.iconClass.replace('text-', 'bg-')}`}
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: notification.duration || 5, ease: 'linear' }}
        onAnimationComplete={() => onRemove(id)}
      />
    </motion.div>
  );
};

const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onRemove={removeNotification}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = { ...notification, id };
    
    setNotifications(prev => [...prev, newNotification]);

    // Auto remove after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, notification.duration || 5000);
    }
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider 
      value={{ 
        notifications, 
        addNotification, 
        removeNotification, 
        clearAll 
      }}
    >
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
};

// Hook for easy notification creation
export const useNotify = () => {
  const { addNotification } = useNotifications();

  return {
    success: (title: string, message?: string) => 
      addNotification({ type: 'success', title, message }),
    
    error: (title: string, message?: string) => 
      addNotification({ type: 'error', title, message }),
    
    warning: (title: string, message?: string) => 
      addNotification({ type: 'warning', title, message }),
    
    info: (title: string, message?: string) => 
      addNotification({ type: 'info', title, message }),
    
    custom: (notification: Omit<Notification, 'id'>) => 
      addNotification(notification)
  };
};
