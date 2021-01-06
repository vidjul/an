import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { NextSeo } from "next-seo";

import Nav from "../components/nav";
import Footer from "../components/footer";
import BlogIndex from "../components/blogIndex";
import Favicons from "../components/favicons";

export default function IndexPage() {
  return (
    <>
      <NextSeo
        title="Vidushan Chooriyakumaran | Home"
        description="Vidushan Chooriyakumaran's personal website."
      />
      <Head>
        <Favicons />
      </Head>
      <Nav />
      <div className="container mx-auto lg:px-32 dark:bg-gray-600">
        <section className="py-12 px-4 text-center">
          <div className="w-full prose prose-blue lg:prose-xl max-w-2xl mx-auto">
            <Image
              src="/an/images/vidushan.jpg"
              alt="A photo of myself."
              className="rounded-full h-48 w-48 mx-auto"
              width="192"
              height="192"
            />
            <h2 className="font-heading">Hey, I'm Vidushan!</h2>
            <p>
              I'm a 24 years old software engineer based in Paris. I love{" "}
              <i>Final Fantasy 7</i>, <i>Death Note</i> and{" "}
              <i>Testing stuffs on computer (like crafting this website).</i>
            </p>
            <Link href="/about">
              <a className="text-blue-500 hover:underline">More about me »</a>
            </Link>
          </div>
        </section>
        <BlogIndex />
      </div>
      <Footer />
    </>
  );
}
