import React, { useState, useContext } from 'react';
import { AppContext } from '../contexts/appContext.jsx';  // Path to the unified AppContext
import './loginPage.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Get both theme and logIn function from the context
  const { theme, logIn } = useContext(AppContext);  // Access theme and logIn from AppContext

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    // Simulate a successful login
    console.log('Logging in with:', { email, password });
    logIn();  // Set the user as logged in
    setError('');  // Clear any previous error messages
  };

  return (
    <div className={`login-container ${theme}`}>
      <h2>Log in</h2>
      <form onSubmit={handleLogin} className="login-form">
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email" 
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter your password" 
            required
          />
        </div>
        <button type="submit" className="login-button">Log In</button>
      </form>
    </div>
  );
};

export default Login;
