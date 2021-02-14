import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { NextSeo } from "next-seo";

import Nav from "../components/nav";
import Footer from "../components/footer";
import BlogIndex from "../components/blogIndex";
import Favicons from "../components/favicons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      <div>
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
            <div className="bg-secondary dark:bg-secondary-dark w-2/5 rounded-lg shadow-xl">
              <div className="bg-primary bg-opacity-80 h-24"></div>
              <div className="-mt-16 mb-4">
                <Image
                  src="/an/images/vidushan.jpg"
                  alt="A photo of myself."
                  className="rounded-full"
                  width="130"
                  height="130"
                />
              </div>
              <ul className="my-2 space-x-2">
                <li className="inline-block">
                  <a
                    href="https://github.com/vidjul"
                    className="hover:text-tertiary"
                  >
                    <FontAwesomeIcon
                      icon={["fab", "github"]}
                      size="lg"
                      className="flex-1"
                    />
                  </a>
                </li>
                <li className="inline-block">
                  <a
                    href="https://stackoverflow.com/users/9524080/vidushan-chooriyakumaran"
                    className="hover:text-tertiary"
                  >
                    <FontAwesomeIcon
                      icon={["fab", "stack-overflow"]}
                      size="lg"
                      className="flex-1"
                    />
                  </a>
                </li>
                <li className="inline-block">
                  <a
                    href="mailto:vidush@n-c.dev"
                    className="hover:text-tertiary"
                  >
                    <FontAwesomeIcon
                      icon="envelope"
                      size="lg"
                      className="flex-1"
                    />
                  </a>
                </li>
                <li className="inline-block">
                  <a
                    href="https://www.linkedin.com/in/c-vidushan/"
                    className="hover:text-tertiary"
                  >
                    <FontAwesomeIcon
                      icon={["fab", "linkedin"]}
                      size="lg"
                      className="flex-1"
                    />
                  </a>
                </li>
                <li className="inline-block">
                  <a
                    href="https://facebook.com/vidushan.chooriyakumaran"
                    className="hover:text-tertiary"
                  >
                    <FontAwesomeIcon
                      icon={["fab", "facebook"]}
                      size="lg"
                      className="flex-1"
                    />
                  </a>
                </li>
                <li className="inline-block">
                  <a
                    href="https://twitter.com/vidushan_"
                    className="hover:text-tertiary"
                  >
                    <FontAwesomeIcon
                      icon={["fab", "twitter"]}
                      size="lg"
                      className="flex-1"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <BlogIndex />
      </div>
      <Footer />
    </>
  );
}
