import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  devSwSrc: './src/lib/dev-sw.ts',
  experimental: {
    // This is needed to support cross-origin requests in development.
    // The dev server is on a different port than the app preview.
    allowedDevOrigins: [
        'http://localhost:6000',
        'https://*.cloudworkstations.dev',
        'https://*.firebase.studio'
    ],
  },
};

export default nextConfig;
