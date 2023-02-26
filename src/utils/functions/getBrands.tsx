import { env } from "@/env/client.mjs";
import type { Brand, ListServerPayload } from "@/utils/types";

type Props = { perPage: number; page: number } | undefined;

export default async function getBrands(props: Props = undefined) {
  const params = new URLSearchParams();
  params.set("sort", "-created");
  params.set("filter", "(published=true)");
  params.set("page", `${props?.page ?? 1}`);
  params.set("perPage", `${props?.perPage ?? 99}`);

  const res = await fetch(
    `${
      env.NEXT_PUBLIC_SERVER_URL
    }/api/collections/brands/records?${params.toString()}`
  );
  if (!res.ok) {
    throw new Error("Could not fetch brands.");
  }
  const data = (await res.json()) as ListServerPayload<Brand>;
  return data.items;
}
