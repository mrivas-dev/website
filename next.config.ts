import type { NextConfig } from 'next';
import path from 'node:path';

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactCompiler: true,
};

export default nextConfig;
