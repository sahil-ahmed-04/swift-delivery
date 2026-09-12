import mongoose, { Schema, Document } from 'mongoose';
import { Role, UserStatus } from '../constants/enums';

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  role: Role;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { 
      type: String, 
      enum: Object.values(Role), 
      default: Role.CUSTOMER,
      required: true 
    },
    status: { 
      type: String, 
      enum: Object.values(UserStatus), 
      default: UserStatus.ACTIVE 
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries on role or status
UserSchema.index({ role: 1 });
UserSchema.index({ status: 1 });

export const User = mongoose.model<IUser>('User', UserSchema);
