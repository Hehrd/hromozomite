import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import { Link, Outlet } from "react-router-dom";
import { AppContext } from "../contexts/appContext.jsx";
import "./mainLayout.css";

const DropdownMenu = ({ children, show }) => {
  return ReactDOM.createPortal(
    <div className={`dropdown-menu ${show ? "show-dropdown" : ""}`}>
      {children}
    </div>,
    document.body
  );
};

const MainLayout = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { theme, toggleTheme, isLoggedIn, logOut } = useContext(AppContext);

  const toggleDropdownMenu = () => {
    setShowDropdown((prev) => !prev);
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
          <input type="text" className="search-bar" placeholder="Search..." />
        </div>

        <div className="navbar-right">
          <button className="profile-btn" onClick={toggleDropdownMenu}>
            <span className="profile-icon">U</span>
          </button>
        </div>
      </nav>

      <DropdownMenu show={showDropdown}>
        <button
          className="dropdown-item"
          onClick={() => {
            toggleTheme();
            setShowDropdown(false);
          }}
        >
          {theme === "light-mode" ? "Dark Theme" : "Light Theme"}
        </button>

        {isLoggedIn ? (
          <button
            className="dropdown-item"
            onClick={() => {
              logOut();
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

      <Outlet />
    </div>
  );
};

export default MainLayout;
