import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import './registerPage.css';

const RECAPTCHA_SITE_KEY = '6LdWO_sqAAAAAHAd90TXaOfdBKwtPon21moPE2Nb'; // Replace with your site key

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!captchaToken) {
      setError('Please complete the reCAPTCHA.');
      return;
    }

    const registerData = {
      username,
      email,
      password,
      captcha: captchaToken,
    };

    fetch(`${import.meta.env.VITE_API_URL}/useraccount/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerData),
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === 'Registration successful') {
          console.log('Registration successful:', data);
          setError('');
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

      {/* Disable autocomplete at the form level */}
      <form
        onSubmit={handleRegister}
        className="register-form"
        autoComplete="off"
      >
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="username">Username:</label>
          {/* Disable autocomplete for this field */}
          <input
            type="text"
            id="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          {/* Disable autocomplete for this field */}
          <input
            type="email"
            id="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          {/* For password fields, using autoComplete="new-password" is common */}
          <input
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          {/* Similarly, you can use new-password here as well */}
          <input
            type="password"
            id="confirm-password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <ReCAPTCHA
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={(token) => setCaptchaToken(token)}
          />
        </div>

        <button type="submit" className="register-button">
          Register
        </button>
      </form>

      <p className="login-link">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default Register;
