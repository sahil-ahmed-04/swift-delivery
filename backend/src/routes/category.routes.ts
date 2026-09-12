import { Router } from 'express';
import { getCategories, createCategory } from '../controllers/category.controller';

export const categoryRoutes = Router();

categoryRoutes.get('/', getCategories);
categoryRoutes.post('/', createCategory);
