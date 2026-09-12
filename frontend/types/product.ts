export interface Product {
  id: string;
  storeId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  stockQuantity: number;
  unit: string;
  imageUrl: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string;
  isActive: boolean;
}
