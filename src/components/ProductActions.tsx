"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/stores/cart";
import type { Product } from "@/types";

const ProductActions = ({ product }: { product: Product }) => {
  const cart = useCartStore();

  const [units, unitsSet] = useState(1);
  const [loadedOnClient, loadedOnClientSet] = useState(false);

  useEffect(() => {
    loadedOnClientSet(true);
  }, []);

  return (
    <div>
      <div className="flex items-stretch gap-4">
        <input
          disabled={
            !product.in_stock || (loadedOnClient && cart.has(product.id))
          }
          className="cart-units-input w-16 bg-gray-50 px-3 dark:bg-gray-900"
          type={"number"}
          value={units}
          min={1}
          max={9}
          onChange={(e) => unitsSet(e.target.valueAsNumber)}
        />
        <button
          disabled={
            !product.in_stock || (loadedOnClient && cart.has(product.id))
          }
          className="bg-primary-500 py-2 px-4 transition-colors hover:bg-primary-600 disabled:opacity-75 disabled:hover:bg-primary-500"
          onClick={() => cart.add(product, units)}
        >
          {loadedOnClient && cart.has(product.id)
            ? "Added to Cart"
            : !product.in_stock
            ? "Out of Stock"
            : "Add to Cart"}
        </button>
        <button
          disabled={!product.in_stock}
          className="border-2 border-primary-500 py-2 px-4 transition-colors hover:bg-primary-500/20 disabled:opacity-75 disabled:hover:bg-transparent"
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default ProductActions;
