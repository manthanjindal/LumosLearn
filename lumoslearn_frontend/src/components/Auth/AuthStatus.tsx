import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface AuthStatusProps {
  compact?: boolean;
}

const AuthStatus: React.FC<AuthStatusProps> = ({ compact = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="animate-pulse h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
    );
  }

  if (user) {
    return (
      <div className={`flex items-center ${compact ? 'space-x-2' : 'space-x-4'}`}>
        <div className="h-8 w-8 rounded-full bg-[#219176] flex items-center justify-center text-[#145968] font-medium">
          {user.name[0].toUpperCase()}
        </div>
        {!compact && (
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {user.name}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`flex ${compact ? 'space-x-2' : 'space-x-4'}`}>
      <Link
        to="/login"
        className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#7fd49c] dark:hover:text-[#7fd49c] transition-colors duration-200"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="text-sm font-medium text-[#219176] dark:text-[#219176] hover:text-[#7fd49c] dark:hover:text-[#7fd49c] transition-colors duration-200"
      >
        Register
      </Link>
    </div>
  );
};

export default AuthStatus;