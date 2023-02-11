import { env } from "@/env/server.mjs";
import type { Product } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(env.SERVER_URL + "/products/records");
  if (response.ok) {
    const data = await response.json();
    res.status(200).json({
      ...data,
      items: data.items.map((item: Product) => ({
        ...item,
        description: undefined,
      })),
    });
  }
}
