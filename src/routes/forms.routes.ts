import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { z } from 'zod';
import { validateBody } from '../middleware/validate';
import * as ctrl from '../controllers/formController';

const router = Router();

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../uploads/resumes'),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, unique);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ok = ['.pdf', '.doc', '.docx'].includes(path.extname(file.originalname).toLowerCase());
    if (!ok) return cb(new Error('Only PDF/DOC/DOCX resumes are allowed'));
    cb(null, true);
  },
});

const contactSchema = z.object({
  name: z.string().min(2).max(150),
  email: z.string().email(),
  phone: z.string().min(6).max(30).optional().default(''),
  subject: z.string().max(200).optional().default('General Enquiry'),
  message: z.string().min(5),
});

const channelPartnerSchema = z.object({
  fullName: z.string().min(2).max(150),
  companyName: z.string().max(200).optional().default(''),
  email: z.string().email(),
  phone: z.string().min(6).max(30),
  city: z.string().min(2).max(150),
  message: z.string().optional().default(''),
});

router.post('/contact', validateBody(contactSchema), ctrl.submitContact);
router.post('/channel-partner', validateBody(channelPartnerSchema), ctrl.submitChannelPartner);
router.post('/careers/apply', upload.single('resume'), ctrl.submitJobApplication);

export default router;
