import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link, Outlet } from 'react-router-dom';
import './mainLayout.css';

const DropdownMenu = ({ children }) => {
  return ReactDOM.createPortal(
    <div className="dropdown-menu">{children}</div>,
    document.body // Render the dropdown as a child of the body element
  );
};

const MainLayout = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(prev => {
      const newValue = !prev;
      console.log("showDropdown is now:", newValue);
      return newValue;
    });
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
          <button className="dropdown-item">Dark Theme</button>
          <button className="dropdown-item">Log Out</button>
        </DropdownMenu>
      )}

      <Outlet />
    </div>
  );
};

export default MainLayout;
