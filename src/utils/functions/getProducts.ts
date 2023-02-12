import { env } from "@/env/client.mjs";
import { ListServerPayload, Product } from "@/types";
type SearchParams = { [key: string]: string | string[] | undefined };

export default async function getProductsList(queryParams?: SearchParams) {
  const res = await fetch(
    env.NEXT_PUBLIC_SERVER_URL +
      `/api/collections/products/records?` +
      buildSearchParams(queryParams)
  );
  if (!res.ok) {
    console.log(await res.json());
    throw new Error("Could not fetch products.");
  }
  return (await res.json()) as ListServerPayload<Product>;
}

const buildSearchParams = (queryParams?: SearchParams) => {
  if (!queryParams) return null;

  const { brand, category, sort, stock, page, discount } = queryParams;

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
