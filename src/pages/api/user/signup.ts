import pb from "@/utils/pb";
import { signupFormSchema, type SignupFormInput } from "@/utils/schema";
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

  const body = JSON.parse(req.body) as SignupFormInput;

  if (!signupFormSchema.safeParse(body).success) {
    return res.status(400).send({ message: "Invalid request" });
  }

  try {
    await pb.collection("users").create(body);
    const { token, record } = await pb
      .collection("users")
      .authWithPassword(body.email, body.password);

    setCookie("token", token, { req, res });

    return res.send({ success: true, user: record });
  } catch (error: any) {
    const errorData = (error as ClientResponseError).data;
    if (!errorData) {
      res.status(400).send({ message: error.message });
    }
    const { data } = errorData;
    if (
      data.email?.code === "validation_invalid_email" ||
      data.email?.code === "validation_invalid_username"
    )
      return res
        .status(400)
        .send({ message: "username/password is invalid or already in use." });
  }
}
