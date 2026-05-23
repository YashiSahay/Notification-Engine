const axios = require('axios');

const sendEmail = async (to, subject, body) => {
  try {
    await axios.post('https://api.brevo.com/v3/smtp/email', {
      sender: { name: 'Notification Engine', email: 'yashisahay1204@gmail.com' },
      to: [{ email: to }],
      subject: subject,
      textContent: body,
      htmlContent: `<div style="font-family:sans-serif;padding:20px;max-width:600px">
        <h2 style="color:#0F172A">${subject}</h2>
        <p style="color:#475569;line-height:1.6">${body}</p>
        <hr style="border:none;border-top:1px solid #E2E8F0;margin-top:20px"/>
        <p style="color:#94A3B8;font-size:12px">Sent via Notification Engine</p>
      </div>`
    }, {
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json'
      }
    });
    console.log(`✅ Email sent to ${to}`);
    return { success: true };
  } catch (err) {
    console.error(`❌ Email failed:`, err.response?.data || err.message);
    return { success: false, error: err.message };
  }
};

module.exports = sendEmail;