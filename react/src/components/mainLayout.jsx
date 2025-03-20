import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const MainLayout = () => {
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
          <button className="auth-button">Sign Up / Log In</button>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default MainLayout;
