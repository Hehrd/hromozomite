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

    // Simulate successful registration (you can replace this with actual logic)
    console.log('Registered user:', formData);
    setError('');  // Clear any errors after successful registration
    // You can redirect the user to the login page or homepage, if needed
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
            autocorrect="off"
            autocapitalize="off"
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
            autocorrect="off"
            autocapitalize="off"
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
            autocorrect="off"
            autocapitalize="off"
          />
        </div>

        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};

export default Register;
