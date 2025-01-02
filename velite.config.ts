import { defineCollection, defineConfig, s } from "velite";

const posts = defineCollection({
  name: "Post", // collection type name
  pattern: "posts/**/*.md", // content files glob pattern
  schema: s.object({
    title: s.string().max(99), // Zod primitive type
    slug: s.path(),
    date: s.isodate(), // input Date-like string, output ISO Date string.
    excerpt: s.string().max(200), // Zod primitive type
    metadata: s.metadata(), // extract markdown reading-time, word-count, etc.
    content: s.markdown(), // transform markdown to html
  }),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: {
    posts,
  },
});
