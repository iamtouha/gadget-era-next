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

export type ListServerPayload<T extends Object> = {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: T[];
};
