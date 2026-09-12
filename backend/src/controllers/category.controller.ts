import { Request, Response } from 'express';
import { Category } from '../models/Category';
import { asyncHandler } from '../utils/asyncHandler';

export const getCategories = asyncHandler(async (req: Request, res: Response) => {
  const categories = await Category.find({ isActive: true });
  res.json(categories);
});

export const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const { name, slug, imageUrl } = req.body;

  if (!name || !slug) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const categoryExists = await Category.findOne({ slug });
  if (categoryExists) {
    res.status(400);
    throw new Error('Category with this slug already exists');
  }

  const category = await Category.create({ name, slug, imageUrl });
  res.status(201).json(category);
});
