import React from "react";
import { NextSeo } from "next-seo";

import Nav from "./nav";
import Footer from "./footer";

import styles from "./layout.module.scss";

export default function Layout({ children, seo }) {
  return (
    <>
      <NextSeo
        title={seo.title}
        description={seo.description}
      />
      <div className="container mx-auto px-4 max-w-4xl">
        <Nav />
        <div className={styles.layout}>
          <div className="py-8 mb-4">
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
