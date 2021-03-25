import Head from "next/head";
import MiniBio from "../components/MiniBio";

export default function Home() {
  return (
    <div className="container mx-auto">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="prose lg:prose-xl">
        <h1>Hi, I'm Vidushan!</h1>
        <MiniBio />
      </main>
    </div>
  );
}
