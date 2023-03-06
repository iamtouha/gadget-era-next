import { getFileUrl } from "@/utils/functions";
import pb from "@/utils/pb";
import type { Brand, Category, Product } from "@/utils/types";
import type { NextApiRequest, NextApiResponse } from "next";

export async function GET(request: Request) {
  const products = await pb.collection("products").getFullList<Product>({
    filter: `(published=true)`,
    expand: "category,brand",
  });
  const data_source = products.map((item) => {
    return {
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
    };
  });
  return new Response(JSON.stringify(data_source), {
    headers: { "content-type": "application/json" },
  });
}
