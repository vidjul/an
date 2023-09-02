import { allPosts } from "contentlayer/generated";
import { compareDesc, format, parseISO } from "date-fns";
import Link from "next/link";

const PostsList = () => {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });

  return (
    <>
      {posts.map((page) => (
        <div key={page.url} className="flex flex-col">
          <span className="mt-1 text-sm text-neutral-500">
            {format(parseISO(page.date), "dd MMM. — yyyy")}
          </span>
          <Link
            className="font-semi-bold mb-1 font-display text-2xl hover:text-sky-600/40"
            href={page.url}
          >
            {page.title}
          </Link>

          <p className="text-neutral-600">{page.description}</p>
        </div>
      ))}
    </>
  );
};

export default PostsList;