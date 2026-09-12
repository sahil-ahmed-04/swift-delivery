import { Request, Response } from 'express';
import { Store } from '../models/Store';
import { asyncHandler } from '../utils/asyncHandler';

export const getStores = asyncHandler(async (req: Request, res: Response) => {
  const activeOnly = req.query.active !== 'false';
  const stores = await Store.find(activeOnly ? { isActive: true } : {});
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
    throw new Error('name, phone, email, and address are required');
  }

  const store = await Store.create({ name, description, phone, email, address });
  res.status(201).json(store);
});

export const updateStore = asyncHandler(async (req: Request, res: Response) => {
  const store = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!store) {
    res.status(404);
    throw new Error('Store not found');
  }
  res.json(store);
});

export const deleteStore = asyncHandler(async (req: Request, res: Response) => {
  const store = await Store.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );
  if (!store) {
    res.status(404);
    throw new Error('Store not found');
  }
  res.json({ message: 'Store deactivated successfully' });
});
