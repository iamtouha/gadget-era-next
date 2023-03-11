import React from "react";
import type { Metadata } from "next";
import { getCategory, getFileUrl } from "@/utils/functions";
import ProductCard from "@/components/ProductCard";
import EmptyProductsList from "@/components/EmptyList";
import Pagination from "@/components/Pagination";
import Image from "next/image";

type Props = {
  params?: { key: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export const revalidate = 3600;

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const category = await getCategory({
    key: params?.key ?? "",
    page: searchParams?.page ? +searchParams?.page : 1,
  });
  return {
    title: category.name,
    description: category.overview,
    openGraph: {
      images: [{ url: getFileUrl("products", category.id, category.cover) }],
      description: category.overview,
    },
  };
}

const Category = async ({ params, searchParams }: Props) => {
  const key = params?.key ?? "";
  const page = searchParams?.page ? +searchParams?.page : 1;

  const category = await getCategory({ key, page });

  return (
    <main className="container mx-auto mt-6 p-2 xl:max-w-screen-xl">
      <div className="relative mb-8 h-56 lg:h-72">
        <Image
          src={getFileUrl("categories", category.id, category.cover)}
          alt={category.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 px-6 py-4 text-white">
          <h1 className=" mb-4 inline-block bg-neutral-600 px-4 py-2 text-2xl font-medium lg:text-4xl">
            {category.name}
          </h1>
        </div>
      </div>
      {category.totalItems > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {category.items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyProductsList caption="No product found." />
      )}
      <Pagination
        currentPage={page}
        totalPages={category.totalPages}
        path={"/categories/" + key}
      />
    </main>
  );
};

export default Category;
