import { Request, Response } from 'express';
import { ContactMessage, ChannelPartner, JobApplication } from '../models';
import { sendMailNotification } from '../utils/mailer';

export async function submitContact(req: Request, res: Response) {
  const { name, email, phone, subject, message } = req.body;
  const entry = await ContactMessage.create({ name, email, phone, subject, message });
  sendMailNotification(
    `New contact enquiry: ${subject || 'General Enquiry'}`,
    `From: ${name} <${email}>\nPhone: ${phone || 'N/A'}\n\n${message}`
  ).catch((e) => console.error('[mail] failed:', e.message));
  res.status(201).json({ success: true, id: entry.id });
}

export async function submitChannelPartner(req: Request, res: Response) {
  const { fullName, companyName, email, phone, city, message } = req.body;
  const entry = await ChannelPartner.create({ fullName, companyName, email, phone, city, message });
  sendMailNotification(
    `New Channel Partner application: ${fullName}`,
    `Company: ${companyName || 'N/A'}\nEmail: ${email}\nPhone: ${phone}\nCity: ${city}\n\n${message || ''}`
  ).catch((e) => console.error('[mail] failed:', e.message));
  res.status(201).json({ success: true, id: entry.id });
}

export async function submitJobApplication(req: Request, res: Response) {
  const { jobId, fullName, email, phone, positionApplied, message } = req.body;
  const resumePath = (req as any).file ? `/uploads/resumes/${(req as any).file.filename}` : '';
  const entry = await JobApplication.create({
    jobId: jobId ? Number(jobId) : null,
    fullName,
    email,
    phone,
    positionApplied,
    message,
    resumePath,
  });
  sendMailNotification(
    `New job application: ${positionApplied}`,
    `From: ${fullName} <${email}>\nPhone: ${phone}\nResume: ${resumePath || 'not attached'}\n\n${message || ''}`
  ).catch((e) => console.error('[mail] failed:', e.message));
  res.status(201).json({ success: true, id: entry.id });
}
