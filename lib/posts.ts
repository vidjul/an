import GhostContentAPI from "@tryghost/content-api";

const api = new GhostContentAPI({
  url: "https://vidu-sh-an.ghost.io",
  key: process.env.GHOST_API_KEY ?? "",
  version: "v5.0",
});

export async function getPosts(limit: string = "all") {
  return await api.posts
    .browse({
      limit,
    })
    .catch((err) => {
      console.error(err);
    });
}

export async function getSinglePost(postSlug) {
  return await api.posts
    .read({
      slug: postSlug,
    })
    .catch((err) => {
      console.error(err);
    });
}
