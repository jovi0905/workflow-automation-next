import nodemailer from 'nodemailer';

const DEFAULT_FROM = process.env.SMTP_FROM || 'no-reply@workflow-automation.local';

function hasSmtpConfig() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
  );
}

async function sendViaNodemailer(to: string, subject: string, message: string) {
  if (!hasSmtpConfig()) {
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transporter.sendMail({
    from: DEFAULT_FROM,
    to,
    subject,
    text: message
  });

  return true;
}

async function sendViaResend(to: string, subject: string, message: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return false;
  }

  const from = process.env.RESEND_FROM || DEFAULT_FROM;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      text: message,
      html: `<p>${message}</p>`
    })
  });

  return res.ok;
}

export async function sendReminderEmail(to: string, subject: string, message: string) {
  const throughResend = await sendViaResend(to, subject, message);
  if (throughResend) {
    return true;
  }

  return sendViaNodemailer(to, subject, message);
}
