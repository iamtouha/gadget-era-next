import { env } from "@/env/server.mjs";
import type { Brand, ListServerPayload } from "@/types";

export default async function getBrands() {
  const res = await fetch(
    env.SERVER_URL +
      "/api/collections/brands/records?sort=-created&filter=(published=true)"
  );
  if (!res.ok) {
    throw new Error("Could not fetch brands.");
  }
  const data = (await res.json()) as ListServerPayload<Brand>;
  return data.items;
}
