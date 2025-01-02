import { posts } from ".velite";

export function getPosts(limit: number = 5) {
  return posts.slice(0, limit);
}

export function getSinglePost(postSlug: string) {
  return posts.find((post) => post.slug === `posts/${postSlug}`);
}
