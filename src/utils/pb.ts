import { env } from "@/env/server.mjs";

import PocketBase from "pocketbase";
const pb = new PocketBase(env.SERVER_URL);

export default pb;
