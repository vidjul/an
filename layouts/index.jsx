import React from "react";
import { NextSeo } from "next-seo";

import Nav from "../components/nav";

import styles from "./index.module.scss";

export default function DefaultLayout({ children, frontMatter }) {
  return (
    <>
      <NextSeo
        title={frontMatter.title}
        description={frontMatter.description}
      />
      <div className="container mx-auto px-4">
        <Nav />
        <div className={styles.layout}>
          <div className="px-4 py-20">
            <div className="max-w-2xl mx-auto">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
