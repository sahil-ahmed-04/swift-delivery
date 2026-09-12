import { Router } from 'express';
import { register, login, getMe } from '../controllers/auth.controller';
import { protect } from '../middleware/auth.middleware';

export const authRoutes = Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.get('/me', protect, getMe);
