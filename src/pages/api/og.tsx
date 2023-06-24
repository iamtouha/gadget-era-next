import { ImageResponse } from "next/server";
import type { NextApiRequest } from "next";

export const config = {
  runtime: "edge",
};

export default function og(req: NextApiRequest) {
  const { searchParams } = new URL(req.url ?? "");
  const text = searchParams.get("text") ?? "Gadget Era";

  return new ImageResponse(
    (
      <div tw="flex flex-col h-full w-full items-center text-white justify-center p-2 bg-neutral-900">
        <div tw="h-[100px]"></div>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 100%)",
          }}
          tw="flex p-1.5 mb-16"
        >
          <div tw="flex flex-col bg-neutral-900 text-white py-2">
            <h1 tw="text-7xl text-center mx-6">{text}</h1>
          </div>
        </div>
        <div tw="flex justify-center items-center">
          <svg
            width="64"
            height="64"
            x="0px"
            y="0px"
            viewBox="0 0 554 554"
            xmlSpace="preserve"
          >
            <path
              d="M336.1 228.5v95.1h88S398.9 453.7 266 435.2c0 0-155.1-14.8-147.7-169.8 0 0 0-136.6 147.7-151.4 0 0 51.7 0 62.8 11.1V21.8S146-42.8 27.9 186.1c0 0-66.5 169.8 81.2 295.4 0 0 136.6 114.5 306.4 22.2 0 0 125.5-77.5 125.5-195.7v-78.5l-204.9-1z"
              fill="#fe4a21"
            />
            <circle cx={284.2} cy={276.6} r={77.8} fill="#fff" />
          </svg>
          <h2 tw="text-4xl ml-2">Gadget Era</h2>
        </div>
      </div>
    )
  );
}
