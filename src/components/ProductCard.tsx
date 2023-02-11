import type { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({
  product,
  imgServer,
}: {
  product: Product;
  imgServer: string;
}) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BDT",
  });

  return (
    <Link
      key={product.id}
      href={"/product/" + product.key}
      className="block bg-gray-100 p-2 transition-colors hover:bg-orange-600 hover:bg-opacity-20 dark:bg-gray-800"
    >
      <div className="relative">
        <Image
          src={`${imgServer}/api/files/products/${product.id}/${product.images[0]}`}
          alt={product.name}
          width={450}
          height={450}
        />
      </div>

      <h3 className="my-2">{formatter.format(product.price)}</h3>
      <h3 className="text-lg">{product.name}</h3>
    </Link>
  );
};

export default ProductCard;
