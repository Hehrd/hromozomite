import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { Link, Outlet } from 'react-router-dom';
import { ThemeContext } from '../contexts/themeContext'; // Adjust path as needed
import './mainLayout.css';

const DropdownMenu = ({ children }) => {
  return ReactDOM.createPortal(
    <div className="dropdown-menu">{children}</div>,
    document.body
  );
};

const MainLayout = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  return (
    <div className="main-layout">
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="home-button">
            Home
          </Link>
        </div>

        <div className="navbar-center">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
          />
        </div>

        <div className="navbar-right">
          <button className="profile-btn" onClick={toggleDropdown}>
            <span className="profile-icon">U</span>
          </button>
        </div>
      </nav>

      {showDropdown && (
        <DropdownMenu>
          <button
            className="dropdown-item"
            onClick={() => {
              toggleTheme();
              setShowDropdown(false);
            }}
          >
            {theme === 'light-mode' ? 'Dark Theme' : 'Light Theme'}
          </button>
          <button className="dropdown-item">Log Out</button>
        </DropdownMenu>
      )}

      <Outlet />
    </div>
  );
};

export default MainLayout;
