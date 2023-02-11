import dynamic from "next/dynamic";
import { env } from "@/env/server.mjs";
import type { Brand, Category, ListServerPayload } from "@/types";
import DynamicFilterForm from "@/components/DynamicFilterForm";
import FilterForm from "@/components/FilterForm";
import ProductsLoadingUI from "./loading";
import { Suspense } from "react";

type Props = {
  children: React.ReactNode;
};

const getCategories = async () => {
  const res = await fetch(
    env.SERVER_URL +
      "/api/collections/categories/records?sort=-created&filter=(published=true)"
  );
  if (!res.ok) {
    throw new Error("Could not fetch categories.");
  }
  const data = (await res.json()) as ListServerPayload<Category>;
  return data.items;
};
const getBrands = async () => {
  const res = await fetch(
    env.SERVER_URL +
      "/api/collections/brands/records?sort=-created&filter=(published=true)"
  );
  if (!res.ok) {
    throw new Error("Could not fetch brands.");
  }
  const data = (await res.json()) as ListServerPayload<Brand>;
  return data.items;
};

const ProductsLayout = async ({ children }: Props) => {
  const [categories, brands] = await Promise.all([
    getCategories(),
    getBrands(),
  ]);
  return (
    <div className="container mx-auto mt-6 p-2 2xl:max-w-screen-2xl">
      <h1 className="mb-4 text-2xl lg:text-3xl">Products</h1>
      <main className="grid grid-cols-1 gap-4 lg:grid-cols-4 xl:grid-cols-5">
        <section aria-label="product filter and sorting">
          <FilterForm brands={brands} categories={categories} />
        </section>
        <section
          aria-label="products collection"
          className="lg:col-span-3 xl:col-span-4"
        >
          <Suspense fallback={<ProductsLoadingUI />}>{children}</Suspense>
        </section>
      </main>
    </div>
  );
};

export default ProductsLayout;
