import { Router } from 'express';
import {
  getUsers,
  getUserById,
  updateUserStatus,
  updateUserRole,
} from '../controllers/user.controller';
import { protect, authorizeRoles } from '../middleware/auth.middleware';
import { Role } from '../constants/enums';

export const userRoutes = Router();

// All user management routes are Admin-only
userRoutes.get('/', protect, authorizeRoles(Role.ADMIN), getUsers);
userRoutes.get('/:id', protect, authorizeRoles(Role.ADMIN), getUserById);
userRoutes.patch('/:id/status', protect, authorizeRoles(Role.ADMIN), updateUserStatus);
userRoutes.patch('/:id/role', protect, authorizeRoles(Role.ADMIN), updateUserRole);
