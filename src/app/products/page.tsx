import { env } from "@/env/server.mjs";
import type { ListServerPayload, Product } from "@/types";
import ProductCard from "@/components/ProductCard";

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

const Products = async (props: Props) => {
  const productsList = await getProductsList(props.searchParams ?? {});

  return (
    <>
      {productsList.totalItems === 0 ? (
        <div className="py- px-2">No product found.</div>
      ) : null}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-5">
        {productsList.items.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            imgHost={env.SERVER_URL}
          />
        ))}{" "}
      </div>
    </>
  );
};

export default Products;

const getProductsList = async (params: Props["searchParams"]) => {
  const res = await fetch(
    env.SERVER_URL +
      `/api/collections/products/records?` +
      buildSearchParams(params)
  );
  if (!res.ok) {
    console.log(await res.json());
    throw new Error("Could not fetch products.");
  }
  return (await res.json()) as ListServerPayload<Product>;
};

const buildSearchParams = (params: Props["searchParams"]) => {
  if (!params) return null;

  const { brand, category, sort, stock, page, discount } = params;

  let filter = "published=true";
  if (brand) filter += ` && brand='${brand}'`;
  if (category) filter += ` && category='${category}'`;
  if (stock) filter += ` && in_stock=true`;
  if (discount) filter += ` && discounted_price>0`;

  let order = "";
  const [sortField, sortType] = (sort as string)?.split(":") ?? [];
  if (sortField && sortType)
    order = (sortType === "desc" ? "-" : "") + sortField;

  const urlParams = new URLSearchParams({
    page: (page as string | undefined) ?? "1",
    perPage: "20",
    filter: `(${filter})`,
    sort: order ? order : "-created",
  });
  return urlParams.toString();
};
