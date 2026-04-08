import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/upload", destination: "/", permanent: true },
      { source: "/view-essay", destination: "/ivy-league-essay-examples", permanent: true },
      { source: "/account", destination: "/editor", permanent: true },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Enable static page generation for better SEO
  output: "standalone",
};

export default nextConfig;
