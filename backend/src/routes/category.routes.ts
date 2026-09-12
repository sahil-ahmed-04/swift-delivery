import { Router } from 'express';
import { getCategories, createCategory } from '../controllers/category.controller';
import { protect, authorizeRoles } from '../middleware/auth.middleware';
import { Role } from '../constants/enums';

export const categoryRoutes = Router();

categoryRoutes.get('/', getCategories);
categoryRoutes.post('/', protect, authorizeRoles(Role.ADMIN), createCategory);
