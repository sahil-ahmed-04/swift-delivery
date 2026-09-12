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

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id)
    .populate('categoryId', 'name slug')
    .populate('storeId', 'name');
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json(product);
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { storeId, categoryId, name, price, unit } = req.body;
  if (!storeId || !categoryId || !name || price === undefined || !unit) {
    res.status(400);
    throw new Error('storeId, categoryId, name, price, and unit are required');
  }
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json(product);
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { isAvailable: false },
    { new: true }
  );
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json({ message: 'Product deactivated successfully' });
});

/**
 * PATCH /products/:id/stock
 * Store Manager or Admin — update stockQuantity
 */
export const updateStock = asyncHandler(async (req: Request, res: Response) => {
  const { stockQuantity } = req.body;
  if (stockQuantity === undefined || typeof stockQuantity !== 'number' || stockQuantity < 0) {
    res.status(400);
    throw new Error('stockQuantity must be a non-negative number');
  }
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { stockQuantity, isAvailable: stockQuantity > 0 },
    { new: true }
  );
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json(product);
});
