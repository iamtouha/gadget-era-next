import { env } from "@/env/server.mjs";
import { getCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res.status(400).send({ message: "Method not allowed." });

  const token = getCookie("token", { req, res });

  if (!token || typeof token !== "string")
    return res.status(400).send({ message: "User not signed in." });

  const response = await fetch(
    env.NEXT_PUBLIC_SERVER_URL + "/api/collections/users/records",
    { headers: { Authorization: "Bearer " + token } }
  );
  const data = await response.json();

  if (!response.ok || !data.items?.[0]) {
    return res.status(400).send({ message: "Could not fetch user info." });
  }
  return res.send(data.items[0]);
}
