import { Request, Response } from 'express';
import { Product } from '../models/Product';
import { asyncHandler } from '../utils/asyncHandler';

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const { storeId, categoryId } = req.query;
  
  const query: any = { isAvailable: true };
  if (storeId) query.storeId = storeId;
  if (categoryId) query.categoryId = categoryId;

  const products = await Product.find(query)
    .populate('categoryId', 'name slug')
    .populate('storeId', 'name');
    
  res.json(products);
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { storeId, categoryId, name, description, price, stockQuantity, unit, imageUrl } = req.body;

  if (!storeId || !categoryId || !name || price === undefined || !unit) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const product = await Product.create({
    storeId,
    categoryId,
    name,
    description,
    price,
    stockQuantity,
    unit,
    imageUrl,
  });

  res.status(201).json(product);
});
