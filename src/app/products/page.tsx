import ProductCard from "@/components/ProductCard";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { getProducts } from "@/utils/functions";

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

const Products = async (props: Props) => {
  const productsList = await getProducts(props.searchParams);

  return (
    <>
      {productsList.totalItems === 0 ? (
        <div className="bg-gray-100 py-6 text-center text-lg text-gray-500/80 dark:bg-gray-900 dark:text-gray-600">
          <ExclamationTriangleIcon className="mx-auto h-12 w-12" />
          <p>No product found.</p>
        </div>
      ) : null}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-5">
        {productsList.items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}{" "}
      </div>
    </>
  );
};

export default Products;
