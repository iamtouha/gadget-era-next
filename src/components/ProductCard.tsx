import type { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({
  product,
  imgHost,
}: {
  product: Product;
  imgHost: string;
}) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BDT",
  });

  return (
    <Link
      href={"/product/" + product.key}
      className="block border bg-gray-50 p-2 transition-all hover:bg-gray-100 hover:shadow dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800"
    >
      <div className="relative -mx-2 -mt-2">
        {product.discounted_price ? (
          <span className="absolute right-2 top-2 block bg-primary-500 px-1 py-0.5 text-xs text-white">
            {Math.ceil(
              (100 * (product.price - product.discounted_price)) / product.price
            )}
            {"% off!"}
          </span>
        ) : (
          ""
        )}
        <Image
          src={`${imgHost}/api/files/products/${product.id}/${product.images[0]}`}
          alt={product.name}
          width={600}
          height={600}
        />
      </div>

      <h3 className="my-2 text-sm">
        {formatter.format(
          product.discounted_price ? product.discounted_price : product.price
        )}
      </h3>
      <h3 className="text-lg leading-tight">{product.name}</h3>
    </Link>
  );
};

export default ProductCard;
