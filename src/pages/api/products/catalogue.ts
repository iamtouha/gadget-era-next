import pb from "@/utils/pb";
import type { Product } from "@/utils/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res.status(400).send({ message: "Method not allowed" });

  const products = await pb
    .collection("products")
    .getFullList<Product>({ filter: `(published=true)` });
  return res.send(
    products.map((item) => ({
      id: item.key,
    }))
  );
}
