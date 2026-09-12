import { Router } from 'express';
import { getProducts, createProduct } from '../controllers/product.controller';

export const productRoutes = Router();

productRoutes.get('/', getProducts);
productRoutes.post('/', createProduct);
