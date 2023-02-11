import { env } from "@/env/server.mjs";
import type { Brand, Category, ListServerPayload } from "@/types";

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
    console.log(await res.json());
    throw new Error("Could not fetch brants.");
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
    <div className="container mx-auto mt-2 p-2 2xl:max-w-screen-2xl">
      <h1 className="mb-6 text-4xl">Browse All Products</h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 xl:grid-cols-5">
        <section>
          <div className="w-full bg-gray-200 p-4 shadow-sm dark:bg-gray-800">
            <form method="GET">
              <div className="px-2 py-2">
                <label htmlFor="search-product" className="mb-1 block">
                  Search Product
                </label>
                <input
                  id="search-product"
                  className="w-full px-2 py-2 dark:bg-gray-900"
                />
              </div>
              <div className="px-2 py-2">
                <label htmlFor="select-category" className="mb-1 block">
                  Select a Category
                </label>
                <select
                  id="select-category"
                  className="w-full px-2 py-2 dark:bg-gray-900"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="px-2 py-2">
                <label htmlFor="select-brand" className="mb-1 block">
                  Select a Brand
                </label>
                <select
                  id="select-brand"
                  className="w-full px-2 py-2 dark:bg-gray-900"
                >
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="px-2 py-2">
                <label htmlFor="select-sort" className="mb-1 block">
                  Sort By
                </label>
                <select
                  id="select-sort"
                  className="w-full px-2 py-2 dark:bg-gray-900"
                >
                  <option value={"created"} selected>
                    Created At
                  </option>
                </select>
              </div>
            </form>
          </div>
        </section>
        <section className="lg:col-span-3 xl:col-span-4">{children}</section>
      </div>
    </div>
  );
};

export default ProductsLayout;
