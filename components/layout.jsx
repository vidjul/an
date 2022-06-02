import React from "react";
import { NextSeo } from "next-seo";

import Nav from "./nav";
import Footer from "./footer";

export default function Layout({ children, seo }) {
  return (
    <>
      <NextSeo title={seo.title} description={seo.description} />
      <div className="container mx-auto max-w-4xl px-4">
        <Nav />
        <>{children}</>
        <Footer />
      </div>
    </>
  );
}
