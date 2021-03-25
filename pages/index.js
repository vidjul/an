import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import MiniBio from "../components/MiniBio";

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default function Home() {
  const { t } = useTranslation("common");

  return (
    <div className="container mx-auto">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="prose lg:prose-xl">
        <h1>{t("introTitle")}</h1>
        <MiniBio />
      </main>
    </div>
  );
}
