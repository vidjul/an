import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { fetchAPI } from "../../lib/api";
import Layout from "../../components/Layout";
import ReactMarkdown from "react-markdown";

export const getStaticPaths = async () => {
  /**
   * When Next will build the website,
   * it will fetch all articles from strapi and build each article
   * This func will only be called during build time so API won't be requested
   * on each request.
   *
   * As fallback is blocking, paths that do not match are 404.
   * This mean that when new article is added into CMS, we have to create a new build.
   */
  const articles = await fetchAPI("/articles");

  return {
    paths: articles.map((article) => ({
      params: {
        slug: article.slug,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ locale, params }) => {
  const post = await fetchAPI(`/articles/${params.slug}`);

  return {
    props: {
      post,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

export default function slug({ post }) {
  return (
    <Layout title={post.title}>
      <ReactMarkdown className="prose lg:prose-xl text-justify">
        {post.content}
      </ReactMarkdown>
    </Layout>
  );
}
