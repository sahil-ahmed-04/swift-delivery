import { Request, Response } from 'express';
import { Order } from '../models/Order';
import { OrderStatus, Role } from '../constants/enums';
import { asyncHandler } from '../utils/asyncHandler';

// ── State Machine ──────────────────────────────────────────────────────────────
// Maps each status to the statuses it is allowed to transition into,
// and which role is allowed to trigger that transition.
const TRANSITIONS: Record<OrderStatus, { next: OrderStatus[]; roles: Role[] }> = {
  [OrderStatus.PLACED]:           { next: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED], roles: [Role.STORE_MANAGER, Role.ADMIN, Role.CUSTOMER] },
  [OrderStatus.CONFIRMED]:        { next: [OrderStatus.PACKING, OrderStatus.CANCELLED],   roles: [Role.STORE_MANAGER, Role.ADMIN] },
  [OrderStatus.PACKING]:          { next: [OrderStatus.READY_FOR_PICKUP],                 roles: [Role.STORE_MANAGER, Role.ADMIN] },
  [OrderStatus.READY_FOR_PICKUP]: { next: [OrderStatus.ASSIGNED],                         roles: [Role.DELIVERY_BOY, Role.ADMIN] },
  [OrderStatus.ASSIGNED]:         { next: [OrderStatus.PICKED_UP],                        roles: [Role.DELIVERY_BOY, Role.ADMIN] },
  [OrderStatus.PICKED_UP]:        { next: [OrderStatus.DELIVERED],                        roles: [Role.DELIVERY_BOY, Role.ADMIN] },
  [OrderStatus.DELIVERED]:        { next: [],                                              roles: [] },
  [OrderStatus.CANCELLED]:        { next: [],                                              roles: [] },
};

// ── GET /orders ────────────────────────────────────────────────────────────────
// Automatically scopes results based on the calling user's role:
//   CUSTOMER      → their own orders
//   STORE_MANAGER → orders for a storeId they manage (passed as query param)
//   DELIVERY_BOY  → orders assigned to them
//   ADMIN         → all orders (optionally filterable)
export const getOrders = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user!;
  const query: any = {};

  if (user.role === Role.CUSTOMER) {
    query.customerId = user._id;
  } else if (user.role === Role.STORE_MANAGER) {
    if (!req.query.storeId) {
      res.status(400);
      throw new Error('storeId query param required for store managers');
    }
    query.storeId = req.query.storeId;
  } else if (user.role === Role.DELIVERY_BOY) {
    query.deliveryBoyId = user._id;
  }
  // ADMIN: no filter unless explicitly specified
  if (req.query.status) query.status = req.query.status;

  const orders = await Order.find(query)
    .sort({ createdAt: -1 })
    .populate('customerId', 'name email phone')
    .populate('storeId', 'name address.addressLine1')
    .populate('deliveryBoyId', 'name phone');

  res.json(orders);
});

// ── GET /orders/:id ────────────────────────────────────────────────────────────
export const getOrderById = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id)
    .populate('customerId', 'name email phone')
    .populate('storeId', 'name address.city')
    .populate('deliveryBoyId', 'name phone');

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Customers can only see their own orders
  const user = req.user!;
  if (user.role === Role.CUSTOMER && order.customerId.toString() !== user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to view this order');
  }

  res.json(order);
});

// ── POST /orders ───────────────────────────────────────────────────────────────
export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const { storeId, items, deliveryAddress } = req.body;
  const customerId = req.user?._id;

  if (!storeId || !items || items.length === 0 || !deliveryAddress) {
    res.status(400);
    throw new Error('storeId, items, and deliveryAddress are required');
  }

  const subtotal: number = items.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = 25;

  const order = await Order.create({
    customerId,
    storeId,
    status: OrderStatus.PLACED,
    items: items.map((item: any) => ({
      ...item,
      totalPrice: item.price * item.quantity,
    })),
    subtotal,
    deliveryFee,
    totalAmount: subtotal + deliveryFee,
    deliveryAddress,
  });

  res.status(201).json(order);
});

// ── PATCH /orders/:id/status ───────────────────────────────────────────────────
// Validates the transition is legal for the calling user's role.
export const updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
  const { status: newStatus, deliveryBoyId } = req.body;
  const user = req.user!;

  if (!newStatus) {
    res.status(400);
    throw new Error('status is required');
  }

  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  const currentStatus = order.status as OrderStatus;
  const rule = TRANSITIONS[currentStatus];

  // Check if transition is valid
  if (!rule.next.includes(newStatus as OrderStatus)) {
    res.status(422);
    throw new Error(
      `Cannot move order from '${currentStatus}' to '${newStatus}'. Allowed: [${rule.next.join(', ') || 'none'}]`
    );
  }

  // Check if calling role is allowed for this transition
  if (!rule.roles.includes(user.role as Role)) {
    res.status(403);
    throw new Error(`Role '${user.role}' cannot perform this status transition`);
  }

  // Customers can only CANCEL their own PLACED orders
  if (user.role === Role.CUSTOMER) {
    if (newStatus !== OrderStatus.CANCELLED) {
      res.status(403);
      throw new Error('Customers can only cancel their orders');
    }
    if (order.customerId.toString() !== user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to update this order');
    }
  }

  // When a delivery boy assigns themselves
  if (newStatus === OrderStatus.ASSIGNED) {
    order.deliveryBoyId = deliveryBoyId || user._id;
  }

  order.status = newStatus as OrderStatus;
  const updated = await order.save();

  res.json(updated);
});

// ── GET /orders/available ──────────────────────────────────────────────────────
// Delivery boy: list orders that are READY_FOR_PICKUP (unassigned)
export const getAvailableDeliveries = asyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find({
    status: OrderStatus.READY_FOR_PICKUP,
    deliveryBoyId: { $exists: false },
  })
    .sort({ createdAt: 1 })
    .populate('storeId', 'name address')
    .populate('customerId', 'name phone');

  res.json(orders);
});

