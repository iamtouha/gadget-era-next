import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/utils/functions";
import Pagination from "@/components/Pagination";
import EmptyProductsList from "@/components/EmptyList";

export const metadata = {
  title: "Products",
  description: "Browse Gadget Era's Product catalogue!",
  openGraph: {
    images: [{ url: "/api/og?text=Products" }],
    description: "Browse Gadget Era's Product catalogue!",
  },
};

export const revalidate = 0;

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};


const Products = async (props: Props) => {
  const productsList = await getProducts(props.searchParams);

  return (
    <>
      {productsList.totalItems === 0 ? (
        <EmptyProductsList caption="No product found." />
      ) : null}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {productsList.items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        currentPage={+((props.searchParams?.page as string) ?? 1)}
        totalPages={productsList.totalPages}
        path="/products"
      />
    </>
  );
};

export default Products;
