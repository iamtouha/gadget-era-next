import Image from "next/image";
import Link from "next/link";
import { getFileUrl, getPageData } from "@/utils/functions";
import HeroImg from "../../public/home-cover.jpg";
import LatestProducts from "@/components/LatestProducts";
import "keen-slider/keen-slider.min.css";
import PopularProducts from "@/components/PopularProducts";

export const revalidate = 3600;

const Homepage = async () => {
  const {
    popular_categories,
    popular_products,
    latest_products,
    featured_products,
  } = await getPageData();

  return (
    <main className="container mx-auto xl:max-w-screen-xl">
      <section aria-label="hero section" className="relative mt-8">
        <Image
          src={HeroImg}
          alt="Gadget Era Home"
          className="h-[340px] object-cover md:h-[440px] lg:h-[500px]"
        />
        <div className="absolute inset-0 flex flex-col items-start justify-center px-6 py-4">
          <div className="bg-gray-200/70 py-8 px-6 text-center shadow dark:bg-gray-600/70 dark:shadow-none sm:w-1/2 sm:text-left xl:w-[45%]">
            <h1 className="mb-4 text-2xl font-medium lg:text-4xl">
              <span
                className="leading-normal"
                style={{
                  backgroundImage: "linear-gradient(#f97316, #f97316)",
                  backgroundSize: "100% 3px",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "left bottom",
                }}
              >
                Find Your Gadget, <br /> Find Your Era
              </span>
            </h1>
            <p className="mb-8 text-sm text-gray-700 dark:text-gray-200">
              Classic, modern, or trendy design, we have something for everyone.
              Browse our collection and find your perfect match today.
            </p>
            <Link
              href={"/products"}
              className="bg-primary-500 px-4 py-2 text-lg font-medium transition-colors hover:bg-primary-600"
            >
              VIEW PPRODUCTS
            </Link>
          </div>
        </div>
      </section>
      <section className="mt-12 p-2" aria-label="Latest Products">
        <h1 className="mb-8 text-center text-2xl lg:text-4xl">
          Latest Products
        </h1>
        <LatestProducts products={latest_products} />
      </section>
      <section
        className="container mx-auto mt-12 p-2 lg:max-w-screen-lg"
        aria-label="Featured Products"
      >
        <h1 className="mb-8 text-center text-2xl lg:text-4xl">
          Featured Products
        </h1>
        <div className="grid gap-10 md:grid-cols-2">
          {featured_products.map((product) => (
            <Link key={product.id} href={"/product/" + product.key}>
              <div className="relative">
                <Image
                  src={getFileUrl(
                    "products",
                    product.id,
                    product.images[0] ?? ""
                  )}
                  alt={product.name}
                  width={512}
                  height={512}
                  className="mx-auto"
                />
                <h1 className="absolute bottom-3 left-3 bg-black/50 px-2 text-3xl font-semibold text-white">
                  {product.model}
                </h1>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="mt-12 p-2" aria-label="Popular Products">
        <h1 className="mb-8 text-center text-2xl lg:text-4xl">
          Popular Products
        </h1>
        <PopularProducts products={popular_products} />
      </section>
      <section className="my-12 p-2" aria-label="Featured Products">
        <h1 className="mb-8 text-center text-2xl lg:text-4xl">
          Popular Categories
        </h1>
        <div className="grid gap-10 md:grid-cols-2">
          {popular_categories.map((category) => (
            <Link key={category.id} href={"/categories/" + category.key}>
              <div className="relative">
                <Image
                  src={getFileUrl("categories", category.id, category.cover)}
                  alt={category.name}
                  width={512}
                  height={288}
                  className="aspect-video w-full object-cover"
                />
                <h1 className="absolute bottom-3 left-3 bg-black/50 px-2 text-3xl font-semibold text-white">
                  {category.name}
                </h1>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Homepage;
