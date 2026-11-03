import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      // Blog covers carry a ?v=<s3-key> cache-busting version.
      { pathname: "/api/blogs/**" },
      // Every other local image, without query strings (Next's default).
      { pathname: "/**", search: "" },
    ],
  },
};

export default nextConfig;
