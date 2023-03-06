"use client";

import { useKeenSlider } from "keen-slider/react";
import type { Product } from "@/utils/types";
import Link from "next/link";
import Image from "next/image";
import { getFileUrl } from "@/utils/functions";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const LatestProducts = ({ products }: { products: Product[] }) => {
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
          slides: { perView: 5 },
        },
      },
    },
    []
  );
  return (
    <div ref={sliderRef} className="keen-slider h-80 sm:h-72 md:h-64">
      {products.map((product, n) => (
        <div
          key={product.id}
          className={`keen-slider__slide number-slide${n + 1} p-2`}
        >
          <Link href={"/product/" + product.key} aria-label={product.name}>
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
      <Link
        href={"/products"}
        className={`keen-slider__slide number-slide${products.length + 1} p-2`}
      >
        <div className="flex aspect-square w-full items-center bg-gray-300/80 p-6 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">
          <h3 className="text-3xl font-thin leading-relaxed">
            View More <br /> Products
            <ArrowRightIcon className="inline h-8 w-8" />
          </h3>
        </div>
      </Link>
    </div>
  );
};

export default LatestProducts;
