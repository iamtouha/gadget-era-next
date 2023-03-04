import { notFound } from "next/navigation";
import type { Order, OrderItem } from "@/utils/types";
import Image from "next/image";
import { getFileUrl } from "@/utils/functions";
import pb from "@/utils/pb";
import dayjs from "dayjs";
import { currency } from "@/utils/formatter";
import config from "@/assets/config.json";
import Invoice from "@/components/Invoice";
import OrderActions from "@/components/OrderActions";
import type { Metadata } from "next";

type Props = { params: { orderId: string } };

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: "Track your order",
    description: "Track order #" + params.orderId,
    openGraph: {
      images: [{ url: "/api/og?text=Track Your Order" }],
    },
  };
}

const getOrder = async (orderId: string) => {
  try {
    const order = pb
      .collection("orders")
      .getOne<Order>(orderId, { expand: "order_items(order).product" });
    return order;
  } catch (e) {
    if ((e as Record<string, unknown>).status === 404) {
      return null;
    }
    throw new Error();
  }
};

const Order = async ({ params }: Props) => {
  const order = await getOrder(params.orderId);
  const orderItems = order?.expand?.["order_items(order)"] as OrderItem[];

  if (!order) {
    notFound();
  }

  return (
    <main>
      {order.status === "pending" && !order.cod ? (
        <div className="container mx-auto px-4 pt-8 print:hidden md:max-w-screen-md">
          <div className="bg-white p-3 shadow dark:bg-gray-800 sm:p-6">
            <h2 className="mb-4 text-lg font-bold md:text-2xl">
              Complete your payment
            </h2>
            <p className="">For payment, use Reference</p>
            <p className="my-2 inline-block rounded bg-gray-200 px-2 py-2 text-3xl dark:bg-gray-600">
              {order.payment_reference}
            </p>
            <p>Payment Methods:</p>
            <ul>
              <li>{`Bkash : ${config.payment.bkash} (Personal)`}</li>
              <li>{`Nagad: ${config.payment.nagad} (Personal)`}</li>
            </ul>
            {/* <p className="mt-2 text-sm">
              Your payment will be verified within 2 hours after payment.
            </p> */}
          </div>
        </div>
      ) : null}
      <div className="container mx-auto px-4 py-8 print:hidden md:max-w-screen-md">
        <div className="bg-white p-3 shadow dark:bg-gray-800 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between">
            <h2 className="text-lg font-bold md:text-2xl">Order#{order.id}</h2>
            <span
              className={`${
                {
                  pending: "bg-amber-500",
                  confirmed: "bg-green-500",
                  cancelled: "bg-red-500",
                  rejected: "bg-red-500",
                  shipped: "bg-green-500",
                  delivered: "bg-green-500",
                }[order.status]
              } rounded-full px-2 py-1 text-sm text-white`}
            >
              {order.status}
            </span>
          </div>

          <div className="mb-2 flex justify-between">
            <p className="font-medium">Date:</p>
            <p>{dayjs(order.created).format("DD/MM/YYYY hh:mm A")}</p>
          </div>
          <div className="mb-2 flex justify-between">
            <p className="font-medium">Receiver Name:</p>
            <p>{order.receiver}</p>
          </div>
          {order.cod ? (
            <div className="mb-2 flex justify-between">
              <p className="font-medium">Cash on Delivery:</p>
              <p>Yes</p>
            </div>
          ) : (
            <div className="mb-2 flex justify-between">
              <p className="font-medium">Payment Reference:</p>
              <p>{order.payment_reference}</p>
            </div>
          )}

          <div className="mb-2 flex justify-between">
            <p className="font-medium">Phone Number:</p>
            <p>{order.phone}</p>
          </div>
          <div className="mb-2 flex justify-between">
            <p className="font-medium">Email:</p>
            <p>{order.email}</p>
          </div>
          <div className="mb-2 flex justify-between">
            <p className="font-medium">Shipping Address:</p>
            <p>{order.address}</p>
          </div>

          <div className="mb-4">
            <p className="mb-2 font-bold">Items:</p>
            <ul>
              {orderItems.map((item) => (
                <li key={item.id} className="my-1 flex gap-2">
                  <Image
                    src={getFileUrl(
                      "products",
                      item.expand?.product.id ?? "",
                      item.expand?.product.images[0] ?? ""
                    )}
                    alt={item.expand?.product.name ?? "Product"}
                    width={64}
                    height={64}
                  />
                  <div>
                    <p className="mb-1 leading-tight line-clamp-2">
                      {item.expand?.product.name}
                    </p>
                    <p className="text-sm leading-none text-gray-600 dark:text-gray-200">
                      {currency.format(item.rate)} &times; {`${item.units} pcs`}
                    </p>
                  </div>
                  <p className="ml-auto mr-0 flex-1 text-right">
                    {currency.format(item.units * item.rate)}{" "}
                  </p>
                </li>
              ))}
              <hr className="mt-2" />
              <li className="flex py-2">
                <p>Shipping Charge</p>
                <p className="ml-auto mr-0 text-right">
                  {currency.format(order.shipping)}
                </p>
              </li>
              <hr />
              <li className="flex py-2">
                <p>Grand Total</p>
                <p className="ml-auto mr-0 text-right font-semibold">
                  {currency.format(order.total)}
                </p>
              </li>
            </ul>
          </div>
          <OrderActions />
        </div>
      </div>
      <Invoice order={order} items={orderItems} />
    </main>
  );
};

export default Order;
