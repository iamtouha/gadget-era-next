import { env } from "@/env/server.mjs";
import { getCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(400).send("Method Not Allowed.");
  }
  const token = getCookie("token", { req, res });

  if (!token) {
    return res.status(402).send("Forbidden.");
  }

  const response = await fetch(
    env.NEXT_PUBLIC_SERVER_URL +
      "/api/collections/orders/records?sort=-created",
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!response.ok) {
    return res.status(400).send({ message: "Could not fetch orders." });
  }
  const data = await response.json();
  return res.send(data.items);
}
