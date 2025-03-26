import { createContext, useContext, useState, ReactNode } from 'react';
import { AuthState, User, UserRole } from '@/types';
import { toast } from '@/lib/toast';

interface AuthContextType extends AuthState {
  login: (role: UserRole, identifier: string, password?: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  });

  const login = async (role: UserRole, identifier: string, password?: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // In a real app, you would make an API call here
      // For now, we'll simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let user: User;
      
      switch (role) {
        case 'student':
          user = { id: '1', role, rollNumber: identifier };
          break;
        case 'faculty':
          user = { id: '2', role, mobile: identifier };
          break;
        case 'admin':
          if (!password) {
            throw new Error('Password required for admin login');
          }
          user = { id: '3', role, email: identifier };
          break;
        default:
          throw new Error('Invalid role');
      }
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      
      toast.success('Login successful');
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      
      toast.error('Login failed. Please try again.');
      return false;
    }
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    
    toast.info('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
