import Link from "next/link";
import Image from "next/image";
import { currency } from "@/lib/utils/formatter";
import { getFileUrl } from "@/lib/functions";
import type { Product } from "@/lib/types";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      href={"/product/" + product.key}
      className="block border bg-neutral-50 p-2 transition-all hover:bg-neutral-100 hover:shadow dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
    >
      <div className="relative -mx-2 -mt-2 overflow-hidden">
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
          src={getFileUrl("products", product.id, product.images[0])}
          alt={product.name}
          width={600}
          height={600}
        />
      </div>

      <h3 className="my-2 text-sm text-neutral-700 dark:text-neutral-300">
        {currency.format(
          product.discounted_price ? product.discounted_price : product.price
        )}
      </h3>
      <h3 className="text-lg">{product.name}</h3>
    </Link>
  );
};

export default ProductCard;
