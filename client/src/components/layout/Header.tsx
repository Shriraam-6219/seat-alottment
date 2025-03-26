
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sun, Moon, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user has a dark mode preference
    const isDark = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('darkMode', String(newMode));
      
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      return newMode;
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-40 transition-all duration-300">
      <div className="container-wide py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 
            className="text-xl font-medium tracking-tight cursor-pointer"
            onClick={() => navigate('/')}
          >
            <span className="text-gradient font-bold">Seat</span>Finder
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleDarkMode}
            className="rounded-full"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          
          {isAuthenticated && (
            <div className="flex items-center space-x-2">
              <div className="text-sm font-medium hidden sm:block">
                {user?.role === 'student' && `Roll: ${user.rollNumber}`}
                {user?.role === 'faculty' && `Faculty`}
                {user?.role === 'admin' && `Admin`}
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleLogout}
                className="rounded-full"
              >
                <LogOut size={18} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
