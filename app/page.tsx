import Link from "next/link";
import Image from "next/image";

import BlogIndex from "../components/blogIndex";

export const metadata = {
  title: "Home | Vidushan Chooriyakumaran",
  description: "Vidushan Chooriyakumaran's personal website.",
};

export default function IndexPage() {
  return (
    <>
      <section className="mb-8 max-w-2xl">
        <Image
          src="/an/images/vidushan.jpg"
          alt="A photo of myself."
          className="rounded-full"
          height={192}
          width={192}
        />
        <h2 className="my-8 font-display text-5xl font-bold">
          Hey, I&apos;m Vidushan!
        </h2>
        <p className="my-2 text-xl">
          I&apos;m a 26 years old software engineer based in Paris. I love{" "}
          <i className="font-semibold not-italic text-green-500">
            Final Fantasy 7
          </i>
          ,{" "}
          <i className="font-semibold not-italic text-green-500">Death Note</i>{" "}
          and{" "}
          <i className="font-semibold not-italic text-green-500">
            Testing stuffs on a computer (like crafting this website).
          </i>
        </p>
        <Link href="/about" className="text-xl text-teal-700 hover:underline">
          More about me »
        </Link>
      </section>

      <BlogIndex />
    </>
  );
}
