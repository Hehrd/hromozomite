import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from './appContext.jsx'; // Update the path if necessary

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AppContext);

  // If the user is not logged in, redirect to the login page.
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Otherwise, render the children components.
  return children;
};

export default ProtectedRoute;
