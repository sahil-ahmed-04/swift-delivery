import { Router } from 'express';
import { getStores, getStoreById, createStore } from '../controllers/store.controller';

export const storeRoutes = Router();

storeRoutes.get('/', getStores);
storeRoutes.get('/:id', getStoreById);
storeRoutes.post('/', createStore);
