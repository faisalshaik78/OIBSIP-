const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  category: { type: String, enum: ['base', 'sauce', 'cheese', 'vegetable'], required: true },
  name: { type: String, required: true },
  stock: { type: Number, required: true, default: 100 },
  unit: { type: String, default: 'units' },
  lowStockAlertSent: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
