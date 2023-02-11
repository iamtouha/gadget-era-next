import { env } from "@/env/server.mjs";
import Link from "next/link";
import type { ListServerPayload, Product } from "@/types";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";

type PageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

const Products = async (props: PageProps) => {
  const productsList = await getProductsList(props);

  return (
    <main className="grid grid-cols-4 gap-2">
      {productsList.items.map((product) => (
        <ProductCard product={product} imgServer={env.SERVER_URL} />
      ))}
    </main>
  );
};

export default Products;

const getProductsList = async (props: PageProps) => {
  const { brand, category, sort, desc, page } = props.searchParams ?? {};
  let filter = "published=true";
  let order = "";

  if (brand) filter += ` && brand='${brand}'`;
  if (category) filter += ` && category='${category}'`;

  if (sort) order = `${desc ? "-" : ""}${sort},`;

  const res = await fetch(
    env.SERVER_URL +
      `/api/collections/products/records?page=${page ?? 1}&sort=${
        sort ? sort + "," : ""
      }-created${filter ? "&filter=(" + filter + ")" : ""}`
  );
  if (!res.ok) {
    throw new Error("Could not fetch products.");
  }
  return (await res.json()) as ListServerPayload<Product>;
};
