import pb from "@/lib/pb";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Order, OrderItem } from "@/lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const record = await pb
      .collection("orders")
      .getOne<Order>(req.query.id as string, {
        expand: "order_items(order).product",
      });

    console.log(record);

    if (!record) {
      return res.status(404).send({ message: "Order not found" });
    }
    const itemsList = await pb
      .collection("order_items")
      .getList<OrderItem>(1, 30, {
        filter: `(order='${record.id}')`,
      })
      .catch((error) => console.log(error));
    return res.send({ ...record, items: [] });
  } catch (error) {
    return res.status(500).send({ message: "An error occured." });
  }
}
