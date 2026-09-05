import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Admin } from '../models';

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  const admin = await Admin.findOne({ where: { email } });
  if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign(
    { id: admin.id, email: admin.email, role: admin.role },
    process.env.JWT_SECRET || 'dev_secret',
    { expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as any }
  );

  res.json({ token, admin: { id: admin.id, email: admin.email, name: admin.name, role: admin.role } });
}
