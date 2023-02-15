import pb from "@/utils/pb";
import { OrderFormInput } from "@/utils/schema";
import { customAlphabet } from "nanoid";
import type { NextApiRequest, NextApiResponse } from "next";
import type { CartItem } from "@/stores/cart";
import type { Order, OrderItem } from "@/utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const record = await pb
    .collection("orders")
    .getOne<Order>(req.query.id as string)
    .catch((error) => console.log(error));
  if (!record) {
    return res.status(404).send({ message: "Order not found" });
  }
  const itemsList = await pb
    .collection("order_items")
    .getList<OrderItem>(1, 30, {
      filter: `(order='${record.id}')`,
      expand: "product",
    })
    .catch((error) => console.log(error));
  return res.send({ ...record, items: itemsList?.items ?? [] });
}
