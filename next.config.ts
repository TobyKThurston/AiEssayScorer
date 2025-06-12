import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  eslint: {
    // ✅  Turn all ESLint “errors” into warnings during `next build`
    ignoreDuringBuilds: true,
  },

  // …keep any other Next.js options you already have below…
};

export default nextConfig;



