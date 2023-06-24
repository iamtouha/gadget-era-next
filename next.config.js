/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gadget-era.fly.dev",
      },
    ],
  },
};

module.exports = nextConfig;
