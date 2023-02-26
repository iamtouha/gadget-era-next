import { getCategory } from "@/utils/functions";
import React from "react";

type Props = {
  params?: { key: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const Category = async ({ params }: Props) => {
  const category = await getCategory(params?.key ?? "");
  return (
    <main className="container mx-auto mt-6 p-2 xl:max-w-screen-xl">
      <h1 className="mb-8 text-2xl lg:text-3xl">{category.name}</h1>
    </main>
  );
};

export default Category;
