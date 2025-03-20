import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ThemeContext } from '../contexts/themeContext.jsx';

const MainLayout = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="main-layout">
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="home-button">Home</Link>
        </div>
        <div className="navbar-center">
          <input type="text" className="search-bar" placeholder="Search..." />
        </div>
        <div className="navbar-right">
          {/* Theme Toggle Button */}
          <button className="theme-toggle-button" onClick={toggleTheme}>
            {theme === 'light-mode' ? 'Dark Mode' : 'Light Mode'}
          </button>
          <button className="auth-button">Sign Up / Log In</button>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default MainLayout;
