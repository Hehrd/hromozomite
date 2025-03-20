import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { Link, Outlet } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext'; // Path to the unified AppContext
import './mainLayout.css';

const DropdownMenu = ({ children }) => {
  return ReactDOM.createPortal(
    <div className="dropdown-menu">{children}</div>,
    document.body // Render the dropdown as a child of the body element
  );
};

const MainLayout = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { theme, toggleTheme, isLoggedIn, logOut } = useContext(AppContext); // Access both theme and user state

  const toggleDropdownMenu = () => {
    setShowDropdown(prev => !prev);
  };

  return (
    <div className={`main-layout ${theme}`}>
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
          <button className="profile-btn" onClick={toggleDropdownMenu}>
            <span className="profile-icon">U</span>
          </button>
        </div>
      </nav>

      {showDropdown && (
        <DropdownMenu>
          <button
            className="dropdown-item"
            onClick={() => {
              toggleTheme(); // Toggle the theme when the button is clicked
              setShowDropdown(false);
            }}
          >
            {theme === 'light-mode' ? 'Dark Theme' : 'Light Theme'}
          </button>

          {isLoggedIn ? (
            <button
              className="dropdown-item"
              onClick={() => {
                logOut();  // Log the user out when the Log Out button is clicked
                setShowDropdown(false);
              }}
            >
              Log Out
            </button>
          ) : (
            <Link to="/login" className="dropdown-item" onClick={() => setShowDropdown(false)}>
              Log In
            </Link>
          )}
        </DropdownMenu>
      )}

      <Outlet />
    </div>
  );
};

export default MainLayout;
