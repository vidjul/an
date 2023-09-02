import Link from "next/link";
import Image from "next/image";

import BlogIndex from "../../components/blogIndex";

export const metadata = {
  title: "Home | Vidushan Chooriyakumaran",
  description: "Vidushan Chooriyakumaran's personal website.",
};

export default function IndexPage() {
  return (
    <>
      <section className="my-16">
        <div className="relative mx-auto h-[216px] w-[216px]">
          <div className="absolute h-full w-full rounded-full bg-gradient-to-t from-sky-300/20"></div>
          <Image
            src="/an/images/vidushan.jpg"
            alt="A photo of myself."
            className="rounded-full"
            height={216}
            width={216}
          />
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 mt-8 font-display text-5xl font-bold">
            Hey, I&apos;m Vidushan!
          </h2>
          <p className="my-2 text-xl">
            I&apos;m a 26 years old software engineer based in Paris. I love{" "}
            <i className="font-semibold not-italic text-sky-600/40">
              Final Fantasy 7
            </i>
            ,{" "}
            <i className="font-semibold not-italic text-sky-600/40">
              Death Note
            </i>{" "}
            and{" "}
            <i className="font-semibold not-italic text-sky-600/40">
              testing stuffs on a computer (like crafting this website).
            </i>
          </p>
          <Link href="/about" className="text-xl text-blue-300 hover:underline">
            More about me »
          </Link>
        </div>
      </section>
    </>
  );
}
