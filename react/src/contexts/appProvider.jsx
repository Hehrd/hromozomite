import React, { useState, useEffect } from 'react';
import { AppContext } from './AppContext'; // Make sure the path is correct

const AppProvider = ({ children }) => {
  // User login state (false by default)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Theme state (default to dark mode)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark-mode');

  // Function to log the user in
  const logIn = () => {
    setIsLoggedIn(true);
  };

  // Function to log the user out
  const logOut = () => {
    setIsLoggedIn(false);
  };

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light-mode' ? 'dark-mode' : 'light-mode'));
  };

  useEffect(() => {
    // Apply the theme class to the body element
    document.body.className = theme;
    // Store the theme in localStorage so it persists across page refreshes
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <AppContext.Provider value={{ isLoggedIn, logIn, logOut, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
