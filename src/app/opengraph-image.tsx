import generateImage from "@/lib/functions/generateOg";

export const runtime = "edge";

export const alt = "Gadget Era";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return generateImage("Welcome to Gadget Era");
}
