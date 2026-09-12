export interface Store {
  id: string;
  name: string;
  description: string;
  phone: string;
  email: string;
  address: {
    addressLine1: string;
    city: string;
    state: string;
    pincode: string;
    latitude: number;
    longitude: number;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
