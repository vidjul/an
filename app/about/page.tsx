import Link from "next/link";
import { Intro } from "./components/Intro";

export const metadata = {
  title: "About",
  description: "More about me.",
};

export default function AboutPage() {
  return (
    <main className="prose lg:prose-xl prose-headings:font-display">
      <h1>About</h1>

      <h2>Who I am</h2>
      <Intro />

      <Link href="/resume.pdf">Résumé</Link>

      <h2>What is this website about</h2>

      <p>
        This website will mainly host my blog, on which I aim to share posts
        about tech (tools I use or I have discovered) and my hobbies. Creating
        and maintaining this website is also a way for me to improve my skills
        with ReactJS, a library that I love!
      </p>

      <h2>Contact & Info</h2>

      <ul>
        <li>
          <Link href="mailto:vidush@n-c.dev">Mail</Link>
        </li>
        <li>
          <Link href="https://linkedin.com/in/c-vidushan">LinkedIn</Link>
        </li>
        <li>
          <Link href="https://github.com/vidjul">Github</Link>
        </li>
        <li>
          <Link href="https://myanimelist.net/profile/vidjul">MyAnimeList</Link>{" "}
          (Just in case you want to share some theories about Attack On Titan)
        </li>
      </ul>
    </main>
  );
}
