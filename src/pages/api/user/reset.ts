import pb from "@/lib/pb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(400).send({ message: "Method not allowed." });

  if (!req.body || typeof req.body !== "string") {
    return res.status(400).send({ message: "Invalid request" });
  }

  try {
    const data = await pb.collection("users").requestPasswordReset(req.body);
    return res.send({ success: data });
  } catch (error) {
    return res
      .status(400)
      .send({ message: (error as Record<string, unknown>).message });
  }
}
