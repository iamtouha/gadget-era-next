import Image from "next/image";
import parse from "html-react-parser";
import { getFileUrl } from "@/utils/functions";
import getProduct from "@/utils/functions/getProduct";
import { currency } from "@/utils/formatter";
import styles from "@/styles/product.module.css";
import ProductActions from "@/components/ProductActions";
import type { Metadata } from "next";

type Props = { params: { key: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name, images, id, overview } = await getProduct(params.key);
  return {
    title: name,
    description: overview,
    openGraph: {
      images: [{ url: getFileUrl("products", id, images[0] ?? "") }],
    },
  };
}

const Product = async ({ params }: Props) => {
  const product = await getProduct(params.key);

  return (
    <main>
      <div className="bg-gray-200 p-2 dark:bg-gray-800 md:mt-6 md:px-10">
        <div className="container mx-auto p-2 xl:max-w-screen-xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="w-full">
              <div className={styles.slider}>
                <div className={`${styles.slides}`}>
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
                    href={"#slide-" + i}
                  >
                    <Image
                      src={getFileUrl("products", product.id, img)}
                      width={64}
                      height={64}
                      className="leading-none"
                      alt="thumb"
                    />
                  </a>
                ))}
              </div>
            </div>
            <div className="w-full pt-4 md:pt-0">
              <h2 className="mb-5 text-2xl font-medium md:text-3xl">
                {product.name}
              </h2>
              <p className="mb-5 text-sm text-gray-700 dark:text-gray-100">
                {product.overview}
              </p>
              <div className="mb-5">
                <span className="text-gray-600 dark:text-gray-100">Price:</span>

                <span className="ml-2 font-medium text-gray-700 dark:text-gray-100">
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
              <ProductActions product={product} />
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

