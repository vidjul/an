import Link from "next/link";
import Head from "next/head";

import { getPosts } from '../utils/mdx';

import Layout from "../components/layout";
import BlogIndex from "../components/blogIndex";
import Image from "../components/image";

const layoutProps = {
  seo: {
    title: 'Vidushan Chooriyakumaran | Home',
    description: 'Vidushan Chooriyakumaran\'s personal website.',
  },
};

export function getStaticProps() {
  const postsData = getPosts().map(post => post.data);
  console.log(postsData);
  return {
    props: {
      postsData,
    }
  };
}

export default function IndexPage({postsData}) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/an/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/an/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/an/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/an/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/an/android-chrome-512x512.png"
        />
      </Head>
      <Layout seo={layoutProps.seo}>
        <>
          <section className="py-12 px-4 text-center">
            <div className="w-full max-w-2xl mx-auto">
              <Image
                src="/images/vidushan.jpg"
                alt="A photo of myself."
                className="rounded-full h-48 w-48 mx-auto"
              />
              <h2 className="mt-4 font-heading text-3xl">Hey, I'm Vidushan!</h2>
              <p className="my-2">
                I'm a 24 years old software engineer based in Paris. I love{" "}
                <i>Final Fantasy 7</i>, <i>Death Note</i> and{" "}
                <i>Testing stuffs on computer (like crafting this website).</i>
              </p>
              <Link href="/about">
                <a className="text-teal-700 hover:underline">More about me »</a>
              </Link>
            </div>
          </section>
          <BlogIndex posts={postsData} />
        </>
      </Layout>
    </>
  );
}
