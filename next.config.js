const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  basePath: "/an",
  experimental: {
    appDir: true,
    mdxRs: true,
  }
};

const withMDX = require('@next/mdx')()

module.exports = withMDX(nextConfig);
