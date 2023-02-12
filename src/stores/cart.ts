import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";

interface CartState {
  items: Array<{
    productId: string;
    productName: string;
    imageUrl: string;
    price: number;
    units: number;
  }>;
  add: (product: Product, units: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  has: (productId: string) => boolean;
  total: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: ({ id, name, price, discounted_price, images }, units) => {
        set((prev) => ({
          items: [
            ...prev.items,
            {
              productId: id,
              productName: name,
              price: discounted_price ? discounted_price : price,
              imageUrl: images[0] ?? "",
              units,
            },
          ],
        }));
      },
      remove(productId) {
        set((prev) => ({
          items: prev.items.filter((item) => item.productId !== productId),
        }));
      },
      clear() {
        set(() => ({ items: [] }));
      },

      has(productId) {
        return get().items.some((item) => item.productId === productId);
      },
      total() {
        return get().items.reduce(
          (acc, item) => acc + item.price * item.units,
          0
        );
      },
    }),
    { name: "cart" }
  )
);
