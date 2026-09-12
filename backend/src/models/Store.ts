import mongoose, { Schema, Document } from 'mongoose';

export interface IStore extends Document {
  name: string;
  description?: string;
  phone: string;
  email: string;
  isActive: boolean;
  address: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    location: {
      type: 'Point';
      coordinates: [number, number]; // [longitude, latitude]
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

const StoreSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    isActive: { type: Boolean, default: true },
    address: {
      addressLine1: { type: String, required: true },
      addressLine2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      location: {
        type: { type: String, enum: ['Point'], required: true, default: 'Point' },
        coordinates: { 
          type: [Number], // [longitude, latitude]
          required: true 
        }
      }
    }
  },
  {
    timestamps: true,
  }
);

// 2dsphere index for geospatial queries (finding nearest store)
StoreSchema.index({ 'address.location': '2dsphere' });

export const Store = mongoose.model<IStore>('Store', StoreSchema);
