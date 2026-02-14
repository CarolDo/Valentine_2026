/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    formats: ['image/webp'],
  },
  webpack(config) {
    config.resolve.alias['@'] = require('path').resolve(__dirname, 'src');
    return config;
  },
}

module.exports = nextConfig;
