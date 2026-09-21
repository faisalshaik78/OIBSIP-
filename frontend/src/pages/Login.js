import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await client.post('/auth/login', form);
      login({ token: data.token, role: 'user', profile: data.user });
      navigate('/order');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return <div className="auth-page"><div className="auth-card">
    <h1 className="brand-mark">Forno</h1>
    <p className="auth-tagline">Welcome back. Log in to order.</p>
    <form onSubmit={handleSubmit} className="auth-form">
      <label>Email<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
      <label>Password<input required type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
      {error && <p className="form-error">{error}</p>}
      <button className="btn-primary" disabled={loading}>{loading ? 'Logging in…' : 'Log in'}</button>
    </form>
    <p className="auth-switch"><Link to="/forgot-password">Forgot password?</Link></p>
    <p className="auth-switch">New here? <Link to="/register">Create an account</Link></p>
    <p className="auth-switch admin-link"><Link to="/admin/login">Admin login →</Link></p>
  </div></div>;
}
