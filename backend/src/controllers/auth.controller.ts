import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { Role } from '../constants/enums';
import { asyncHandler } from '../utils/asyncHandler';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, phone, password, role } = req.body;

  // Validation
  if (!name || !email || !phone || !password) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  // Check if user exists
  const userExists = await User.findOne({ $or: [{ email }, { phone }] });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists with that email or phone number');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    phone,
    passwordHash,
    role: role || Role.CUSTOMER,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.passwordHash))) {
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'super_secret_key',
      { expiresIn: '30d' }
    );

    res.json({
      accessToken: token,
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  res.json({
    _id: req.user?._id,
    name: req.user?.name,
    email: req.user?.email,
    role: req.user?.role,
    status: req.user?.status
  });
});
