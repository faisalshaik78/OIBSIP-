import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
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
      const { data } = await client.post('/admin/auth/login', form);
      login({ token: data.token, role: 'admin', profile: data.admin });
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    } finally { setLoading(false); }
  }

  return <div className="auth-page admin-theme"><div className="auth-card">
    <h1 className="brand-mark">Forno — Admin</h1>
    <p className="auth-tagline">Inventory & order management console.</p>
    <form onSubmit={handleSubmit} className="auth-form">
      <label>Email<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
      <label>Password<input required type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
      {error && <p className="form-error">{error}</p>}
      <button className="btn-primary" disabled={loading}>{loading ? 'Logging in…' : 'Log in'}</button>
    </form>
    <p className="auth-switch"><Link to="/login">← Back to customer login</Link></p>
  </div></div>;
}
