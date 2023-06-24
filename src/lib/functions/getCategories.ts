import { env } from "@/env/client.mjs";
import type { Category, ListServerPayload } from "@/lib/types";

type Props = { perPage: number; page: number } | undefined;

export default async function getCategories(props: Props = undefined) {
  const params = new URLSearchParams();
  params.set("sort", "-created");
  params.set("filter", "(published=true)");
  params.set("page", `${props?.page ?? 1}`);
  params.set("perPage", `${props?.perPage ?? 99}`);

  const res = await fetch(
    `${
      env.NEXT_PUBLIC_SERVER_URL
    }/api/collections/categories/records?${params.toString()}`,
    { next: { revalidate: 86400 } }
  );
  if (!res.ok) {
    throw new Error("Could not fetch categories.");
  }
  const data = (await res.json()) as ListServerPayload<Category>;
  return data.items;
}
