import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { routes } from './routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Standard API response wrapper
app.use((req: Request, res: Response, next: NextFunction) => {
  const originalJson = res.json;
  res.json = function (body: any) {
    if (body && typeof body === 'object' && body.success !== undefined) {
      return originalJson.call(this, body);
    }
    return originalJson.call(this, {
      success: res.statusCode < 400,
      statusCode: res.statusCode,
      message: res.statusCode < 400 ? 'Operation successful' : 'Operation failed',
      data: res.statusCode < 400 ? body : null,
      errors: res.statusCode >= 400 ? body : null,
      timestamp: new Date().toISOString(),
    });
  };
  next();
});

// API Routes
app.use('/api/v1', routes);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[Global Error]', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

export { app };
