import { getCategories, getFileUrl } from "@/utils/functions";
import type { Category } from "@/utils/types";
import Link from "next/link";

const Categories = async () => {
  const categories = await getCategories();

  return (
    <>
      <main className="container mx-auto mt-6 p-2 xl:max-w-screen-xl">
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
      className="overflow-hidden border shadow transition-shadow hover:shadow-lg dark:border-gray-600 dark:bg-gray-800/80 dark:shadow-none"
    >
      <img
        src={getFileUrl("categories", category.id, category.cover)}
        alt={category.name}
        className="h-56 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-2xl font-medium">{category.name}</h3>
      </div>
    </Link>
  );
}
