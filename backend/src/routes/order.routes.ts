import { Router } from 'express';
import { getOrders, createOrder, updateOrderStatus } from '../controllers/order.controller';
import { protect, authorizeRoles } from '../middleware/auth.middleware';
import { Role } from '../constants/enums';

export const orderRoutes = Router();

orderRoutes.get('/', protect, getOrders);
orderRoutes.post('/', protect, authorizeRoles(Role.CUSTOMER), createOrder);
orderRoutes.patch('/:id/status', protect, authorizeRoles(Role.ADMIN, Role.STORE_MANAGER, Role.DELIVERY_BOY), updateOrderStatus);
