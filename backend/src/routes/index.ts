import { Router, Request, Response } from 'express';

export const routes = Router();

// Health Check
routes.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'UP',
    version: '0.1.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Phase 1 Mock Routes

routes.post('/auth/register', (req: Request, res: Response) => {
  res.status(201).json({ id: 'user_mock', ...req.body, role: 'CUSTOMER', status: 'ACTIVE' });
});

routes.post('/auth/login', (req: Request, res: Response) => {
  const role = req.body.email.includes('admin') ? 'ADMIN' : 'CUSTOMER';
  res.status(200).json({
    accessToken: `mock.token.${role}`,
    user: { email: req.body.email, role, status: 'ACTIVE' }
  });
});

routes.get('/auth/me', (req: Request, res: Response) => {
  res.status(200).json({ id: 'user_mock', email: 'test@swiftdelivery.in', role: 'CUSTOMER', status: 'ACTIVE' });
});

// Mock stores, products, orders to match Phase 1 exactly
routes.get('/stores', (req, res) => res.status(200).json([]));
routes.post('/stores', (req, res) => res.status(201).json(req.body));
routes.get('/products', (req, res) => res.status(200).json([]));
routes.post('/products', (req, res) => res.status(201).json(req.body));
routes.get('/categories', (req, res) => res.status(200).json([]));
routes.get('/orders', (req, res) => res.status(200).json([]));
routes.post('/orders', (req, res) => res.status(201).json(req.body));
routes.get('/users', (req, res) => res.status(200).json([]));
routes.get('/delivery/available', (req, res) => res.status(200).json([]));
