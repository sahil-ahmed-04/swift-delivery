import { Request, Response } from 'express';
import { User } from '../models/User';
import { asyncHandler } from '../utils/asyncHandler';
import { Role, UserStatus } from '../constants/enums';

/**
 * GET /users
 * Admin — paginated list of all users, filterable by role or status
 */
export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const { role, status, page = '1', limit = '20' } = req.query;

  const query: any = {};
  if (role) query.role = role;
  if (status) query.status = status;

  const pageNum = parseInt(page as string, 10);
  const limitNum = parseInt(limit as string, 10);
  const skip = (pageNum - 1) * limitNum;

  const [users, total] = await Promise.all([
    User.find(query)
      .select('-passwordHash')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum),
    User.countDocuments(query),
  ]);

  res.json({
    users,
    meta: {
      page: pageNum,
      limit: limitNum,
      totalItems: total,
      totalPages: Math.ceil(total / limitNum),
    },
  });
});

/**
 * GET /users/:id
 * Admin — get a single user's profile
 */
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).select('-passwordHash');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json(user);
});

/**
 * PATCH /users/:id/status
 * Admin — activate, deactivate, or suspend a user account
 */
export const updateUserStatus = asyncHandler(async (req: Request, res: Response) => {
  const { status } = req.body;

  if (!Object.values(UserStatus).includes(status)) {
    res.status(400);
    throw new Error(`Invalid status. Must be one of: ${Object.values(UserStatus).join(', ')}`);
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  ).select('-passwordHash');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json(user);
});

/**
 * PATCH /users/:id/role
 * Admin — promote or demote a user's role (e.g., make CUSTOMER a STORE_MANAGER)
 */
export const updateUserRole = asyncHandler(async (req: Request, res: Response) => {
  const { role } = req.body;

  if (!Object.values(Role).includes(role)) {
    res.status(400);
    throw new Error(`Invalid role. Must be one of: ${Object.values(Role).join(', ')}`);
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  ).select('-passwordHash');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json(user);
});
