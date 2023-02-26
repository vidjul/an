import React from "react";
import Link from "next/link";
import { compareDesc, format, parseISO } from "date-fns";
import { allPosts } from "contentlayer/generated";

export default function blogIndex() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });

  return (
    <section className="body-font overflow-hidden text-gray-700">
      <h3 className="text-display text-2xl font-medium">Blog entries</h3>
      <div>
        {posts.map((page) => (
          <div key={page.url}>
            <div className="md:flex-no-wrap flex flex-wrap py-8">
              <div className="mb-6 flex flex-shrink-0 flex-col md:mb-0 md:w-64">
                <span className="title-font font-medium uppercase tracking-widest text-gray-900">
                  {page.category}
                </span>
                <span className="mt-1 text-sm text-gray-500">
                  {format(parseISO(page.date), "LLLL d, yyyy")}
                </span>
                <span className="mt-1 text-sm text-gray-700">
                  {page.readingTime?.text}
                </span>
              </div>
              <div className="md:flex-grow">
                <h2 className="title-font mb-2 text-2xl font-medium text-gray-900 hover:text-green-500">
                  <Link href={page.url}>{page.title}</Link>
                </h2>

                <p className="leading-relaxed">{page.description}</p>
              </div>
            </div>
            <hr className="mx-auto" />
          </div>
        ))}
      </div>
    </section>
  );
}
