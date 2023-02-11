import { getFileUrl, getProduct } from "@/utils/functions";

const Product = async ({ params }: { params: { key: string } }) => {
  const { name, images, id, overview } = await getProduct(params.key);
  const title = name + "| Gadget Era";
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={overview}></meta>
      <meta
        name="og:image"
        content={getFileUrl("products", id, images[0] ?? "")}
      ></meta>
    </>
  );
};

export default Product;
