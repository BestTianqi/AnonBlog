import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/AnonBlog",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
