import React from "react";

import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  return (
    <nav className="h-16 px-8 py-4 shadow-lg">
      <span className="font-logo font-semibold text-lg">
        vidu.sh
        <Link href="/">
          <a className="text-green-500">/an</a>
        </Link>
        <Link href="" locale={router.locale === "en" ? "fr" : "en"}>
          <a className="underline hover:no-underline">/{router.locale}</a>
        </Link>
      </span>
    </nav>
  );
}
