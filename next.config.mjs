/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '64.media.tumblr.com' },
      { protocol: 'https', hostname: '**' }
    ]
  }
};

export default nextConfig;
