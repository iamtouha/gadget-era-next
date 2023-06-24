"use client";

import { useCartStore } from "@/stores/cart";
import { currency } from "@/lib/utils/formatter";
import { getFileUrl } from "@/lib/functions";
import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useState } from "react";

const CartList = () => {
  const [loadedOnClient, loadedOnClientSet] = useState(false);

  useEffect(() => {
    loadedOnClientSet(true);
  }, []);
  const cart = useCartStore();
  return (
    // <ul className="bg-neutral-200 dark:bg-neutral-800 shadow-lg p-4">
    //   {loadedOnClient && cart.items.length ? (
    //     cart.items.map((item) => (
    //       <li key={item.productId} className="my-1 flex gap-2">
    //         <Image
    //           src={getFileUrl("products", item.productId, item.imageUrl)}
    //           alt={item.productName}
    //           width={64}
    //           height={64}
    //         />
    //         <div>
    //           <p className="mb-1 leading-tight line-clamp-2">
    //             {item.productName}
    //           </p>
    //           <p className="text-sm leading-none text-neutral-600 dark:text-neutral-200">
    //             {currency.format(item.price)} &times; {`${item.units} pcs`}
    //           </p>
    //         </div>
    //         <p className="ml-auto mr-0 flex-1 text-right">
    //           {currency.format(item.units * item.price)}{" "}
    //         </p>
    //       </li>
    //     ))
    //   ) : (
    //     <li className="bg-white dark:bg-neutral-800 py-6 px-4 text-center italic">
    //       No product in cart.
    //     </li>
    //   )}
    // </ul>
    <>
      <div className="overflow-x-auto">
        <table className="table-collapse w-full text-left">
          <thead>
            <tr className="bg-neutral-200 dark:bg-neutral-700">
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
                  className="bg-white dark:bg-neutral-800"
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
              <tr className="bg-white dark:bg-neutral-800">
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
    </>
  );
};

export default CartList;
