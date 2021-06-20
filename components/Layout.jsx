import PropTypes from "prop-types";

import Head from "next/head";

import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title} - Vidushan C.</title>
      </Head>
      <Header />
      <main className="px-8">
        <div className="container mx-auto max-w-2xl">{children}</div>
      </main>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string,
};
