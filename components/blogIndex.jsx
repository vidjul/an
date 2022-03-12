import React from "react";
import Link from "next/link";


export default function blogIndex({posts}) {
  return (
    <section className="text-gray-700 body-font overflow-hidden">
      <h3>Blog entries</h3>
      <div>
        {posts.map((page) => (
          <div key={page.url}>
            <div className="py-8 flex flex-wrap md:flex-no-wrap">
              <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                <span className="tracking-widest font-medium title-font text-gray-900 uppercase">
                  {page.category}
                </span>
                <span className="mt-1 text-gray-500 text-sm">
                  {page.date}
                </span>
                <span className="mt-1 text-gray-700 text-sm">
                  {page.readingTime?.text}
                </span>
              </div>
              <div className="md:flex-grow">
                <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                  {page.title}
                </h2>
                <p className="leading-relaxed">{page.description}</p>
                <Link href={page.url}>
                  <a className="text-teal-700 hover:underline">
                    Learn More »
                  </a>
                </Link>
              </div>
            </div>
            <hr className="mx-auto" />
          </div>
        ))}
      </div>
    </section>
  );
}

