import PostsList from "components/PostsList";
import { getPosts } from "lib/posts";

export const metadata = {
  title: "Home | Vidushan Chooriyakumaran",
  description: "Vidushan Chooriyakumaran's personal website.",
};

export default async function PostsPage() {
  const posts = getPosts();

  if (!posts) {
    return;
  }

  return (
    <section>
      <h3 className="my-4 font-display text-3xl">Posts</h3>
      <PostsList allPosts={posts} />
    </section>
  );
}
