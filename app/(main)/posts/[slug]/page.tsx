import { allPosts } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import { useMDXComponent } from "next-contentlayer/hooks";
import Head from "next/head";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

  return { title: post?.title };
}

const PostLayout = ({ params }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

  if (!post) {
    notFound();
  }

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <h1>{post.title}</h1>
      <time className="flex justify-center" dateTime={post.date}>
        {format(parseISO(post.date), "LLLL d, yyyy")}
      </time>
      <MDXContent />
    </>
  );
};

export default PostLayout;
