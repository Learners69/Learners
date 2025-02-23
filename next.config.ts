/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/Learners',
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
