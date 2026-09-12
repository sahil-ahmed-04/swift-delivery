import { Request, Response } from 'express';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { OrderStatus } from '../constants/enums';
import { asyncHandler } from '../utils/asyncHandler';

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const { customerId, storeId, items, deliveryAddress } = req.body;

  if (!items || items.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  // Phase 5 Simplification: Normally we would fetch all products from DB and recalculate prices
  // to prevent client-side tampering, but we'll trust the client format for now while testing basic DB saves.
  
  const subtotal = items.reduce((acc: number, item: any) => acc + item.totalPrice, 0);
  const deliveryFee = 25; // fixed for now
  const totalAmount = subtotal + deliveryFee;

  const order = await Order.create({
    customerId,
    storeId,
    status: OrderStatus.PLACED,
    items,
    subtotal,
    deliveryFee,
    totalAmount,
    deliveryAddress,
  });

  res.status(201).json(order);
});

export const getOrders = asyncHandler(async (req: Request, res: Response) => {
  const { customerId, storeId } = req.query;
  
  const query: any = {};
  if (customerId) query.customerId = customerId;
  if (storeId) query.storeId = storeId;

  const orders = await Order.find(query).sort({ createdAt: -1 });
  res.json(orders);
});

export const updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = await Order.findById(id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  order.status = status;
  const updatedOrder = await order.save();
  
  res.json(updatedOrder);
});
