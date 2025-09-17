import type { NextConfig } from "next";

const path = require('path');

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname, '..'),
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  env: {
    NEXT_SECRET: Math.random().toString(36).slice(2), //clave aleatoria en cada reinicio dev
  },
};

export default nextConfig;
