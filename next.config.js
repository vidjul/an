const withPlugins = require("next-compose-plugins");
const withMdxEnhanced = require("next-mdx-enhanced");
const mdxPrism = require("mdx-prism");
const readingTime = require("reading-time");
const emoji = require("remark-emoji");
const { rehypeAccessibleEmojis } = require("rehype-accessible-emojis");

const mdx = withMdxEnhanced({
  defaultLayout: true,
  fileExtensions: ["mdx", "md"],
  remarkPlugins: [emoji],
  rehypePlugins: [mdxPrism, rehypeAccessibleEmojis],
  extendFrontMatter: {
    process: (mdxContent) => ({
      readingTime: readingTime(mdxContent),
    }),
  },
});

const basePath = "/an";

const nextConfig = {
  target: "serverless",
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx", "md"],
  basePath,
};

module.exports = withPlugins([mdx], nextConfig);
