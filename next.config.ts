import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "parcabul.com.tr",
      }
    ]   
  }
};

export default nextConfig;
