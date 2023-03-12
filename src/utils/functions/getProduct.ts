import { env } from "@/env/client.mjs";
import type { ListServerPayload, Product } from "@/utils/types";

export default async function getProduct(key: string) {
  const params = new URLSearchParams({
    page: "1",
    perPage: "1",
    filter: `(key='${key}')`,
  });

  const res = await fetch(
    `${
      env.NEXT_PUBLIC_SERVER_URL
    }/api/collections/products/records?${params.toString()}`,
    { next: { revalidate: 10 } }
  );

  const data = (await res.json()) as ListServerPayload<Product>;

  if (res.ok && !data.items[0]) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Could not load the product");
  }

  return data.items[0];
}
