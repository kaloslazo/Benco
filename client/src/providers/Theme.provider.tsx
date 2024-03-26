import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeContextProps = {
  children: React.ReactNode;
};

const defaultContext = {
  isDarkMode: false,
  toggleTheme: () => {},
};

export const ThemeContext = createContext(defaultContext);

export function ThemeProvider({ children }: ThemeContextProps) {
  const [isDarkMode, setDarkMode] = useState<boolean>(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.body.className = isDarkMode ? 'dark' : 'light'; // Cambia la clase del body según el tema
  }, [isDarkMode]); // Este efecto se ejecuta cada vez que isDarkMode cambia

  const toggleTheme = () => setDarkMode(!isDarkMode); // Función para cambiar el tema

  return <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
