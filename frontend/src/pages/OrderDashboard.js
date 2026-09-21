import React, { useEffect, useState, useCallback } from 'react';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';

const STEP_LABELS = ['Base', 'Sauce', 'Cheese', 'Vegetables', 'Summary'];

export default function OrderDashboard() {
  const { profile, logout } = useAuth();
  const [options, setOptions] = useState(null);
  const [step, setStep] = useState(0);
  const [pizza, setPizza] = useState({ base: '', sauce: '', cheese: '', vegetables: [] });
  const [pendingOrder, setPendingOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  const loadOrders = useCallback(async () => {
    const { data } = await client.get('/orders/mine');
    setOrders(data);
  }, []);

  useEffect(() => {
    client.get('/orders/options').then((res) => setOptions(res.data));
    loadOrders();
    const interval = setInterval(loadOrders, 8000);
    return () => clearInterval(interval);
  }, [loadOrders]);

  function toggleVeg(name) {
    setPizza((p) => ({ ...p, vegetables: p.vegetables.includes(name) ? p.vegetables.filter((v) => v !== name) : [...p.vegetables, name] }));
  }

  async function placeOrder() {
    setError('');
    try {
      const { data } = await client.post('/orders', pizza);
      setPendingOrder(data);
      setStep(4);
    } catch (err) { setError(err.response?.data?.message || 'Could not place order.'); }
  }

  async function simulatePayment() {
    try {
      await client.post(`/orders/${pendingOrder._id}/pay`);
      setPendingOrder(null);
      setPizza({ base: '', sauce: '', cheese: '', vegetables: [] });
      setStep(0);
      loadOrders();
    } catch (err) { setError(err.response?.data?.message || 'Payment could not be confirmed.'); }
  }

  if (!options) return <div className="loading-screen">Loading menu…</div>;

  return <div className="dashboard">
    <header className="dashboard-header"><h1 className="brand-mark">Forno</h1><div className="header-right"><span>Hi, {profile?.name?.split(' ')[0]}</span><button className="btn-link" onClick={logout}>Log out</button></div></header>
    <main className="dashboard-main">
      <section className="builder-panel">
        <h2>Build your pizza</h2>
        <div className="step-track">{STEP_LABELS.map((label, i) => <span key={label} className={i === step ? 'step active' : i < step ? 'step done' : 'step'}>{label}</span>)}</div>
        {step === 0 && <ChoiceGrid items={options.bases} selected={pizza.base} onSelect={(v) => setPizza({ ...pizza, base: v })} onNext={() => setStep(1)} label="Choose a base" />}
        {step === 1 && <ChoiceGrid items={options.sauces} selected={pizza.sauce} onSelect={(v) => setPizza({ ...pizza, sauce: v })} onNext={() => setStep(2)} onBack={() => setStep(0)} label="Choose a sauce" />}
        {step === 2 && <ChoiceGrid items={options.cheeses} selected={pizza.cheese} onSelect={(v) => setPizza({ ...pizza, cheese: v })} onNext={() => setStep(3)} onBack={() => setStep(1)} label="Choose a cheese" />}
        {step === 3 && <div className="choice-step"><h3>Choose your vegetables</h3><div className="choice-grid">{options.vegetables.map((v) => <button key={v} className={pizza.vegetables.includes(v) ? 'choice-tile selected' : 'choice-tile'} onClick={() => toggleVeg(v)}>{v}</button>)}</div><div className="step-actions"><button className="btn-secondary" onClick={() => setStep(2)}>Back</button><button className="btn-primary" onClick={placeOrder}>Review order</button></div>{error && <p className="form-error">{error}</p>}</div>}
        {step === 4 && pendingOrder && <div className="choice-step"><h3>Order summary</h3><ul className="summary-list"><li>Base: {pendingOrder.pizza.base}</li><li>Sauce: {pendingOrder.pizza.sauce}</li><li>Cheese: {pendingOrder.pizza.cheese}</li><li>Vegetables: {pendingOrder.pizza.vegetables.join(', ') || 'None'}</li><li className="summary-price">Total: ₹{pendingOrder.price}</li></ul><p className="payment-note">Test-mode checkout — no real charge will occur. Click below to simulate a successful Razorpay payment.</p><button className="btn-primary" onClick={simulatePayment}>Pay Now (Test Mode) — Simulate Success</button>{error && <p className="form-error">{error}</p>}</div>}
      </section>
      <section className="orders-panel"><h2>Your orders</h2>{orders.length === 0 && <p className="empty-note">No orders yet — build your first pizza.</p>}<ul className="order-list">{orders.map((o) => <li key={o._id} className="order-card"><div className="order-card-top"><span className="order-pizza-name">{o.pizza.base} · {o.pizza.sauce} · {o.pizza.cheese}</span><span className={`order-status status-${o.status.replace(/\s/g, '-')}`}>{o.status}</span></div><span className="order-meta">₹{o.price} · {o.paymentStatus} · {new Date(o.createdAt).toLocaleString()}</span></li>)}</ul></section>
    </main>
  </div>;
}

function ChoiceGrid({ items, selected, onSelect, onNext, onBack, label }) {
  return <div className="choice-step"><h3>{label}</h3><div className="choice-grid">{items.map((item) => <button key={item} className={selected === item ? 'choice-tile selected' : 'choice-tile'} onClick={() => onSelect(item)}>{item}</button>)}</div><div className="step-actions">{onBack && <button className="btn-secondary" onClick={onBack}>Back</button>}<button className="btn-primary" disabled={!selected} onClick={onNext}>Continue</button></div></div>;
}
