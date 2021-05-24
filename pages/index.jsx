import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { fetchAPI } from "../lib/api";

import Link from "next/link";

import MiniBio from "../components/MiniBio";
import Layout from "../components/Layout";

export const getStaticProps = async ({ locale }) => {
  const posts = await fetchAPI("/articles");

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

      <div className="container mx-auto">
        <div className="flex justify-center items-center h-screen">
          <div className="prose lg:prose-xl">
            <h1>{t("introTitle")}</h1>
            <MiniBio />
            <Link href={`/${t("aboutLink")}`}>
              <a>{t("about")}</a>
            </Link>
          </div>
        </div>

        <div>
          <ul>
            {posts.map((post) => {
              return (
                <li index={post.id}>
                  <Link href={`posts/${post.slug}`}>
                    <a>{post.title}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
