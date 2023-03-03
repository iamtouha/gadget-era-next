import { env } from "@/env/client.mjs";
import { ListServerPayload, Product } from "@/utils/types";

export default async function getVariants(model: string) {
  const urlParams = new URLSearchParams({
    page: "1",
    perPage: "20",
    filter: `(model='${model}')`,
  });
  const res = await fetch(
    env.NEXT_PUBLIC_SERVER_URL +
      `/api/collections/products/records?` +
      urlParams.toString()
  );
  if (!res.ok) {
    console.log(await res.json());
    throw new Error("Could not fetch products.");
  }
  const data = (await res.json()) as ListServerPayload<Product>;

  return data.items;
}
