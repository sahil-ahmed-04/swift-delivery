export enum OrderStatus {
  PLACED = 'PLACED',
  CONFIRMED = 'CONFIRMED',
  PACKING = 'PACKING',
  READY_FOR_PICKUP = 'READY_FOR_PICKUP',
  ASSIGNED = 'ASSIGNED',
  PICKED_UP = 'PICKED_UP',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  totalPrice: number;
}

export interface Order {
  id: string;
  customerId: string;
  storeId: string;
  deliveryBoyId?: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  deliveryAddress: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    pincode: string;
    latitude: number;
    longitude: number;
  };
  createdAt: string;
  updatedAt: string;
}
