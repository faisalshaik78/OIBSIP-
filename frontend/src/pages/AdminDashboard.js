import React, { useEffect, useState, useCallback } from 'react';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';

const STATUS_FLOW = ['Order Received', 'In Kitchen', 'Sent to Delivery', 'Delivered'];
const LOW_STOCK_THRESHOLD = 20;

export default function AdminDashboard() {
  const { profile, logout } = useAuth();
  const [tab, setTab] = useState('inventory');
  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);

  const loadInventory = useCallback(async () => { const { data } = await client.get('/admin/inventory'); setInventory(data); }, []);
  const loadOrders = useCallback(async () => { const { data } = await client.get('/admin/orders'); setOrders(data); }, []);

  useEffect(() => {
    loadInventory(); loadOrders();
    const interval = setInterval(() => { loadInventory(); loadOrders(); }, 8000);
    return () => clearInterval(interval);
  }, [loadInventory, loadOrders]);

  async function updateStock(id, newStock) { await client.patch(`/admin/inventory/${id}`, { stock: Number(newStock) }); loadInventory(); }
  async function advanceStatus(order) {
    const currentIndex = STATUS_FLOW.indexOf(order.status);
    const next = STATUS_FLOW[Math.min(currentIndex + 1, STATUS_FLOW.length - 1)];
    await client.patch(`/admin/orders/${order._id}/status`, { status: next }); loadOrders();
  }

  return <div className="dashboard admin-theme">
    <header className="dashboard-header"><h1 className="brand-mark">Forno — Admin</h1><div className="header-right"><span>{profile?.name}</span><button className="btn-link" onClick={logout}>Log out</button></div></header>
    <nav className="admin-tabs"><button className={tab === 'inventory' ? 'tab active' : 'tab'} onClick={() => setTab('inventory')}>Inventory</button><button className={tab === 'orders' ? 'tab active' : 'tab'} onClick={() => setTab('orders')}>Orders</button></nav>
    <main className="dashboard-main single-col">
      {tab === 'inventory' && <section className="orders-panel"><h2>Inventory dashboard</h2><p className="empty-note">Items below {LOW_STOCK_THRESHOLD} units are flagged — the system also emails an alert automatically every 10 minutes if stock stays low.</p><div className="inventory-grid">{['base','sauce','cheese','vegetable'].map((cat) => <div key={cat} className="inventory-category"><h3>{cat.charAt(0).toUpperCase()+cat.slice(1)}s</h3>{inventory.filter((i) => i.category === cat).map((item) => <InventoryRow key={item._id} item={item} onSave={updateStock} />)}</div>)}</div></section>}
      {tab === 'orders' && <section className="orders-panel"><h2>All orders</h2>{orders.length === 0 && <p className="empty-note">No orders placed yet.</p>}<ul className="order-list">{orders.map((o) => <li key={o._id} className="order-card"><div className="order-card-top"><span className="order-pizza-name">{o.user?.name || 'Unknown'} — {o.pizza.base}, {o.pizza.sauce}, {o.pizza.cheese}</span><span className={`order-status status-${o.status.replace(/\s/g, '-')}`}>{o.status}</span></div><span className="order-meta">₹{o.price} · {o.paymentStatus} · {new Date(o.createdAt).toLocaleString()}</span>{o.paymentStatus === 'paid' && o.status !== 'Delivered' && <button className="btn-secondary small" onClick={() => advanceStatus(o)}>Advance to next status →</button>}</li>)}</ul></section>}
    </main>
  </div>;
}

function InventoryRow({ item, onSave }) {
  const [value, setValue] = useState(item.stock);
  const low = item.stock < LOW_STOCK_THRESHOLD;
  return <div className={low ? 'inventory-row low-stock' : 'inventory-row'}><span className="inventory-name">{item.name}</span><input type="number" min="0" value={value} onChange={(e) => setValue(e.target.value)} className="inventory-input" /><button className="btn-secondary tiny" onClick={() => onSave(item._id, value)}>Update</button>{low && <span className="low-badge">Low</span>}</div>;
}
