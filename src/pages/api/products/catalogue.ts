import { getFileUrl } from "@/lib/functions";
import pb from "@/lib/pb";
import type { Brand, Category, Product } from "@/lib/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res.status(400).send({ message: "Method not allowed" });

  const products = await pb.collection("products").getFullList<Product>({
    filter: `(published=true)`,
  });
  return res.send(
    products.map((item) => ({
      id: item.key,
      title: item.name,
      description: `${item.overview} To see full specifications, visit: https://www.gadgeterabd.com/product/${item.key}`,
      price: item.price,
      sale_price: item.discounted_price ? item.discounted_price : undefined,
      availability: item.in_stock,
      condition: "new",
      link: `https://www.gadgeterabd.com/product/${item.key}`,
      image_link: getFileUrl("products", item.id, item.images[0] ?? ""),
      brand: (item.expand?.brand as Brand).name,
      category: (item.expand?.category as Category).name,
    }))
  );
}
