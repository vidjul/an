import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Logo from "./Logo";

export default function Header() {
  const router = useRouter();
  const { t } = useTranslation("common");

  return (
    <div className="container mx-auto mb-4 md:mb-8 p-8 sticky top-0 max-w-4xl z-10 bg-white bg-opacity-80 backdrop-filter backdrop-saturate-180 backdrop-blur-sm">
      <nav className="flex justify-between">
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
        <ul className="flex flex-row">
          <li className="pr-5">
            <Link href={`/${t("links:about")}`}>
              <a>{t("header.about")}</a>
            </Link>
          </li>
          <li className="pr-5">
            <Link href="/" locale={router.locale === "en" ? "fr" : "en"}>
              <a>{router.locale.toUpperCase()}</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
