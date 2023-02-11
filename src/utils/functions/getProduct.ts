import { env } from "@/env/server.mjs";
import type { ListServerPayload, Product } from "@/types";

export default async function getProduct(key: string) {
  const params = new URLSearchParams({
    page: "1",
    perPage: "1",
    filter: `(key='${key}')`,
  });

  const res = await fetch(
    `${env.SERVER_URL}/api/collections/products/records?${params.toString()}`,
    { next: { revalidate: 10 } }
  );
  console.log(`${env.SERVER_URL}/api/collections/products/records?${params}`);
  const data = (await res.json()) as ListServerPayload<Product>;

  if (!res.ok || !data.items[0]) {
    throw new Error("Could not load the product");
  }

  return data.items[0];
}
