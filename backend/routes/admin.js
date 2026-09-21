const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');
const Order = require('../models/Order');
const { verifyToken, requireRole } = require('../middleware/auth');

router.use(verifyToken, requireRole('admin'));

router.get('/inventory', async (req, res) => {
  const items = await Inventory.find().sort({ category: 1, name: 1 });
  res.json(items);
});

router.patch('/inventory/:id', async (req, res) => {
  try {
    const { stock } = req.body;
    if (typeof stock !== 'number' || stock < 0) return res.status(400).json({ message: 'stock must be a non-negative number' });
    const item = await Inventory.findByIdAndUpdate(req.params.id, { stock, lowStockAlertSent: false }, { new: true });
    if (!item) return res.status(404).json({ message: 'Inventory item not found' });
    res.json(item);
  } catch (err) { res.status(500).json({ message: 'Update failed', error: err.message }); }
});

router.get('/orders', async (req, res) => {
  const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
  res.json(orders);
});

router.patch('/orders/:id/status', async (req, res) => {
  const validStatuses = ['Order Received', 'In Kitchen', 'Sent to Delivery', 'Delivered'];
  const { status } = req.body;
  if (!validStatuses.includes(status)) return res.status(400).json({ message: `status must be one of: ${validStatuses.join(', ')}` });
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});

module.exports = router;
