import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ThemeContext } from '../contexts/themeContext.jsx';

const MainLayout = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

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
          <button className="dropdown-item">Dark Theme</button>
          <button className="dropdown-item">Log Out</button>
        </DropdownMenu>
      )}

      <Outlet />
    </div>
  );
};

export default MainLayout;
