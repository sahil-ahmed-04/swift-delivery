import { Router, Request, Response } from 'express';

import { authRoutes } from './auth.routes';
import { storeRoutes } from './store.routes';
import { categoryRoutes } from './category.routes';
import { productRoutes } from './product.routes';
import { orderRoutes } from './order.routes';
import { userRoutes } from './user.routes';

export const routes = Router();

// Health Check
routes.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'UP',
    version: '0.1.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Modular Routes
routes.use('/auth', authRoutes);
routes.use('/users', userRoutes);
routes.use('/stores', storeRoutes);
routes.use('/categories', categoryRoutes);
routes.use('/products', productRoutes);
routes.use('/orders', orderRoutes);

