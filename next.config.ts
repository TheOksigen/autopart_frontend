import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "b2b.parcabul.com.tr",
      }
    ]   
  }
};

export default nextConfig;
