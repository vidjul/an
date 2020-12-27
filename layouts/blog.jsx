import React from "react";
import { NextSeo } from "next-seo";

import Nav from "../components/nav";
import Footer from "../components/footer";

export default function DefaultLayout({ children, frontMatter }) {
  return (
    <>
      <NextSeo
        title={frontMatter.title}
        description={frontMatter.description}
      />
      <Nav />
      <div className="container mx-auto px-4">
        <div className="px-4 py-8 mb-4">
          <article className="prose prose-blue lg:prose-xl max-w-2xl mx-auto">
            <h1 className="">{frontMatter.title}</h1>
            {children}
          </article>
        </div>
      </div>
      <Footer />
    </>
  );
}
