import { Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock,
} from '../controllers/product.controller';
import { protect, authorizeRoles } from '../middleware/auth.middleware';
import { Role } from '../constants/enums';

export const productRoutes = Router();

productRoutes.get('/', getProducts);
productRoutes.get('/:id', getProductById);
productRoutes.post('/', protect, authorizeRoles(Role.ADMIN, Role.STORE_MANAGER), createProduct);
productRoutes.patch('/:id', protect, authorizeRoles(Role.ADMIN, Role.STORE_MANAGER), updateProduct);
productRoutes.patch('/:id/stock', protect, authorizeRoles(Role.ADMIN, Role.STORE_MANAGER), updateStock);
productRoutes.delete('/:id', protect, authorizeRoles(Role.ADMIN, Role.STORE_MANAGER), deleteProduct);
