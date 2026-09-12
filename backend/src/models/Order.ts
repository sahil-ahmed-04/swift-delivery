import mongoose, { Schema, Document } from 'mongoose';
import { OrderStatus } from '../constants/enums';

export interface IOrderItem {
  productId: mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  totalPrice: number;
}

export interface IOrder extends Document {
  customerId: mongoose.Types.ObjectId;
  storeId: mongoose.Types.ObjectId;
  deliveryBoyId?: mongoose.Types.ObjectId;
  status: OrderStatus;
  items: IOrderItem[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  deliveryAddress: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    location?: {
      type: 'Point';
      coordinates: [number, number];
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    unit: { type: String, required: true },
    totalPrice: { type: Number, required: true, min: 0 },
  },
  { _id: false } // No separate _id for subdocuments
);

const OrderSchema: Schema = new Schema(
  {
    customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    storeId: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
    deliveryBoyId: { type: Schema.Types.ObjectId, ref: 'User' },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PLACED,
      required: true,
    },
    items: [OrderItemSchema],
    subtotal: { type: Number, required: true, min: 0 },
    deliveryFee: { type: Number, required: true, min: 0 },
    totalAmount: { type: Number, required: true, min: 0 },
    deliveryAddress: {
      addressLine1: { type: String, required: true },
      addressLine2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number] }
      }
    }
  },
  {
    timestamps: true,
  }
);

// Indexes for looking up orders by user, store, or delivery boy
OrderSchema.index({ customerId: 1, createdAt: -1 });
OrderSchema.index({ storeId: 1, status: 1 });
OrderSchema.index({ deliveryBoyId: 1, status: 1 });

export const Order = mongoose.model<IOrder>('Order', OrderSchema);
