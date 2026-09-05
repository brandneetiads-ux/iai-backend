import nodemailer from 'nodemailer';

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!process.env.SMTP_HOST) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
        : undefined,
    });
  }
  return transporter;
}

export async function sendMailNotification(subject: string, text: string): Promise<void> {
  const t = getTransporter();
  if (!t) {
    console.log(`[mail] SMTP not configured, skipping notification: ${subject}`);
    return;
  }
  await t.sendMail({
    from: process.env.SMTP_USER || 'no-reply@iaigroup.in',
    to: process.env.MAIL_TO || 'info@iaigroup.in',
    subject,
    text,
  });
}
