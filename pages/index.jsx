import PropTypes from "prop-types";

import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { fetchAPI } from "../lib/api";

import Link from "next/link";

import MiniBio from "../components/MiniBio";
import Layout from "../components/Layout";
import LatestPosts from "../components/LatestPosts";

export const getStaticProps = async ({ locale }) => {
  const posts = await fetchAPI(`/articles?_locale=${locale}`);

  return {
    props: {
      posts,
      ...(await serverSideTranslations(locale, ["common", "links"])),
    },
  };
};

export default function Home({ posts }) {
  const { t } = useTranslation("common");

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div className="prose lg:prose-xl">
          <h1>{t("introTitle")}</h1>
          <MiniBio />
          <Link href={`/${t("links:about")}`}>
            <a>{t("about")}</a>
          </Link>
        </div>

        <LatestPosts posts={posts} />
      </div>
    </Layout>
  );
}

Home.propTypes = {
  posts: PropTypes.array,
};
