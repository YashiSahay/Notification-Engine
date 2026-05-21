const Bull = require('bull');
const sendEmail = require('../utils/emailSender');
const Notification = require('../models/Notification');

const notificationQueue = new Bull('notificationQueue', {
  redis: {
    host: '127.0.0.1',
    port: 6379
  }
});

// PROCESS JOBS
notificationQueue.process(async (job) => {
  const { notificationId, recipient, subject, body, channels } = job.data;

  console.log(`Processing job ${job.id} for ${recipient}`);

  const notification = await Notification.findById(notificationId);
  if (!notification) throw new Error('Notification not found');

  notification.status = 'processing';
  await notification.save();

  if (channels && channels.includes('Email')) {
    // ✅ Extract only the email, ignore phone numbers
    const recipients = recipient.split(',').map(r => r.trim());
    const emailRecipient = recipients.find(r => r.includes('@'));

    if (emailRecipient) {
      const result = await sendEmail(emailRecipient, subject, body);
      console.log(`📧 Result for ${emailRecipient}:`, result);

      notification.status = result.success ? 'sent' : 'failed';
      notification.sentAt = result.success ? new Date() : null;
      notification.errorLog = result.success ? null : result.error;
      await notification.save();
    } else {
      console.log('⚠️ No valid email found in recipient:', recipient);
      notification.status = 'failed';
      notification.errorLog = 'No valid email address found';
      await notification.save();
    }
  }

  return { success: true };
});

// EVENTS
notificationQueue.on('completed', (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

notificationQueue.on('failed', (job, err) => {
  console.log(`❌ Job ${job.id} failed: ${err.message}`);
});

module.exports = notificationQueue;