/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  async headers() {
    return [
      {
        source: '/:all*',
        headers: [
          {
            key: 'content-security-policy',
            value:
              '' +
              "default-src 'self' data: ;" +
              " style-src 'self' 'unsafe-inline' fonts.googleapis.com;" +
              " base-uri 'none';" +
              " form-action 'self';" +
              " script-src 'self' 'unsafe-eval' 'unsafe-inline';" +
              " font-src 'self' fonts.gstatic.com;" +
              " manifest-src 'self';" +
              " img-src 'self' blob: " +
              ' https://openlayers.org' +
              ' https://tile.openstreetmap.org' +
              ' http://a.tile.openstreetmap.org' +
              ' http://b.tile.openstreetmap.org' +
              ' https://strapi.monboreseau.be' +
              ' data:' +
              ' https://ik.imagekit.io' +
              ' http://c.tile.openstreetmap.org;' +
              " connect-src 'self';",
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/fr/',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
