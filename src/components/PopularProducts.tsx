"use client";

import { useKeenSlider } from "keen-slider/react";
import type { Product } from "@/utils/types";
import Link from "next/link";
import Image from "next/image";
import { getFileUrl } from "@/utils/functions";

const PopularProducts = ({ products }: { products: Product[] }) => {
  const [sliderRef] = useKeenSlider(
    {
      mode: "free",
      loop: false,
      slides: { perView: 1 },
      breakpoints: {
        "(min-width: 500px)": {
          slides: { perView: 2 },
        },
        "(min-width: 768px)": {
          slides: { perView: 3 },
        },
        "(min-width: 1024px)": {
          slides: { perView: 4 },
        },
        "(min-width: 1280px)": {
          slides: { perView: 4 },
        },
      },
    },
    []
  );
  return (
    <div ref={sliderRef} className="keen-slider h-80">
      {products.map((product, n) => (
        <div
          key={product.id}
          className={`keen-slider__slide number-slide${n + 1} p-2`}
        >
          <Link href={"/product/" + product.key}>
            <Image
              src={getFileUrl("products", product.id, product.images[0] ?? "")}
              className="h-full w-full object-contain"
              alt={product.name}
              width={256}
              height={256}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PopularProducts;
