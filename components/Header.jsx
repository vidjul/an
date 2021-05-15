import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Logo from "./Logo";

export default function Header() {
  const router = useRouter();
  const { t } = useTranslation("common");

  return (
    <div className="container mx-auto border-b-1 p-5 sticky top-0 shadow-sm">
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
