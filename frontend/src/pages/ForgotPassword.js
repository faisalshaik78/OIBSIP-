import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import client from '../api/client';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try { await client.post('/auth/forgot-password', { email }); }
    finally { setLoading(false); setSent(true); }
  }

  return <div className="auth-page"><div className="auth-card">
    <h1 className="brand-mark">Forno</h1>
    {sent ? <p className="auth-tagline">If an account exists for that email, a reset link is on its way.</p> : <>
      <p className="auth-tagline">Enter your email and we'll send a reset link.</p>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>Email<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <button className="btn-primary" disabled={loading}>{loading ? 'Sending…' : 'Send reset link'}</button>
      </form>
    </>}
    <p className="auth-switch"><Link to="/login">Back to log in</Link></p>
  </div></div>;
}
