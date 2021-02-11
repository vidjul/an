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
      <div className="container mx-auto bg-secondary dark:bg-secondary-dark">
        <section className="text-center flex h-screen">
          <div className="m-auto lg:w-1/2 prose lg:prose-xl dark:prose-dark">
            <div className="m-8 lg:hidden">
              <Image
                src="/an/images/vidushan.jpg"
                alt="A photo of myself."
                className="rounded-full"
                width="180"
                height="180"
              />
            </div>
            <h1>Hey, I'm Vidushan!</h1>
            <p className="px-16">
              I'm a 24 years old software engineer based in Paris. I love{" "}
              <i>Final Fantasy 7</i>, <i>Death Note</i> and{" "}
              <i>Testing stuffs on computer (like crafting this website).</i>
            </p>
            <Link href="/about">
              <a>More about me »</a>
            </Link>
          </div>
          <div className="hidden w-1/2 bg-primary lg:flex items-center justify-center">
            <div className="bg-secondary dark:bg-secondary-dark w-2/5 h-1/2 rounded-lg shadow-xl">
              <div className="bg-primary bg-opacity-80 h-1/3"></div>
              <div className="-mt-16">
                <Image
                  src="/an/images/vidushan.jpg"
                  alt="A photo of myself."
                  className="rounded-full"
                  width="130"
                  height="130"
                />
              </div>
            </div>
          </div>
        </section>
        <BlogIndex />
      </div>
      <Footer />
    </>
  );
}
