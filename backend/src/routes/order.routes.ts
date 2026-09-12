import { Router } from 'express';
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  getAvailableDeliveries,
} from '../controllers/order.controller';
import { protect, authorizeRoles } from '../middleware/auth.middleware';
import { Role } from '../constants/enums';

export const orderRoutes = Router();

// Available pickups for delivery boys — must be before /:id to avoid routing conflict
orderRoutes.get(
  '/available',
  protect,
  authorizeRoles(Role.DELIVERY_BOY, Role.ADMIN),
  getAvailableDeliveries
);

orderRoutes.get('/', protect, getOrders);
orderRoutes.post('/', protect, authorizeRoles(Role.CUSTOMER), createOrder);
orderRoutes.get('/:id', protect, getOrderById);
orderRoutes.patch(
  '/:id/status',
  protect,
  authorizeRoles(Role.ADMIN, Role.STORE_MANAGER, Role.DELIVERY_BOY, Role.CUSTOMER),
  updateOrderStatus
);
