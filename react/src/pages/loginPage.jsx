import React, { useState, useContext } from 'react'; 
import { useNavigate, Link } from 'react-router-dom';  // Import Link
import { AppContext } from '../contexts/appContext.jsx';  // Path to the unified AppContext
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
    fetch('http://localhost:6969/useraccount/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),  // Send email and password as JSON
    })
      .then((response) => response.text())  // Expect a text response
      .then((data) => {
        if (data === 'Login successful') {
          console.log('Login successful:', data);
          logIn();  // Update login state in context
          setError('');
          navigate('/dashboard');  // Go to dashboard (or another page)
        } else {
          setError(data || 'Login failed. Please try again.');
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
      {/* Disable autofill for the whole form */}
      <form onSubmit={handleLogin} className="login-form" autoComplete="off">
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email"
            id="email"
            value={email}
            autoComplete="off" 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          {/* Using "new-password" is more reliable to stop autofill than "off". */}
          <input 
            type="password"
            id="password"
            value={password}
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" className="login-button">Log In</button>
      </form>
      <p className="register-link">
        No account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
