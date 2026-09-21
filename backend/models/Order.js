const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pizza: {
    base: { type: String, required: true },
    sauce: { type: String, required: true },
    cheese: { type: String, required: true },
    vegetables: [{ type: String }],
  },
  price: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  paymentId: { type: String },
  status: { type: String, enum: ['Order Received', 'In Kitchen', 'Sent to Delivery', 'Delivered'], default: 'Order Received' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
