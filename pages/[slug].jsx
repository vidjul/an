import PropTypes from "prop-types";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { fetchLocal } from "../lib/local";
import Layout from "../components/Layout";

export const getStaticPaths = async () => {
  const localData = fetchLocal();
  return {
    paths: localData.map((data) => {
      return {
        params: {
          slug: data.slug,
        },
        locale: data.locale !== "en" ? data.locale : null,
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const { slug } = context.params;
  const { locale, defaultLocale } = context;

  // Import our .md file using the `slug` from the URL
  const file = await import(`../content/${locale || defaultLocale}/${slug}.md`);

  // Parse .md data through `matter`
  const { content, data } = matter(file.default);

  // Pass data to our component props
  return {
    props: {
      content,
      data,
      ...(await serverSideTranslations(locale, ["common", "links"])),
    },
  };
};

const Post = ({ content, data }) => {
  return (
    <Layout title={data.title}>
      <ReactMarkdown className="prose lg:prose-xl">{content}</ReactMarkdown>
    </Layout>
  );
};

Post.propTypes = {
  content: PropTypes.string,
  data: PropTypes.object,
};

export default Post;
