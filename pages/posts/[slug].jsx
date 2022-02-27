import {
  getPostBySlug,
  postFilePaths,
} from '../../utils/mdx';

import { MDXRemote } from 'next-mdx-remote'

export default function PostPage({ source }) {
  return (
    <div className="wrapper">
      <MDXRemote {...source} />
    </div>
  )
}

export async function getStaticProps({ params }) {
  const { mdxSource } = await getPostBySlug(params.slug);
  return { props: { source: mdxSource } }
}

export async function getStaticPaths() {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  }
}
