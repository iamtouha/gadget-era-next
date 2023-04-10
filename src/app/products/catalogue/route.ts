import { getFileUrl } from "@/utils/functions";
import pb from "@/utils/pb";
import type { Brand, Category, Product } from "@/utils/types";

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
    age_group: "all ages",
    brand: (item.expand?.brand as Brand).name,
    google_product_category: (item.expand?.category as Category)
      .google_taxonomy_id,
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
      "Content-Disposition": `attachment;filename=catalogue ${new Date().toDateString()}.csv`,
    },
  });
}
