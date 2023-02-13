import upazilas from "@/assets/upazilas.json";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return res.send(
    upazilas
      .filter((up) => up.district_id === req.query.id)
      .sort((a, b) => (a.name > b.name ? 1 : -1))
  );
}
