export enum UserRole {
  ADMIN = 'ADMIN',
  STORE_MANAGER = 'STORE_MANAGER',
  DELIVERY_BOY = 'DELIVERY_BOY',
  CUSTOMER = 'CUSTOMER',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
