import { getBrands, getFileUrl } from "@/lib/functions";
import type { Brand } from "@/lib/types";
import Link from "next/link";

export const metadata = {
  title: "Brands",
  description:
    "Explore the latest gadget brands at Gadget Era. Find high-quality and budget-friendly products from trusted brands. Satisfaction guaranteed or your money back.",
  openGraph: {
    images: [{ url: "/api/og?text=Brands" }],
    description:
      "Explore the latest gadget brands at Gadget Era. Find high-quality and budget-friendly products from trusted brands. Satisfaction guaranteed or your money back.",
  },
};

export const revalidate = 86400;

const Brands = async () => {
  const brands = await getBrands();

  return (
    <>
      <main className="container mx-auto mt-6 p-2 xl:max-w-screen-xl min-h-screen">
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
      className="grid place-items-center overflow-hidden p-2 transition hover:bg-neutral-100 hover:shadow dark:bg-neutral-500 dark:hover:bg-neutral-600"
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
