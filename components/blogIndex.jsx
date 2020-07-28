import React from "react";
import Link from "next/link";
import { frontMatter as blogPages } from "../pages/posts/*.mdx";

export default function blogIndex() {
  return (
    <div>
      <section className="py-12 px-8">
        <h1 className="py-4">
          Blog <span className="highlight">entries</span>
        </h1>
        {blogPages.map((page) => (
          <div key={page.__resourcePath} className="mx-4">
            <Link href={formatPath(page.__resourcePath)}>
              <a>{page.title}</a>
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}

function formatPath(p) {
  return p.replace(/\.mdx$/, "");
}
