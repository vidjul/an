const glob = require("glob");

export function fetchLocal() {
  return glob.sync("./content/**/*.md").map((path) => {
    path = path
      .replace(/\.\/content\//g, "")
      .slice(0, -3)
      .split("/");

    return {
      locale: path[0],
      slug: path[1],
    };
  });
}
