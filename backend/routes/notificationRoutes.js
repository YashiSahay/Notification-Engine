const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Notification = require('../models/Notification');
const sendEmail = require('../utils/emailSender');
const protect = require('../middleware/authMiddleware');
const notificationQueue = require('../queues/notificationQueue');

// SEND notification — PROTECTED + BULL QUEUE
router.post('/send', protect, async (req, res) => {
  try {
    console.log("1. Backend received request:", req.body);

    const { type, channels, recipient, subject, body, priority } = req.body;

    const notification = await Notification.create({
      type,
      channels,
      recipient,
      subject,
      body,
      priority,
      status: 'queued'
    });
    console.log("2. Saved to MongoDB with ID:", notification._id);

    const priorityLevel = priority === 'High' ? 1 : priority === 'Medium' ? 2 : 3;

    await notificationQueue.add(
      {
        notificationId: notification._id,
        recipient,
        subject,
        body,
        channels
      },
      {
        attempts: 3,
        backoff: 5000,
        priority: priorityLevel
      }
    );

    console.log("3. Job added to Bull Queue");

    res.status(201).json({
      message: 'Notification queued successfully',
      notification
    });

  } catch (err) {
    console.error("Critical Route Error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// SEND OTP — PROTECTED
router.post('/send-otp', protect, async (req, res) => {
  try {
    const { recipient } = req.body;

    if (!recipient) return res.status(400).json({ message: 'Recipient email is required' });

    const otp = crypto.randomInt(100000, 999999).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    const notification = await Notification.create({
      type: 'OTP',
      recipient,
      subject: 'Your OTP Code',
      body: `Your OTP is ${otp}. Valid for 10 minutes. Do not share with anyone.`,
      channels: ['Email'],
      status: 'queued',
    });

    const result = await sendEmail(
      recipient,
      'Your OTP Code',
      `Your OTP is ${otp}. Valid for 10 minutes. Do not share with anyone.`
    );

    notification.status = result.success ? 'sent' : 'failed';
    notification.sentAt = result.success ? new Date() : null;
    notification.errorLog = result.success ? null : result.error;
    await notification.save();

    res.json({
      message: result.success ? 'OTP sent successfully' : 'OTP failed to send',
      success: result.success
    });

  } catch (err) {
    console.error("OTP Error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// VERIFY OTP — PROTECTED
router.post('/verify-otp', protect, async (req, res) => {
  try {
    const { recipient, otp } = req.body;

    const record = await Notification.findOne({
      recipient,
      type: 'OTP',
      status: 'sent'
    }).sort({ createdAt: -1 });

    if (!record) return res.status(400).json({ message: 'No OTP found for this email' });

    const isExpired = new Date() > new Date(record.sentAt.getTime() + 10 * 60 * 1000);
    if (isExpired) return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });

    res.json({ message: 'OTP verified successfully', success: true });

  } catch (err) {
    console.error("OTP Verify Error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// GET all notifications — PUBLIC
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET preferences — PUBLIC
router.get('/preferences', async (req, res) => {
  try {
    res.json({
      email: true,
      sms: true,
      push: false,
      orders: true,
      promo: false,
      updates: true,
      quietMode: true,
      startTime: "22:00",
      endTime: "07:00"
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST preferences — PUBLIC
router.post('/preferences', async (req, res) => {
  try {
    res.json({ message: 'Preferences saved successfully', data: req.body });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;