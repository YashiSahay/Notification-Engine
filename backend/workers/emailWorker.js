const sendEmail = require('../utils/emailSender');
const Notification = require('../models/Notification');

const processEmailQueue = async () => {
    try {
        // Find all queued notifications with Email channel
        const pending = await Notification.find({ 
            status: 'queued', 
            channels: { $in: ['Email'] } 
        });

        for (const notification of pending) {
            // Mark as processing
            await Notification.findByIdAndUpdate(notification._id, { status: 'processing' });

            const result = await sendEmail(
                notification.recipient,
                notification.subject,
                notification.body
            );

            // Update status based on result
            await Notification.findByIdAndUpdate(notification._id, {
                status: result.success ? 'sent' : 'failed'
            });

            console.log(`📧 ${notification.recipient} → ${result.success ? '✅ Sent' : '❌ Failed: ' + result.error}`);
        }
    } catch (err) {
        console.error('Worker error:', err.message);
    }
};

// Run every 10 seconds
setInterval(processEmailQueue, 10000);
processEmailQueue(); // Run immediately on start

console.log('📬 Email Worker Running');

module.exports = processEmailQueue;