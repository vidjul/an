import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import matter from "gray-matter";

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
        locale: data.locale,
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const { slug } = context.params;
  const { locale, defaultLocale } = context;

  // Import our .md file using the `slug` from the URL
  const content = await import(
    `../content/${locale || defaultLocale}/${slug}.md`
  );

  // // Parse .md data through `matter`
  // const data = matter(content.default);

  // Pass data to our component props
  return {
    props: {
      content: content.default,
      ...(await serverSideTranslations(locale, ["common", "links"])),
    },
  };
};

const Post = ({ content }) => {
  const router = useRouter();

  return (
    <Layout>
      <ReactMarkdown className="prose lg:prose-xl">{content}</ReactMarkdown>
    </Layout>
  );
};

export default Post;
