import { Router } from 'express';
import { getStores, getStoreById, createStore } from '../controllers/store.controller';
import { protect, authorizeRoles } from '../middleware/auth.middleware';
import { Role } from '../constants/enums';

export const storeRoutes = Router();

storeRoutes.get('/', getStores);
storeRoutes.get('/:id', getStoreById);
storeRoutes.post('/', protect, authorizeRoles(Role.ADMIN), createStore);
