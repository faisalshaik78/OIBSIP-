const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Order = require('../models/Order');
const Inventory = require('../models/Inventory');
const { verifyToken, requireRole } = require('../middleware/auth');

router.get('/options', async (req, res) => {
  try {
    const items = await Inventory.find({ stock: { $gt: 0 } });
    const group = (cat) => items.filter((i) => i.category === cat).map((i) => i.name);
    res.json({ bases: group('base'), sauces: group('sauce'), cheeses: group('cheese'), vegetables: group('vegetable') });
  } catch (err) { res.status(500).json({ message: 'Failed to load options', error: err.message }); }
});

const PRICE_PER_PIZZA = 249;

router.post('/', verifyToken, requireRole('user'), async (req, res) => {
  try {
    const { base, sauce, cheese, vegetables } = req.body;
    if (!base || !sauce || !cheese) return res.status(400).json({ message: 'Base, sauce, and cheese are required' });
    const order = await Order.create({ user: req.auth.id, pizza: { base, sauce, cheese, vegetables: vegetables || [] }, price: PRICE_PER_PIZZA });
    res.status(201).json(order);
  } catch (err) { res.status(500).json({ message: 'Failed to create order', error: err.message }); }
});

router.post('/:id/pay', verifyToken, requireRole('user'), async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.auth.id });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    order.paymentStatus = 'paid';
    order.paymentId = `rzp_test_${uuidv4().slice(0, 12)}`;
    order.status = 'In Kitchen';
    await order.save();
    await Promise.all([
      Inventory.findOneAndUpdate({ name: order.pizza.base }, { $inc: { stock: -1 } }),
      Inventory.findOneAndUpdate({ name: order.pizza.sauce }, { $inc: { stock: -1 } }),
      Inventory.findOneAndUpdate({ name: order.pizza.cheese }, { $inc: { stock: -1 } }),
      ...order.pizza.vegetables.map((v) => Inventory.findOneAndUpdate({ name: v }, { $inc: { stock: -1 } })),
    ]);
    res.json(order);
  } catch (err) { res.status(500).json({ message: 'Payment failed', error: err.message }); }
});

router.get('/mine', verifyToken, requireRole('user'), async (req, res) => {
  try {
    const orders = await Order.find({ user: req.auth.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) { res.status(500).json({ message: 'Failed to fetch orders', error: err.message }); }
});

module.exports = router;
