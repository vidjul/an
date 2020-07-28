const withPlugins = require("next-compose-plugins");
const withMdxEnhanced = require("next-mdx-enhanced");
const mdxPrism = require("mdx-prism");

const mdx = withMdxEnhanced({
  defaultLayout: true,
  fileExtensions: ["mdx", "md"],
  rehypePlugins: [mdxPrism],
});

const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx", "md"],
};

module.exports = withPlugins([mdx], nextConfig);
