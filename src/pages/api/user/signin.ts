import pb from "@/utils/pb";
import { signinFormSchema, type SigninFormInput } from "@/utils/schema";
import { setCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";
import type { ClientResponseError } from "pocketbase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(400).send({ message: "Method not allowed." });

  if (!req.body) {
    return res.status(400).send({ message: "Invalid request" });
  }

  const body = JSON.parse(req.body) as SigninFormInput;

  if (!signinFormSchema.safeParse(body).success) {
    return res.status(400).send({ message: "Invalid request" });
  }

  try {
    const { token, record } = await pb
      .collection("users")
      .authWithPassword(body.ideintifier, body.password);

    setCookie("token", token, { req, res, maxAge: 7 * 24 * 60 * 60 });

    return res.send({ success: true, user: record });
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
}
