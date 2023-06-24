import { env } from "@/env/client.mjs";
import type { ListServerPayload, Brand, Product } from "@/lib/types";

type Params = {
  key: string;
  page: number;
};

export default async function getBrand({ key, page }: Params) {
  const params = new URLSearchParams({
    page: "1",
    perPage: "1",
    filter: `(key='${key}')`,
  });

  const brandsRes = await fetch(
    `${
      env.NEXT_PUBLIC_SERVER_URL
    }/api/collections/brands/records?${params.toString()}`,
    { next: { revalidate: 86400 } }
  );
  if (!brandsRes.ok) {
    throw new Error("Could not fetch brand.");
  }
  const brandList = (await brandsRes.json()) as ListServerPayload<Brand>;

  const brand = brandList.items[0];

  if (!brand) {
    return null;
  }

  const productParams = new URLSearchParams({
    page: `${page}`,
    perPage: "12",
    sort: "-created",
    filter: `(published=true && brand='${brand.id}')`,
  });

  const productsRes = await fetch(
    `${
      env.NEXT_PUBLIC_SERVER_URL
    }/api/collections/products/records?${productParams.toString()}`
  );

  if (!productsRes.ok) {
    throw new Error("Could not fetch brand.");
  }

  const productsList = (await productsRes.json()) as ListServerPayload<Product>;

  return { ...brand, ...productsList };
}
