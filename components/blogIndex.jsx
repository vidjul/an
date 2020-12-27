import React from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { frontMatter as blogPages } from "../pages/posts/*.mdx";

export default function blogIndex() {
  return (
    <section className="text-gray-600 dark:text-gray-400 dark:bg-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4 justify-center">
          {blogPages.map((page) => (
            <div className="p-4 lg:w-1/3" key={page.__resourcePath}>
              <div className="h-full bg-gray-100 bg-opacity-75 dark:bg-gray-800 dark:bg-opacity-40 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 dark:text-gray-500 mb-1">
                  {page.category}
                </h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 dark:text-white mb-3">
                  {page.title}
                </h1>
                <p className="leading-relaxed mb-3">{page.description}</p>
                <Link href={formatPath(page.__resourcePath)}>
                  <a className="text-blue-500 inline-flex items-center">
                    Learn More
                    <span>
                      <FontAwesomeIcon
                        icon="arrow-right"
                        pull="right"
                        size="xs"
                        fixedWidth
                      />
                    </span>
                  </a>
                </Link>
                <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                  <span className="text-gray-400 dark:text-gray-500 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    <FontAwesomeIcon
                      icon="hourglass-half"
                      fixedWidth
                      pull="left"
                    />
                    {page.readingTime.text}
                  </span>
                  <span className="text-gray-400 dark:text-gray-500 inline-flex items-center leading-none text-sm">
                    <FontAwesomeIcon icon="calendar" fixedWidth pull="left" />
                    {page.date}
                  </span>
                </div>
              </div>
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
