import PropTypes from "prop-types";

import Link from "next/link";

export default function LatestPosts({ posts }) {
  return (
    <div className="my-8">
      <h1 className="text-4xl font-bold mb-4">Last posts</h1>
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <Link href={`/posts/${post.slug}`}>
                <a className="font-bold md:text-xl hover:underline">
                  {post.title}
                </a>
              </Link>
              <p className="md:text-lg text-gray-700">{post.description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

LatestPosts.propTypes = {
  posts: PropTypes.array,
};
