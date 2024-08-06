/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_API_URL?.split("//")[1],
      },
    ],
  },
};

export default nextConfig;
