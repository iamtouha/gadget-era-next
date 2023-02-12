import { env } from "@/env/server.mjs";

import PocketBase from "pocketbase";
const pb = new PocketBase(env.NEXT_PUBLIC_SERVER_URL);

export default pb;
