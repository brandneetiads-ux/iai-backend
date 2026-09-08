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

// IMPORTANT: Production platform PORT use करेगा
const PORT = Number(process.env.PORT) || 4000;

// ensure upload directory exists
const uploadDir = path.join(__dirname, '../uploads/resumes');
fs.mkdirSync(uploadDir, { recursive: true });

app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
);

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:4200',
    credentials: true
  })
);

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// ========================================
// ROOT HEALTH CHECK - IMPORTANT FOR DEPLOY
// ========================================

app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    status: 'healthy',
    message: 'IAI Group Backend API is running'
  });
});

// HEAD request भी successful होना चाहिए
app.head('/', (_req, res) => {
  res.status(200).end();
});

// API Health Check
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    time: new Date().toISOString()
  });
});

// ========================================
// RATE LIMITING
// ========================================

const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30
});

app.use('/api/forms', formLimiter);

// ========================================
// STATIC UPLOADS
// ========================================

app.use(
  '/uploads',
  express.static(path.join(__dirname, '../uploads'))
);

// ========================================
// API ROUTES
// ========================================

app.use('/api', publicRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// ========================================
// ERROR HANDLING
// ========================================

app.use(notFound);
app.use(errorHandler);

// ========================================
// START SERVER
// ========================================

async function start() {
  try {
    await connectDB();

    // In production, prefer migrations
    await sequelize.sync();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(
        `[server] IAI Group API running on port ${PORT}`
      );
    });
  } catch (error) {
    console.error('[server] Failed to start:', error);
    process.exit(1);
  }
}

start();
