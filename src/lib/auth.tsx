'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { User } from './types';
import { useRouter } from 'next/navigation';
import { users } from './data';

// Mock user for demonstration
const MOCK_USER: User | undefined = users.find(u => u.id === '1');

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Simulate checking for a session
  React.useEffect(() => {
    setTimeout(() => {
      // To test the logged out state, set the user to null
      // setUser(null); 
      setUser(MOCK_USER || null);
      setIsLoading(false);
    }, 1000);
  }, []);

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    // In a real app, you'd make an API call
    console.log('Logging in with', email, pass);
    await new Promise(res => setTimeout(res, 500));
    setUser(MOCK_USER || null);
    setIsLoading(false);
    router.push('/dashboard');
  };

  const signup = async (email: string, pass: string) => {
    setIsLoading(true);
    // In a real app, you'd make an API call
    console.log('Signing up with', email, pass);
    await new Promise(res => setTimeout(res, 500));
    setUser(MOCK_USER || null);
    setIsLoading(false);
    router.push('/dashboard');
  };

  const logout = () => {
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
