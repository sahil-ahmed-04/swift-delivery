import { Router } from 'express';
import { getOrders, createOrder, updateOrderStatus } from '../controllers/order.controller';

export const orderRoutes = Router();

orderRoutes.get('/', getOrders);
orderRoutes.post('/', createOrder);
orderRoutes.patch('/:id/status', updateOrderStatus);
