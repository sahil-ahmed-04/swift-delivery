import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    statusCode,
    message: err.message || 'Internal Server Error',
    errors: null,
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route not found: ${req.originalUrl}`);
  res.status(404);
  next(err);
};
