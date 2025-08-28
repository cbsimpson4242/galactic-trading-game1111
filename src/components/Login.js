import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    if (isRegistering) {
      // Simple registration - store in localStorage
      const existingUsers = JSON.parse(localStorage.getItem('gtc_users') || '[]');
      const userExists = existingUsers.find(user => user.username === username);
      
      if (userExists) {
        setError('Username already exists');
        return;
      }

      const newUser = {
        username,
        password, // In a real app, this would be hashed
        createdAt: new Date().toISOString(),
        gameState: {
          credits: 100000,
          profit: 0,
          pnl: 0,
          totalMargin: 0
        }
      };

      existingUsers.push(newUser);
      localStorage.setItem('gtc_users', JSON.stringify(existingUsers));
      
      onLogin(newUser);
    } else {
      // Login
      const existingUsers = JSON.parse(localStorage.getItem('gtc_users') || '[]');
      const user = existingUsers.find(u => u.username === username && u.password === password);
      
      if (!user) {
        setError('Invalid username or password');
        return;
      }

      onLogin(user);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-container">
        <div className="login-header">
          <h1>🏭 GTC Trading Game</h1>
          <p>Global Trading Commodities</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="login-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="login-input"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">
            {isRegistering ? 'Register' : 'Login'}
          </button>

          <button
            type="button"
            className="toggle-mode-button"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? 'Already have an account? Login' : 'New user? Register'}
          </button>
        </form>

        <div className="login-footer">
          <p>Start with ₹100,000 credits and build your trading empire!</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
