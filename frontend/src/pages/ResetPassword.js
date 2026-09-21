import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import client from '../api/client';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await client.post(`/auth/reset-password/${token}`, { password });
      setDone(true);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Reset failed. The link may have expired.');
    } finally { setLoading(false); }
  }

  return <div className="auth-page"><div className="auth-card">
    <h1 className="brand-mark">Forno</h1>
    {done ? <p className="auth-tagline">Password updated. Redirecting to login…</p> : <form onSubmit={handleSubmit} className="auth-form">
      <label>New password<input required minLength={8} type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
      {error && <p className="form-error">{error}</p>}
      <button className="btn-primary" disabled={loading}>{loading ? 'Updating…' : 'Update password'}</button>
    </form>}
    <p className="auth-switch"><Link to="/login">Back to log in</Link></p>
  </div></div>;
}
