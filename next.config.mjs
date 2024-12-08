/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bxcdsonp07wmgyuz.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
