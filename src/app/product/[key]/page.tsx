import Image from "next/image";
import parse from "html-react-parser";
import { getFileUrl } from "@/utils/functions";
import getProduct from "@/utils/functions/getProduct";
import { currency } from "@/utils/formatter";
import styles from "@/styles/product.module.css";

const Product = async ({ params }: { params: { key: string } }) => {
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
              <h2 className="mb-5 text-3xl font-medium">{product.name}</h2>
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
              <div className="flex items-stretch gap-2">
                <input type={"number"} className="w-24" />
                <button className="bg-primary-500 py-2 px-4 text-white hover:bg-primary-600">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-6 p-2 lg:max-w-screen-lg">
        <h2 className="mb-4 text-2xl">Product Description</h2>
        <article
          className={`${styles.description} text-gray-800 dark:text-gray-200`}
        >
          {parse(product.description)}
        </article>
      </div>
    </main>
  );
};

export default Product;
