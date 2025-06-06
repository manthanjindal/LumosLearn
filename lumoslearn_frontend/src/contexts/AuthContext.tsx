import React, { createContext, useContext, useState, useEffect } from 'react';
import { LocalStorage } from '../utils/localStorage';

// In a real implementation, this would use Firebase Auth
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  loginWithGoogle: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(LocalStorage.getUser());
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!LocalStorage.getUser());

  useEffect(() => {
    const storedUser = LocalStorage.getUser();
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate authentication
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0]
    };

    LocalStorage.setUser(mockUser);
      setUser(mockUser);
    setIsAuthenticated(true);
  };

  const register = async (email: string, password: string, name: string) => {
    // Simulate registration
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name
    };

    LocalStorage.setUser(mockUser);
      setUser(mockUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    LocalStorage.removeUser();
      setUser(null);
    setIsAuthenticated(false);
  };

  const loginWithGoogle = async () => {
    // Mock Google login - in real app, would use Firebase auth
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser = { id: '456', name: 'Google User', email: 'google@example.com' };
      LocalStorage.setUser(mockUser);
      setUser(mockUser);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, loginWithGoogle, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};