/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  basePath: "/an",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.ghost.org",
      },
    ],
  },
};

module.exports = nextConfig;
