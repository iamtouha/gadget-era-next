import pb from "@/utils/pb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(400).send({ message: "Method not allowed." });

  if (!req.body) {
    return res.status(400).send({ message: "Invalid request" });
  }

  try {
    console.log(req.body);
    const data = await pb.collection("users").requestPasswordReset(req.body);
    return res.send({ success: data });
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
}
