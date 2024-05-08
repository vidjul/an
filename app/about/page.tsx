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

      <Intro />

      <Link href="/resume.pdf">Résumé</Link>

      <p>
        I have created this website to use it as a way to share knowledge and
        learnings about software engineering, as well as my hobbies.
      </p>

      <p>
        If you want to reach out, you can use any of these:
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
            <Link href="https://myanimelist.net/profile/vidjul">
              MyAnimeList
            </Link>{" "}
            <i>
              (Please note that this one should be used solely for sharing
              theories about Attack On Titan)
            </i>
          </li>
        </ul>
      </p>
    </main>
  );
}
