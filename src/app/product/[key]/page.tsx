import { env } from "@/env/server.mjs";
import type { ListServerPayload, Product } from "@/types";

const Product = async ({ params }: { params: { key: string } }) => {
  const product = await getProduct(params.key);

  return <div>{product.name}</div>;
};

const getProduct = async (key: string) => {
  const params = encodeURIComponent(`page=1&perPage=1?filter=(key='${key}')`);
  const res = await fetch(
    `${env.SERVER_URL}/api/collections/products/records?${params}')`
  );

  const data = (await res.json()) as ListServerPayload<Product>;

  if (!res.ok || !data.items[0]) {
    throw new Error("Could not load the product");
  }

  return data.items[0];
};

export default Product;
