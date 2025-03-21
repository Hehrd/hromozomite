import React, { useState, useContext, useEffect } from "react";
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

  // Update the document root's data-theme attribute based on current theme
  useEffect(() => {
    if (theme === "light-mode") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [theme]);

  const toggleDropdownMenu = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div className={`main-layout ${theme}`}>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="home-button">Spestissimo</Link>
        </div>

        <div className="navbar-center">
          <Link to="/qrscan" className="navbar-center-element">Enter payment</Link>
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

        <Link to="/aboutus" className="dropdown-item" onClick={() => setShowDropdown(false)}>
          About Us
        </Link>

        {/* New Settings Option */}
        <Link to="/settings" className="dropdown-item" onClick={() => setShowDropdown(false)}>
          Settings
        </Link>
      </DropdownMenu>

      <Outlet />
    </div>
  );
};

export default MainLayout;
