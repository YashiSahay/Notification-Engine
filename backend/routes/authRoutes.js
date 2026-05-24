const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const axios = require('axios');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'This email is already registered. Please sign in instead.' });
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashed });
    res.status(201).json({ message: 'Account created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'No account found with this email' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Incorrect password' });
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'No account found with this email' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    user.resetExpiry = Date.now() + 3600000;
    await user.save();
   
    const resetLink = `https://notification-engine-git-main-yashi1204s-projects.vercel.app/reset-password?token=${resetToken}`;

    await axios.post('https://api.brevo.com/v3/smtp/email', {
      sender: { name: 'Notification Engine', email: 'yashisahay1204@gmail.com' },
      to: [{ email }],
      subject: 'Reset your password',
      htmlContent: `<div style="font-family:sans-serif;padding:20px">
        <h2>Reset your password</h2>
        <p>Click the button below to reset your password. This link expires in 1 hour.</p>
        <a href="${resetLink}" style="background:#1E40AF;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;margin-top:16px">Reset Password</a>
        <p style="margin-top:20px;color:#94A3B8;font-size:12px">If you didn't request this, ignore this email.</p>
      </div>`
    }, {
      headers: { 'api-key': process.env.BREVO_API_KEY, 'Content-Type': 'application/json' }
    });

    res.json({ message: 'Reset link sent to your email' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;
    const user = await User.findOne({ resetToken: token, resetExpiry: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ message: 'Invalid or expired reset token' });

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetExpiry = undefined;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;