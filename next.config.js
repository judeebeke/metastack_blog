/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'media.graphassets.com',
          port: '',
          pathname: '/**', 
        },
      ],
    },
    future: { webpack5: true }
}

module.exports = nextConfig
