/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/wings-cms",
  assetPrefix: "/wings-cms/",
  images: {
    domains: [
      "wings-cms.storage.iran.liara.space",
      "images.wallpapersden.com",
      "www.canon.com.au",
      "webwinkel.groenlinks.nl",
    ],
  },
  remotePatterns: [
    {
      protocol: "https",
      hostname: "wings-cms.storage.iran.liara.space",
      port: "3000",
      pathname: "/**",
    },
  ],
};

module.exports = nextConfig;
