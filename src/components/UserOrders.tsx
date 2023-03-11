"use client";

import { currency } from "@/utils/formatter";
import { Order } from "@/utils/types";
import Link from "next/link";
import useSWR from "swr";
import Loading from "./Loading";

const fetcher = (url: string) =>
  fetch(url, { next: { revalidate: 10 } }).then((res) => res.json());

const UserOrders = () => {
  const { data: orders, isLoading } = useSWR<Order[]>("/api/orders", fetcher);

  console.log(orders);

  return (
    <section aria-label="my orders">
      <h1 className="my-6 text-3xl font-bold">My Orders</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <table className="table-collapse w-full text-left">
          <thead>
            <tr className="bg-neutral-200 dark:bg-neutral-700">
              <th className="py-2 px-4">Receiver</th>
              <th className="py-2 px-4">Address</th>
              <th className="py-2 px-4">Total</th>
              <th className="py-2 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {orders?.length ? (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="bg-white py-2 dark:bg-neutral-800"
                >
                  <td className="py-2 px-4">{order.receiver}</td>
                  <td className="py-2 px-4">{order.address}</td>
                  <td className="py-2 px-4">
                    {currency.format(order.total + order.shipping)}
                  </td>
                  <td className="py-2 px-4 text-center">
                    <Link
                      href={`/order/${order.id}`}
                      className="py-2 px-2 font-bold text-red-500 hover:text-red-600"
                    >
                      view
                    </Link>
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
      )}
    </section>
  );
};

export default UserOrders;
