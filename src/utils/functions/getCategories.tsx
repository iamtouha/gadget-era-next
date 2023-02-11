import { env } from "@/env/server.mjs";
import type { Category, ListServerPayload } from "@/types";

export default async function getCategories() {
  const res = await fetch(
    env.SERVER_URL +
      "/api/collections/categories/records?sort=-created&filter=(published=true)"
  );
  if (!res.ok) {
    throw new Error("Could not fetch categories.");
  }
  const data = (await res.json()) as ListServerPayload<Category>;
  return data.items;
}
