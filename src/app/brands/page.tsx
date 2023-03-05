import { getBrands, getFileUrl } from "@/utils/functions";
import type { Brand } from "@/utils/types";
import Link from "next/link";

export const metadata = {
  title: "Brands",
  description:
    "Explore the latest gadget brands at Gadget Era. Find high-quality and budget-friendly products from trusted brands. Satisfaction guaranteed or your money back.",
  openGraph: {
    images: [{ url: "/api/og?text=Brands" }],
  },
};

export const revalidate = 3600;

const Brands = async () => {
  const brands = await getBrands();

  return (
    <>
      <main className="container mx-auto mt-6 p-2 xl:max-w-screen-xl">
        <h1 className="mb-8 text-2xl lg:text-3xl">Brands</h1>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {brands.map((brand) => (
            <Card key={brand.id} brand={brand}></Card>
          ))}
        </div>
      </main>
    </>
  );
};

export default Brands;

function Card({ brand }: { brand: Brand }) {
  return (
    <Link
      href={"/brands/" + brand.key}
      className="grid place-items-center overflow-hidden p-2 transition hover:bg-gray-100 hover:shadow dark:bg-gray-500 dark:hover:bg-gray-600"
    >
      <div className="py-4">
        <img
          src={getFileUrl("brands", brand.id, brand.logo)}
          alt={brand.name}
          className="h-[100%] w-full object-contain"
        />
      </div>
    </Link>
  );
}
