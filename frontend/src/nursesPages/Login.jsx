// src/nursesPages/Login.jsx

import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {  // ✅ Use onLogin prop instead of setIsLoggedIn
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔐 Dummy check, replace with real backend logic later
    if (username === 'nurse' && password === '1234') {
      onLogin(); // ✅ Calls NursesApp handleLogin which sets isLoggedIn and navigates
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Nurse Login</h2>
        <input
          type="text"
          className="login-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default Login;
