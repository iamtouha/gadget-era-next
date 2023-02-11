import { env as clientEnv } from "@/env/client.mjs";
import { env as serverEnv } from "@/env/server.mjs";

const serverUrl = serverEnv?.SERVER_URL ?? clientEnv.NEXT_PUBLIC_SERVER_URL;

export default function getFileUrl(
  collectionId: string,
  recordId: string,
  filename: string
) {
  return `${serverUrl}/api/files/${collectionId}/${recordId}/${filename}`;
}
