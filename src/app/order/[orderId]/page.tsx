import { notFound } from "next/navigation";
import type { Order, OrderItem, Payment } from "@/utils/types";
import Image from "next/image";
import { getFileUrl } from "@/utils/functions";
import pb from "@/utils/pb";
import dayjs from "dayjs";
import { currency, number } from "@/utils/formatter";
import config from "@/assets/config.json";
import {
  EnvelopeIcon,
  GlobeAltIcon,
  LinkIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import Invoice from "@/components/Invoice";
import PrintBtn from "@/components/PrintBtn";

const getOrder = (orderId: string) => {
  return new Promise<Order | null>((resolve, reject) => {
    pb.collection("orders")
      .getOne<Order>(orderId)
      .then((item) => resolve(item))
      .catch((e) => {
        if (e.status === 404) {
          return resolve(null);
        }
        reject(e);
      });
  });
};

const getItems = (orderId: string) => {
  return new Promise<OrderItem[]>((resolve, reject) => {
    pb.collection("order_items")
      .getList<OrderItem>(1, 30, {
        filter: `(order='${orderId}')`,
        expand: "product",
      })
      .then((list) => resolve(list.items))
      .catch((e) => {
        reject(e);
      });
  });
};

const getPayment = (orderId: string) => {
  return new Promise<Payment | null>((resolve, reject) => {
    pb.collection("payments")
      .getFirstListItem<Payment>(`(order='${orderId}')`)
      .then((item) => resolve(item))
      .catch((e) => {
        if (e.status === 404) {
          return resolve(null);
        }
        reject(e);
      });
  });
};

const Order = async ({ params }: { params: { orderId: string } }) => {
  const [order, orderItems, payment] = await Promise.all([
    getOrder(params.orderId),
    getItems(params.orderId),
    getPayment(params.orderId),
  ]);

  if (!order) {
    notFound();
  }

  return (
    <main>
      <div className="container mx-auto px-4 py-8 print:hidden md:max-w-screen-md">
        <div className="bg-white p-3 shadow dark:bg-gray-800 sm:p-6">
          <h2 className="mb-4 text-2xl font-bold">Order#{order.id}</h2>
          <div className="mb-4 flex justify-between">
            <p className="font-bold">Date:</p>
            <p>{dayjs(order.created).format("DD/MM/YYYY hh:mm A")}</p>
          </div>
          <div className="mb-4 flex justify-between">
            <p className="font-bold">Receiver Name:</p>
            <p>{order.receiver}</p>
          </div>
          <div className="mb-4 flex justify-between">
            <p className="font-bold">Phone Number:</p>
            <p>{order.phone}</p>
          </div>
          <div className="mb-4 flex justify-between">
            <p className="font-bold">Email:</p>
            <p>{order.email}</p>
          </div>
          <div className="mb-4 flex justify-between">
            <p className="font-bold">Shipping Address:</p>
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
                      {currency.format(item.rate)} &times; {item.units + " pcs"}
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
          <PrintBtn />
        </div>
      </div>
      <Invoice order={order} items={orderItems} />
    </main>
  );
};

export default Order;
