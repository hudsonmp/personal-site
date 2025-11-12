/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Only use basePath when building for GitHub Pages
  basePath: process.env.GITHUB_PAGES === 'true' ? '/personal-site' : '',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
