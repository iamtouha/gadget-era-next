export type Product = {
  id: string;
  name: string;
  key: string;
  overview: string;
  price: number;
  discounted_price: number | undefined;
  description: string;
  images: string[];
  created: string;
  updated: string;
  in_stock: boolean;
  published: boolean;
};

export type Category = {
  id: string;
  name: string;
  cover: string;
  key: string;
};

export type Brand = {
  id: string;
  name: string;
  logo: string;
  key: string;
};

export type OrderItem = {
  id: string;
  order: string;
  product: string;
  rate: number;
  units: number;
  expand?: { product: Product };
};

export type Payment = {
  id: string;
  ref_id: string;
  payment_id: string;
  method: "bkash" | "rocket" | "nagad";
  user?: string;
};

export type Order = {
  id: string;
  payment_reference: string;
  receiver: string;
  phone: string;
  email: string;
  address: string;
  shipping: number;
  total: number;
  cod: boolean;
  status:
    | "pending"
    | "confirmed"
    | "cancelled"
    | "rejected"
    | "shipped"
    | "delivered";
  created: string;
};

export type ListServerPayload<T extends Object> = {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: T[];
};
