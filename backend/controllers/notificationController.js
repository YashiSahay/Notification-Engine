const Notification = require('../models/Notification');
const nodemailer = require('nodemailer');

exports.sendNotification = async (req, res) => {
  const { type, recipient, subject, body } = req.body;

  try {
    // 1. Save to MongoDB
    const notif = await Notification.create({
      type,
      recipient,
      subject,
      body,
      status: 'sent'
    });

    // 2. Setup Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // 3. Send Email Directly (No Queue for now)
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipient,
      subject: subject || "New Notification",
      text: body
    });

    res.status(200).json({ success: true, message: "Email Sent and Logged!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};