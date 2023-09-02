import PostsList from "components/PostsList";

export const metadata = {
  title: "Home | Vidushan Chooriyakumaran",
  description: "Vidushan Chooriyakumaran's personal website.",
};

export default function PostsPage() {
  return (
    <section>
      <h3 className="my-4 font-display text-3xl">Posts</h3>
      <PostsList />
    </section>
  );
}
