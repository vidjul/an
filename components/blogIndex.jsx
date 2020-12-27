import React from "react";
import Link from "next/link";
import { frontMatter as blogPages } from "../pages/posts/*.mdx";

export default function blogIndex() {
  return (
    <section className="text-gray-700 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="-my-8">
          <h3>Blog entries</h3>
          {blogPages.map((page) => (
            <div key={page.__resourcePath}>
              <div className="py-8 flex flex-wrap md:flex-no-wrap">
                <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                  <span className="tracking-widest font-medium title-font text-gray-900 uppercase">
                    {page.category}
                  </span>
                  <span className="mt-1 text-gray-500 text-sm">
                    {page.date}
                  </span>
                  <span className="mt-1 text-gray-700 text-sm">
                    {page.readingTime.text}
                  </span>
                </div>
                <div className="md:flex-grow">
                  <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                    {page.title}
                  </h2>
                  <p className="leading-relaxed">{page.description}</p>
                  <Link href={formatPath(page.__resourcePath)}>
                    <a className="text-indigo-500 inline-flex items-center mt-4">
                      Learn More
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </Link>
                </div>
              </div>
              <hr className="mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function formatPath(p) {
  return `/${p.replace(/\.mdx$/, "")}`;
}
