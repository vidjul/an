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
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto w-1/2">
        <div className="prose lg:prose-xl">
          <h1>{t("introTitle")}</h1>
          <MiniBio />
        </div>
      </div>
    </Layout>
  );
}
