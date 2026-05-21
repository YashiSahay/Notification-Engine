const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ['OTP', 'Transactional', 'Promotional', 'Alert'] },
  recipient: { type: String, required: true },
  subject: { type: String },
  body: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['queued', 'processing', 'sent', 'failed'], 
    default: 'queued' 
  },
  channels: [{ type: String, enum: ['Email', 'SMS', 'Push'] }],
  errorLog: { type: String },
  sentAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Notification', NotificationSchema);