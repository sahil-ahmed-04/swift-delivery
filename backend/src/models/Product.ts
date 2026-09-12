import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  storeId: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  price: number;
  discountPrice?: number;
  stockQuantity: number;
  unit: string; // e.g., '500g', '1 dozen', '1 unit'
  imageUrl?: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    storeId: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, min: 0 },
    stockQuantity: { type: Number, required: true, min: 0, default: 0 },
    unit: { type: String, required: true },
    imageUrl: { type: String },
    isAvailable: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// Indexes for fast catalog browsing by store and category
ProductSchema.index({ storeId: 1, categoryId: 1 });
ProductSchema.index({ storeId: 1, isAvailable: 1 });

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
