import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { AppContext } from '../contexts/appContext';  // Path to the unified AppContext
import './loginPage.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Get both theme and logIn function from the context
  const { theme, logIn } = useContext(AppContext);  // Access theme and logIn from AppContext

  // Initialize the useNavigate hook
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
  
    // Simple validation
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }
  
    // Prepare the data to be sent in the request body
    const loginData = {
      email: email,
      password: password,
    };
  
    // Send the request to the backend
    fetch('/useraccount/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),  // Send email and password as JSON
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Simulate a successful login
          console.log('Login successful:', data);
          logIn();  // Call the logIn function from context to update app state
          setError('');  // Clear any previous error messages
          
          // Redirect to the homepage or dashboard after login
          navigate('/dashboard');  // Replace '/dashboard' with your desired path
        } else {
          setError(data.message || 'Login failed. Please try again.');
        }
      })
      .catch((error) => {
        setError('An error occurred. Please try again.');
        console.error('Error during login:', error);
      });
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
