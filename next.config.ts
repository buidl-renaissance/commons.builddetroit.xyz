import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Ignore LICENSE and other documentation files that cause parsing issues
    config.module.rules.push({
      test: /\/(LICENSE|README|CHANGELOG)(\.[^/]*)?$/i,
      type: 'asset/resource',
      generator: {
        emit: false,
      },
    });
    
    return config;
  },
};

export default nextConfig;
