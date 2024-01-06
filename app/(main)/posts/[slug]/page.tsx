import { format, parseISO } from "date-fns";
import { getSinglePost } from "lib/posts";
import Head from "next/head";
import { notFound } from "next/navigation";

const PostPage = async ({ params }) => {
  const post = await getSinglePost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <div>
        <h1>{post.title}</h1>
        {post.created_at && (
          <time className="flex justify-center" dateTime={post.created_at}>
            {format(parseISO(post.created_at), "LLLL d, yyyy")}
          </time>
        )}
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </>
  );
};

export default PostPage;
