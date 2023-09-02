/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  basePath: "/an",
};

const { withContentlayer } = require("next-contentlayer");

module.exports = withContentlayer(nextConfig);
