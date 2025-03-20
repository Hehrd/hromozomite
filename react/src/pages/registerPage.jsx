import React, { useState, useContext } from 'react';
import { AppContext } from '../contexts/AppContext'; // Path to the unified AppContext
import './registerPage.css';  // Import the CSS file here

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  // Access theme from AppContext (for dynamic theme application)
  const { theme } = useContext(AppContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = formData;
  
    // Validate form data
    if (!username || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
  
    // Prepare the data to be sent in the request body
    const registerData = {
      username: username,
      email: email,
      password: password,
    };
  
    // Send the registration request to the backend
    fetch('http://localhost:6969/useraccount/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),  // Send form data as JSON
    })
      .then((response) => response.text())  // Expect a text response
      .then((data) => {
        if (data === 'Registration successful') {  // Check if the response text matches the success message
          // Simulate successful registration
          console.log('Registration successful:', data);
          setError('');  // Clear any previous error messages
          // Optionally, redirect to login or home page after successful registration
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
    <div className={`register-container ${theme}`}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
            autoComplete="off"  // Disable autofill
            autoCorrect="off"
            autoCapitalize="off"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            autoComplete="off"  // Disable autofill
            autoCorrect="off"
            autoCapitalize="off"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            autoComplete="off"  // Disable autofill
            autoCorrect="off"
            autoCapitalize="off"
          />
        </div>

        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};

export default Register;
