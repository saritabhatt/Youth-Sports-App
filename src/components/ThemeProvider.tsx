import { ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Theme provider wrapper using next-themes
 * Provides dark mode support throughout the app
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="light" 
      enableSystem
      storageKey="sports-app-theme"
    >
      {children}
    </NextThemesProvider>
  );
}
