"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathName = usePathname();

  return (
    <header className="px-4 py-8 md:px-16">
      <span className="font-display text-xl font-bold">
        vidu.sh
        <Link href="/" className="text-blue-500 hover:underline">
          /an
        </Link>
      </span>
      <span className="font-display text-xl font-bold">{pathName}</span>
    </header>
  );
};

export default Header;
