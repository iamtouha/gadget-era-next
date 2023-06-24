import Image from "next/image";
import Link from "next/link";
import { getFileUrl, getPageData } from "@/lib/functions";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import styles from "../styles/homepage.module.css";

export const revalidate = 86400;

const Homepage = async () => {
  const {
    popular_categories,
    popular_products,
    latest_products,
    featured_products,
  } = await getPageData();

  return (
    <main className="container mx-auto xl:max-w-screen-xl">
      <section aria-label="hero section" className={styles["hero-section"]}>
        <Image
          priority
          src="/home-cover.jpg"
          width={1280}
          height={500}
          alt="Gadget Era Home"
        />
        <div>
          <div className={styles["hero-text"]}>
            <h1>
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
            <p>
              Classic, modern, or trendy design, we have something for everyone.
              Browse our collection and find your perfect match today.
            </p>
            <Link href={"/products"}>VIEW PPRODUCTS</Link>
          </div>
        </div>
      </section>
      <section className="mt-12 p-2" aria-label="Latest Products">
        <h1 className={styles["section-title"]}>Latest Products</h1>
        <div className={styles.reel}>
          {latest_products.map((product) => (
            <Link
              key={product.id}
              href={"/product/" + product.key}
              aria-label={product.name}
              className={styles["shadow-effect"]}
            >
              <Image
                src={getFileUrl("products", product.id, product.images[0])}
                className="h-full w-full object-contain"
                alt={product.name}
                width={256}
                height={256}
              />
            </Link>
          ))}
          <Link className={styles["view-more-card"]} href={"/products"}>
            <h3 className="text-3xl font-thin leading-relaxed">
              View More <br /> Products
              <ArrowRightIcon className="inline h-8 w-8" />
            </h3>
          </Link>
        </div>
      </section>
      <section
        className="container mx-auto mt-12 p-2 lg:max-w-screen-lg"
        aria-label="Featured Products"
      >
        <h1 className={styles["section-title"]}>Featured Products</h1>
        <div className="grid gap-10 md:grid-cols-2">
          {featured_products.map((product) => (
            <Link
              key={product.id}
              href={"/product/" + product.key}
              className={`${styles["featured-product-card"]} ${styles["shadow-effect"]}`}
            >
              <Image
                src={getFileUrl(
                  "products",
                  product.id,
                  product.images.reverse()[0]
                )}
                alt={product.name}
                width={512}
                height={512}
                className="mx-auto"
                unoptimized
              />
              <button>view product</button>
            </Link>
          ))}
        </div>
      </section>
      <section className="mt-12 p-2" aria-label="Popular Products">
        <h1 className={styles["section-title"]}>Popular Products</h1>
        <div className={styles.reel}>
          {popular_products.map((product) => (
            <Link
              key={product.id}
              aria-label={product.name}
              href={"/product/" + product.key}
              className={styles["shadow-effect"]}
            >
              <Image
                src={getFileUrl("products", product.id, product.images[0])}
                className="h-full w-full object-contain"
                alt={product.name}
                width={256}
                height={256}
              />
            </Link>
          ))}
        </div>
      </section>
      <section className="my-12 p-2" aria-label="Featured Products">
        <h1 className={styles["section-title"]}>Popular Categories</h1>
        <div className="grid gap-10 md:grid-cols-2">
          {popular_categories.map((category) => (
            <Link
              key={category.id}
              className={`${styles["category-card"]} ${styles["shadow-effect"]}`}
              href={"/categories/" + category.key}
            >
              <Image
                src={getFileUrl("categories", category.id, category.cover)}
                alt={category.name}
                width={512}
                height={288}
                loading="lazy"
              />
              <h1>{category.name}</h1>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Homepage;
