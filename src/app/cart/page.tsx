"use client";

import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "@/stores/cart";
import { currency } from "@/utils/formatter";
import { getFileUrl } from "@/utils/functions";
import Image from "next/image";
import Link from "next/link";

 
const Cart = () => {
  const [loadedOnClient, loadedOnClientSet] = useState(false);

  useEffect(() => {
    loadedOnClientSet(true);
  }, []);
  const cart = useCartStore();

  return (
    <main>
      <div className="container mx-auto p-2 lg:max-w-screen-lg">
        <h1 className="mb-4 mt-6 text-2xl lg:text-3xl">My Cart</h1>
        <div className="overflow-x-auto">
          <table className="table-collapse w-full text-left">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="py-2 px-4">Product</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Quantity</th>
                <th className="py-2 px-4">Total</th>
                <th className="py-2 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {loadedOnClient && cart.items.length ? (
                cart.items.map((item) => (
                  <tr
                    key={item.productId}
                    className="bg-white dark:bg-gray-800"
                  >
                    <td title={item.productName} className="py-2 px-4">
                      <Image
                        src={getFileUrl(
                          "products",
                          item.productId,
                          item.imageUrl
                        )}
                        width={64}
                        height={64}
                        alt={item.productName}
                      />
                    </td>
                    <td className="py-2 px-4">{currency.format(item.price)}</td>
                    <td className="py-2 px-4">{item.units}</td>
                    <td className="py-2 px-4">
                      {currency.format(item.price * item.units)}
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => cart.remove(item.productId)}
                        className="bg-red-500 py-2 px-2 font-bold text-white hover:bg-red-600"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="bg-white dark:bg-gray-800">
                  <td colSpan={5} className="py-6 px-4 text-center italic">
                    No product in cart.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex justify-end">
          <p className="font-bold">
            Total: {loadedOnClient && currency.format(cart.total())}
          </p>
        </div>
        <div className="mt-8 flex justify-end">
          <Link
            href={"/cart/order"}
            className="bg-primary-500 py-2 px-4 font-bold text-white hover:bg-primary-600"
          >
            Place Order
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Cart;
