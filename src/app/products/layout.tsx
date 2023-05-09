import FilterForm from "./Filter";
import ProductsLoadingUI from "./loading";
import { Suspense } from "react";
import { getBrands, getCategories } from "@/utils/functions";

type Props = {
  children: React.ReactNode;
};

export const revalidate = 86400;

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

export const metadata = {
  title: "Products",
  description:
    "Shop the latest and most stylish watches at Gadget Era. Our collection features a wide range of brands and styles, from classic timepieces to modern smartwatches. Find the perfect watch to fit your lifestyle, at affordable prices. Free shipping available on all orders. Shop now!",
  openGraph: {
    images: [{ url: "/api/og?text=Products" }],
  },
};
