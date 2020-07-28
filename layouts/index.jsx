import React from "react";
import Head from "next/head";

import Nav from "../components/nav";

import styles from "./index.module.scss";

export default function DefaultLayout(frontMatter) {
  return ({ children: content }) => {
    return (
      <>
        <Head>
          <title>{frontMatter.title}</title>
        </Head>
        <div className="container mx-auto px-4">
          <Nav />
          <div className={styles.layout}>
            <div className="px-4 py-20">
              <div className="max-w-2xl mx-auto">{content}</div>
            </div>
          </div>
        </div>
      </>
    );
  };
}
