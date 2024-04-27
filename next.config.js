/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: `${process.env.NEXT_PUBLIC_baseApiUrl}`, pathname: '**' },
      { protocol: 'http', hostname: 'localhost', pathname: '**' },
    ],
  },
}

module.exports = nextConfig;
