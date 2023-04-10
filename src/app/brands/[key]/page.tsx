import React from "react";
import type { Metadata } from "next";
import { getBrand, getFileUrl } from "@/utils/functions";
import ProductCard from "@/components/ProductCard";
import EmptyProductsList from "@/components/EmptyList";
import Pagination from "@/components/Pagination";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  params?: { key: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export const revalidate = 86400;

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const brand = await getBrand({
    key: params?.key ?? "",
    page: searchParams?.page ? +searchParams?.page : 1,
  });

  if (!brand) {
    return {};
  }

  return {
    title: brand.name,
    description: brand.overview,
    openGraph: {
      images: [{ url: getFileUrl("products", brand.id, brand.logo) }],
      description: brand.overview,
    },
  };
}

const Brand = async ({ params, searchParams }: Props) => {
  const key = params?.key ?? "";
  const page = searchParams?.page ? +searchParams?.page : 1;

  const brand = await getBrand({ key, page });

  if (!brand) {
    notFound();
  }

  return (
    <main className="container mx-auto mt-6 p-2 xl:max-w-screen-xl min-h-screen">
      <div className="mb-8 flex flex-col items-center gap-4 md:flex-row md:items-end">
        <div className="bg-neutral-100 p-2 dark:bg-neutral-600">
          <Image
            src={getFileUrl("brands", brand.id, brand.logo ?? "")}
            alt={brand.name}
            width={120}
            height={120}
            className="aspect-square object-contain"
          />
        </div>

        <div className="text-center md:flex-1 md:text-left">
          <h1 className="mb-2 text-2xl lg:text-3xl">{brand.name}</h1>
          <p className="text-neutral-700 line-clamp-5 dark:text-neutral-300 md:line-clamp-3">
            {brand.overview}
          </p>
        </div>
      </div>

      {brand.totalItems > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {brand.items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyProductsList caption="No product found." />
      )}
      <Pagination
        currentPage={page}
        totalPages={brand.totalPages}
        path={"/brands/" + key}
      />
    </main>
  );
};

export default Brand;
