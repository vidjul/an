import React from "react";
import Link from "next/link";

export default function blogIndex({ posts }) {
  return (
    <section className="body-font overflow-hidden text-gray-700">
      <h3>Blog entries</h3>
      <div>
        {posts.map((page) => (
          <div key={page.url}>
            <div className="md:flex-no-wrap flex flex-wrap py-8">
              <div className="mb-6 flex flex-shrink-0 flex-col md:mb-0 md:w-64">
                <span className="title-font font-medium uppercase tracking-widest text-gray-900">
                  {page.category}
                </span>
                <span className="mt-1 text-sm text-gray-500">{page.date}</span>
                <span className="mt-1 text-sm text-gray-700">
                  {page.readingTime?.text}
                </span>
              </div>
              <div className="md:flex-grow">
                <h2 className="title-font mb-2 text-2xl font-medium text-gray-900 hover:text-green-500">
                  <Link href={page.url}>
                    {page.title}
                  </Link>
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
