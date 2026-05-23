const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 465,
secure: true,
  auth: {
    user: 'ac4856001@smtp-brevo.com',
    pass: '0xv8X3HWa6y71FBp'
  }
});

const sendEmail = async (to, subject, body) => {
  try {
    await transporter.sendMail({
      from: '"Notification Engine" <yashisahay1204@gmail.com>',
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