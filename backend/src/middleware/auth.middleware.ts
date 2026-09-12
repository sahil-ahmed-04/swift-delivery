import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';
import { asyncHandler } from '../utils/asyncHandler';
import { Role } from '../constants/enums';

// Extend Express Request interface to include the authenticated user
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

interface JwtPayload {
  userId: string;
  role: string;
}

/**
 * Middleware to protect routes — verifies JWT and attaches user to req
 */
export const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_key') as JwtPayload;

      // Get user from the token and attach to req (excluding passwordHash)
      const user = await User.findById(decoded.userId).select('-passwordHash');
      
      if (!user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

/**
 * Middleware to restrict access based on user role
 * @param roles Array of allowed roles
 */
export const authorizeRoles = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role as Role)) {
      res.status(403);
      throw new Error(`User role '${req.user?.role}' is not authorized to access this route`);
    }
    next();
  };
};
