import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './registerPage.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Prepare the data to be sent in the request body
    const registerData = {
      email: email,
      password: password,
    };

    // Send the request to the backend
    fetch('http://localhost:6969/useraccount/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData), // Send email and password as JSON
    })
      .then((response) => response.text()) // Expect a text response instead of JSON
      .then((data) => {
        if (data === 'Registration successful') {
          console.log('Registration successful:', data);
          setError(''); // Clear any previous error messages
          // Redirect to login page or show success message
        } else {
          setError(data || 'Registration failed. Please try again.');
        }
      })
      .catch((error) => {
        setError('An error occurred. Please try again.');
        console.error('Error during registration:', error);
      });
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="register-form">
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
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </div>
        <button type="submit" className="register-button">Register</button>
      </form>
      <p className="login-link">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default Register;
