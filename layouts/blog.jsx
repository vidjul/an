import React from "react";
import { NextSeo } from "next-seo";

import Nav from "../components/nav";
import Footer from "../components/footer";

import styles from "./index.module.scss";

export default function DefaultLayout({ children, frontMatter }) {
  return (
    <>
      <NextSeo
        title={frontMatter.title}
        description={frontMatter.description}
      />
      <Nav />
      <div className="container mx-auto px-4">
        <div className={styles.layout}>
          <div className="px-4 py-8 mb-4">
            <div className="max-w-2xl mx-auto">
              <h1 className="">{frontMatter.title}</h1>
              {children}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
