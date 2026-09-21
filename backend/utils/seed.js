require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const Inventory = require('../models/Inventory');

const STARTER_INVENTORY = [
  { category: 'base', name: 'Thin Crust', stock: 100 },
  { category: 'base', name: 'Thick Crust', stock: 100 },
  { category: 'base', name: 'Cheese Burst', stock: 100 },
  { category: 'base', name: 'Whole Wheat', stock: 100 },
  { category: 'base', name: 'Gluten Free', stock: 50 },
  { category: 'sauce', name: 'Tomato', stock: 100 },
  { category: 'sauce', name: 'BBQ', stock: 100 },
  { category: 'sauce', name: 'Pesto', stock: 60 },
  { category: 'sauce', name: 'White Sauce', stock: 60 },
  { category: 'sauce', name: 'Peri Peri', stock: 60 },
  { category: 'cheese', name: 'Mozzarella', stock: 100 },
  { category: 'cheese', name: 'Cheddar', stock: 80 },
  { category: 'cheese', name: 'Vegan Cheese', stock: 40 },
  { category: 'vegetable', name: 'Onion', stock: 100 },
  { category: 'vegetable', name: 'Capsicum', stock: 100 },
  { category: 'vegetable', name: 'Mushroom', stock: 80 },
  { category: 'vegetable', name: 'Olives', stock: 80 },
  { category: 'vegetable', name: 'Corn', stock: 90 },
  { category: 'vegetable', name: 'Jalapeno', stock: 70 },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected. Seeding...');

  const existingAdmin = await Admin.findOne({ email: 'admin@pizza.com' });
  if (!existingAdmin) await Admin.create({ name: 'Admin', email: 'admin@pizza.com', password: 'Admin@123' });

  for (const item of STARTER_INVENTORY) {
    const exists = await Inventory.findOne({ name: item.name });
    if (!exists) await Inventory.create(item);
  }

  await mongoose.disconnect();
  console.log('Done.');
}

seed().catch((err) => { console.error(err); process.exit(1); });
