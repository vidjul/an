import { Post } from ".velite";
import { compareDesc, format, parseISO } from "date-fns";
import { NextPage } from "next";
import Link from "next/link";

type PostsListProps = {
  allPosts: Post;
};

const PostsList: NextPage<PostsListProps> = ({ allPosts }) => {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });

  return (
    <>
      {posts.map((post) => (
        <div key={post.slug} className="my-4 flex flex-col">
          <span className="mt-1 text-sm text-neutral-500">
            {format(parseISO(post.date), "yyyy — dd MMM.")}
          </span>
          <Link
            className="font-semi-bold mb-1 font-display text-2xl hover:text-sky-600/40"
            href={`/${post.slug}`}
          >
            {post.title}
          </Link>

          <p className="text-neutral-600">{post.excerpt}</p>
        </div>
      ))}
    </>
  );
};

export default PostsList;
