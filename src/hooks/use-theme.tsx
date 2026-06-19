import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  colors: typeof Colors.light;
  toggleTheme: (val: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // If we want to strictly follow the system theme initially, we update when it changes.
    // However, if the user manually toggles, we might want to ignore system changes.
    // For simplicity, we just sync if it hasn't been manually overridden, 
    // but a basic override is fine for now.
  }, [systemScheme]);

  const isDark = theme === 'dark';
  const colors = Colors[theme];

  const toggleTheme = (val: boolean) => {
    setTheme(val ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context) return context.colors;
  
  // Fallback if used outside provider
  return Colors.light;
}
