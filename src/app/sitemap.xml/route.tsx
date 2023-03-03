import pb from "@/utils/pb";

export async function GET() {
  return await pb.collection("products");
}
