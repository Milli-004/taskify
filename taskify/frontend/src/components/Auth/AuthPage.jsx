import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, register } from '../../features/auth/authSlice';
import './AuthPage.css';

export default function AuthPage() {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (!isLogin && formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        await dispatch(login(formData)).unwrap();
      } else {
        await dispatch(register(formData)).unwrap();
      }
      // Success - will redirect via App.jsx
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>✓ Taskify</h1>
            <p>Your smart task management solution</p>
          </div>

          <div className="auth-tabs">
            <button
              className={`auth-tab ${isLogin ? 'active' : ''}`}
              onClick={() => {
                setIsLogin(true);
                setError('');
              }}
            >
              Login
            </button>
            <button
              className={`auth-tab ${!isLogin ? 'active' : ''}`}
              onClick={() => {
                setIsLogin(false);
                setError('');
              }}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                disabled={loading}
              />
              {!isLogin && (
                <small>Minimum 6 characters required</small>
              )}
            </div>

            {error && (
              <div className="error-message">
                ⚠️ {error}
              </div>
            )}

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? (
                <span className="loading-spinner"></span>
              ) : isLogin ? (
                '🚀 Login'
              ) : (
                '✨ Create Account'
              )}
            </button>
          </form>

          <div className="auth-footer">
            {isLogin ? (
              <p>
                Don't have an account?{' '}
                <button
                  className="link-button"
                  onClick={() => setIsLogin(false)}
                >
                  Register here
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  className="link-button"
                  onClick={() => setIsLogin(true)}
                >
                  Login here
                </button>
              </p>
            )}
          </div>
        </div>

        <div className="auth-illustration">
          <div className="illustration-content">
            <div className="illustration-icon">📋</div>
            <h2>Organize Your Life</h2>
            <p>Manage tasks efficiently with our beautiful and intuitive interface</p>
            <div className="feature-list">
              <div className="feature-item">✓ Track your progress</div>
              <div className="feature-item">✓ Set priorities</div>
              <div className="feature-item">✓ Stay organized</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
