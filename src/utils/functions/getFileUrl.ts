import { env as clientEnv } from "@/env/client.mjs";

const serverUrl = clientEnv.NEXT_PUBLIC_SERVER_URL;

export default function getFileUrl(
  collectionId: string,
  recordId: string,
  filename: string
) {
  return `${serverUrl}/api/files/${collectionId}/${recordId}/${filename}`;
}
