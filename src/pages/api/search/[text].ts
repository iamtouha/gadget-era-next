import { env } from "@/env/server.mjs";
import type { ListServerPayload, Product } from "@/utils/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const text = req.query.text as string | undefined;
  if (!text) {
    return res.status(400).send({ message: "Search query not provided." });
  }
  const searchParams = new URLSearchParams({
    filter: `(published=true && name~'${text}')`,
    perPage: "5",
    sort: "-created",
  });
  const response = await fetch(
    env.NEXT_PUBLIC_SERVER_URL +
      `/api/collections/products/records?${searchParams.toString()}`
  );
  const data = await response.json();

  if (response.ok) {
    const items = data.items as Product[];
    return res.send(
      items
        .filter((item) => item.published)
        .map((item) => ({
          ...item,
          overview: undefined,
          description: undefined,
        }))
    );
  }
  return res.status(response.status).send({ message: data.message });
}
