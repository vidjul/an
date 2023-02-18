import { getPostBySlug, postFilePaths } from "../../utils/mdx";

import { MDXRemote } from "next-mdx-remote";

import Layout from "../../components/layout";

export default function PostPage({ source, seo }) {
  return (
    <Layout seo={seo}>
      <main className="prose mx-auto prose-headings:font-display lg:prose-xl">
        <h1>{seo.title}</h1>
        <MDXRemote {...source} />
      </main>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const { mdxSource, data } = await getPostBySlug(params.slug);
  return {
    props: {
      source: mdxSource,
      seo: { title: data.title, description: data.description },
    },
  };
}

export async function getStaticPaths() {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
}
