import { getCategories, getFileUrl } from "@/lib/functions";
import type { Category } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Categories",
  description:
    "Find the latest and greatest in electronics at Gadget Era. Our wide range of categories includes wristwatches, headphones, speakers, smartwatches and more. With our high-quality products and unbeatable prices, you'll find everything you need to stay on top of the latest trends and technology. Shop now and experience the future of gadgets.",
  openGraph: {
    description:
      "Find the latest and greatest in electronics at Gadget Era. Our wide range of categories includes wristwatches, headphones, speakers, smartwatches and more. With our high-quality products and unbeatable prices, you'll find everything you need to stay on top of the latest trends and technology. Shop now and experience the future of gadgets.",
    images: [{ url: "/api/og?text=Categories" }],
  },
};
export const revalidate = 86400;

const Categories = async () => {
  const categories = await getCategories();

  return (
    <>
      <main className="container mx-auto mt-6 p-2 xl:max-w-screen-xl min-h-screen">
        <h1 className="mb-8 text-2xl lg:text-3xl">Categories</h1>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {categories.map((category) => (
            <Card key={category.id} category={category}></Card>
          ))}
        </div>
      </main>
    </>
  );
};

export default Categories;

function Card({ category }: { category: Category }) {
  return (
    <Link
      href={"/categories/" + category.key}
      className="overflow-hidden border shadow transition hover:shadow-lg dark:border-neutral-600 dark:shadow-none dark:hover:bg-neutral-800/80"
    >
      <Image
        src={getFileUrl("categories", category.id, category.cover)}
        alt={category.name}
        height={224}
        width={400}
        className="h-56 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-2xl font-medium">{category.name}</h3>
      </div>
    </Link>
  );
}
