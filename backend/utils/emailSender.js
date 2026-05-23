const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, body) => {
  try {
    await resend.emails.send({
      from: 'Notification Engine <onboarding@resend.dev>',
      to,
      subject,
      text: body,
      html: `<div style="font-family:sans-serif;padding:20px;max-width:600px">
        <h2 style="color:#0F172A">${subject}</h2>
        <p style="color:#475569;line-height:1.6">${body}</p>
        <hr style="border:none;border-top:1px solid #E2E8F0;margin-top:20px"/>
        <p style="color:#94A3B8;font-size:12px">Sent via Notification Engine</p>
      </div>`
    });
    console.log(`✅ Email sent to ${to}`);
    return { success: true };
  } catch (err) {
    console.error(`❌ Email failed:`, err.message);
    return { success: false, error: err.message };
  }
};

module.exports = sendEmail;