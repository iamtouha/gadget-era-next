"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/stores/cart";
import type { Product } from "@/utils/types";
import { useRouter } from "next/navigation";

const ProductActions = ({ product }: { product: Product }) => {
  const cart = useCartStore();
  const router = useRouter();

  const [units, unitsSet] = useState(1);
  const [loadedOnClient, loadedOnClientSet] = useState(false);

  useEffect(() => {
    loadedOnClientSet(true);
  }, []);

  return (
    <div className="mb-8 flex items-stretch gap-4">
      <input
        disabled={!product.in_stock || (loadedOnClient && cart.has(product.id))}
        className="cart-units-input w-16 bg-neutral-50 px-3 dark:bg-neutral-900"
        type={"number"}
        value={units}
        min={1}
        max={9}
        onChange={(e) => unitsSet(e.target.valueAsNumber)}
      />
      {loadedOnClient && cart.has(product.id) ? (
        <button
          className="border-2 border-primary-500 py-2 px-2 sm:px-4 transition-colors hover:bg-primary-500/20"
          onClick={() => cart.remove(product.id)}
        >
          Remove from Cart
        </button>
      ) : (
        <button
          disabled={!product.in_stock}
          className="bg-primary-500 py-2 px-2 sm:px-4 transition-colors hover:bg-primary-600 disabled:opacity-75 disabled:hover:bg-primary-500"
          onClick={() => cart.add(product, units)}
        >
          {!product.in_stock ? "Out of Stock" : "Add to Cart"}
        </button>
      )}
      <button
        disabled={!product.in_stock}
        className="border-2 border-primary-500 py-2 px-2 sm:px-4 transition-colors hover:bg-primary-500/20 disabled:opacity-75 disabled:hover:bg-transparent"
        onClick={() => {
          cart.add(product, units);
          router.push("/");
        }}
      >
        Order Now
      </button>
    </div>
  );
};

export default ProductActions;
