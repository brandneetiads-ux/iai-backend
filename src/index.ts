import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

import { sequelize, connectDB } from './config/database';
import publicRoutes from './routes/public.routes';
import formRoutes from './routes/forms.routes';
import authRoutes from './routes/auth.routes';
import adminRoutes from './routes/admin.routes';
import { notFound, errorHandler } from './middleware/errorHandler';

// import model definitions so Sequelize registers them before sync()
import './models';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ensure upload directory exists
const uploadDir = path.join(__dirname, '../uploads/resumes');
fs.mkdirSync(uploadDir, { recursive: true });

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:4200', credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// basic rate limiting on write-heavy public endpoints (contact/apply forms)
const formLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 30 });
app.use('/api/forms', formLimiter);

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

app.use('/api', publicRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.use(notFound);
app.use(errorHandler);

async function start() {
  await connectDB();
  // In production, prefer running migrations (npm run migrate) instead of sync().
  await sequelize.sync();
  app.listen(PORT, () => {
    console.log(`[server] IAI Group API running on http://localhost:${PORT}`);
  });
}

start();
