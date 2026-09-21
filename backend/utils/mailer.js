const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

async function sendMail({ to, subject, html }) {
  try {
    await transporter.sendMail({ from: `"Pizza Delivery App" <${process.env.EMAIL_USER}>`, to, subject, html });
    console.log(`Email sent to ${to}: ${subject}`);
  } catch (err) { console.error('Email send failed:', err.message); }
}

module.exports = { sendMail };
