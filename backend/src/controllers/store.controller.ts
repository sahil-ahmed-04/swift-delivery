import { Request, Response } from 'express';
import { Store } from '../models/Store';
import { asyncHandler } from '../utils/asyncHandler';

export const getStores = asyncHandler(async (req: Request, res: Response) => {
  const stores = await Store.find({ isActive: true });
  res.json(stores);
});

export const getStoreById = asyncHandler(async (req: Request, res: Response) => {
  const store = await Store.findById(req.params.id);
  if (!store) {
    res.status(404);
    throw new Error('Store not found');
  }
  res.json(store);
});

export const createStore = asyncHandler(async (req: Request, res: Response) => {
  const { name, description, phone, email, address } = req.body;

  if (!name || !phone || !email || !address) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const store = await Store.create({
    name,
    description,
    phone,
    email,
    address,
  });

  res.status(201).json(store);
});
