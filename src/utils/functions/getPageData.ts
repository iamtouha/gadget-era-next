import { env } from "@/env/client.mjs";
import type { Category, ListServerPayload, Product } from "@/utils/types";

export default async function getPageData() {
  const params = new URLSearchParams();
  params.set("sort", "created");
  params.set("page", "1");
  params.set("perPage", "1");
  params.set(
    "expand",
    "featured_products,latest_products,popular_products,popular_categories"
  );

  const res = await fetch(
    `${
      env.NEXT_PUBLIC_SERVER_URL
    }/api/collections/homepage/records?${params.toString()}`
  );
  if (!res.ok) {
    throw new Error("Could not fetch home page data.");
  }
  const data = (await res.json()) as ListServerPayload<{
    id: string;
    expand: {
      featured_products: Product[];
      latest_products: Product[];
      popular_categories: Category[];
      popular_products: Product[];
    };
  }>;

  if (!data.items[0]) {
    throw new Error("Could not find home page data.");
  }
  return data.items[0].expand;
}
