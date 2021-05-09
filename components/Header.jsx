import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "./Logo";

export default function Header() {
  const router = useRouter();

  return (
    <div class="container mx-auto border-b-1 p-5 sticky top-0 shadow-sm">
      <nav class="flex justify-between">
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
        <ul class="flex flex-row">
          <li class="pr-5">
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li className="pr-5">
            <Link href="" locale={router.locale === "en" ? "fr" : "en"}>
              <a>{router.locale.toUpperCase()}</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
