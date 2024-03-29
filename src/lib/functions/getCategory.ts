import { env } from "@/env/client.mjs";
import type { ListServerPayload, Category, Product } from "@/lib/types";

type Params = {
  key: string;
  page: number;
};

export default async function getCategory({ key, page }: Params) {
  const params = new URLSearchParams({
    page: "1",
    perPage: "1",
    filter: `(key='${key}')`,
  });

  const categoriesRes = await fetch(
    `${
      env.NEXT_PUBLIC_SERVER_URL
    }/api/collections/categories/records?${params.toString()}`,
    { next: { revalidate: 86400 } }
  );
  if (!categoriesRes.ok) {
    throw new Error("Could not fetch category.");
  }
  const categoryList =
    (await categoriesRes.json()) as ListServerPayload<Category>;

  const category = categoryList.items[0];

  if (!category) {
    return null;
  }

  const productParams = new URLSearchParams({
    page: `${page}`,
    perPage: "12",
    sort: "-created",
    filter: `(published=true && category='${category.id}')`,
  });

  const productsRes = await fetch(
    `${
      env.NEXT_PUBLIC_SERVER_URL
    }/api/collections/products/records?${productParams.toString()}`
  );

  if (!productsRes.ok) {
    throw new Error("Could not fetch category.");
  }

  const productsList = (await productsRes.json()) as ListServerPayload<Product>;

  return { ...category, ...productsList };
}
