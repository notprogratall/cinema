import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.openmoviedb.com',
        port: '',
        pathname: '/kinopoisk-images/**',
      },
      {
        protocol: 'https',
        hostname: 'placebear.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
