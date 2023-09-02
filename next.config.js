const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  basePath: "/an",
  experimental: {
    appDir: true,
  },
};

const { withContentlayer } = require("next-contentlayer");

module.exports = withContentlayer(nextConfig);
