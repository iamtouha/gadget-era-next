import { env } from "@/env/client.mjs";
import type { ListServerPayload, Category } from "@/utils/types";

export default async function getCategory(key: string) {
  const params = new URLSearchParams({
    page: "1",
    perPage: "1",
    filter: `(key='${key}')`,
  });

  const res = await fetch(
    `${
      env.NEXT_PUBLIC_SERVER_URL
    }/api/collections/categories/records?${params.toString()}`,
    { next: { revalidate: 10 } }
  );

  const data = (await res.json()) as ListServerPayload<Category>;

  if (!res.ok || !data.items[0]) {
    throw new Error("Could not load the product");
  }

  return data.items[0];
}
