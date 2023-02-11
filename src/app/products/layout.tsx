import FilterForm from "@/components/FilterForm";
import ProductsLoadingUI from "./loading";
import { Suspense } from "react";
import { getBrands, getCategories } from "@/utils/functions";

type Props = {
  children: React.ReactNode;
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
