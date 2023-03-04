import districts from "@/assets/districts.json";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.send(districts.sort((a, b) => (a.name > b.name ? 1 : -1)));
}
