const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const router = express.Router();
const User = require('../models/User');
const { sendMail } = require('../utils/mailer');

function signToken(user) {
  return jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'All fields are required' });
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ message: 'An account with this email already exists' });
    const user = await User.create({ name, email, password });
    sendMail({ to: user.email, subject: 'Welcome to Pizza Delivery App', html: `<p>Hi ${user.name}, your account has been created successfully!</p>` });
    res.status(201).json({ token: signToken(user), user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) { res.status(500).json({ message: 'Registration failed', error: err.message }); }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: (email || '').toLowerCase() });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });
    if (!(await user.comparePassword(password))) return res.status(401).json({ message: 'Invalid email or password' });
    res.json({ token: signToken(user), user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) { res.status(500).json({ message: 'Login failed', error: err.message }); }
});

router.post('/forgot-password', async (req, res) => {
  try {
    const user = await User.findOne({ email: (req.body.email || '').toLowerCase() });
    if (!user) return res.json({ message: 'If that account exists, a reset link has been sent.' });
    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 1000 * 60 * 30;
    await user.save();
    const resetLink = `${req.headers.origin || 'http://localhost:3000'}/reset-password/${token}`;
    await sendMail({ to: user.email, subject: 'Password Reset Request', html: `<p>Click the link below to reset your password:</p><a href="${resetLink}">${resetLink}</a>` });
    res.json({ message: 'If that account exists, a reset link has been sent.' });
  } catch (err) { res.status(500).json({ message: 'Request failed', error: err.message }); }
});

router.post('/reset-password/:token', async (req, res) => {
  try {
    const user = await User.findOne({ resetToken: req.params.token, resetTokenExpiry: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ message: 'Reset link is invalid or has expired' });
    user.password = req.body.password;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();
    res.json({ message: 'Password has been reset. You can now log in.' });
  } catch (err) { res.status(500).json({ message: 'Reset failed', error: err.message }); }
});

module.exports = router;
