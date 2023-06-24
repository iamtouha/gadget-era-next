import { getFileUrl } from "@/lib/functions";
import pb from "@/lib/pb";
import type { Brand, Category, Product } from "@/lib/types";

export const revalidate = 0;

export async function GET() {
  const products = await pb.collection("products").getFullList<Product>({
    expand: "category,brand",
  });
  const data_source = products.map((item) => ({
    id: item.id,
    title: item.name,
    description: `${item.overview} To see full specifications, visit: https://www.gadgeterabd.com/product/${item.key}`,
    price: item.price,
    sale_price: item.discounted_price ? item.discounted_price : "",
    availability: item.in_stock ? "in stock" : "out of stock",
    condition: "new",
    link: `https://www.gadgeterabd.com/product/${item.key}`,
    image_link: getFileUrl("products", item.id, item.images[0] ?? ""),
    additional_image_link: item.images
      .filter((_, i) => !!i)
      .map((path) => getFileUrl("products", item.id, path))
      .join("|"),
    age_group: "all ages",
    brand: (item.expand?.brand as Brand).name,
    item_group_id: item.model,
    status: item.published ? "active" : "archived",
  }));
  let columns = Object.keys(data_source[0]).join();
  const items = data_source
    .map((item) => JSON.stringify(Object.values(item)))
    .join("\n")
    .replace(/(^\[)|(\]$)/gm, "");

  return new Response(`${columns}\n${items}`, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment;filename=catalogue-${new Date().toISOString()}.csv`,
    },
  });
}
