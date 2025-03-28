
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle = ({ className = '' }: ThemeToggleProps) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if user has saved a preference
    const savedTheme = localStorage.getItem('theme');
    // Check system preference if no saved preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
  });

  useEffect(() => {
    // Apply theme when component mounts and when theme changes
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'} transition-colors ${className}`}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default ThemeToggle;
