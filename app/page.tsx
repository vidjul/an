import { Intro } from "components/Intro";
import { getPosts } from "lib/posts";
import PostsList from "../components/PostsList";

export const metadata = {
  title: "Home | Vidushan Chooriyakumaran",
  description: "Vidushan Chooriyakumaran's personal website.",
};

const RECENT_POSTS_LIMIT = 3;

export default async function IndexPage() {
  const posts = getPosts(RECENT_POSTS_LIMIT);

  return (
    <>
      <Intro />

      {posts && (
        <section>
          <h3 className="my-4 font-display text-3xl">Recent posts</h3>
          <PostsList allPosts={posts} />
        </section>
      )}
    </>
  );
}
