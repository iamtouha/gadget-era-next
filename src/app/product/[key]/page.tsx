import Link from "next/link";
import Image from "next/image";
import parse from "html-react-parser";
import type { Metadata } from "next";
import { getFileUrl } from "@/utils/functions";
import { getProduct, getVariants } from "@/utils/functions";
import { currency } from "@/utils/formatter";
import ProductActions from "@/components/ProductActions";
import styles from "@/styles/product.module.css";
import { notFound } from "next/navigation";

type Props = { params: { key: string } };

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.key);

  if (!product) {
    return {};
  }

  return {
    title: product.name,
    description: product.overview,
    openGraph: {
      images: [{ url: getFileUrl("products", product.id, product.images[0]) }],
      description: product.overview,
    },
  };
}

const Product = async ({ params }: Props) => {
  const product = await getProduct(params.key);

  if (!product) {
    notFound();
  }

  const variants = await getVariants(product.model);

  return (
    <main>
      <div className="bg-neutral-200 p-2 dark:bg-neutral-800 md:mt-6 md:px-10">
        <div className="container mx-auto p-2 xl:max-w-screen-xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="w-full">
              <div className={styles.slider}>
                <div className={`${styles.slides ?? ""}`}>
                  {product.images.map((img, i) => (
                    <span key={img}>
                      <div
                        aria-hidden
                        id={`slide-${i}`}
                        className="-mt-16 block h-16 w-full"
                      ></div>
                      <div className={styles.imgWrapper}>
                        <Image
                          src={getFileUrl("products", product.id, img)}
                          fill
                          alt={img}
                          className="object-contain"
                          priority={i === 0}
                          unoptimized
                        />
                      </div>
                    </span>
                  ))}
                </div>
              </div>
              <div className="my-2 flex justify-center gap-2">
                {product.images.map((img, i) => (
                  <a
                    key={img}
                    className="relative block h-16 w-16 focus:outline"
                    href={`#slide-${i}`}
                  >
                    <Image
                      src={getFileUrl("products", product.id, img)}
                      width={64}
                      height={64}
                      className="leading-none"
                      alt="thumb"
                      unoptimized
                    />
                  </a>
                ))}
              </div>
            </div>
            <div className="w-full pt-4 md:pt-0">
              <h2 className="mb-5 text-2xl font-medium md:text-3xl">
                {product.name}
              </h2>
              <div className="mb-5">
                <span className="text-lg text-neutral-600 dark:text-neutral-100">
                  Price:
                </span>

                <span className="ml-2 text-lg font-medium text-neutral-900 dark:text-neutral-100">
                  {product.discounted_price ? (
                    <>
                      {currency.format(product.discounted_price)}
                      {"  "}
                      <s className="text-sm">
                        {currency.format(product.price)}
                      </s>
                    </>
                  ) : (
                    currency.format(product.price)
                  )}
                </span>
              </div>
              <div className="mb-1">
                <span className="text-neutral-600 dark:text-neutral-100">
                  Model:
                </span>

                <span className="ml-2 font-medium text-neutral-700 dark:text-neutral-100">
                  {product.model}
                </span>
              </div>
              <div className="mb-8">
                <span className="text-neutral-600 dark:text-neutral-100">
                  Availability:
                </span>

                <span className="ml-2 font-medium text-neutral-700 dark:text-neutral-100">
                  {product.in_stock ? "in stock" : "out of stock"}
                </span>
              </div>

              <ProductActions product={product} />
              {variants.length > 1 ? (
                <nav aria-label="product variants">
                  Similar products:
                  <div className="mt-2 flex flex-wrap gap-4">
                    {variants
                      .filter((item) => item.id !== product.id)
                      .map((item) => (
                        <Link
                          href={"/product/" + item.key}
                          key={item.id}
                          className="relative block h-24 w-24 focus:outline"
                        >
                          <Image
                            src={getFileUrl(
                              "products",
                              item.id,
                              item.images[0] ?? ""
                            )}
                            title={item.name}
                            alt={item.name}
                            width={96}
                            height={96}
                            className="leading-none"
                          />
                        </Link>
                      ))}
                  </div>
                </nav>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-6 p-2 lg:max-w-screen-lg">
        <h2 className="mb-4 text-2xl">Product Description</h2>
        <article
          className={`${styles.description} prose prose-slate dark:prose-invert md:prose-lg`}
        >
          {parse(product.description)}
        </article>
      </div>
    </main>
  );
};

export default Product;
