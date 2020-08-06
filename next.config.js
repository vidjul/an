const withPlugins = require("next-compose-plugins");
const withMdxEnhanced = require("next-mdx-enhanced");
const mdxPrism = require("mdx-prism");
const readingTime = require("reading-time");

const mdx = withMdxEnhanced({
  defaultLayout: true,
  fileExtensions: ["mdx", "md"],
  rehypePlugins: [mdxPrism],
  extendFrontMatter: {
    process: (mdxContent) => ({
      readingTime: readingTime(mdxContent),
    }),
  },
});

const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx", "md"],
};

module.exports = withPlugins([mdx], nextConfig);
