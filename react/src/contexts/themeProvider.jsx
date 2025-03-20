import React, { useState, useEffect } from 'react';
import { ThemeContext } from './themeContext';

const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark-mode');

  useEffect(() => {

    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light-mode' ? 'dark-mode' : 'light-mode'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
