import { format, parseISO } from "date-fns";
import { getSinglePost } from "lib/posts";
import Head from "next/head";
import Image from "next/image";
import { notFound } from "next/navigation";
import * as prodRuntime from "react/jsx-runtime";
import rehypeParse from "rehype-parse";
import rehypeReact, { Options } from "rehype-react";
import { unified } from "unified";

const { Fragment, jsx, jsxs } = prodRuntime;

const options: Options = {
  Fragment: Fragment,
  jsx: jsx,
  jsxs: jsxs,
  components: {
    img: (props) => {
      const { src, alt, height, width } = props;

      if (src) {
        return (
          <Image
            src={src}
            alt={alt ? alt : ""}
            height={Number(height)}
            width={Number(width)}
          />
        );
      }
    },
  },
};

const postProcessor = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeReact, options);

export async function generateMetadata({ params }) {
  let title = "...";

  const post = await getSinglePost(params.slug);

  if (post?.title) {
    title = post.title;
  }

  return {
    title,
  };
}

const PostPage = async ({ params }) => {
  const post = await getSinglePost(params.slug);

  if (!post?.content) {
    notFound();
  }

  const content = postProcessor.processSync(post.content).result;

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <div>
        <h1>{post.title}</h1>
        {post.date && (
          <time className="flex justify-center" dateTime={post.date}>
            {format(parseISO(post.date), "LLLL d, yyyy")}
          </time>
        )}
        {content}
      </div>
    </>
  );
};

export default PostPage;
