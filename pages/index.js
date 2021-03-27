import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import MiniBio from "../components/MiniBio";
import Header from "../components/Header";
import Layout from "../components/Layout";

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default function Home() {
  const { t } = useTranslation("common");

  return (
    <Layout>
      <div className="container mx-auto w-3/5 my-16">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="prose lg:prose-xl">
          <h1>{t("introTitle")}</h1>
          <MiniBio />
        </main>
      </div>
    </Layout>
  );
}
