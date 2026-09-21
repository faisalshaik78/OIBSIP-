const cron = require('node-cron');
const Inventory = require('../models/Inventory');
const { sendMail } = require('./mailer');

const THRESHOLD = Number(process.env.LOW_STOCK_THRESHOLD) || 20;

function startLowStockJob() {
  cron.schedule('*/10 * * * *', async () => {
    console.log('[cron] Running low-stock inventory check...');
    try {
      const items = await Inventory.find();
      for (const item of items) {
        if (item.stock < THRESHOLD && !item.lowStockAlertSent) {
          await sendMail({
            to: process.env.ADMIN_ALERT_EMAIL,
            subject: `Low Stock Alert: ${item.name}`,
            html: `<p><strong>${item.name}</strong> (${item.category}) is at <strong>${item.stock} ${item.unit}</strong>, below the threshold of ${THRESHOLD}.</p><p>Please restock soon.</p>`,
          });
          item.lowStockAlertSent = true;
          await item.save();
        } else if (item.stock >= THRESHOLD && item.lowStockAlertSent) {
          item.lowStockAlertSent = false;
          await item.save();
        }
      }
    } catch (err) { console.error('[cron] Low-stock check failed:', err.message); }
  });
  console.log('Low-stock cron job scheduled (every 10 minutes).');
}

module.exports = { startLowStockJob };
