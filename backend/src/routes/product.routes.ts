import { Router } from 'express';
import { getProducts, createProduct } from '../controllers/product.controller';
import { protect, authorizeRoles } from '../middleware/auth.middleware';
import { Role } from '../constants/enums';

export const productRoutes = Router();

productRoutes.get('/', getProducts);
productRoutes.post('/', protect, authorizeRoles(Role.ADMIN, Role.STORE_MANAGER), createProduct);
