import { Router } from 'express';
import { getStores, getStoreById, createStore, updateStore, deleteStore } from '../controllers/store.controller';
import { protect, authorizeRoles } from '../middleware/auth.middleware';
import { Role } from '../constants/enums';

export const storeRoutes = Router();

storeRoutes.get('/', getStores);
storeRoutes.get('/:id', getStoreById);
storeRoutes.post('/', protect, authorizeRoles(Role.ADMIN), createStore);
storeRoutes.patch('/:id', protect, authorizeRoles(Role.ADMIN), updateStore);
storeRoutes.delete('/:id', protect, authorizeRoles(Role.ADMIN), deleteStore);
