import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@sparticuz/chromium"],
  experimental: {
    outputFileTracingIncludes: {
      '/api/export': ['node_modules/@sparticuz/chromium/bin/*'],
    },
  },
};

export default nextConfig;
