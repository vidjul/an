import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

export const metadata = {
  title: "Home | Vidushan Chooriyakumaran",
  description: "Vidushan Chooriyakumaran's personal website.",
};

export default function IndexPage() {
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
      <section className="text-center">
        <div className="mx-auto mb-12 w-full max-w-2xl">
          <Image
            src="/an/images/vidushan.jpg"
            alt="A photo of myself."
            className="mx-auto rounded-full"
            height={192}
            width={192}
          />
          <h2 className="font-heading mt-4 text-3xl">
            Hey, I&apos;m Vidushan!
          </h2>
          <p className="my-2">
            I&apos;m a 26 years old software engineer based in Paris. I love{" "}
            <i className="font-semibold not-italic text-green-500">
              Final Fantasy 7
            </i>
            ,{" "}
            <i className="font-semibold not-italic text-green-500">
              Death Note
            </i>{" "}
            and{" "}
            <i className="font-semibold not-italic text-green-500">
              Testing stuffs on a computer (like crafting this website).
            </i>
          </p>
          <Link href="/about" className="text-teal-700 hover:underline">
            More about me »
          </Link>
        </div>
      </section>
    </>
  );
}
