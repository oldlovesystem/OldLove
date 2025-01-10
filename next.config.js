/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**'
      }
    ]
  },
  async rewrites() {
    return [
        {
            source: '/api/delhivery',
            destination: 'https://api.delhivery.com/endpoint',
        },
    ];
},
};
