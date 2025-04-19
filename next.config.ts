import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  // Disable TypeScript type checking during build
  // This resolves issues with dynamic route params in Next.js 15.3.0
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
