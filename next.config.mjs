import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "uploadthing.com",
        pathname: '/**',
      },
      {
        hostname: "utfs.io",
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
